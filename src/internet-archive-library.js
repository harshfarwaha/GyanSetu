(() => {
  const CATEGORIES = [
    ['Love & Romance', 'romance OR love OR courtship', 'Romance & Love Stories'],
    ['Mystery & Detective', 'mystery OR detective OR crime OR thriller', 'Mystery & Detective'],
    ['Comics & Graphic Novels', 'comics OR comic OR "graphic novel" OR "comic book"', 'Comics & Graphic Novels'],
    ['Manga & Graphic Stories', 'manga OR manhwa OR "graphic stories"', 'Manga & Webcomics'],
    ['Adventure', 'adventure OR exploration OR travel', 'Adventure'],
    ['Science, Math & Technology', 'science OR mathematics OR physics OR engineering OR technology', 'Science, Math & Technology'],
    ['History & Biography', 'history OR biography OR memoir OR civilization', 'History, Biography & Travel'],
    ['Indian & Religion', 'India OR Indian OR Hindu OR Sanskrit OR Gita OR mythology', 'Indian Open PDFs'],
    ['Kids & Picture Books', 'children OR kids OR "picture book" OR fairy tale', 'Storybooks & Children']
  ];

  const API = 'https://archive.org/advancedsearch.php';
  const cache = new Map();
  const injected = new Set();

  const esc = (value = '') => String(value).replace(/[&<>\"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '\"':'&quot;', "'":'&#39;' }[c]));

  function queryFor(term) {
    return `(mediatype:(texts)) AND (licenseurl:(*creativecommons.org*) OR licenseurl:(*publicdomain*) OR collection:(opensource)) AND (${term})`;
  }

  async function searchArchive(term) {
    if (cache.has(term)) return cache.get(term);
    const params = new URLSearchParams();
    params.set('q', queryFor(term));
    ['identifier','title','creator','description','date','language','downloads','collection','licenseurl'].forEach((field) => params.append('fl[]', field));
    params.set('rows', '4');
    params.set('sort[]', 'downloads desc');
    params.set('output', 'json');
    const response = await fetch(`${API}?${params.toString()}`);
    if (!response.ok) throw new Error('Internet Archive is unavailable right now.');
    const data = await response.json();
    const docs = data?.response?.docs || [];
    cache.set(term, docs);
    return docs;
  }

  function card(item) {
    const id = item.identifier;
    const title = item.title || id;
    const creator = Array.isArray(item.creator) ? item.creator.join(', ') : (item.creator || 'Unknown author');
    const cover = `https://archive.org/services/img/${encodeURIComponent(id)}`;
    const details = `https://archive.org/details/${encodeURIComponent(id)}`;
    return `<article class="bookCard iaMergedCard"><a class="coverBtn" href="${details}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(title)} on Internet Archive"><img loading="lazy" decoding="async" src="${cover}" alt="${esc(title)}" onerror="this.style.display='none'"><em>Internet Archive</em></a><h3>${esc(title)}</h3><p>${esc(creator)}</p><a class="read" href="${details}" target="_blank" rel="noopener noreferrer">Read book</a></article>`;
  }

  function findRail(shelfTitle) {
    return [...document.querySelectorAll('#content .shelf')]
      .find((section) => section.querySelector('.sectionHead h2')?.textContent.trim() === shelfTitle)
      ?.querySelector('.rail');
  }

  async function mergeCategory(index) {
    const category = CATEGORIES[index];
    const rail = findRail(category[2]);
    if (!rail || injected.has(index)) return;

    injected.add(index);
    try {
      const docs = await searchArchive(category[1]);
      if (!docs.length) return;

      const uniqueDocs = docs.filter((item) => item.identifier);
      if (uniqueDocs.length) rail.insertAdjacentHTML('beforeend', uniqueDocs.map(card).join(''));
    } catch (error) {
      console.warn('Internet Archive merge skipped:', error);
      injected.delete(index);
    }
  }

  function mergeIntoShelves() {
    if (!document.querySelector('#content .shelf')) return;
    CATEGORIES.forEach((_, index) => mergeCategory(index));
  }

  function mount() {
    const app = document.getElementById('app');
    if (!app) return;

    // Internet Archive is a source inside the normal genre shelves, not a separate section.
    document.getElementById('iaLibrarySection')?.remove();
    document.getElementById('internetArchiveBtn')?.remove();
    mergeIntoShelves();
  }

  const observer = new MutationObserver(() => mount());
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      mount();
      observer.observe(document.getElementById('app') || document.body, { childList: true, subtree: true });
    });
  } else {
    mount();
    observer.observe(document.getElementById('app') || document.body, { childList: true, subtree: true });
  }
})();
