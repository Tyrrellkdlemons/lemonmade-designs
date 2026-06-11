/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lemon: { DEFAULT: "#FFD21A", soft: "#FFE36A", deep: "#E8B900" },
        navy: { DEFAULT: "#071A33", light: "#0C2747", lighter: "#123359" },
        electric: { DEFAULT: "#0EA5E9", soft: "#7DD3FC" },
        leaf: { DEFAULT: "#7ED957", deep: "#4CAF50" },
        cream: { DEFAULT: "#FFF8D6" },
        charcoal: { DEFAULT: "#050B13" }
      },
      fontFamily: {
        display: ["Baloo 2", "Fraunces", "Georgia", "serif"],
        body: ["Plus Jakarta Sans", "Outfit", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 210, 26, 0.25)",
        "glow-lg": "0 0 80px rgba(255, 210, 26, 0.35)",
        "glow-blue": "0 0 40px rgba(14, 165, 233, 0.25)",
        card: "0 10px 40px rgba(5, 11, 19, 0.45)"
      },
      backgroundImage: {
        "grid-blue":
          "linear-gradient(rgba(14,165,233,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.07) 1px, transparent 1px)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(3deg)" }
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" }
        },
        shine: {
          "0%": { transform: "translateX(-150%) skewX(-20deg)" },
          "100%": { transform: "translateX(250%) skewX(-20deg)" }
        },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        blink: { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0" } },
        "grid-move": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "48px 48px" }
        },
        "scroll-dot": {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "70%": { transform: "translateY(10px)", opacity: "0.2" }
        }
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 11s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        shine: "shine 2.8s ease-in-out infinite",
        "spin-slow": "spin-slow 24s linear infinite",
        blink: "blink 1s step-end infinite",
        "grid-move": "grid-move 6s linear infinite",
        "scroll-dot": "scroll-dot 1.8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
