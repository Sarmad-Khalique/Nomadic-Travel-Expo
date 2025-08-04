/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'merriweather-bold': ['Merriweather-Bold'],
        'poppins-regular': ['Poppins-Regular'],
        
      },
      colors: {
        primary: '#38ADA7',
        shadow: '#267E75',
        complementary: '#FF6B6B',
        highlight: '#FFD700',
        background: '#B2DFDB',
        text: '#8E8E93',
        white: '#FFFFFF',
        black: '#000000',
      },
    },
  },
  plugins: [],
};
