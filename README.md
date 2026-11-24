# Fragancias Araceli

Tienda pública y panel de ventas para una distribuidora independiente Zermat en Chicago.

- **Tienda** (`/`): catálogo, "encuentra tu aroma" con muestra gratis, mayoreo para negocios y "vende conmigo". Cada formulario abre WhatsApp con un mensaje marcado `#LEAD-…`.
- **Panel** (`/admin.html`): clientas, muestras, ventas y cobros, metas, mensajes, equipo y reclutamiento, y **Negocios** (mayoreo) con 64 negocios y eventos de Chicago investigados. La **Bandeja** convierte los mensajes `#LEAD-…` en registros y prepara la respuesta.
- Los datos del panel se guardan solo en el aparato de cada persona. Usa **Más → Respaldo**.
- Funciona en celular, iPad y computadora, y sin internet.

## Archivos

| Archivo | Para qué sirve |
| --- | --- |
| `index.html` | Tienda pública |
| `config.js` | Nombre, WhatsApp, zonas y fragancias de la tienda |
| `admin.html` | Panel de Araceli |
| `negocios-chicago.js` | Negocios y eventos para mayoreo (confirmar que sigan abiertos) |
| `sw.js`, `manifest.webmanifest`, `icons/` | App instalable y sin internet |
| `img/` | Fotos (Unsplash, licencia libre) |
| `vendor/qrcode.min.js` | Códigos QR |
| `robots.txt`, `sitemap.xml` | Para que Google encuentre la tienda |
| `render.yaml` | Sitio estático en Render y encabezados de seguridad |

## Cambiar la tienda

Edita `config.js` (número, zonas o fragancias), haz commit y push a `main`: Render publica solo.
