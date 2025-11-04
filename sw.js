 Service Worker básico para Tu barrio más verde
 Funcionalidad Cache básico y experiencia offline

const CACHE_NAME = 'tbmv-v1.0.0';
const urlsToCache = [
  '',
  'index.html',
  'httpsfonts.googleapis.comcss2family=Montserratwght@300;400;600;700&display=swap'
];

 Instalación del Service Worker
self.addEventListener('install', event = {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache = {
        console.log('PWA Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

 Activación del Service Worker
self.addEventListener('activate', event = {
  event.waitUntil(
    caches.keys().then(cacheNames = {
      return Promise.all(
        cacheNames.map(cacheName = {
          if (cacheName !== CACHE_NAME) {
            console.log('PWA Eliminando cache antigua', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

 Interceptar peticiones para funcionalidad offline
self.addEventListener('fetch', event = {
  event.respondWith(
    caches.match(event.request)
      .then(response = {
         Devolver desde cache si existe
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

 Notificar cuando hay nuevos episodios disponibles
self.addEventListener('message', event = {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

 Función para mostrar notificación de nuevo episodio
self.addEventListener('push', event = {
  const options = {
    body '¡Nuevo episodio disponible en Tu barrio más verde!',
    icon 'manifest-icon-192.png',
    badge 'manifest-icon-192.png',
    vibrate [200, 100, 200],
    data {
      dateOfArrival Date.now(),
      primaryKey 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('Tu barrio más verde', options)
  );
});