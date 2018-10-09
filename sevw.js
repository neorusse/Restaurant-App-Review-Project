self.addEventListener('install', function (evt) {
    evt.waitUntil(
        caches.open('staticCacheName').then(function (cache) {
            return cache.addAll([
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
            ]);
        })
    );
});

self.addEventListener('fetch', function(evt) {
    evt.respondWith(
        caches.match(evt.req).then(function(res) {
            if (res) {
                console.log(evt.req, 'is in cache');
                return res;
            }
            else {
                console.log(evt.req, 'is not fouund in cache');
                return fetch(evt.req)
                .then(function(res) {
                    const responseClone = res.clone();
                    caches.open('staticCacheName').then(function(cache) {
                        cache.put(evt.req, responseClone);
                    })
                    return res;
                })
                .catch(function(err) {
                    console.error(err);
                });
            }
        })
    );
});