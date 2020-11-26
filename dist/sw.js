importScripts("/precache-manifest.44e10d9b2ee1d6bda3a5b1d7ea45c9ca.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

let CACHE_VERSION = 1.04

let CURRENT_CACHE = {
  static: 'static-cache-v' + CACHE_VERSION,
  dynamic: 'dynamic-cache-v' + CACHE_VERSION
}

self.addEventListener('install', (event) => {
  console.log('installing service worker', event)
  event.waitUntil(
    caches.open(CURRENT_CACHE['static'])
      .then((cache) => {
        cache.addAll([
          '/offline',
          '/css/chunk-vendors.e7f7171a.css',
          '/js/chunk-vendors.6b20344d.js',
          '/js/app.01f937d3.js'
        ])
      })
  )
})

self.addEventListener('activate', (event) => {
  console.log('activating service worker', event)
  let expectedCacheNames = Object.values(CURRENT_CACHE)

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.forEach(cacheName => {
          if (!expectedCacheNames.includes(cacheName)) {
            console.log('Deleting out of date cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )

})

self.addEventListener('fetch', (event) => {

  event.respondWith(fetch(event.request))

})




