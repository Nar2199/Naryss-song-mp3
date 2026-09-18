self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('naryss-v1').then((cache) => {
      return cache.addAll(['./index.html']);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
