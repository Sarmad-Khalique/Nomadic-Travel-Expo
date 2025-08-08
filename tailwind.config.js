/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'sidebar-gradient-start': '#38ADA7',
        'sidebar-gradient-end': '#B2DFDB',
        'sidebar-active-subitem': '#38ADA7',
        primary: '#38ADA7',
        shadow: '#267E75',
        complementary: '#FF6B6B',
        highlight: '#FFD700',
        background: '#B2DFDB',
        text: '#8E8E93',
        white: '#FFFFFF',
        black: '#000000',
      },
      fontFamily: {
        'merriweather-bold': ['Merriweather-Bold'],
        'merriweather-regular': ['Merriweather-Regular'],
        'poppins-regular': ['Poppins-Regular'],
      },
    },
  },
  plugins: [],
};
