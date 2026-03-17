"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const words = [
  { text: "analysieren.", blue: false },
  { text: "gestalten.", blue: false },
  { text: "entwickeln.", blue: true },
  { text: "umsetzen.", blue: false },
  { text: "optimieren.", blue: false },
  { text: "skalieren.", blue: false },
];

function AnimatedWord({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: { text: string; blue: boolean };
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / (total + 1);
  const end = (index + 1) / (total + 1);

  const opacity = useTransform(
    scrollYProgress,
    [start - 0.05, start + 0.05, end - 0.05, end + 0.05],
    [0.15, 1, 1, 0.15]
  );

  const y = useTransform(
    scrollYProgress,
    [start - 0.05, start + 0.05],
    ["20px", "0px"]
  );

  const color = useTransform(
    scrollYProgress,
    [start - 0.05, start + 0.05, end - 0.05, end + 0.05],
    ["#ffffff", "#3b82f6", "#3b82f6", "#ffffff"]
  );

  return (
    <motion.div
      style={{ opacity, y, color }}
      className="text-4xl md:text-5xl lg:text-6xl font-bold leading-snug"
    >
      {word.text}
    </motion.div>
  );
}

export default function AnimationSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-black"
      style={{ height: `${words.length * 100 + 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-8 md:px-16 flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-0">
          {/* Left label */}
          <div className="md:w-1/2 flex-shrink-0">
            <p className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-snug max-w-xs">
              Ich unterstütze
              <br />
              Unternehmen dabei:
            </p>
          </div>

          {/* Right: animated words */}
          <div className="md:w-1/2 flex flex-col gap-1">
            {words.map((word, i) => (
              <AnimatedWord
                key={word.text}
                word={word}
                index={i}
                total={words.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
