/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      colors: {
        background: "#09090b", // Zinc 950
        foreground: "#fafafa", // Zinc 50
        card: {
          DEFAULT: "#18181b", // Zinc 900
          foreground: "#fafafa",
        },
        muted: {
          DEFAULT: "#27272a", // Zinc 800
          foreground: "#a1a1aa", // Zinc 400
        },
        accent: {
          DEFAULT: "#6366f1", // Indigo 500
          foreground: "#fafafa",
        },
        border: "#27272a", // Zinc 800
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-.075em",
        tighter: "-.05em",
      },
    },
  },
  plugins: [],
};
