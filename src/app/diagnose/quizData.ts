export type QuestionType = "single" | "multi" | "text";

export interface QuizOption {
  label: string;
  value: string;
  /** 0-100 readiness score this answer implies. null = not scored (informational only). */
  score: number | null;
}

export interface QuizQuestion {
  id: string;
  category: string;
  type: QuestionType;
  text: string;
  options?: QuizOption[];
  placeholder?: string;
}

function scaled(labels: string[]): QuizOption[] {
  const n = labels.length;
  return labels.map((label, i) => ({
    label,
    value: label,
    score: n === 1 ? 100 : Math.round(((n - 1 - i) / (n - 1)) * 100),
  }));
}

// ─── Individual questions (shared between quick + detailed) ──────────────────

export const Q_DATEN_SPEICHERORT: QuizQuestion = {
  id: "daten_speicherort",
  category: "Eure Daten",
  type: "single",
  text: "Wenn ich nach eurer letzten Rechnung an einen Kunden frage, wie schnell findet ihr sie?",
  options: scaled([
    "Sofort, alles liegt an einem Ort",
    "Nach ein paar Minuten Suchen in Tabellen oder Ordnern",
    "Schwierig, das verteilt sich auf mehrere Programme und Postfächer",
    "Ehrlich? Keine Ahnung, wo das liegen würde",
  ]),
};

export const Q_DATEN_HANDBUCH: QuizQuestion = {
  id: "daten_handbuch",
  category: "Eure Daten",
  type: "single",
  text: "Ein neuer Kollege soll morgen einen wiederkehrenden Ablauf übernehmen. Wie lernt er ihn?",
  options: scaled([
    "Es gibt eine schriftliche Anleitung dafür",
    "Teilweise, für manches gibt es etwas, für anderes nicht",
    "Er fragt jemanden aus dem Team, es steht nirgends",
    "Ehrlich gesagt läuft bei uns jeder Ablauf etwas anders",
  ]),
};

export const Q_DATEN_ORDNUNG: QuizQuestion = {
  id: "daten_ordnung",
  category: "Eure Daten",
  type: "single",
  text: "Wie würdest du den Zustand eurer Ablage insgesamt beschreiben?",
  options: scaled([
    "Aufgeräumt, es gibt klare Regeln und die halten auch",
    "Gemischt, ein Teil ist ordentlich, ein Teil nicht",
    "Eher gewachsen als geplant, jeder macht es etwas anders",
    "Wir verlieren regelmäßig Dinge darin",
  ]),
};

export const Q_AUFGABEN_ZEIT: QuizQuestion = {
  id: "aufgaben_zeit",
  category: "Eure Aufgaben",
  type: "single",
  text: "Was frisst bei euch aktuell am meisten Zeit im Alltag?",
  options: [
    { label: "Daten von A nach B übertragen, Formulare, Copy-Paste", value: "repetitiv", score: 20 },
    { label: "Auf Nachrichten und Anfragen antworten", value: "emails", score: 40 },
    { label: "Informationen zusammensuchen, bevor man überhaupt anfangen kann", value: "recherche", score: 40 },
    { label: "Nachdenken, planen, Dinge neu gestalten", value: "kreativ", score: 100 },
    { label: "Ehrlich, von allem ein bisschen zu viel", value: "alles", score: 10 },
  ],
};

export const Q_AUFGABEN_HAEUFIGKEIT: QuizQuestion = {
  id: "aufgaben_haeufigkeit",
  category: "Eure Aufgaben",
  type: "single",
  text: "Wie oft taucht genau diese Zeitfresser-Aufgabe auf?",
  options: scaled(["Praktisch täglich", "Mehrmals die Woche", "Hin und wieder", "Selten, jedes Mal ist es anders"]),
};

export const Q_AUFGABEN_REGELN: QuizQuestion = {
  id: "aufgaben_regeln",
  category: "Eure Aufgaben",
  type: "single",
  text: "Könntet ihr jemandem in drei, vier Sätzen erklären, wann und wie diese Aufgabe genau abläuft?",
  options: scaled([
    "Ja, easy, das ist praktisch immer der gleiche Ablauf",
    "Größtenteils, ein paar Ausnahmen gibt es",
    "Schwer, da muss man immer neu einschätzen",
    "Nein, das braucht wirklich Erfahrung und Fingerspitzengefühl",
  ]),
};

export const Q_TOOLS_PROGRAMME: QuizQuestion = {
  id: "tools_programme",
  category: "Eure Tools",
  type: "multi",
  text: "Womit arbeitet ihr im Alltag?",
  options: [
    { label: "E-Mail-Postfach (Gmail, Outlook, o. Ä.)", value: "email", score: null },
    { label: "Google Workspace (Drive, Docs, Sheets)", value: "google", score: null },
    { label: "Microsoft Office (Word, Excel, Teams)", value: "microsoft", score: null },
    { label: "Ein CRM oder Kundenverwaltungstool", value: "crm", score: null },
    { label: "Software für Buchhaltung oder Rechnungen", value: "buchhaltung", score: null },
    { label: "Tools für Projekt- oder Aufgabenmanagement (Trello, Asana, Monday ...)", value: "pm", score: null },
    { label: "WhatsApp oder Telegram für geschäftliche Kommunikation", value: "whatsapp", score: null },
    { label: "Branchenspezifische Software (Handwerk, Praxis o. Ä.)", value: "branchen", score: null },
  ],
};

export const Q_TOOLS_AUSTAUSCH: QuizQuestion = {
  id: "tools_austausch",
  category: "Eure Tools",
  type: "single",
  text: "Änderst du etwas in einem Tool, taucht das automatisch in den anderen auf, oder trägst du es nochmal manuell ein?",
  options: scaled([
    "Automatisch, die Systeme sprechen miteinander",
    "Teilweise, aber vieles tippen wir doppelt",
    "Gar nicht, jedes Tool ist eine eigene Insel",
    "Weiß nicht mal, ob das technisch möglich wäre",
  ]),
};

export const Q_TEAM_REAKTION: QuizQuestion = {
  id: "team_reaktion",
  category: "Euer Team",
  type: "single",
  text: "Du kündigst dem Team ein neues Tool an. Was ist die typische erste Reaktion?",
  options: scaled([
    "Neugier, die Leute probieren es gerne aus",
    "Zustimmung, solange es wirklich Arbeit abnimmt",
    'Skepsis, "brauchen wir das wirklich"',
    "Widerstand, Veränderung kommt grundsätzlich schlecht an",
  ]),
};

export const Q_TEAM_ZUSTAENDIG: QuizQuestion = {
  id: "team_zustaendig",
  category: "Euer Team",
  type: "single",
  text: "Wer würde bei euch ein KI-Projekt tatsächlich vorantreiben?",
  options: scaled([
    "Ein, zwei Leute im Team, die sowas gerne anpacken",
    "Die Geschäftsführung, von oben angestoßen",
    "Niemand direkt, dafür bräuchten wir Unterstützung von außen",
    "Realistisch gesagt hätte aktuell niemand die Zeit dafür",
  ]),
};

export const Q_ZIELE_GEWINN: QuizQuestion = {
  id: "ziele_gewinn",
  category: "Eure Ziele",
  type: "single",
  text: "Wenn KI bei euch einen einzigen Effekt hätte, welcher wäre am wertvollsten?",
  options: [
    { label: "Zeit zurückgewinnen bei nervigen Routinen", value: "zeit", score: 100 },
    { label: "Weniger Flüchtigkeitsfehler", value: "fehler", score: 90 },
    { label: "Mehr Volumen schaffen, ohne mehr Personal", value: "skalieren", score: 90 },
    { label: "Nicht hinter dem Wettbewerb zurückbleiben", value: "modern", score: 40 },
    { label: "Ich bin einfach neugierig, was da geht", value: "neugierig", score: 60 },
  ],
};

export const Q_ZIELE_IDEE: QuizQuestion = {
  id: "ziele_idee",
  category: "Eure Ziele",
  type: "single",
  text: "Hast du schon ein konkretes Bild davon, wofür ihr KI einsetzen würdet?",
  options: scaled([
    "Ja, ziemlich genau",
    "Eine grobe Richtung schon",
    "Noch nicht, ich will erstmal verstehen, was realistisch ist",
    "Nein, ich schaue mir das gerade nur aus Interesse an",
  ]),
};

export const Q_BUDGET: QuizQuestion = {
  id: "budget",
  category: "Budget",
  type: "single",
  text: "Angenommen, eine Lösung würde nachweislich funktionieren. Was wäre für euch ein realistisches Budget?",
  options: [
    { label: "Über 10.000€, wenn sich das rechnet", value: "hoch", score: null },
    { label: "Zwischen 2.000€ und 10.000€ für den Start", value: "mittel", score: null },
    { label: "Unter 2.000€, lieber klein anfangen", value: "niedrig", score: null },
    { label: "So wenig wie irgend möglich", value: "minimal", score: null },
    { label: "Müsste ich erst intern klären", value: "unklar", score: null },
  ],
};

export const Q_DATENSCHUTZ_SENSIBEL: QuizQuestion = {
  id: "datenschutz_sensibel",
  category: "Datenschutz",
  type: "single",
  text: "Wie würdest du die Daten einschätzen, mit denen ihr täglich arbeitet?",
  options: [
    { label: "Hochsensibel, z. B. Gesundheits- oder Finanzdaten", value: "sehr", score: null },
    { label: "Normal geschäftlich, Kontakte, Aufträge, Bestellungen", value: "normal", score: null },
    { label: "Größtenteils unkritisch, eher öffentliche Infos", value: "wenig", score: null },
    { label: "Ein Mix aus beidem", value: "gemischt", score: null },
  ],
};

export const Q_DATENSCHUTZ_WISSEN: QuizQuestion = {
  id: "datenschutz_wissen",
  category: "Datenschutz",
  type: "single",
  text: "Wie sicher fühlt ihr euch aktuell beim Thema Datenschutz?",
  options: scaled([
    "Sehr sicher, das ist bei uns dokumentiert und im Griff",
    "Einigermaßen, wir bemühen uns",
    "Eher unsicher, da gäbe es einiges aufzuräumen",
    "Offen gesagt, damit haben wir uns noch nicht befasst",
  ]),
};

export const Q_DETAILS_PROBLEM: QuizQuestion = {
  id: "details_problem",
  category: "Details",
  type: "text",
  text: "In ein, zwei Sätzen: welcher Ablauf nervt dich am meisten und sollte automatisiert werden?",
  placeholder: "Zum Beispiel: Jede Woche verschicken wir dieselben Angebote von Hand per E-Mail...",
};

export const Q_DETAILS_BEREICH: QuizQuestion = {
  id: "details_bereich",
  category: "Details",
  type: "single",
  text: "In welchem Bereich des Unternehmens steckt dieses Problem?",
  options: [
    { label: "Vertrieb und Neukundengewinnung", value: "verkauf", score: null },
    { label: "Marketing und Social Media", value: "marketing", score: null },
    { label: "Kundenservice und Support", value: "support", score: null },
    { label: "Verwaltung und interne Organisation", value: "verwaltung", score: null },
    { label: "Personal und Bewerbermanagement", value: "personal", score: null },
    { label: "Buchhaltung und Finanzen", value: "buchhaltung", score: null },
    { label: "Etwas ganz anderes", value: "andere", score: null },
  ],
};

export const Q_DETAILS_BETROFFEN: QuizQuestion = {
  id: "details_betroffen",
  category: "Details",
  type: "single",
  text: "Wie viele Personen sind von diesem Problem direkt betroffen?",
  options: [
    { label: "Nur ich", value: "1", score: 30 },
    { label: "Ein kleines Team, 2 bis 5 Leute", value: "2-5", score: 60 },
    { label: "Eine ganze Abteilung, 6 bis 20 Leute", value: "6-20", score: 85 },
    { label: "Praktisch das ganze Unternehmen", value: "20+", score: 100 },
  ],
};

export const Q_DETAILS_HAEUFIGKEIT: QuizQuestion = {
  id: "details_haeufigkeit",
  category: "Details",
  type: "single",
  text: "Wie regelmäßig taucht das Problem auf?",
  options: scaled(["Mehrfach täglich", "Einmal am Tag", "Mehrmals in der Woche", "Einmal die Woche oder seltener"]).reverse(),
};

export const Q_DETAILS_NERVT: QuizQuestion = {
  id: "details_nervt",
  category: "Details",
  type: "single",
  text: "Was ist an diesem Ablauf am frustrierendsten?",
  options: [
    { label: "Es dauert einfach ewig", value: "dauer", score: null },
    { label: "Es passieren dabei ständig Fehler", value: "fehler", score: null },
    { label: "Es verschlingt zu viel Zeit oder Geld", value: "kosten", score: null },
    { label: "Es ist unnötig kompliziert", value: "komplex", score: null },
    { label: "Es stapelt sich, wir kommen nicht mehr hinterher", value: "menge", score: null },
  ],
};

// ─── The two flows ─────────────────────────────────────────────────────────

export const QUICK_QUESTIONS: QuizQuestion[] = [
  Q_DATEN_SPEICHERORT,
  Q_DATEN_ORDNUNG,
  Q_AUFGABEN_ZEIT,
  Q_AUFGABEN_REGELN,
  Q_TOOLS_AUSTAUSCH,
  Q_TEAM_REAKTION,
  Q_ZIELE_GEWINN,
];

export const DETAILED_QUESTIONS: QuizQuestion[] = [
  Q_DATEN_SPEICHERORT,
  Q_DATEN_HANDBUCH,
  Q_DATEN_ORDNUNG,
  Q_AUFGABEN_ZEIT,
  Q_AUFGABEN_HAEUFIGKEIT,
  Q_AUFGABEN_REGELN,
  Q_TOOLS_PROGRAMME,
  Q_TOOLS_AUSTAUSCH,
  Q_TEAM_REAKTION,
  Q_TEAM_ZUSTAENDIG,
  Q_ZIELE_GEWINN,
  Q_ZIELE_IDEE,
  Q_BUDGET,
  Q_DATENSCHUTZ_SENSIBEL,
  Q_DATENSCHUTZ_WISSEN,
  Q_DETAILS_PROBLEM,
  Q_DETAILS_BEREICH,
  Q_DETAILS_BETROFFEN,
  Q_DETAILS_HAEUFIGKEIT,
  Q_DETAILS_NERVT,
];

export function computeScore(questions: QuizQuestion[], answers: Record<string, string | string[]>): number {
  let total = 0;
  let count = 0;
  for (const q of questions) {
    if (q.type !== "single" || !q.options) continue;
    const answer = answers[q.id];
    if (typeof answer !== "string") continue;
    const opt = q.options.find((o) => o.value === answer);
    if (!opt || opt.score === null) continue;
    total += opt.score;
    count += 1;
  }
  if (count === 0) return 50;
  return Math.round(total / count);
}

export function scoreLabel(score: number): { title: string; text: string } {
  if (score >= 75) {
    return {
      title: "Ihr seid bereit.",
      text: "Eure Daten und Abläufe sind ordentlich genug, um schnell messbare Ergebnisse zu sehen. Der nächste Schritt ist, das richtige erste Projekt zu wählen.",
    };
  }
  if (score >= 45) {
    return {
      title: "Ihr seid auf dem Weg.",
      text: "Es gibt konkrete Stellen, an denen KI euch Zeit zurückgibt, aber ein paar Grundlagen (Datenordnung, klare Abläufe) lohnt sich vorher zu klären.",
    };
  }
  return {
    title: "Noch früh, aber lösbar.",
    text: "Eure Prozesse sind heute eher chaotisch, das ist normal und kein Hindernis. Es bedeutet nur, dass wir zuerst Ordnung schaffen, bevor wir automatisieren.",
  };
}
