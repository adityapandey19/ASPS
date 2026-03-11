/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { primary: "#0B0B0B", secondary: "#111111", card: "#141414" },
        accent: { blue: "#4F9DFF", green: "#3AE374", orange: "#FFA502", purple: "#9B59B6", red: "#FF4757" },
        border: { DEFAULT: "#222222" },
        text: { primary: "#FFFFFF", secondary: "#A0A0A0", muted: "#555555" },
      },
      fontFamily: {
        mono: ["Space Mono", "monospace"],
        body: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
