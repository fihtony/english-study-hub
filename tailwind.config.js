/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A73E8',
        secondary: '#34A853',
        background: '#FFFFFF',
        surface: '#F8F9FA',
        text: '#202124',
        'text-secondary': '#5F6368',
        border: '#DADCE0',
      },
      fontFamily: {
        sans: ['Work Sans', 'sans-serif'],
        body: ['Newsreader', 'serif'],
      },
      spacing: {
        'unit': '8px',
      },
    },
  },
  plugins: [],
}