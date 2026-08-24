// Adds the Harry Potter entry to the homepage without modifying the existing app.js book catalog.
(() => {
  const PDF_URL = 'https://kvongcmehsanalibrary.wordpress.com/wp-content/uploads/2021/07/harrypotter.pdf';
  const BOOK_ID = 'harry-potter-home-card';

  function addHarryPotterCard() {
    const content = document.querySelector('#content');
    if (!content || content.querySelector(`[data-harry-potter="${BOOK_ID}"]`)) return;
    const shelves = content.querySelectorAll('.shelf');
    if (shelves.length < 10) return;

    const section = document.createElement('section');
    section.className = 'shelf';
    section.dataset.harryPotter = BOOK_ID;
    section.innerHTML = `<div class="sectionHead"><h2>Harry Potter</h2><span>Added to GyanSetu</span></div><div class="rule"></div><div class="results"><article class="bookCard"><button class="coverBtn" type="button" aria-label="Open Harry Potter PDF"><span class="coverFallback"><strong>Harry Potter</strong><small>J. K. Rowling</small></span><em>PDF</em></button><h3>Harry Potter</h3><p>J. K. Rowling</p><a class="read" href="${PDF_URL}" target="_blank" rel="noopener noreferrer">Read book</a></article></div>`;
    section.querySelector('.coverBtn').addEventListener('click', () => window.open(PDF_URL, '_blank', 'noopener,noreferrer'));
    content.prepend(section);
  }

  function start() {
    addHarryPotterCard();
    const content = document.querySelector('#content');
    if (!content) return setTimeout(start, 100);
    new MutationObserver(addHarryPotterCard).observe(content, { childList: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
