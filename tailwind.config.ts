/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        opensans: ['"Open Sans"', "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      screens: {
        smMin: "340px",
        smMax: "767px",
      },
    },
  },
  plugins: [],
};
