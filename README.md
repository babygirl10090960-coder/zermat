# Mis Fragancias

App web para vender fragancias desde casa: clientas, muestras, ventas y cobros, mensajes listos para WhatsApp, catálogo y equipo de ventas.

- Funciona en el celular y se puede instalar en la pantalla de inicio.
- Funciona sin internet.
- Los datos se guardan solo en el aparato de cada persona (nunca en un servidor). Usa **Más → Respaldo** para guardar una copia.
- Bloqueo opcional con PIN.

## Archivos

| Archivo | Para qué sirve |
| --- | --- |
| `index.html` | Toda la app |
| `sw.js` | Permite usarla sin internet |
| `manifest.webmanifest`, `icons/` | Para instalarla como app |
| `img/` | Fotos (Unsplash, licencia libre) |
| `render.yaml` | Configuración del sitio estático en Render y encabezados de seguridad |

## Publicar

Es un sitio estático: no necesita compilarse. En Render se publica como **Static Site** con carpeta de publicación `.`.
