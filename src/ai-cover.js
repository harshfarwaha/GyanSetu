(() => {
  'use strict';

  const processed = new WeakSet();
  const active = new Set();
  const queue = [];
  const MAX_CONCURRENT = 2;
  const MAX_ATTEMPTS_PER_PAGE = 80;
  let attempts = 0;

  function isPlaceholder(node) {
    if (!node) return false;
    if (node.classList?.contains('coverFallback')) return true;
    if (node.tagName !== 'IMG') return false;
    const src = node.getAttribute('src') || '';
    return !src || src.startsWith('data:image/') || /placeholder|no[-_ ]?cover/i.test(src);
  }

  function cleanText(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function findCard(node) {
    return node.closest('article, li, [class*="book-card"], [class*="bookCard"], [class*="book-item"], [class*="bookItem"], [class*="card"]') || node.parentElement?.parentElement || node.parentElement;
  }

  function isBookCard(card) {
    if (!card) return false;
    const text = cleanText(card.innerText || '');
    return /read\s*(book|\/\s*download)|read\s*\/\s*download/i.test(text) || card.querySelector('.bookCard');
  }

  function findBookDetails(node) {
    const card = findCard(node);
    if (!isBookCard(card)) return { title: '', author: '', card };

    const alt = cleanText(node.getAttribute?.('alt'));
    const dataTitle = cleanText(node.dataset?.bookTitle || node.getAttribute?.('data-book-title'));
    const heading = card?.querySelector('h1, h2, h3, h4, h5, h6, [class*="title"], [class*="book-title"]');
    let title = alt || dataTitle || cleanText(heading?.textContent);

    if (!title && card) {
      const lines = card.innerText.split('\n').map(cleanText).filter(Boolean);
      title = lines.find((line) => !/^(read|download|online|source|internet archive)$/i.test(line)) || '';
    }

    let author = cleanText(node.dataset?.bookAuthor || node.getAttribute?.('data-book-author'));
    if (!author && card) {
      const authorNode = card.querySelector('[class*="author"], [class*="Author"]');
      author = cleanText(authorNode?.textContent);
    }
    if (!author && heading?.parentElement) {
      const candidate = heading.parentElement.querySelector('p');
      author = cleanText(candidate?.textContent);
    }

    return { title, author, card };
  }

  async function lookup(details) {
    try {
      const response = await fetch('/api/book-cover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: details.title,
          author: details.author,
          language: document.documentElement.lang || ''
        })
      });
      if (response.ok) {
        const result = await response.json();
        if (result?.coverUrl) return result;
      }
    } catch (_) {}

    try {
      const response = await fetch(`https://gutendex.com/books/?search=${encodeURIComponent(details.title)}`);
      if (!response.ok) return null;
      const data = await response.json();
      const wanted = details.title.toLowerCase();
      const match = (data.results || []).find((book) => {
        const title = String(book.title || '').toLowerCase();
        return title === wanted || title.includes(wanted) || wanted.includes(title);
      }) || data.results?.[0];
      const coverUrl = match?.formats?.['image/jpeg'];
      if (coverUrl) return { coverUrl, source: 'Project Gutenberg / Gutendex', confidence: 1 };
    } catch (_) {}

    return null;
  }

  function markSource(node, result) {
    if (!result?.coverUrl || !node?.parentNode) return;
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.decoding = 'async';
    img.src = result.coverUrl;
    img.alt = node.getAttribute?.('aria-label') || '';
    img.dataset.aiCover = 'true';
    img.dataset.coverSource = result.source || '';
    img.dataset.coverConfidence = String(result.confidence ?? '');
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
    node.replaceWith(img);
  }

  async function process(node) {
    if (processed.has(node) || active.has(node) || !isPlaceholder(node)) return;
    if (attempts >= MAX_ATTEMPTS_PER_PAGE) return;
    const details = findBookDetails(node);
    if (!details.title || details.title.length < 2) return;

    processed.add(node);
    active.add(node);
    attempts += 1;
    try {
      const result = await lookup(details);
      markSource(node, result);
    } catch (error) {
      console.debug('Cover lookup skipped:', error?.message || error);
    } finally {
      active.delete(node);
      pump();
    }
  }

  function enqueue(node) {
    if (!node || processed.has(node) || !isPlaceholder(node)) return;
    queue.push(node);
    pump();
  }

  function pump() {
    while (active.size < MAX_CONCURRENT && queue.length) {
      const node = queue.shift();
      void process(node);
    }
  }

  function scan(root = document) {
    if (!root.querySelectorAll) return;
    root.querySelectorAll('img, .coverFallback').forEach(enqueue);
  }

  function styleOriginalSiteButton() {
    if (document.getElementById('gyansetu-cover-button-fix')) return;
    const style = document.createElement('style');
    style.id = 'gyansetu-cover-button-fix';
    style.textContent = `
      .pdfToolbar a.gyanOriginalSite,
      .pdfToolbar a {
        display:inline-flex !important;
        align-items:center !important;
        justify-content:center !important;
        gap:8px !important;
        min-height:42px !important;
        padding:10px 16px !important;
        border-radius:999px !important;
        background:var(--gold,#c8a45f) !important;
        color:#07110f !important;
        font-family:Inter,system-ui,sans-serif !important;
        font-size:14px !important;
        font-weight:800 !important;
        line-height:1.2 !important;
        text-decoration:none !important;
        white-space:nowrap !important;
        opacity:1 !important;
        visibility:visible !important;
      }
      .pdfToolbar a:hover {
        filter:brightness(1.06);
        transform:translateY(-1px);
      }
    `;
    document.head.appendChild(style);
  }

  function fixOriginalSiteButton(root = document) {
    root.querySelectorAll?.('.pdfToolbar a').forEach((link) => {
      if (link.dataset.gyanStyled === 'true') return;
      link.dataset.gyanStyled = 'true';
      link.classList.add('gyanOriginalSite');
      link.textContent = '↗  Open in Original Site';
      link.setAttribute('aria-label', 'Open in Original Site');
    });
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        if (node.matches?.('img, .coverFallback, .pdfToolbar a')) enqueue(node);
        scan(node);
        fixOriginalSiteButton(node);
      });
    }
  });

  function start() {
    styleOriginalSiteButton();
    scan(document);
    fixOriginalSiteButton(document);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();