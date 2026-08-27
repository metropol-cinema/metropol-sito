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
        // Alta leggibilità (Atkinson Hyperlegible): non si usa direttamente
        // nelle classi — la barra di accessibilità lo sostituisce ai tre
        // ruoli qui sopra ridefinendo le variabili (globals.css).
        readable: ['var(--font-readable)', 'Verdana', 'sans-serif'],
      },
      colors: {
        // Palette "sala buia, insegna d'oro". I valori veri stanno in
        // app/globals.css come variabili CSS: qui ci sono solo i nomi, così la
        // stessa classe (`bg-cinema-surface`) rende bene in tutti e quattro i
        // temi della barra di accessibilità. Canali RGB separati da spazi:
        // serve a far funzionare ancora i modificatori di opacità (`/90`).
        cinema: {
          bg: 'rgb(var(--c-bg) / <alpha-value>)',
          'bg-deep': 'rgb(var(--c-bg-deep) / <alpha-value>)',
          surface: 'rgb(var(--c-surface) / <alpha-value>)',
          'surface-2': 'rgb(var(--c-surface-2) / <alpha-value>)',
          border: 'rgb(var(--c-border) / <alpha-value>)',
          'border-strong': 'rgb(var(--c-border-strong) / <alpha-value>)',
          text: 'rgb(var(--c-text) / <alpha-value>)',
          'text-muted': 'rgb(var(--c-text-muted) / <alpha-value>)',
          'text-subtle': 'rgb(var(--c-text-subtle) / <alpha-value>)',
          // L'oro dell'insegna, in tre ruoli distinti:
          //   ticket      superficie d'azione (bottoni pieni, tagliando)
          //   ticket-ink  oro come inchiostro (occhielli, icone, bordi)
          //   on-ticket   il testo SOPRA la superficie d'oro
          // Sul nero i primi due coincidono; su fondo chiaro no, perché l'oro
          // su carta non si legge. Regola pratica: `bg-cinema-ticket` va
          // sempre con `text-cinema-on-ticket`, mai con `text-cinema-bg`.
          ticket: 'rgb(var(--c-ticket) / <alpha-value>)',
          'ticket-hover': 'rgb(var(--c-ticket-hover) / <alpha-value>)',
          'ticket-ink': 'rgb(var(--c-ticket-ink) / <alpha-value>)',
          'ticket-dim': 'rgb(var(--c-ticket-dim) / <alpha-value>)',
          'on-ticket': 'rgb(var(--c-on-ticket) / <alpha-value>)',
          // Rosso sipario: rassegne e proiezioni fuori sala (Castello).
          curtain: 'rgb(var(--c-curtain) / <alpha-value>)',
          'curtain-light': 'rgb(var(--c-curtain-light) / <alpha-value>)',
          // Blu di sistema: resta per skip-link e focus, fuori dalle superfici.
          accent: 'rgb(var(--c-accent) / <alpha-value>)',
          'accent-hover': 'rgb(var(--c-accent-hover) / <alpha-value>)',
          'accent-strong': 'rgb(var(--c-accent-strong) / <alpha-value>)',
          'accent-strong-hover': 'rgb(var(--c-accent-strong-hover) / <alpha-value>)',
          success: 'rgb(var(--c-success) / <alpha-value>)',
          warning: 'rgb(var(--c-warning) / <alpha-value>)',
          danger: 'rgb(var(--c-danger) / <alpha-value>)',
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
