/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: '#00D4C0',
          'cyan-dark': '#00b8a6',
          purple: '#a8c5fd',
          blue: '#00BFFF',
          dark: '#0a0f1e',
          'dark-2': '#1a2240',
          mid: '#4a5580',
          light: '#8892b0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderColor: {
        'brand-border': 'rgba(168,197,253,0.24)',
        'brand-border-2': 'rgba(10,15,30,0.08)',
      },
      screens: {
        'max-960': { max: '960px' },
      },
    },
  },
  plugins: [],
}
