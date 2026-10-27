# Segovia Landing

Sitio del **Estudio Segovia & Asoc.** (abogado laboralista, Rosario). React + Vite + Tailwind.

Reemplaza la landing de una sola pagina por un sitio con blog, hecho sobre el sistema de
diseno existente: fondo azul tinta, acento dorado, **Bodoni Moda** para titulos y
**Plus Jakarta Sans** para texto.

## Como correrlo

```bash
npm install
npm run dev            # http://localhost:5173
npm run build          # produccion: dist/ + public/sitemap.xml + robots.txt
npm run build:staging  # base /Segovia_landing/ + noindex (staging)
npm run preview        # sirve el build
npm test               # tests de rutas, formulario y build
```

## Estructura

```
src/
  data/        todo el contenido (textos, servicios, articulos, contacto)
  components/  Navbar, Footer, Layout, BlogCard, Seo, SchemaOrg
  sections/    las secciones del home
  pages/       Home, BlogIndex, BlogPost, Privacidad
  utils/       formatDate, whatsapp
```

Todo el texto vive en `src/data/`. Para cambiar un telefono, una direccion o un articulo
no hace falta tocar componentes.

## El formulario de contacto

Sin backend, el formulario **abre WhatsApp con la consulta ya escrita**. Es el canal real
del estudio y no depende de que el correo funcione. No dice "enviado" si no envio nada.

Si mas adelante queres recibir las consultas por API (Formspree, Resend, n8n), definí
`VITE_FORM_ENDPOINT` en el `.env` y el formulario hace `POST` ahi en vez de abrir WhatsApp.

## SEO: robots, sitemap y noindex

`public/robots.txt` **no existe a proposito**. Si existiera, Vite lo copiaria a `dist/` y
podria pisar el que genera el plugin `robots-generator` de `vite.config.js`.

- **Produccion** (`npm run build`): `dist/robots.txt` sale con `Allow: /` y la linea
  `Sitemap: https://estudiosegoviayasoc.com.ar/sitemap.xml`.
- **Staging** (`npm run build:staging`): ademas del base path, setea `VITE_NOINDEX=true`,
  con lo cual `dist/robots.txt` sale con `Disallow: /` y `dist/index.html` incluye
  `<meta name="robots" content="noindex, nofollow">`.
- **Staging** tambien copia `dist/index.html` a `dist/404.html` al terminar. GitHub Pages
  usa ese archivo como fallback para que `/Segovia_landing/blog/<slug>` cargue la app.
  **Produccion no genera `404.html`**: ahi el `.htaccess` hace el rewrite.
- El sitemap se genera aparte con `scripts/generate-sitemap.mjs` y se copia a `dist/` en
  cualquier build (tambien en staging; ahi no molesta porque todo esta bloqueado).

Para verificar el resultado real:

```bash
npm run build            && cat dist/robots.txt
VITE_NOINDEX=true npm run build && cat dist/robots.txt
```

## Deploy

Produccion en Vercel (o cualquier host estatico con base `/`): `npm run build`. El
`vercel.json` ya tiene el rewrite para que las rutas de React Router (`/blog/<slug>`) no
den 404 al refrescar.

El workflow de GitHub Pages usa `npm run build:staging` porque publica bajo
`/Segovia_landing/` y no debe indexarse. Hoy corre **solo a mano** (`workflow_dispatch`):
Pages es publico y ese build contiene articulos que todavia no aprobo Santiago. Lisandro
tiene que confirmar si lo acepta como staging y si el repo privado requiere plan pago.

En Apache, `public/.htaccess` se copia a `dist/.htaccess` y resuelve el mismo problema:

```apache
Options -MultiViews
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
```

Las condiciones `!-f` y `!-d` hacen que el rewrite solo actue sobre rutas inexistentes: no
pisa archivos ni carpetas reales (`assets/`, `sitemap.xml`, `robots.txt`, etc.).

## Checklist de produccion (cPanel)

`VITE_FORM_ENDPOINT` se graba al compilar. Si se compila antes de tener el webhook de n8n,
el formulario cae a WhatsApp. Cuando el webhook exista hay que recompilar y volver a subir.

Despues de subir `dist/` **junto con `.htaccess`**, verificar desde el navegador:

- [ ] Abrir `/blog/<slug>` y recargar la pagina (no debe dar 404).
- [ ] Abrir `/robots.txt` (debe tener `Allow: /` y `Sitemap:`).
- [ ] Abrir `/sitemap.xml` (debe cargar el XML).

## Tests

```bash
npm test        # una corrida
npm run test:watch
```

Cubren:

- **Rutas**: home, `/blog`, `/blog/<slug>`, `/privacidad` y un slug inexistente.
- **WhatsApp sin endpoint**: con `VITE_FORM_ENDPOINT` vacio, el submit abre `wa.me` con la
  consulta y no hace `fetch`.
- **Honeypot**: si el campo oculto viene completo, simula exito y no envia nada.
- **Payload del POST**: cuando hay endpoint, `honeypot` no viaja en el JSON.
- **Build**: corre Vite en un directorio temporal y verifica que produccion no tenga
  `noindex` ni `Disallow: /`, que el sitemap salga, que staging si tenga ambos bloqueos y
  que staging genere `404.html` mientras produccion no lo genere.

---

# ANTES DE PUBLICAR — hay cosas que no se pueden dejar asi

Este repo es el **diseno terminado**. El contenido no. Estas son las cosas que estan
marcadas en el codigo y que hay que resolver antes de que el sitio sea publico:

| # | Que | Donde | Por que |
|---|-----|-------|---------|
| 1 | **Los 3 testimonios son inventados** | `src/data/testimonials.js` | La auditoria del 14/10/2026 verifico que no coinciden con ninguna resena real de Google. Publicar testimonios falsos en el sitio de un abogado es publicidad enganosa. **Hoy la seccion no se renderiza** (solo se ve en `npm run dev`) hasta que haya resenas reales autorizadas. |
| 2 | **Las metricas no estan verificadas** | `src/data/hero.js` | "+10 anos de trayectoria" y "+500 casos resueltos" son claims comerciales. Un abogado tiene que poder comprobarlos. |
| 3 | **Falta el numero de matricula** | `src/data/author.js` | Hoy la matricula solo existe dentro de la imagen del logo del sitio actual: no se puede leer como texto. |
| 4 | **Los horarios no estan confirmados** | `src/data/site.js` | Se copiaron del sitio actual sin verificar. |
| 5 | **Faltan las fotos** | `hero.js` y `whyUs.js` (`image: ''`) | Hay un fallback de diseno mientras no existan. |
| 6 | **Los 9 articulos estan redactados pero falta aprobacion** | `src/data/blog.js` | Ya tienen cuerpo y `isPlaceholder: false`, pero llevan el nombre y la matricula de Santiago: no se publican sin su aprobacion. |
| 7 | **La politica de privacidad es un borrador** | `src/pages/Privacidad.jsx` | Cumple la forma para la Ley 25.326, pero la tiene que revisar un abogado. |
| 8 | **El dominio** | `src/data/site.js` (`url`) | Esta en `estudiosegoviayasoc.com.ar`. Si el sitio se publica en otro lado, canonical, sitemap y Open Graph apuntan mal. |
| 9 | **El link de Google** | `src/data/site.js` (`googleReviews`) | Hoy es una busqueda, no la ficha del estudio. La ficha es el mejor activo (5,0 con 14 resenas) y merece el link directo. |

## Notas de implementacion

- **`borderRadius.full` esta en `9999px`**, no en `0.75rem` como decia el sistema original:
  con `0.75rem` los avatares de 40px y los pills salian como cuadrados redondeados.
- Las familias tipograficas van entre comillas en `tailwind.config.js`
  (`'"Bodoni Moda"'`). Sin comillas, Tailwind genera `font-family: Bodoni Moda`, que es
  CSS invalido y el navegador cae al fallback.
- El indice de Google Analytics **no esta instalado**. Es parte de la Etapa 1 del plan:
  sin medicion no se puede decidir nada.
