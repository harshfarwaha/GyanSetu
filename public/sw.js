const CACHE_NAME = 'gyansetu-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/app.js',
  '/src/styles.css',
  '/src/mobile.css',
  '/src/devotional-library.css',
  '/src/internet-archive-library.css',
  '/src/developer-credit.css',
  '/src/devotional-library.js',
  '/src/internet-archive-library.js',
  '/src/ui-enhancements.js',
  '/src/developer-credit.js',
  '/src/search-window-fix.js',
  '/src/ai-cover.js',
  '/src/auto-cover.js',
  '/src/harry-potter-integration.js',
  '/src/reader-navigation.js',
  '/favicon.svg',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Don't cache API calls, fonts, or cross-origin requests
  if (request.method !== 'GET') return;
  if (url.pathname.startsWith('/api/')) return;
  if (url.hostname !== self.location.hostname) return;
  if (url.pathname.startsWith('/src/') || url.pathname === '/index.html' || url.pathname === '/') {
    event.respondWith(
      caches.match(request).then((cached) => {
        const fetchPromise = fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }
});
