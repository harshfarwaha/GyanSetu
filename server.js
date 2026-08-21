import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
