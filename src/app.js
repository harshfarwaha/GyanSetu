const INDIAN_PDF_SEARCHES = [
  {
    label: 'Indian public-domain scanned books',
    query: 'collection:(opensource_indian_books OR digitallibraryindia OR JaiGyan) AND mediatype:texts AND (subject:India OR subject:Indian OR language:Hindi OR language:Sanskrit OR language:Tamil OR language:Bengali)',
  },
  {
    label: 'Indian literature scans',
    query: 'mediatype:texts AND (title:Tagore OR title:Premchand OR title:Gandhi OR title:Bhagavad OR title:Ramayana OR title:Mahabharata OR title:Tirukkural)',
  },
];

const ARCHIVE_SEARCH_URL = 'https://archive.org/advancedsearch.php';
const ARCHIVE_METADATA_URL = 'https://archive.org/metadata/';
const PDF_CACHE_KEY = 'gyansetu.importedIndianPdfs';
const PDF_CACHE_MS = 1000 * 60 * 60 * 12;

const SHELVES = [
  ['Indian PDF Reading Room', { importPdfs: true }],
  ['Curated Classics', { topic: 'fiction' }],
  ['Indian Literature', { search: 'Tagore Premchand Ramayana Mahabharata' }],
  ['Hindi & Regional Voices', { search: 'Hindi Bengali Tamil Marathi Sanskrit' }],
  ['Poetry & Drama', { topic: 'poetry' }],
  ['Philosophy & Ideas', { topic: 'philosophy' }],
  ['Science & Discovery', { topic: 'science' }],
];

const RESOURCE_LINKS = [
  { name: 'Internet Archive Indian Books', type: 'Live PDF source', url: 'https://archive.org/details/opensource_indian_books', desc: 'GyanSetu imports available public-access PDF files from this third-party archive and opens them in-site.' },
  { name: 'Digital Library of India', type: 'Indian books', url: 'https://archive.org/details/digitallibraryindia', desc: 'Large public archive of scanned Indian books in many languages hosted by the Internet Archive.' },
  { name: 'Project Gutenberg India shelf', type: 'Indian classics', url: 'https://www.gutenberg.org/ebooks/bookshelf/101', desc: 'Public-domain Indian literature and India-related classics available for free reading.' },
  { name: 'Wikisource India languages', type: 'Indian texts', url: 'https://wikisource.org/wiki/Main_Page', desc: 'Proofread public-domain texts in Hindi, Sanskrit, Bengali, Tamil, Telugu, Urdu, and more.' },
];

const HISTORY_KEY = 'gyansetu.readingHistory';
const USER_KEY = 'gyansetu.googleUser';
const library = new Map();
let dark = true;
let activeReaderCleanup = null;
let currentUser = readJson(USER_KEY, null);
const $ = (selector, root = document) => root.querySelector(selector);
const app = $('#app');

const author = (book) => (book.authors || []).map((person) => person.name).join(', ') || 'Unknown author';
const cover = (book) => book.coverUrl || book.formats?.['image/jpeg'] || '';
const pdfOf = (book) => book.pdfUrl || Object.entries(book.formats || {}).find(([type, url]) => type.includes('pdf') || String(url).toLowerCase().endsWith('.pdf'))?.[1]?.replace('http://', 'https://') || '';
const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const remember = (books) => books.forEach((book) => library.set(String(book.id), book));

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

function cacheIsFresh(cache) {
  return cache?.savedAt && Date.now() - cache.savedAt < PDF_CACHE_MS && Array.isArray(cache.books) && cache.books.length;
}

function archiveDownloadUrl(identifier, filename) {
  return `https://archive.org/download/${encodeURIComponent(identifier)}/${filename.split('/').map(encodeURIComponent).join('/')}`;
}

function bestPdfFile(files = []) {
  const pdfs = files.filter((file) => file?.name && /\.pdf$/i.test(file.name));
  return pdfs.find((file) => /text pdf|additional text pdf/i.test(file.format || ''))
    || pdfs.find((file) => !/_text\.pdf$/i.test(file.name))
    || pdfs[0];
}

async function archiveSearchDocuments(count) {
  const perSearch = Math.max(12, Math.ceil(count / INDIAN_PDF_SEARCHES.length) + 4);
  const requests = INDIAN_PDF_SEARCHES.map(({ query }) => {
    const params = new URLSearchParams({ q: query, output: 'json', rows: String(perSearch), sort: 'downloads desc' });
    ['identifier', 'title', 'creator', 'language', 'subject', 'downloads'].forEach((field) => params.append('fl[]', field));
    return fetch(`${ARCHIVE_SEARCH_URL}?${params}`).then((response) => {
      if (!response.ok) throw Error('The online PDF archive could not be reached. Please try again.');
      return response.json();
    });
  });
  const payloads = await Promise.all(requests);
  const seen = new Set();
  return payloads.flatMap((payload) => payload.response?.docs || []).filter((doc) => {
    if (!doc.identifier || seen.has(doc.identifier)) return false;
    seen.add(doc.identifier);
    return true;
  }).slice(0, count);
}

async function importedPdfBook(doc) {
  const response = await fetch(`${ARCHIVE_METADATA_URL}${encodeURIComponent(doc.identifier)}`);
  if (!response.ok) return null;
  const metadata = await response.json();
  const pdf = bestPdfFile(metadata.files);
  if (!pdf) return null;
  const creator = Array.isArray(doc.creator) ? doc.creator.join(', ') : doc.creator;
  const subjects = Array.isArray(doc.subject) ? doc.subject : doc.subject ? [doc.subject] : [];
  return {
    id: `ia-${doc.identifier}`,
    title: doc.title || metadata.metadata?.title || doc.identifier,
    authors: [{ name: creator || metadata.metadata?.creator || 'Open archive contributor' }],
    subjects: subjects.slice(0, 6),
    download_count: Number(doc.downloads || metadata.item_size || 0),
    pdfUrl: archiveDownloadUrl(doc.identifier, pdf.name),
    sourceUrl: `https://archive.org/details/${encodeURIComponent(doc.identifier)}`,
    coverUrl: `https://archive.org/services/img/${encodeURIComponent(doc.identifier)}`,
    language: Array.isArray(doc.language) ? doc.language.join(', ') : doc.language || metadata.metadata?.language || 'Open edition',
    desc: 'Imported live from a third-party open archive as a complete PDF scan for in-site reading.',
  };
}

async function fetchImportedIndianPdfs(count = 24) {
  const cached = readJson(PDF_CACHE_KEY, null);
  if (cacheIsFresh(cached)) { remember(cached.books); return cached.books.slice(0, count); }
  const docs = await archiveSearchDocuments(count * 2);
  const settled = await Promise.allSettled(docs.map(importedPdfBook));
  const books = settled.map((result) => result.status === 'fulfilled' ? result.value : null).filter(Boolean).slice(0, count);
  if (!books.length) throw Error('No complete online PDFs were found in the archive response. Please try again.');
  writeJson(PDF_CACHE_KEY, { savedAt: Date.now(), books });
  remember(books);
  return books;
}

function saveProgress(book, marker = 'Opened') {
  if (!currentUser) return;
  const all = readJson(HISTORY_KEY, {});
  const entry = {
    id: String(book.id), title: book.title, author: author(book), cover: cover(book), book,
    page: 0, totalPages: 1, percent: 100, marker, updatedAt: new Date().toISOString(),
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
  if (query?.importPdfs) return fetchImportedIndianPdfs(count);
  const response = await fetch(booksUrl(query, count));
  if (!response.ok) throw Error('The open library index could not be reached. Please try again.');
  const data = await response.json();
  const books = (data.results || []).slice(0, count).filter((book) => book.formats);
  remember(books);
  return books;
}

function render() {
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  app.innerHTML = `<div class="app"><header class="topbar"><a class="brand" href="#" aria-label="GyanSetu home"><img class="brandLogo" src="src/assets/gyansetu-logo.svg" alt="GyanSetu logo"><div><b>GyanSetu</b><span>Digital Library</span></div></a><form class="search"><span>⌕</span><input id="q" placeholder="Search books, authors, subjects..."><button>Search</button></form><nav class="topActions"><button class="navBtn" id="historyBtn">History</button><button class="accountBtn" id="loginBtn">${currentUser ? `<span>${userInitials()}</span>${esc(currentUser.name)}` : 'Continue with Google'}</button><button class="iconBtn" id="theme" aria-label="Toggle theme">${dark ? '☀' : '☾'}</button></nav></header><main><section class="hero"><div class="heroText"><p class="eyebrow">✦ full-pdf Indian reading room</p><h1>Read original scanned books without leaving GyanSetu.</h1><p>Open free Indian classics as complete embedded PDFs with natural vertical scrolling, archival pages, and a professional reading desk—no page-flip animation or redirect-heavy flow.</p><div class="heroActions"><button data-search="indian-pdfs">Open PDF library</button><button class="ghost" data-search="Indian literature Tagore Premchand Ramayana Mahabharata">Search Indian classics</button></div></div><aside class="device"><div class="deviceTop">Today’s reading desk <span>Scanned editions</span></div><div class="gridMini" id="featured"></div></aside></section><section class="historyPanel" id="history"><div><p class="eyebrow">Reading history</p><h2>Pick up where you left off</h2></div><div id="historyList"></div></section><section class="resources" id="resources"></section><div id="content"></div></main></div>`;
  $('#theme').onclick = () => { dark = !dark; render(); };
  $('#loginBtn').onclick = loginFlow;
  $('#historyBtn').onclick = () => $('#history').scrollIntoView({ behavior: 'smooth' });
  $('.search').onsubmit = (event) => { event.preventDefault(); showResults($('#q').value.trim() || 'classic literature'); };
  document.querySelectorAll('[data-search]').forEach((button) => { button.onclick = () => showResults(button.dataset.search === 'indian-pdfs' ? { importPdfs: true } : button.dataset.search); });
  app.onclick = (event) => { const cardButton = event.target.closest('[data-id]'); if (cardButton) openDetails(library.get(cardButton.dataset.id)); };
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
  box.innerHTML = `<div class="sectionHead"><div><p class="eyebrow">Free & open collections</p><h2>Sources for in-site PDFs</h2></div><span>Books open inside GyanSetu</span></div><div class="resourceGrid">${RESOURCE_LINKS.map((item) => `<a class="resourceCard" href="${item.url}" target="_blank" rel="noopener"><small>${esc(item.type)}</small><b>${esc(item.name)}</b><span>${esc(item.desc)}</span></a>`).join('')}</div>`;
}

function renderHistory() {
  const box = $('#historyList');
  if (!currentUser) { box.innerHTML = '<div class="emptyState"><b>Sign in with Google to save reading history.</b><p>Your books and last-opened PDFs will appear here on this device.</p></div>'; return; }
  const items = userHistory();
  remember(items.map((item) => item.book).filter(Boolean));
  box.innerHTML = items.length ? `<div class="historyGrid">${items.map((item) => `<button class="historyCard" data-id="${item.id}">${item.cover ? `<img src="${item.cover}" alt="">` : ''}<span><b>${esc(item.title)}</b><small>${esc(item.author)} · ${esc(item.marker || 'Opened')}</small><progress value="1" max="1"></progress></span></button>`).join('')}</div>` : '<div class="emptyState"><b>No saved books yet.</b><p>Open a book and your reading desk will remember it.</p></div>';
}

function bookCard(book) {
  const title = esc(book.title);
  const hasPdf = Boolean(pdfOf(book));
  return `<article class="bookCard"><button class="coverBtn" data-id="${book.id}" aria-label="View details for ${title}">${cover(book) ? `<img src="${cover(book)}" alt="${title}">` : `<span>${title}</span>`}<em>${hasPdf ? 'PDF' : 'TEXT'}</em></button><h3>${title}</h3><p>${esc(author(book))}</p><button class="read" data-id="${book.id}">${hasPdf ? 'Read PDF' : 'View details'}</button></article>`;
}

async function loadFeatured() {
  const box = $('#featured');
  try {
    const books = await fetchImportedIndianPdfs(8);
    box.innerHTML = books.slice(0, 4).map((book) => `<button data-id="${book.id}" aria-label="View ${esc(book.title)}"><img src="${cover(book)}" alt=""><small>PDF</small></button>`).join('');
  } catch { box.innerHTML = '<p class="muted">Imported PDFs are temporarily unavailable.</p>'; }
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
  const label = query?.importPdfs ? 'Indian PDF library' : typeof query === 'string' ? query : query.topic || query.search;
  const content = $('#content');
  content.innerHTML = `<section class="shelf"><div class="sectionHead"><h2>Results for “${esc(label)}”</h2></div><div class="rule"></div><div class="loader">◌ Searching open books…</div></section>`;
  try {
    const books = await searchBooks(query, 36);
    content.innerHTML = `<section class="shelf"><div class="sectionHead"><h2>Results for “${esc(label)}”</h2></div><div class="rule"></div><div class="results">${books.length ? books.map(bookCard).join('') : '<p class="muted">No matching public-domain books found. Try another title or author.</p>'}</div></section>`;
    content.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) { content.innerHTML = `<p class="muted">${esc(error.message)}</p>`; }
}

function openDetails(book) {
  if (!book) return;
  const hasPdf = Boolean(pdfOf(book));
  document.body.insertAdjacentHTML('beforeend', `<div class="modal" role="dialog" aria-modal="true"><div class="details"><button class="close" aria-label="Close details">×</button><div class="detailCover">${cover(book) ? `<img src="${cover(book)}" alt="">` : `<span>${esc(book.title)}</span>`}</div><div><p class="eyebrow">★ ${hasPdf ? 'Embedded PDF edition' : 'Open book details'}</p><h2>${esc(book.title)}</h2><p class="byline">${esc(author(book))}</p><p class="desc">${esc(book.desc || (hasPdf ? 'Read the full PDF scan directly inside GyanSetu with vertical scrolling and the original page look.' : 'This title is available through the open catalogue. PDF availability depends on the source edition.'))}</p><dl><dt>Subjects</dt><dd>${esc((book.subjects || []).slice(0, 4).join(' · ') || 'Classic literature')}</dd><dt>Language</dt><dd>${esc(book.language || (book.languages || []).join(', ') || 'Open edition')}</dd><dt>Format</dt><dd>${hasPdf ? 'Complete scrollable PDF' : 'Catalogue edition'}</dd></dl><button class="primary">${hasPdf ? '📖 Read PDF in GyanSetu' : '📖 Open reader'}</button></div></div></div>`);
  $('.close').onclick = () => $('.modal').remove();
  $('.modal').onclick = (event) => { if (event.target.classList.contains('modal')) event.target.remove(); };
  $('.primary').onclick = () => { $('.modal').remove(); hasPdf ? openPdfReader(book) : openTextFallback(book); };
}

function openPdfReader(book) {
  const pdfUrl = pdfOf(book);
  saveProgress(book, 'PDF opened');
  document.body.insertAdjacentHTML('beforeend', `<section class="reader" role="dialog" aria-modal="true"><div class="readerShell pdfShell"><div class="readerTop"><div><small>Original scanned PDF</small><b>${esc(book.title)}</b></div><button id="rclose" aria-label="Close reader">×</button></div><div class="pdfToolbar"><span>Scroll naturally to read the complete book inside GyanSetu.</span><a href="${pdfUrl}" download target="_blank" rel="noopener">Download PDF</a></div><iframe class="pdfFrame" title="${esc(book.title)} PDF" src="${pdfUrl}#toolbar=1&navpanes=0&view=FitH"></iframe></div></section>`);
  const reader = $('.reader');
  const close = () => { reader?.remove(); if (activeReaderCleanup) window.removeEventListener('keydown', activeReaderCleanup); activeReaderCleanup = null; renderHistory(); };
  $('#rclose').onclick = close;
  activeReaderCleanup = (event) => { if (event.key === 'Escape') close(); };
  window.addEventListener('keydown', activeReaderCleanup);
}

function openTextFallback(book) {
  const url = Object.entries(book.formats || {}).find(([type]) => type.startsWith('text/plain'))?.[1]?.replace('http://', 'https://');
  if (!url) { alert('A complete PDF is not available for this catalogue item yet. Try the Indian PDF Reading Room shelf.'); return; }
  saveProgress(book, 'Text opened');
  document.body.insertAdjacentHTML('beforeend', `<section class="reader" role="dialog" aria-modal="true"><div class="readerShell pdfShell"><div class="readerTop"><div><small>Continuous reading view</small><b>${esc(book.title)}</b></div><button id="rclose" aria-label="Close reader">×</button></div><article class="textScroll"><div class="loader">◌ Opening the text…</div></article></div></section>`);
  const reader = $('.reader');
  const close = () => { reader?.remove(); if (activeReaderCleanup) window.removeEventListener('keydown', activeReaderCleanup); activeReaderCleanup = null; renderHistory(); };
  $('#rclose').onclick = close;
  activeReaderCleanup = (event) => { if (event.key === 'Escape') close(); };
  window.addEventListener('keydown', activeReaderCleanup);
  fetch(url).then((response) => response.text()).then((text) => { $('.textScroll').innerHTML = `<pre>${esc(text.replace(/[\s\S]*?\*\*\* START OF (?:THE|THIS) PROJECT GUTENBERG EBOOK[^\n]*\*\*\*/i, '').replace(/\*\*\* END OF (?:THE|THIS) PROJECT GUTENBERG EBOOK[\s\S]*/i, '').trim())}</pre>`; }).catch(() => { $('.textScroll').innerHTML = '<p class="muted">This text could not be opened right now.</p>'; });
}

render();
