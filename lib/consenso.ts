/**
 * Consenso ai cookie di statistica.
 *
 * Il sito, di suo, non ha bisogno di consenso: niente sessioni, niente
 * pubblicità, i caratteri li serviamo noi e il trailer contatta YouTube solo
 * dopo un clic (vedi `components/trailer.tsx`). L'unica cosa che sta dietro un
 * "sì" è Google Analytics — e infatti finché `NEXT_PUBLIC_GA_MEASUREMENT_ID`
 * è vuota il banner non compare nemmeno: non c'è nulla da acconsentire.
 *
 * La scelta vive in `localStorage`, come le preferenze di accessibilità
 * (`lib/a11y.ts`), e con lo stesso schema: uno store esterno letto da React con
 * `useSyncExternalStore`, non stato di un componente. Chi rifiuta non lascia
 * traccia da nessuna parte se non su questo browser.
 */

import { useSyncExternalStore } from 'react';

export type Scelta = 'ignoto' | 'accettato' | 'rifiutato';

export const CHIAVE_CONSENSO = 'metropol-consenso-cookie';

/**
 * Versione dell'informativa. Va alzata di uno SOLO se cambiano gli strumenti
 * che raccolgono dati (uno nuovo, o uno con finalità diverse): il consenso
 * vecchio decade e il banner torna a chiedere. Correggere un refuso nella
 * pagina non è un buon motivo per rifare la domanda a tutti.
 */
export const VERSIONE_INFORMATIVA = 1;

/**
 * Dopo un rifiuto il banner resta zitto sei mesi, poi può richiedere: è il
 * limite che indica il Garante privacy (linee guida cookie, giugno 2021), non
 * un numero scelto da noi. Un "sì", invece, dura finché non lo si revoca.
 */
const RIPROPONI_IL_RIFIUTO_DOPO = 182 * 24 * 60 * 60 * 1000;

/**
 * ID di misurazione GA4 (`G-XXXXXXXXXX`), quello del tag nel browser — da non
 * confondere con `GA4_PROPERTY_ID` del gestionale, che è il numero della
 * proprietà e serve a leggere i dati dall'API. Vuoto = nessuna statistica,
 * nessuno script, nessun banner.
 */
export const ID_MISURAZIONE = (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '').trim();

/** True se c'è qualcosa da chiedere: senza tag, nessuna domanda. */
export const statisticheConfigurate = ID_MISURAZIONE.length > 0;

interface Salvato {
  scelta: Exclude<Scelta, 'ignoto'>;
  versione: number;
  /** Quando è stata fatta la scelta, in millisecondi epoch. */
  quando: number;
}

/**
 * Rilegge la scelta salvata. Torna 'ignoto' — cioè "chiedi" — se non c'è, se
 * è di un'informativa superata, o se è un rifiuto più vecchio di sei mesi.
 */
export function leggi(): Scelta {
  try {
    const grezzo = window.localStorage.getItem(CHIAVE_CONSENSO);
    if (!grezzo) return 'ignoto';
    const salvato = JSON.parse(grezzo) as Partial<Salvato>;
    if (salvato.versione !== VERSIONE_INFORMATIVA) return 'ignoto';
    if (salvato.scelta === 'accettato') return 'accettato';
    if (salvato.scelta !== 'rifiutato') return 'ignoto';
    const quando = typeof salvato.quando === 'number' ? salvato.quando : 0;
    return Date.now() - quando > RIPROPONI_IL_RIFIUTO_DOPO ? 'ignoto' : 'rifiutato';
  } catch {
    // Navigazione privata o storage negato: si richiede, e per questa visita
    // non parte nulla.
    return 'ignoto';
  }
}

function salva(scelta: Scelta): void {
  try {
    if (scelta === 'ignoto') {
      window.localStorage.removeItem(CHIAVE_CONSENSO);
      return;
    }
    const salvato: Salvato = { scelta, versione: VERSIONE_INFORMATIVA, quando: Date.now() };
    window.localStorage.setItem(CHIAVE_CONSENSO, JSON.stringify(salvato));
  } catch {
    /* niente storage: la scelta vale per questa visita */
  }
}

/**
 * Butta via i cookie che Google Analytics ha già scritto e alza l'interruttore
 * che gtag.js controlla prima di mandare qualsiasi cosa.
 *
 * Serve a chi cambia idea: revocare il consenso e lasciare in giro un `_ga`
 * valido due anni sarebbe una revoca a metà. I cookie di GA4 stanno sul dominio
 * del sito, ma scritti col punto davanti (`.cinemametropol.com`), quindi vanno
 * scadenzati su tutte le forme plausibili — il browser cancella solo quella che
 * corrisponde esattamente.
 */
export function dimenticaStatistiche(): void {
  if (typeof document === 'undefined') return;
  if (ID_MISURAZIONE) {
    (window as unknown as Record<string, unknown>)[`ga-disable-${ID_MISURAZIONE}`] = true;
  }
  const parti = window.location.hostname.split('.');
  const domini = [
    undefined,
    window.location.hostname,
    `.${window.location.hostname}`,
    // Il dominio registrabile: `.cinemametropol.com` anche se siamo su www.
    parti.length > 1 ? `.${parti.slice(-2).join('.')}` : undefined,
  ];
  for (const pezzo of document.cookie.split(';')) {
    const nome = pezzo.split('=')[0]?.trim();
    if (!nome || !/^(_ga|_gid|_gat)/.test(nome)) continue;
    for (const dominio of domini) {
      document.cookie = `${nome}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${
        dominio ? `; domain=${dominio}` : ''
      }`;
    }
  }
}

/* ===========================================================================
   La scelta come "store esterno"
   ---------------------------------------------------------------------------
   Tre parti del sito devono sapere la stessa cosa nello stesso istante: il
   banner (per sparire), il tag (per partire) e il pannello in /privacy (per
   dire come stanno le cose adesso). Con lo stato di un componente servirebbe
   un context e un giro di prop; qui la verità sta in localStorage e React la
   legge dov'è, come per le preferenze di accessibilità.
   =========================================================================== */

let cache: Scelta | null = null;
const ascoltatori = new Set<() => void>();

export function sottoscrivi(fn: () => void): () => void {
  ascoltatori.add(fn);
  return () => {
    ascoltatori.delete(fn);
  };
}

export function istantanea(): Scelta {
  // Sempre lo stesso valore finché nulla cambia, o React ridisegna all'infinito.
  if (cache === null) cache = leggi();
  return cache;
}

/**
 * Sul server non sappiamo cosa ha scelto chi sta arrivando. Il banner NON si
 * disegna qui: comparirebbe per un istante anche a chi ha già risposto mesi fa.
 * Chi lo mostra aspetta il montaggio (`components/cookie-banner.tsx`).
 */
export function istantaneaServer(): Scelta {
  return 'ignoto';
}

export function imposta(scelta: Scelta): void {
  cache = scelta;
  salva(scelta);
  if (scelta === 'accettato') {
    // Chi revoca e poi ci ripensa nella stessa visita si porta dietro
    // l'interruttore alzato da `dimenticaStatistiche`: va riabbassato, o il
    // consenso appena dato non varrebbe niente fino al prossimo caricamento.
    if (ID_MISURAZIONE && typeof window !== 'undefined') {
      (window as unknown as Record<string, unknown>)[`ga-disable-${ID_MISURAZIONE}`] = false;
    }
  } else {
    dimenticaStatistiche();
  }
  for (const fn of ascoltatori) fn();
}

/**
 * True dopo l'idratazione, false mentre si disegna sul server.
 *
 * Serve a banner e pannello: la scelta sta nel browser, quindi sul server non
 * si può sapere e disegnare l'una o l'altra cosa produrrebbe un lampo. È
 * scritto come store esterno — con una sottoscrizione che non notifica mai —
 * invece che con `useState` + `useEffect`: fa la stessa cosa in un giro di
 * disegno solo, ed è ciò che React (e il suo compilatore) si aspetta.
 */
const NESSUN_CAMBIAMENTO = () => () => {};

export function useNelBrowser(): boolean {
  return useSyncExternalStore(
    NESSUN_CAMBIAMENTO,
    () => true,
    () => false
  );
}
