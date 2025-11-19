import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0b0f1a",
        surface: "#111827",
        panel: "#4455da",
        brand: { 500: "#6366f1", 600: "#4f46e5" },
        "brand-deep": "#312f4b",
        "brand-deep-dark": "#26243a",
      },
      boxShadow: {
        soft: "0 10px 24px rgba(0,0,0,.18)",
      },
    },
  },
  plugins: [],
};

export default config;
