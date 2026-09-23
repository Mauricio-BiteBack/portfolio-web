export type PillarKey = "webs" | "social" | "ia" | "automatizacion";

export type Project = {
  slug: string;
  pillar: PillarKey;
  title: string;
  tagline: string;
  tags?: string[];
  meta: { label: string; value: string }[];
  tools?: string[];
  outcomes?: { value: string; label: string }[];
  summary: string[];
  sections: {
    heading: string;
    paragraphs: string[];
    images?: { src: string; alt: string }[];
    walkthrough?: { src: string; caption: string };
  }[];
  images: { src: string; alt: string }[];
  video?: { src: string; poster?: string };
  clips?: { src: string; caption?: string }[];
  externalUrl?: string;
  externalLabel?: string;
  heroPosition?: string;
  cardVideo?: string;
};

export type Skill = { index: string; label: string };

export type Pillar = {
  key: PillarKey;
  index: string;
  title: string;
  subtitle: string;
  intro: string;
  skills: Skill[];
  showcase: { src: string; alt: string }[];
  video: string;
};

export const pillars: Pillar[] = [
  {
    key: "webs",
    index: "01",
    title: "Websites",
    subtitle: "Design und Entwicklung von Websites",
    intro:
      "Vom ersten Kontakt mit dem Kunden bis zum Livegang. Design in Figma, Umsetzung in WordPress und Shopify, dazu so viel HTML/CSS wie nötig, damit unterwegs nichts kaputtgeht.",
    skills: [
      { index: "01", label: "Erstgespräch mit dem Kunden" },
      { index: "02", label: "Design in Figma" },
      { index: "03", label: "WordPress & Shopify" },
      { index: "04", label: "Maßgeschneidertes HTML/CSS" },
      { index: "05", label: "QA & Livegang" },
    ],
    showcase: [
      { src: "/images/projects/websites/germanya.webp", alt: "Germanya" },
      { src: "/images/projects/websites/amanirent.webp", alt: "Amani Rent" },
      { src: "/images/projects/websites/albertopla.webp", alt: "Alberto Pla" },
      { src: "/images/projects/websites/whistler.png", alt: "Whistler" },
      { src: "/images/projects/websites/ibacon.png", alt: "IBACON" },
    ],
    video: "/mauricio/categorias/webs.mp4",
  },
  {
    key: "social",
    index: "02",
    title: "Social Media",
    subtitle: "Strategie und Account-Management",
    intro:
      "Content, der sich an Ergebnissen misst, nicht an Likes: Accounts, die wachsen, Verkäufe, die entstehen, Communitys, die bleiben. Dazu gehört meine eigene Personal Brand, wo ich alles zuerst selbst teste.",
    skills: [
      { index: "01", label: "Content-Strategie" },
      { index: "02", label: "Redaktionspläne & Carousels mit KI" },
      { index: "03", label: "Account-Wachstum" },
      { index: "04", label: "Meta & Google Ads" },
      { index: "05", label: "Personal Brand" },
    ],
    showcase: [
      { src: "/mauricio/automatizacion/germanya/germanya-content-1.jpg", alt: "Germanya: Content" },
      { src: "/ayori-1.webp", alt: "Ayori" },
      { src: "/mauricio/contenido/exclusive/exclusive-1.jpg", alt: "Exclusive European Art" },
      { src: "/mauricio/contenido/baumitmau/baumitmau-1.webp", alt: "Bau mit Mau" },
      { src: "/mauricio/automatizacion/germanya/germanya-content-3.jpg", alt: "Germanya: Content" },
    ],
    video: "/mauricio/contenido/exclusive/eea-mauricio.mp4",
  },
  {
    key: "ia",
    index: "03",
    title: "Generative KI",
    subtitle: "Visuelle Produktion mit KI",
    intro:
      "Produkt- und Markenkampagnen, die mit KI entstehen statt mit klassischen Fotoshootings. Gleicher visueller Anspruch, ein anderer Produktionsprozess.",
    skills: [
      { index: "01", label: "Art Direction" },
      { index: "02", label: "Bildgenerierung" },
      { index: "03", label: "Videogenerierung" },
      { index: "04", label: "Markenkonsistenz" },
      { index: "05", label: "Postproduktion" },
    ],
    showcase: [
      { src: "/images/projects/content/azzaro-1.webp", alt: "Azaro" },
      { src: "/images/projects/content/vicinity-1.webp", alt: "Vicinity" },
      { src: "/images/projects/content/newbalance-1.webp", alt: "New Balance" },
      { src: "/images/projects/content/azzaro-3.webp", alt: "Azaro" },
      { src: "/images/projects/content/vicinity-3.webp", alt: "Vicinity" },
    ],
    video: "/mauricio/categorias/ia.mp4",
  },
  {
    key: "automatizacion",
    index: "04",
    title: "Automatisierung",
    subtitle: "Systeme für echte Kunden",
    intro:
      "Zwei Kunden von Kopfwerk, zwei verschiedene Probleme: ein E-Commerce in der Frühphase mit begrenztem Budget, und ein Vertriebsteam, das Stunden mit manueller Arbeit verlor.",
    skills: [
      { index: "01", label: "n8n" },
      { index: "02", label: "Apify" },
      { index: "03", label: "Clay.com" },
      { index: "04", label: "APIs: Gmail, Instagram Graph, Brevo" },
      { index: "05", label: "CRM: Odoo" },
    ],
    showcase: [
      { src: "/mic-clay.webp", alt: "MIC: Lead-Recherche in Clay" },
      { src: "/mic-epg.webp", alt: "MIC: EPG-Versand" },
      { src: "/mic-report.webp", alt: "MIC: wöchentlicher Vertriebsreport" },
      { src: "/servicios-automation.jpg", alt: "AS² Studio: Automatisierungssystem" },
    ],
    video: "/mauricio/categorias/automatizacion.mp4",
  },
];

export const projects: Project[] = [
  // ── WEBSITES ────────────────────────────────────────────────────────
  {
    slug: "germanya-web",
    pillar: "webs",
    title: "Germanya",
    tagline: "E-Commerce für Naturkosmetik, komplett neu aufgebaut in Shopify.",
    tags: ["E-Commerce", "Shopify"],
    meta: [
      { label: "Rolle", value: "Design und Entwicklung" },
      { label: "Dauer", value: "März bis Mai 2024" },
    ],
    tools: ["Shopify", "Higgsfield", "Figma", "Adobe Photoshop", "Illustrator", "Premiere", "After Effects", "Claude", "ChatGPT"],
    outcomes: [
      { value: "Vor Ort → Online", label: "Hauptverkaufskanal" },
      { value: "0 → Vertriebspartner", label: "Abgeschlossene Verträge mit lokalen Vertriebspartnern" },
    ],
    summary: [
      "Design und Entwicklung des Onlineshops von Germanya, einer Marke für Naturkosmetik. Katalogstruktur, Produktseiten und Checkout wurden auf Conversion ausgelegt, nicht nur darauf, Produkte zu zeigen.",
    ],
    sections: [
      {
        heading: "Der geschäftliche Kontext",
        paragraphs: [
          "Vor diesem Projekt verkaufte Germanya über eine Website, die nicht konvertierte und keine Kunden brachte, dazu Social-Media-Kanäle ohne klaren Funnel: Präsenz war da, aber kein klarer Weg zum Verkauf. Ohne einen funktionierenden eigenen Kanal hing das Unternehmen fast vollständig vom Verkauf vor Ort ab, was auch bedeutete, für jedes Wachstum mehr Personal zu brauchen.",
          "Das Problem betraf nicht nur den Direktverkauf: Germanya sprach aktiv Vertriebspartner an, etwa Supermärkte oder Ketten wie DM, die ihre Produkte verkaufen konnten. Aber ohne Website, ohne unterstützende Social-Media-Präsenz und ohne Onlinepräsenz kamen keine Abschlüsse mit den großen Vertriebspartnern zustande, und selbst die kleinen kauften nicht regelmäßig, weil nichts die Marke ihnen gegenüber glaubwürdig machte.",
          "Germanya wollte dem Weg großer Marken für afro Haarpflege mit starker Präsenz auf dem deutschen Markt folgen, etwa Bali Curls, ohne dabei die eigene Identität zu verlieren: eine kleine Marke aus Augsburg, die nicht in ganz Deutschland werben wollte, sondern eine nahe Community aufbauen.",
        ],
      },
      {
        heading: "Recherche",
        paragraphs: [
          "Das war eine meiner ersten Websites. Bevor ich mit dem Design begann, habe ich mit den Gründern über ihre Vision gesprochen, wir haben gemeinsam Referenzen durchgesehen und uns die Konkurrenz angeschaut: Marken für afro Haarpflege mit guter Präsenz in Deutschland.",
          "Die zentrale Erkenntnis: Diese großen Marken konzentrierten sich auf den Großhandel, nicht auf den Aufbau einer Community. Germanya konnte als kleine Marke genau dort ansetzen, indem sie es auf lokaler Ebene richtig machte, etwas, das die großen Marken nicht priorisierten.",
          "Diese Beobachtung bestimmte die Content-Strategie: Statt bezahlten Traffic oder eine landesweite Präsenz anzustreben, bauten wir lokale Autorität auf, mit Content, der echten Mehrwert für die afro Community bot, also Routinen und Haarpflege-Wissen, das gefehlt hatte. So positionierten wir Germanya als nahe, vertrauenswürdige Anlaufstelle, passend zu dem, was die Marke immer sein wollte.",
        ],
      },
      {
        heading: "Wichtige Entscheidungen",
        paragraphs: [
          "Shopify statt WordPress oder individueller Programmierung. Die Gründer hatten wenig technisches Know-how, und Shopify ist speziell für E-Commerce gemacht: Versand, Label-Druck, der gesamte operative Ablauf ist bereits gelöst. Von den beiden besten Optionen für E-Commerce setzte sich Shopify durch, weil es im Alltag weniger von ihnen verlangt und sie nicht von einem Entwickler abhängig macht.",
          "Ein Katalog mit zwei Produkten, aber mit vollem Einsatz. Zu diesem Zeitpunkt hatte Germanya nur zwei Produkte. Statt einen größeren Katalog zu erzwingen, wie es die meisten Shops haben, fiel die Entscheidung, 100 Prozent des Design- und Content-Aufwands auf genau diese zwei Produkte zu setzen.",
        ],
      },
      {
        heading: "Was geliefert wurde",
        paragraphs: [
          "Markendesign, umgesetzt im Shop, Navigationsstruktur nach Kategorie, Produktseiten und Informationsseiten (Inhaltsstoffe, Routine, über die Marke).",
          "Außerdem wurde der operative Ablauf auf Kundenseite optimiert, also Adressen, Steuern, Versandetiketten, gestützt auf Shopify-Apps, die einen Großteil dieser Arbeit bereits abnehmen, damit Germanya im Alltag ohne Entwickler auskommt.",
          "Dieses Projekt ist mit der Zeit weitergewachsen: Heute ist es einer meiner Social-Media-Cases, in dem ich den Account von 0 auf über 50 aktive Kunden skaliert habe (siehe den Bereich Social Media).",
        ],
        walkthrough: { src: "/mauricio/websites/germanya/germanya-walkthrough.mp4", caption: "Rundgang durch den Shop" },
        images: [
          { src: "/mauricio/websites/germanya/germanya-mockup-laptop.webp", alt: "Germanya: Community-Bereich" },
          { src: "/mauricio/websites/germanya/germanya-mockup-tablet.webp", alt: "Germanya: Kontaktformular" },
          { src: "/mauricio/automatizacion/germanya/germanya-web.jpg", alt: "Germanya: Detail" },
          { src: "/mauricio/websites/germanya/germanya-screenshot.jpg", alt: "Germanya: Screenshot der Website" },
        ],
      },
    ],
    images: [{ src: "/images/projects/websites/germanya.webp", alt: "Germanya: Onlineshop" }],
    cardVideo: "/mauricio/websites/germanya/germanya-walkthrough.mp4",
  },
  {
    slug: "ibacon",
    pillar: "webs",
    title: "IBACON",
    tagline: "Unternehmenswebsite für ein international tätiges Umweltanalyse-Labor.",
    tags: ["Unternehmenswebsite", "Wissenschaft"],
    meta: [{ label: "Rolle", value: "Design und Entwicklung" }],
    tools: ["WordPress", "Adobe Photoshop", "Illustrator", "Premiere", "After Effects", "Claude", "ChatGPT", "Figma", "Higgsfield"],
    summary: [
      "Design und Entwicklung der Website der IBACON Labanalysis Group: wissenschaftliche Studien für Umweltrisikobewertungen, mit einem seriösen, unternehmerischen Ton für institutionelle Kunden.",
    ],
    sections: [
      {
        heading: "Der geschäftliche Kontext",
        paragraphs: [
          "IBACON gibt es seit 1994 in Roßdorf, Deutschland, also seit über 30 Jahren. Doch die alte Website spiegelte weder diese Geschichte noch die Seriosität wider, die ein institutioneller Kunde erwartet, bevor er eine Umweltrisikostudie beauftragt. IBACON konkurriert mit anderen Analyselaboren, manche davon Teil deutlich größerer Konzerne, wo institutionelle Glaubwürdigkeit genauso zählt wie die fachliche Arbeit.",
          "Genau zu dieser Zeit stand die Eingliederung von IBACON in die italienische LabAnalysis-Gruppe bevor, was es umso dringlicher machte, dass die Website Stabilität ausstrahlte.",
        ],
      },
      {
        heading: "Wichtige Entscheidungen",
        paragraphs: [
          "Der dunkle, unternehmerische Ton war keine freie gestalterische Entscheidung: Übernommen wurde die Farbpalette, die IBACON als Marke bereits hatte. Die Entscheidung war, sie beizubehalten und die Website darum herum aufzubauen, statt sie neu zu erfinden, passend zu einem Unternehmen, das für andere Firmen Prüfungen und regulatorische Themen bearbeitet, wo Vertrauen und Solidität zählen, nicht Kreativität.",
          "Navigation nach Branche segmentiert. Ein Kunde aus der Pharmaindustrie muss keine Leistungen für andere Branchen sehen, die ihm nichts nützen: Die Segmentierung nach Branche filtert das Interesse schon beim ersten Klick, sodass Besucher schneller finden, wonach sie wirklich suchen.",
        ],
      },
      {
        heading: "Was geliefert wurde",
        paragraphs: [
          "Struktur nach Branche und Lösungen, mit einer Navigation für technisch versierte Besucher, die schnell spezifische Informationen finden müssen, nicht für den Direktverkauf ausgelegt.",
        ],
        walkthrough: { src: "/mauricio/websites/ibacon/ibacon-walkthrough.mp4", caption: "Rundgang durch die Website" },
      },
    ],
    images: [{ src: "/mauricio/websites/ibacon/ibacon-hero.jpg", alt: "IBACON: Startseite" }],
    cardVideo: "/mauricio/websites/ibacon/ibacon-walkthrough.mp4",
  },
  {
    slug: "amani-rent",
    pillar: "webs",
    title: "Amani Rent",
    tagline: "Unternehmenswebsite für die Verwaltung von Ferienwohnungen.",
    tags: ["Vermietungsverwaltung", "WordPress"],
    meta: [
      { label: "Rolle", value: "Design und Entwicklung" },
      { label: "Dauer", value: "Erste 2 Wochen im Mai" },
    ],
    tools: ["WordPress", "Adobe Photoshop", "Illustrator", "Premiere", "After Effects", "Claude", "ChatGPT", "Figma", "Higgsfield"],
    outcomes: [
      { value: "0 → 40.000+", label: "Verwaltete Kunden (heute, laut eigener Website)" },
      { value: "97%", label: "Zufriedene Eigentümer" },
    ],
    summary: [
      "Design und Entwicklung der Website von Amani Rent (Amanirent), Verwaltung von Ferienvermietungen in Castellón und Valencia: Vorstellung der Leistungen und Kontakt, mit einer einfachen Struktur, die Anfragen von Eigentümern erzeugen soll.",
    ],
    sections: [
      {
        heading: "Der geschäftliche Kontext",
        paragraphs: [
          "Vor diesem Projekt gewann Amani Rent Eigentümer ausschließlich über Mundpropaganda und persönliche Kontakte, es gab keinen digitalen Kanal. Das war ein Nachteil gegenüber anderen ähnlich großen Ferienvermietungs-Verwaltungen in Castellón und Valencia, die bereits online präsent waren.",
          "Ohne eine Website, die Seriosität vermittelte, hatte ein Eigentümer keine Möglichkeit, die Marke vor dem direkten Kontakt kennenzulernen oder ihr zu vertrauen. Bei jeder neuen Wohnung, die verwaltet werden sollte, fing man praktisch bei null an.",
        ],
      },
      {
        heading: "Recherche",
        paragraphs: [
          "Mit nur zwei Wochen Zeit war für eine ausführliche Recherche kein Platz, aber ich habe schnell Referenzen und andere ähnlich große Ferienvermietungs-Verwaltungen in der Region angeschaut, um zu verstehen, was sie gut vermittelten, und um nicht dieselben Fehler zu wiederholen.",
        ],
      },
      {
        heading: "Wichtige Entscheidungen",
        paragraphs: [
          "WordPress statt Shopify. Amani Rent verkauft kein Produkt, die Website existiert, um Leads von Eigentümern zu gewinnen, nicht um Zahlungen abzuwickeln. WordPress bot die inhaltliche Flexibilität, die dieses Ziel brauchte, ohne den E-Commerce-Unterbau mitzuschleppen, den das Projekt gar nicht nutzen würde.",
        ],
      },
      {
        heading: "Was geliefert wurde",
        paragraphs: [
          "Visuelles Design in Figma, Entwicklung in WordPress und ein feinjustiertes responsives Verhalten, damit die mobile Erfahrung keine abgespeckte Desktop-Version war, sondern eigens durchdacht wurde.",
          "Als wir anfingen, hatte Amanirent keine Kunden. Heute berichten sie auf ihrer eigenen Website von über 40.000 verwalteten Kunden und 97 Prozent zufriedenen Eigentümern. Dieses gesamte Wachstum lässt sich nicht allein auf zwei Wochen Website zurückführen, aber es war der Ausgangspunkt.",
        ],
        walkthrough: { src: "/mauricio/websites/amani-rent/amani-rent-walkthrough.mp4", caption: "Rundgang durch die Website" },
        images: [{ src: "/mauricio/websites/amani-rent/amani-rent-screenshot.jpg", alt: "Amani Rent: Screenshot der Website" }],
      },
    ],
    images: [{ src: "/images/projects/websites/amanirent.webp", alt: "Amani Rent" }],
    cardVideo: "/mauricio/websites/amani-rent/amani-rent-walkthrough.mp4",
  },
  {
    slug: "yoestudiosalud",
    pillar: "webs",
    title: "YoEstudioSalud",
    tagline: "E-Commerce für Lernmaterial für Zahnmedizin, Medizin und Tiermedizin.",
    tags: ["E-Commerce", "Bildung"],
    meta: [{ label: "Rolle", value: "Design und Entwicklung" }],
    tools: ["WordPress", "Adobe Photoshop", "Illustrator", "Premiere", "After Effects", "Claude", "ChatGPT", "Figma", "Higgsfield"],
    summary: [
      "Design und Entwicklung der Website von YoEstudioSalud.es: ein Shop für Instrumente und Material für Studierende der Zahnmedizin, Medizin und Tiermedizin, organisiert nach Studiengang.",
    ],
    sections: [
      {
        heading: "Der geschäftliche Kontext",
        paragraphs: [
          "YoEstudioSalud ist der Onlineshop von Inmeval, das zusätzlich zwei Ladengeschäfte in Valencia betreibt. Sie konkurrierten mit großen Vertriebshändlern und sogar mit internationalen Herstellern, die direkt verkauften, also deutlich größeren Playern im selben Markt.",
          "Statt landesweit zu konkurrieren, stellten sie fest, dass der Großteil ihrer Verkäufe von ein paar bestimmten Universitäten in Valencia kam, und entschieden sich, sich darauf zu konzentrieren, statt sich zu verzetteln. Eine Onlinepräsenz erlaubte es ihnen außerdem, sich etwas vom stationären Alltag zu lösen (die Miete und die Kosten für zwei Ladengeschäfte trieben die Preise hoch) und Zeit zu sparen. Die Studierenden, technikaffiner, reagierten gut auf die Umstellung.",
        ],
      },
      {
        heading: "Wichtige Entscheidungen",
        paragraphs: [
          "Die Farbpalette wurde nicht angetastet, sie gehörte bereits zur Marke, mit Schwarz als einer der Hauptfarben, aber das Logo wurde komplett neu gestaltet. Die Entscheidung, keinen klinischeren Stil zu wählen (Blau und Weiß, wie es Gesundheitsmarken oft tun), war bewusst: YoEstudioSalud ist keine Klinik, sondern ein Händler, der an Studierende verkauft. Schwarz und ein direkterer Ton passten besser zu diesem Publikum als die typische klinische Ästhetik der Branche.",
          "Ein schneller Checkout mit so wenig Reibung wie möglich. Studierende werden schnell ungeduldig und ändern ihre Meinung: Ziel war, dass der Kauf ohne Hürden und ohne unnötige Schritte abläuft, damit man sie unterwegs nicht verliert.",
        ],
      },
      {
        heading: "Was geliefert wurde",
        paragraphs: [
          "Ein nach Studiengang segmentierter Katalog (Zahnmedizin, Medizin, Tiermedizin), mit einer dunklen, direkten visuellen Identität für ein universitäres, nicht klinisches Publikum.",
        ],
      },
    ],
    images: [{ src: "/mauricio/websites/yoestudiosalud/yoestudiosalud-hero.jpg", alt: "YoEstudioSalud: Startseite" }],
  },
  {
    slug: "demeters-roots",
    pillar: "webs",
    title: "Demeter's Roots",
    tagline: "E-Commerce für gesunde Mahlzeiten im Abo, im Vereinigten Königreich.",
    tags: ["E-Commerce", "Ernährung"],
    meta: [{ label: "Rolle", value: "Design und Entwicklung" }],
    tools: ["WordPress", "Adobe Photoshop", "Illustrator", "Premiere", "After Effects", "Claude", "ChatGPT", "Figma", "Higgsfield"],
    summary: [
      "Design und Entwicklung der Website von Demeter's Roots: Katalog mit Ernährungsplänen, Präferenzfragebogen und Checkout, ausgelegt auf Conversion ab dem ersten Scrollen.",
    ],
    sections: [
      {
        heading: "Der geschäftliche Kontext",
        paragraphs: [
          "Die alte Website konvertierte nicht: Der Kaufprozess war verwirrend, mit einem komplizierten Checkout, und wirkte nicht annähernd so solide wie die viel größere und etablierte Konkurrenz bei Meal Plans im Vereinigten Königreich. Demeter's Roots ist ein Projekt von AS² Studio, demselben Kunden aus dem Automatisierungs-Case in diesem Bereich, hier ging es aber um einen anderen Auftrag: die Website, nicht das System.",
          "Neben dem Verkauf personalisierter Pläne an Endkunden kocht Demeter's Roots auch im Großhandel für Restaurants, Bäckereien und Ketten, ein zweites Geschäft innerhalb derselben Website, das die vorherige Lösung nicht gut abbildete.",
        ],
      },
      {
        heading: "Wichtige Entscheidungen",
        paragraphs: [
          "Ein interaktiver Fragebogen für personalisierte Pläne. Statt eines langen, statischen Formulars entstand eines, das Frage für Frage weitergeht (Gewicht, Schwangerschaft, Medikation) und die nächste Frage nur zeigt, wenn sie zutrifft: einfach, wenn wenig anzugeben ist, ausführlicher, wenn es nötig ist. Vorher musste Demeter's Roots diese Informationen in Gesprächen mit jedem Interessenten einzeln erheben, mit dem Formular bekommen sie sie bereits fertig aufbereitet.",
          "Ein separates Formular für Großbestellungen. Da Demeter's Roots auch an Restaurants und Bäckereien verkauft, entstand ein eigener Ablauf, damit diese Kunden einfach bestellen und an von ihnen gewählten Tagen zuverlässig beliefert werden können: ein völlig anderer Anwendungsfall als der eines Einzelkunden, gelöst mit einem eigenen Weg statt ihn in denselben Checkout zu zwingen.",
        ],
      },
      {
        heading: "Was geliefert wurde",
        paragraphs: [
          "Shopstruktur mit anpassbaren Plänen, ein Fragebogen vor dem Kauf zur Einordnung des Kunden und Vertrauensbausteine (Zertifizierungen, Lieferung, gesunder Lebensstil).",
        ],
      },
    ],
    images: [{ src: "/mauricio/websites/demeters-roots/demeters-roots-hero.jpg", alt: "Demeter's Roots: Startseite" }],
  },
  {
    slug: "eiland-electronics",
    pillar: "webs",
    title: "Eiland Electronics",
    tagline: "Website und Marke für ein deutsches Unternehmen für Elektronik und Gebäudedienstleistungen.",
    tags: ["Website für Dienstleistungen", "Lead-Generierung", "Branding"],
    meta: [{ label: "Rolle", value: "Design, Entwicklung und Logo" }],
    tools: ["WordPress", "Adobe Photoshop", "Illustrator", "Premiere", "After Effects", "Claude", "ChatGPT", "Figma", "Higgsfield"],
    summary: [
      "Design und Entwicklung der Website von Eiland Electronics, dazu die komplette Neugestaltung von Logo und Marke: Elektronik- und Gebäudedienstleistungen für Privatkunden und Unternehmen, mit dem Kontaktformular als Hauptziel.",
    ],
    sections: [
      {
        heading: "Der geschäftliche Kontext",
        paragraphs: [
          "Keine Onlinepräsenz zu haben, bereitete ihnen große Sorgen: Sie hatten Kunden, aber nicht genug. Sie standen im Wettbewerb mit anderen lokalen Elektronikunternehmen in Mönchengladbach und allgemein in NRW.",
          "Sie hatten nicht einmal ein Google-Profil, nichts, wodurch sie bei Google Maps erscheinen oder Bewertungen und Feedback erhalten konnten. Das war das eigentliche erste Ziel der Website: online zu existieren.",
        ],
      },
      {
        heading: "Wichtige Entscheidungen",
        paragraphs: [
          "Bewusst ohne Online-Terminbuchung. Eiland Electronics ist ein Unternehmen, das sich auf wenige Kunden konzentriert, nicht auf Volumen: Automatisierte Terminbuchungen hätten mehr Kunden gebracht, aber nicht zwangsläufig mehr Umsatz, nur mehr Betriebskosten. Sie zogen es vor, die Anfrage selbst entgegenzunehmen und den Abschluss im direkten Gespräch zu machen.",
          "Von über 12 einzelnen Leistungen zu 4 Kategorien. Sie hatten eine lange, sehr detaillierte Liste an Leistungen, zu viele Optionen, um gut auswählen zu können. Diese wurden zu 4 breiten Kategorien zusammengefasst, jede davon deckt mehrere der ursprünglichen Leistungen ab, um die Entscheidung zu vereinfachen, ohne das Angebot zu verlieren.",
        ],
      },
      {
        heading: "Was geliefert wurde",
        paragraphs: [
          "Eine auf Conversion ausgerichtete Landingpage: ein einziges Ziel (Kontaktdaten hinterlassen), ein kurzes Formular direkt im sichtbaren Bereich und ein direkter WhatsApp-Button, um Reibung zu reduzieren. Sie zeigt, was das Unternehmen macht, wo es sitzt, und gibt Besuchern einen letzten Grund, sich zu melden.",
        ],
      },
    ],
    images: [{ src: "/mauricio/websites/eiland-electronics/eiland-electronics-hero.jpg", alt: "Eiland Electronics: Startseite" }],
  },
  {
    slug: "alberto-pla",
    pillar: "webs",
    title: "Alberto Pla",
    tagline: "Agentur für soziale Kommunikation, mit Projekten in Afrika, Asien, Europa und der Karibik.",
    tags: ["Soziale Kommunikation", "NGO", "Webdesign"],
    meta: [
      { label: "Rolle", value: "Design und Entwicklung" },
      { label: "Dauer", value: "Erste 2 Wochen im März 2026" },
    ],
    tools: ["WordPress", "Adobe Photoshop", "Illustrator", "Premiere", "After Effects", "Claude", "ChatGPT", "Figma", "Higgsfield"],
    summary: [
      "Design und Entwicklung der Website von Alberto Pla, Proyectos de Comunicación Social, einer Agentur mit über 15 Jahren Erfahrung in audiovisuellen und fotografischen Kampagnen für Organisationen, öffentliche Institutionen und Unternehmen mit sozialen Projekten.",
    ],
    sections: [
      {
        heading: "Der geschäftliche Kontext",
        paragraphs: [
          "Die alte Website war veraltet und vermittelte nicht die Seriosität einer Agentur mit über 15 Jahren Erfahrung in internationalen Projekten. Das Menü hatte zwar eine Liste mit vier oder fünf Leistungen, aber das war nicht das, was eine Institution überzeugen würde, sie zu beauftragen: Was in der sozialen Kommunikation überzeugt, ist die tatsächlich geleistete Arbeit zu sehen.",
        ],
      },
      {
        heading: "Wichtige Entscheidungen",
        paragraphs: [
          "Das Portfolio ist nach Kontinent organisiert, nicht nach Leistung. Jede Region, in der Alberto gearbeitet hat, Afrika, Lateinamerika, Europa, hat eine völlig eigene visuelle Identität; sie unter einer einzigen Leistungskategorie zu vermischen, hätte jeder Einzelnen die Kraft genommen. Die Organisation danach, wo die Arbeit entstanden ist, statt welche Art von Leistung es war, unterstreicht zusätzlich den Ruf: Es ist keine beliebige Agentur, sondern echte Projekte auf vier Kontinenten.",
        ],
      },
      {
        heading: "Was geliefert wurde",
        paragraphs: [
          "Eine Navigationsstruktur nach Projekten und dokumentarischen Werkreihen, mit fast ausschließlichem Fokus auf Fotografie und Video von Kampagnen in Afrika, Asien, Europa und, zuletzt, Haiti.",
          "Das Design stellt das Bild und eine emotionale visuelle Sprache in den Vordergrund, passend zum positiven Kommunikationsansatz der Agentur: Organisationen zu zeigen, die Armut bekämpfen und sich für gerechtere Gesellschaften einsetzen.",
        ],
        walkthrough: { src: "/mauricio/websites/alberto-pla/alberto-pla-walkthrough.mp4", caption: "Rundgang durch die Website" },
        images: [
          { src: "/mauricio/websites/alberto-pla/alberto-pla-mockup-laptop.webp", alt: "Alberto Pla, Proyectos de Comunicación Social" },
          { src: "/mauricio/websites/alberto-pla/alberto-pla-mockup-2.webp", alt: "Alberto Pla: Website" },
          { src: "/mauricio/websites/alberto-pla/alberto-pla-screenshot.jpg", alt: "Alberto Pla: Screenshot der Website" },
        ],
      },
    ],
    images: [{ src: "/images/projects/websites/albertopla.webp", alt: "Alberto Pla" }],
    cardVideo: "/mauricio/websites/alberto-pla/alberto-pla-walkthrough.mp4",
  },
  {
    slug: "neurodiatermia",
    pillar: "webs",
    title: "Neurodiatermia",
    tagline: "Website für eine regenerative Therapiemethode, mit Ausbildung und einem Verband von Therapeuten.",
    tags: ["Unternehmenswebsite", "Gesundheit"],
    meta: [{ label: "Rolle", value: "Design und Entwicklung" }],
    tools: ["WordPress", "Adobe Photoshop", "Illustrator", "Premiere", "After Effects", "Claude", "ChatGPT", "Figma", "Higgsfield"],
    summary: [
      "Design und Entwicklung der Website von Neurodiatermia, Terapia Combinada Avanzada: Vorstellung der Methode, Verband zertifizierter Fachkräfte und Ausbildung. Neurodiatermia ist keine Klinik und behandelt keine Patienten, sondern ist die Methode, die für die Physiotherapie-Branche entwickelt wurde. Verkauft werden die Ausbildung und die Zertifizierung an Physiotherapeuten.",
    ],
    sections: [
      {
        heading: "Der geschäftliche Kontext",
        paragraphs: [
          "Die alte Website konvertierte nicht und vermittelte nicht die Seriosität, die es braucht, um eine Methode vorzustellen, die von einem internationalen Verband mit offiziell zertifizierten Ausbildern getragen wird.",
        ],
      },
      {
        heading: "Wichtige Entscheidungen",
        paragraphs: [
          "Getrennte Navigation für Patienten und Therapeuten, wobei das eigentliche Ziel der Website war, Therapeuten anzusprechen. Es sind zwei Zielgruppen mit gegensätzlichen Bedürfnissen: Die eine will verstehen, was die Methode ist, die andere will sich darin ausbilden und zertifizieren lassen, und genau diese zweite Gruppe musste Neurodiatermia wirklich überzeugen.",
        ],
      },
      {
        heading: "Was geliefert wurde",
        paragraphs: [
          "Eine Startseite mit einem starken Bild und getrennter Navigation für zwei unterschiedliche Zielgruppen: Patienten (was die Methode ist) und Therapeuten (Verband und Ausbildung).",
        ],
        images: [{ src: "/mauricio/websites/neurodiatermia/neurodiatermia-mockup.webp", alt: "Neurodiatermia: Website" }],
      },
    ],
    images: [{ src: "/mauricio/websites/neurodiatermia/neurodiatermia-hero.jpg", alt: "Neurodiatermia: Startseite" }],
  },
  {
    slug: "whistler",
    pillar: "webs",
    title: "Whistler Ski Experience",
    tagline: "Website für Ski- und Unterkunftspakete in Whistler, Kanada.",
    tags: ["Tourismus", "Buchungen"],
    meta: [{ label: "Rolle", value: "Design und Entwicklung" }],
    tools: ["WordPress", "Adobe Photoshop", "Illustrator", "Premiere", "After Effects", "Claude", "ChatGPT", "Figma", "Higgsfield"],
    summary: [
      "Design und Entwicklung der Website von Whistler Ski Experience: Skipakete, Unterkunft und Aktivitäten, mit Fokus auf actionreiche Bilder, um das Erlebnis schon vor der Buchung zu vermitteln.",
    ],
    sections: [
      {
        heading: "Der geschäftliche Kontext",
        paragraphs: [
          "Die alte Website konvertierte nicht, für jede Änderung waren sie auf einen Entwickler angewiesen, und sie mussten genauso solide wirken wie deutlich größere Reiseagenturen.",
          "Whistler Ski Experience organisiert seit über 10 Jahren maßgeschneiderte Reisen, mit echten Kundenbewertungen, die die persönliche Betreuung hervorheben, bis hin zu Gruppen von 17 Personen, die für eine einzige Reise koordiniert wurden. Die Website musste dieses Vertrauen vermitteln, bevor jemand bucht.",
        ],
      },
      {
        heading: "Wichtige Entscheidungen",
        paragraphs: [
          "Der Hero-Bereich verkauft Erlebnis und Adrenalin, nicht den Preis: actionreiche Vollbildbilder, denn was zur Buchung einer solchen Reise führt, ist, das Erlebnis zu spüren, bevor man die Zahl sieht.",
          "Das Gesamtpaket umfasst deutlich mehr als Ski: Hotelbuchung (mit eigener Bildergalerie), Ski- und Schlittenaktivitäten wie Dog-Sledding, Transport und Abholung vom Flughafen, dazu separate Buchungen für Lehrer und Einzelunterricht (Ski, Longboard). Die Website musste all das ordnen, ohne wie ein generischer Tourismuskatalog zu wirken.",
        ],
      },
      {
        heading: "Was geliefert wurde",
        paragraphs: [
          "Ein Hero-Bereich mit actionreichen Vollbildbildern und zwei klaren Handlungsaufforderungen (Aktivitäten / Hotels), gedacht für zwei unterschiedliche Besuchertypen.",
        ],
        images: [{ src: "/mauricio/websites/whistler/whistler-mockup.webp", alt: "Whistler Ski Experience: Website" }],
      },
    ],
    images: [{ src: "/mauricio/websites/whistler/whistler-hero.jpg", alt: "Whistler Ski Experience: Startseite" }],
  },
  {
    slug: "juguettos",
    pillar: "webs",
    title: "Juguettos",
    tagline: "UI/UX-Redesign-Vorschlag für den E-Commerce einer Kette mit über 280 Filialen in Spanien.",
    tags: ["E-Commerce", "Kinder-Einzelhandel", "Vorschlag"],
    meta: [
      { label: "Rolle", value: "UI/UX-Design (Vorschlag, als Subunternehmer für eine Agentur)" },
      { label: "Dauer", value: "Erste 3 Wochen im April 2025" },
    ],
    tools: ["Figma", "Adobe Photoshop", "Illustrator", "Premiere", "After Effects", "Canva"],
    summary: [
      "Entwicklung eines UI/UX-Redesign-Vorschlags für den Onlineshop von Juguettos, einer spanischen Spielwarenkette mit über 280 Filialen. Die Arbeit erfolgte als Subunternehmer für eine Agentur, die Juguettos als Kunden hatte. Die Agentur entschied sich am Ende für einen anderen Designvorschlag als den von Mauricio, weshalb dieser nie umgesetzt wurde.",
    ],
    sections: [
      {
        heading: "Der geschäftliche Kontext",
        paragraphs: [
          "Als Kette mit über 280 Filialen lag die Annahme nahe, dass jede Aktualisierung von Katalog und Aktionen online von einem Entwickler abhing, etwas, das bei dieser Größe kaum tragfähig ist. Das war die Ausgangshypothese, nicht etwas, das direkt vom Kunden bestätigt wurde, da die Beziehung über die Agentur lief.",
        ],
      },
      {
        heading: "Wichtige Entscheidungen",
        paragraphs: [
          "Die zentrale Entscheidung war, den Kauftrichter zu vereinfachen, ihn im Grunde einfacher zu machen als Brot zu kaufen: Filtern nach Interesse, Alter und Spielzeugtyp, statt durch generische Kategorien zu navigieren. Diese Filterlogik war eine eigene Entscheidung.",
          "Die visuelle Identität (Farben, Typografie) gehörte bereits zur Marke Juguettos und war keine hier getroffene Designentscheidung: Die Arbeit betraf Struktur und Kauferlebnis auf Basis dieser bereits vorgegebenen visuellen Grundlage.",
        ],
      },
      {
        heading: "Was vorgeschlagen wurde",
        paragraphs: [
          "Eine Startseite mit hervorgehobenen Aktionen, ein Favoriten-Bereich mit Produkt-Carousel und eine Produktseite mit Galerie, Lagerbestand und empfohlenen Produkten, sowohl auf Desktop als auch mobil.",
        ],
        images: [
          { src: "/mauricio/websites/juguettos/juguettos-hero.webp", alt: "Juguettos: Startseite" },
          { src: "/mauricio/websites/juguettos/juguettos-favoritos.png", alt: "Juguettos: Favoriten" },
          { src: "/mauricio/websites/juguettos/juguettos-detalle.webp", alt: "Juguettos: Produktseite" },
          { src: "/mauricio/websites/juguettos/juguettos-producto-mobile.png", alt: "Juguettos: Produktseite mobil" },
        ],
      },
    ],
    images: [{ src: "/mauricio/websites/juguettos/juguettos-fanzone.webp", alt: "Juguettos: Fan Zone, Produktkatalog" }],
  },
  {
    slug: "mic-web",
    pillar: "webs",
    title: "MIC",
    tagline: "Katalogplattform für TV-Sender für Kabelbetreiber in Lateinamerika.",
    tags: ["B2B-Plattform", "Webdesign"],
    meta: [
      { label: "Kunde", value: "Manager International Channels" },
      { label: "Website", value: "mic.pe" },
      { label: "Dauer", value: "Erste 3 Wochen im Juni" },
    ],
    tools: ["Claude", "Claude Code", "Adobe Photoshop", "Illustrator", "Figma", "Canva", "Higgsfield", "Vercel", "GitHub", "n8n"],
    summary: [
      "Design und Entwicklung der Website von MIC (Manager International Channels), einem peruanischen TV-Distributor: Senderkatalog, Betreiberprofil und Angebotsablauf.",
      "MIC ist außerdem einer meiner Automatisierungs-Cases bei Kopfwerk. Diese Arbeit ist unabhängig davon, siehe den Bereich Automatisierung.",
    ],
    sections: [
      {
        heading: "Der geschäftliche Kontext",
        paragraphs: [
          "Die alte Website war veraltet, konvertierte nicht, und für jede Änderung waren sie auf einen Entwickler angewiesen, während sie mit deutlich größeren TV-Distributoren in der Region konkurrierten.",
        ],
      },
      {
        heading: "Wichtige Entscheidungen",
        paragraphs: [
          "Der Katalog wurde nach Signaltyp organisiert, nicht nach Land oder Preis. MIC ist in ganz Lateinamerika tätig, sodass das Land des Betreibers weniger wichtig ist als der benötigte Signaltyp; der Preis wird über das Vertriebsteam von Fall zu Fall mit jedem Betreiber verhandelt und ist kein fester Wert, nach dem man filtern könnte. Diese Logik hatte der Kunde bereits, sie wurde als richtig bestätigt und beibehalten, nicht neu erfunden.",
        ],
      },
      {
        heading: "Was geliefert wurde",
        paragraphs: [
          "Eine nach Signaltyp navigierbare Katalogstruktur, Senderprofile und ein Angebotsablauf für Kabelbetreiber, die ein Angebot schnell bewerten müssen.",
        ],
        walkthrough: { src: "/mauricio/websites/mic/mic-walkthrough.mp4", caption: "Rundgang durch den Katalog" },
        images: [
          { src: "/mauricio/websites/mic/mic-mockup-monitor.webp", alt: "MIC: Senderkatalog" },
          { src: "/mauricio/websites/mic/mic-cotizacion.png", alt: "MIC: Angebotsablauf" },
          { src: "/mauricio/websites/mic/mic-mockup-dashboard.webp", alt: "MIC: Analyse-Dashboard der Website" },
        ],
      },
    ],
    images: [{ src: "/mic-logo.webp", alt: "MIC" }],
    externalUrl: "https://mic.pe",
    externalLabel: "mic.pe ansehen",
    cardVideo: "/mauricio/websites/mic/mic-walkthrough.mp4",
  },
  {
    slug: "barbara-deluxe",
    pillar: "webs",
    title: "Barbara Deluxe",
    tagline: "Website für eine Kosmetik- und Ästhetikpraxis in Deutschland.",
    tags: ["Unternehmenswebsite", "Kosmetik"],
    meta: [{ label: "Rolle", value: "Design und Entwicklung" }],
    tools: ["WordPress", "Adobe Photoshop", "Illustrator", "Premiere", "After Effects", "ChatGPT", "Higgsfield"],
    summary: [
      "Design und Entwicklung der Website der Kosmetikpraxis BarbaraDeluxe (Augsburg): Shop, Behandlungen, ein Bereich über die Spezialistin und Blog.",
    ],
    sections: [
      {
        heading: "Der geschäftliche Kontext",
        paragraphs: [
          "Es gab keine Website: Kunden wurden ohne eigenen Kanal betreut, um Behandlungen zu zeigen oder Produkte online zu verkaufen, im Wettbewerb mit anderen lokalen Praxen (Massage, Nägel, Spa) in Augsburg, die eher einfach warben, über Mundpropaganda und Schilder vor Ort.",
          "Neben den Behandlungen und physischen Kosmetikprodukten verkauft die Inhaberin auch ihre eigenen digitalen Produkte und Texte. Eine eigene Website war also nicht nur ein weiterer Verkaufskanal, sondern eine naheliegende Art, beide Seiten des Geschäfts an einem Ort zusammenzubringen.",
        ],
      },
      {
        heading: "Wichtige Entscheidungen",
        paragraphs: [
          "Knappes Budget: Es ist ein gerade erst startendes lokales Geschäft, daher wurde bewusst wenig in Design investiert und stattdessen priorisiert, dass es funktioniert, also ein Checkout, der läuft, wichtiger als der visuelle Feinschliff.",
          "Der Code der Website wurde mit ChatGPT geschrieben, Anfang 2025, als das Tool beim Programmieren noch recht eingeschränkt war. Das Ergebnis ist bemerkenswert, wenn man diese Einschränkung zu dem Zeitpunkt bedenkt.",
        ],
      },
      {
        heading: "Was geliefert wurde",
        paragraphs: [
          "Eine Navigationsstruktur nach Behandlungen und ein Produktshop, mit einer Startseite, die Ruhe und Fürsorge vermitteln soll, passend zur Branche.",
          "Nebenbei bemerkt: BarbaraDeluxe verkauft in ihrer Praxis exklusiv die Produkte von Germanya Naturkosmetik, derselben Naturkosmetikmarke, die als mein erster E-Commerce-Case erscheint, außerdem in Social Media und in Automatisierung.",
        ],
        images: [
          { src: "/mauricio/websites/barbaradeluxe/barbaradeluxe-treatment-3.jpg", alt: "Barbara Deluxe: Wellness-Behandlung" },
          { src: "/mauricio/websites/barbaradeluxe/barbaradeluxe-hero.jpg", alt: "Barbara Deluxe: Startseite" },
        ],
      },
    ],
    images: [{ src: "/mauricio/websites/barbaradeluxe/barbaradeluxe-treatment-1.jpg", alt: "Barbara Deluxe: Hydrafacial-Behandlung" }],
  },

  // ── SOCIAL MEDIA ────────────────────────────────────────────────────
  {
    slug: "caso-exclusive-art",
    pillar: "social",
    title: "Exclusive European Art",
    tagline: "57.314 Aufrufe in 2 Monaten und der erste Verkauf eines Originalwerks.",
    tags: ["Social Media", "Kunst", "Generative KI"],
    meta: [
      { label: "Typ", value: "Bezahltes Praktikum" },
      { label: "Zeitraum", value: "Juni bis Juli 2026" },
      { label: "Ergebnis", value: "400 → 1.635 Follower" },
    ],
    tools: ["Shopify"],
    outcomes: [
      { value: "57.314", label: "Aufrufe in 2 Monaten" },
      { value: "400 → 1.635", label: "Follower" },
      { value: "1. Verkauf", label: "Eines Originalwerks (kein Druck)" },
    ],
    summary: [
      "Produktion von Video und Bildern mit generativer KI für Marketingkampagnen einer Kunstgalerie. Zusätzlich habe ich beim E-Commerce in Shopify und beim Webdesign unterstützt.",
    ],
    sections: [
      {
        heading: "Das Problem",
        paragraphs: ["Die Galerie musste hochwertig wirken und ihre Reichweite steigern, um verkaufen zu können. Ohne das bewegte sich kein einziges Werk."],
      },
      {
        heading: "Ergebnis",
        paragraphs: [
          "57.314 kombinierte Aufrufe in 2 Monaten.",
          "Wachstum des Accounts von 400 auf 1.635 Follower.",
          "Die Galerie erzielte ihren ersten Verkauf eines Originalwerks (kein Druck), etwas, das ihnen vorher nie gelungen war.",
        ],
      },
    ],
    images: [{ src: "/mauricio/contenido/exclusive/exclusive-hero.jpg", alt: "Exclusive European Art: in der Galerie" }],
    heroPosition: "center 48%",
    cardVideo: "/mauricio/contenido/exclusive/eea-mauricio.mp4",
    clips: [
      { src: "/mauricio/contenido/exclusive/eea-mauricio.mp4", caption: "In der Galerie" },
      { src: "/mauricio/contenido/exclusive/eea-reveal.mp4", caption: "Enthüllung des Werks" },
      { src: "/mauricio/contenido/exclusive/eea-monalisa.mp4", caption: "Der Hook: die Mona Lisa" },
    ],
  },
  {
    slug: "bau-mit-mau",
    pillar: "social",
    title: "Bau mit Mau",
    tagline: "Meine Personal Brand, und wie ich sie nutze, um Kunden zu Kopfwerk zu bringen.",
    tags: ["Personal Brand", "Content"],
    meta: [
      { label: "Typ", value: "Personal Brand" },
      { label: "Seit", value: "März 2026" },
    ],
    outcomes: [
      { value: "473", label: "Follower auf TikTok" },
      { value: "110", label: "Follower auf Instagram" },
      { value: "+140K", label: "Aufrufe insgesamt über beide Profile" },
    ],
    summary: [
      "Bau mit Mau ist meine persönliche Content-Marke. Ich nutze sie als direkten Kanal, um Kunden zu Kopfwerk zu bringen: Dort teste ich Formate, Blickwinkel und Hooks, bevor ich sie für Kunden skaliere.",
    ],
    sections: [
      {
        heading: "Das Problem",
        paragraphs: ["Davor hatte ich weder Verkäufe noch Leads: Niemand kannte mich, also kaufte auch niemand bei mir."],
      },
      {
        heading: "Wie ich sie nutze",
        paragraphs: [
          "Es ist mein Content-Labor: Alles, was ich später als Content-Erstellungsservice bei Kopfwerk anbiete, habe ich zuerst hier getestet.",
        ],
      },
    ],
    images: [{ src: "/mauricio/contenido/baumitmau/baumitmau-1.webp", alt: "Bau mit Mau" }],
    cardVideo: "/mauricio/contenido/baumitmau/bmm-3d.mp4",
    clips: [
      { src: "/mauricio/contenido/baumitmau/bmm-web.mp4", caption: "Über Code und Websites" },
      { src: "/mauricio/contenido/baumitmau/bmm-zara.mp4", caption: "Mit KI erstellte Kampagne" },
      { src: "/mauricio/contenido/baumitmau/bmm-3d.mp4", caption: "3D-Animation" },
      { src: "/mauricio/contenido/baumitmau/bmm-vibecode.mp4", caption: "Vibe Coding" },
    ],
  },
  {
    slug: "ayori",
    pillar: "social",
    title: "Ayori",
    tagline: "Lifestyle-Content für eine deutsche Sportbekleidungsmarke, ohne Fotoshooting.",
    tags: ["KI-Content", "Lifestyle", "Higgsfield"],
    meta: [
      { label: "Kunde", value: "Ayori (über Kopfwerk)" },
      { label: "Typ", value: "Echter Kunde, keine persönliche Exploration" },
      { label: "Dauer", value: "Erste 2 Wochen im Juli" },
    ],
    tools: ["Higgsfield"],
    summary: [
      "Ayori ist Kunde von Kopfwerk. Ich habe den Lifestyle-Content der Kampagne mit Higgsfield erstellt, statt ein klassisches Fotoshooting zu organisieren: gleiche Markenziele, ein anderer Produktionsprozess.",
    ],
    sections: [
      {
        heading: "Das Problem",
        paragraphs: [
          "Sie mussten genauso solide wirken wie deutlich größere Sportmarken, ohne das Budget für eine klassische Fotoproduktion.",
        ],
      },
      {
        heading: "Was gemacht wurde",
        paragraphs: [
          "Erstellung von Lifestyle- und Produktbildern, die zur visuellen Identität der Marke passen, gedacht für Social Media und Katalog.",
        ],
        images: [
          { src: "/ayori-2.webp", alt: "Ayori: 2" },
          { src: "/ayori-3.webp", alt: "Ayori: 3" },
          { src: "/ayori-4.webp", alt: "Ayori: 4" },
          { src: "/mauricio/ia/ayori/ayori-lifestyle-1.webp", alt: "Ayori: Lifestyle 1" },
          { src: "/mauricio/ia/ayori/ayori-lifestyle-2.webp", alt: "Ayori: Lifestyle 2" },
          { src: "/mauricio/ia/ayori/ayori-product-1.webp", alt: "Ayori: Produkt" },
        ],
      },
      {
        heading: "Status",
        paragraphs: [
          "Die Kampagne ist noch nicht offiziell gestartet, daher gibt es noch keine Reichweitenzahlen zu teilen. Was sich jetzt schon messen lässt, ist die Ersparnis: Diesen Content mit KI zu produzieren kostete die Marke einen Bruchteil dessen, was ein klassisches Fotoshooting gekostet hätte.",
        ],
      },
    ],
    images: [{ src: "/ayori-1.webp", alt: "Ayori: 1" }],
    heroPosition: "center 55%",
  },
  {
    slug: "caso-germanya",
    pillar: "social",
    title: "Germanya",
    tagline: "Von 0 auf über 50 aktive Kunden, mit stets begrenztem Budget.",
    tags: ["Social Media", "Shopify", "Meta Ads"],
    meta: [
      { label: "Kunde", value: "Germanya Naturkosmetik" },
      { label: "Seit", value: "Mai 2024 · laufend" },
      { label: "Rolle", value: "Freelance / Kopfwerk" },
    ],
    tools: ["Shopify", "Meta Ads", "Google Ads", "Illustrator", "Premiere", "After Effects", "Claude Code", "KI zum Clip-Schnitt (Podcasts/lange Videos)"],
    outcomes: [
      { value: "0 → 50+", label: "Aktive Kunden" },
      { value: "2+ Jahre", label: "Kundenbeziehung" },
    ],
    summary: [
      "Germanya ist seit Mai 2024 Kunde. Ich habe den kompletten E-Commerce in Shopify von Grund auf aufgebaut, inklusive Customer Journey und Conversion-Strategie, und danach den Social-Media-Account von 0 auf über 50 aktive Kunden skaliert.",
    ],
    sections: [
      {
        heading: "Das Problem",
        paragraphs: ["Vor dieser Arbeit hatte Germanya keine Social-Media-Präsenz."],
      },
      {
        heading: "Was gemacht wurde",
        paragraphs: [
          "E-Commerce: vollständiges Design und Entwicklung in Shopify, wobei Customer Journey und Conversion-Strategie bereits in der Struktur der Website mitgedacht wurden, nicht nachträglich ergänzt.",
          "Social Media und Content: Planung, Schnitt und Carousels mit KI, wodurch der Account von 0 auf über 50 aktive Kunden skaliert wurde.",
          "Paid Ads: Kampagnen auf Meta Ads und Google Ads.",
          "Über 2 Jahre Kundenbeziehung, in denen Automatisierungslösungen für Content gefunden wurden, angepasst an ein begrenztes Budget. Die Arbeit bestand hier immer darin, jeden Euro so weit wie möglich zu nutzen, nicht mehr auszugeben.",
        ],
        images: [
          { src: "/mauricio/automatizacion/germanya/germanya-web.jpg", alt: "Germanya: Website-Detail" },
          { src: "/mauricio/automatizacion/germanya/germanya-content-1.jpg", alt: "Germanya: IG-Content 1" },
          { src: "/mauricio/automatizacion/germanya/germanya-content-2.jpg", alt: "Germanya: IG-Content 2" },
          { src: "/mauricio/automatizacion/germanya/germanya-content-3.jpg", alt: "Germanya: IG-Content 3" },
        ],
      },
    ],
    images: [{ src: "/images/projects/websites/germanya.webp", alt: "Germanya: Shop" }],
  },

  // ── GENERATIVE KI ───────────────────────────────────────────────────
  {
    slug: "azaro",
    pillar: "ia",
    title: "Azaro",
    tagline: "Editorial-Kampagne für Parfüm, zu 100 Prozent mit KI erstellt.",
    tags: ["Generative KI", "Parfüm", "Editorial"],
    meta: [
      { label: "Typ", value: "Übungsprojekt, kein echter Kunde" },
      { label: "Dauer", value: "2 Tage" },
    ],
    tools: ["Higgsfield", "Claude"],
    summary: [
      "Editorial-Szenen für Parfüm mit filmischer Beleuchtung und natürlicher Atmosphäre, markentreu, ohne physisches Fotoshooting.",
    ],
    sections: [
      {
        heading: "Was gemacht wurde",
        paragraphs: [
          "Art Direction und Bildgenerierung mit KI: Komposition, Licht und Textur wurden Aufnahme für Aufnahme ausgearbeitet, um einen editorialen Standard zu halten, statt ein generisches Prompt-Ergebnis.",
        ],
        images: [
          { src: "/images/projects/content/azzaro-2.webp", alt: "Azaro: 2" },
          { src: "/images/projects/content/azzaro-3.webp", alt: "Azaro: 3" },
          { src: "/images/projects/content/azzaro-4.webp", alt: "Azaro: 4" },
          { src: "/images/projects/content/azzaro-5.webp", alt: "Azaro: 5" },
        ],
      },
    ],
    images: [{ src: "/images/projects/content/azzaro-1.webp", alt: "Azaro: 1" }],
  },
  {
    slug: "vicinity",
    pillar: "ia",
    title: "Vicinity",
    tagline: "Fotorealistisches Produkt in urbanem Kontext, mit KI erstellt.",
    tags: ["Generative KI", "Produkt"],
    meta: [
      { label: "Typ", value: "Übungsprojekt, kein echter Kunde" },
      { label: "Dauer", value: "2 Tage" },
    ],
    tools: ["Higgsfield", "Claude"],
    summary: [
      "Fotorealistische Produktszenen in echten urbanen Umgebungen, mit konsistenter Marke, Licht und Textur von Aufnahme zu Aufnahme.",
    ],
    sections: [
      {
        heading: "Was gemacht wurde",
        paragraphs: [
          "Szenen- und Kompositionsgenerierung, die darauf ausgelegt ist, dass jedes Bild derselben Prüfung standhält wie ein echtes Foto: stimmige Schatten, korrekte Reflexionen, glaubwürdige Materialtextur.",
        ],
        images: [
          { src: "/images/projects/content/vicinity-2.webp", alt: "Vicinity: 2" },
          { src: "/images/projects/content/vicinity-3.webp", alt: "Vicinity: 3" },
          { src: "/images/projects/content/vicinity-4.webp", alt: "Vicinity: 4" },
        ],
      },
    ],
    images: [{ src: "/images/projects/content/vicinity-1.webp", alt: "Vicinity: 1" }],
  },
  {
    slug: "new-balance",
    pillar: "ia",
    title: "New Balance",
    tagline: "Produkt in Bewegung, Wasser- und Terrainphysik mit KI erstellt.",
    tags: ["Generative KI", "Produkt", "Bewegung"],
    meta: [
      { label: "Typ", value: "Übungsprojekt, kein echter Kunde" },
      { label: "Dauer", value: "2 Tage" },
    ],
    tools: ["Higgsfield", "Claude"],
    summary: [
      "Produktsequenzen in Bewegung mit realistischer Wasser- und Terrainphysik, kampagnenfertig, ohne physisches Shooting oder Location.",
    ],
    sections: [
      {
        heading: "Was gemacht wurde",
        paragraphs: [
          "Die technische Herausforderung war hier die Physik: dass Wasser, Staub und Untergrund sich in Bewegung glaubwürdig verhalten, nicht nur, dass das Produkt im Stand gut aussieht.",
        ],
        images: [
          { src: "/images/projects/content/newbalance-2.webp", alt: "New Balance: 2" },
          { src: "/images/projects/content/newbalance-3.webp", alt: "New Balance: 3" },
          { src: "/images/projects/content/newbalance-4.webp", alt: "New Balance: 4" },
        ],
      },
    ],
    images: [{ src: "/images/projects/content/newbalance-1.webp", alt: "New Balance: 1" }],
  },

  // ── AUTOMATISIERUNG ─────────────────────────────────────────────────
  {
    slug: "caso-mic",
    pillar: "automatizacion",
    title: "MIC",
    tagline: "160 eingesparte Stunden im Monat, 100 Prozent Kundenzufriedenheit.",
    tags: ["Automatisierung", "n8n", "Clay.com", "CRM"],
    meta: [
      { label: "Kunde", value: "Manager International Channels" },
      { label: "Seit", value: "Juni 2026 · laufend" },
      { label: "Ergebnis", value: "160 Std./Monat gespart · 100% Zufriedenheit" },
    ],
    tools: ["n8n", "Clay.com", "Brevo", "Odoo"],
    outcomes: [
      { value: "160 Std./Monat", label: "Gemeinsam vom Team eingespart" },
      { value: "100%", label: "Kundenzufriedenheit" },
    ],
    summary: [
      "MIC ist ein peruanischer TV-Distributor und seit Juni 2026 Kunde von Kopfwerk. Ich habe ein Automatisierungssystem für das Vertriebs- und Operations-Team entwickelt, das heute gemeinsam 160 Stunden im Monat einspart.",
      "Ich habe eine frühere Verbindung zu MIC: Ich war dort 2019 Praktikant im Grafikdesign. Dieser Case Study handelt von der aktuellen Automatisierungsarbeit, aber diese langfristige Verbindung ist mit ein Grund, warum sie den gesamten Vertriebsprozess einem einzigen System anvertrauen.",
    ],
    sections: [
      {
        heading: "Was gebaut wurde",
        paragraphs: [
          "Lead-Recherche in n8n, integriert mit Clay.com für das Vertriebsteam, wodurch die manuelle Recherche zu jedem Prospect entfällt.",
          "Automatisierter Versand von Programmdaten (EPGs) an Kunden über Brevo.",
          "Automatischer wöchentlicher Vertriebsreport: zieht Daten aus dem CRM (Odoo), ordnet sie und verteilt sie per E-Mail an das zuständige Team, mit Pipeline-Phasen und wöchentlichem Umsatz und Gewinn.",
        ],
        images: [
          { src: "/mic-epg.webp", alt: "MIC: EPG-Versand" },
          { src: "/mic-report.webp", alt: "MIC: wöchentlicher Vertriebsreport" },
        ],
      },
      {
        heading: "Ergebnis",
        paragraphs: [
          "160 Stunden im Monat gemeinsam im gesamten Team eingespart, und 100 Prozent Kundenzufriedenheit.",
        ],
      },
    ],
    images: [{ src: "/mic-logo.webp", alt: "MIC" }],
  },
  {
    slug: "caso-as2-studio",
    pillar: "automatizacion",
    title: "AS² Studio",
    tagline: "Content-Automatisierung für einen E-Commerce in der Frühphase, in London.",
    tags: ["Automatisierung", "E-Commerce", "Apify", "Higgsfield"],
    meta: [
      { label: "Kunde", value: "AS² Studio (London)" },
      { label: "Seit", value: "Mai 2026 · aktuell pausiert" },
    ],
    tools: ["Apify", "Higgsfield", "Gmail", "Instagram Graph API"],
    summary: [
      "AS² Studio ist ein E-Commerce-Unternehmen in der Frühphase mit begrenztem Budget. Der Fokus lag hier nicht auf dem Spektakulären, sondern darauf, mit den vorhandenen Ressourcen das effizienteste System zu finden.",
    ],
    sections: [
      {
        heading: "Das Problem",
        paragraphs: [
          "Sie mussten genauso solide wirken wie deutlich größere E-Commerce-Unternehmen. Sie hatten bereits Social-Media-Kanäle, aber sehr unorganisiert und ohne klare Strategie, was viel Zeit des Teams kostete.",
        ],
      },
      {
        heading: "Was gebaut wurde",
        paragraphs: [
          "Ein Content-Automatisierungssystem mit Apify für Scraping und Datensammlung, Higgsfield für die visuelle Generierung, einer Freigabeschleife über Gmail, damit der Kunde vor der Veröffentlichung prüfen kann, und der Instagram Graph API für die Verteilung.",
          "Das gesamte System ist so ausgelegt, dass es mit minimalem manuellem Eingriff seitens des Kunden funktioniert, entscheidend, wenn das Budget kein internes Content-Team erlaubt.",
        ],
      },
      {
        heading: "Status",
        paragraphs: [
          "Das Projekt ist aktuell pausiert, nicht aktiv. Während es lief, zeigte das System eine deutliche Zeitersparnis gegenüber dem vorherigen manuellen Prozess.",
        ],
      },
    ],
    images: [{ src: "/servicios-automation.jpg", alt: "AS² Studio: Automatisierungssystem" }],
  },
];

export function getProjectsByPillar(pillar: PillarKey) {
  return projects.filter((p) => p.pillar === pillar);
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  return { prev, next };
}
