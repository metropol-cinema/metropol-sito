import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: '1.5rem', screens: { '2xl': '1240px' } },
    extend: {
      fontFamily: {
        // Display editoriale (titoli film, intestazioni): Fraunces, spinta su
        // opsz alto e WONK attivo — è la voce del sito.
        display: ['var(--font-display)', 'Georgia', 'serif'],
        // Corpo e UI: Inter.
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        // Utility: Archivo. Occhielli, giorni, etichette — in maiuscolo spaziato
        // richiama le lettere mobili del quadro orario in cassa.
        utility: ['var(--font-utility)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Palette "sala buia, insegna d'oro". Il nero è caldo (non il blu-grigio
        // di GitHub): sotto le locandine un fondo neutro-caldo non compete.
        cinema: {
          bg: '#0B0B0D',
          'bg-deep': '#050506',
          surface: '#131316',
          'surface-2': '#1C1C21',
          border: '#2A2A31',
          'border-strong': '#3A3A44',
          text: '#F5F2EC',
          'text-muted': '#C8C3BA',
          'text-subtle': '#8E8981',
          // Oro dell'insegna: azione, orari, occhielli. Va SEMPRE con testo
          // scuro (text-cinema-bg) — contrasto ~11:1.
          ticket: '#F4B740',
          'ticket-hover': '#FFC94D',
          'ticket-dim': '#8A6A25',
          // Rosso sipario: rassegne e proiezioni fuori sala (Castello).
          curtain: '#8C1D18',
          'curtain-light': '#D9695F',
          // Blu di sistema: resta per skip-link e focus, fuori dalle superfici.
          accent: '#388BFD',
          'accent-hover': '#58A6FF',
          'accent-strong': '#1F6FEB',
          'accent-strong-hover': '#1857C7',
          success: '#3FB950',
          warning: '#E3B341',
          danger: '#F85149',
        },
      },
      letterSpacing: {
        // Occhielli e giorni della settimana: spaziatura da quadro orario.
        marquee: '0.28em',
      },
      keyframes: {
        // Cambio bobina: la slide entra con una dissolvenza lenta e un filo di
        // luce che sale. Disattivato da prefers-reduced-motion (globals.css).
        reelIn: {
          '0%': { opacity: '0', transform: 'scale(1.015)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        riseIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'reel-in': 'reelIn 700ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'rise-in': 'riseIn 600ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
