/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: colors.black,
        white: colors.white,
        primary: "#00DAC6",
        background: "#121212",
        "background-lighter": "#1E1E1E",
        text: "#E1E1E1",
        purple: "#C38FFF",
        red: "#D7654C",
        yellow: "#CEC718",
      },
      boxShadow: {
        top: "0 -15px 20px 0px rgba(0, 0, 0, 0.1)",
      },
      fontFamily: {
        sans: ["Poppins, sans-serif", ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(250px, 1fr));",
        "auto-fill": "repeat(auto-fill, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        "auto-fit": "repeat(auto-fit, minmax(0, 1fr))",
        "auto-fill": "repeat(auto-fill, minmax(0, 1fr))",
      },
      aspectRatio: {
        "3/4": "3 / 4",
      },
    },
  },

  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *")
      addVariant("child-hover", "& > *:hover")
    },
  ],
}
