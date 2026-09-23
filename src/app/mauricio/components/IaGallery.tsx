"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";

export function IaGallery({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:gap-6">
      {images.map((img, i) => {
        const isWide = i % 3 === 0;
        return (
          <Reveal key={img.src} delay={0.05 * i} className={isWide ? "col-span-2" : "col-span-1"}>
            <div
              className="group relative w-full overflow-hidden rounded-2xl bg-black/5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.35)]"
              style={{ aspectRatio: isWide ? "16 / 9" : "4 / 5" }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={isWide ? "(max-width: 1024px) 100vw, 1180px" : "(max-width: 1024px) 50vw, 570px"}
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
