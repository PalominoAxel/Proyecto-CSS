# Documentación de cambios — Animaciones, transiciones/transformaciones, compatibilidad entre navegadores y Bootstrap

Resumen de lo aplicado a las 6 páginas del sitio (`index.html`, `nosotros.html`, `lineas.html`, `marcas.html`, `productos.html`, `contacto.html`) para cubrir los temas pendientes del curso. El diseño visual original **no se tocó**: todo se agregó de forma aditiva, sin reemplazar el CSS/LESS/SCSS ya existente.

## 1. Animaciones web (introducción, tipos, propiedades, aplicaciones)

Archivo nuevo: `css/animations.css` + `js/scroll-animations.js`.

- **`@keyframes`** definidos: `fadeInUp` (entrada), `pulseGlow` (loop infinito), `floatY` (idle continuo), `iconPop` (disparada por `:hover`). Antes del cambio el proyecto no tenía ningún `@keyframes`; solo transiciones.
- **Tipos de animación aplicados**:
  - *Scroll* (on-scroll reveal): `js/scroll-animations.js` usa `IntersectionObserver` para agregar la clase `.is-visible` a tarjetas, encabezados y bloques (`.feature-card`, `.marca-card`, `.logo-box`, `.news-card`, `.ventaja-item`, `.product-card`, `.timeline-card`, `.valor-card`, `.sede-item`, `.footer-col`, etc.) en **todas** las páginas, sin tener que editar cada HTML uno por uno.
  - *Loop infinito*: el botón "Contacto" del navbar (`.btn-contacto-nav`, presente en las 6 páginas) y el ícono del "Libro de Reclamaciones" en el footer (`.libro-reclamaciones-btn img`).
  - *Hover*: ícono de "Ventajas" (`index.html`) e ícono de sede (`contacto.html`) usan `iconPop` al pasar el mouse.
- **Propiedades usadas**: `animation-name`, `animation-duration`, `animation-timing-function` (incluye `cubic-bezier`), `animation-fill-mode`, `animation-iteration-count` (`infinite`).
- Progressive enhancement: la clase `.will-animate` (opacity:0) solo se agrega vía JavaScript, justo antes de observar el elemento. Si JavaScript está desactivado, esa clase nunca se aplica y el contenido se ve normal (no queda invisible).

## 2. Transiciones y transformaciones (conceptos, propiedades, aplicaciones)

El sitio ya traía bastantes `transition`/`transform` en hover (p. ej. `.feature-card:hover`, `.product-card:hover`, `.social-icon:hover`). Se completó con casos que faltaban, en `css/animations.css`:

- `transition-property` + `transition-duration` + `transition-timing-function` explícitos sobre `.ventaja-icon img`, `.sede-icon`, `.card-badge`, `.news-badge`, `.sede-badge`.
- `transform` combinando `scale()`, `translateY()` y `rotate()` (vía `iconPop`) para mostrar varios tipos de transformación 2D, no solo traslación.
- Los botones de Bootstrap (`.btn-outline-light`, `.btn-danger`) quedaron con su propia transición de `transform`/`box-shadow` para que combinen con el tema oscuro del sitio.

## 3. Compatibilidad entre navegadores

- Todas las reglas nuevas de `animation`/`transition`/`transform` en `css/animations.css` incluyen el prefijo `-webkit-` (motores WebKit antiguos).
- `@supports (backdrop-filter: blur(6px)) or (-webkit-backdrop-filter: blur(6px))`: aplica el efecto de vidrio esmerilado al header fijo **solo** si el navegador lo soporta (feature query), sin romper nada en los que no.
- `@media (prefers-reduced-motion: reduce)`: desactiva todas las animaciones/transiciones nuevas si el usuario lo pidió a nivel de sistema operativo/navegador.
- `js/scroll-animations.js` verifica `'IntersectionObserver' in window` antes de usarlo; si el navegador no lo soporta (Safari muy viejo, IE11), muestra el contenido directamente sin animar, en vez de fallar o dejarlo invisible. Además evita `Array.prototype.forEach` sobre `NodeList` (no soportado en IE11) y usa bucles `for` clásicos.
- Se mantienen `<meta name="viewport">` y `lang="es"` en las 6 páginas (ya existían).

## 4. Frameworks CSS — Bootstrap

Se evaluaron Bootstrap, Tailwind, Material Design y Materialize. **Se aplicó únicamente Bootstrap 5.3** (vía CDN), porque combinar los 4 frameworks en un mismo sitio generaría estilos base en conflicto entre sí (cada uno trae su propio reset/reboot). Tailwind, Material Design y Materialize quedan documentados aquí como investigación, no integrados en el código.

**Cómo se integró sin romper el diseño ya construido:**

1. `css/global.css` agrega un bloque `body, h1-h6, p, ul, ol, dl, figure, blockquote { margin: 0; font-family: ... }` y `a { color: inherit; text-decoration: none; }` con la misma especificidad (selector de tipo) que usa el Reboot de Bootstrap, para que el margen/tipografía/color de enlaces original no cambie al cargar Bootstrap.
2. El CDN de Bootstrap se carga **antes** de `css/global.css` y del CSS propio de cada página, así cualquier propiedad que ambos definan la gana el CSS del proyecto (por orden de cascada, misma especificidad).

**Dónde se usa Bootstrap de verdad (no solo el CDN "por si acaso"):**

- **Footer compartido** (las 6 páginas): `.footer-content` pasó de `display:grid` propio a `row g-4` + `col-12 col-md-5/4/3` de Bootstrap. Cambio hecho una sola vez en `css/global.css` + el mismo ajuste de clases en los 6 HTML.
- **Formulario de contacto** (`contacto.html`): `row g-3`, `col-md-6`/`col-12`, `form-label`, `form-control`, `btn`. El CSS propio (`contacto.css`) sigue coloreando los inputs para el tema oscuro (selectores `.contacto-form input` tienen más especificidad que `.form-control` de Bootstrap, así que el estilo oscuro se conserva).
- **Grillas de productos** (`productos.html`): `.productos-grid-top`/`.productos-grid-bottom` pasaron de CSS Grid propio a `row g-3` + `col-6 col-md-4` / `col-6 col-md-3`.
- Bundle JS de Bootstrap (`bootstrap.bundle.min.js`) incluido en las 6 páginas para dejar disponibles sus componentes JS (dropdown, collapse, modal, etc.) si se necesitan más adelante.

**Qué no se tocó a propósito:** la grilla de "¿Por qué trabajar con Inpelsa?" (`index.html`, `.ventajas-grid`) y los sliders/acordeones/modales ya construidos a mano (hero slider, acordeón de líneas, modal de productos, slider de marcas) se dejaron con su implementación original: son demasiado específicos (líneas divisoras con pseudo-elementos, lógica JS propia) y convertirlos a Bootstrap no aportaba valor, solo riesgo de romper el diseño.

## 5. Cobertura en páginas adicionales

Además de las 6 páginas principales, el sitio tiene páginas independientes agregadas después (`certified-angus-beef.html`, `libro-de-reclamaciones.html`, `privacidad.html`, `barbaro.html`). Las tres primeras ya cargaban Bootstrap + `css/animations.css` + `js/scroll-animations.js` desde su creación.

`barbaro.html` (micrositio de marca, con su propio reset/header/footer y SIN `css/global.css`) quedó fuera en el commit original. Se agregó:

- Bootstrap 5.3 (CDN, CSS + JS bundle), cargado antes de `css/barbaro.css` para que el reset propio de la página siga ganando la cascada.
- `css/animations.css` + `js/scroll-animations.js`, reutilizando el sistema compartido de `.will-animate`/`.is-visible` mediante el atributo genérico `data-animate` en `.bb-card`, los dos `.bb-product` y `.bb-store-box` (no fue necesario tocar el script compartido).
- Prefijos `-webkit-` en las transiciones/transformaciones que ya existían en `css/barbaro.css` (`.bb-product-card:hover`, `.bb-store-logo:hover`).
- Bloque `@media (prefers-reduced-motion: reduce)` propio para esos mismos hovers, igual que el resto del sitio.

## Archivos nuevos
- `css/animations.css`
- `js/scroll-animations.js`
- `DOCUMENTACION_CAMBIOS.md` (este archivo)

## Archivos editados
- `css/global.css`, `css/contacto.css`, `css/productos.css`, `css/barbaro.css`
- `index.html`, `nosotros.html`, `lineas.html`, `marcas.html`, `productos.html`, `contacto.html`, `barbaro.html`
