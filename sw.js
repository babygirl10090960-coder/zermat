// Permite usar la tienda y el panel sin internet.
// Páginas y datos: primero la red (para recibir cambios), si no hay internet la copia guardada.
// Imágenes e íconos: primero la copia guardada (cargan al instante).
const VERSION = 'mf-v10';
const ARCHIVOS = [
  './', 'index.html', 'admin.html', 'privacidad.html', '404.html', 'config.js', 'catalogo.js', 'perfil.js', 'negocios-chicago.js', 'manifest.webmanifest', 'vendor/qrcode.min.js',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png', 'icons/maskable-512.png',
  'img/portada.webp', 'img/mayoreo.webp', 'img/bienvenida.webp', 'img/catalogo.webp', 'img/equipo.webp', 'img/ideas.webp'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const guardar = (req, r) => { if (r.ok) { const copia = r.clone(); caches.open(VERSION).then(c => c.put(req, copia)); } return r; };

self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;

  if (/\.(webp|png|svg|jpg)$/.test(url.pathname)) {
    e.respondWith(caches.match(req).then(g => g || fetch(req).then(r => guardar(req, r))));
    return;
  }
  e.respondWith(
    fetch(req).then(r => guardar(req, r))
      .catch(() => caches.match(req, { ignoreSearch: true }).then(g => g || (req.mode === 'navigate' ? caches.match('index.html') : undefined)))
  );
});
