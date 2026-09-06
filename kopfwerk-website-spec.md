# Kopfwerk Website — Spec técnico para Claude Code

> Este documento se construye progresivamente en conversación con Claude.
> Al final, se usa como prompt completo para que Claude Code implemente el sitio.

## Contexto de marca (para que Claude Code entienda el tono)

- Agencia: Kopfwerk (kopfwerk.agency)
- Leitsatz: "Alles Wichtige passiert zuerst im Kopf" (Todo lo importante pasa primero en tu cabeza)
- Atributos: Menschlich (humana), Klug-locker (inteligente-relajada), Unangepasst (inconformista), Präzise (precisa)
- Tono: cálido, directo, elegante pero no rígido; nunca frío-corporativo
- Servicios: 1) Apps y Webs (entrada), 2) Automatizaciones (core), 3) Contenido IA (upsell)
- Posicionamiento (actualizado): Kopfwerk no vende automatizaciones sueltas ni servicios aislados. Se posiciona como **socio estratega** que acompaña un recorrido completo: Auditoría → Desarrollo → Capacitación/Acompañamiento (ver Sección 3 para el detalle completo de este framework).
- Contacto: mauriciojaramillo146@gmail.com

## Contexto técnico importante — LEER PRIMERO

Este sitio se construye **sobre el repositorio del portfolio personal actual de Mauricio** (mismo proyecto/codebase). Ya existe un archivo `PORTFOLIO_BACKUP.md` con el inventario completo del portfolio (10 proyectos web, 3 galerías de contenido IA, 3 proyectos de diseño, 10 tutoriales, Datenschutz/Impressum, stack técnico, colores y rutas actuales). El portfolio **no se elimina**: se integra como una sección dentro del nuevo sitio de Kopfwerk (ej. sección "Trabajo"/"Portfolio"). Cualquier instrucción a Claude Code debe partir de este hecho, nunca asumir que se construye desde cero.

## Stack sugerido

- El mismo stack que ya usa el portfolio actual (a confirmar con Claude Code cuál es)
- Animaciones: GSAP o Framer Motion
- Scroll suave tipo Locomotive Scroll (librería open source, MIT license, se puede usar libremente)

---

## SECCIÓN 1: Pantalla de carga (Preloader)

**Mecánica general:**

1. Al cargar la página, se muestra una pantalla completa (fondo `#1D1616`) que cubre todo el viewport, con el `body` bloqueado (sin scroll) mientras carga.
2. En el centro, aparece el **logo/ícono de Kopfwerk** (silueta + espiral) con una animación de entrada suave (fade + scale desde 0.9 a 1, easing `cubic-bezier(0.215, 0.61, 0.355, 1)`, duración ~0.9s).
3. Duración mínima del preloader: ~1.2s.
4. Al terminar, fade-out (opacity a 0, ~0.9s) y se desactiva el bloqueo de scroll.
5. Sin texto animado: solo el ícono, sin frases ni palabras cicladas.
6. Sesiones siguientes (navegación interna): preloader más corto o se omite (sessionStorage "ya cargó una vez").

**Estado:** Concepto de ícono generado (`kopfwerk-icon-v1.svg` / variante dorada), pendiente de refinar en Figma antes de ser el logo final.

---

## Identidad visual — Paleta de color

| Rol | Hex | Uso |
|---|---|---|
| Fondo oscuro principal | `#1D1616` | Fondos, preloader, headers oscuros |
| Acento vino/burdeos (color primario del Hero) | `#6E2C34` | Fondo del hero, detalles, hover states |
| Dorado/mostaza | `#D9A441` | CTAs, acentos principales, highlights |
| Dorado claro | `#EFD9A6` | Fondos claros, secciones alternadas |
| Blanco cálido / crema | `#FAF6EE` | Texto sobre fondo oscuro, silueta del logo |

## Identidad visual — Concepto de logo

- Ícono: silueta de perfil de cabeza humana (mirando a la derecha) con espiral simplificada dentro del cráneo (1.75 vueltas, no recargada).
- Trazo limpio, grosor uniforme, sin relleno sólido.
- Formato final: SVG vectorial.

## Identidad visual — Tipografía

- **Tipografía elegida: Objektiv Mk1** (Adobe Fonts). Geometría con "human appeal", combina precisión con calidez (coherente con Präzise + Menschlich). Usar variante Mk1 para el wordmark del logo (mismo grosor de trazo fino que el ícono), y la familia Objektiv en general (con sus variantes Mk2/Mk3 si se necesita más legibilidad) para el resto del sitio.
- Razón de la elección: el ícono tiene trazo fino y uniforme; Objektiv Mk1 en peso Light/Regular iguala ese grosor visual mejor que alternativas más pesadas (se descartó Space Grotesk por sentirse más robusta).
- Soporta diacríticos alemanes (ä, ö, ü, ß).

---

## SECCIÓN 2: Hero de la Home

**Estructura de referencia (adaptar, no copiar código de terceros):**

El hero sigue el patrón de layout de una sola columna centrada: badge pequeño arriba, H1 de 2 líneas, subtítulo, botón CTA, y una barra de "trust items" (2 iconos + texto corto) debajo. Fondo de sección con un efecto visual animado detrás de todo el contenido (ver Concepto visual abajo).

**Contenido:**
- Badge: "Kopfwerk — Automatización, Apps y Contenido con IA"
- H1 línea 1: "Pensamos antes de automatizar"
- H1 línea 2: "tu negocio"
- Subtítulo: "Auditoría, desarrollo y capacitación en IA para empresas que quieren operar con más claridad, más control y menos fricción."
- CTA: texto "Agendar diagnóstico", link `mailto:mauriciojaramillo146@gmail.com` (temporal, hasta tener Cal.com u otro sistema de agenda)
- Trust item 1: "Diagnóstico sin compromiso"
- Trust item 2: "Enfoque 100% en ROI" (o ajustar si se prefiere otro mensaje honesto)

**Concepto visual del fondo — "Silueta como sol":**

En vez de un shader abstracto genérico, el elemento central del hero es la **silueta del logo de Kopfwerk (crema/blanco `#FAF6EE`), centrada, mirando hacia la derecha**, jugando visualmente el rol de un sol/foco de luz. Alrededor de ella, un fondo de **anillos concéntricos radiales** (5-6 anillos, estilo "Apple keynote poster" — ver referencia visual generada en conversación), con degradado profesional y suave (sin bandas visibles) que va desde blanco/crema cerca de la silueta, pasando por dorado (`#D9A441`) y ámbar, hasta vino oscuro (`#6E2C34`) en los bordes del frame.

- Color de fondo base de la sección: `#6E2C34` (vino/burdeos), no un fondo púrpura ni ningún otro color.
- El efecto puede implementarse como shader WebGL animado (con movimiento lento de los anillos/degradado, no estático) o como imagen/CSS con animación sutil, según lo que Claude Code determine más viable con el stack del proyecto.
- Texto e íconos del hero: blanco/crema `#FAF6EE`, igual que en la referencia de estructura.
- **No usar** paleta púrpura/rosa de ninguna referencia ajena; todo el hero debe usar exclusivamente la paleta de Kopfwerk de la tabla de arriba.

**Pendiente:** asset final de la silueta en SVG de alta calidad (ver Sección de logo) antes de implementar este fondo en producción.

---

## SECCIÓN 3: Framework de posicionamiento y estructura de la página (patrón extraído, no copiado)

Mauricio compartió el HTML completo de una agencia de IA (Nexum) como referencia. **No se debe copiar su copy, su código ni su paleta de color** (son propiedad de esa agencia y además usan púrpura/rosa, ajeno a Kopfwerk). Lo que sí se traslada es el **patrón estructural y de mensaje** que usan, adaptado 100% al lenguaje y paleta de Kopfwerk.

### 3.1 — Framework de diferenciación ("por qué elegirnos")

Patrón: una sección que presenta 3 pares de bloques "problema del mercado → cómo lo resolvemos distinto", en formato de dos columnas (izquierda = problema típico del mercado, con ícono de X; derecha = cómo lo hace la agencia, con ícono de check). Cierra con una frase-declaración a modo de síntesis, en una caja destacada.

**Adaptado al framework de Kopfwerk (Auditoría → Desarrollo → Capacitación/Acompañamiento), Claude Code debe redactar 3 pares originales siguiendo esta lógica** (no traducir literal los de Nexum, crear copy propio de Kopfwerk):

1. Problema típico: proveedores que implementan sin entender el negocio → Solución Kopfwerk: auditoría antes de ejecutar, decisiones basadas en el negocio real.
2. Problema típico: consultores/agencias que solo asesoran pero no construyen → Solución Kopfwerk: el mismo equipo que diagnostica, construye (apps, automatización, contenido).
3. Problema típico: formación genérica desconectada de la operación real → Solución Kopfwerk: capacitación/acompañamiento integrado sobre lo que ya se construyó para ese cliente específico.

Cerrar con una frase-síntesis propia de Kopfwerk, coherente con el Leitsatz (ej. algo que combine "pensar antes de construir" con "acompañamiento real", redactado por Claude Code en tono Kopfwerk, no traducción de Nexum).

### 3.2 — Sección de método (pasos numerados con navegación scroll-sync)

Patrón: layout de dos columnas — a la izquierda una navegación vertical sticky con los pasos numerados (ej. 01 Auditoría, 02 Desarrollo, 03 Capacitación), a la derecha los paneles de contenido de cada paso, que se activan/resaltan en la navegación conforme el usuario hace scroll (usando IntersectionObserver o equivalente). Cada panel tiene: número grande de fondo (watermark), título, descripción, y 3 "tags" o entregables concretos en cajas pequeñas.

Aplicado a Kopfwerk, los 3 pasos son Auditoría, Desarrollo, Capacitación/Acompañamiento (contenido específico de Kopfwerk a definir en detalle cuando se redacte esta sección completa).

### 3.3 — Elementos estructurales adicionales observados (para tenerlos en el repertorio, usar solo si aportan)

- **Trust bar** con 2-3 métricas/mensajes cortos con ícono, debajo del CTA del hero.
- **Sección de resultados/beneficios interactiva**: nodos distribuidos alrededor de un centro, que al hacer click o hover muestran el detalle de un beneficio (patrón "orbital"). Opcional para Kopfwerk, evaluar si aporta o es demasiado "efecto" para el tono más sobrio de la marca.
- **Testimonios como tarjetas apilables/deslizables** (drag para pasar a la siguiente). Usar solo cuando existan testimonios reales de clientes de Kopfwerk.
- **Sección de equipo** con sincronización hover foto↔nombre (al pasar el mouse por una foto se resalta el nombre correspondiente y viceversa).
- **Botones "liquid glass"**: efecto de vidrio esmerilado/desplazamiento sutil en botones primarios (usando SVG filter de turbulencia + backdrop-filter). Es un detalle de micro-interacción que se puede adoptar visualmente adaptado a los colores de Kopfwerk, sin copiar el código exacto.
- **Animación fade-up al hacer scroll** en la mayoría de bloques de contenido (opacity 0 + translateY(28px) → visible), vía IntersectionObserver. Patrón genérico y reutilizable, aplicar en toda la home de Kopfwerk.
- **Navbar con mega-dropdown**: menú que al hacer hover sobre un ítem despliega un panel con tarjetas de sub-secciones (ej. servicios individuales). Evaluar si Kopfwerk necesita esta complejidad o un menú simple es más coherente con "Klug-locker" (evitar sobre-ingeniería).

### 3.4 — Qué NO se traslada

- Paleta de color púrpura/rosa/gradientes tipo "IA genérica" — Kopfwerk usa su propia paleta cálida.
- Copy literal de ninguna sección — todo el texto se redacta en tono propio de Kopfwerk.
- El nombre "Nexum", su logo, sus testimonios o sus métricas (+650 soluciones, etc.) — esos son datos reales de otra empresa, nunca deben aparecer ni como placeholder en el sitio de Kopfwerk.

---

## Pendientes generales antes de implementar con Claude Code

- [ ] SVG final del logo (Figma, refinar línea facial)
- [ ] Confirmar sistema de agenda (Cal.com u otro) para reemplazar el `mailto:` temporal del CTA
- [ ] Redactar el copy completo de la Sección 3.1 y 3.2 en tono Kopfwerk (Claude Code no debe traducir/adaptar el de Nexum, debe crear copy original)
- [ ] Definir si se incluyen las secciones opcionales de 3.3 (orbital, testimonios, equipo) según lo que aplique a la etapa actual de la agencia

---

## SECCIÓN 3.5: Storytelling patterns extraídos de Iarvix (patrón, no copia)

Segunda referencia analizada: agencia de automatización más especializada. Se extrae el **enfoque narrativo**, nunca su código, nombres de clientes, métricas o copy literal.

**Patrones a adoptar en el copy propio de Kopfwerk:**

1. **Hook que divide el trabajo entre IA y humano**: el titular del hero debe contrastar "lo que la IA/el sistema hace" vs "en qué se enfoca el humano", en vez de listar features. Ya está reflejado parcialmente en el H1 actual del hero ("Pensamos antes de automatizar tu negocio"); revisar si se puede afilar más hacia este contraste explícito.

2. **Métricas en rango, no números de marketing inflados**: cuando Kopfwerk tenga datos reales de clientes (ROI, tiempo ahorrado, plazos de implementación), presentarlos como rangos honestos (ej. "20-85%", "2-6 semanas") en vez de un número absoluto sin contexto. **No inventar cifras ahora** — dejar placeholder hasta tener datos reales.

3. **Recurso retórico "No somos / Somos"**: confirmado como convención del género (lo usan tanto Nexum como Iarvix). Vale la pena que la Sección 3.1 del framework de diferenciación (ya definida arriba) se apoye en esta estructura de negación+afirmación, redactada en voz propia de Kopfwerk.

4. **Transparencia de tiempo/costo por fase del proceso**: en la Sección 3.2 (método: Auditoría → Desarrollo → Capacitación), cada paso debe indicar duración aproximada y si tiene costo o es gratuito, igual que hace Iarvix. Esto es un cambio a incorporar en el contenido de esa sección.

5. **Prueba de capacidad vía trabajo propio**: dado que Kopfwerk todavía no tiene productos SaaS propios, este patrón se puede cubrir parcialmente integrando el **portfolio personal de Mauricio** (ya resguardado en `PORTFOLIO_BACKUP.md`) como evidencia de capacidad técnica real, mientras no existan casos de cliente de Kopfwerk todavía.

6. **Descripciones de portafolio ultra-específicas**: cuando se documenten los primeros clientes de Kopfwerk, cada caso debe tener una frase que diga exactamente qué se construyó (no genérico tipo "mejoramos su operación").

7. **CTA final con beneficio humano, no técnico**: evitar "agenda una demo/llamada" a secas; enmarcar el CTA final de la página en términos de lo que el cliente recupera (tiempo, claridad, control), coherente con el tono ya usado en el hero.

**Qué NO se traslada:** nombres de clientes de Iarvix, sus métricas específicas, el nombre de sus productos (Convocavoz, ReportArq), ni su copy exacto en ningún punto del sitio.

---

## SECCIÓN 4: Instrucciones de implementación — Home completa

**A Claude Code:** el HTML/CSS/JS que Mauricio compartió de la agencia Nexum (ver conversación) se usa como base técnica de animaciones e interacciones. Reutiliza sus mecánicas (fade-up con IntersectionObserver, navbar que se oculta al hacer scroll hacia abajo, sección de método con navegación sticky sincronizada al scroll, tarjetas de testimonios apiladas y deslizables con drag, botones "liquid glass" con el filtro SVG de turbulencia, shader WebGL de fondo animado en el hero). **Recolorea todo a la paleta de Kopfwerk** (tabla en la Sección de Identidad Visual de este documento, ningún púrpura/rosa) **y reescribe absolutamente todo el copy en tono propio de Kopfwerk** (nunca usar el texto de Nexum tal cual, ni sus nombres de cliente, ni sus métricas).

### 4.1 — Regla de texto global: eliminar el guion medio (en dash "–" o em dash "—") usado como separador

En el HTML de referencia aparecen frases con un guion en medio como separador, por ejemplo: "Matriz de esfuerzo-valor — oportunidades ordenadas por impacto". **Esto no se debe replicar.** En todo el copy del sitio de Kopfwerk, donde el patrón de referencia usaría ese guion medio como separador dentro de una frase, reemplázalo por un punto y seguido, una coma, o reestructura la frase en dos oraciones cortas. Aplica esta regla a cualquier texto que Claude Code redacte para: los "method-tags" de la sección de método, los subtítulos de servicios, y cualquier otro lugar del sitio con ese patrón.

(Nota: esto es distinto del guion bajo o guiones dentro de palabras compuestas, que sí se mantienen con normalidad.)

### 4.2 — Sección "Casos" / clientes: eliminar métricas agregadas, mover una métrica por tarjeta

- **Eliminar por completo** la fila de métricas agregadas tipo "+40% eficiencia / -60% tiempo / 3× capacidad" (el `.metrics-row` del HTML de referencia). Kopfwerk no tiene aún volumen de datos para presentar métricas agregadas creíbles.
- **Rediseñar las tarjetas de testimonios/clientes** (el componente de tarjetas apilables/deslizables): Claude Code debe diseñar una versión nueva y propia de esta tarjeta (no copiar el diseño exacto de Nexum) que incluya, en la parte inferior, **una sola métrica por cliente** (nunca 2-3, se ve apretado). Cada cliente tiene su propia métrica porque los resultados son distintos entre sí.
- **No incluir el nombre de la persona ni de la empresa como atribución visible** en la tarjeta (a diferencia de la referencia de Nexum, que sí pone "Nombre — Empresa"). En su lugar, la tarjeta muestra: el texto/descripción del trabajo realizado + la métrica destacada abajo.
- **Clientes reales disponibles ahora mismo (solo 2):**
  1. **MIC** (distribuidora de TV peruana): trabajo realizado — automatizaciones con n8n (integración CRM Odoo, pipeline de prospección con Clay.com), contenido para redes, rediseño de su sitio web.
  2. **AYORI** (marca de ropa deportiva, cliente Stefan Küffner): trabajo realizado — contenido de campaña generado con IA (Higgsfield), con flujo técnico establecido para colocación de logo y variantes de color.
  - **Métrica de ambas tarjetas: PLACEHOLDER inventado por ahora.** Mauricio reemplazará estos números por datos reales más adelante. Marcar claramente en el código con un comentario `{/* PLACEHOLDER — reemplazar con métrica real */}` junto a cada valor, para que no se quede como dato falso permanente por accidente.

### 4.3 — Eliminar sección de equipo

Eliminar por completo la sección "El equipo" / "Las personas detrás de [agencia]" del HTML de referencia. Kopfwerk es actualmente una sola persona (Mauricio), no tiene sentido esta sección todavía.

### 4.4 — Nueva sección: "Nuestros servicios" (reemplaza a la sección de equipo en el orden de la página)

En el lugar donde iba la sección de equipo, Claude Code debe **diseñar una sección nueva y propia** (alineada visualmente con el resto del sitio ya rediseñado: misma paleta, misma tipografía Objektiv, mismo lenguaje de tarjetas/espaciado) que presente los **tres servicios de Kopfwerk**:

1. **Apps y Webs** — servicio de entrada. Landing pages, webs completas, apps/dashboards simples, mantenimiento mensual.
2. **Automatizaciones** — el core del negocio, con retainer mensual como objetivo.
3. **Contenido IA** — foto/video generado con IA, vendido siempre en paquete o como upsell, nunca aislado.

El diseño de esta sección queda a criterio de Claude Code, pero debe sentirse coherente con el resto del sitio (no un bloque genérico de "3 cards con ícono" sin personalidad).

### 4.5 — Portafolio: NO incluir todavía

No agregar una sección de portafolio de proyectos de Kopfwerk en esta versión del sitio. Aún no hay volumen suficiente de casos de cliente propios de la agencia para justificar la sección (el portfolio personal de Mauricio, ya resguardado en `PORTFOLIO_BACKUP.md`, es un tema aparte y se integra en otra parte del sitio, no aquí).

---

## SECCIÓN 5: Segunda referencia (Nexum Business) — estructura ampliada orientada a servicio

Esta segunda página de Nexum es más específica de servicio (no solo "somos una agencia", sino "así se ve trabajar con nosotros, sección por sección"). Mauricio pidió darle **más peso a esta referencia** que a la anterior. Se adoptan su estructura, storytelling y animaciones, recoloreando todo y reescribiendo el copy.

### 5.1 — Secciones a adoptar (estructura + animación, copy 100% propio de Kopfwerk)

1. **Barra de anuncio superior** (opcional, delgada, arriba del navbar): mensaje corto tipo "Diagnóstico inicial sin costo".
2. **Hero v4 (layout dividido)**: texto a la izquierda (eyebrow con punto pulsante + H1 + subtítulo + 2 CTAs: uno primario y uno ghost "conocer el proceso" + trust bar), a la derecha una **ventana/mockup flotante estilo dashboard** con 2 "float badges" flotando (métricas destacadas), más una fila de 3 métricas grandes debajo del hero completo. **Las métricas de esta fila y de los float badges deben quedar como placeholder** (marcadas en código) hasta que Kopfwerk tenga datos reales, igual que se definió para las tarjetas de clientes.
3. **Sección "El problema" (Pain, antes/después)**: dos columnas, izquierda "hoy sin Kopfwerk" con lista de problemas (ícono X), derecha "con Kopfwerk" con lista de soluciones (ícono check), cerrando con una frase-transición destacada. Copy 100% original de Kopfwerk (no traducir el de Nexum).
4. **Servicios (services triad)**: exactamente 3 tarjetas, una por cada servicio real de Kopfwerk (Apps y Webs, Automatizaciones, Contenido IA), con ícono, número, descripción y tags. Esta sección reemplaza la de equipo, como ya se definió en la Sección 4.4 (usar este diseño de tarjeta como base visual para esa sección).
5. **Proceso (method, con conector visual entre pasos)**: usar el framework ya definido de Kopfwerk (Auditoría → Desarrollo → Capacitación/Acompañamiento), **3 pasos, no 4** (Kopfwerk no tiene un paso de "deploy" separado del desarrollo). Mantener el estilo visual de círculo numerado + línea conectora + tags de entregables por paso.
6. **Diferenciación (compare table "No somos / Somos")**: ya definida en la Sección 3.1, usar aquí el componente de tabla comparativa de esta segunda referencia como base visual.
7. **Sección "Sin equipo técnico"** (fondo claro, contraste de color): encaja perfecto con el público objetivo de Kopfwerk (PYMEs pequeñas sin equipo IT). Adaptar copy a "no tenés equipo técnico, nosotros lo resolvemos de punta a punta", coherente con el servicio de Apps/Webs + Automatizaciones + mantenimiento.
8. **Stack de herramientas (tools strip)**: fila de chips con las herramientas reales que usa Kopfwerk (n8n, Higgsfield, Claude, y las que correspondan según `/topics/tools.md` del proyecto). No inventar herramientas que no se usan.
9. **Casos/clientes**: ya definido en la Sección 4.2 (sin fila de stats agregadas, una métrica placeholder por tarjeta, sin nombre de persona/empresa visible, solo MIC y AYORI por ahora).
10. **FAQ (acordeón)**: adoptar el componente, pero redactar preguntas/respuestas 100% propias de Kopfwerk. **No mencionar FUNDAE** (es una bonificación española que no aplica a Kopfwerk en Alemania).
11. **CTA final**: adoptar estructura (título + beneficios en chips + botón + trust items), pero el botón apunta al formulario (ver 5.2), no a un link de llamada directa.
12. **Footer**: adoptar estructura de columnas (marca + navegación + contacto), sin las columnas de "Ecosistema" (Academy/Business) que no aplican a Kopfwerk.

### 5.2 — Cambio de mecanismo de contacto: formulario en vez de link de llamada directa

Mauricio prefiere **un formulario (tipo Tally.so)** antes de agendar una llamada directa (a diferencia de la referencia, que linkea directo a Cal.com). Flujo deseado:

1. El CTA principal ("Solicitar diagnóstico" o similar) abre/lleva a un **formulario** (Tally.so u otro servicio equivalente, pendiente de que Mauricio lo cree).
2. Una vez completado el formulario, el siguiente paso (agendar la llamada) se coordina internamente (por email/WhatsApp), no como un segundo paso automático en la web todavía.
3. **Hasta que exista el formulario real**, usar el `mailto:mauriciojaramillo146@gmail.com` como placeholder en todos los botones CTA que en la referencia apuntaban a Tally/Cal.com, marcado con comentario `{/* PLACEHOLDER — reemplazar con link de formulario Tally cuando esté creado */}`.

### 5.3 — Secciones a NO incluir todavía (faltan datos/contenido real)

- **Sección de demos en vivo con tabs** (la que muestra mini-interfaces por área: ventas, operaciones, atención, finanzas): requiere ejemplos reales de sistemas ya construidos por Kopfwerk. No inventar estos mockups con datos falsos de funcionalidad; omitir esta sección hasta tener 2-3 casos reales que mostrar así.
- **Sección "Apps" (coverflow 3D de productos propios)**: mismo motivo, sin productos propios de Kopfwerk todavía.
- **Sección "Sectores" con métricas por industria**: no inventar métricas de "-87% en distribución" etc. sin datos reales. Omitir hasta tener casos documentados por sector.
- **Sección "Áreas" (por departamento: ventas, operaciones, marketing...)**: opcional, evaluar si aporta valor para el público objetivo de Kopfwerk (PYMEs pequeñas donde no siempre hay departamentos separados) o si se reemplaza por algo más simple.
- **Sección "Formación"**: no aplica, Kopfwerk no ofrece formación como servicio (fue reemplazada por Apps/Webs en el pricing).
- **Calculadora de ROI/FUNDAE**: no aplica, es específica del mercado español y de un servicio que Kopfwerk no ofrece.

### 5.4 — Reutilización técnica confirmada (animaciones/interacciones)

Reutilizar de esta segunda referencia: el filtro SVG "liquid glass" para botones, el sistema de glassmorphism en tarjetas (fondo con gradiente sutil + backdrop-filter + sheen que sigue el cursor), el scroll-reveal progresivo con stagger por hermano, el "float badge" animado flotando cerca del mockup del hero, y el shuffle de tarjetas de testimonios con drag. Todo recoloreado a la paleta de Kopfwerk, sin JS ni CSS que dependa de contenido específico de Nexum (Tally IDs, dominios, etc.).
