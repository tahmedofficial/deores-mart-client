/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "montserrat": "'Montserrat', sans-serif"
      },
      colors: {
        "primary_text_color": "#000000",
        "primary_bg_color": "#f2f2f2",
        "primary_card_color": "#f8f8f8",
      }
    },
  },
  plugins: [require('daisyui')],
}

