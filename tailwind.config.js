/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7ff',
          100: '#b3ebff',
          200: '#80dfff',
          300: '#4dd3ff',
          400: '#1ac7ff',
          500: '#00a3e0', // Main accent color
          600: '#0088c2',
          700: '#006da3',
          800: '#005285',
          900: '#003766',
        },
        gray: {
          50: '#f5f6f8',
          100: '#e1e4e9',
          200: '#c4c9d1',
          300: '#a7aeb9',
          400: '#8b95a5',
          500: '#5c6470',
          600: '#4a5058',
          700: '#383c42',
          800: '#1a1d21',
          900: '#0f1419',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '6px',
      },
      maxWidth: {
        container: '1200px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
        'hero-entrance': 'fadeUp 0.7s ease forwards',
      },
      keyframes: {
        fadeUp: {
          from: {
            opacity: '0',
            transform: 'translateY(24px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          from: {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        'zoom-in': {
          from: {
            opacity: '0',
            transform: 'scale(0.96)',
          },
          to: {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
      transitionDuration: {
        400: '400ms',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.06)',
        'card-dark': '0 1px 3px rgba(0, 0, 0, 0.2)',
        'accent': '0 2px 8px rgba(0, 163, 224, 0.12)',
        'card-hover': '0 12px 24px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 163, 224, 0.12)',
        'card-hover-dark': '0 12px 24px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(0, 163, 224, 0.15)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}