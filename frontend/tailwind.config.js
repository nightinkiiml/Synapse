/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hell: {
          bg: '#0c0d0e',
          card: '#141618',
          cardHover: '#1c1f22',
          border: '#272a2e',
          red: '#e53e3e',
          redDark: '#9b2c2c',
          amber: '#dd6b20',
          textMuted: '#94a3b8',
          textSub: '#cbd5e1'
        }
      }
    },
  },
  plugins: [],
}
