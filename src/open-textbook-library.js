const OTL_API = 'https://open.umn.edu/opentextbooks/textbooks.json';
const OTL_LICENSES = [
  'Attribution',
  'Attribution-ShareAlike',
  'Attribution-NonCommercial',
  'Attribution-NonCommercial-ShareAlike',
  'No Rights Reserved',
  'Free Documentation License (GNU)'
];

const otlState = { page: 1, term: '', loading: false, done: false, loaded: 0, seen: new Set() };

const otlEsc = (value = '') => String(value).replace(/[&<>\"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', "'": '&#39;' }[char]));
const otlText = (value) => {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.map(otlText).filter(Boolean).join(', ');
  if (typeof value === 'object') return otlText(value.name || value.title || value.label || value.value || value.text || '');
  return '';
};

function findUrl(value, matcher) {
  if (!value) return '';
  if (typeof value === 'string') return matcher(value) ? value : '';
  if (Array.isArray(value)) {
    for (const item of value) { const found = findUrl(item, matcher); if (found) return found; }
    return '';
  }
  if (typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      if (/pdf|download|file|url|href|link|format/i.test(key)) {
        const found = findUrl(item, matcher);
        if (found) return found;
      }
    }
    for (const item of Object.values(value)) {
      const found = findUrl(item, matcher);
      if (found) return found;
    }
  }
  return '';
}

function otlPdf(book) {
  return findUrl(book, (url) => /\.pdf(?:$|[?#])/i.test(url) || /\/bitstream\/|\/download\//i.test(url));
}

function otlCover(book) {
  return findUrl(book, (url) => /\.(?:jpg|jpeg|png|webp)(?:$|[?#])/i.test(url) && /cover|image|thumbnail/i.test(url));
}

function otlAuthors(book) {
  const candidates = [book.authors, book.author, book.contributors, book.contributor, book.creators];
  for (const candidate of candidates) {
    const text = otlText(candidate);
    if (text) return text;
  }
  return 'Open textbook authors';
}

function otlLicense(book) {
  const text = `${otlText(book.license)} ${otlText(book.licenses)} ${otlText(book.rights)} ${otlText(book.conditions_of_use)}`;
  if (/NonCommercial.?ShareAlike|NC-SA/i.test(text)) return 'CC BY-NC-SA';
  if (/NonCommercial|NC/i.test(text)) return 'CC BY-NC';
  if (/ShareAlike|BY-SA/i.test(text)) return 'CC BY-SA';
  if (/No Rights Reserved|CC0/i.test(text)) return 'CC0';
  if (/GNU|Free Documentation/i.test(text)) return 'GFDL';
  return 'Open license';
}

function otlId(book) {
  return String(book.id || book.textbook_id || book.uuid || book.slug || book.title || Math.random());
}

function otlRecord(book) {
  const pdfUrl = otlPdf(book);
  if (!pdfUrl) return null;
  const id = otlId(book);
  const title = otlText(book.title || book.name) || 'Untitled open textbook';
  const sourceUrl = book.url || book.web_url || `https://open.umn.edu/opentextbooks/textbooks/${encodeURIComponent(book.slug || book.id || '')}`;
  return {
    id,
    title,
    author: otlAuthors(book),
    pdfUrl,
    coverUrl: otlCover(book),
    license: otlLicense(book),
    sourceUrl,
    description: otlText(book.description || book.summary || book.abstract),
    publisher: otlText(book.publisher),
    language: otlText(book.language) || 'English'
  };
}

function otlCard(book) {
  const cover = book.coverUrl
    ? `<img src="${otlEsc(book.coverUrl)}" alt="" loading="lazy" onerror="this.parentElement.innerHTML='<span class=\"otlCoverFallback\">PDF</span>'">`
    : '<span class="otlCoverFallback">PDF</span>';
  return `<article class="otlBookCard">
    <a class="otlCover" href="${otlEsc(book.pdfUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Read ${otlEsc(book.title)}">${cover}<span class="otlBadge">PDF</span></a>
    <h3 title="${otlEsc(book.title)}">${otlEsc(book.title)}</h3>
    <p class="otlAuthor">${otlEsc(book.author)}</p>
    <div class="otlMeta"><span>${otlEsc(book.license)}</span>${book.publisher ? `<span>${otlEsc(book.publisher)}</span>` : ''}</div>
    <a class="otlRead" href="${otlEsc(book.pdfUrl)}" target="_blank" rel="noopener noreferrer">Read book</a>
  </article>`;
}

function otlMount() {
  const resources = document.querySelector('#resources');
  if (!resources || document.querySelector('#openTextbookLibrary')) return;
  const section = document.createElement('section');
  section.id = 'openTextbookLibrary';
  section.className = 'otlSection shelf';
  section.innerHTML = `<div class="sectionHead otlHead"><div><p class="eyebrow">✦ Open textbook collection</p><h2>Open Textbook Library PDFs</h2></div><span>1,800+ open textbooks with downloadable PDFs</span></div>
    <div class="otlControls"><input id="otlSearch" type="search" placeholder="Search open textbooks..."><button id="otlSearchBtn" class="otlControlBtn">Search</button></div>
    <div class="rule"></div><div class="otlGrid" id="otlGrid"></div>
    <div class="otlFooter"><p id="otlStatus" class="muted">Loading open textbooks…</p><button id="otlMore" class="otlControlBtn">Load more</button></div>`;
  resources.insertAdjacentElement('afterend', section);
  $('#otlSearch').addEventListener('keydown', (event) => { if (event.key === 'Enter') otlSearch(); });
  $('#otlSearchBtn').onclick = otlSearch;
  $('#otlMore').onclick = () => otlLoad();
  otlLoad(true);
}

function otlReset() {
  otlState.page = 1;
  otlState.term = '';
  otlState.loading = false;
  otlState.done = false;
  otlState.loaded = 0;
  otlState.seen = new Set();
}

function otlSearch() {
  const input = document.querySelector('#otlSearch');
  otlReset();
  otlState.term = input?.value.trim() || '';
  const grid = document.querySelector('#otlGrid');
  if (grid) grid.innerHTML = '';
  otlLoad(true);
}

async function otlLoad(reset = false) {
  const grid = document.querySelector('#otlGrid');
  const status = document.querySelector('#otlStatus');
  const more = document.querySelector('#otlMore');
  if (!grid || otlState.loading || otlState.done) return;
  otlState.loading = true;
  if (more) more.disabled = true;
  if (status) status.textContent = reset ? 'Loading…' : 'Loading more…';
  try {
    const params = new URLSearchParams({ order_by: 'rating', page: String(otlState.page) });
    if (otlState.term) params.set('term', otlState.term);
    params.set('formats[]', 'PDF');
    OTL_LICENSES.forEach((license) => params.append('licenses[]', license));
    const response = await fetch(`${OTL_API}?${params.toString()}`, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`Open Textbook Library returned ${response.status}.`);
    const data = await response.json();
    const rawBooks = data.textbooks || data.results || data.books || (Array.isArray(data) ? data : []);
    const books = rawBooks.map(otlRecord).filter(Boolean).filter((book) => {
      if (otlState.seen.has(book.id)) return false;
      otlState.seen.add(book.id);
      return true;
    });
    if (books.length) grid.insertAdjacentHTML('beforeend', books.map(otlCard).join(''));
    otlState.loaded += books.length;
    const total = data.total || data.count || data.meta?.total || '';
    const pageSize = rawBooks.length;
    otlState.page += 1;
    if (!pageSize || (total && otlState.loaded >= Number(total))) otlState.done = true;
    if (status) status.textContent = total ? `Showing ${otlState.loaded.toLocaleString()} of ${Number(total).toLocaleString()} books` : `Loaded ${otlState.loaded.toLocaleString()} books`;
    if (more) more.style.display = otlState.done ? 'none' : '';
  } catch (error) {
    if (status) status.textContent = `${error.message} You can still browse the collection directly.`;
    if (more) more.style.display = '';
  } finally {
    otlState.loading = false;
    if (more) more.disabled = false;
  }
}

const otlObserver = new MutationObserver(() => otlMount());
otlObserver.observe(document.querySelector('#app') || document.body, { childList: true, subtree: true });
window.addEventListener('load', otlMount);
otlMount();
