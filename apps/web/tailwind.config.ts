import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cosmic: {
          background: "#030014",
          surface: "#0b0320",
          card: "#110732",
          border: "rgba(124, 58, 237, 0.35)",
          accent: "#a855f7",
          accentGlow: "rgba(168, 85, 247, 0.45)",
          highlight: "#f4f3ff",
          muted: "#9ba6d0",
          foreground: "#f8fafc"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "\"Segoe UI\"", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 40px rgba(168, 85, 247, 0.45)",
        aurora: "0 0 120px rgba(79, 70, 229, 0.25)"
      },
      backgroundImage: {
        "cosmic-gradient": "radial-gradient(120% 120% at 20% 10%, rgba(124, 58, 237, 0.4) 0%, rgba(3, 0, 20, 0.9) 60%, rgba(3, 0, 20, 1) 100%)",
        "cosmic-grid": "linear-gradient(120deg, rgba(124, 58, 237, 0.08) 0%, rgba(37, 99, 235, 0.06) 100%)"
      },
      borderRadius: {
        "4xl": "2.5rem"
      },
      spacing: {
        18: "4.5rem"
      }
    }
  },
  plugins: []
};

export default config;
