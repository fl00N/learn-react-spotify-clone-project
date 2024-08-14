/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Metropolis", "sans-serif"],
      },

      brightness: {
        65: '.65',
      }
    },
  },
  plugins: [],
}