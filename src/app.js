const SHELVES = [
  ['Classic Fiction', 'topic:fiction'],
  ['Poetry & Drama', 'topic:poetry'],
  ['Philosophy & Ideas', 'topic:philosophy'],
  ['Indian Literature', 'Tagore Premchand'],
  ['Adventure & Mystery', 'topic:mystery'],
  ['Science & Discovery', 'topic:science'],
];

const FEATURED = ['Pride and Prejudice', 'The Time Machine', 'Sherlock Holmes', 'Gitanjali'];
const PAGE_CHARS = 1150;
const booksByKey = new Map();
let dark = true;
let activeReaderKey = null;

const $ = (selector, root = document) => root.querySelector(selector);
const app = $('#app');
const keyFor = (book) => `${book.source || 'gutendex'}:${book.id}`;
const author = (book) => (book.authors || []).map((a) => a.name).join(', ') || 'Unknown author';
const cover = (book) => book.formats?.['image/jpeg'] || book.cover || '';
const escapeHtml = (value = '') => String(value).replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));

function rememberBooks(books) {
  books.forEach((book) => booksByKey.set(keyFor(book), book));
  return books;
}

async function searchGutendex(query, limit) {
  const response = await fetch(`https://gutendex.com/books/?search=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Gutendex search failed');
  const data = await response.json();
  return (data.results || []).slice(0, limit).map((book) => ({ ...book, source: 'gutendex' }));
}

async function searchOpenLibrary(query, limit) {
  const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${limit}`);
  if (!response.ok) throw new Error('Open Library search failed');
  const data = await response.json();
  return (data.docs || []).map((doc) => ({
    id: doc.key,
    source: 'openlibrary',
    title: doc.title,
    authors: (doc.author_name || []).slice(0, 3).map((name) => ({ name })),
    subjects: (doc.subject || []).slice(0, 8),
    download_count: doc.edition_count || 0,
    cover: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : '',
    openUrl: `https://openlibrary.org${doc.key}`,
    formats: {},
  }));
}

async function searchBooks(query, limit = 24) {
  const settled = await Promise.allSettled([
    searchGutendex(query, limit),
    searchOpenLibrary(query, Math.max(8, Math.ceil(limit / 2))),
  ]);
  const combined = settled.flatMap((result) => (result.status === 'fulfilled' ? result.value : []));
  if (!combined.length) throw new Error('No library source responded');
  return rememberBooks(combined.slice(0, limit));
}

function stripGutenberg(text) {
  return text
    .replace(/[\s\S]*?\*\*\* START OF (?:THE|THIS) PROJECT GUTENBERG EBOOK[^\n]*\*\*\*/i, '')
    .replace(/\*\*\* END OF (?:THE|THIS) PROJECT GUTENBERG EBOOK[\s\S]*/i, '')
    .trim();
}

async function textOf(book) {
  const candidates = Object.entries(book.formats || {})
    .filter(([type]) => type.startsWith('text/plain'))
    .map(([, url]) => url.replace('http://', 'https://'));

  for (const url of candidates) {
    try {
      const response = await fetch(url);
      if (!response.ok) continue;
      const text = await response.text();
      if (text.length > 400) return stripGutenberg(text);
    } catch (_) {
      // Try the next public mirror/format.
    }
  }

  if (book.openUrl) {
    throw new Error('This Open Library item does not expose a streamable plain-text edition. Use the source link in details to borrow or read it there.');
  }
  throw new Error('No readable plain-text edition is available for this title.');
}

function paginate(text) {
  const pageList = [];
  let current = '';
  for (const paragraph of text.replace(/\r\n/g, '\n').split(/\n\n+/)) {
    if ((current + '\n\n' + paragraph).length > PAGE_CHARS) {
      if (current) pageList.push(current.trim());
      current = paragraph;
    } else {
      current = current ? `${current}\n\n${paragraph}` : paragraph;
    }
  }
  if (current) pageList.push(current.trim());
  return pageList;
}

function render() {
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  app.innerHTML = `
    <div class="app">
      <header class="topbar">
        <div class="brand"><img class="brandLogo" src="src/assets/gyansetu-logo.svg" alt="GyanSetu logo"><div><b>GyanSetu</b><span>Free Digital Library</span></div></div>
        <form class="search"><span>⌕</span><input id="q" placeholder="Search free books, authors, classics..."><button>Search</button></form>
        <button class="iconBtn" id="theme" type="button">${dark ? '☀' : '☾'}</button>
      </header>
      <main>
        <section class="hero">
          <div class="heroText">
            <div class="heroLogoWrap"><img class="heroLogo" src="src/assets/gyansetu-logo.svg" alt="GyanSetu"></div>
            <p class="eyebrow">✦ public-domain learning, beautifully presented</p>
            <h1>Read timeless books online with a Kindle-style library.</h1>
            <p>Browse curated shelves, inspect book details, and open an animated page-flip reader designed for comfortable long-form reading.</p>
            <div class="heroActions"><button data-search="classic literature">Explore classics</button><button class="ghost" data-search="Indian literature">Indian literature</button></div>
          </div>
          <div class="device"><div class="deviceTop">Library <span>All items</span></div><div class="gridMini" id="featured"></div></div>
        </section>
        <div id="content"></div>
      </main>
    </div>`;

  $('#theme').onclick = () => { dark = !dark; render(); };
  $('.search').onsubmit = (event) => {
    event.preventDefault();
    showResults($('#q').value.trim() || 'classic literature');
  };
  document.querySelectorAll('[data-search]').forEach((button) => {
    button.onclick = () => showResults(button.dataset.search);
  });
  loadFeatured();
  showShelves();
}

function bookCard(book) {
  const key = keyFor(book);
  return `<article class="bookCard">
    <button class="coverBtn" data-book-key="${escapeHtml(key)}" type="button">
      ${cover(book) ? `<img src="${escapeHtml(cover(book))}" alt="${escapeHtml(book.title)}">` : `<span>${escapeHtml(book.title)}</span>`}
      <em>${book.source === 'openlibrary' ? 'OL' : `${Math.min(99, Math.max(1, Math.round((book.download_count || 1000) / 1300)))}%`}</em>
    </button>
    <h3>${escapeHtml(book.title)}</h3>
    <p>${escapeHtml(author(book))}</p>
    <button class="read" data-book-key="${escapeHtml(key)}" type="button">ⓘ Details</button>
  </article>`;
}

async function loadFeatured() {
  const box = $('#featured');
  try {
    const books = rememberBooks((await Promise.all(FEATURED.map((query) => searchGutendex(query, 1).then((items) => items[0])))).filter(Boolean));
    box.innerHTML = books.map((book) => `<button data-book-key="${escapeHtml(keyFor(book))}" type="button"><img src="${escapeHtml(cover(book))}" alt="${escapeHtml(book.title)}"><small>${Math.floor((book.download_count || 1000) / 1000)}k</small></button>`).join('');
  } catch {
    box.innerHTML = '<p class="muted">Featured books are temporarily unavailable.</p>';
  }
}

function showShelves() {
  const content = $('#content');
  content.innerHTML = SHELVES.map((shelf, index) => `<section class="shelf"><div class="sectionHead"><h2>${shelf[0]}</h2><button data-search="${shelf[1]}" type="button">See all →</button></div><div class="rule"></div><div class="rail" id="rail${index}">${'<div class="skeleton"></div>'.repeat(6)}</div></section>`).join('');
  document.querySelectorAll('[data-search]').forEach((button) => { button.onclick = () => showResults(button.dataset.search); });

  SHELVES.forEach(async (shelf, index) => {
    try {
      const books = await searchBooks(shelf[1], 12);
      $(`#rail${index}`).innerHTML = books.map(bookCard).join('');
    } catch {
      $(`#rail${index}`).innerHTML = '<p class="muted">Could not load this shelf. Please check your connection and try again.</p>';
    }
  });
}

async function showResults(query) {
  const content = $('#content');
  content.innerHTML = `<section class="shelf"><div class="sectionHead"><h2>Results for “${escapeHtml(query)}”</h2></div><div class="rule"></div><div class="loader">◌ Searching open libraries…</div></section>`;
  try {
    const books = await searchBooks(query, 36);
    content.innerHTML = `<section class="shelf"><div class="sectionHead"><h2>Results for “${escapeHtml(query)}”</h2></div><div class="rule"></div><div class="results">${books.map(bookCard).join('')}</div></section>`;
  } catch {
    content.innerHTML = '<p class="muted">Could not reach Gutendex or Open Library. Please try again.</p>';
  }
}

function openDetails(book) {
  document.body.insertAdjacentHTML('beforeend', `<div class="modal"><div class="details"><button class="close" type="button">×</button><div class="detailCover">${cover(book) ? `<img src="${escapeHtml(cover(book))}" alt="${escapeHtml(book.title)}">` : ''}</div><div><p class="eyebrow">★ Book details</p><h2>${escapeHtml(book.title)}</h2><p class="byline">${escapeHtml(author(book))}</p><p class="desc">This title was found from ${book.source === 'openlibrary' ? 'Open Library' : 'Project Gutenberg via Gutendex'}. GyanSetu opens streamable public-domain text in the animated reader whenever the source provides a plain-text edition.</p><dl><dt>Subjects</dt><dd>${escapeHtml((book.subjects || []).slice(0, 4).join(' · ') || 'Classic literature')}</dd><dt>Source</dt><dd>${book.source === 'openlibrary' ? `<a href="${escapeHtml(book.openUrl)}" target="_blank" rel="noreferrer">Open Library</a>` : 'Project Gutenberg'}</dd></dl><button class="primary" type="button">📖 Start reading</button></div></div></div>`);
  $('.close').onclick = () => $('.modal').remove();
  $('.primary').onclick = () => { $('.modal').remove(); openReader(book); };
}

async function openReader(book) {
  activeReaderKey = keyFor(book);
  let page = 0;
  let pageList = [];
  document.body.insertAdjacentHTML('beforeend', `<div class="reader"><div class="readerTop"><b>${escapeHtml(book.title)}</b><button id="rclose" type="button">×</button></div><div class="bookStage"><button id="prev" type="button">‹</button><div class="page"><div class="loader">◌ Opening the book…</div></div><button id="next" type="button">›</button></div></div>`);
  const close = () => { activeReaderKey = null; $('.reader')?.remove(); };
  const paint = () => { $('.page').innerHTML = `<p>${escapeHtml(pageList[page])}</p><span>${page + 1} / ${pageList.length}</span>`; };
  const turn = (direction) => {
    if (!pageList.length) return;
    const next = Math.max(0, Math.min(pageList.length - 1, page + direction));
    if (next === page) return;
    $('.page').classList.add(direction > 0 ? 'next' : 'prev');
    setTimeout(() => { page = next; paint(); $('.page').className = 'page'; }, 360);
  };

  $('#rclose').onclick = close;
  $('#next').onclick = () => turn(1);
  $('#prev').onclick = () => turn(-1);

  try {
    pageList = paginate(await textOf(book));
    paint();
  } catch (error) {
    $('.page').innerHTML = `<p>${escapeHtml(error.message)}</p>${book.openUrl ? `<a class="sourceLink" href="${escapeHtml(book.openUrl)}" target="_blank" rel="noreferrer">Open at source library</a>` : ''}`;
  }
}

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-book-key]');
  if (!trigger) return;
  const book = booksByKey.get(trigger.dataset.bookKey);
  if (book) openDetails(book);
});

window.addEventListener('keydown', (event) => {
  if (!activeReaderKey || !$('.reader')) return;
  if (event.key === 'Escape') $('#rclose')?.click();
  if (event.key === 'ArrowRight') $('#next')?.click();
  if (event.key === 'ArrowLeft') $('#prev')?.click();
});

render();
