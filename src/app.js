const SHELVES = [
  ['Curated Classics', { topic: 'fiction' }],
  ['Indian Literature', { search: 'Tagore Premchand Ramayana Mahabharata' }],
  ['Hindi & Regional Voices', { search: 'Hindi Bengali Tamil Marathi Sanskrit' }],
  ['Poetry & Drama', { topic: 'poetry' }],
  ['Open Comics & Graphic Stories', { search: 'comic graphic illustrated children' }],
  ['Philosophy & Ideas', { topic: 'philosophy' }],
  ['Adventure & Mystery', { topic: 'mystery' }],
  ['Science & Discovery', { topic: 'science' }],
];

const RESOURCE_LINKS = [
  { name: 'Digital Library of India', type: 'Indian books', url: 'https://archive.org/details/digitallibraryindia', desc: 'Large public archive of scanned Indian books in many languages hosted by the Internet Archive.' },
  { name: 'National Digital Library of India', type: 'Indian books', url: 'https://ndl.iitkgp.ac.in/', desc: 'India-focused discovery portal for books, papers, theses, videos, and learning collections.' },
  { name: 'Project Gutenberg India shelf', type: 'Indian classics', url: 'https://www.gutenberg.org/ebooks/bookshelf/101', desc: 'Public-domain Indian literature and India-related classics available for free reading.' },
  { name: 'Internet Archive India collections', type: 'Indian books', url: 'https://archive.org/details/opensource_indian_books', desc: 'Community-maintained open collections with downloadable Indian texts and scans.' },
  { name: 'Wikisource India languages', type: 'Indian texts', url: 'https://wikisource.org/wiki/Main_Page', desc: 'Proofread public-domain texts in Hindi, Sanskrit, Bengali, Tamil, Telugu, Urdu, and more.' },
  { name: 'Amar Chitra Katha on Archive.org', type: 'Comics', url: 'https://archive.org/search?query=Amar+Chitra+Katha', desc: 'Discover freely accessible comic scans where upload permissions and availability vary by item.' },
  { name: 'Comic Book Plus', type: 'Public-domain comics', url: 'https://comicbookplus.com/', desc: 'Golden-age and public-domain comic books, strips, and illustrated magazines.' },
  { name: 'Digital Comic Museum', type: 'Public-domain comics', url: 'https://digitalcomicmuseum.com/', desc: 'Free public-domain comic books, primarily golden-age titles.' },
];

const PAGE_CHARS = 1250;
const HISTORY_KEY = 'gyansetu.readingHistory';
const USER_KEY = 'gyansetu.googleUser';
const library = new Map();
let dark = true;
let activeReaderCleanup = null;
let currentUser = readJson(USER_KEY, null);
const $ = (selector, root = document) => root.querySelector(selector);
const app = $('#app');

const author = (book) => (book.authors || []).map((person) => person.name).join(', ') || 'Unknown author';
const cover = (book) => book.formats?.['image/jpeg'] || '';
const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const remember = (books) => books.forEach((book) => library.set(String(book.id), book));
const proxiedUrl = (url) => `https://r.jina.ai/${url}`;

function readJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function userInitials() {
  return (currentUser?.name || currentUser?.email || 'G').split(/\s|@/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
}

function userHistory() {
  if (!currentUser) return [];
  return readJson(HISTORY_KEY, {})[currentUser.email] || [];
}

function saveProgress(book, page, totalPages) {
  if (!currentUser || !totalPages) return;
  const all = readJson(HISTORY_KEY, {});
  const entry = {
    id: String(book.id), title: book.title, author: author(book), cover: cover(book), book,
    page, totalPages, percent: Math.round(((page + 1) / totalPages) * 100), updatedAt: new Date().toISOString(),
  };
  const existing = all[currentUser.email] || [];
  all[currentUser.email] = [entry, ...existing.filter((item) => item.id !== entry.id)].slice(0, 24);
  writeJson(HISTORY_KEY, all);
}

function booksUrl(query, pageSize = 24) {
  const params = new URLSearchParams({ page_size: pageSize });
  if (typeof query === 'string') params.set('search', query);
  else if (query?.topic) params.set('topic', query.topic);
  else if (query?.search) params.set('search', query.search);
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

async function fetchBook(url) {
  const attempts = [url];
  if (/^https:\/\/(?:www\.)?gutenberg\.org\//i.test(url)) attempts.push(proxiedUrl(url));
  for (const attempt of attempts) {
    try { const response = await fetch(attempt); if (response.ok) return response; } catch {}
  }
  throw Error('This book could not be opened right now. Please try again.');
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
  } else {
    const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
    const text = doc.body?.innerText || '';
    if (text.length > 400) return strip(text);
  }
  throw Error('No readable edition is available for this title.');
}

function pages(text) {
  const out = [];
  let current = '';
  for (const paragraph of text.replace(/\r\n/g, '\n').split(/\n\n+/)) {
    if ((current + '\n\n' + paragraph).length > PAGE_CHARS) {
      if (current) out.push(current.trim());
      current = paragraph;
    } else current = current ? `${current}\n\n${paragraph}` : paragraph;
  }
  if (current) out.push(current.trim());
  return out;
}

function render() {
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  app.innerHTML = `<div class="app"><header class="topbar"><a class="brand" href="#" aria-label="GyanSetu home"><img class="brandLogo" src="src/assets/gyansetu-logo.svg" alt="GyanSetu logo"><div><b>GyanSetu</b><span>Digital Library</span></div></a><form class="search"><span>⌕</span><input id="q" placeholder="Search books, authors, subjects..."><button>Search</button></form><nav class="topActions"><button class="navBtn" id="historyBtn">History</button><button class="accountBtn" id="loginBtn">${currentUser ? `<span>${userInitials()}</span>${esc(currentUser.name)}` : 'Continue with Google'}</button><button class="iconBtn" id="theme" aria-label="Toggle theme">${dark ? '☀' : '☾'}</button></nav></header><main><section class="hero"><div class="heroText"><p class="eyebrow">✦ public-domain learning, professionally organized</p><h1>A refined online library for focused reading.</h1><p>Discover Indian public-domain books, global classics, and open comic collections, then read them in a dedicated mobile-first room that feels like turning the pages of a real book.</p><div class="heroActions"><button data-search="Indian literature Tagore Premchand">Indian books</button><button class="ghost" data-search="comic graphic illustrated children">Open comics</button></div></div><aside class="device"><div class="deviceTop">Today’s reading desk <span>Popular picks</span></div><div class="gridMini" id="featured"></div></aside></section><section class="historyPanel" id="history"><div><p class="eyebrow">Reading history</p><h2>Pick up where you left off</h2></div><div id="historyList"></div></section><section class="resources" id="resources"></section><div id="content"></div></main></div>`;
  $('#theme').onclick = () => { dark = !dark; render(); };
  $('#loginBtn').onclick = loginFlow;
  $('#historyBtn').onclick = () => $('#history').scrollIntoView({ behavior: 'smooth' });
  $('.search').onsubmit = (event) => { event.preventDefault(); showResults($('#q').value.trim() || 'classic literature'); };
  document.querySelectorAll('[data-search]').forEach((button) => { button.onclick = () => showResults(button.dataset.search); });
  app.onclick = (event) => { const cardButton = event.target.closest('[data-id]'); if (cardButton) openDetails(library.get(cardButton.dataset.id), Number(cardButton.dataset.page || 0)); };
  renderHistory(); renderResources(); loadFeatured(); showShelves();
}

function loginFlow() {
  if (currentUser && confirm('Sign out of GyanSetu?')) { currentUser = null; localStorage.removeItem(USER_KEY); render(); return; }
  if (currentUser) return;
  const name = prompt('Continue with Google\n\nEnter your Google account name to enable reading history on this device:');
  if (!name) return;
  currentUser = { name: name.trim(), email: `${name.trim().toLowerCase().replace(/\s+/g, '.')}@google.user` };
  writeJson(USER_KEY, currentUser);
  render();
}


function renderResources() {
  const box = $('#resources');
  box.innerHTML = `<div class="sectionHead"><div><p class="eyebrow">Free & open collections</p><h2>Indian books and open comics</h2></div><a href="https://archive.org/" target="_blank" rel="noopener">Browse source archives →</a></div><div class="resourceGrid">${RESOURCE_LINKS.map((item) => `<a class="resourceCard" href="${item.url}" target="_blank" rel="noopener"><small>${esc(item.type)}</small><b>${esc(item.name)}</b><span>${esc(item.desc)}</span></a>`).join('')}</div>`;
}

function renderHistory() {
  const box = $('#historyList');
  if (!currentUser) { box.innerHTML = '<div class="emptyState"><b>Sign in with Google to save reading history.</b><p>Your books and last-read page will appear here on this device.</p></div>'; return; }
  const items = userHistory();
  remember(items.map((item) => item.book).filter(Boolean));
  box.innerHTML = items.length ? `<div class="historyGrid">${items.map((item) => `<button class="historyCard" data-id="${item.id}" data-page="${item.page}">${item.cover ? `<img src="${item.cover}" alt="">` : ''}<span><b>${esc(item.title)}</b><small>${esc(item.author)} · ${item.percent}% read</small><progress value="${item.page + 1}" max="${item.totalPages}"></progress></span></button>`).join('')}</div>` : '<div class="emptyState"><b>No saved books yet.</b><p>Open a book and your last-read page will be saved automatically.</p></div>';
}

function bookCard(book) {
  const title = esc(book.title);
  return `<article class="bookCard"><button class="coverBtn" data-id="${book.id}" aria-label="View details for ${title}">${cover(book) ? `<img src="${cover(book)}" alt="${title}">` : `<span>${title}</span>`}<em>${Math.min(99, Math.max(1, Math.round((book.download_count || 1000) / 1300)))}%</em></button><h3>${title}</h3><p>${esc(author(book))}</p><button class="read" data-id="${book.id}">View & read</button></article>`;
}

async function loadFeatured() {
  const box = $('#featured');
  try {
    const books = (await Promise.all(['Pride and Prejudice', 'The Time Machine', 'Sherlock Holmes', 'Gitanjali'].map((query) => searchBooks(query, 1).then((results) => results[0])))).filter(Boolean);
    remember(books);
    box.innerHTML = books.map((book) => `<button data-id="${book.id}" aria-label="View ${esc(book.title)}"><img src="${cover(book)}" alt=""><small>${Math.floor((book.download_count || 1000) / 1000)}k</small></button>`).join('');
  } catch { box.innerHTML = '<p class="muted">Featured books are temporarily unavailable.</p>'; }
}

function showShelves() {
  const content = $('#content');
  content.innerHTML = SHELVES.map((shelf, index) => `<section class="shelf"><div class="sectionHead"><h2>${shelf[0]}</h2><button data-shelf="${index}">See all →</button></div><div class="rule"></div><div class="rail" id="rail${index}">${'<div class="skeleton"></div>'.repeat(6)}</div></section>`).join('');
  document.querySelectorAll('[data-shelf]').forEach((button) => { button.onclick = () => showResults(SHELVES[button.dataset.shelf][1]); });
  SHELVES.forEach(async (shelf, index) => {
    const rail = $(`#rail${index}`);
    try { const books = await searchBooks(shelf[1], 12); rail.innerHTML = books.length ? books.map(bookCard).join('') : '<p class="muted">No books found on this shelf yet.</p>'; }
    catch (error) { rail.innerHTML = `<p class="muted">${esc(error.message)}</p>`; }
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
  } catch (error) { content.innerHTML = `<p class="muted">${esc(error.message)}</p>`; }
}

function openDetails(book, startPage = 0) {
  if (!book) return;
  document.body.insertAdjacentHTML('beforeend', `<div class="modal" role="dialog" aria-modal="true"><div class="details"><button class="close" aria-label="Close details">×</button><div class="detailCover">${cover(book) ? `<img src="${cover(book)}" alt="">` : `<span>${esc(book.title)}</span>`}</div><div><p class="eyebrow">★ Book details</p><h2>${esc(book.title)}</h2><p class="byline">${esc(author(book))}</p><p class="desc">Read this public-domain edition in GyanSetu's dedicated reading section. Your page is saved to history when you are signed in.</p><dl><dt>Subjects</dt><dd>${esc((book.subjects || []).slice(0, 4).join(' · ') || 'Classic literature')}</dd><dt>Downloads</dt><dd>${(book.download_count || 0).toLocaleString()}</dd></dl><button class="primary">📖 Start reading</button></div></div></div>`);
  $('.close').onclick = () => $('.modal').remove();
  $('.modal').onclick = (event) => { if (event.target.classList.contains('modal')) event.target.remove(); };
  $('.primary').onclick = () => { $('.modal').remove(); openReader(book, startPage); };
}

async function openReader(book, startPage = 0) {
  let page = Number(startPage) || 0;
  let bookPages = [];
  document.body.insertAdjacentHTML('beforeend', `<section class="reader" role="dialog" aria-modal="true"><div class="readerShell"><div class="readerTop"><div><small>Book-style reading room</small><b>${esc(book.title)}</b></div><button id="rclose" aria-label="Close reader">×</button></div><div class="readerTools"><button id="fontMinus">A−</button><input id="pageRange" type="range" min="1" value="1" max="1"><button id="fontPlus">A+</button></div><div class="bookStage"><button id="prev" aria-label="Previous page">‹</button><article class="bookSpread"><div class="page leftPage"><div class="loader">◌ Opening the book…</div></div><div class="page rightPage"></div></article><button id="next" aria-label="Next page">›</button></div><div class="mobileTurnHint">Swipe or tap the page edges to turn pages</div></div></section>`);
  const reader = $('.reader');
  let size = 1;
  const close = () => { saveProgress(book, page, bookPages.length); reader?.remove(); if (activeReaderCleanup) window.removeEventListener('keydown', activeReaderCleanup); activeReaderCleanup = null; renderHistory(); };
  const paint = () => { const left = $('.leftPage'); const right = $('.rightPage'); left.innerHTML = `<p>${esc(bookPages[page] || '')}</p><span>Page ${page + 1} of ${bookPages.length}</span>`; right.innerHTML = `<p>${esc(bookPages[page + 1] || 'End of this reading section.')}</p><span>${page + 2 <= bookPages.length ? `Page ${page + 2} of ${bookPages.length}` : 'GyanSetu'}</span>`; $('#pageRange').max = bookPages.length; $('#pageRange').value = page + 1; saveProgress(book, page, bookPages.length); };
  const turn = (delta) => { const step = window.matchMedia('(max-width: 760px)').matches ? 1 : 2; const nextPage = Math.max(0, Math.min(bookPages.length - 1, page + (delta * step))); if (nextPage === page) return; $('.bookSpread').classList.add(delta > 0 ? 'turnNext' : 'turnPrev'); setTimeout(() => { page = nextPage; paint(); $('.bookSpread').className = 'bookSpread'; }, 420); };
  $('#rclose').onclick = close; $('#next').onclick = () => turn(1); $('#prev').onclick = () => turn(-1);
  $('#fontMinus').onclick = () => { size = Math.max(.85, size - .1); document.querySelectorAll('.page').forEach((pageEl) => pageEl.style.setProperty('--reader-scale', size)); };
  $('#fontPlus').onclick = () => { size = Math.min(1.25, size + .1); document.querySelectorAll('.page').forEach((pageEl) => pageEl.style.setProperty('--reader-scale', size)); };
  $('#pageRange').oninput = (event) => { page = Number(event.target.value) - 1; paint(); };
  $('.bookSpread').onclick = (event) => { const bounds = event.currentTarget.getBoundingClientRect(); turn(event.clientX - bounds.left > bounds.width / 2 ? 1 : -1); };
  let touchStart = 0;
  $('.bookSpread').ontouchstart = (event) => { touchStart = event.changedTouches[0].clientX; };
  $('.bookSpread').ontouchend = (event) => { const diff = event.changedTouches[0].clientX - touchStart; if (Math.abs(diff) > 35) turn(diff < 0 ? 1 : -1); };
  activeReaderCleanup = (event) => { if ($('.reader')) { if (event.key === 'Escape') close(); if (event.key === 'ArrowRight') turn(1); if (event.key === 'ArrowLeft') turn(-1); } };
  window.addEventListener('keydown', activeReaderCleanup);
  try { bookPages = pages(await textOf(book)); page = Math.max(0, Math.min(bookPages.length - 1, page)); paint(); }
  catch (error) { $('.leftPage').innerHTML = `<p>${esc(error.message)}</p>`; $('.rightPage').innerHTML = ''; }
}

render();
