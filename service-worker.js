/* KATAPATA offline cache. */
const CACHE_VERSION = 'katapata-offline-v1';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/guide/',
  '/guide/index.html',
  '/tools/',
  '/tools/index.html',
  '/tools/sloper/',
  '/tools/sloper/index.html',
  '/tools/sloper/app/katapata.html',
  '/pricing/',
  '/pricing/index.html',
  '/help/',
  '/help/index.html',
  '/blog/',
  '/blog/index.html',
  '/blog/sloper-vs-pattern.html',
  '/blog/sample-pdf.html',
  '/blog/what-katapata-can-do.html',
  '/blog/what-is-sloper.html',
  '/blog/printing-guide.html',
  '/blog/development-note.html',
  '/assets/css/site.css',
  '/assets/js/katapata-site-mini-intro.js',
  '/assets/img/katapata-guide-cat.png',
  '/assets/img/katapata-guide-cat-wide.png',
  '/offline.html',
  '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    await Promise.allSettled(CORE_ASSETS.map((url) => cache.add(url)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key !== CACHE_VERSION && key.startsWith('katapata-offline-')).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE_VERSION);
  try {
    const response = await fetch(request);
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    return cache.match('/offline.html');
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_VERSION);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    return cache.match('/offline.html');
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(cacheFirst(request));
});
