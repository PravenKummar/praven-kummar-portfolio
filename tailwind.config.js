/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#0a0f1a",
          light: "#0f172a",
          card: "#1e293b",
        },
        accent: {
          blue: "#3b82f6",
          cyan: "#06b6d4",
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
