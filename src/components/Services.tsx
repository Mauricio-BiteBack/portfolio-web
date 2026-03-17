"use client";

const services = [
  {
    number: "01",
    title: "Websites",
    description:
      "Custom Websites & Landing Pages, die Vertrauen aufbauen und Leads konvertieren.",
  },
  {
    number: "02",
    title: "Design & Markenauftritt",
    description:
      "Deine Marke hat eine Geschichte. Ich gebe ihr ein Gesicht.",
  },
  {
    number: "03",
    title: "Digitales Marketing",
    description:
      "Gefunden werden von den richtigen Menschen zur richtigen Zeit.",
  },
  {
    number: "04",
    title: "KI & Content Creation",
    description:
      "Ich verwandle kreative Visionen in produktionsreife Visuals.",
  },
];

export default function Services() {
  return (
    <section className="bg-black py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-8 md:px-12">
        {/* Title */}
        <h2
          className="text-white font-black uppercase text-center mb-16 md:mb-24"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.01em" }}
        >
          DABEI KANN ICH HELFEN
        </h2>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-neutral-800">
          {services.map((service) => (
            <div key={service.number} className="px-6 lg:px-8 py-8 lg:py-0 first:pl-0 last:pr-0">
              {/* Big number */}
              <div
                className="text-neutral-700 font-bold italic mb-16"
                style={{ fontSize: "clamp(4rem, 8vw, 7rem)", lineHeight: 1 }}
              >
                {service.number}
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-lg mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-neutral-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
