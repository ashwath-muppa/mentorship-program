/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      colors: {
        "deep-navy": "#293241",
        "mid-blue": "#3D5A80",
        "steel-blue": "#98C1D9",
        ice: "#E0FBFC",
        coral: "#EE6C4D",
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "pulse-dot": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        coral: "0 0 30px rgba(238,108,77,0.35)",
        "coral-sm": "0 0 16px rgba(238,108,77,0.25)",
      },
    },
  },
  plugins: [],
};
