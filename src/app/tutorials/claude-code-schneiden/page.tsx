"use client";


const tutorialStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  .tut-root {
    position: fixed;
    inset: 0;
    overflow-y: auto;
    background: #F5F4F0;
    color: #1C1B18;
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }

  .tut-root *, .tut-root *::before, .tut-root *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .tut-root {
    --bg: #F5F4F0;
    --surface: #FAFAF8;
    --border: #E2E0D8;
    --border-strong: #C8C5BC;
    --text: #1C1B18;
    --text-mid: #4A4840;
    --text-muted: #8A877E;
    --accent: #1C1B18;
    --amber-bg: #FEF9ED;
    --amber-border: #F0D98A;
    --amber-text: #7A5C00;
    --blue-bg: #EEF4FF;
    --blue-border: #B8CFFE;
    --blue-text: #1A3A7A;
    --green-bg: #EDFAF3;
    --green-border: #A8E6C3;
    --green-text: #1A5C38;
    --code-bg: #1A1A17;
    --code-text: #E8E5D8;
    --radius: 14px;
    --radius-sm: 8px;
  }

  .tut-page { max-width: 760px; margin: 0 auto; padding: 64px 24px 120px; }

  .tut-breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--text-muted); margin-bottom: 40px; }
  .tut-breadcrumb a { color: var(--text-muted); text-decoration: none; transition: color 0.15s; }
  .tut-breadcrumb a:hover { color: var(--text); }
  .tut-breadcrumb .sep { font-size: 11px; }
  .tut-breadcrumb .current { color: var(--text); font-weight: 500; }

  .tut-header { margin-bottom: 48px; }
  .tut-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 14px; }
  .tut-root h1 { font-family: 'DM Serif Display', serif; font-size: clamp(2.4rem, 6vw, 3.6rem); line-height: 1.1; letter-spacing: -0.02em; color: var(--text); margin-bottom: 18px; }
  .tut-root h1 em { font-style: italic; color: var(--text-mid); }
  .tut-subtitle { font-size: 17px; color: var(--text-mid); line-height: 1.65; max-width: 580px; font-weight: 300; }

  .tut-github-card { display: flex; align-items: center; justify-content: space-between; gap: 16px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 18px 20px; margin-bottom: 48px; flex-wrap: wrap; }
  .tut-github-card-left { display: flex; align-items: center; gap: 12px; }
  .tut-github-icon { width: 36px; height: 36px; background: var(--text); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .tut-github-icon svg { fill: white; width: 18px; height: 18px; }
  .tut-github-card-left p { font-size: 14px; color: var(--text-muted); margin-top: 2px; }
  .tut-github-card-left strong { font-size: 14px; font-weight: 500; color: var(--text); display: block; }

  .tut-btn { display: inline-flex; align-items: center; gap: 7px; padding: 9px 18px; border-radius: var(--radius-sm); font-size: 13px; font-weight: 500; text-decoration: none; transition: all 0.15s; white-space: nowrap; font-family: 'DM Sans', sans-serif; cursor: pointer; border: none; }
  .tut-btn-dark { background: var(--text); color: white; }
  .tut-btn-dark:hover { background: #333; }
  .tut-btn-outline { background: white; color: var(--text); border: 1px solid var(--border-strong); }
  .tut-btn-outline:hover { background: var(--bg); }
  .tut-btn-group { display: flex; gap: 8px; flex-wrap: wrap; }

  .tut-root section { margin-bottom: 56px; }
  .tut-section-label { font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px; }
  .tut-root h2 { font-family: 'DM Serif Display', serif; font-size: clamp(1.7rem, 4vw, 2.2rem); line-height: 1.2; letter-spacing: -0.015em; margin-bottom: 20px; }
  .tut-root h3 { font-size: 15px; font-weight: 500; color: var(--text); margin-bottom: 4px; }
  .tut-root p { color: var(--text-mid); font-size: 15px; line-height: 1.7; }

  .tut-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px 22px; }
  .tut-card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .tut-card-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .tut-card-sm { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 14px 16px; }
  .tut-card-sm h3 { font-size: 13px; }
  .tut-card-sm p { font-size: 12px; color: var(--text-muted); margin-top: 3px; }

  .tut-alert { border-radius: var(--radius); padding: 16px 20px; margin-top: 16px; }
  .tut-alert h3 { font-size: 14px; margin-bottom: 4px; }
  .tut-alert p { font-size: 14px; line-height: 1.6; }
  .tut-alert-amber { background: var(--amber-bg); border: 1px solid var(--amber-border); }
  .tut-alert-amber h3, .tut-alert-amber p { color: var(--amber-text); }
  .tut-alert-blue { background: var(--blue-bg); border: 1px solid var(--blue-border); }
  .tut-alert-blue h3, .tut-alert-blue p { color: var(--blue-text); }
  .tut-alert-green { background: var(--green-bg); border: 1px solid var(--green-border); }
  .tut-alert-green h3, .tut-alert-green p { color: var(--green-text); }

  .tut-steps { display: flex; flex-direction: column; gap: 12px; margin-top: 4px; }
  .tut-step { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px 22px; }
  .tut-step-header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
  .tut-step-num { font-family: 'DM Serif Display', serif; font-size: 11px; color: var(--text-muted); font-style: italic; }
  .tut-step h3 { font-size: 15px; font-weight: 500; }

  .tut-code-block { background: var(--code-bg); border-radius: var(--radius-sm); padding: 14px 16px; margin-top: 10px; overflow-x: auto; }
  .tut-code-block code { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 13px; color: var(--code-text); white-space: pre; display: block; line-height: 1.6; }

  .tut-copy-btn { display: inline-flex; align-items: center; gap: 6px; margin-top: 10px; padding: 6px 12px; background: white; border: 1px solid var(--border-strong); border-radius: 6px; font-size: 12px; font-weight: 500; color: var(--text); cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.15s; }
  .tut-copy-btn:hover { background: var(--bg); }
  .tut-copy-btn.copied { color: var(--green-text); border-color: var(--green-border); }

  .tut-prompt-box { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 22px 24px; }
  .tut-prompt-box + .tut-prompt-box { margin-top: 14px; }
  .tut-prompt-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 14px; }
  .tut-prompt-header h3 { font-size: 16px; }
  .tut-prompt-header p { font-size: 13px; color: var(--text-muted); margin-top: 3px; }
  .tut-prompt-pre { background: var(--code-bg); border-radius: var(--radius-sm); padding: 14px 16px; overflow-x: auto; }
  .tut-prompt-pre pre { font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--code-text); white-space: pre-wrap; line-height: 1.7; }

  .tut-cap-item { display: flex; gap: 14px; align-items: flex-start; }
  .tut-cap-icon { width: 32px; height: 32px; background: var(--bg); border: 1px solid var(--border); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
  .tut-cap-icon svg { width: 15px; height: 15px; stroke: var(--text-mid); }
  .tut-cap-item h3 { font-size: 14px; }
  .tut-cap-item p { font-size: 13px; margin-top: 2px; }
  .tut-cap-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }

  .tut-root hr { border: none; border-top: 1px solid var(--border); margin: 48px 0; }

  @media (max-width: 560px) {
    .tut-page { padding: 40px 18px 80px; }
    .tut-card-grid, .tut-card-grid-3, .tut-cap-grid { grid-template-columns: 1fr; }
    .tut-github-card { flex-direction: column; align-items: flex-start; }
    .tut-root h1 { font-size: 2.2rem; }
  }

  @keyframes tutFadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  .tut-page > * { animation: tutFadeUp 0.5s ease both; }
  .tut-page > *:nth-child(1) { animation-delay: 0s; }
  .tut-page > *:nth-child(2) { animation-delay: 0.06s; }
  .tut-page > *:nth-child(3) { animation-delay: 0.12s; }
  .tut-page > *:nth-child(4) { animation-delay: 0.18s; }
  .tut-page > *:nth-child(n+5) { animation-delay: 0.22s; }
`;

function CopyButton({ text, style }: { text: string; style?: React.CSSProperties }) {
  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add("copied");
      btn.innerHTML = `<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg> Kopiert!`;
      setTimeout(() => {
        btn.classList.remove("copied");
        btn.innerHTML = `<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> Kopieren`;
      }, 2000);
    });
  };

  return (
    <button className="tut-copy-btn" onClick={handleCopy} style={style}>
      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </svg>
      Kopieren
    </button>
  );
}

export default function TutorialPage() {
  return (
    <div className="tut-root">
      <style dangerouslySetInnerHTML={{ __html: tutorialStyles }} />
      <div className="tut-page">

        <nav className="tut-breadcrumb">
          <a href="/">Portfolio</a>
          <span className="sep">›</span>
          <span className="current">Editor Pro Max — Tutorial</span>
        </nav>

        <header className="tut-header">
          <p className="tut-eyebrow">Tutorial · KI-Tools</p>
          <h1>Videos bearbeiten<br />mit <em>KI</em> — so geht&apos;s.</h1>
          <p className="tut-subtitle">
            Editor Pro Max verwandelt Claude Code in ein vollständiges Videostudio. Du beschreibst auf Deutsch, was du willst — Claude baut es. Kein After Effects, kein monatliches Abo, alles läuft lokal auf deinem Rechner.
          </p>
        </header>

        <div className="tut-github-card">
          <div className="tut-github-card-left">
            <div className="tut-github-icon">
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
            </div>
            <div>
              <strong>Open-Source Projekt</strong>
              <p>Hainrixz / editor-pro-max — kostenlos auf GitHub</p>
            </div>
          </div>
          <div className="tut-btn-group">
            <a href="https://github.com/Hainrixz/editor-pro-max/archive/refs/heads/main.zip" className="tut-btn tut-btn-dark">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 15V3M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5" />
              </svg>
              ZIP herunterladen
            </a>
            <a href="https://github.com/Hainrixz/editor-pro-max" target="_blank" rel="noopener noreferrer" className="tut-btn tut-btn-outline">
              Auf GitHub ansehen
            </a>
          </div>
        </div>

        <section>
          <p className="tut-section-label">01 — Was ist das</p>
          <h2>Dein KI-Videostudio</h2>
          <div className="tut-card" style={{ marginBottom: 16 }}>
            <p>Stell dir vor, du sagst deinem Rechner einfach: <em>„Mach mir ein 30-Sekunden-Video für mein Produkt&quot;</em> — und er macht es. Genau das ist Editor Pro Max. Ein Open-Source-Tool, das Claude Code in ein vollständiges Videostudio verwandelt.</p>
          </div>
          <div className="tut-card-grid" style={{ gap: 12 }}>
            <div className="tut-card"><h3>Beschreiben</h3><p style={{ marginTop: 5 }}>Du sagst Claude, was du brauchst — auf Deutsch, wie mit einem echten Editor.</p></div>
            <div className="tut-card"><h3>Generieren</h3><p style={{ marginTop: 5 }}>Claude schreibt Remotion-Code mit Animationen, Text und Übergängen.</p></div>
            <div className="tut-card"><h3>Exportieren</h3><p style={{ marginTop: 5 }}>Du renderst ein professionelles MP4 — fertig für TikTok, YouTube oder Instagram.</p></div>
          </div>
          <div className="tut-alert tut-alert-blue" style={{ marginTop: 14 }}>
            <h3>Keine Vorkenntnisse nötig</h3>
            <p>Kein After Effects, keine Programmierkenntnisse, kein monatliches Abo. Was andere Apps dir in Rechnung stellen, machst du gratis auf deinem eigenen Rechner.</p>
          </div>
        </section>

        <section>
          <p className="tut-section-label">02 — Funktionen</p>
          <h2>Was es kann</h2>
          <div className="tut-card" style={{ marginBottom: 12 }}>
            <h3 style={{ marginBottom: 14, fontSize: 14, color: 'var(--text-muted)', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Videos von Grund auf erstellen</h3>
            <div className="tut-cap-grid">
              <div className="tut-cap-item">
                <div className="tut-cap-icon"><svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" /><rect x="2" y="6" width="14" height="12" rx="2" /></svg></div>
                <div><h3>TikToks & Reels</h3><p>Hochformat-Videos mit Animationen und CTAs — sofort publizierbar.</p></div>
              </div>
              <div className="tut-cap-item">
                <div className="tut-cap-icon"><svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2 3h20M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3m5 18 5-5 5 5" /></svg></div>
                <div><h3>Präsentationen</h3><p>Animierte Slides mit professionellen Übergängen für YouTube.</p></div>
              </div>
              <div className="tut-cap-item">
                <div className="tut-cap-icon"><svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg></div>
                <div><h3>Erklärvideos</h3><p>Lehrinhalt mit animierten Titeln, Icons und Erzählstruktur.</p></div>
              </div>
              <div className="tut-cap-item">
                <div className="tut-cap-icon"><svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 19v3M19 10v2a7 7 0 0 1-14 0v-2" /><rect x="9" y="2" width="6" height="13" rx="3" /></svg></div>
                <div><h3>Werbung & Testimonials</h3><p>Promo-Videos mit Speaker-Layout, Lower Thirds und Call-to-Action.</p></div>
              </div>
            </div>
          </div>
          <div className="tut-card">
            <h3 style={{ marginBottom: 14, fontSize: 14, color: 'var(--text-muted)', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Eigene Videos bearbeiten</h3>
            <div className="tut-cap-grid">
              <div className="tut-cap-item">
                <div className="tut-cap-icon"><svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="18" height="14" x="3" y="5" rx="2" /><path d="M7 15h4M15 15h2M7 11h2M13 11h4" /></svg></div>
                <div><h3>Automatische Untertitel</h3><p>Whisper.cpp transkribiert und synchronisiert — 5 visuelle Stile.</p></div>
              </div>
              <div className="tut-cap-item">
                <div className="tut-cap-icon"><svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" /><path d="M16 9a5 5 0 0 1 0 6M19.364 18.364a9 9 0 0 0 0-12.728" /></svg></div>
                <div><h3>Stille entfernen</h3><p>FFmpeg erkennt Pausen und schneidet sie automatisch raus.</p></div>
              </div>
              <div className="tut-cap-item">
                <div className="tut-cap-icon"><svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="6" cy="6" r="3" /><path d="M8.12 8.12 12 12M20 4 8.12 15.88" /><circle cx="6" cy="18" r="3" /><path d="M14.8 14.8 20 20" /></svg></div>
                <div><h3>Jump Cuts</h3><p>Extrahiert nur Sprachpassagen — ideal für Vlogs und Podcasts.</p></div>
              </div>
              <div className="tut-cap-item">
                <div className="tut-cap-icon"><svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21M5.082 11.09l8.828 8.828" /></svg></div>
                <div><h3>Hintergrund entfernen</h3><p>KI löscht den Hintergrund aus Bildern und Videos (ImgLy).</p></div>
              </div>
            </div>
          </div>
          <div className="tut-alert tut-alert-amber" style={{ marginTop: 12 }}>
            <h3>8 eingebaute KI-Skills</h3>
            <p>Das Repo kommt mit 8 voreingestellten Skills, die Claude Expertenwissen für Remotion, Motion Graphics, FFmpeg, Rendering und visuelle Recherche geben.</p>
          </div>
        </section>

        <section>
          <p className="tut-section-label">03 — Installation</p>
          <h2>So richtest du es ein</h2>
          <div className="tut-alert tut-alert-amber" style={{ marginBottom: 16 }}>
            <h3>Voraussetzungen</h3>
            <p>Du brauchst <strong>Claude Code</strong> (Terminal-Version) und <strong>Node.js 20+</strong>. FFmpeg und Whisper.cpp sind optional — für Untertitel und Stille-Erkennung.</p>
          </div>
          <div className="tut-steps">
            <div className="tut-step">
              <div className="tut-step-header"><span className="tut-step-num">01</span><h3>Repository klonen</h3></div>
              <div className="tut-code-block"><code>git clone https://github.com/Hainrixz/editor-pro-max.git</code></div>
              <CopyButton text="git clone https://github.com/Hainrixz/editor-pro-max.git" />
            </div>
            <div className="tut-step">
              <div className="tut-step-header"><span className="tut-step-num">02</span><h3>Abhängigkeiten installieren</h3></div>
              <div className="tut-code-block"><code>cd editor-pro-max && npm install</code></div>
              <CopyButton text="cd editor-pro-max && npm install" />
            </div>
            <div className="tut-step">
              <div className="tut-step-header"><span className="tut-step-num">03</span><h3>Claude Code starten</h3></div>
              <div className="tut-code-block"><code>claude</code></div>
              <CopyButton text="claude" />
            </div>
            <div className="tut-step">
              <div className="tut-step-header"><span className="tut-step-num">04</span><h3>Vorschau im Browser öffnen</h3></div>
              <div className="tut-code-block"><code>npm run dev</code></div>
              <CopyButton text="npm run dev" />
              <div className="tut-alert tut-alert-blue" style={{ marginTop: 12 }}>
                <p>Danach öffnest du <strong>http://localhost:3000</strong> im Browser. Du siehst das Remotion Studio, wo du deine Videos in Echtzeit vorschaust.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <p className="tut-section-label">04 — In der Praxis</p>
          <h2>Prompts zum Loslegen</h2>
          <p style={{ marginBottom: 20 }}>Diese Prompts kannst du direkt in Claude Code eingeben. Ersetze einfach, was in Klammern steht.</p>

          <div className="tut-prompt-box">
            <div className="tut-prompt-header">
              <div><h3>TikTok von Grund auf</h3><p>Vertikales Video mit Animationen, fertig zum Posten.</p></div>
              <CopyButton
                text={`Erstelle ein 30-Sekunden-TikTok für [mein Produkt/meine Dienstleistung].\nStil: modern und dynamisch. Animierter Produktname, 3 Vorteile\nmit Icons, abschließender Call-to-Action.\nFarben: [deine Markenfarben]. Format 9:16 für TikTok.`}
                style={{ flexShrink: 0 }}
              />
            </div>
            <div className="tut-prompt-pre">
              <pre>{`Erstelle ein 30-Sekunden-TikTok für [mein Produkt/meine Dienstleistung].
Stil: modern und dynamisch. Animierter Produktname, 3 Vorteile
mit Icons, abschließender Call-to-Action.
Farben: [deine Markenfarben]. Format 9:16 für TikTok.`}</pre>
            </div>
          </div>

          <div className="tut-prompt-box">
            <div className="tut-prompt-header">
              <div><h3>Untertitel zu eigenem Video</h3><p>Automatische Transkription und Untertitel mit eigenem Stil.</p></div>
              <CopyButton
                text={`Ich habe ein Video unter [pfad/zum/video.mp4].\nFüge automatische Untertitel hinzu.\nNutze das Preset „bold" für großen, kontrastreichen Text.\nTranskribiere das Audio mit Whisper und synchronisiere die Untertitel.`}
                style={{ flexShrink: 0 }}
              />
            </div>
            <div className="tut-prompt-pre">
              <pre>{`Ich habe ein Video unter [pfad/zum/video.mp4].
Füge automatische Untertitel hinzu.
Nutze das Preset „bold" für großen, kontrastreichen Text.
Transkribiere das Audio mit Whisper und synchronisiere die Untertitel.`}</pre>
            </div>
          </div>

          <div className="tut-prompt-box">
            <div className="tut-prompt-header">
              <div><h3>Video bereinigen</h3><p>Stille entfernen und Jump Cuts automatisch setzen.</p></div>
              <CopyButton
                text={`Ich habe ein langes Video unter [pfad/zum/video.mp4]. Ich brauche:\n1) Alle Stille-Pausen über 0,5 Sekunden entfernen.\n2) Automatische Jump Cuts — nur Sprachpassagen behalten.\n3) Als MP4 für YouTube (16:9) exportieren.`}
                style={{ flexShrink: 0 }}
              />
            </div>
            <div className="tut-prompt-pre">
              <pre>{`Ich habe ein langes Video unter [pfad/zum/video.mp4]. Ich brauche:
1) Alle Stille-Pausen über 0,5 Sekunden entfernen.
2) Automatische Jump Cuts — nur Sprachpassagen behalten.
3) Als MP4 für YouTube (16:9) exportieren.`}</pre>
            </div>
          </div>

          <div className="tut-alert tut-alert-green" style={{ marginTop: 16 }}>
            <h3>Einfach ausprobieren</h3>
            <p>Der beste Einstieg: klein anfangen, Vorschau anschauen, iterieren. Claude versteht natürliche Sprache — kein technisches Wissen nötig.</p>
          </div>
        </section>

        <section>
          <p className="tut-section-label">05 — Formate</p>
          <h2>Ein Video, alle Plattformen</h2>
          <div className="tut-card-grid-3">
            <div className="tut-card-sm"><h3>TikTok</h3><p>1080×1920 · 9:16 · 30fps</p></div>
            <div className="tut-card-sm"><h3>Instagram Reel</h3><p>1080×1920 · 9:16 · 30fps</p></div>
            <div className="tut-card-sm"><h3>YouTube Short</h3><p>1080×1920 · 9:16 · 60fps</p></div>
            <div className="tut-card-sm"><h3>YouTube</h3><p>1920×1080 · 16:9 · 30fps</p></div>
            <div className="tut-card-sm"><h3>LinkedIn</h3><p>1920×1080 · 16:9 · 30fps</p></div>
            <div className="tut-card-sm"><h3>Twitter / X</h3><p>1920×1080 · 16:9 · 30fps</p></div>
          </div>
          <div className="tut-alert tut-alert-blue" style={{ marginTop: 12 }}>
            <p>Sag Claude einfach, für welche Plattform das Video ist — Auflösung, Seitenverhältnis und Framerate werden automatisch gesetzt.</p>
          </div>
        </section>

        <hr />

        <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.5rem', marginBottom: 16, color: 'var(--text)' }}>Bereit loszulegen?</p>
          <div className="tut-btn-group" style={{ justifyContent: 'center' }}>
            <a href="https://github.com/Hainrixz/editor-pro-max/archive/refs/heads/main.zip" className="tut-btn tut-btn-dark">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 15V3M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5" />
              </svg>
              ZIP herunterladen
            </a>
            <a href="https://github.com/Hainrixz/editor-pro-max" target="_blank" rel="noopener noreferrer" className="tut-btn tut-btn-outline">
              Auf GitHub ansehen →
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
