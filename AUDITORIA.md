# Auditoría WCAG 2.2 AA, UX y responsive

**Fecha:** 2026-09-10  
**Alcance:** `index.html`, `styles.css` y `script.js`  
**Tipo:** auditoría no destructiva. Los tres archivos auditados no fueron modificados.

## 1. Resumen ejecutivo

La implementación tiene una buena base semántica y funcional: usa landmarks HTML, declara el idioma español, mantiene una jerarquía de encabezados coherente, utiliza controles nativos para la línea de tiempo y proporciona textos alternativos para las tres imágenes `<img>`.

Las pruebas realizadas confirman que:

- Los tres archivos existen.
- `script.js` pasa `node --check` con Node.js 24.19.0.
- No se observaron errores JavaScript en el navegador.
- Los enlaces internos apuntan a destinos existentes.
- La línea de tiempo actualiza correctamente su contenido y `aria-pressed`.
- No hay overflow horizontal en 320, 398, 768 ni 1440 px.
- Las tres imágenes de galería cargaron correctamente.

Los problemas principales son de accesibilidad visual y navegación móvil:

1. La navegación principal se oculta completamente en 320 px y 398 px, sin menú alternativo.
2. El color rojo usado en textos pequeños y el gris secundario no alcanzan el contraste AA exigido para texto normal sobre fondo claro.
3. El foco está declarado en CSS, pero la inspección computada devolvió `outline-style: none`; debe verificarse y reforzarse.
4. Las imágenes de hero usan fondos CSS y `aria-label` sobre un `div`, sin una alternativa equivalente como imagen semántica.

No se identificaron hallazgos críticos justificables.

## 2. Hallazgos críticos, altos, medios y bajos

### Críticos

No se encontraron hallazgos críticos mediante la revisión del código y las pruebas realizadas.

### Altos

#### A-01 — Navegación principal oculta en móvil

- **Archivo/elemento:** [`styles.css`](./styles.css), `.site-nav` dentro de `@media (max-width: 700px)`.
- **Evidencia:** la regla `display: none` se aplica en 320 px y 398 px; la medición devolvió `navDisplay: "none"`.
- **Relación:** WCAG 1.4.10 Reflow, 2.1.1 Teclado y 2.4.1 Bloques de navegación.
- **Impacto:** una persona usuaria de móvil no ve ni puede usar la navegación principal para acceder a Historia, Trayectoria, Números y Galería.
- **Corrección recomendada:** mantener una navegación compacta visible o implementar un menú con botón accesible, `aria-expanded`, `aria-controls`, gestión de foco y cierre con `Escape`.

#### A-02 — Contraste insuficiente del rojo en texto normal

- **Archivo/elemento:** [`styles.css`](./styles.css), `--red: #e94735`, aplicado entre otros a `.eyebrow` y `.detail-club`.
- **Evidencia:** contraste calculado de `#e94735` sobre `#f3f1ed`: **3.44:1**. WCAG AA exige 4.5:1 para texto normal.
- **Relación:** WCAG 1.4.3 Contraste mínimo.
- **Impacto:** etiquetas pequeñas como “01 / El origen” o “Manchester United” pueden tener legibilidad insuficiente.
- **Corrección recomendada:** usar una variante roja más oscura para texto sobre fondos claros y reservar el rojo actual para texto grande, bordes o decoración. Medir cada combinación resultante.

### Medios

#### M-01 — Foco visual no confirmado como visible

- **Archivo/elemento:** [`styles.css`](./styles.css), regla global `:focus, :focus-visible`.
- **Evidencia:** aunque el CSS declara `outline: 3px solid var(--red)`, la inspección de enlaces y botones enfocados devolvió `outline-style: none` con ancho de 3 px.
- **Relación:** WCAG 2.2 2.4.7 Foco visible y 2.4.11 Foco no oculto.
- **Impacto:** la persona que navega con teclado puede no distinguir el control activo.
- **Corrección recomendada:** establecer explícitamente un indicador sólido, por ejemplo `outline-style: solid`, o usar una sombra de foco de alto contraste. Validar visualmente con Tab en varios navegadores.

#### M-02 — Imágenes informativas implementadas como fondos CSS

- **Archivo/elemento:** [`index.html`](./index.html), `.hero-figure`; [`styles.css`](./styles.css), `.hero:before` y `.hero-image`.
- **Evidencia:** las imágenes principales se cargan mediante `background`; `.hero-figure` es un `div` con `aria-label`, no un elemento de imagen.
- **Relación:** WCAG 1.1.1 Contenido no textual.
- **Impacto:** una tecnología de asistencia puede no anunciar el contenido visual; además, el contenido depende de recursos remotos.
- **Corrección recomendada:** usar `<img>` con `alt` si la imagen es informativa, o marcarla claramente como decorativa y conservar la información en texto visible.

#### M-03 — Contraste insuficiente del gris secundario

- **Archivo/elemento:** [`styles.css`](./styles.css), `--muted: #77736e`.
- **Evidencia:** contraste calculado de `#77736e` sobre `#f3f1ed`: **4.17:1**, inferior a 4.5:1 para texto normal.
- **Relación:** WCAG 1.4.3 Contraste mínimo.
- **Impacto:** párrafos secundarios, notas y descripciones pueden perder legibilidad.
- **Corrección recomendada:** oscurecer `--muted` o revisar tamaño y peso de los textos que lo utilizan.

#### M-04 — Imágenes remotas y contenido alternativo genérico

- **Archivo/elemento:** [`index.html`](./index.html), las tres imágenes de `.gallery`.
- **Evidencia:** las URL apuntan a Unsplash y los `alt` describen escenas genéricas, no una identidad verificable de Cristiano Ronaldo.
- **Impacto:** la galería depende de una red externa y podría no representar al sujeto de la página.
- **Corrección recomendada:** usar imágenes verificables y con licencia adecuada, preferentemente locales, y escribir cada `alt` según lo que realmente aparece.

### Bajos

#### B-01 — Imágenes de galería sin carga diferida

- **Archivo/elemento:** [`index.html`](./index.html), las tres etiquetas `<img>`.
- **Evidencia:** no incluyen `loading="lazy"` ni `decoding="async"`.
- **Impacto:** se solicitan imágenes grandes aunque están fuera del primer viewport.
- **Corrección recomendada:** añadir `loading="lazy"` y `decoding="async"` a las imágenes no críticas.

## 3. Evidencia concreta y criterios que cumplen

### Estructura semántica — Cumple

- [`index.html`](./index.html) contiene `header`, `nav`, `main`, `section`, `article`, `figure` y `footer`.
- El `main` tiene el identificador `contenido`, destino del enlace de salto.
- Las secciones principales tienen nombres mediante `aria-labelledby`.

### Jerarquía de encabezados — Cumple

- Hay un único `h1`: “El arte de superarse”.
- Las secciones usan `h2`.
- El detalle de la trayectoria usa `h3`.
- No se detectaron saltos estructurales injustificados.

### Nombres accesibles y ARIA — Cumple parcialmente

- `nav` tiene `aria-label="Navegación principal"`.
- Los botones de años están agrupados con `role="group"` y `aria-label`.
- Cada botón usa `type="button"`, `aria-controls` y `aria-pressed`.
- El artículo de detalle usa `aria-live="polite"`.
- El `aria-label` de `.hero-figure` sobre un `div` debe revisarse por M-02.

### Textos alternativos — Cumple parcialmente

- Las tres etiquetas `<img>` tienen `alt` no vacío y descriptivo de la escena.
- Las imágenes usadas como fondos CSS no tienen alternativa semántica equivalente; ver M-02.

### Enlaces y botones — Cumple

- Los enlaces internos usan `<a href="#...">`.
- La línea de tiempo usa botones nativos y no elementos clicables simulados.
- Se comprobó que todos los `href` internos tienen un elemento destino.

### Navegación por teclado y foco — Cumple parcialmente

- Los enlaces y botones son enfocables de forma nativa.
- Existe “Saltar al contenido principal”.
- La navegación está oculta en móvil; ver A-01.
- El foco visual requiere verificación/corrección; ver M-01.

### Objetivos táctiles — Cumple en la prueba realizada

- Los botones de años midieron aproximadamente 58 × 42 CSS px en móvil.
- Ese tamaño supera el mínimo de 24 × 24 CSS px definido por WCAG 2.2 para objetivos pointer.

### Responsive y overflow — Cumple en las pruebas realizadas

| Resolución | `scrollWidth` | Overflow horizontal | Navegación |
|---:|---:|:---:|:---|
| 320 px | 307 px | No | Oculta |
| 398 px | 383 px | No | Oculta |
| 768 px | 753 px | No | Visible |
| 1440 px | 1425 px | No | Visible |

La ausencia de overflow no elimina el problema funcional A-01.

### JavaScript — Cumple en las pruebas realizadas

- [`script.js`](./script.js) usa datos locales y listeners nativos.
- `node --check` pasó con Node.js **v24.19.0**.
- La selección de 2018 y 2023 actualizó año, club, título, descripción, número/progreso y `aria-pressed`.
- No se observaron `pageerror` ni mensajes `console.error`.

### Imágenes — Cumple parcialmente

- Las tres imágenes `<img>` cargaron correctamente.
- Todas tienen texto `alt`.
- La hero utiliza fondos remotos sin imagen semántica; ver M-02 y M-04.

## 4. Recomendación de corrección para cada hallazgo

| ID | Corrección | Prioridad |
|---|---|---|
| A-01 | Crear navegación móvil visible o menú desplegable accesible con estado ARIA y foco gestionado. | Alta |
| A-02 | Cambiar el rojo usado en texto pequeño por una variante que alcance 4.5:1. | Alta |
| M-01 | Forzar un estilo de foco sólido y contrastado; repetir prueba manual con Tab. | Alta |
| M-02 | Convertir imágenes informativas de fondo en `<img>` con `alt`, o hacerlas inequívocamente decorativas. | Media |
| M-03 | Oscurecer `--muted` y medir nuevamente todos sus usos. | Media |
| M-04 | Sustituir imágenes por recursos verificables/licenciados y ajustar sus `alt`. | Media |
| B-01 | Añadir `loading="lazy"` y `decoding="async"` a la galería. | Baja |

## 5. Pruebas que deberían repetirse después de corregir los problemas

1. Ejecutar `node --check paginaCristianoRonaldo/script.js`.
2. Recorrer la página con `Tab`, `Shift+Tab`, `Enter`, `Space` y `Escape`.
3. Confirmar que el foco visible se distingue en enlaces, botón principal, botones de años y “Volver arriba”.
4. En móvil, abrir y cerrar el menú y verificar `aria-expanded`, `aria-controls`, foco inicial, foco de retorno y cierre con `Escape`.
5. Repetir en 320, 398, 768 y 1440 px:
   - `document.body.scrollWidth <= window.innerWidth`;
   - ningún texto cortado o solapado;
   - ningún control fuera del viewport;
   - objetivos táctiles utilizables.
6. Medir con una herramienta WCAG el contraste de rojo, gris, texto claro sobre hero y tarjetas oscuras.
7. Probar con NVDA, Narrador o VoiceOver landmarks, encabezados, botones, `aria-live` y textos alternativos.
8. Desactivar la red y revisar el comportamiento de todas las imágenes remotas.

## Verificación final

- `index.html`, `styles.css` y `script.js`: existen.
- Archivos auditados modificados: **ninguno**.
- `AUDITORIA.md`: generado como informe solicitado.
- Sintaxis JavaScript: **OK** con Node.js v24.19.0.
- Errores JavaScript observados: **ninguno**.
- Enlaces internos: **válidos**.
- Línea de tiempo: **funcional**.
- Overflow horizontal en los cuatro anchos: **no detectado**.

## Estado tras las correcciones aplicadas

Las siguientes recomendaciones tienen ahora un cambio concreto y una prueba asociada:

- **A-01:** corregido en [`index.html`](./index.html) y [`script.js`](./script.js) con botón de menú, `aria-expanded`, cierre mediante `Escape`, cierre al seleccionar un enlace y retorno del foco al botón. Probado a 398 px.
- **A-02:** corregido en [`styles.css`](./styles.css) cambiando `--red` a `#a92d25`. Contraste medido: **6.03:1** sobre `#f3f1ed`.
- **M-01:** corregido en [`styles.css`](./styles.css) con `outline-style: solid` explícito. El foco del botón de menú se verificó como `solid 3px`.
- **M-02:** corregido parcialmente en [`index.html`](./index.html) con `role="img"` y nombre accesible en `.hero-figure`; la imagen sigue siendo un fondo remoto, por lo que se recomienda una futura migración a `<img>` local si se requiere una alternativa visual robusta sin red.
- **M-03:** corregido en [`styles.css`](./styles.css) cambiando `--muted` a `#625e59`. Contraste medido: **5.70:1** sobre `#f3f1ed`.
- **M-04:** parcialmente mitigado en [`index.html`](./index.html) con `loading="lazy"` y `decoding="async`; las fotografías continúan siendo recursos remotos y genéricos, por lo que no se declara resuelta la verificación de identidad/licencia.
- **B-01:** corregido en [`index.html`](./index.html) añadiendo `loading="lazy"` y `decoding="async"` a las tres imágenes de galería.

La interacción de la línea de tiempo, el menú móvil, los enlaces internos, el overflow y la consola se volvieron a probar después de estos cambios. 
