# PORTFOLIO BACKUP — Mauricio Jaramillo
> Generado: 2026-09-03 | Snapshot completo del portfolio antes de la migración a Kopfwerk

---

## DATOS DEL PROPIETARIO

- **Nombre:** Mauricio Andres Jaramillo Sagastizabal
- **Email:** mauriciojaramillo146@gmail.com
- **Teléfono:** +49 157 50159428
- **Dirección:** Ritterstraße 28, 50354 Hürth, Deutschland
- **Profesión:** Kleinunternehmer – Webdesign & Webentwicklung
- **Handle social:** @kidealist_ / @kidealist
- **Copyright:** © 2026 Biteback

---

## STACK TÉCNICO

- **Framework:** Next.js 14.2.35 (App Router)
- **React:** 18
- **TypeScript:** 5
- **Tailwind CSS:** 3.4.1
- **Framer Motion:** 11.18.2
- **Lucide React:** 1.21.0
- **Deploy:** Vercel / Hostinger
- **Dominio suite:** suite.bitebackapp.de

---

## METADATA GLOBAL

```
Title: "Mauricio Jaramillo – Web Designer & Builder"
Description: "Web Designer & Builder. Ich entwickle moderne Websites und Online-Shops. Schnell, klar und auf den Punkt."
Language: de / de_DE
Icon: /favicon.png + /favicon.jpg
OG type: website
OG locale: de_DE
```

---

## FUENTES TIPOGRÁFICAS

- Bebas Neue (sans-serif, headings grandes)
- Dancing Script 700 (script, acentos cursivos)
- Inter 400/500/600/700/800 (cuerpo de texto)
- DM Serif Display (headers de tutoriales)
- DM Sans (cuerpo de tutoriales)

---

## ESTRUCTURA DE DIRECTORIOS

```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    datenschutz/page.tsx
    impressum/page.tsx
    tutorials/
      page.tsx
      token-efficient/page.tsx
      stop-slop/page.tsx
      claude-animation/page.tsx
      claude-code-schneiden/page.tsx
      clip-videos/page.tsx
      whatsapp-agentkit/page.tsx
      scraping-mit-claude/page.tsx
      cowork-meistern/page.tsx
      app-skalieren/page.tsx
      von-demo-zu-verkauf/page.tsx
      loops-claude-code/page.tsx
  components/
    Hero.tsx
    AnimationSection.tsx
    Services.tsx
    WebProjects.tsx
    ContentProjects.tsx
    DesignProjects.tsx
    Footer.tsx
public/
  favicon.png
  favicon.jpg
  images/
    header-photo.png
    header-photo.jpeg
    portfolio.png           ← imagen hero
    Logo-Mauricio.png       ← logo
    projects/
      websites/             ← 10 screenshots de proyectos web
      content/              ← imágenes AI content (3 marcas × 4)
      design/               ← 3 proyectos de diseño
  downloads/
    whatsapp-agentkit-main.zip
```

---

## SECCIÓN HERO (page.tsx / Hero.tsx)

- **Tipografía:** "ICH BIN MAURICIO" + "WEB DESIGNER & BUILDER" (Bebas Neue)
- **Navbar:** Logo + botón "Kontaktiere Mich" → #kontakt
- **Imagen hero:** /images/portfolio.png
- **Fondo:** radial-gradient azul al 50% 85%
- **Layout:** foto arriba en mobile, centrada en desktop

---

## SECCIÓN ANIMATION (AnimationSection.tsx)

- **Título:** "Ich unterstütze Unternehmen dabei:"
- **Palabras animadas por scroll (Framer Motion useScroll):**
  1. analysieren.
  2. gestalten.
  3. **entwickeln.** ← highlighted en azul
  4. umsetzen.
  5. optimieren.
  6. skalieren.
- **Altura sticky:** 700vh

---

## SECCIÓN SERVICES (Services.tsx)

**Título:** "DABEI KANN ICH HELFEN"

| # | Servicio | Descripción |
|---|----------|-------------|
| 01 | Websites | Custom Websites & Landing Pages, die Vertrauen aufbauen und Leads konvertieren. |
| 02 | Design & Markenauftritt | Deine Marke hat eine Geschichte. Ich gebe ihr ein Gesicht. |
| 03 | Digitales Marketing | Gefunden werden von den richtigen Menschen zur richtigen Zeit. |
| 04 | KI & Content Creation | Ich verwandle kreative Visionen in produktionsreife Visuals. |

---

## PROYECTOS WEB (WebProjects.tsx)

### Visibles inicialmente (4):

| ID | Título | Categoría | Descripción | URL |
|----|--------|-----------|-------------|-----|
| yoestudiosalud | YoEstudioSalud | Medizin-Onlineshop | E-Commerce für med. Instrumente für Studierende. Mehrsprachig & großer Produktkatalog. | https://yoestudiosalud.es |
| demetersroots | Demeters roots | Website für vegane Produkte | Corporate Website für Londoner Vegane-Produkte-Unternehmen. Individuelles Großbestellungsformular. | https://www.demetersroots.com |
| albertopla | AlbertoPla | Website für Fotojournalist | Fotografen-Website mit sozialen Reportagen weltweit. Projekte & internationale Arbeiten. | https://albertopla.com |
| germanya | Germanya Naturkosmetik | E-Commerce für Naturkosmetik | Shopify-Shop für Haarpflegemarke mit Lockenpflege-Fokus. SEO, automatisierte Bestellungen, E-Mail-Marketing. | https://www.germany-a.com |

### Ocultos bajo "Mehr anzeigen" (6):

| ID | Título | Categoría | Descripción | URL |
|----|--------|-----------|-------------|-----|
| amanirent | Amanirent | Website für Ferienvermietung | WordPress-Website für Ferienvermietung in Valencia. Klare Präsentation von Services & Immobilien. | https://amanirent.es |
| neurodiatermia | Neurodiatermia | Website für Physiotherapie-Methode | Physiotherapiepraxis mit Blog, Podcast, Fachpublikum-Infos. | https://neurodiatermia.com |
| whistler | Whistler Ski Experience | Tourismus-Website für Kanada | Corporate Website für Hotels, Winteraktivitäten & Reiseangebote. Skitourismus-Fokus. | https://new.whistlerskiexperience.com |
| barbaradeluxe | BarbaraDeluxe | Booking-Website für Kosmetikstudio | Website mit Termin- & Bezahlsystem. Online-Buchung & Zahlung. | https://barbaradeluxe.de |
| eilandelectronics | Eiland Electronics | Website für Sicherheits- & Elektroinstallationen | Corporate Website für Kameras, Alarm- & Elektroniksysteme. | https://eilandelectronics.com |
| ibacon | IBACON | Internationale Corporate Website | Corporate Website für biologische & chemische Studien. | https://new.ibacon.com |

**Interacción:** hover con scale + blur + badge "Öffnen", toggle "Mehr anzeigen / Weniger anzeigen"

---

## PROYECTOS AI CONTENT (ContentProjects.tsx)

3 marcas con galería modal (4 imágenes c/u):

### Vicinity
- **Cover:** `hf_20260315_183541_e3f27013-7f94-41ce-8267-2d045c4ea220.jpeg`
- **Gallery:**
  - `hf_20260315_184138_2d40a22c-1a7a-48e0-b59a-3ce18ba835a2.jpeg`
  - `hf_20260315_161716_50050ee7-325f-4473-9acc-d9fd0b9777b3.jpeg`
  - `hf_20260315_153703_602b7a96-6003-4b32-87f5-4b210b68186c.jpeg`

### New Balance
- **Cover:** `hf_20260316_134028_cac726a1-73ac-4433-9b86-5a2c49483f0d.jpeg`
- **Gallery:**
  - `hf_20260316_220115_8dde56fa-069a-4155-a328-1b3032156317.png`
  - `hf_20260316_214019_fa95f0f9-da6d-4d90-ac15-267ad3e27e61.jpeg`
  - `hf_20260317_141336_bcfead39-6f29-4886-af3a-afd7753b41e3.jpg`

### Azzaro
- **Cover:** `hf_20260316_081746_995ea43c-19ed-40ad-85a2-b7f009c40c25.jpeg`
- **Gallery:**
  - `hf_20260315_190512_cea28e6d-c9c1-4c03-9305-0286d0468c71.jpeg`
  - `hf_20260316_080434_96a3cdc1-3bd2-436d-8136-bf7d39607bd5.png`
  - `hf_20260317_142019_d7ed135e-a366-4e00-8d59-b428f4407704.jpg`

**Todos en:** `public/images/projects/content/`

---

## PROYECTOS DISEÑO (DesignProjects.tsx)

| ID | Título | Imagen | Fondo | Zoom |
|----|--------|--------|-------|------|
| blumengarten-konzert | Blumengarten Konzert Köln | blumengarten-konzert.jpg | #0d0d0d | sí |
| flowmate | Flowmate | flowmate.jpg | #d8ecec | sí |
| brent-faiyaz | Brent Faiyaz Poster | brent-faiyaz-poster.jpg | #111111 | no |

**Todos en:** `public/images/projects/design/`

---

## FOOTER (Footer.tsx)

- **Email:** mauriciojaramillo146@gmail.com
- **Teléfono:** +49 157 50159428
- **Logo:** /images/Logo-Mauricio.png (en círculo azul, invertido para fondo oscuro)
- **Links nav:** Home · Impressum · Datenschutz
- **Redes sociales:**
  - Instagram: https://www.instagram.com/kidealist_/
  - TikTok: https://www.tiktok.com/@kidealist
  - LinkedIn: https://www.linkedin.com/in/mauricio-jaramillo-4b214a2b7
  - Email: mailto:mauriciojaramillo146@gmail.com
- **Copyright:** © 2026 Biteback. All rights reserved.

---

## RUTAS DE ROUTING

```
/                               → Homepage
/tutorials                      → Listado de tutoriales
/tutorials/token-efficient
/tutorials/stop-slop
/tutorials/claude-animation
/tutorials/claude-code-schneiden
/tutorials/clip-videos
/tutorials/whatsapp-agentkit
/tutorials/scraping-mit-claude
/tutorials/cowork-meistern
/tutorials/app-skalieren
/tutorials/von-demo-zu-verkauf
/tutorials/loops-claude-code
/datenschutz
/impressum
```

---

## TUTORIALES — LISTADO COMPLETO

**URL:** /tutorials
**Subtítulo:** "Schritt-für-Schritt-Anleitungen für Claude Code, KI-Tools und Automatisierung — auf Deutsch, direkt anwendbar."
**Stats:** 10 Tutorials · 6 Anfänger · 4 Fortgeschrittener

| # | Slug | Título | Dificultad | Tags |
|---|------|--------|------------|------|
| 1 | token-efficient | Token Efficient — Die 8 Regeln für agentes Arbeiten mit Claude | Anfänger | #token-optimierung, #best-practices, #claude-code |
| 2 | stop-slop | Stop Slop — KI-Sprachmuster aus deutschen Texten entfernen | Anfänger | #ki-text, #claude-skill, #deutsch |
| 3 | claude-animation | KI-Animationen mit Claude Code — in 20 Minuten | Anfänger | #animationen, #remotion, #kein-vorwissen |
| 4 | claude-code-schneiden | Videos bearbeiten mit KI — Editor Pro Max | Anfänger | #video-editing, #remotion, #open-source |
| 5 | clip-videos | Automatische Clips aus YouTube-Videos mit Mosaic API | Anfänger | #youtube, #mosaic-api, #social-media |
| 6 | whatsapp-agentkit | WhatsApp AgentKit — dein eigener Chatbot in 30 Minuten | Anfänger | #whatsapp, #chatbot, #claude-code |
| 7 | scraping-mit-claude | ScrapeGraphAI: Web-Scraping direkt in Claude Code | Fortgeschrittener | #web-scraping, #scrapegraphai, #datenextraktion |
| 8 | cowork-meistern | Cowork meistern — Claudes Arbeitspartner auf deinem Desktop | Fortgeschrittener | #desktop-app, #cowork, #automation |
| 9 | app-skalieren | Deine App schafft 10 Nutzer. Und 1000? | Fortgeschrittener | #skalierung, #postgres, #load-testing |
| 10 | von-demo-zu-verkauf | Von Demo zu verkaufbar: Die 10 Schichten für deine KI-App | Fortgeschrittener | #production-ready, #security, #deployment |

---

## TUTORIAL DETAIL — Token Efficient

**Secciones:**
1. Das Problem — Tokens = Spielmünze metáfora. Solución: CLAUDE.md con 8 reglas. Stats: 8 reglas, 63% menos palabras, 30s instalación.
2. Die 8 Regeln:
   - Erst lesen, dann schreiben
   - Präzise aber gründlich
   - Bearbeiten, nicht neu schreiben
   - Nicht neu lesen, was schon gelesen wurde
   - Testen bevor "fertig" sagen
   - Kein Fülltext und keine Begrüßungen
   - Einfache und direkte Lösungen
   - Du entscheidest (user priority)
3. Die Zahlen: 63% total, 75% code reviews, 64% explicaciones, 16% savings reportados
4. Installation: curl `https://raw.githubusercontent.com/drona23/claude-token-efficient/main/CLAUDE.md`
5. Zusammenfassung: resumen de las 8 reglas

---

## TUTORIAL DETAIL — Stop Slop

**Concepto:** KI-Slop = patrones robóticos de texto IA. Ejemplos: "In der heutigen schnelllebigen Welt...", "Es ist wichtig zu betonen..."

**5 Dimensiones de evaluación:**
1. Direktheit — ¿Declaraciones o anuncios?
2. Rhythmus — ¿Variado o uniforme?
3. Vertrauen — ¿Respeta la inteligencia del lector?
4. Authentizität — ¿Suena humano?
5. Dichte — ¿Hay texto recortable?

**Instalación (3 opciones):**
- Claude Code terminal: `git clone https://github.com/Mauricio-BiteBack/Stop-Slop.git ~/.claude/skills/stop-slop-de`
- Claude.ai Projects: ZIP con SKILL.md + phrases.md + structures.md + examples.md
- Claude.ai Custom Instructions: pegar SKILL.md

**Uso:** "Überprüfe diesen Text auf KI-Muster und überarbeite ihn." / "Bewerte diesen Absatz..." / "Schreib das menschlicher — kein Slop."

**GitHub:** https://github.com/Mauricio-BiteBack/Stop-Slop (MIT)

---

## TUTORIAL DETAIL — KI-Animationen

**Stack:** Remotion + Node.js 20+ + Claude Code
**Instalación:**
1. `npx create-video@latest`
2. `cd mein-video-projekt`
3. `npx skills add remotion-dev/skills`
4. `claude`

**Prompts:**
1. Título animado (3s, negro, blanco)
2. Foto de perfil circular con fade-in (4s)
3. CTA "Kontaktiere mich heute" con URL (3s)

**Export:** MP4 1080x1920, 9:16, 30fps → ~/Desktop/animation_final.mp4

---

## TUTORIAL DETAIL — Clip Videos (Mosaic API)

- Input: YouTube URL
- Output: 5 clips TikTok (9:16 + subtítulos)
- Setup: Mosaic API key (una sola vez)

---

## TUTORIAL DETAIL — WhatsApp AgentKit

- Duración: < 30 minutos
- Claude Code escribe el código completo
- Descarga: `/downloads/whatsapp-agentkit-main.zip`
- GitHub referenciado en tutorial

---

## DATENSCHUTZ

- Última actualización: März 2026
- Hosting: Hostinger
- ✓ Keine Cookies · ✓ Kein Tracking · ✓ Kein Kontaktformular · ✓ Keine Datenweitergabe
- Sin Google Analytics
- Solo server-logs técnicos
- Links externos: Instagram, TikTok, LinkedIn
- Derechos DSGVO: Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch

---

## IMPRESSUM

- Nombre: Mauricio Andres Jaramillo Sagastizabal
- Dirección: Ritterstraße 28, 50354 Hürth, Deutschland
- Tel: +49 157 50159428
- Email: mauriciojaramillo146@gmail.com
- Profesión: Kleinunternehmer – Webdesign & Webentwicklung
- Steuer: § 19 UStG (sin IVA)
- Verantwortlich: § 55 Abs. 2 RStV

---

## PALETA DE COLORES (sistema actual del portfolio)

| Token | Uso |
|-------|-----|
| #000000 | Fondo principal |
| #ffffff | Texto principal |
| #2563EB | Acento azul |
| #3B82F6 | Hover azul |
| #111111–#333333 | Grises oscuros |
| #E6E6E4–#F7F7F5 | Grises claros (tutoriales) |
| #8B8B85 | Texto muted |

---

## LINKS EXTERNOS REFERENCIADOS

- Instagram: https://www.instagram.com/kidealist_/
- TikTok: https://www.tiktok.com/@kidealist
- LinkedIn: https://www.linkedin.com/in/mauricio-jaramillo-4b214a2b7
- GitHub Stop Slop: https://github.com/Mauricio-BiteBack/Stop-Slop
- GitHub Token Efficient: https://github.com/drona23/claude-token-efficient
- Remotion: https://remotion.dev
- Hostinger Privacy: https://www.hostinger.de/datenschutz

---

*Backup completo. Ningún archivo de imagen fue modificado. Todos los assets en /public/ permanecen intactos.*
