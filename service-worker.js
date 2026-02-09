const CACHE_NAME = "dune-uprising-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./main.js",
  "./style.css",
  "./data/imperium.js",
  "./data/conflict.js",
  "./data/leader.js"
];

// 安裝快取資源
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 啟用
self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

// 拦截 fetch，使用 cache first
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
