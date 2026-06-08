import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '1.5rem', screens: { '2xl': '1200px' } },
    extend: {
      colors: {
        // Stessa palette "cinema dark" del gestionale, per coerenza visiva.
        cinema: {
          bg: '#0D1117',
          surface: '#161B22',
          'surface-2': '#21262D',
          border: '#30363D',
          text: '#F0F6FC',
          'text-muted': '#C9D1D9',
          'text-subtle': '#8B949E',
          accent: '#388BFD',
          'accent-hover': '#58A6FF',
          success: '#3FB950',
          warning: '#E3B341',
          danger: '#F85149',
        },
      },
    },
  },
  plugins: [],
};

export default config;
