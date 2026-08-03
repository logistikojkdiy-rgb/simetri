/* SIMETRI Service Worker
 * File utama: id.html
 * Manifest: manifest.webmanifest
 * Versi cache: ubah saat merilis pembaruan besar.
 */

const CACHE_VERSION = 'simetri-v6.8.1';
const APP_CACHE = `${CACHE_VERSION}-app`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const APP_SHELL = [
  './',
  './id.html',
  './offline.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(APP_CACHE)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  const allowedCaches = [APP_CACHE, RUNTIME_CACHE];

  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => !allowedCaches.includes(key))
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  const request = event.request;

  // Jangan cache login, scan, sinkronisasi, pengajuan, dan transaksi POST.
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Navigasi halaman: utamakan jaringan agar versi terbaru cepat tampil.
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request));
    return;
  }

  // Berkas inti lokal: cache lebih dahulu.
  if (url.origin === self.location.origin && isAppShell(url)) {
    event.respondWith(cacheFirst(request, APP_CACHE));
    return;
  }

  // Font, gambar, CSS, dan JavaScript: cache runtime.
  if (['style', 'script', 'font', 'image'].includes(request.destination)) {
    event.respondWith(staleWhileRevalidate(request));
  }
});

async function handleNavigation(request) {
  try {
    const response = await fetch(request);

    if (response && response.ok) {
      const cache = await caches.open(APP_CACHE);
      cache.put('./id.html', response.clone());
    }

    return response;
  } catch (error) {
    return (await caches.match(request)) ||
      (await caches.match('./id.html')) ||
      (await caches.match('./offline.html'));
  }
}

function isAppShell(url) {
  return APP_SHELL.some(item => {
    const shellUrl = new URL(item, self.location.href);
    return shellUrl.href === url.href;
  });
}

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (isCacheable(response)) {
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
  }
  return response;
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);

  const networkResponse = fetch(request)
    .then(response => {
      if (isCacheable(response)) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => null);

  return cached || (await networkResponse) || Response.error();
}

function isCacheable(response) {
  return response && (response.ok || response.type === 'opaque');
}
