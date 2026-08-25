import React, { useState } from 'react';

const EigenerKiAssistent = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setActiveSection(activeSection === id ? null : id);
  };

  const stops = [
    { num: '01', title: 'So nutzt du diese Seite', desc: 'Was du baust und welcher der drei Wege deiner ist' },
    { num: '02', title: 'Das Skelett', desc: 'Die fünf Schichten eines persönlichen Agenten' },
    { num: '03', title: 'Die Eingangsentscheidung', desc: 'Brauchst du wirklich Obsidian?' },
    { num: '04', title: 'Der Start', desc: 'Vom Terminal-Öffnen bis Claude Code antwortet' },
    { num: '05', title: 'Die Ordner', desc: 'Nach Typ sortieren, nicht nach Thema' },
    { num: '06', title: 'Schicht 1 · Gedächtnis', desc: 'Die drei Speicher, die man verwechselt' },
    { num: '07', title: 'Schicht 2 · Fähigkeiten', desc: 'Die vier Skills im Format, das wirklich lädt' },
    { num: '08', title: 'Schicht 3 · Team', desc: 'Drei Subagenten mit eigenem Gedächtnis' },
    { num: '09', title: 'Schicht 4 · Sinne', desc: 'Was außerhalb des Vaults erreichbar ist' },
    { num: '10', title: 'Schicht 5 · Herzschlag', desc: 'Weiterarbeiten mit zugeklapptem Laptop' },
    { num: '11', title: 'Die Reflexe', desc: 'Was auslöst, egal was Claude denkt' },
    { num: '12', title: 'Der Rhythmus', desc: 'Zwanzig Minuten täglich, dreißig am Sonntag' },
    { num: '13', title: 'Der Schritt, den niemand dokumentiert', desc: 'Deine Notizen werden deine Skills' },
    { num: '14', title: 'Die Killer', desc: 'Zehn Fehler: fünf im Verhalten, fünf technisch' },
    { num: '15', title: 'Mach es zu deinem', desc: 'Dasselbe Skelett, eine andere Domäne' },
  ];

  const paths = [
    {
      letter: 'A',
      title: 'Ein Markdown-Ordner, sonst nichts',
      desc: '.md-Dateien auf deiner Festplatte, keine App drüber. Am schnellsten aufgebaut und alles, was die fünf Schichten zum Laufen brauchen.',
    },
    {
      letter: 'B',
      title: 'Obsidian über demselben Ordner',
      desc: 'Derselbe Ordner, mit einem Fenster das dir Links zwischen Notizen zeigt, schnell sucht und vom Handy aus erfasst. Obsidian ist hier die Ansicht, nicht das Gehirn.',
    },
    {
      letter: 'C',
      title: 'claude-mem · Session-Gedächtnis',
      desc: 'Du lässt Claude die Erfassung alleine machen, basierend auf dem, was in jeder Session passiert ist. Ersetzt die anderen zwei nicht: speichert, was Claude tat, nicht was du denkst.',
    },
  ];

  const layers = [
    {
      num: '1',
      title: 'Ein Ordner, den Claude auswendig kennt',
      desc: 'Deine Notizen als Textdateien und im Stammverzeichnis eine CLAUDE.md, die Claude Code beim Start jeder Session liest: was du speicherst, wie du es benennst und wie du angesprochen werden willst. Du hörst auf, dein System jedes Mal neu zu erklären, wenn du das Terminal öffnest.',
    },
    {
      num: '2',
      title: 'Vier Fähigkeiten, die sich selbst auslösen',
      desc: 'Posteingang verarbeiten, Verbindungen suchen, ein Brief zusammenbauen und in deiner Stimme schreiben. Jede in ihrem eigenen Ordner im Vault, und Claude lädt sie, wenn deine Anfrage zur Beschreibung passt, nicht wenn du daran denkst, sie aufzurufen.',
    },
    {
      num: '3',
      title: 'Drei Subagenten mit eigenem Gedächtnis',
      desc: 'Der Archivar, der Weber und der Schreiber. Jeder arbeitet in seinem eigenen Kontextfenster und speichert das Gelernte in seinem eigenen Ordner, was er über deine Notizen herausfindet bleibt also nächste Woche noch da.',
    },
    {
      num: '4',
      title: 'Reflexe, die ohne Erlaubnis auslösen',
      desc: 'Befehle, die beim Öffnen der Session, beim Schließen und bei jeder geschriebenen Notiz laufen. Ein Reflex läuft, egal was passiert; eine Anweisung in einer Datei fragt nur bitte, und dieser Unterschied ist die ganze Schicht.',
    },
    {
      num: '5',
      title: 'Eine geplante Aufgabe, die ohne dich arbeitet',
      desc: 'Sonntag früh liest dein Agent die Woche, sucht Verbindungen und lässt dir die Briefs fertig geschrieben. In der Cloud läuft das mit zugeklapptem Laptop; auf deiner Maschine, solange sie wach ist.',
    },
  ];

  const tableRows = [
    {
      looking: 'Eine geplante Aufgabe von A bis Z betreiben',
      lives: '10 Automatisierungen mit Claude',
      here: 'Was mit einem Vault passiert, wenn die Aufgabe in der Cloud läuft und deine Dateien nicht sieht.',
    },
    {
      looking: 'Der /schedule-Befehl und Cloud-Agenten von innen',
      lives: 'Schedule · Agenten in der Cloud',
      here: 'Die drei Uhren in einer Tabelle verglichen, um zu entscheiden, welche deinen Agenten weckt.',
    },
    {
      looking: 'Einen Connector Schritt für Schritt einschalten',
      lives: 'Connectors von Claude',
      here: 'Welche sich für einen persönlichen Agenten lohnen und was deine Maschine verlässt, wenn du sie einschaltest.',
    },
    {
      looking: 'claude-mem und MemPalace von innen, mit Installation',
      lives: 'Unendliches Gedächtnis für Claude Code',
      here: 'Ein Absatz. Es ist Weg C und nicht mehr.',
    },
    {
      looking: 'Die allgemeine Methode zum Ordnen von Ordnern',
      lives: 'Ordner- und Dateistruktur für Claude',
      here: 'Die neun Ordner dieses konkreten Falls, schon benannt, beim Skelett-Stop.',
    },
    {
      looking: 'Welches Teil bauen: Skill, Subagent, Hook oder MCP-Server',
      lives: 'Claude Anatomy',
      here: 'Wie man eine einzige Sache mit allen fünf Schichten gleichzeitig baut. Jene entscheidet das Teil; diese fügt sie zusammen.',
    },
    {
      looking: 'Das Handwerk, einen Skill von Grund auf zu schreiben',
      lives: 'Skill Creator · und Skills global oder pro Projekt',
      here: 'Die vier Fähigkeiten dieser Anleitung zum Laufen bringen und etwas, das du wiederholst, in einen Skill umwandeln.',
    },
    {
      looking: 'Armeen von Subagenten parallel arbeitend',
      lives: 'Dynamische Workflows',
      here: 'Das Gegenteil: drei feste Subagenten, wenige, mit eigenem Gedächtnis das zwischen Sessions bleibt.',
    },
    {
      looking: 'Das gemeinsame Notizbuch eines Agenten-Teams',
      lives: 'Memory Palace · Agenten',
      here: 'Das Gedächtnis eines persönlichen Agenten, nicht das eines Teams das sich gegenseitig überschreibt.',
    },
    {
      looking: 'Eine Flotte, die 24/7 auf einer eigenen Maschine läuft',
      lives: 'Agenten-Ökosystem',
      here: 'Ein einziger Agent, dein Abo und der Computer, den du schon hast.',
    },
  ];

  return (
    <div className="bg-gray-950 min-h-screen text-gray-100 font-sans">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-4xl">🏠</span>
          <span className="text-sm text-gray-500 uppercase tracking-widest">BauMitMau · Community Guide</span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
          Dein eigener JARVIS
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl">
          Ein persönlicher Agent auf deinen Notizen. Fünf Schichten, ein Wochenende zum Aufbauen, zwanzig Minuten am Tag damit er läuft.
        </p>
        <div className="inline-block bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-2">
          <span className="text-amber-400 text-sm font-medium">Verifiziert · August 2026</span>
        </div>
      </div>

      {/* Key fact banner */}
      <div className="bg-amber-950/40 border-y border-amber-500/20">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <p className="text-amber-200 text-sm leading-relaxed">
            <span className="font-bold text-amber-400">Das Entscheidende:</span> Eine Cloud-Aufgabe sieht die Dateien auf deinem Computer nicht. Klone ein Repository. Damit dein zweites Gehirn mit zugeklapptem Laptop weiterläuft, muss es ein privates GitHub-Repo sein und deine Skills müssen drin sein.
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2">
          {['fünf Schichten','Obsidian optional','Abo ohne API-Key','14 Abschnitte','Skills im offiziellen Format','Subagenten mit eigenem Gedächtnis','Hooks','geplante Aufgaben','läuft mit zugeklapptem Laptop','Skelett für jeden Agenten','kein Code','gegen offizielle Docs verifiziert'].map(tag => (
            <span key={tag} className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-700">{tag}</span>
          ))}
        </div>
      </div>

      {/* 15 Stops */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-2">Die fünfzehn Stops · auf einen Blick</h2>
        <p className="text-gray-500 text-sm mb-8">Jeder Stop lässt eine Schicht laufen, bevor es weitergeht.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {stops.map(stop => (
            <div key={stop.num} className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
              <div className="text-amber-500 text-xs font-mono font-bold mb-1">{stop.num}</div>
              <div className="text-white text-sm font-semibold mb-1">{stop.title}</div>
              <div className="text-gray-500 text-xs leading-relaxed">{stop.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How to use */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="border-l-2 border-amber-500 pl-6 mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">So nutzt du diese Seite</h2>
          <p className="text-gray-400">Was du baust, welcher der drei Wege deiner ist und was in anderen Guides bleibt</p>
        </div>

        <p className="text-gray-300 mb-4">
          Diese Seite baut einen persönlichen Agenten auf deinen Notizen, von Anfang bis Ende. Keine Tricks-Liste: ein System mit fünf Schichten, die eine nach der anderen aufgebaut werden. Jeder Stop lässt eine Schicht laufen, bevor es zur nächsten geht.
        </p>
        <p className="text-gray-400 mb-12">
          Bevor du irgendetwas anfasst, macht es Sinn, drei Dinge zu klären: was am Ende bei dir steht, welcher der drei Wege der deine ist und welche Themen dieser Guide absichtlich nicht erklärt, weil sie schon vollständig auf einer anderen Seite leben.
        </p>

        {/* What you get */}
        <h3 className="text-xl font-bold text-white mb-6">Was du am Ende hast</h3>
        <p className="text-gray-400 mb-8">
          Wenn du diese Seite durchhast, läuft ein persönlicher Agent auf deinen Notizen. Kein aufgeräumter Ordner mit Claude Code daneben: ein System, das beim Start schon weiß wer du bist, seine Fähigkeiten nur lädt wenn sie gebraucht werden, die schwere Arbeit an ein Team delegiert, Reflexe auslöst die nicht davon abhängen ob es versteht, und sich selbst zur eingestellten Zeit aufweckt.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Fünf Teile, in dieser Reihenfolge aufgebaut. Keine braucht die nächste um zu funktionieren: wer bei der dritten aufhört, hat drei laufende Schichten und kein halbfertiges System.
        </p>

        <div className="space-y-4 mb-16">
          {layers.map(layer => (
            <div key={layer.num} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-400 text-sm font-bold">{layer.num}</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">{layer.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{layer.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cost section */}
        <h3 className="text-xl font-bold text-white mb-6">Was es kostet</h3>
        <p className="text-gray-500 text-sm mb-6">Ein Wochenende zum Aufbauen, zwanzig Minuten täglich damit es läuft</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {[
            { title: 'Aufbauzeit', text: 'Ein Wochenende am Stück. Stückchenweise geht auch: jeder Stop lässt eine Schicht laufen und du kannst eine Woche dort pausieren ohne etwas zu verlieren.' },
            { title: 'Die Reihenfolge zählt', text: 'Erst das Gedächtnis, der Herzschlag zuletzt. Etwas automatisieren das noch nicht von Hand funktioniert wiederholt den Fehler nur schneller und ohne dich.' },
            { title: 'Womit es läuft', text: 'Mit deinem Claude Pro oder Claude Max Abo und Claude Code auf deinem Computer. Kein API-Schlüssel, keine zweite Karte.' },
            { title: 'Wie viel Code du schreibst', text: 'Keinen. An den paar Stellen wo das System eine Konfigurationsdatei braucht, kopierst du einen deutschen Prompt und Claude Code schreibt die Datei. Dein Job: lesen und bestätigen.' },
          ].map(item => (
            <div key={item.title} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">{item.title}</div>
              <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Three paths */}
        <h3 className="text-xl font-bold text-white mb-2">Die drei Wege, je eine Zeile</h3>
        <p className="text-gray-500 text-sm mb-8">
          Das Gehirn dieses Systems sind Textdateien auf deiner Festplatte. Was sich zwischen den Wegen ändert ist was du drüberlegst, und diese Entscheidung triffst du einmal.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {paths.map(path => (
            <div key={path.letter} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mb-4">
                <span className="text-amber-400 font-bold text-lg">{path.letter}</span>
              </div>
              <h4 className="text-white font-semibold text-sm mb-3">{path.title}</h4>
              <p className="text-gray-400 text-xs leading-relaxed">{path.desc}</p>
            </div>
          ))}
        </div>

        {/* What stays in other guides */}
        <h3 className="text-xl font-bold text-white mb-2">Was in anderen Guides bleibt</h3>
        <p className="text-gray-400 text-sm mb-8">
          Die BauMitMau-Bibliothek hat schon vollständige Guides für fast alle Teile, die hier verwendet werden. Diese Seite erklärt sie nicht nochmal: sie benutzt sie. Die Tabelle zeigt von Anfang an welches Thema in welchem Guide lebt und was dieser hier behält.
        </p>
        <div className="overflow-x-auto mb-12">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-gray-500 text-xs uppercase tracking-wider py-3 pr-6">Wenn du suchst</th>
                <th className="text-left text-gray-500 text-xs uppercase tracking-wider py-3 pr-6">Lebt in</th>
                <th className="text-left text-gray-500 text-xs uppercase tracking-wider py-3">Hier nur</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className="border-b border-gray-900 hover:bg-gray-900/50 transition-colors">
                  <td className="text-gray-300 py-4 pr-6 align-top">{row.looking}</td>
                  <td className="text-amber-400 py-4 pr-6 align-top text-xs">{row.lives}</td>
                  <td className="text-gray-500 py-4 align-top text-xs leading-relaxed">{row.here}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Callout boxes */}
        <div className="space-y-4 mb-16">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-300 text-sm leading-relaxed">
              Zwei dieser Guides lohnt es, griffbereit zu haben während du hier liest. Wenn du heute einfach etwas automatisch laufen lassen willst und den Vault noch nicht aufgebaut hast, fang mit den <span className="text-amber-400">10 Automatisierungen mit Claude</span> an: dort wird eine geplante Aufgabe von A bis Z betrieben, hier gilt das als bekannt.
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-300 text-sm leading-relaxed">
              Die allgemeine Methode für Ordner und Namenskonventionen deckt <span className="text-amber-400">Ordner- und Dateistruktur für Claude</span> vollständig ab. Diese Seite stützt sich darauf und baut die neun Ordner dieses Falls beim Skelett-Stop.
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <p className="text-gray-300 text-sm leading-relaxed">
              Noch nicht sicher ob du einen Skill, einen Subagenten, einen Hook oder einen MCP-Server brauchst? <span className="text-amber-400">Claude Anatomy</span> hilft dir, das Teil zu entscheiden bevor du die erste Datei schreibst.
            </p>
          </div>
        </div>

        {/* Who it's for */}
        <div className="bg-gradient-to-r from-amber-950/30 to-gray-900 border border-amber-500/20 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-4">Für wen das gedacht ist</h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Pro- oder Max-Abo, egal ob du programmierst oder nicht.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Alles auf dieser Seite läuft mit einem Claude Pro oder Claude Max Abo. Kein API-Schlüssel, keine Modell-IDs, keine Preise pro Million Tokens, keine einzige HTTP-Anfrage zum Schreiben.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Programmieren ist auch nicht nötig. An den paar Stellen wo das System eine Konfigurationsdatei braucht, findest du einen deutschen Prompt zum Kopieren für Claude Code, und er schreibt die Datei. Dein Job: lesen und bestätigen, dass es das ist, was du wolltest.
          </p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Was du wirklich brauchst sind zwei Dinge: Claude Code installiert und zwanzig Minuten täglich für einen Monat. Das erste löst sich in zehn Minuten. Das zweite entscheidet, ob das für dich funktioniert oder in Woche zwei liegen bleibt.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏠</span>
            <div>
              <div className="text-white font-bold text-sm">BauMitMau</div>
              <div className="text-gray-600 text-xs">@kidealist · kidealist.de</div>
            </div>
          </div>
          <div className="text-gray-700 text-xs">Community Guide · Verifiziert August 2026</div>
        </div>
      </div>

      {/* Hidden attribution */}
      {/* [Adaptado de @soyenriquerocha con permiso] */}
    </div>
  );
};

export default EigenerKiAssistent;