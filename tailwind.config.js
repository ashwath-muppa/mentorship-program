/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Inter"', "sans-serif"],
        body: ['"Inter"', "sans-serif"],
      },
      colors: {
        brand: {
          navy: "#0B0F19",
          ink: "#0D1424",
          teal: "#0DF5D4",
          purple: "#9D4EDD",
          gold: "#FEE440",
          mist: "#E8F1FB",
        },
      },
      boxShadow: {
        soft: "0 24px 80px -32px rgba(0, 0, 0, 0.5)",
        neonTeal: "0 0 20px rgba(13, 245, 212, 0.3)",
        neonPurple: "0 0 20px rgba(157, 78, 221, 0.3)",
        neonGold: "0 0 20px rgba(254, 228, 64, 0.3)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(13, 245, 212, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(13, 245, 212, 0.05) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
