"use client";

import { motion } from "motion/react";

const LOGO_MAP: Record<string, string> = {
  WordPress: "/mauricio/logos/wordpress.svg",
  Figma: "/mauricio/logos/figma.svg",
  "Adobe Photoshop": "/mauricio/logos/adobephotoshop.svg",
  Illustrator: "/mauricio/logos/adobeillustrator.svg",
  Premiere: "/mauricio/logos/adobepremierepro.svg",
  "After Effects": "/mauricio/logos/adobeaftereffects.svg",
  Canva: "/mauricio/logos/canva.svg",
  Shopify: "/mauricio/logos/shopify.svg",
  Claude: "/mauricio/logos/claude.svg",
  "Claude Code": "/mauricio/logos/claude.svg",
  Vercel: "/mauricio/logos/vercel.svg",
  GitHub: "/mauricio/logos/github.svg",
  n8n: "/mauricio/logos/n8n.svg",
  Gmail: "/mauricio/logos/gmail.svg",
  "Instagram Graph API": "/mauricio/logos/instagram.svg",
  Brevo: "/mauricio/logos/brevo.svg",
  Odoo: "/mauricio/logos/odoo.svg",
  "Meta Ads": "/mauricio/logos/meta.svg",
  "Google Ads": "/mauricio/logos/googleads.svg",
  ChatGPT: "/mauricio/logos/openai.svg",
};

const badgeVariants = {
  rest: { backgroundColor: "#ffffff", scale: 1 },
  hover: { backgroundColor: "#0A0A0A", scale: 1.1 },
};

const iconVariants = {
  rest: { filter: "invert(0)" },
  hover: { filter: "invert(1)" },
};

const labelVariants = {
  rest: { opacity: 0, y: 6 },
  hover: { opacity: 1, y: 0 },
};

export function ToolIcons({ tools }: { tools: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {tools.map((tool) => {
        const logo = LOGO_MAP[tool];
        return (
          <motion.div key={tool} className="relative" initial="rest" whileHover="hover" animate="rest">
            <motion.div
              variants={badgeVariants}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="h-12 w-12 rounded-full border border-black/15 flex items-center justify-center overflow-hidden"
            >
              {logo ? (
                <motion.img
                  src={logo}
                  alt={tool}
                  variants={iconVariants}
                  transition={{ duration: 0.25 }}
                  className="h-5 w-5 object-contain"
                />
              ) : (
                <motion.span
                  variants={{ rest: { color: "#0A0A0A" }, hover: { color: "#ffffff" } }}
                  transition={{ duration: 0.25 }}
                  className="text-[11px] font-bold tracking-tight"
                >
                  {tool.slice(0, 2).toUpperCase()}
                </motion.span>
              )}
            </motion.div>

            <motion.span
              variants={labelVariants}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black px-2.5 py-1 text-[11px] font-medium text-white"
            >
              {tool}
            </motion.span>
          </motion.div>
        );
      })}
    </div>
  );
}
