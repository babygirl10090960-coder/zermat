# Aromas que Enamoran con Araceli Urquiza

Tienda pública y panel de ventas para una distribuidora independiente Zermat en Chicago.

- **Tienda** (`/`): catálogo de 40 fragancias con buscador, fotos y precios de lista de Zermat USA, **bolsita** que manda un solo pedido por WhatsApp (`#LEAD-PEDIDO`), test de personalidad olfativa, guía por temporada, mayoreo para negocios y "vende conmigo". Cada formulario abre WhatsApp con un mensaje marcado `#LEAD-…`.
- **Panel** (`/admin.html`): clientas, muestras, ventas y cobros, metas, mensajes, equipo, reclutamiento, **ayudantes y comisiones**, y **Negocios** (mayoreo) con 64 negocios y eventos de Chicago investigados. La **Bandeja** convierte los mensajes `#LEAD-…` en registros y prepara la respuesta.
- Funciona en celular, iPad y computadora, y sin internet (app instalable).

## Cómo correrlo en tu computadora

No necesita instalar nada ni compilar: son archivos HTML, CSS y JavaScript sin dependencias de npm.

1. Clona el repositorio:
   ```
   git clone https://github.com/babygirl10090960-coder/zermat.git
   cd zermat
   ```
2. Abre un servidor local en esa carpeta (cualquiera sirve), por ejemplo:
   ```
   npx serve -l 5600 .
   ```
   o, si tienes Python: `python -m http.server 5600`
3. Abre http://localhost:5600 (tienda) y http://localhost:5600/admin.html (panel).

## Publicar

Render publica solo cada vez que haces push a `main` (sitio estático `aromas-que-enamoran`, https://aromas-que-enamoran.onrender.com). Si cambias archivos que la app guarda sin internet, sube el número de `VERSION` en `sw.js` para que los celulares reciban la versión nueva.

## Archivos

| Archivo | Para qué sirve |
| --- | --- |
| `index.html` | Tienda pública |
| `config.js` | Nombre, WhatsApp, zonas y si se muestran precios |
| `catalogo.js` | Las 40 fragancias: precio, notas, familia de aroma (precios de zermatusa.com) |
| `perfil.js` | Preguntas y cálculo del test de aroma |
| `admin.html` | Panel de Araceli |
| `negocios-chicago.js` | Negocios y eventos para mayoreo (confirmar que sigan abiertos) |
| `privacidad.html` | Aviso de privacidad y términos de uso |
| `404.html` | Página para enlaces que no existen |
| `sw.js`, `manifest.webmanifest`, `icons/` | App instalable y sin internet |
| `img/` | Fotos (Unsplash, licencia libre) y `img/productos/` (fotos de Zermat) |
| `vendor/qrcode.min.js` | Códigos QR (copia local, sin CDN) |
| `robots.txt`, `sitemap.xml` | Para que Google encuentre la tienda |
| `render.yaml` | Registro de la configuración de Render y encabezados de seguridad |

## Datos, respaldos y errores

- **No hay servidor ni base de datos.** La tienda no guarda datos de nadie: los formularios solo abren WhatsApp. El panel guarda todo en el aparato de quien lo usa (`localStorage`); dentro de Claude se guarda en la cuenta privada de la usuaria.
- **Respaldo:** en el panel, **Más → Respaldo** descarga un archivo `.json`. Hazlo cada semana y guárdalo fuera del teléfono. Esos archivos tienen datos de clientas: no los subas al repositorio (`.gitignore` ya los bloquea).
- **Errores:** si algo falla, la página muestra un aviso sin detalles técnicos y guarda los últimos 20 errores en el aparato. Para verlos, abre la consola del navegador y escribe `localStorage.getItem('mf.errores')`. Los registros de visitas están en el panel de Render → Logs.

## Seguridad

- No hay claves, contraseñas ni tokens en el código. Si algún día se agrega un servicio con clave, va en variables de entorno de Render o en un `.env` (ignorado por git), nunca en el HTML.
- Encabezados en Render: Content-Security-Policy (solo scripts propios, sin conexiones externas), HSTS, X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy y Permissions-Policy. El panel tiene `noindex`.
- Todo lo que se escribe se muestra escapado (`esc()`); los campos tienen largo máximo; los respaldos se revisan antes de cargarse (tamaño y formato).
- El panel puede protegerse con PIN (Más → Seguridad). Los datos nunca salen del aparato salvo que la usuaria descargue un respaldo.
- Puntos que no aplican porque no hay servidor: validación en servidor, SQL, sesiones por usuario, CORS y límite de peticiones. Si se agrega un backend, hay que cubrirlos antes de publicarlo.

## Cambiar la tienda

Edita `config.js` (número, zonas) o `catalogo.js` (precios con cada catálogo nuevo), haz commit y push a `main`: Render publica solo.
