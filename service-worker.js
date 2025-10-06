const CACHE_NAME = "huda-pwa-v2";
const ASSETS_TO_CACHE = ["./", "./index.html", "./manifest.json", "./style.css", "./script.js", "./offline.html", "./img/icona.png", "./img/iconb.png", "./img/foto1.jpg"];

// install sw
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// activate sw
self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
});

// fetch asset
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => caches.match("./offline.html"));
    })
  );
});
