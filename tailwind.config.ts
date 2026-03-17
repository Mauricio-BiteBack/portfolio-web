import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#ffffff",
        blue: {
          DEFAULT: "#2563EB",
          600: "#2563EB",
          500: "#3B82F6",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "sans-serif"],
        script: ["Dancing Script", "cursive"],
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.6s ease forwards",
      },
    },
  },
  plugins: [],
};
export default config;
