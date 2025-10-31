/** @type {import('tailwindcss').Config} */
module.exports = {
 
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1020px",
      xl: "1440px",
    },
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      spacing: {
        180: "32rem",
      },
      colors: {
        primary: "#1b9aaa", 
      },
    },
  },

 plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"], 
  },
}