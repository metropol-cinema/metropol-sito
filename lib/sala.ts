/**
 * La Sala "Alida Ferrarini": cos'è, quanto è grande, che aspetto ha.
 *
 * Stessa regola di lib/accessibilita.ts: qui dentro solo numeri e fatti che
 * qualcuno in associazione conosce davvero. Chi legge questa pagina sta
 * decidendo se venire, o se chiederci la sala per una serata sua: un posto in
 * più scritto a occhio è una prenotazione che salta.
 */

export const SALA = {
  /** Posti a sedere in platea, esclusi i posti per le carrozzine. */
  posti: 450,
  /** Posti attrezzati per le carrozzine, in platea. */
  postiCarrozzina: 4,
  /** I tre usi scritti all'ingresso, sopra le porte della sala. */
  usi: ['Cinematografo', 'Teatro', 'Sala conferenze'] as const,
} as const;

/**
 * Le fotografie della sala.
 *
 * `alt` non è una didascalia: è quello che sente chi non vede l'immagine, e
 * deve dire la stessa cosa che la foto fa capire a colpo d'occhio. La
 * didascalia, invece, si legge sotto ed è per tutti.
 *
 * I file stanno in `public/foto/sala/`. Finché l'elenco è vuoto la pagina non
 * mostra la sezione: meglio senza foto che con i riquadri rotti.
 */
export interface FotoSala {
  src: string;
  alt: string;
  didascalia?: string;
}

export const FOTO_SALA: FotoSala[] = [];
