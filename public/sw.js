console.warn('service worker public folder');

let cacheData = 'app-2021-08-30';

this.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(cacheData).then((cache) => {
			cache.addAll([
				'/static/js/bundle.js',
				'/static/js/main.chunk.js',
				'/static/js/0.chunk.js',
				'/index.html',
				'/',
				'/operario/proceso',
        'chartist.min.js',
        'init.js',
			]);
		})
	);
});

this.addEventListener('fetch', (event) => {
  if (navigator.onLine){
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
        let requestUrl = event.request.clone();
        return fetch(requestUrl);
      })
    );
  }
});
