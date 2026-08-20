const SHELVES = [
  ['Classic Fiction', { topic: 'fiction' }],
  ['Poetry & Drama', { topic: 'poetry' }],
  ['Philosophy & Ideas', { topic: 'philosophy' }],
  ['Indian Literature', { search: 'Tagore Premchand' }],
  ['Adventure & Mystery', { topic: 'mystery' }],
  ['Science & Discovery', { topic: 'science' }],
];

const PAGE_CHARS = 1150;
const library = new Map();
let dark = true;
let activeReaderCleanup = null;
const $ = (selector, root = document) => root.querySelector(selector);
const app = $('#app');

const author = (book) => (book.authors || []).map((person) => person.name).join(', ') || 'Unknown author';
const cover = (book) => book.formats?.['image/jpeg'] || '';
const esc = (value = '') => String(value).replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
const remember = (books) => books.forEach((book) => library.set(String(book.id), book));
const proxiedUrl = (url) => `https://r.jina.ai/${url}`;

function booksUrl(query, pageSize = 24) {
  const params = new URLSearchParams({ page_size: pageSize });
  if (typeof query === 'string') {
    params.set('search', query);
  } else if (query?.topic) {
    params.set('topic', query.topic);
  } else if (query?.search) {
    params.set('search', query.search);
  }
  return `https://gutendex.com/books/?${params}`;
}

async function searchBooks(query, count = 24) {
  const response = await fetch(booksUrl(query, count));
  if (!response.ok) throw Error('The open library index could not be reached. Please try again.');
  const data = await response.json();
  const books = (data.results || []).slice(0, count).filter((book) => book.formats);
  remember(books);
  return books;
}

function strip(text) {
  return text
    .replace(/[\s\S]*?\*\*\* START OF (?:THE|THIS) PROJECT GUTENBERG EBOOK[^\n]*\*\*\*/i, '')
    .replace(/\*\*\* END OF (?:THE|THIS) PROJECT GUTENBERG EBOOK[\s\S]*/i, '')
    .trim();
}

async function textOf(book) {
  const entries = Object.entries(book.formats || {});
  const textUrl = entries.find(([type]) => type.startsWith('text/plain'))?.[1];
  const htmlUrl = entries.find(([type]) => type.includes('text/html'))?.[1];
  const url = (textUrl || htmlUrl || '').replace('http://', 'https://');
  if (!url) throw Error('No readable edition is available for this title.');

  const response = await fetchBook(url);
  if (textUrl) {
    const text = await response.text();
    if (text.length > 400) return strip(text);
    throw Error('No readable edition is available for this title.');
  }

  const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
  const text = doc.body?.innerText || '';
  if (text.length > 400) return strip(text);
  throw Error('No readable edition is available for this title.');
}

async function fetchBook(url) {
  const attempts = [url];
  if (/^https:\/\/(?:www\.)?gutenberg\.org\//i.test(url)) attempts.push(proxiedUrl(url));

  for (const attempt of attempts) {
    try {
      const response = await fetch(attempt);
      if (response.ok) return response;
    } catch {
      // Some Project Gutenberg file hosts intermittently block browser CORS.
      // Try the reader-friendly proxy fallback before showing the error.
    }
  }

  throw Error('This book could not be opened right now. Please try again.');
}

function pages(text) {
  const out = [];
  let current = '';
  for (const paragraph of text.replace(/\r\n/g, '\n').split(/\n\n+/)) {
    if ((current + '\n\n' + paragraph).length > PAGE_CHARS) {
      if (current) out.push(current.trim());
      current = paragraph;
    } else {
      current = current ? `${current}\n\n${paragraph}` : paragraph;
    }
  }
  if (current) out.push(current.trim());
  return out;
}

function render() {
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  app.innerHTML = `<div class="app"><header class="topbar"><div class="brand"><img class="brandLogo" src="src/assets/gyansetu-logo.svg" alt="GyanSetu logo"><div><b>GyanSetu</b><span>Free Digital Library</span></div></div><form class="search"><span>⌕</span><input id="q" placeholder="Search free books, authors, classics..."><button>Search</button></form><button class="iconBtn" id="theme" aria-label="Toggle theme">${dark ? '☀' : '☾'}</button></header><main><section class="hero"><div class="heroText"><div class="heroLogoWrap"><img class="heroLogo" src="src/assets/gyansetu-logo.svg" alt="GyanSetu"></div><p class="eyebrow">✦ public-domain learning, beautifully presented</p><h1>Read timeless books online with a friendly digital library.</h1><p>Browse reliable Project Gutenberg books, view clear details, and open a smooth reader that works comfortably on desktop and mobile.</p><div class="heroActions"><button data-search="classic literature">Explore classics</button><button class="ghost" data-search="Indian literature Tagore Premchand">Indian literature</button></div></div><div class="device"><div class="deviceTop">Library <span>Popular picks</span></div><div class="gridMini" id="featured"></div></div></section><div id="content"></div></main></div>`;
  $('#theme').onclick = () => { dark = !dark; render(); };
  $('.search').onsubmit = (event) => { event.preventDefault(); showResults($('#q').value.trim() || 'classic literature'); };
  document.querySelectorAll('[data-search]').forEach((button) => { button.onclick = () => showResults(button.dataset.search); });
  app.onclick = (event) => {
    const cardButton = event.target.closest('[data-id]');
    if (!cardButton) return;
    const book = library.get(cardButton.dataset.id);
    if (book) openDetails(book);
  };
  loadFeatured();
  showShelves();
}

function bookCard(book) {
  const title = esc(book.title);
  return `<article class="bookCard"><button class="coverBtn" data-id="${book.id}" aria-label="View details for ${title}">${cover(book) ? `<img src="${cover(book)}" alt="${title}">` : `<span>${title}</span>`}<em>${Math.min(99, Math.max(1, Math.round((book.download_count || 1000) / 1300)))}%</em></button><h3>${title}</h3><p>${esc(author(book))}</p><button class="read" data-id="${book.id}">ⓘ Details</button></article>`;
}

async function loadFeatured() {
  const box = $('#featured');
  try {
    const books = (await Promise.all(['Pride and Prejudice', 'The Time Machine', 'Sherlock Holmes', 'Gitanjali'].map((query) => searchBooks(query, 1).then((results) => results[0])))).filter(Boolean);
    remember(books);
    box.innerHTML = books.map((book) => `<button data-id="${book.id}" aria-label="View ${esc(book.title)}"><img src="${cover(book)}" alt=""><small>${Math.floor((book.download_count || 1000) / 1000)}k</small></button>`).join('');
  } catch {
    box.innerHTML = '<p class="muted">Featured books are temporarily unavailable.</p>';
  }
}

function showShelves() {
  const content = $('#content');
  content.innerHTML = SHELVES.map((shelf, index) => `<section class="shelf"><div class="sectionHead"><h2>${shelf[0]}</h2><button data-shelf="${index}">See all →</button></div><div class="rule"></div><div class="rail" id="rail${index}">${'<div class="skeleton"></div>'.repeat(6)}</div></section>`).join('');
  document.querySelectorAll('[data-shelf]').forEach((button) => { button.onclick = () => showResults(SHELVES[button.dataset.shelf][1]); });
  SHELVES.forEach(async (shelf, index) => {
    const rail = $(`#rail${index}`);
    try {
      const books = await searchBooks(shelf[1], 12);
      rail.innerHTML = books.length ? books.map(bookCard).join('') : '<p class="muted">No books found on this shelf yet.</p>';
    } catch (error) {
      rail.innerHTML = `<p class="muted">${esc(error.message)}</p>`;
    }
  });
}

async function showResults(query) {
  const label = typeof query === 'string' ? query : query.topic || query.search;
  const content = $('#content');
  content.innerHTML = `<section class="shelf"><div class="sectionHead"><h2>Results for “${esc(label)}”</h2></div><div class="rule"></div><div class="loader">◌ Searching open books…</div></section>`;
  try {
    const books = await searchBooks(query, 36);
    content.innerHTML = `<section class="shelf"><div class="sectionHead"><h2>Results for “${esc(label)}”</h2></div><div class="rule"></div><div class="results">${books.length ? books.map(bookCard).join('') : '<p class="muted">No matching public-domain books found. Try another title or author.</p>'}</div></section>`;
    content.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    content.innerHTML = `<p class="muted">${esc(error.message)}</p>`;
  }
}

function openDetails(book) {
  document.body.insertAdjacentHTML('beforeend', `<div class="modal" role="dialog" aria-modal="true"><div class="details"><button class="close" aria-label="Close details">×</button><div class="detailCover">${cover(book) ? `<img src="${cover(book)}" alt="">` : `<span>${esc(book.title)}</span>`}</div><div><p class="eyebrow">★ Book details</p><h2>${esc(book.title)}</h2><p class="byline">${esc(author(book))}</p><p class="desc">This public-domain edition is available through Project Gutenberg. Open it in GyanSetu's reader for keyboard navigation and a calm mobile-friendly layout.</p><dl><dt>Subjects</dt><dd>${esc((book.subjects || []).slice(0, 4).join(' · ') || 'Classic literature')}</dd><dt>Downloads</dt><dd>${(book.download_count || 0).toLocaleString()}</dd></dl><button class="primary">📖 Start reading</button></div></div></div>`);
  $('.close').onclick = () => $('.modal').remove();
  $('.modal').onclick = (event) => { if (event.target.classList.contains('modal')) event.target.remove(); };
  $('.primary').onclick = () => { $('.modal').remove(); openReader(book); };
}

async function openReader(book) {
  let page = 0;
  let bookPages = [];
  document.body.insertAdjacentHTML('beforeend', `<div class="reader" role="dialog" aria-modal="true"><div class="readerTop"><b>${esc(book.title)}</b><button id="rclose" aria-label="Close reader">×</button></div><div class="bookStage"><button id="prev" aria-label="Previous page">‹</button><div class="page"><div class="loader">◌ Opening the book…</div></div><button id="next" aria-label="Next page">›</button></div></div>`);
  const close = () => {
    $('.reader')?.remove();
    if (activeReaderCleanup) window.removeEventListener('keydown', activeReaderCleanup);
    activeReaderCleanup = null;
  };
  const paint = () => { $('.page').innerHTML = `<p>${esc(bookPages[page])}</p><span>${page + 1} / ${bookPages.length}</span>`; };
  const turn = (delta) => {
    if (!bookPages.length) return;
    const nextPage = Math.max(0, Math.min(bookPages.length - 1, page + delta));
    if (nextPage === page) return;
    $('.page').classList.add(delta > 0 ? 'next' : 'prev');
    setTimeout(() => { page = nextPage; paint(); $('.page').className = 'page'; }, 260);
  };
  $('#rclose').onclick = close;
  $('#next').onclick = () => turn(1);
  $('#prev').onclick = () => turn(-1);
  activeReaderCleanup = (event) => { if ($('.reader')) { if (event.key === 'Escape') close(); if (event.key === 'ArrowRight') turn(1); if (event.key === 'ArrowLeft') turn(-1); } };
  window.addEventListener('keydown', activeReaderCleanup);
  try {
    bookPages = pages(await textOf(book));
    paint();
  } catch (error) {
    $('.page').innerHTML = `<p>${esc(error.message)}</p>`;
  }
}

render();
