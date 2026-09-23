"use client";

import { useEffect, useRef, useState } from "react";

export function ProjectToc({ items }: { items: { id: string; label: string }[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav ref={ref} className="hidden lg:block sticky top-28 self-start">
      <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-black/40 mb-4">
        Auf dieser Seite
      </p>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-sm leading-snug transition-colors ${
                activeId === item.id ? "text-black font-semibold" : "text-black/45 hover:text-black/70"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
