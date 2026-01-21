import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      colors: {
        "a-bg-primary": "#0E0E10",
        "a-surface": "#1A1C1F",
        "a-text-primary": "#F4F3EE",
        "a-accent-gold": "#C9A24D",
        "b-bg-primary": "#FAFAF8",
        "b-text-primary": "#2A2E34",
        "b-text-secondary": "#8A8F98",
        "b-accent-emerald": "#1F7A63",
        "b-border-soft": "#E6E8EC",
      },
      spacing: {
        "luxury": "clamp(3rem, 8vw, 8rem)",
        "luxury-section": "clamp(4rem, 10vw, 10rem)",
      },
      transitionDuration: {
        "luxury": "700ms",
        "luxury-slow": "1000ms",
      },
    },
  },
  plugins: [],
};

export default config;

