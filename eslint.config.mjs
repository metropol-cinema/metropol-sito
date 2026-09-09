import next from 'eslint-config-next';
import jsxA11y from 'eslint-plugin-jsx-a11y';

/**
 * Flat config ESLint 9 per Next 16 (core-web-vitals + typescript), più le
 * regole di accessibilità al completo.
 *
 * `eslint-config-next` ne accende solo una parte; qui si passa al set `strict`
 * di jsx-a11y, che è la rete più a monte che abbiamo: prende alt mancanti,
 * bottoni senza nome, etichette scollegate e ruoli inventati mentre scrivi,
 * non dopo il deploy. Il plugin arriva già con eslint-config-next: nessuna
 * dipendenza in più.
 */
const eslintConfig = [
  // Gli strumenti dell'agent tengono qui dentro un worktree git completo, col
  // suo `.next` già compilato: senza questa riga `npm run lint` finisce per
  // controllare del codice generato da Turbopack e fallisce sempre, che vuol
  // dire non usarlo più. L'ignora vale per l'intera cartella: non è nostra.
  { ignores: ['.claude/**'] },
  ...next,
  {
    // Solo le REGOLE del set strict: il plugin lo registra già
    // eslint-config-next, e ridichiararlo fa esplodere la flat config.
    rules: {
      ...jsxA11y.flatConfigs.strict.rules,
      // I testi dell'interfaccia sono in italiano: le parole che questa regola
      // vieta in inglese ("image", "photo") qui non compaiono, e "Locandina di
      // …" è esattamente il testo giusto per un alt.
      'jsx-a11y/img-redundant-alt': 'off',
    },
  },
];

export default eslintConfig;
