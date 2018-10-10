/**
 * Varriable created for cache file names 
 */

const urlsToCache = [
        '/',
        'index.html',
        'restaurant.html',
        '/css/styles.css',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/data/restaurants.json',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg'
    ];

/**
 * Service Worker Installation
*/


self.addEventListener('install', function(evt) {
// Perform install steps
evt.waitUntil(
    caches.open('cacheName')
    .then(function(cache) {
        return cache.addAll(urlsToCache);
    })
);
});

/**
 *  Add fetch events to serviceWorker 
 */

self.addEventListener('fetch', function(evt) {
    e.respondWith(
        caches.match(evt.request).then(function(response) {
            if (response) {
                console.log(evt.req, 'is in cache');
                return response;
            }
            else {
                console.log(evt.req, 'is not fouund in cache');
                return fetch(evt.request)
                .then(function(response) {
                    const clonedResponse = response.clone(); 
                    caches.open('cacheName').then(function(cache) {
                        cache.put(evt.request, clonedResponse);
                    })
                    return response;
                })
                .catch(function(err) {
                    console.error(err);
                });
            }
        })
    );
});
