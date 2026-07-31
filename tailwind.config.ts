import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '1.5rem', screens: { '2xl': '1200px' } },
    extend: {
      fontFamily: {
        // Display editoriale (titoli, nomi film, intestazioni): Fraunces.
        display: ['var(--font-display)', 'Georgia', 'serif'],
        // Corpo e UI: Inter.
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Palette "cinema dark" condivisa col gestionale, estesa per il sito
        // pubblico con l'oro "biglietto" (firma visiva dell'azione di acquisto).
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
          // Sfondi dei bottoni con testo bianco: contrasto AA ≥ 4.5:1
          // (#388BFD col bianco è solo 3.5:1).
          'accent-strong': '#1F6FEB',
          'accent-strong-hover': '#1857C7',
          // Oro "biglietto": azione primaria d'acquisto. Va SEMPRE con testo
          // scuro (text-cinema-bg) — contrasto ~10:1, ben oltre AA.
          ticket: '#F4B740',
          'ticket-hover': '#FFC94D',
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
