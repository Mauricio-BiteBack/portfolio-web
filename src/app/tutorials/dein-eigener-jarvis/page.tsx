import React from 'react';

const DeinEigenerJarvis: React.FC = () => {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', maxWidth: '860px', margin: '0 auto', padding: '2rem 1.5rem', color: '#1a1a1a', lineHeight: '1.6' }}>

      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6b7280', marginBottom: '0.75rem' }}>BauMitMau · Community Guide · Verifiziert August 2026</div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', lineHeight: '1.15', margin: '0 0 1rem', letterSpacing: '-0.02em' }}>Dein eigener JARVIS</h1>
        <p style={{ fontSize: '1.1rem', color: '#4b5563', maxWidth: '640px', margin: 0 }}>Fünf Schichten. Deine Notizen. Ein Agent, der ohne dich weiterarbeitet.</p>
      </div>

      {/* Key fact box */}
      <div style={{ background: '#fef3c7', border: '2px solid #f59e0b', borderRadius: '12px', padding: '1.25rem 1.5rem', marginBottom: '3rem' }}>
        <p style={{ margin: 0, fontWeight: '600', fontSize: '0.95rem' }}>Das Wichtigste zuerst: Eine Cloud-Task sieht deine lokalen Dateien nicht. Sie braucht ein geklontes Repo. Wenn dein zweites Gehirn mit zugeklapptem Laptop weiterlaufen soll, muss es ein privates GitHub-Repo sein, und deine Skills müssen drin sein.</p>
      </div>

      {/* Table of Contents */}
      <div style={{ marginBottom: '3.5rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280', marginBottom: '1.5rem' }}>Die 15 Stationen · Auf einen Blick</h2>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {[
            ['01', 'So nutzt du diese Seite', 'Was du baust, welcher der drei Wege deiner ist'],
            ['02', 'Das Skelett', 'Die fünf Schichten eines persönlichen Agenten'],
            ['03', 'Die Einstiegsentscheidung', 'Brauchst du wirklich Obsidian?'],
            ['04', 'Der Start', 'Vom Terminal-Öffnen bis zur ersten Claude Code Antwort'],
            ['05', 'Die Ordner', 'Nach Typ sortieren, nicht nach Thema'],
            ['06', 'Schicht 1 · Gedächtnis', 'Die drei Speicher, die gern verwechselt werden'],
            ['07', 'Schicht 2 · Fähigkeiten', 'Die vier Skills im Format, das wirklich lädt'],
            ['08', 'Schicht 3 · Team', 'Drei Subagenten mit eigenem Gedächtnis'],
            ['09', 'Schicht 4 · Sinne', 'Was außerhalb des Vaults erreichbar ist'],
            ['10', 'Schicht 5 · Herzschlag', 'Weiterarbeiten bei zugeklapptem Laptop'],
            ['11', 'Die Reflexe', 'Was auslöst, egal was Claude denkt'],
            ['12', 'Der Rhythmus', 'Zwanzig Minuten täglich, dreißig am Sonntag'],
            ['13', 'Der Schritt, den niemand dokumentiert', 'Deine Notizen werden zu deinen Skills'],
            ['14', 'Die Killer', 'Zehn Fehler: fünf im Verhalten, fünf mechanisch'],
            ['15', 'Mach es zu deinem', 'Dasselbe Skelett, eine andere Domäne'],
          ].map(([num, title, sub]) => (
            <div key={num} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '0.75rem 1rem', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <span style={{ fontWeight: '800', fontSize: '0.85rem', color: '#9ca3af', minWidth: '28px', paddingTop: '2px' }}>{num}</span>
              <div>
                <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{title}</div>
                <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '2px' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature tags */}
      <div style={{ marginBottom: '3.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {['5 Schichten', 'Obsidian optional', 'Abo · kein API-Key', '14 Sektionen', 'Skills im offiziellen Format', 'Subagenten mit eigenem Gedächtnis', 'Hooks', 'Geplante Tasks', 'Läuft mit zugeklapptem Laptop', 'Skelett für jeden Agenten nutzbar', 'Kein Code', 'Gegen offizielle Docs verifiziert'].map(tag => (
            <span key={tag} style={{ background: '#e0f2fe', color: '#0369a1', padding: '0.3rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '600' }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Section: So nutzt du diese Seite */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.5rem' }}>Station 01</div>
        <h2 style={{ fontSize: '1.6rem', fontWeight: '800', margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>So nutzt du diese Seite</h2>
        <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: '0 0 1.5rem' }}>Was du baust, welcher der drei Wege deiner ist, und was in anderen Guides bleibt</p>

        <p style={{ marginBottom: '1rem' }}>Diese Seite baut dir einen persönlichen Agenten auf Basis deiner Notizen. Von Anfang bis Ende. Kein Trick-Sammelsurium: ein System mit fünf Schichten, die du eine nach der anderen aufbaust. Jede Station lässt eine Schicht laufen, bevor es weitergeht.</p>
        <p style={{ marginBottom: '1.5rem' }}>Drei Dinge solltest du kennen, bevor du irgendetwas anfasst: Was steht am Ende da? Welcher der drei Wege gehört zu dir? Und was erklärt diese Seite nicht nochmal, weil es woanders vollständig lebt? Alle drei passen hier rein.</p>

        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '2rem 0 1rem' }}>Was am Ende da steht</h3>
        <p style={{ marginBottom: '1rem' }}>Am Ende läuft ein persönlicher Agent auf deinen Notizen. Keine sortierte Ordnerstruktur mit Claude Code daneben: ein System, das beim Start schon weiß, wer du bist. Es lädt seine Fähigkeiten nur dann, wenn es sie braucht. Es delegiert das Schwere an ein Team. Es löst Reflexe aus, die nicht davon abhängen, dass es versteht. Und es wacht zur eingestellten Zeit von selbst auf.</p>

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
          {[
            ['1', 'Ein Ordner, den Claude auswendig kennt', 'Deine Notizen als Textdateien auf der Festplatte. In der Wurzel des Ordners liegt eine CLAUDE.md, die Claude Code bei jeder Sitzung liest: was du speicherst, wie du es benennst, wie du angesprochen werden willst. Du musst dein System nicht mehr erklären, jedes Mal wenn du das Terminal öffnest.'],
            ['2', 'Vier Fähigkeiten, die sich selbst auslösen', 'Posteingang verarbeiten, Verbindungen suchen, ein Brief zusammenbauen, in deiner Stimme schreiben. Jede in ihrem eigenen Unterordner im Vault. Claude lädt sie, wenn das, was du gefragt hast, zur Beschreibung passt, nicht wenn du daran denkst, sie aufzurufen.'],
            ['3', 'Drei Subagenten mit eigenem Gedächtnis', 'Der Archivar, der Weber und der Schreiber. Jeder arbeitet in seinem eigenen Kontextfenster und speichert, was er lernt, in seinem eigenen Ordner. Was er über deine Notizen herausfindet, ist nächste Woche noch da.'],
            ['4', 'Reflexe, die ohne Erlaubnis auslösen', 'Befehle, die beim Öffnen der Sitzung laufen, beim Schließen, und jedes Mal wenn eine Notiz geschrieben wird. Ein Reflex läuft immer. Eine Anweisung in einer Datei sagt bitte. Dieser Unterschied ist die ganze Schicht.'],
            ['5', 'Eine geplante Task, die ohne dich arbeitet', 'Sonntag früh liest dein Agent die Woche, sucht Verbindungen und legt die Briefs fertig geschrieben hin. In der Cloud macht er das bei zugeklapptem Laptop. Auf deiner Maschine, solange sie läuft.'],
          ].map(([num, title, desc]) => (
            <div key={num} style={{ display: 'flex', gap: '1.25rem', padding: '1.25rem', background: '#f9fafb', borderRadius: '10px', border: '1px solid #e5e7eb' }}>
              <div style={{ width: '36px', height: '36px', background: '#1a1a1a', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.9rem', flexShrink: 0 }}>{num}</div>
              <div>
                <div style={{ fontWeight: '700', marginBottom: '0.4rem' }}>{title}</div>
                <div style={{ fontSize: '0.9rem', color: '#4b5563' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#f3f4f6', borderRadius: '10px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h4 style={{ fontWeight: '800', fontSize: '1rem', margin: '0 0 1rem' }}>Was es kostet</h4>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              ['Montagezeit', 'Ein Wochenende, wenn du am Stück durchmachst. Schichtweise geht auch: jede Station lässt etwas laufen, du kannst eine Woche pausieren ohne Verlust.'],
              ['Reihenfolge', 'Gedächtnis zuerst, Herzschlag zuletzt. Etwas automatisieren, das zu Fuß noch nicht klappt, wiederholt den Fehler nur schneller, und zwar ohne dich dabei.'],
              ['Womit es läuft', 'Mit deinem Claude Pro oder Max Abo. Kein API-Key, keine zweite Kreditkarte.'],
              ['Wie viel Code du schreibst', 'Keinen. An den wenigen Stellen, wo das System eine Config-Datei braucht, kopierst du einen deutschen Prompt und Claude Code schreibt die Datei für dich.'],
            ].map(([label, text]) => (
              <div key={label} style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ fontWeight: '700', fontSize: '0.85rem', minWidth: '120px', color: '#374151' }}>{label}</span>
                <span style={{ fontSize: '0.9rem', color: '#4b5563' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '2rem 0 1rem' }}>Die drei Wege</h3>
        <p style={{ marginBottom: '1rem' }}>Das Gehirn dieses Systems sind Textdateien auf deiner Festplatte. Was sich zwischen den Wegen unterscheidet, ist was du drüberlegst. Die Entscheidung triffst du einmal.</p>

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
          {[
            ['A', 'Ein Markdown-Ordner, sonst nichts', '.md-Dateien auf der Festplatte, keine App drüber. Am schnellsten aufgesetzt, und alle fünf Schichten laufen damit.'],
            ['B', 'Obsidian über denselben Ordner', 'Derselbe Ordner, mit einem Fenster, das dir Links zwischen Notizen zeigt, Schnellsuche gibt und Erfassen vom Handy erlaubt. Obsidian ist die Ansicht, nicht das Gehirn.'],
            ['C', 'claude-mem · Sitzungsgedächtnis', 'Die Erfassung überlässt du Claude, basierend auf dem, was in jeder Sitzung passiert ist. Kein Ersatz für die anderen zwei: es speichert, was Claude gemacht hat, nicht was du denkst.'],
          ].map(([letter, title, desc]) => (
            <div key={letter} style={{ display: 'flex', gap: '1.25rem', padding: '1.25rem', background: '#fff', borderRadius: '10px', border: '2px solid #e5e7eb' }}>
              <div style={{ width: '40px', height: '40px', background: '#f0fdf4', border: '2px solid #22c55e', color: '#15803d', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1rem', flexShrink: 0 }}>{letter}</div>
              <div>
                <div style={{ fontWeight: '700', marginBottom: '0.4rem' }}>{title}</div>
                <div style={{ fontSize: '0.9rem', color: '#4b5563' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', margin: '2rem 0 1rem' }}>Was in anderen Guides bleibt</h3>
        <p style={{ marginBottom: '1rem' }}>Der Vault hat bereits vollständige Guides zu fast allem, was hier verwendet wird. Diese Seite wiederholt sie nicht, sie benutzt sie. Die Tabelle zeigt auf einen Blick, welches Thema wo lebt, damit du nicht vierzig Minuten suchst.</p>

        <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: '#f3f4f6' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '700', border: '1px solid #e5e7eb' }}>Wenn du suchst</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '700', border: '1px solid #e5e7eb' }}>Lebt in</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '700', border: '1px solid #e5e7eb' }}>Hier nur</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Eine geplante Task von A bis Z betreiben', '10 Automatisierungen mit Claude', 'Was mit einem Vault passiert, wenn die Task in der Cloud läuft und deine Dateien nicht sieht.'],
                ['Den /schedule-Befehl und Cloud-Agenten von innen', 'Schedule · Agenten in der Cloud', 'Die drei Uhren in einer Tabelle verglichen, um zu entscheiden, welche deinen Agenten weckt.'],
                ['Einen Konnektor Schritt für Schritt einschalten', 'Claude Konnektoren', 'Welche für einen persönlichen Agenten taugen, und was deine Maschine verlässt, wenn du sie einschaltest.'],
                ['claude-mem und MemPalace von innen, mit Installation', 'Unendliches Gedächtnis für Claude Code', 'Einen Absatz. Es ist Weg C und nichts weiter.'],
                ['Die allgemeine Methode für Ordnerstruktur und Namensgebung', 'Ordner- und Dateistruktur für Claude', 'Die neun Ordner dieses konkreten Falls, fertig benannt, in der Skelett-Station.'],
                ['Welches Teil du bauen sollst: Skill, Subagent, Hook oder MCP-Server', 'Claude Anatomy', 'Wie man eine einzige Sache mit allen fünf Schichten gleichzeitig aufbaut.'],
                ['Das Handwerk, eine Skill von Grund auf zu schreiben', 'Skill Creator · Global oder pro Projekt', 'Die vier Fähigkeiten dieses Guides zum Laufen bringen, und etwas, das du schon wiederholst, in eine Skill verwandeln.'],
                ['Heerscharen von Subagenten parallel am Laufen', 'Dynamische Workflows', 'Das Gegenteil: drei feste Subagenten, wenige, mit eigenem Gedächtnis zwischen Sitzungen.'],
                ['Das gemeinsame Notizbuch eines Agenten-Teams', 'Memory Palace · Agenten', 'Das Gedächtnis eines persönlichen Agenten, nicht das eines Teams das sich gegenseitig überschreibt.'],
                ['Eine Flotte 24/7 auf einer dedizierten Maschine', 'Agenten-Ökosystem', 'Ein einziger Agent, dein Abo, der Computer den du schon hast.'],
              ].map(([search, lives, here], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f9fafb' }}>
                  <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb', fontWeight: '600' }}>{search}</td>
                  <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb', color: '#0369a1' }}>{lives}</td>
                  <td style={{ padding: '0.75rem', border: '1px solid #e5e7eb', color: '#4b5563' }}>{here}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ marginBottom: '1rem' }}>Zwei davon lohnt es sich griffbereit zu haben, während du diese Seite liest. Wenn du heute etwas automatisch laufen lassen willst und den Vault noch nicht aufgebaut hast: fang mit den 10 Automatisierungen mit Claude an. Dort läuft eine geplante Task von A bis Z, hier wird das vorausgesetzt.</p>
        <p style={{ marginBottom: '1rem' }}>Die allgemeine Ordner-Methode und die Namenskonvention lebt komplett in der Ordner- und Dateistruktur für Claude. Diese Seite stützt sich darauf und baut die neun Ordner dieses Falls in der Skelett-Station auf.</p>
        <p style={{ marginBottom: '1rem' }}>Die dritte ist von anderer Art: Falls du noch nicht weißt, ob du eine Skill, einen Subagenten, einen Hook oder einen MCP-Server brauchst, hilft dir Claude Anatomy, das Teil zu bestimmen, bevor du die erste Datei schreibst.</p>
        <p>Und die vierte kommt bei der Sinne-Station: Einen Konnektor Schritt für Schritt einschalten lebt im Konnektoren-Guide. Hier entscheidest du nur, welche taugen und was deine Maschine verlässt, wenn du sie einschaltest.</p>
      </section>

      {/* Section: Für wen */}
      <section style={{ marginBottom: '3.5rem' }}>
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1.5rem' }}>
          <h3 style={{ fontWeight: '800', fontSize: '1.1rem', margin: '0 0 0.75rem' }}>Für wen das hier taugt</h3>
          <p style={{ margin: '0 0 0.75rem' }}>Alles auf dieser Seite läuft mit einem Claude Pro oder Max Abo. Kein API-Key, keine Modell-IDs, keine Preise pro Million Tokens, keine einzige HTTP-Anfrage, die du selbst schreiben musst.</p>
          <p style={{ margin: 0 }}>Und du musst nicht programmieren können. An den wenigen Stellen, wo das System eine Config-Datei braucht, findest du einen deutschen Prompt zum Kopieren, den du Claude Code gibst, und er schreibt die Datei für dich.</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem', marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ fontWeight: '800', fontSize: '0.95rem' }}>BauMitMau</div>
            <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>@kidealist · kidealist.de</div>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Community Guide · Verifiziert August 2026</div>
        </div>
      </footer>

      {/* [Adaptado de @soyenriquerocha con permiso] */}
    </div>
  );
};

export default DeinEigenerJarvis;