
// Service worker
importScripts('/lc/web/scripts/idb.js');
importScripts('/lc/web/scripts/DAO.js');

var varCacheStaticVersion = 'LJF5';
var varCacheDynamicVersion = 'LJF5';


self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(varCacheStaticVersion)
    .then(function(LJFcache) {
      console.log('[SW] caching assets');
      LJFcache.addAll([
        '/lc/web/',
        '/lc/web/index.html',
        '/lc/web/scripts/DAO.js',
        '/lc/web/scripts/idb.js',
        '/lc/web/scripts/scripts.js',
        '/lc/web/styles/style.css'
    ]);

    })
  );

});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys()
    .then(function(keyList) {
      return Promise.all(keyList.map(function(indKey) {
        if (indKey !== varCacheStaticVersion && indKey !== varCacheDynamicVersion)
        {
          console.log('LJF Removing previous sub cache', indKey);
          return caches.delete(indKey);
        }
      }))
    })
  );
  return self.clients.claim();
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response){
      if (response)
      {
        return response;
      }
      else
      {
        return fetch(event.request)
        .then(function(LJFDynamicRes) {
          return caches.open(varCacheDynamicVersion)
          .then(function(cacheIn) {
            cacheIn.put(event.request.url,LJFDynamicRes.clone());
            return LJFDynamicRes;
          })
        })
        .catch(function(handleAnyErrorsNull) {

        });
      }
      })
    );
    });
