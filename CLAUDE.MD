# CLAUDE.md — suite.bitebackapp.de / Tutorials

## Reglas de trabajo
1. Lee la estructura del proyecto antes de tocar cualquier archivo.
2. Sé conciso en output, exhaustivo en razonamiento.
3. Edita archivos existentes en lugar de reescribirlos completos.
4. No releas archivos que ya leíste salvo que hayan cambiado.
5. Testea el código antes de declarar que terminaste.
6. Sin saludos, sin relleno, sin "¡Claro! ¡Excelente pregunta!".
7. Soluciones simples y directas.
8. Las instrucciones del usuario siempre tienen prioridad sobre este archivo.

---

## Contexto del proyecto

- **Dominio:** suite.bitebackapp.de
- **Framework:** Next.js (App Router)
- **Deploy:** Vercel
- **Idioma de los tutoriales:** Alemán
- **Propietario:** principiante en Vercel y vibe-coding — explicar pasos con claridad cuando sea necesario

---

## Regla crítica — Alcance de trabajo

> ⚠️ Este proyecto contiene un **portfolio** que NO tiene relación con los tutoriales.
> Claude Code **solo debe tocar archivos dentro de `/app/tutorials/`** (o la carpeta equivalente según la estructura real del proyecto).
> Nunca modificar layout raíz, globals.css, componentes compartidos del portfolio, ni ningún archivo fuera de la sección de tutoriales, salvo que el usuario lo pida explícitamente.

---

## Estructura de URLs

Todos los tutoriales siguen este patrón obligatorio:

```
suite.bitebackapp.de/tutorials/[slug]
```

Ejemplos:
- `/tutorials/token-efficient`
- `/tutorials/prompt-engineering`

La carpeta del archivo será siempre:
```
app/tutorials/[slug]/page.tsx
```

---

## Diseño — Sistema de colores (Tailwind)

Usar siempre estos valores exactos. No inventar colores nuevos.

| Token               | Valor hex   | Uso principal                        |
|---------------------|-------------|--------------------------------------|
| bg-[#F7F7F5]        | #F7F7F5     | Fondo general de página              |
| bg-white            | #FFFFFF     | Fondo de `<main>`                    |
| bg-[#FCFCFB]        | #FCFCFB     | Tarjetas / cajas de contenido        |
| bg-[#F0F0EE]        | #F0F0EE     | Bloques de código inline             |
| bg-[#171717]        | #171717     | Bloques de código grandes, números   |
| text-[#37352F]      | #37352F     | Texto principal                      |
| text-[#23211d]      | #23211d     | Títulos h1/h2                        |
| text-[#5B5851]      | #5B5851     | Texto secundario / descripciones     |
| text-[#4D4A44]      | #4D4A44     | Cuerpo de texto en secciones         |
| text-[#8B8B85]      | #8B8B85     | Labels, subtextos, placeholders      |
| text-[#6a665f]      | #6a665f     | Tabs de navegación inactivos         |
| border-[#E6E6E4]    | #E6E6E4     | Bordes de tarjetas                   |
| bg-[#EBEBEA]        | #EBEBEA     | Tab activo en navegación             |

Colores de estado (usar solo con sus clases de Tailwind):
- **Amber** (advertencia): `border-amber-200 bg-amber-50 text-amber-900`
- **Emerald** (éxito/stats): `border-emerald-200 bg-emerald-50 text-emerald-900`
- **Blue** (info/CTA): `border-blue-200 bg-blue-50 text-blue-900`

---

## Diseño — Layout base de cada tutorial

```tsx
<div className="min-h-screen bg-[#F7F7F5] text-[#37352F]">
  <main className="min-h-screen bg-white">
    <div className="mx-auto max-w-5xl px-4 pb-28 pt-8 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:py-12">

      {/* Breadcrumb - solo visible en desktop */}
      {/* Navegación de tabs - sticky scroll entre secciones */}
      {/* Header con h1 + subtítulo */}
      {/* Secciones de contenido */}

    </div>
  </main>

  {/* Barra de navegación fija en mobile (bottom bar) */}
</div>
```

---

## Diseño — Componentes recurrentes

### Label de sección
```tsx
<p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">
  01 nombre de sección
</p>
```

### H2 de sección
```tsx
<h2 className="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">
  Título
</h2>
```

### Tarjeta estándar
```tsx
<div className="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
  ...
</div>
```

### Número circular (para listas de reglas)
```tsx
<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#171717] text-sm font-bold text-white">
  1
</span>
```

### Bloque de código grande
```tsx
<div className="rounded-lg bg-[#171717] p-3">
  <pre className="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">
    {code}
  </pre>
</div>
```

### Código inline
```tsx
<code className="rounded bg-[#F0F0EE] px-1.5 py-0.5 text-xs">
  package.json
</code>
```

### Botón copiar
```tsx
<button
  type="button"
  onClick={() => navigator.clipboard.writeText(content)}
  className="inline-flex shrink-0 items-center gap-2 rounded-md border border-[#DFDFDC] bg-white px-3 py-1.5 text-xs font-medium text-[#37352F] transition-colors hover:bg-[#F1F1EE]"
>
  {/* Lucide <Copy /> icon h-3.5 w-3.5 */}
  Kopieren
</button>
```

---

## Diseño — Navegación de tabs

- En **desktop**: `grid grid-cols-N` (N = número de secciones)
- En **mobile**: scroll horizontal `overflow-x-auto`, `min-w-[145px]` por tab
- Tab activo: `bg-[#EBEBEA] font-semibold text-[#1f1e1a]`
- Tab inactivo: `text-[#66635D] hover:bg-[#EFEFED]`
- Cada tab hace scroll suave a su sección con `id` y `scroll-mt-24`

---

## Diseño — Mobile bottom bar

Barra fija al fondo en mobile (`sm:hidden`):
```tsx
<div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E6E6E4] bg-[#F7F7F5]/95 px-3 py-2 backdrop-blur sm:hidden">
  {/* Ícono home + tabs en scroll horizontal */}
</div>
```

---

## Iconos

Usar **Lucide React** exclusivamente. Ejemplos frecuentes:
- `<Copy />` — botón copiar
- `<ChevronRight />` — breadcrumb
- `<Heart className="text-red-500 animate-pulse" />` — favoritos
- `<File />`, `<FolderOpen />` — navegación

---

## Plantilla HTML de referencia

La siguiente es la estructura HTML completa de un tutorial ya publicado (`/tutorials/token-efficient`).
Úsala como referencia visual y estructural exacta para todos los tutoriales nuevos.

```html
<div class="min-h-screen bg-[#F7F7F5] text-[#37352F]">
  <main class="min-h-screen bg-white">
    <div class="mx-auto max-w-5xl px-4 pb-28 pt-8 sm:px-6 sm:pb-10 sm:pt-10 lg:px-10 lg:py-12">

      <!-- BREADCRUMB (solo desktop) -->
      <div class="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#8B8B85]">
        <a class="transition-colors hover:text-[#37352F]" href="/tutorials">tutoriales</a>
        <!-- ChevronRight icon -->
        <span class="font-medium text-[#37352F]">nombre del tutorial</span>
      </div>

      <!-- HEADER -->
      <header class="mb-8 sm:mb-10">
        <h1 class="text-3xl font-bold tracking-tight text-[#23211d] sm:text-5xl">
          Título principal
        </h1>
        <p class="mt-3 max-w-3xl text-base leading-7 text-[#5B5851] sm:text-lg sm:leading-8">
          Subtítulo descriptivo del tutorial.
        </p>
      </header>

      <!-- NAVEGACIÓN DE TABS -->
      <nav class="mb-8 flex gap-2 overflow-x-auto pb-2 sm:mb-10 sm:grid sm:grid-cols-5">
        <button type="button" class="min-w-[145px] rounded-md px-3 py-2 text-left text-sm sm:min-w-0 bg-[#EBEBEA] font-semibold text-[#1f1e1a]">
          <span class="mr-2 font-mono text-xs text-[#8B8B85]">01</span>Nombre Tab
        </button>
        <!-- más tabs... -->
      </nav>

      <!-- SECCIÓN TIPO -->
      <section id="seccion-id" class="scroll-mt-24">
        <p class="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8B8B85]">01 label</p>
        <h2 class="mb-4 text-3xl font-bold tracking-tight text-[#252420] sm:text-4xl">Título</h2>
        <div class="space-y-4 text-[15px] leading-7 text-[#4D4A44] sm:text-[16px]">

          <!-- Caja amber (advertencia/intro) -->
          <div class="rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
            <p class="font-semibold text-amber-900">🎮 Título caja</p>
            <p class="mt-2 text-amber-900">Contenido...</p>
          </div>

          <!-- Caja gris (info) -->
          <div class="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
            <p class="text-sm font-semibold text-[#8B8B85]">💡 Título</p>
            <p class="mt-1 text-[#4D4A44]">Contenido...</p>
          </div>

          <!-- Stats grid 3 columnas -->
          <div class="mt-4 grid grid-cols-3 gap-3 text-center">
            <div class="rounded-lg border border-[#E6E6E4] bg-[#FCFCFB] p-3">
              <p class="text-2xl font-bold text-[#23211d]">8</p>
              <p class="text-xs text-[#8B8B85]">Label stat</p>
            </div>
          </div>

          <!-- Tarjeta de regla con número -->
          <div class="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-4 sm:p-5">
            <div class="flex items-start gap-3">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#171717] text-sm font-bold text-white">1</span>
              <div class="min-w-0">
                <p class="font-semibold text-[#23211d]">Título regla</p>
                <p class="mt-1 text-sm text-[#5B5851]">Explicación...</p>
                <p class="mt-2 rounded-lg bg-[#F0F0EE] px-3 py-2 font-mono text-xs text-[#4D4A44]">
                  Código o regla técnica en inglés
                </p>
              </div>
            </div>
          </div>

          <!-- Stats grid 2 columnas (emerald) -->
          <div class="mt-4 grid gap-3 sm:grid-cols-2">
            <div class="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
              <p class="text-3xl font-bold text-emerald-900">63%</p>
              <p class="mt-1 text-sm font-medium text-emerald-800">Label</p>
              <p class="mt-1 text-xs text-emerald-700">Detalle</p>
            </div>
          </div>

          <!-- Bloque de código con botón copiar -->
          <div class="rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] p-5">
            <div class="mb-3 flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-[#2f2d27]">Título bloque</h3>
                <p class="mt-1 text-sm text-[#5f5b53]">Descripción</p>
              </div>
              <button type="button" class="inline-flex shrink-0 items-center gap-2 rounded-md border border-[#DFDFDC] bg-white px-3 py-1.5 text-xs font-medium text-[#37352F] transition-colors hover:bg-[#F1F1EE]">
                <!-- Copy icon -->
                Kopieren
              </button>
            </div>
            <div class="rounded-lg bg-[#171717] p-3">
              <pre class="max-h-[460px] overflow-auto whitespace-pre-wrap text-xs leading-6 text-zinc-100 sm:text-sm">
                Contenido del código
              </pre>
            </div>
          </div>

          <!-- Caja azul (CTA final) -->
          <div class="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 sm:p-5">
            <p class="font-semibold text-blue-900">Mensaje CTA principal</p>
            <p class="mt-2 text-sm text-blue-800">
              Texto adicional con <a href="#" class="font-medium underline hover:text-blue-900">enlace</a>
            </p>
          </div>

        </div>
      </section>

    </div>
  </main>

  <!-- MOBILE BOTTOM BAR -->
  <div class="fixed inset-x-0 bottom-0 z-40 border-t border-[#E6E6E4] bg-[#F7F7F5]/95 px-3 py-2 backdrop-blur sm:hidden">
    <div class="flex items-center gap-2">
      <a href="/tutorials" class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E6E6E4] bg-[#FCFCFB] text-lg shadow-sm">
        🏠
      </a>
      <div class="flex items-center gap-2 overflow-x-auto rounded-2xl border border-[#E6E6E4] p-1 shadow-sm w-full bg-white">
        <!-- Mismos tabs que el nav de arriba -->
      </div>
    </div>
  </div>

</div>
```

---

## Checklist antes de cada nuevo tutorial

- [ ] ¿El archivo está en `app/tutorials/[slug]/page.tsx`?
- [ ] ¿No se tocó ningún archivo fuera de `/tutorials/`?
- [ ] ¿Los colores son exactamente los del sistema de diseño?
- [ ] ¿Funciona el botón "Kopieren" con clipboard API?
- [ ] ¿La navegación de tabs hace scroll suave?
- [ ] ¿La mobile bottom bar está implementada?
- [ ] ¿El `<head>` tiene título, descripción y og:image correctos?
- [ ] ¿Se usó Lucide React para todos los iconos?

---

## Historial de tutoriales publicados

| Slug                | URL                                        | Estado     |
|---------------------|--------------------------------------------|------------|
| token-efficient     | /tutorials/token-efficient                 | ✅ Publicado |