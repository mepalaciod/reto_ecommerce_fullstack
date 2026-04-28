/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Manrope', 'sans-serif'],
        heading: ['Fraunces', 'serif'],
      },
      colors: {
        brand: {
          green: '#3b5d50',
          yellow: '#f9bf29',
          dark: '#2f2f2f',
          gray: '#6a6a6a',
          light: '#eff2f1',
          card: '#dce5e4',
          'card-bg': '#dce5e4'
        }
      },
      borderRadius: {
        dna: '10px'
      },
      boxShadow: {
        dna: '0 2px 8px rgba(0, 0, 0, 0.1)',
        'dna-lg': '0 8px 24px rgba(0, 0, 0, 0.15)',
        glow: '0 18px 40px rgba(59, 93, 80, 0.18)'
      }
    }
  },
  plugins: [],
}
