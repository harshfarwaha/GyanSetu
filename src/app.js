const INDIAN_PDF_BOOKS = [
  {
    id: 'ia-vijnanabhairava',
    title: 'Vijñānabhairava',
    authors: [{ name: 'Kṣemarāja commentary · Sanskrit' }],
    subjects: ['Kashmir Shaivism', 'Sanskrit', 'Philosophy', 'Public domain scans'],
    download_count: 18400,
    pdfUrl: 'https://archive.org/download/VijnanabhairavaOrDivineConsciousnessJaidevaSingh/Vijnanabhairava%20or%20Divine%20Consciousness%20-%20Jaideva%20Singh.pdf',
    sourceUrl: 'https://archive.org/details/VijnanabhairavaOrDivineConsciousnessJaidevaSingh',
    coverUrl: 'https://archive.org/services/img/VijnanabhairavaOrDivineConsciousnessJaidevaSingh',
    archiveIdentifier: 'VijnanabhairavaOrDivineConsciousnessJaidevaSingh',
    language: 'Sanskrit / English',
    desc: 'A scanned public-access edition for immersive page-by-page reading inside GyanSetu.',
  },
  {
    id: 'ia-gitanjali',
    title: 'Gitanjali',
    authors: [{ name: 'Rabindranath Tagore' }],
    subjects: ['Poetry', 'Bengali literature', 'Nobel classics', 'Public domain'],
    download_count: 32500,
    pdfUrl: 'https://archive.org/download/gitanjalisongoffe00tagouoft/gitanjalisongoffe00tagouoft.pdf',
    sourceUrl: 'https://archive.org/details/gitanjalisongoffe00tagouoft',
    coverUrl: 'https://archive.org/services/img/gitanjalisongoffe00tagouoft',
    archiveIdentifier: 'gitanjalisongoffe00tagouoft',
    language: 'English',
    desc: 'Tagore’s landmark poems in an original scanned edition that opens directly in the reader.',
  },
  {
    id: 'ia-godan',
    title: 'Godan',
    authors: [{ name: 'Munshi Premchand' }],
    subjects: ['Hindi literature', 'Novel', 'Indian classics', 'Public access'],
    download_count: 29100,
    pdfUrl: 'https://archive.org/download/Godan_201807/Godan.pdf',
    sourceUrl: 'https://archive.org/details/Godan_201807',
    coverUrl: 'https://archive.org/services/img/Godan_201807',
    archiveIdentifier: 'Godan_201807',
    language: 'Hindi',
    desc: 'A complete Hindi scan of Premchand’s classic novel for scroll-based reading.',
  },
  {
    id: 'ia-hind-swaraj',
    title: 'Hind Swaraj',
    authors: [{ name: 'M. K. Gandhi' }],
    subjects: ['Indian thought', 'Freedom movement', 'Political philosophy', 'Public domain'],
    download_count: 24800,
    pdfUrl: 'https://archive.org/download/hindswarajorind00gandrich/hindswarajorind00gandrich.pdf',
    sourceUrl: 'https://archive.org/details/hindswarajorind00gandrich',
    coverUrl: 'https://archive.org/services/img/hindswarajorind00gandrich',
    archiveIdentifier: 'hindswarajorind00gandrich',
    language: 'English',
    desc: 'An archival scanned edition of Gandhi’s influential text, kept inside GyanSetu.',
  },
  {
    id: 'ia-bhagavad-gita',
    title: 'The Bhagavad Gita',
    authors: [{ name: 'Translated by Kashinath Trimbak Telang' }],
    subjects: ['Sanskrit', 'Philosophy', 'Sacred texts', 'Public domain'],
    download_count: 37200,
    pdfUrl: 'https://archive.org/download/bhagavadgitawith00telauoft/bhagavadgitawith00telauoft.pdf',
    sourceUrl: 'https://archive.org/details/bhagavadgitawith00telauoft',
    coverUrl: 'https://archive.org/services/img/bhagavadgitawith00telauoft',
    archiveIdentifier: 'bhagavadgitawith00telauoft',
    language: 'Sanskrit / English',
    desc: 'A scanned scholarly edition that preserves the feel of the printed book.',
  },
  {
    id: 'ia-tirukkural',
    title: 'The Tirukkural',
    authors: [{ name: 'Tiruvalluvar' }],
    subjects: ['Tamil literature', 'Ethics', 'Poetry', 'Public domain'],
    download_count: 21400,
    pdfUrl: 'https://archive.org/download/tirukkuralenglish00tiruuoft/tirukkuralenglish00tiruuoft.pdf',
    sourceUrl: 'https://archive.org/details/tirukkuralenglish00tiruuoft',
    coverUrl: 'https://archive.org/services/img/tirukkuralenglish00tiruuoft',
    archiveIdentifier: 'tirukkuralenglish00tiruuoft',
    language: 'Tamil / English',
    desc: 'A classic Tamil work presented as a full original-book PDF.',
  },
];

const OPEN_LIBRARY_SOURCES = [
  {
    name: 'Indian books mega library',
    query: 'collection:(opensource_indian_books OR digitallibraryindia) AND mediatype:texts AND (format:pdf OR format:"Text PDF")',
  },
  {
    name: 'Encyclopedias',
    query: 'subject:(encyclopedia OR encyclopaedia) AND mediatype:texts AND (format:pdf OR format:"Text PDF")',
  },
  {
    name: 'Comics & graphic novels',
    query: 'subject:(comics OR "comic books" OR "graphic novels") AND mediatype:texts AND (format:pdf OR format:"Text PDF")',
  },
  {
    name: 'Manga',
    query: 'subject:manga AND mediatype:texts AND (format:pdf OR format:"Text PDF")',
  },
  {
    name: 'Science, fiction & every genre',
    query: 'mediatype:texts AND (subject:science OR subject:fiction OR subject:history OR subject:biography OR subject:poetry) AND (format:pdf OR format:"Text PDF")',
  },
];

const SHELVES = [
  ['Indian PDF Reading Room', { local: 'indian-pdfs' }],
  ['All Indian Open PDFs', { archive: OPEN_LIBRARY_SOURCES[0].query }],
  ['Encyclopedias', { archive: OPEN_LIBRARY_SOURCES[1].query }],
  ['Comics & Graphic Novels', { archive: OPEN_LIBRARY_SOURCES[2].query }],
  ['Manga', { archive: OPEN_LIBRARY_SOURCES[3].query }],
  ['Curated Classics', { topic: 'fiction' }],
  ['Indian Literature', { search: 'Tagore Premchand Ramayana Mahabharata' }],
  ['Hindi & Regional Voices', { search: 'Hindi Bengali Tamil Marathi Sanskrit' }],
  ['Poetry & Drama', { topic: 'poetry' }],
  ['Philosophy & Ideas', { topic: 'philosophy' }],
  ['Science & Discovery', { archive: OPEN_LIBRARY_SOURCES[4].query }],
];

const RESOURCE_LINKS = [
  { name: 'Internet Archive Open Source Books', type: 'All genres', url: 'https://archive.org/details/opensource', desc: 'Broad public-access library for PDFs across fiction, science, history, comics, manga, encyclopedias, and more.' },
  { name: 'Internet Archive Indian Books', type: 'Embedded source', url: 'https://archive.org/details/opensource_indian_books', desc: 'Source collection used for public-access Indian scanned editions embedded in the GyanSetu reader.' },
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
const pdfOf = (book) => book.pdfUrl || Object.entries(book.formats || {}).find(([type, url]) => /pdf/i.test(type) || String(url).toLowerCase().split('?')[0].endsWith('.pdf'))?.[1]?.replace('http://', 'https://') || '';
const archiveIdOf = (book) => book.archiveIdentifier || book.sourceUrl?.match(/archive\.org\/details\/([^/?#]+)/)?.[1] || book.pdfUrl?.match(/archive\.org\/download\/([^/?#]+)/)?.[1] || '';
const archiveEmbedOf = (book) => { const id = archiveIdOf(book); return id ? `https://archive.org/embed/${encodeURIComponent(id)}` : ''; };
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

function archiveSearchUrl(query, pageSize = 24) {
  const params = new URLSearchParams({
    q: query,
    fl: 'identifier,title,creator,subject,downloads,language,description',
    rows: pageSize,
    page: 1,
    output: 'json',
    sort: 'downloads desc',
  });
  return `https://archive.org/advancedsearch.php?${params}`;
}

function archiveBook(doc) {
  const id = `ia-${doc.identifier}`;
  const creators = Array.isArray(doc.creator) ? doc.creator : doc.creator ? [doc.creator] : [];
  const subjects = Array.isArray(doc.subject) ? doc.subject : doc.subject ? [doc.subject] : [];
  const description = Array.isArray(doc.description) ? doc.description[0] : doc.description;
  return {
    id,
    title: doc.title || doc.identifier,
    authors: creators.map((name) => ({ name })),
    subjects,
    download_count: doc.downloads || 0,
    pdfUrl: `https://archive.org/download/${doc.identifier}/${doc.identifier}.pdf`,
    sourceUrl: `https://archive.org/details/${doc.identifier}`,
    coverUrl: `https://archive.org/services/img/${doc.identifier}`,
    language: Array.isArray(doc.language) ? doc.language.join(', ') : doc.language || 'Open edition',
    desc: description || 'A free public-access scan from an open library source, opened as a complete in-site PDF whenever the source provides one.',
    archiveIdentifier: doc.identifier,
  };
}

async function hydrateArchivePdf(book) {
  const archiveIdentifier = archiveIdOf(book);
  if (!archiveIdentifier || book.pdfChecked) return book;
  book.archiveIdentifier = archiveIdentifier;
  book.pdfChecked = true;
  try {
    const response = await fetch(`https://archive.org/metadata/${archiveIdentifier}`);
    if (!response.ok) return book;
    const data = await response.json();
    const files = data.files || [];
    const preferred = files.find((file) => /\.pdf$/i.test(file.name) && !/_text\.pdf$/i.test(file.name)) || files.find((file) => /\.pdf$/i.test(file.name) || /pdf/i.test(file.format || ''));
    if (preferred?.name) book.pdfUrl = `https://archive.org/download/${archiveIdentifier}/${encodeURIComponent(preferred.name).replace(/%2F/g, '/')}`;
  } catch { /* Keep the predictable fallback URL so the reader can still try to open the item. */ }
  return book;
}

async function searchArchive(query, count = 24) {
  const response = await fetch(archiveSearchUrl(query, count));
  if (!response.ok) throw Error('The Internet Archive PDF index could not be reached. Please try again.');
  const data = await response.json();
  const books = (data.response?.docs || []).map(archiveBook);
  remember(books);
  return books;
}

function booksUrl(query, pageSize = 24) {
  const params = new URLSearchParams({ page_size: pageSize });
  if (typeof query === 'string') params.set('search', query);
  else if (query?.topic) params.set('topic', query.topic);
  else if (query?.search) params.set('search', query.search);
  return `https://gutendex.com/books/?${params}`;
}

async function searchBooks(query, count = 24) {
  if (query?.local === 'indian-pdfs') { remember(INDIAN_PDF_BOOKS); return INDIAN_PDF_BOOKS; }
  if (query?.archive) return searchArchive(query.archive, count);
  if (typeof query === 'string' && /pdf|indian books|encyclopedia|comics|manga/i.test(query)) return searchArchive(`(${query}) AND mediatype:texts AND (format:pdf OR format:"Text PDF")`, count);
  const response = await fetch(booksUrl(query, count));
  if (!response.ok) throw Error('The open library index could not be reached. Please try again.');
  const data = await response.json();
  const books = (data.results || []).slice(0, count).filter((book) => book.formats);
  remember(books);
  return books;
}

function render() {
  remember(INDIAN_PDF_BOOKS);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  app.innerHTML = `<div class="app"><header class="topbar"><a class="brand" href="#" aria-label="GyanSetu home"><img class="brandLogo" src="src/assets/gyansetu-logo.svg" alt="GyanSetu logo"><div><b>GyanSetu</b><span>Digital Library</span></div></a><form class="search"><span>⌕</span><input id="q" placeholder="Search books, authors, subjects..."><button>Search</button></form><nav class="topActions"><button class="navBtn" id="historyBtn">History</button><button class="accountBtn" id="loginBtn">${currentUser ? `<span>${userInitials()}</span>${esc(currentUser.name)}` : 'Continue with Google'}</button><button class="iconBtn" id="theme" aria-label="Toggle theme">${dark ? '☀' : '☾'}</button></nav></header><main><section class="hero"><div class="heroText"><p class="eyebrow">✦ full-pdf Indian reading room</p><h1>Read original scanned books without leaving GyanSetu.</h1><p>Open free books from open libraries—Indian books, encyclopedias, comics, manga, classics, and more—as complete embedded PDFs with natural vertical scrolling, archival pages, and a professional reading desk—no page-flip animation or redirect-heavy flow.</p><div class="heroActions"><button data-search="indian-pdfs">Open PDF library</button><button class="ghost" data-search="Indian books pdf encyclopedia comics manga">Search all open PDFs</button></div></div><aside class="device"><div class="deviceTop">Today’s reading desk <span>Scanned editions</span></div><div class="gridMini" id="featured"></div></aside></section><section class="historyPanel" id="history"><div><p class="eyebrow">Reading history</p><h2>Pick up where you left off</h2></div><div id="historyList"></div></section><section class="resources" id="resources"></section><div id="content"></div></main></div>`;
  $('#theme').onclick = () => { dark = !dark; render(); };
  $('#loginBtn').onclick = loginFlow;
  $('#historyBtn').onclick = () => $('#history').scrollIntoView({ behavior: 'smooth' });
  $('.search').onsubmit = (event) => { event.preventDefault(); showResults($('#q').value.trim() || 'classic literature'); };
  document.querySelectorAll('[data-search]').forEach((button) => { button.onclick = () => showResults(button.dataset.search === 'indian-pdfs' ? { local: 'indian-pdfs' } : button.dataset.search); });
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
  box.innerHTML = `<div class="sectionHead"><div><p class="eyebrow">Free & open collections</p><h2>Sources for in-site PDFs</h2></div><span>Searches fetch PDFs from open catalogues</span></div><div class="resourceGrid">${RESOURCE_LINKS.map((item) => `<a class="resourceCard" href="${item.url}" target="_blank" rel="noopener"><small>${esc(item.type)}</small><b>${esc(item.name)}</b><span>${esc(item.desc)}</span></a>`).join('')}</div>`;
}

function sourceLink(book) {
  return book.sourceUrl ? `<a class="sourceLink" href="${book.sourceUrl}" target="_blank" rel="noopener">Source record</a>` : '';
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
  remember(INDIAN_PDF_BOOKS);
  box.innerHTML = INDIAN_PDF_BOOKS.slice(0, 4).map((book) => `<button data-id="${book.id}" aria-label="View ${esc(book.title)}"><img src="${cover(book)}" alt=""><small>PDF</small></button>`).join('');
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
  const label = query?.local === 'indian-pdfs' ? 'Indian PDF library' : query?.archive ? 'Open-library PDF collection' : typeof query === 'string' ? query : query.topic || query.search;
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
  document.body.insertAdjacentHTML('beforeend', `<div class="modal" role="dialog" aria-modal="true"><div class="details"><button class="close" aria-label="Close details">×</button><div class="detailCover">${cover(book) ? `<img src="${cover(book)}" alt="">` : `<span>${esc(book.title)}</span>`}</div><div><p class="eyebrow">★ ${hasPdf ? 'Embedded PDF edition' : 'Open book details'}</p><h2>${esc(book.title)}</h2><p class="byline">${esc(author(book))}</p><p class="desc">${esc(book.desc || (hasPdf ? 'Read the full PDF scan directly inside GyanSetu with vertical scrolling and the original page look.' : 'This title is available through the open catalogue. PDF availability depends on the source edition.'))}</p><dl><dt>Subjects</dt><dd>${esc((book.subjects || []).slice(0, 4).join(' · ') || 'Classic literature')}</dd><dt>Language</dt><dd>${esc(book.language || (book.languages || []).join(', ') || 'Open edition')}</dd><dt>Format</dt><dd>${hasPdf ? 'Complete scrollable PDF' : 'Catalogue edition'}</dd></dl>${sourceLink(book)}<button class="primary">${hasPdf ? '📖 Read PDF in GyanSetu' : '📖 Open reader'}</button></div></div></div>`);
  $('.close').onclick = () => $('.modal').remove();
  $('.modal').onclick = (event) => { if (event.target.classList.contains('modal')) event.target.remove(); };
  $('.primary').onclick = () => { $('.modal').remove(); hasPdf ? openPdfReader(book) : openTextFallback(book); };
}

async function openPdfReader(book) {
  await hydrateArchivePdf(book);
  const pdfUrl = pdfOf(book);
  const embedUrl = archiveEmbedOf(book);
  const readerUrl = pdfUrl ? `${pdfUrl}#toolbar=1&navpanes=0&view=FitH` : embedUrl;
  saveProgress(book, 'PDF opened');
  document.body.insertAdjacentHTML('beforeend', `<section class="reader" role="dialog" aria-modal="true"><div class="readerShell pdfShell"><div class="readerTop"><div><small>Original scanned PDF</small><b>${esc(book.title)}</b></div><button id="rclose" aria-label="Close reader">×</button></div><div class="pdfToolbar"><span>Scroll naturally to read the complete book inside GyanSetu.</span>${pdfUrl ? `<a href="${pdfUrl}" download target="_blank" rel="noopener">Download PDF</a>` : sourceLink(book)}</div><iframe class="pdfFrame" title="${esc(book.title)} PDF" src="${readerUrl}"></iframe></div></section>`);
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
