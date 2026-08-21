(() => {
  'use strict';
  let opening = false;

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>\"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '\"':'&quot;', "'":'&#39;' }[c]));

  function findSearchForm() {
    return document.querySelector('form.search, .search');
  }

  function openSearchWindow() {
    if (opening || document.querySelector('.searchUxOverlay')) return;
    const form = findSearchForm();
    if (!form) return;
    opening = true;

    const overlay = document.createElement('div');
    overlay.className = 'searchUxOverlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.innerHTML = `
      <section class="searchUxWindow">
        <header class="searchUxHeader">
          <div><div class="searchUxEyebrow">GyanSetu Library</div><h2>Search Books</h2><p>Find a book by title, author, genre or language.</p></div>
          <button type="button" class="searchUxClose" aria-label="Close search">×</button>
        </header>
        <div class="searchUxControls">
          <input id="searchUxQuery" type="search" autocomplete="off" placeholder="Book name, author or keyword…" aria-label="Book name, author or keyword">
          <select id="searchUxGenre" aria-label="Select genre">
            <option value="">All genres</option>
            <option>Romance</option><option>Mystery & Detective</option><option>Fiction, Classics & Literature</option><option>Adventure</option><option>Science Fiction & Fantasy</option><option>Storybooks & Children</option><option>Science, Math & Technology</option><option>History, Biography & Travel</option><option>Philosophy, Religion & Ideas</option><option>Indian</option><option>Poetry</option><option>Shayari & Punjabi Poetry</option>
          </select>
          <select id="searchUxLanguage" aria-label="Select language">
            <option value="">All languages</option><option>English</option><option>Hindi</option><option>Punjabi</option><option>Urdu</option>
          </select>
          <button type="button" id="searchUxGo">Search</button>
        </div>
        <div class="searchUxResults" id="searchUxResults"><div class="searchUxEmpty">Type a book name or choose a genre/language to start.</div></div>
      </section>`;
    document.body.appendChild(overlay);
    document.body.classList.add('searchUxLocked');

    const close = () => { overlay.remove(); document.body.classList.remove('searchUxLocked'); opening = false; };
    overlay.querySelector('.searchUxClose').onclick = close;
    overlay.addEventListener('click', (event) => { if (event.target === overlay) close(); });

    const queryInput = overlay.querySelector('#searchUxQuery');
    const genre = overlay.querySelector('#searchUxGenre');
    const language = overlay.querySelector('#searchUxLanguage');
    const results = overlay.querySelector('#searchUxResults');

    const render = () => {
      const query = queryInput.value.trim().toLowerCase();
      const genreValue = genre.value.toLowerCase();
      const languageValue = language.value.toLowerCase();
      const cards = [...document.querySelectorAll('#content .bookCard')];
      const matches = cards.filter((card) => {
        const text = card.textContent.toLowerCase();
        const genreText = card.dataset.genre?.toLowerCase() || text;
        const languageText = card.dataset.language?.toLowerCase() || text;
        return (!query || text.includes(query)) && (!genreValue || genreText.includes(genreValue)) && (!languageValue || languageText.includes(languageValue));
      });

      if (!query && !genreValue && !languageValue) {
        results.innerHTML = '<div class="searchUxEmpty">Type a book name or choose a genre/language to start.</div>';
        return;
      }
      if (!matches.length) {
        results.innerHTML = '<div class="searchUxEmpty">No matching books found. Try another title, genre or language.</div>';
        return;
      }
      results.innerHTML = `<div class="searchUxCount">${matches.length} book${matches.length === 1 ? '' : 's'} found</div><div class="searchUxGrid">${matches.map((card, index) => `<div class="searchUxCard" data-search-index="${index}">${card.outerHTML}</div>`).join('')}</div>`;
      results.querySelectorAll('.searchUxCard').forEach((wrapper, index) => {
        wrapper.addEventListener('click', (event) => {
          const clicked = event.target.closest('button, a');
          if (!clicked) return;
          const original = matches[index];
          close();
          setTimeout(() => {
            const target = document.querySelector(`#content .bookCard[data-id="${CSS.escape(original.dataset.id || '')}"]`);
            (target || original)?.querySelector('button, a')?.click();
          }, 0);
        });
      });
    };

    overlay.querySelector('#searchUxGo').onclick = render;
    queryInput.addEventListener('input', render);
    queryInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); render(); } });
    genre.addEventListener('change', render);
    language.addEventListener('change', render);
    setTimeout(() => queryInput.focus(), 50);
    opening = false;
  }

  function bind() {
    const form = findSearchForm();
    if (!form || form.dataset.searchWindowBound === 'true') return;
    const input = form.querySelector('input, #q');
    if (!input) return;
    form.dataset.searchWindowBound = 'true';
    input.addEventListener('focus', (event) => { event.preventDefault(); openSearchWindow(); }, true);
    input.addEventListener('click', (event) => { event.preventDefault(); openSearchWindow(); }, true);
  }

  const boot = () => { bind(); new MutationObserver(bind).observe(document.body, { childList: true, subtree: true }); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true }); else boot();
})();
