(() => {
  'use strict';

  const processed = new WeakSet();
  const active = new Set();
  const queue = [];
  const MAX_CONCURRENT = 2;
  const MAX_ATTEMPTS_PER_PAGE = 80;
  let attempts = 0;

  function isPlaceholder(img) {
    const src = img.getAttribute('src') || '';
    return !src || src.startsWith('data:image/') || /placeholder|no[-_ ]?cover/i.test(src);
  }

  function cleanText(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function findCard(img) {
    return img.closest('article, li, [class*="book-card"], [class*="bookCard"], [class*="book-item"], [class*="bookItem"], [class*="card"]') || img.parentElement?.parentElement || img.parentElement;
  }

  function isBookCard(card) {
    if (!card) return false;
    const text = cleanText(card.innerText || '');
    return /read\s*(book|\/\s*download)|read\s*\/\s*download/i.test(text);
  }

  function findBookDetails(img) {
    const card = findCard(img);
    if (!isBookCard(card)) return { title: '', author: '', card };

    const alt = cleanText(img.getAttribute('alt'));
    const dataTitle = cleanText(img.dataset.bookTitle || img.getAttribute('data-book-title'));
    const heading = card?.querySelector('h1, h2, h3, h4, h5, h6, [class*="title"], [class*="book-title"]');
    let title = alt || dataTitle || cleanText(heading?.textContent);

    if (!title && card) {
      const lines = card.innerText.split('\n').map(cleanText).filter(Boolean);
      title = lines.find((line) => !/^(read|download|online|source|internet archive)$/i.test(line)) || '';
    }

    let author = cleanText(img.dataset.bookAuthor || img.getAttribute('data-book-author'));
    if (!author && card) {
      const authorNode = card.querySelector('[class*="author"], [class*="Author"]');
      author = cleanText(authorNode?.textContent);
    }

    return { title, author, card };
  }

  async function lookup(details) {
    const response = await fetch('/api/book-cover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: details.title,
        author: details.author,
        language: document.documentElement.lang || ''
      })
    });
    if (!response.ok) return null;
    return response.json();
  }

  function markSource(img, result) {
    if (!result?.coverUrl) return;
    img.src = result.coverUrl;
    img.dataset.aiCover = 'true';
    img.dataset.coverSource = result.source || '';
    img.dataset.coverConfidence = String(result.confidence ?? '');
    img.removeAttribute('srcset');
  }

  async function process(img) {
    if (processed.has(img) || active.has(img) || !isPlaceholder(img)) return;
    if (attempts >= MAX_ATTEMPTS_PER_PAGE) return;
    const details = findBookDetails(img);
    if (!details.title || details.title.length < 2) return;

    processed.add(img);
    active.add(img);
    attempts += 1;
    try {
      const result = await lookup(details);
      markSource(img, result);
    } catch (error) {
      // Missing covers are intentionally left unchanged when lookup fails.
      console.debug('AI cover lookup skipped:', error?.message || error);
    } finally {
      active.delete(img);
      pump();
    }
  }

  function enqueue(img) {
    if (!img || processed.has(img) || !isPlaceholder(img)) return;
    queue.push(img);
    pump();
  }

  function pump() {
    while (active.size < MAX_CONCURRENT && queue.length) {
      const img = queue.shift();
      void process(img);
    }
  }

  function scan(root = document) {
    const images = root.querySelectorAll ? root.querySelectorAll('img') : [];
    images.forEach(enqueue);
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        if (node.matches?.('img')) enqueue(node);
        scan(node);
      });
    }
  });

  function start() {
    scan(document);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
