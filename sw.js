const CACHE_NAME = "index_simetri_v7_enterprise";

const STATIC_ASSETS = [
  "./",
  "./id.html",
  "https://ik.imagekit.io/logojkdiy/SIMETRI.png",
  "https://ik.imagekit.io/logojkdiy/SIMETRI%20(2).png",
  "https://ik.imagekit.io/logojkdiy/ojk-indonesia-seeklogo.png?updatedAt=1754402028771"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(STATIC_ASSETS).catch(function () {
        return Promise.resolve();
      });
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key) {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  const request = event.request;
  const url = new URL(request.url);

  // Jangan cache request API Apps Script.
  if (url.href.includes("script.google.com/macros")) {
    return;
  }

  // Jangan cache request POST.
  if (request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(request).then(function (cachedResponse) {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then(function (networkResponse) {
        const responseClone = networkResponse.clone();

        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(request, responseClone).catch(function () {});
        });

        return networkResponse;
      }).catch(function () {
        return caches.match("./index.html");
      });
    })
  );
});
