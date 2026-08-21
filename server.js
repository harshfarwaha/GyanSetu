import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 10000);
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(payload));
}

function normalize(value = '') {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\b(the|a|an|edition|volume|vol)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function similarity(a, b) {
  const left = new Set(normalize(a).split(' ').filter(Boolean));
  const right = new Set(normalize(b).split(' ').filter(Boolean));
  if (!left.size || !right.size) return 0;
  let overlap = 0;
  for (const word of left) if (right.has(word)) overlap += 1;
  return overlap / Math.max(left.size, right.size);
}

async function findOpenLibraryCover(title, author, query) {
  const params = new URLSearchParams({ title, limit: '12', fields: 'title,author_name,cover_i,key' });
  if (author) params.set('author', author);
  let response = await fetch(`https://openlibrary.org/search.json?${params}`);
  if (!response.ok) return null;
  let data = await response.json();
  let docs = Array.isArray(data.docs) ? data.docs : [];

  if (!docs.length && query) {
    const fallback = new URLSearchParams({ q: query, limit: '12', fields: 'title,author_name,cover_i,key' });
    response = await fetch(`https://openlibrary.org/search.json?${fallback}`);
    if (response.ok) {
      data = await response.json();
      docs = Array.isArray(data.docs) ? data.docs : [];
    }
  }

  let best = null;
  for (const doc of docs) {
    if (!doc.cover_i || !doc.title) continue;
    const titleScore = similarity(title, doc.title);
    const authorScore = author && Array.isArray(doc.author_name)
      ? Math.max(...doc.author_name.map((name) => similarity(author, name)), 0)
      : 0;
    const score = titleScore * 0.8 + authorScore * 0.2;
    if (!best || score > best.score) best = { doc, score };
  }

  if (!best || best.score < 0.62) return null;
  return {
    coverUrl: `https://covers.openlibrary.org/b/id/${best.doc.cover_i}-L.jpg`,
    sourceUrl: best.doc.key ? `https://openlibrary.org${best.doc.key}` : 'https://openlibrary.org',
    confidence: Number(best.score.toFixed(2)),
    source: 'Open Library'
  };
}

async function geminiSearchTerms(title, author, language) {
  if (!GEMINI_API_KEY) return { title, author, query: `${title} ${author}`.trim() };

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent`;
  const prompt = [
    'You are helping a legal open digital library find an existing front cover for a book.',
    'Do not invent a cover and do not generate artwork.',
    'Normalize the book title and author so a public book-cover catalogue can find the correct edition.',
    'Return ONLY JSON with keys: title, author, query.',
    `Title: ${title}`,
    `Author: ${author || 'Unknown'}`,
    `Language: ${language || 'Unknown'}`
  ].join('\n');

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': GEMINI_API_KEY
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0,
        maxOutputTokens: 160,
        responseMimeType: 'application/json'
      }
    })
  });

  if (!response.ok) throw new Error(`Gemini request failed (${response.status})`);
  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('').trim();
  if (!text) return { title, author, query: `${title} ${author}`.trim() };

  try {
    const parsed = JSON.parse(text);
    return {
      title: String(parsed.title || title),
      author: String(parsed.author || author || ''),
      query: String(parsed.query || `${parsed.title || title} ${parsed.author || author || ''}`).trim()
    };
  } catch {
    return { title, author, query: `${title} ${author}`.trim() };
  }
}

async function findGoogleBooksCover(title, author) {
  const query = `intitle:${title}${author ? ` inauthor:${author}` : ''}`;
  const url = `https://www.googleapis.com/books/v1/volumes?maxResults=10&q=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (!response.ok) return null;
  const data = await response.json();
  const items = Array.isArray(data.items) ? data.items : [];
  let best = null;
  for (const item of items) {
    const info = item.volumeInfo || {};
    const image = info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail;
    if (!image || !info.title) continue;
    const titleScore = similarity(title, info.title);
    const authors = Array.isArray(info.authors) ? info.authors : [];
    const authorScore = author && authors.length ? Math.max(...authors.map((name) => similarity(author, name)), 0) : 0;
    const score = titleScore * 0.8 + authorScore * 0.2;
    if (!best || score > best.score) best = { info, image, score };
  }
  if (!best || best.score < 0.72) return null;
  return {
    coverUrl: best.image.replace(/^http:\/\//, 'https://'),
    sourceUrl: best.info.infoLink || 'https://books.google.com/',
    confidence: Number(best.score.toFixed(2)),
    source: 'Google Books'
  };
}

async function handleCoverLookup(req, res) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 12000) {
      sendJson(res, 413, { error: 'Request too large.' });
      return;
    }
  }

  let input;
  try { input = JSON.parse(body || '{}'); } catch {
    sendJson(res, 400, { error: 'Invalid JSON.' });
    return;
  }

  const title = String(input.title || '').trim();
  const author = String(input.author || '').trim();
  const language = String(input.language || '').trim();
  if (!title) {
    sendJson(res, 400, { error: 'A book title is required.' });
    return;
  }

  try {
    const direct = await findOpenLibraryCover(title, author, `${title} ${author}`.trim());
    if (direct && direct.confidence >= 0.78) {
      sendJson(res, 200, direct);
      return;
    }

    const terms = await geminiSearchTerms(title, author, language);
    const openLibrary = await findOpenLibraryCover(terms.title, terms.author, terms.query);
    const cover = openLibrary || await findGoogleBooksCover(terms.title, terms.author);
    sendJson(res, 200, cover || { coverUrl: '', source: '', confidence: 0 });
  } catch (error) {
    console.error('Cover lookup failed:', error.message);
    sendJson(res, 200, { coverUrl: '', source: '', confidence: 0 });
  }
}

function serveStatic(req, res, pathname) {
  let relative = pathname === '/' ? '/index.html' : pathname;
  if (relative.includes('..')) return sendJson(res, 400, { error: 'Invalid path.' });
  const filePath = path.join(ROOT, relative);
  if (!filePath.startsWith(ROOT)) return sendJson(res, 400, { error: 'Invalid path.' });

  fs.stat(filePath, (error, stat) => {
    if (error || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, {
      'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'public, max-age=300'
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }
  if (req.method === 'POST' && url.pathname === '/api/book-cover') {
    await handleCoverLookup(req, res);
    return;
  }
  if (req.method === 'GET') {
    serveStatic(req, res, url.pathname);
    return;
  }
  res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Method not allowed');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`GyanSetu server listening on port ${PORT}`);
});
const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 10000);
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const cache = new Map();
const CACHE_MS = 24 * 60 * 60 * 1000;

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8' };
const send = (res, status, body, type = 'application/json; charset=utf-8') => { res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }); res.end(type.startsWith('application/json') ? JSON.stringify(body) : body); };
const normalize = (value = '') => String(value).toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
const tokens = (value) => new Set(normalize(value).split(' ').filter((token) => token.length > 2));
function similarity(a, b) { const left = tokens(a); const right = tokens(b); if (!left.size || !right.size) return 0; let hits = 0; for (const token of left) if (right.has(token)) hits += 1; return hits / Math.max(left.size, right.size); }
async function fetchJson(url) { const response = await fetch(url, { headers: { 'User-Agent': 'GyanSetu/1.0 (open digital library)' } }); if (!response.ok) throw new Error(`Upstream returned ${response.status}`); return response.json(); }

async function getCandidates(title, author) {
  const titleParam = encodeURIComponent(title); const authorParam = encodeURIComponent(author);
  const [openLibrary, googleBooks] = await Promise.allSettled([
    fetchJson(`https://openlibrary.org/search.json?title=${titleParam}&author=${authorParam}&limit=8&fields=title,author_name,cover_i,first_publish_year`),
    fetchJson(`https://www.googleapis.com/books/v1/volumes?q=intitle:${titleParam}+inauthor:${authorParam}&maxResults=8&printType=books`)
  ]);
  const candidates = [];
  if (openLibrary.status === 'fulfilled') for (const item of openLibrary.value.docs || []) {
    if (!item.cover_i) continue; const itemTitle = item.title || ''; const itemAuthor = (item.author_name || []).join(', ');
    const titleScore = similarity(title, itemTitle); const authorScore = author === 'Unknown author' ? 1 : similarity(author, itemAuthor);
    if (titleScore >= 0.65 && (authorScore >= 0.45 || author === 'Unknown author')) candidates.push({ source: 'Open Library', title: itemTitle, author: itemAuthor, year: item.first_publish_year || null, coverUrl: `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`, titleScore, authorScore });
  }
  if (googleBooks.status === 'fulfilled') for (const item of googleBooks.value.items || []) {
    const info = item.volumeInfo || {}; const image = info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail; if (!image) continue;
    const itemTitle = info.title || ''; const itemAuthor = (info.authors || []).join(', '); const titleScore = similarity(title, itemTitle); const authorScore = author === 'Unknown author' ? 1 : similarity(author, itemAuthor);
    if (titleScore >= 0.65 && (authorScore >= 0.45 || author === 'Unknown author')) candidates.push({ source: 'Google Books', title: itemTitle, author: itemAuthor, year: info.publishedDate || null, coverUrl: image.replace(/^http:/, 'https:'), titleScore, authorScore });
  }
  const unique = new Map(); for (const candidate of candidates) unique.set(candidate.coverUrl, candidate); return [...unique.values()].slice(0, 12);
}

async function chooseWithGemini(title, author, candidates) {
  if (!GEMINI_API_KEY || !candidates.length) return null;
  const prompt = `You are selecting an EXISTING book cover for a digital library. Never invent a cover and never choose a candidate that is a different work.\nTarget title: ${title}\nTarget author: ${author}\nCandidates:\n${candidates.map((c, i) => `${i}: ${c.source} | ${c.title} | ${c.author || 'Unknown'} | ${c.year || ''} | ${c.coverUrl}`).join('\n')}\nChoose the best matching existing cover only when title and author clearly match. If none is sufficiently reliable, return candidateIndex -1. Confidence must be 0 to 1.`;
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI_API_KEY }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0, responseMimeType: 'application/json', responseSchema: { type: 'OBJECT', properties: { candidateIndex: { type: 'INTEGER' }, confidence: { type: 'NUMBER' }, reason: { type: 'STRING' } }, required: ['candidateIndex', 'confidence', 'reason'] } } }) });
  if (!response.ok) throw new Error(`Gemini returned ${response.status}`); const data = await response.json(); const text = data.candidates?.[0]?.content?.parts?.find((part) => part.text)?.text; if (!text) return null;
  const result = JSON.parse(text); const index = Number(result.candidateIndex); const confidence = Number(result.confidence); if (!Number.isInteger(index) || index < 0 || index >= candidates.length || confidence < 0.82) return null; return candidates[index];
}

async function resolveCover(title, author) {
  const key = `${normalize(title)}|${normalize(author)}`; const cached = cache.get(key); if (cached && Date.now() - cached.savedAt < CACHE_MS) return cached.value;
  let value = null; try { const candidates = await getCandidates(title, author); if (candidates.length === 1 && candidates[0].titleScore >= 0.9 && candidates[0].authorScore >= 0.7) value = candidates[0]; else value = await chooseWithGemini(title, author, candidates); } catch (error) { console.error('Cover resolver:', error.message); }
  const result = value ? { coverUrl: value.coverUrl, source: value.source, matchedTitle: value.title, matchedAuthor: value.author } : null; cache.set(key, { savedAt: Date.now(), value: result }); return result;
}
async function readBody(req) { let body = ''; for await (const chunk of req) { body += chunk; if (body.length > 8192) throw new Error('Request too large'); } return JSON.parse(body || '{}'); }
function serveStatic(req, res) { const requestPath = decodeURIComponent((req.url || '/').split('?')[0]); const relative = requestPath === '/' ? 'index.html' : requestPath.replace(/^\/+/, ''); const filePath = path.resolve(ROOT, relative); if (!filePath.startsWith(ROOT + path.sep) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) return send(res, 404, 'Not found', 'text/plain; charset=utf-8'); const ext = path.extname(filePath).toLowerCase(); res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600', 'X-Content-Type-Options': 'nosniff' }); if (req.method === 'HEAD') return res.end(); fs.createReadStream(filePath).pipe(res); }
const server = http.createServer(async (req, res) => { try { if (req.method === 'POST' && req.url === '/api/resolve-cover') { const body = await readBody(req); const title = String(body.title || '').trim(); const author = String(body.author || 'Unknown author').trim(); if (!title) return send(res, 400, { error: 'Book title is required.' }); return send(res, 200, await resolveCover(title, author)); } if (req.method === 'GET' || req.method === 'HEAD') return serveStatic(req, res); return send(res, 405, { error: 'Method not allowed.' }); } catch (error) { return send(res, 500, { error: error.message || 'Server error.' }); } });
server.listen(PORT, () => console.log(`GyanSetu server listening on ${PORT}`));
