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

  .tut-root hr { border: none; border-top: 1px solid var(--border); margin: 48px 0; }

  @media (max-width: 560px) {
    .tut-page { padding: 40px 18px 80px; }
    .tut-card-grid, .tut-card-grid-3 { grid-template-columns: 1fr; }
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

export default function TutorialClaudeAnimation() {
  return (
    <div className="tut-root">
      <style dangerouslySetInnerHTML={{ __html: tutorialStyles }} />
      <div className="tut-page">

        {/* Breadcrumb */}
        <nav className="tut-breadcrumb">
          <a href="/">Portfolio</a>
          <span className="sep">›</span>
          <a href="/tutorials/claude-code-schneiden">Tutorials</a>
          <span className="sep">›</span>
          <span className="current">KI-Animationen</span>
        </nav>

        {/* Header */}
        <header className="tut-header">
          <p className="tut-eyebrow">Tutorial · KI-Tools</p>
          <h1>KI-Animationen mit<br /><em>Claude Code</em></h1>
          <p className="tut-subtitle">
            Ich habe diese Animation in 20 Minuten gebaut, du auch. Claude Code setzt deine Anweisungen live in Sekunden um. Kein Vorwissen nötig.
          </p>
        </header>

        {/* Section 01 — Was du brauchst */}
        <section>
          <p className="tut-section-label">01 — Was du brauchst</p>
          <h2>Voraussetzungen</h2>

          <div className="tut-card-grid" style={{ marginBottom: 14 }}>
            <div className="tut-alert tut-alert-amber" style={{ marginTop: 0 }}>
              <h3>Du brauchst</h3>
              <p>
                Claude Code (Terminal)<br />
                Node.js 20+<br />
                Ein Remotion-Projekt (wird automatisch erstellt)
              </p>
            </div>
            <div className="tut-alert tut-alert-blue" style={{ marginTop: 0 }}>
              <p>
                Du brauchst keine Programmierkenntnisse. Du beschreibst, Claude baut.
                So einfach ist das.
              </p>
            </div>
          </div>
        </section>

        {/* Section 02 — Remotion Skill aktivieren */}
        <section>
          <p className="tut-section-label">02 — Der erste Schritt</p>
          <h2>Remotion Skill aktivieren</h2>
          <p style={{ marginBottom: 20 }}>
            Bevor du anfängst, installierst du den offiziellen Remotion AI Skill.
            Damit versteht Claude sofort die Projektstruktur und arbeitet
            sauber mit den Dateien. Ohne Fehler, ohne Chaos.
          </p>

          <div className="tut-steps">
            <div className="tut-step">
              <div className="tut-step-header">
                <span className="tut-step-num">01</span>
                <h3>Neues Remotion-Projekt erstellen</h3>
              </div>
              <div className="tut-code-block"><code>npx create-video@latest</code></div>
              <CopyButton text="npx create-video@latest" />
            </div>

            <div className="tut-step">
              <div className="tut-step-header">
                <span className="tut-step-num">02</span>
                <h3>In den Projektordner wechseln</h3>
              </div>
              <div className="tut-code-block"><code>cd mein-video-projekt</code></div>
              <CopyButton text="cd mein-video-projekt" />
            </div>

            <div className="tut-step">
              <div className="tut-step-header">
                <span className="tut-step-num">03</span>
                <h3>Remotion Skill installieren</h3>
              </div>
              <div className="tut-code-block"><code>npx skills add remotion-dev/skills</code></div>
              <CopyButton text="npx skills add remotion-dev/skills" />
            </div>

            <div className="tut-step">
              <div className="tut-step-header">
                <span className="tut-step-num">04</span>
                <h3>Claude Code starten</h3>
              </div>
              <div className="tut-code-block"><code>claude</code></div>
              <CopyButton text="claude" />
            </div>
          </div>

          <div className="tut-alert tut-alert-green">
            <h3>Skill aktiv</h3>
            <p>
              Der Skill ist jetzt aktiv. Claude kennt jetzt die komplette
              Remotion-Struktur und macht keine typischen Anfängerfehler mehr.
            </p>
          </div>
        </section>

        {/* Section 03 — Deine erste Animation */}
        <section>
          <p className="tut-section-label">03 — Deine erste Animation</p>
          <h2>Prompts zum Loslegen</h2>
          <p style={{ marginBottom: 20 }}>
            Jetzt kommt der spaßige Teil. Du gibst Claude klare Anweisungen,
            Schritt für Schritt, und siehst das Ergebnis live im Browser.
          </p>

          <div className="tut-card" style={{ marginBottom: 16 }}>
            <p style={{ marginBottom: 10 }}>Starte zuerst die Vorschau im Browser:</p>
            <div className="tut-code-block"><code>npm run dev</code></div>
            <CopyButton text="npm run dev" />
            <div className="tut-alert tut-alert-blue" style={{ marginTop: 12 }}>
              <p>Öffne anschließend <strong>http://localhost:3000</strong> im Browser. Du siehst deine Animation in Echtzeit.</p>
            </div>
          </div>

          <div className="tut-prompt-box">
            <div className="tut-prompt-header">
              <div>
                <h3>Prompt 1 — Animierter Titel</h3>
                <p>Erste Szene mit Einfahrt-Animation von unten.</p>
              </div>
              <CopyButton
                text={`Erstelle eine erste Szene mit einem animierten Titel der von unten \nreinfährt. Schwarzer Hintergrund, weißer Text, schlicht und premium.\nDauer: 3 Sekunden.`}
                style={{ flexShrink: 0 }}
              />
            </div>
            <div className="tut-prompt-pre">
              <pre>{`Erstelle eine erste Szene mit einem animierten Titel der von unten
reinfährt. Schwarzer Hintergrund, weißer Text, schlicht und premium.
Dauer: 3 Sekunden.`}</pre>
            </div>
          </div>

          <div className="tut-prompt-box">
            <div className="tut-prompt-header">
              <div>
                <h3>Prompt 2 — Profilbild</h3>
                <p>Zweite Szene mit kreisförmigem Einblend-Effekt.</p>
              </div>
              <CopyButton
                text={`Füge eine zweite Szene hinzu. Mein Profilbild liegt unter \n[pfad/zum/bild.jpg]. Zeige es kreisförmig zugeschnitten, \nzentriert mit einem subtilen Einblend-Effekt. Dauer: 4 Sekunden.`}
                style={{ flexShrink: 0 }}
              />
            </div>
            <div className="tut-prompt-pre">
              <pre>{`Füge eine zweite Szene hinzu. Mein Profilbild liegt unter
[pfad/zum/bild.jpg]. Zeige es kreisförmig zugeschnitten,
zentriert mit einem subtilen Einblend-Effekt. Dauer: 4 Sekunden.`}</pre>
            </div>
          </div>

          <div className="tut-prompt-box">
            <div className="tut-prompt-header">
              <div>
                <h3>Prompt 3 — CTA-Szene</h3>
                <p>Abschließende Call-to-Action mit Button-Animation.</p>
              </div>
              <CopyButton
                text={`Erstelle eine abschließende CTA-Szene mit dem Text \n"Kontaktiere mich heute" als Button-Animation und meiner URL \n[deine-url.de] darunter. Fade-in von unten. Dauer: 3 Sekunden.`}
                style={{ flexShrink: 0 }}
              />
            </div>
            <div className="tut-prompt-pre">
              <pre>{`Erstelle eine abschließende CTA-Szene mit dem Text
"Kontaktiere mich heute" als Button-Animation und meiner URL
[deine-url.de] darunter. Fade-in von unten. Dauer: 3 Sekunden.`}</pre>
            </div>
          </div>

          <div className="tut-alert tut-alert-blue">
            <p>
              Schau dir das Preview im Browser an. Wenn dir etwas nicht gefällt,
              beschreibe es einfach. Claude passt es sofort an.
            </p>
          </div>
        </section>

        {/* Section 04 — Audio hinzufügen */}
        <section>
          <p className="tut-section-label">04 — Audio hinzufügen</p>
          <h2>Ton für deine Animation</h2>
          <p style={{ marginBottom: 20 }}>
            Deine Animation ist fertig, jetzt kommt der Ton.
            Du hast zwei Möglichkeiten.
          </p>

          <div className="tut-card-grid">
            <div className="tut-card">
              <h3 style={{ marginBottom: 8 }}>Eigene Musik</h3>
              <p style={{ marginBottom: 14 }}>
                Du hast eine MP3 oder MP4-Datei? Zieh sie in den Projektordner
                und sag Claude einfach:
              </p>
              <div className="tut-prompt-pre">
                <pre>{`Füge diese Audiodatei als Hintergrundmusik hinzu:
[pfad/zur/audio.mp3]
Die Musik soll mit dem Video starten und sanft ausblenden.`}</pre>
              </div>
              <CopyButton text={`Füge diese Audiodatei als Hintergrundmusik hinzu: \n[pfad/zur/audio.mp3]\nDie Musik soll mit dem Video starten und sanft ausblenden.`} />
            </div>
            <div className="tut-card">
              <h3 style={{ marginBottom: 8 }}>Musik generieren lassen</h3>
              <p>
                Kein Audio? Claude kann über FFmpeg eine Hintergrundatmosphäre
                einbauen oder du nutzt einen kostenlosen Track von pixabay.com
              </p>
            </div>
          </div>
        </section>

        {/* Section 05 — Exportieren */}
        <section>
          <p className="tut-section-label">05 — Exportieren</p>
          <h2>Video fertigstellen</h2>
          <p style={{ marginBottom: 20 }}>
            Wenn alles passt, sagst du Claude:
          </p>

          <div className="tut-prompt-box">
            <div className="tut-prompt-header">
              <div>
                <h3>Export-Befehl</h3>
                <p>MP4 in 1080×1920 für Instagram und TikTok.</p>
              </div>
              <CopyButton
                text={`Exportiere das Video als MP4 in 1080x1920 für Instagram \nund TikTok (9:16, 30fps). Speichere es unter ~/Desktop/animation_final.mp4`}
                style={{ flexShrink: 0 }}
              />
            </div>
            <div className="tut-prompt-pre">
              <pre>{`Exportiere das Video als MP4 in 1080x1920 für Instagram
und TikTok (9:16, 30fps). Speichere es unter ~/Desktop/animation_final.mp4`}</pre>
            </div>
          </div>

          <div className="tut-alert tut-alert-green">
            <h3>Fertig!</h3>
            <p>
              Das war&apos;s. Du hast gerade eine professionelle KI-Animation gebaut
              in unter 20 Minuten.
            </p>
          </div>
        </section>

        <hr />

        {/* Footer CTA */}
        <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.5rem', marginBottom: 16, color: 'var(--text)' }}>
            Bereit loszulegen?
          </p>
          <div className="tut-btn-group" style={{ justifyContent: 'center' }}>
            <a href="https://remotion.dev" target="_blank" rel="noopener noreferrer" className="tut-btn tut-btn-dark">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
              </svg>
              Remotion Docs
            </a>
            <a href="/tutorials/claude-code-schneiden" className="tut-btn tut-btn-outline">
              Zurück zur Übersicht →
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
