import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%' : { trasnform: 'translateX(100%)'},
          '100%' : {transform: 'translateX(-100%)'}
        }
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
      }
    },
    fontFamily: {
      "nunito" : '"Nunito", sans-serif',
      "out" : '"Outfit", serif'
    }
  },
  plugins: [],
}
