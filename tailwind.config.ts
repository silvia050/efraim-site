import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Azul profundo — cor principal: reverência, confiança, identidade institucional
        primary: {
          50: "#F0F4FA",
          100: "#DCE6F2",
          200: "#B9CCE5",
          300: "#8FACD1",
          400: "#5F86B8",
          500: "#3D659C",
          600: "#2C4E80",
          700: "#1F3A63",
          800: "#142847",
          900: "#0B1B30",
          950: "#060F1C",
          DEFAULT: "#142847",
        },
        // Dourado — cor de destaque: chamadas à ação, elementos de celebração
        gold: {
          50: "#FBF6E7",
          100: "#F5E9C2",
          200: "#EBD389",
          300: "#DFB94F",
          400: "#D4A52E",
          500: "#C0941F",
          600: "#A37A16",
          700: "#815F11",
          800: "#5F450C",
          900: "#3D2C08",
          DEFAULT: "#C0941F",
        },
        // Verde esmeralda — cor secundária: crescimento, vida, esperança
        emerald: {
          50: "#EAF6F0",
          100: "#CBE9DA",
          200: "#99D3B5",
          300: "#62B991",
          400: "#379D72",
          500: "#1F7D58",
          600: "#176547",
          700: "#124E38",
          800: "#0D3829",
          900: "#08231A",
          DEFAULT: "#1F7D58",
        },
      },
      fontFamily: {
        // Lora (serifada) carrega o peso institucional/espiritual em títulos
        display: ["var(--font-lora)", "Georgia", "serif"],
        // Inter (sem serifa) garante legibilidade em corpo de texto e UI
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
