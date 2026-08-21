const INDIAN_PDF_BOOKS = [
  {
    id: 'ia-vijnanabhairava',
    title: 'Vijñānabhairava',
    authors: [{ name: 'Kṣemarāja commentary · Sanskrit' }],
    subjects: ['Kashmir Shaivism', 'Sanskrit', 'Philosophy', 'Public domain scans'],
    download_count: 18400,
    pdfUrl: 'https://archive.org/download/VijnanabhairavaOrDivineConsciousnessJaidevaSingh/Vijnanabhairava%20or%20Divine%20Consciousness%20-%20Jaideva%20Singh.pdf',
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
    coverUrl: 'https://archive.org/services/img/tirukkuralenglish00tiruuoft',
    archiveIdentifier: 'tirukkuralenglish00tiruuoft',
    language: 'Tamil / English',
    desc: 'A classic Tamil work presented as a full original-book PDF.',
  },
];

// All queries are scoped to mediatype:texts + format:pdf so only directly-openable
// public-domain / openly-licensed PDF scans are ever surfaced (no plain-text-only items,
// no catalogue-only listings that just link off-site).
const DIRECT_PDF_SOURCES = [
  {
    name: 'Indian books mega library',
    query: 'collection:(opensource_indian_books OR digitallibraryindia) AND mediatype:texts AND (format:pdf OR format:"Text PDF")',
  },
  {
    name: 'Fiction & classics',
    query: 'subject:(fiction OR classics OR literature OR novels) AND mediatype:texts AND (format:pdf OR format:"Text PDF")',
  },
  {
    name: 'Adventure',
    query: 'subject:(adventure OR "adventure stories" OR exploration OR "sea stories") AND mediatype:texts AND (format:pdf OR format:"Text PDF")',
  },
  {
    name: 'Mystery & detective',
    query: 'subject:(mystery OR detective OR crime OR thriller OR "murder mystery") AND mediatype:texts AND (format:pdf OR format:"Text PDF")',
  },
  {
    name: 'Romance & love stories',
    query: 'subject:(romance OR "love stories" OR "romantic fiction") AND mediatype:texts AND (format:pdf OR format:"Text PDF")',
  },
  {
    name: 'Science fiction & fantasy',
    query: 'subject:("science fiction" OR fantasy OR "speculative fiction" OR utopias) AND mediatype:texts AND (format:pdf OR format:"Text PDF")',
  },
  {
    name: 'Poetry',
    query: 'subject:(poetry OR poems OR verse) AND mediatype:texts AND (format:pdf OR format:"Text PDF")',
  },
  {
    name: 'Storybooks & children',
    query: 'subject:("children\'s stories" OR "fairy tales" OR "juvenile fiction" OR "folk tales" OR nursery) AND mediatype:texts AND (format:pdf OR format:"Text PDF")',
  },
  {
    name: 'Encyclopedias & reference',
    query: 'subject:(encyclopedia OR encyclopaedia OR dictionary OR atlas OR reference) AND mediatype:texts AND (format:pdf OR format:"Text PDF")',
  },
  {
    name: 'Comics & graphic novels',
    query: 'subject:(comics OR "comic books" OR "graphic novels") AND mediatype:texts AND (format:pdf OR format:"Text PDF")',
  },
  {
    // Most manga is still in copyright (Japanese copyright runs decades past the
    // author's death), so unlike the other shelves this query additionally requires
    // an explicit public-domain / Creative-Commons license field on the item. That
    // keeps this shelf legal even though it means fewer results than a bare
    // subject:manga search would return.
    name: 'Manga & graphic tales (public domain only)',
    query: 'subject:manga AND mediatype:texts AND (format:pdf OR format:"Text PDF") AND (licenseurl:*publicdomain* OR licenseurl:*creativecommons.org/publicdomain* OR licenseurl:*creativecommons.org/licenses*)',
  },
  {
    name: 'Science & technology',
    query: 'subject:(science OR mathematics OR technology OR engineering OR medicine) AND mediatype:texts AND (format:pdf OR format:"Text PDF")',
  },
  {
    name: 'History & biography',
    query: 'subject:(history OR biography OR memoir OR travel OR geography) AND mediatype:texts AND (format:pdf OR format:"Text PDF")',
  },
  {
    name: 'Philosophy, religion & ideas',
    query: 'subject:(philosophy OR religion OR spirituality OR psychology OR sociology) AND mediatype:texts AND (format:pdf OR format:"Text PDF")',
  },
];

const SHELVES = [
  ['Indian PDF Reading Room', { local: 'indian-pdfs' }],
  ['All Indian Open PDFs', { archive: DIRECT_PDF_SOURCES[0].query }],
  ['Fiction, Classics & Literature', { archive: DIRECT_PDF_SOURCES[1].query }],
  ['Adventure', { archive: DIRECT_PDF_SOURCES[2].query }],
  ['Mystery & Detective', { archive: DIRECT_PDF_SOURCES[3].query }],
  ['Romance & Love Stories', { archive: DIRECT_PDF_SOURCES[4].query }],
  ['Science Fiction & Fantasy', { archive: DIRECT_PDF_SOURCES[5].query }],
  ['Poetry', { archive: DIRECT_PDF_SOURCES[6].query }],
  ['Storybooks & Children', { archive: DIRECT_PDF_SOURCES[7].query }],
  ['Encyclopedias & Reference', { archive: DIRECT_PDF_SOURCES[8].query }],
  ['Comics & Graphic Novels', { archive: DIRECT_PDF_SOURCES[9].query }],
  ['Manga & Graphic Tales', { archive: DIRECT_PDF_SOURCES[10].query }],
  ['Science, Math & Technology', { archive: DIRECT_PDF_SOURCES[11].query }],
  ['History, Biography & Travel', { archive: DIRECT_PDF_SOURCES[12].query }],
  ['Philosophy, Religion & Ideas', { archive: DIRECT_PDF_SOURCES[13].query }],
];

const RESOURCE_LINKS = DIRECT_PDF_SOURCES.map((source) => ({
  name: source.name,
  type: 'Direct PDFs only',
  query: source.query,
  desc: 'Browse free online books in this genre as directly opened PDF files inside GyanSetu—no plain-text editions or catalogue-only links.',
}));

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
const archiveIdOf = (book) => book.archiveIdentifier || book.pdfUrl?.match(/archive\.org\/download\/([^/?#]+)/)?.[1] || '';
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
    rows: pageSize,
    page: 1,
    output: 'json',
    sort: 'downloads desc',
  });
  // archive.org's advancedsearch.php expects the field list as repeated fl[]
  // params, not one comma-joined "fl" value — the latter is silently ignored
  // and the API falls back to a default field set, which was one cause of
  // shelves failing to populate.
  ['identifier', 'title', 'creator', 'subject', 'downloads', 'language', 'description', 'licenseurl'].forEach((field) => params.append('fl[]', field));
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
  } catch { book.pdfUrl = ''; }
  return book;
}

async function hydrateInBatches(candidates, batchSize = 6) {
  const hydrated = [];
  for (let start = 0; start < candidates.length; start += batchSize) {
    const batch = candidates.slice(start, start + batchSize);
    hydrated.push(...await Promise.all(batch.map(hydrateArchivePdf)));
  }
  return hydrated;
}

async function searchArchive(query, count = 24) {
  const response = await fetch(archiveSearchUrl(query, count * 2));
  if (!response.ok) throw Error('The Internet Archive PDF index could not be reached. Please try again.');
  const data = await response.json();
  const candidates = (data.response?.docs || []).map(archiveBook);
  // Hydrate in small batches rather than one giant Promise.all — firing 30-48
  // metadata requests at once was getting rate-limited by archive.org, so most
  // candidates silently failed hydration and shelves came back empty.
  const hydrated = await hydrateInBatches(candidates);
  const books = hydrated.filter((book) => pdfOf(book)).slice(0, count);
  remember(books);
  return books;
}

async function searchBooks(query, count = 24) {
  if (query?.local === 'indian-pdfs') { remember(INDIAN_PDF_BOOKS); return INDIAN_PDF_BOOKS; }
  if (query?.archive) return searchArchive(query.archive, count);
  const term = typeof query === 'string' ? query : query?.search || query?.topic || 'free books';
  return searchArchive(`(${term}) AND mediatype:texts AND (format:pdf OR format:"Text PDF")`, count);
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
  box.innerHTML = `<div class="sectionHead"><div><p class="eyebrow">Free direct PDF collections</p><h2>Every shelf opens PDFs only</h2></div><span>No plain text books or catalogue-only links</span></div><div class="resourceGrid">${RESOURCE_LINKS.map((item) => `<button class="resourceCard" data-query="${esc(item.query)}"><small>${esc(item.type)}</small><b>${esc(item.name)}</b><span>${esc(item.desc)}</span></button>`).join('')}</div>`;
  box.querySelectorAll('[data-query]').forEach((button) => { button.onclick = () => showResults({ archive: button.dataset.query }); });
}

function directPdfLink(book) {
  const pdfUrl = pdfOf(book);
  return pdfUrl ? `<a class="sourceLink" href="${pdfUrl}" target="_blank" rel="noopener">Open direct PDF</a>` : '';
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
  if (!hasPdf) return '';
  return `<article class="bookCard"><button class="coverBtn" data-id="${book.id}" aria-label="View details for ${title}">${cover(book) ? `<img src="${cover(book)}" alt="${title}">` : `<span>${title}</span>`}<em>PDF</em></button><h3>${title}</h3><p>${esc(author(book))}</p><button class="read" data-id="${book.id}">Read PDF</button></article>`;
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
  const label = query?.local === 'indian-pdfs' ? 'Indian PDF library' : query?.archive ? 'Direct PDF collection' : typeof query === 'string' ? query : query.topic || query.search;
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
  document.body.insertAdjacentHTML('beforeend', `<div class="modal" role="dialog" aria-modal="true"><div class="details"><button class="close" aria-label="Close details">×</button><div class="detailCover">${cover(book) ? `<img src="${cover(book)}" alt="">` : `<span>${esc(book.title)}</span>`}</div><div><p class="eyebrow">★ ${hasPdf ? 'Embedded PDF edition' : 'Open book details'}</p><h2>${esc(book.title)}</h2><p class="byline">${esc(author(book))}</p><p class="desc">${esc(book.desc || (hasPdf ? 'Read the full PDF scan directly inside GyanSetu with vertical scrolling and the original page look.' : 'This title needs a directly accessible PDF before it can be opened in GyanSetu.'))}</p><dl><dt>Subjects</dt><dd>${esc((book.subjects || []).slice(0, 4).join(' · ') || 'Classic literature')}</dd><dt>Language</dt><dd>${esc(book.language || (book.languages || []).join(', ') || 'Open edition')}</dd><dt>Format</dt><dd>Complete scrollable PDF</dd></dl>${directPdfLink(book)}<button class="primary" ${hasPdf ? '' : 'disabled'}>${hasPdf ? '📖 Read PDF in GyanSetu' : 'PDF unavailable'}</button></div></div></div>`);
  $('.close').onclick = () => $('.modal').remove();
  $('.modal').onclick = (event) => { if (event.target.classList.contains('modal')) event.target.remove(); };
  $('.primary').onclick = () => { if (!hasPdf) return; $('.modal').remove(); openPdfReader(book); };
}

async function openPdfReader(book) {
  await hydrateArchivePdf(book);
  const pdfUrl = pdfOf(book);
  if (!pdfUrl) { alert('A direct PDF is not available for this item.'); return; }
  const readerUrl = `${pdfUrl}#toolbar=1&navpanes=0&view=FitH`;
  saveProgress(book, 'PDF opened');
  document.body.insertAdjacentHTML('beforeend', `<section class="reader" role="dialog" aria-modal="true"><div class="readerShell pdfShell"><div class="readerTop"><div><small>Original scanned PDF</small><b>${esc(book.title)}</b></div><button id="rclose" aria-label="Close reader">×</button></div><div class="pdfToolbar"><span>Scroll naturally to read the complete direct PDF inside GyanSetu.</span><a href="${pdfUrl}" download target="_blank" rel="noopener">Download PDF</a></div><iframe class="pdfFrame" title="${esc(book.title)} PDF" src="${readerUrl}"></iframe></div></section>`);
  const reader = $('.reader');
  const close = () => { reader?.remove(); if (activeReaderCleanup) window.removeEventListener('keydown', activeReaderCleanup); activeReaderCleanup = null; renderHistory(); };
  $('#rclose').onclick = close;
  activeReaderCleanup = (event) => { if (event.key === 'Escape') close(); };
  window.addEventListener('keydown', activeReaderCleanup);
}

render();
