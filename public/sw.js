const CACHE_NAME = 'yukino-v4';

// Assets statiques à mettre en cache immédiatement
const STATIC_ASSETS = [];

// Routes qui ne doivent JAMAIS être servies depuis le cache
const NEVER_CACHE = [
  '/api/',
  '/_next/webpack-hmr',
  '/admin',
];

// ── Installation : on pré-cache les assets statiques ──
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// ── Activation : on supprime les anciens caches ──
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch : stratégie network-first ──
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // On ignore les requêtes non-GET et les routes API/admin
  if (request.method !== 'GET') return;
  if (NEVER_CACHE.some((path) => url.pathname.startsWith(path))) return;
  // On ignore les requêtes cross-origin (Neon, Resend, Anthropic...)
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        // On met en cache les assets Next.js (_next/static/...)
        if (url.pathname.startsWith('/_next/static/')) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => {
        // Pas de réseau → on sert le cache si dispo, sinon la page offline
        return caches.match(request).then(
          (cached) => cached || caches.match('/offline.html')
        );
      })
  );
});
