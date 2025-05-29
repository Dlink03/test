/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          750: '#2a2f3a',
          650: '#3e4454',
        },
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'grow': 'grow 0.8s ease-out forwards',
        'draw-line': 'drawLine 1.5s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        grow: {
          '0%': { height: '0%' },
          '100%': { height: 'var(--height)' },
        },
        drawLine: {
          '0%': { 'stroke-dasharray': '1000', 'stroke-dashoffset': '1000' },
          '100%': { 'stroke-dasharray': '1000', 'stroke-dashoffset': '0' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};