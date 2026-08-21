const FREE_PDF_BOOKS = [
  {
    id: 'gutenberg-gitanjali', title: 'Gitanjali', authors: [{ name: 'Rabindranath Tagore' }],
    subjects: ['Poetry', 'Indian literature', 'Public domain', 'Project Gutenberg'], genre: 'Poetry', download_count: 32500,
    pdfUrl: 'https://www.gutenberg.org/files/7164/7164-pdf.pdf', coverUrl: '', sourceName: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/ebooks/7164', language: 'English',
    desc: 'Tagore’s Nobel-winning poems from Project Gutenberg as a direct public-domain PDF.'
  },
  {
    id: 'gutenberg-hind-swaraj', title: 'Hind Swaraj or Indian Home Rule', authors: [{ name: 'M. K. Gandhi' }],
    subjects: ['Indian thought', 'Freedom movement', 'Political philosophy', 'Public domain'], genre: 'Philosophy, Religion & Ideas', download_count: 24800,
    pdfUrl: 'https://www.gutenberg.org/files/10366/10366-pdf.pdf', coverUrl: '', sourceName: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/ebooks/10366', language: 'English',
    desc: 'Gandhi’s influential political text from Project Gutenberg, not Internet Archive.'
  },
  {
    id: 'gutenberg-bhagavad-gita', title: 'The Bhagavad-Gita', authors: [{ name: 'Translated by Sir Edwin Arnold' }],
    subjects: ['Sacred texts', 'Indian classics', 'Philosophy', 'Public domain'], genre: 'Philosophy, Religion & Ideas', download_count: 37200,
    pdfUrl: 'https://www.gutenberg.org/files/2388/2388-pdf.pdf', coverUrl: '', sourceName: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/ebooks/2388', language: 'English',
    desc: 'A public-domain verse translation available directly from Project Gutenberg.'
  },
  {
    id: 'gutenberg-pride-prejudice', title: 'Pride and Prejudice', authors: [{ name: 'Jane Austen' }],
    subjects: ['Fiction', 'Classics', 'Romance', 'Public domain'], genre: 'Fiction, Classics & Literature', download_count: 65000,
    pdfUrl: 'https://www.gutenberg.org/files/1342/1342-pdf.pdf', coverUrl: '', sourceName: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/ebooks/1342', language: 'English', desc: 'A classic novel provided as a Project Gutenberg PDF.'
  },
  {
    id: 'gutenberg-sherlock', title: 'The Adventures of Sherlock Holmes', authors: [{ name: 'Arthur Conan Doyle' }],
    subjects: ['Mystery', 'Detective fiction', 'Short stories', 'Public domain'], genre: 'Mystery & Detective', download_count: 59000,
    pdfUrl: 'https://www.gutenberg.org/files/1661/1661-pdf.pdf', coverUrl: '', sourceName: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/ebooks/1661', language: 'English', desc: 'Detective stories from Project Gutenberg in direct PDF form.'
  },
  {
    id: 'gutenberg-treasure-island', title: 'Treasure Island', authors: [{ name: 'Robert Louis Stevenson' }],
    subjects: ['Adventure', 'Sea stories', 'Classics', 'Public domain'], genre: 'Adventure', download_count: 51000,
    pdfUrl: 'https://www.gutenberg.org/files/120/120-pdf.pdf', coverUrl: '', sourceName: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/ebooks/120', language: 'English', desc: 'A public-domain adventure classic in PDF.'
  },
  {
    id: 'gutenberg-frankenstein', title: 'Frankenstein', authors: [{ name: 'Mary Wollstonecraft Shelley' }],
    subjects: ['Science fiction', 'Horror', 'Classics', 'Public domain'], genre: 'Science Fiction & Fantasy', download_count: 62000,
    pdfUrl: 'https://www.gutenberg.org/files/84/84-pdf.pdf', coverUrl: '', sourceName: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/ebooks/84', language: 'English', desc: 'Mary Shelley’s landmark science-fiction novel as a free PDF.'
  },
  {
    id: 'gutenberg-alice', title: "Alice's Adventures in Wonderland", authors: [{ name: 'Lewis Carroll' }],
    subjects: ['Children', 'Fantasy', 'Classics', 'Public domain'], genre: 'Storybooks & Children', download_count: 57000,
    pdfUrl: 'https://www.gutenberg.org/files/11/11-pdf.pdf', coverUrl: '', sourceName: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/ebooks/11', language: 'English', desc: 'A beloved public-domain children’s fantasy in PDF.'
  },
  {
    id: 'openstax-biology-2e', title: 'Biology 2e', authors: [{ name: 'OpenStax' }], subjects: ['Biology', 'Science', 'Textbook', 'CC BY'], genre: 'Science, Math & Technology', download_count: 44000,
    pdfUrl: 'https://assets.openstax.org/oscms-prodcms/media/documents/Biology2e-WEB_ICOFkGu.pdf', coverUrl: '', sourceName: 'OpenStax', sourceUrl: 'https://openstax.org/details/books/biology-2e', language: 'English', desc: 'An openly licensed college biology textbook from OpenStax.'
  },
  {
    id: 'openstax-chemistry-2e', title: 'Chemistry 2e', authors: [{ name: 'OpenStax' }], subjects: ['Chemistry', 'Science', 'Textbook', 'CC BY'], genre: 'Science, Math & Technology', download_count: 39000,
    pdfUrl: 'https://assets.openstax.org/oscms-prodcms/media/documents/Chemistry2e-WEB_0o9L4pn.pdf', coverUrl: '', sourceName: 'OpenStax', sourceUrl: 'https://openstax.org/details/books/chemistry-2e', language: 'English', desc: 'A free, peer-reviewed chemistry textbook from OpenStax.'
  },
  {
    id: 'openstax-us-history', title: 'U.S. History', authors: [{ name: 'OpenStax' }], subjects: ['History', 'Textbook', 'CC BY'], genre: 'History, Biography & Travel', download_count: 34000,
    pdfUrl: 'https://assets.openstax.org/oscms-prodcms/media/documents/U.S.History-WEB.pdf', coverUrl: '', sourceName: 'OpenStax', sourceUrl: 'https://openstax.org/details/books/us-history', language: 'English', desc: 'An openly licensed U.S. history textbook.'
  },
  {
    id: 'openstax-psychology-2e', title: 'Psychology 2e', authors: [{ name: 'OpenStax' }], subjects: ['Psychology', 'Social science', 'Textbook', 'CC BY'], genre: 'Philosophy, Religion & Ideas', download_count: 36000,
    pdfUrl: 'https://assets.openstax.org/oscms-prodcms/media/documents/Psychology2e-WEB_0eRvAre.pdf', coverUrl: '', sourceName: 'OpenStax', sourceUrl: 'https://openstax.org/details/books/psychology-2e', language: 'English', desc: 'A free introductory psychology textbook from OpenStax.'
  }
];

const SHELVES = [
  ['Indian Open PDFs', { genre: 'Indian' }], ['Fiction, Classics & Literature', { genre: 'Fiction, Classics & Literature' }], ['Adventure', { genre: 'Adventure' }], ['Mystery & Detective', { genre: 'Mystery & Detective' }], ['Romance & Love Stories', { genre: 'Romance' }], ['Science Fiction & Fantasy', { genre: 'Science Fiction & Fantasy' }], ['Poetry', { genre: 'Poetry' }], ['Storybooks & Children', { genre: 'Storybooks & Children' }], ['Science, Math & Technology', { genre: 'Science, Math & Technology' }], ['History, Biography & Travel', { genre: 'History, Biography & Travel' }], ['Philosophy, Religion & Ideas', { genre: 'Philosophy, Religion & Ideas' }]
];

const RESOURCE_LINKS = [
  { name: 'Project Gutenberg', type: 'Public-domain PDFs', url: 'https://www.gutenberg.org/', desc: 'Classic literature and Indian public-domain works with direct PDF editions where available.' },
  { name: 'OpenStax', type: 'Open textbooks', url: 'https://openstax.org/', desc: 'Peer-reviewed Creative Commons textbooks in science, history, psychology, math, and more.' },
  { name: 'DOAB', type: 'Open-access books', url: 'https://www.doabooks.org/', desc: 'Academic open-access books from many publishers; use the source link for more PDFs.' },
  { name: 'OAPEN', type: 'Open-access library', url: 'https://www.oapen.org/', desc: 'A broad library of legally open books, organized by subject and publisher.' }
];

const HISTORY_KEY = 'gyansetu.readingHistory';
const USER_KEY = 'gyansetu.googleUser';
const CACHE_KEY = 'gyansetu.bookCache.v2';
const library = new Map();
let dark = true;
let activeReaderCleanup = null;
let currentUser = readJson(USER_KEY, null);
const $ = (selector, root = document) => root.querySelector(selector);
const app = $('#app');

const author = (book) => (book.authors || []).map((person) => person.name).join(', ') || 'Unknown author';
const cover = (book) => book.coverUrl || book.formats?.['image/jpeg'] || '';
const pdfOf = (book) => book.pdfUrl || Object.entries(book.formats || {}).find(([type, url]) => /pdf/i.test(type) || String(url).toLowerCase().split('?')[0].endsWith('.pdf'))?.[1]?.replace('http://', 'https://') || '';
const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const remember = (books) => books.forEach((book) => library.set(String(book.id), book));

function readJson(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function writeJson(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function cacheBooks(key, books) { writeJson(`${CACHE_KEY}.${key}`, { savedAt: Date.now(), books }); }
function cachedBooks(key) { const cached = readJson(`${CACHE_KEY}.${key}`, null); return cached && Date.now() - cached.savedAt < 86400000 ? cached.books : null; }
function userInitials() { return (currentUser?.name || currentUser?.email || 'G').split(/\s|@/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase(); }
function userHistory() { if (!currentUser) return []; return readJson(HISTORY_KEY, {})[currentUser.email] || []; }

function saveProgress(book, marker = 'Opened') {
  if (!currentUser) return;
  const all = readJson(HISTORY_KEY, {});
  const entry = { id: String(book.id), title: book.title, author: author(book), cover: cover(book), book, page: 0, totalPages: 1, percent: 100, marker, updatedAt: new Date().toISOString() };
  const existing = all[currentUser.email] || [];
  all[currentUser.email] = [entry, ...existing.filter((item) => item.id !== entry.id)].slice(0, 24);
  writeJson(HISTORY_KEY, all);
}

function placeholderCover(book) {
  return `<span class="coverFallback"><strong>${esc(book.title)}</strong><small>${esc(book.sourceName || 'Open PDF')}</small></span>`;
}

function genreMatch(book, genre) {
  if (genre === 'Indian') return /india|indian|tagore|gandhi|gita/i.test(`${book.title} ${author(book)} ${(book.subjects || []).join(' ')}`);
  if (genre === 'Romance') return /romance|love/i.test((book.subjects || []).join(' '));
  return book.genre === genre || (book.subjects || []).some((subject) => subject.toLowerCase().includes(genre.toLowerCase().split(',')[0]));
}

function sortBooks(books) { return [...books].sort((a, b) => (b.download_count || 0) - (a.download_count || 0) || a.title.localeCompare(b.title)); }

async function searchGutendex(term, count = 18) {
  if (!term) return [];
  const cacheKey = `gutendex.${term}.${count}`;
  const cached = cachedBooks(cacheKey);
  if (cached) { remember(cached); return cached; }
  try {
    const params = new URLSearchParams({ search: term, mime_type: 'application/pdf' });
    const response = await fetch(`https://gutendex.com/books/?${params}`);
    if (!response.ok) return [];
    const data = await response.json();
    const books = (data.results || []).map((doc) => ({ id: `gb-${doc.id}`, title: doc.title || 'Untitled', authors: (doc.authors || []).map((person) => ({ name: person.name })), subjects: [...(doc.subjects || []), ...(doc.bookshelves || []), 'Project Gutenberg'], genre: 'Fiction, Classics & Literature', download_count: doc.download_count || 0, pdfUrl: doc.formats?.['application/pdf'] || '', coverUrl: doc.formats?.['image/jpeg'] || '', sourceName: 'Project Gutenberg', sourceUrl: `https://www.gutenberg.org/ebooks/${doc.id}`, language: (doc.languages || []).join(', ') || 'Open edition', desc: 'A public-domain book from Project Gutenberg with a direct PDF format.' })).filter((book) => pdfOf(book)).slice(0, count);
    cacheBooks(cacheKey, books); remember(books); return books;
  } catch { return []; }
}

async function searchBooks(query, count = 24) {
  const term = typeof query === 'string' ? query : query?.search || '';
  const base = query?.genre ? FREE_PDF_BOOKS.filter((book) => genreMatch(book, query.genre)) : FREE_PDF_BOOKS.filter((book) => !term || `${book.title} ${author(book)} ${(book.subjects || []).join(' ')}`.toLowerCase().includes(term.toLowerCase()));
  const gutendex = term ? await searchGutendex(term, 12) : [];
  const seen = new Set();
  const merged = sortBooks([...base, ...gutendex].filter((book) => pdfOf(book) && !/archive\.org|openlibrary\.org/i.test(pdfOf(book)) && !seen.has(book.id) && seen.add(book.id))).slice(0, count);
  remember(merged); return merged;
}

function render() {
  remember(FREE_PDF_BOOKS);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  app.innerHTML = `<div class="app"><header class="topbar"><a class="brand" href="#" aria-label="GyanSetu home"><img class="brandLogo" src="src/assets/gyansetu-logo.svg" alt="GyanSetu logo"><div><b>GyanSetu</b><span>Digital Library</span></div></a><form class="search"><span>⌕</span><input id="q" placeholder="Search free PDF books, authors, subjects..."><button>Search</button></form><nav class="topActions"><button class="navBtn" id="historyBtn">History</button><button class="accountBtn" id="loginBtn">${currentUser ? `<span>${userInitials()}</span>${esc(currentUser.name)}` : 'Continue with Google'}</button><button class="iconBtn" id="theme" aria-label="Toggle theme">${dark ? '☀' : '☾'}</button></nav></header><main><section class="hero"><div class="heroText"><p class="eyebrow">✦ open web PDF reading room</p><h1>Read free PDF books without Internet Archive.</h1><p>GyanSetu now uses legally open sources across the web—Project Gutenberg, OpenStax, DOAB, OAPEN, and other public-domain or Creative Commons publishers—sorted by genre and opened as direct PDFs inside the site.</p><div class="heroActions"><button data-search="Indian">Open Indian PDFs</button><button class="ghost" data-search="science history poetry fiction">Search open PDFs</button></div></div><aside class="device"><div class="deviceTop">Fast reading desk <span>Direct PDFs only</span></div><div class="gridMini" id="featured"></div></aside></section><section class="historyPanel" id="history"><div><p class="eyebrow">Reading history</p><h2>Pick up where you left off</h2></div><div id="historyList"></div></section><section class="resources" id="resources"></section><div id="content"></div></main></div>`;
  $('#theme').onclick = () => { dark = !dark; render(); };
  $('#loginBtn').onclick = loginFlow;
  $('#historyBtn').onclick = () => $('#history').scrollIntoView({ behavior: 'smooth' });
  $('.search').onsubmit = (event) => { event.preventDefault(); showResults($('#q').value.trim() || 'classic literature'); };
  document.querySelectorAll('[data-search]').forEach((button) => { button.onclick = () => showResults(button.dataset.search); });
  app.onclick = (event) => { const cardButton = event.target.closest('[data-id]'); if (cardButton) openDetails(library.get(cardButton.dataset.id)); };
  renderHistory(); renderResources(); loadFeatured(); showShelves();
}

function loginFlow() {
  if (currentUser && confirm('Sign out of GyanSetu?')) { currentUser = null; localStorage.removeItem(USER_KEY); render(); return; }
  if (currentUser) return;
  const name = prompt('Continue with Google\n\nEnter your Google account name to enable reading history on this device:');
  if (!name) return;
  currentUser = { name: name.trim(), email: `${name.trim().toLowerCase().replace(/\s+/g, '.')}@google.user` };
  writeJson(USER_KEY, currentUser); render();
}

function renderResources() {
  $('#resources').innerHTML = `<div class="sectionHead"><div><p class="eyebrow">Free direct PDF collections</p><h2>No Internet Archive books</h2></div><span>Public-domain and Creative Commons sources only</span></div><div class="resourceGrid">${RESOURCE_LINKS.map((item) => `<a class="resourceCard" href="${item.url}" target="_blank" rel="noopener"><small>${esc(item.type)}</small><b>${esc(item.name)}</b><span>${esc(item.desc)}</span></a>`).join('')}</div>`;
}

function directPdfLink(book) { const pdfUrl = pdfOf(book); return pdfUrl ? `<a class="sourceLink" href="${pdfUrl}" target="_blank" rel="noopener">Open direct PDF</a><a class="sourceLink" href="${book.sourceUrl || pdfUrl}" target="_blank" rel="noopener">Source: ${esc(book.sourceName || 'Open library')}</a>` : ''; }

function renderHistory() {
  const box = $('#historyList');
  if (!currentUser) { box.innerHTML = '<div class="emptyState"><b>Sign in with Google to save reading history.</b><p>Your books and last-opened PDFs will appear here on this device.</p></div>'; return; }
  const items = userHistory(); remember(items.map((item) => item.book).filter(Boolean));
  box.innerHTML = items.length ? `<div class="historyGrid">${items.map((item) => `<button class="historyCard" data-id="${item.id}">${item.cover ? `<img loading="lazy" src="${item.cover}" alt="">` : ''}<span><b>${esc(item.title)}</b><small>${esc(item.author)} · ${esc(item.marker || 'Opened')}</small><progress value="1" max="1"></progress></span></button>`).join('')}</div>` : '<div class="emptyState"><b>No saved books yet.</b><p>Open a book and your reading desk will remember it.</p></div>';
}

function bookCard(book) {
  const title = esc(book.title);
  if (!pdfOf(book)) return '';
  return `<article class="bookCard"><button class="coverBtn" data-id="${book.id}" aria-label="View details for ${title}">${cover(book) ? `<img loading="lazy" decoding="async" src="${cover(book)}" alt="${title}">` : placeholderCover(book)}<em>PDF</em></button><h3>${title}</h3><p>${esc(author(book))}</p><button class="read" data-id="${book.id}">Read PDF</button></article>`;
}

function loadFeatured() {
  const featured = sortBooks(FREE_PDF_BOOKS).slice(0, 4);
  $('#featured').innerHTML = featured.map((book) => `<button data-id="${book.id}" aria-label="View ${esc(book.title)}">${cover(book) ? `<img loading="lazy" decoding="async" src="${cover(book)}" alt="">` : placeholderCover(book)}<small>PDF</small></button>`).join('');
}

function showShelves() {
  const content = $('#content');
  content.innerHTML = SHELVES.map((shelf, index) => `<section class="shelf"><div class="sectionHead"><h2>${shelf[0]}</h2><button data-shelf="${index}">See all →</button></div><div class="rule"></div><div class="rail" id="rail${index}">${'<div class="skeleton"></div>'.repeat(4)}</div></section>`).join('');
  document.querySelectorAll('[data-shelf]').forEach((button) => { button.onclick = () => showResults(SHELVES[button.dataset.shelf][1]); });
  const observer = new IntersectionObserver((entries) => entries.filter((entry) => entry.isIntersecting).forEach(async (entry) => { observer.unobserve(entry.target); const index = Number(entry.target.id.replace('rail', '')); try { const books = await searchBooks(SHELVES[index][1], 12); entry.target.innerHTML = books.length ? books.map(bookCard).join('') : '<p class="muted">More direct PDFs are being curated for this genre.</p>'; } catch { entry.target.innerHTML = '<p class="muted">This shelf could not load right now.</p>'; } }), { rootMargin: '450px 0px' });
  document.querySelectorAll('.rail').forEach((rail) => observer.observe(rail));
}

async function showResults(query) {
  const label = query?.genre || (typeof query === 'string' ? query : query.search) || 'open PDFs';
  const content = $('#content');
  content.innerHTML = `<section class="shelf"><div class="sectionHead"><h2>Results for “${esc(label)}”</h2></div><div class="rule"></div><div class="loader">◌ Searching curated open PDFs…</div></section>`;
  try { const books = await searchBooks(query, 36); content.innerHTML = `<section class="shelf"><div class="sectionHead"><h2>Results for “${esc(label)}”</h2></div><div class="rule"></div><div class="results">${books.length ? books.map(bookCard).join('') : '<p class="muted">No matching non-Archive direct PDFs found. Try another title, author, or genre.</p>'}</div></section>`; content.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  catch (error) { content.innerHTML = `<p class="muted">${esc(error.message)}</p>`; }
}

function openDetails(book) {
  if (!book) return;
  const hasPdf = Boolean(pdfOf(book));
  document.body.insertAdjacentHTML('beforeend', `<div class="modal" role="dialog" aria-modal="true"><div class="details"><button class="close" aria-label="Close details">×</button><div class="detailCover">${cover(book) ? `<img loading="lazy" src="${cover(book)}" alt="">` : placeholderCover(book)}</div><div><p class="eyebrow">★ ${hasPdf ? 'Embedded PDF edition' : 'Open book details'}</p><h2>${esc(book.title)}</h2><p class="byline">${esc(author(book))}</p><p class="desc">${esc(book.desc || 'Read the full PDF directly inside GyanSetu from a legal open-web source.')}</p><dl><dt>Subjects</dt><dd>${esc((book.subjects || []).slice(0, 4).join(' · ') || 'Open book')}</dd><dt>Language</dt><dd>${esc(book.language || 'Open edition')}</dd><dt>Format</dt><dd>Complete scrollable PDF</dd></dl>${directPdfLink(book)}<button class="primary" ${hasPdf ? '' : 'disabled'}>${hasPdf ? '📖 Read PDF in GyanSetu' : 'PDF unavailable'}</button></div></div></div>`);
  $('.close').onclick = () => $('.modal').remove();
  $('.modal').onclick = (event) => { if (event.target.classList.contains('modal')) event.target.remove(); };
  $('.primary').onclick = () => { if (!hasPdf) return; $('.modal').remove(); openPdfReader(book); };
}

function openPdfReader(book) {
  const pdfUrl = pdfOf(book);
  if (!pdfUrl || /archive\.org|openlibrary\.org/i.test(pdfUrl)) { alert('This item is blocked because Internet Archive/Open Library PDFs are not used in GyanSetu.'); return; }
  const readerUrl = `${pdfUrl}#toolbar=1&navpanes=0&view=FitH`;
  saveProgress(book, 'PDF opened');
  document.body.insertAdjacentHTML('beforeend', `<section class="reader" role="dialog" aria-modal="true"><div class="readerShell pdfShell"><div class="readerTop"><div><small>Direct open-web PDF</small><b>${esc(book.title)}</b></div><button id="rclose" aria-label="Close reader">×</button></div><div class="pdfToolbar"><span>PDFs load only when you open a book, keeping shelves fast.</span><a href="${pdfUrl}" download target="_blank" rel="noopener">Download PDF</a></div><iframe class="pdfFrame" loading="lazy" title="${esc(book.title)} PDF" src="${readerUrl}"></iframe></div></section>`);
  const reader = $('.reader');
  const close = () => { reader?.remove(); if (activeReaderCleanup) window.removeEventListener('keydown', activeReaderCleanup); activeReaderCleanup = null; renderHistory(); };
  $('#rclose').onclick = close;
  activeReaderCleanup = (event) => { if (event.key === 'Escape') close(); };
  window.addEventListener('keydown', activeReaderCleanup);
}

render();
