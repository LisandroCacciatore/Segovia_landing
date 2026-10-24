# Segovia Landing

Sitio del **Estudio Segovia & Asoc.** (abogado laboralista, Rosario). React + Vite + Tailwind.

Reemplaza la landing de una sola pagina por un sitio con blog, hecho sobre el sistema de
diseno existente: fondo azul tinta, acento dorado, **Bodoni Moda** para titulos y
**Plus Jakarta Sans** para texto.

## Como correrlo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/ + public/sitemap.xml
npm run preview  # sirve el build
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

## Deploy

Vercel (o cualquier host estatico). El `vercel.json` ya tiene el rewrite para que las rutas
de React Router (`/blog/<slug>`) no den 404 al refrescar.

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
| 6 | **Los 9 articulos no tienen cuerpo** | `src/data/blog.js` | Tienen titulo, extracto y categoria, pero `isPlaceholder: true`. Ninguno se publica sin aprobacion de Santiago: lleva su nombre y su matricula. |
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
