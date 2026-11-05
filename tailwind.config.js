/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        caja: {
          blue: '#002559',
          blueDark: '#001c47',
          blueLight: '#0A3B82',
          teal: '#01ACAD',
          tealDark: '#008b8c',
          tealLight: '#33BDBC',
          red: '#E30613',
          redDark: '#B8000C',
          gold: '#FFB800',
          bg: '#F4F7FB',
        }
      },
      fontFamily: {
        sans: ['Nunito', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
