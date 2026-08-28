/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#08080A',
          50: '#F5F5F6',
          100: '#E7E7EA',
          200: '#A0A0A8',
          300: '#75757E',
          400: '#57575F',
          500: '#3A3A40',
          600: '#26262B',
          700: '#1B1B1F',
          800: '#131316',
          900: '#0D0D0F',
          950: '#08080A',
        },
        violet: {
          DEFAULT: '#7C5CFF',
          50: '#F2EFFF',
          100: '#E4DEFF',
          200: '#C6B9FF',
          300: '#A78FFF',
          400: '#9070FF',
          500: '#7C5CFF',
          600: '#6845E8',
          700: '#5433C4',
          800: '#41279B',
          900: '#2E1B70',
        },
        signal: {
          live: '#4ADE80',
          progress: '#F5B14C',
          archived: '#75757E',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
        'radial-fade':
          'radial-gradient(circle at 50% 0%, rgba(124,92,255,0.14), rgba(8,8,10,0) 60%)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      borderRadius: {
        xl2: '1.25rem',
        card: '1.5rem',
      },
      boxShadow: {
        subtle: '0 1px 0 0 rgba(255,255,255,0.04) inset',
        lift: '0 12px 30px -12px rgba(0,0,0,0.55)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-node': {
          '0%, 100%': { opacity: 0.35, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.15)' },
        },
        'travel-dot': {
          '0%': { offsetDistance: '0%', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { offsetDistance: '100%', opacity: 0 },
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(14px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        'pulse-node': 'pulse-node 3.2s ease-in-out infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        shimmer: 'shimmer 2s linear infinite',
      },
      transitionTimingFunction: {
        signature: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
