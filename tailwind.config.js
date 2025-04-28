/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        olive: {
          light: '#8B9B6E',
          DEFAULT: '#556B2F',
          dark: '#3B4A1F',
        },
        cream: '#FFFDF6',
        beige: '#F5F2E9',
      },
    },
  },
  plugins: [],
};