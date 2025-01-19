/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "sans-serif"], // Add Manrope as a custom font
      },
      colors: {
        customDark: "#0F141E", // Add custom dark color
        customDarkAlpha: "rgba(17, 24, 39, 0.75)", // Add custom dark color with alpha
        textDark: "#111827", // Add custom text dark color
      },
    },
  },
};
