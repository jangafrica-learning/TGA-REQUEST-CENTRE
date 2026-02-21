const CACHE_NAME = "tga-sms-v2";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/admin_dashboard.html",
  "/staff_dashboard.html",
  "/parent_dashboard.html",
  "/student_dashboard.html",
  "/transport-logistics.html",
  "/manifest.json",
  "/logo.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => key !== CACHE_NAME && caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || new Response("Offline");
    })
  );
});
