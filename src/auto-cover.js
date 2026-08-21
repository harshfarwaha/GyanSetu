(() => {
  const CACHE_KEY = 'gyansetu.autoCover.v1';
  const TTL = 30 * 24 * 60 * 60 * 1000;
  const queue = [];
  const queued = new Set();
  let active = 0;

  function readCache() { try { return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}'); } catch { return {}; } }
  function writeCache(cache) { try { localStorage.setItem(CACHE_KEY, JSON.stringify(cache)); } catch {} }
  function key(title, author) { return `${title}||${author}`.toLowerCase().replace(/\s+/g, ' ').trim(); }

  function runNext() {
    while (active < 2 && queue.length) {
      const item = queue.shift(); queued.delete(item.key); active += 1;
      resolve(item).finally(() => { active -= 1; runNext(); });
    }
  }

  async function resolve({ card, title, author, key: cacheKey }) {
    const cache = readCache(); const saved = cache[cacheKey];
    if (saved && Date.now() - saved.savedAt < TTL) { apply(card, saved.coverUrl); return; }
    try {
      // The server exposes /api/book-cover. Keep the API key server-side.
      const response = await fetch('/api/book-cover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author })
      });
      if (!response.ok) return;
      const result = await response.json();
      cache[cacheKey] = { savedAt: Date.now(), coverUrl: result?.coverUrl || null };
      writeCache(cache);
      apply(card, result?.coverUrl || null);
    } catch {}
  }

  function apply(card, coverUrl) {
    if (!coverUrl || !card.isConnected || card.querySelector('.coverBtn img')) return;
    const target = card.querySelector('.coverBtn .coverFallback'); if (!target) return;
    const image = document.createElement('img'); image.loading = 'lazy'; image.decoding = 'async'; image.src = coverUrl; image.alt = card.querySelector('h3')?.textContent?.trim() || '';
    image.addEventListener('error', () => image.remove(), { once: true }); target.replaceWith(image);
  }

  function enqueue(card) {
    if (!card || card.querySelector('.coverBtn img')) return;
    const title = card.querySelector('h3')?.textContent?.trim(); const author = card.querySelector('p')?.textContent?.trim() || 'Unknown author';
    if (!title) return; const cacheKey = key(title, author); if (queued.has(cacheKey)) return;
    queued.add(cacheKey); queue.push({ card, title, author, key: cacheKey }); runNext();
  }

  function scan(root = document) { root.querySelectorAll?.('.bookCard').forEach((card) => observer.observe(card)); }
  const observer = new IntersectionObserver((entries) => entries.filter((entry) => entry.isIntersecting).forEach((entry) => { observer.unobserve(entry.target); enqueue(entry.target); }), { rootMargin: '300px 0px' });
  const mutationObserver = new MutationObserver((mutations) => mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => { if (node.nodeType === 1) { if (node.matches?.('.bookCard')) observer.observe(node); scan(node); } })));

  function start() { scan(document); mutationObserver.observe(document.body, { childList: true, subtree: true }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();
})();
