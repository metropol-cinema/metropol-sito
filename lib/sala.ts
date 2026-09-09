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
  /** Occupa tutta la larghezza della griglia, invece di una colonna sola. */
  larga?: boolean;
  /** Dimensioni del file originale: servono a Next per non far saltare il
   *  layout mentre l'immagine arriva, e per generare i formati più piccoli. */
  larghezza: number;
  altezza: number;
}

export const FOTO_SALA: FotoSala[] = [
  {
    src: '/foto/sala/sala.jpg',
    alt: 'La platea vista dall’alto: lunghe file di poltrone blu su un pavimento in legno chiaro scendono a gradoni verso il palco. In fondo lo schermo bianco fra le tende blu, con i fari del teatro appesi ai lati.',
    didascalia: 'La platea, dall’ultima fila. In fondo il palco, con lo schermo e il sipario.',
    larga: true,
    larghezza: 2048,
    altezza: 1536,
  },
  {
    src: '/foto/sala/esterno.jpeg',
    alt: 'L’edificio del cinema all’imbrunire, visto dall’angolo della piazza: una facciata curva in pietra chiara con una grande vetrata illuminata di arancione, e alberi illuminati lungo il marciapiede.',
    didascalia: 'L’edificio in Piazza Villafranchetta, la sera.',
    larghezza: 678,
    altezza: 452,
  },
  {
    src: '/foto/sala/ingresso.jpg',
    alt: 'Il foyer, con il pavimento di marmo a fasce chiare e scure. Sopra le porte della sala la scritta SALA ALIDA FERRARINI; accanto, un pannello rosso con le parole cinematografo, teatro, sala conferenze. Sulla destra il bancone della biglietteria.',
    didascalia: 'Il foyer e la biglietteria, prima delle porte della sala.',
    larghezza: 2126,
    altezza: 1419,
  },
];
