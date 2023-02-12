const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2em",
    },
    extend: {
      colors: {
        background: colors.amber["50"],
        foreground: colors.amber["900"],
        primary: colors.amber["600"],
      },
    },
  },
  variants: {
    borderWidth: ["responsive", "last", "hover", "focus"],
  },
  plugins: [],
};
