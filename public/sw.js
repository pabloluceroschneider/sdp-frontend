const assets = [
  '/static/js/bundle.js',
  '/static/js/main.chunk.js',
  '/static/js/0.chunk.js',
  '/index.html',
  '/',
  '/operario/proceso',
  'chartist.min.js',
  'init.js',
]

this.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open('app-v0.1').then((cache) => {
			assets.map(ass =>cache.delete(ass)) 
		})
	);
  event.waitUntil(
		caches.open('app-2021-08-30').then((cache) => {
			assets.map(ass =>cache.delete(ass)) 
		})
	);
  event.waitUntil(
		caches.open('app-2021-09-18').then((cache) => {
			assets.map(ass =>cache.delete(ass)) 
		})
	);
});

this.addEventListener('fetch', (event) => {
  // if (navigator.onLine){
  //   event.respondWith(
  //     caches.match(event.request).then((resp) => {
  //       if (resp) {
  //         return resp;
  //       }
  //       let requestUrl = event.request.clone();
  //       return fetch(requestUrl);
  //     })
  //   );
  // }
});
