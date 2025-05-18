/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        orange: '#FFBD59',
        black: '#323130',
        'gray-dark': '#273444',
        'gray-light': '#D9D9D9',
        brown: '#2F220E',
        'light-brown': '#997135',
      },
      fontFamily: {
        obold: ['Oxygen-Bold', 'sans-serif'],
        olight: ['Oxygen-Light', 'sans-serif'],
        oregular: ['Oxygen-Regular', 'sans-serif'],
        rthin: ['Roboto-Thin', 'sans-serif'],
        xbover: ['Overpass-ExtraBold', 'sans-serif'],
        bover: ['Overpass-Bold', 'sans-serif'],
        rover: ['Overpass-Regular', 'sans-serif'],
        lover: ['Overpass-Light', 'sans-serif'],
        mover: ['Overpass-Medium', 'sans-serif'],
        sover: ['Overpass-Thin', 'sans-serif'],
      }
    },
  },
  plugins: [],
}