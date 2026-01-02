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
  safelist: [
    "btn",
    "btn-primary",
    "navbar",
    "text-primary-content",
    "bg-primary",
    "dropdown",
    "menu",
    "menu-horizontal",
    "menu-compact",
    "rounded-box",
    // dodaj inne klasy, które używasz z DaisyUI
  ],
};
