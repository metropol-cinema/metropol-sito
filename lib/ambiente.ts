/**
 * Dove gira questa copia del sito, e qual è il suo indirizzo ufficiale.
 *
 * Il sito vive in due posti:
 * - **produzione** (`main`): il sito ufficiale, quello che Google indicizza;
 * - **anteprima** (`preprod` e ogni altro branch): dove si provano le novità e
 *   le si fanno vedere prima di pubblicarle. Non va indicizzata — sarebbe un
 *   doppione del sito vero — e deve dire chiaramente cos'è.
 *
 * Il criterio è `VERCEL_ENV`, che Vercel imposta da sé: `production` per il
 * branch di produzione, `preview` per gli altri. In locale non c'è: si conta
 * come «non produzione», così niente finisce indicizzato per sbaglio.
 *
 * SOLO lato server: `VERCEL_ENV` e `SITO_URL` non arrivano al browser.
 */

export const IN_PRODUZIONE = process.env.VERCEL_ENV === 'production';
export const IN_ANTEPRIMA = process.env.VERCEL_ENV === 'preview';

/**
 * L'indirizzo ufficiale del sito, senza barra finale: base delle anteprime di
 * condivisione, del link canonico, della sitemap e dei dati strutturati.
 *
 * Arriva da `SITO_URL` (variabile di Vercel, sia Production sia Preview: anche
 * l'anteprima deve indicare come ufficiale il sito vero). Va impostata il
 * giorno del passaggio di dominio e **non prima**: finché cinemametropol.it
 * punta a Wix, dichiararlo indirizzo ufficiale direbbe a Google che le nostre
 * pagine stanno su un altro sito. Fino ad allora vale l'indirizzo di Vercel.
 *
 * Non si usa più `VERCEL_PROJECT_PRODUCTION_URL`: Vercel lo ricava dai domini
 * collegati al progetto, e con i domini aggiunti in anticipo cambierebbe da
 * solo, prima del passaggio.
 */
export const URL_SITO = (
  process.env.SITO_URL?.trim() ||
  (process.env.VERCEL ? 'https://metropol-sito.vercel.app' : 'http://localhost:3000')
).replace(/\/+$/, '');
