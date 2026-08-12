/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', "Georgia", "serif"],
        body: ['"Public Sans"', "system-ui", "sans-serif"],
        mono: ['"Courier Prime"', "Courier", "monospace"],
      },
      colors: {
        // Brand flame orange — the theme color; deep enough for white text (AA)
        flame: "#B93C15",
        "flame-deep": "#9E3211",
        "flame-bright": "#EE6C4D",
        // Buckram book cloth green — secondary register (nav, footer, select bands)
        cloth: "#1D4A40",
        "cloth-deep": "#14352E",
        // Clean paper neutrals — cards and content bands (no warm manila)
        paper: "#F3F1EC",
        "paper-bright": "#FDFCFA",
        "paper-shade": "#E1DED6",
        // Blue-black catalog ink
        ink: "#20313B",
        "ink-soft": "#51616B",
        // Rubber-stamp inks
        stamp: "#BE3A27",
        "stamp-blue": "#2F5A77",
      },
      boxShadow: {
        print: "0 1px 2px rgba(32,49,59,0.18), 0 6px 16px rgba(32,49,59,0.22)",
        "print-lg":
          "0 2px 4px rgba(32,49,59,0.16), 0 14px 34px rgba(32,49,59,0.28)",
        card: "0 1px 1px rgba(32,49,59,0.12), 0 4px 10px rgba(32,49,59,0.14)",
      },
    },
  },
};
