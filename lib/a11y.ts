/**
 * Preferenze di accessibilità del visitatore.
 *
 * Vivono in `localStorage` e diventano attributi `data-*` su `<html>`; tutto
 * l'aspetto lo decide il CSS (`app/globals.css`, sezione "PREFERENZE DELLA
 * BARRA DI ACCESSIBILITÀ"). Nessun componente sa che la barra esiste.
 *
 * Restano su questo browser: non c'è un account, e non parte nessuna richiesta
 * verso di noi né verso terzi.
 */

export type Tema = 'sala' | 'chiaro' | 'contrasto-scuro' | 'contrasto-chiaro';
export type Testo = '100' | '115' | '130' | '150';
export type Link = 'no' | 'sottolineati' | 'evidenziati';

export interface Preferenze {
  tema: Tema;
  /** Percentuale della dimensione base del testo. */
  testo: Testo;
  /** Interlinea e spaziatura fra lettere e parole più ampie. */
  spaziatura: boolean;
  /** Carattere ad alta leggibilità (Atkinson Hyperlegible). */
  carattere: boolean;
  /** Quanto far risaltare i link: niente, sottolineati, o su fondo pieno. */
  link: Link;
  /** Ferma scorrimento automatico, video e transizioni. */
  animazioni: boolean;
  /** Puntatore del mouse ingrandito e ad alto contrasto. */
  cursore: boolean;
  /** Contorno su tutto ciò che si può cliccare, al passaggio e al focus. */
  zone: boolean;
  /** Riga orizzontale che segue il puntatore per non perdere il rigo. */
  guida: boolean;
}

export const CHIAVE_STORAGE = 'metropol-accessibilita';

export const PREFERENZE_INIZIALI: Preferenze = {
  tema: 'sala',
  testo: '100',
  spaziatura: false,
  carattere: false,
  link: 'no',
  animazioni: false,
  cursore: false,
  zone: false,
  guida: false,
};

const TEMI: Tema[] = ['sala', 'chiaro', 'contrasto-scuro', 'contrasto-chiaro'];
const TESTI: Testo[] = ['100', '115', '130', '150'];
const LINK: Link[] = ['no', 'sottolineati', 'evidenziati'];

export const ETICHETTE_TEMA: Record<Tema, { nome: string; nota: string }> = {
  sala: { nome: 'Sala', nota: 'Chiaro su scuro' },
  chiaro: { nome: 'Chiaro', nota: 'Scuro su carta' },
  'contrasto-scuro': { nome: 'Contrasto scuro', nota: 'Bianco su nero' },
  'contrasto-chiaro': { nome: 'Contrasto chiaro', nota: 'Nero su bianco' },
};

export const ETICHETTE_TESTO: Record<Testo, string> = {
  '100': 'Normale',
  '115': 'Grande',
  '130': 'Più grande',
  '150': 'Massimo',
};

export const ETICHETTE_LINK: Record<Link, { nome: string; nota: string }> = {
  no: { nome: 'Normali', nota: 'Solo colore' },
  sottolineati: { nome: 'Sottolineati', nota: 'Riga sotto' },
  evidenziati: { nome: 'Evidenziati', nota: 'Fondo pieno' },
};

/** True se il visitatore ha cambiato almeno una cosa. */
export function personalizzate(p: Preferenze): boolean {
  return (Object.keys(PREFERENZE_INIZIALI) as Array<keyof Preferenze>).some(
    (k) => p[k] !== PREFERENZE_INIZIALI[k]
  );
}

/** Scrive le preferenze come attributi su `<html>`. */
export function applica(p: Preferenze, radice: HTMLElement = document.documentElement): void {
  const attributi: Array<[string, string | null]> = [
    // Il valore predefinito non si scrive: `:root` nudo è già il tema "sala".
    ['data-tema', p.tema === 'sala' ? null : p.tema],
    ['data-testo', p.testo === '100' ? null : p.testo],
    ['data-spaziatura', p.spaziatura ? 'ampia' : null],
    ['data-carattere', p.carattere ? 'leggibile' : null],
    ['data-link', p.link === 'no' ? null : p.link],
    ['data-animazioni', p.animazioni ? 'ferme' : null],
    ['data-cursore', p.cursore ? 'grande' : null],
    ['data-zone', p.zone ? 'evidenziate' : null],
  ];
  for (const [nome, valore] of attributi) {
    if (valore === null) radice.removeAttribute(nome);
    else radice.setAttribute(nome, valore);
  }
}

/** Rilegge le preferenze salvate, scartando qualsiasi cosa non riconosca. */
export function leggi(): Preferenze {
  try {
    const grezzo = window.localStorage.getItem(CHIAVE_STORAGE);
    if (!grezzo) return PREFERENZE_INIZIALI;
    // Non è `Partial<Preferenze>`: l'ha scritto una versione qualsiasi del
    // sito, anche di un anno fa. Va guardato campo per campo, come un modulo
    // arrivato per posta.
    const salvate = JSON.parse(grezzo) as Record<string, unknown>;
    return {
      tema: TEMI.includes(salvate.tema as Tema) ? (salvate.tema as Tema) : 'sala',
      testo: TESTI.includes(salvate.testo as Testo) ? (salvate.testo as Testo) : '100',
      spaziatura: salvate.spaziatura === true,
      carattere: salvate.carattere === true,
      // `link` era un booleano fino a settembre 2026: chi aveva acceso la
      // sottolineatura non deve ritrovarsela spenta.
      link:
        salvate.link === true
          ? 'sottolineati'
          : LINK.includes(salvate.link as Link)
            ? (salvate.link as Link)
            : 'no',
      animazioni: salvate.animazioni === true,
      cursore: salvate.cursore === true,
      zone: salvate.zone === true,
      guida: salvate.guida === true,
    };
  } catch {
    // Navigazione privata o storage negato: si resta sui valori di partenza.
    return PREFERENZE_INIZIALI;
  }
}

export function salva(p: Preferenze): void {
  try {
    window.localStorage.setItem(CHIAVE_STORAGE, JSON.stringify(p));
  } catch {
    /* niente storage: le preferenze valgono per questa visita */
  }
}

/**
 * Lo stesso lavoro di `applica`, in JavaScript nudo, da eseguire **prima del
 * primo disegno**: senza, chi ha scelto il tema chiaro si vede lampeggiare il
 * nero a ogni caricamento. Va inline nel `<head>` — un file esterno arriverebbe
 * troppo tardi. Se cambi i nomi degli attributi qui sopra, cambiali anche qui.
 */
export const SCRIPT_INIZIALE = `(function(){try{var p=JSON.parse(localStorage.getItem(${JSON.stringify(
  CHIAVE_STORAGE
)})||"{}"),d=document.documentElement;if(p.tema&&p.tema!=="sala")d.setAttribute("data-tema",p.tema);if(p.testo&&p.testo!=="100")d.setAttribute("data-testo",p.testo);if(p.spaziatura)d.setAttribute("data-spaziatura","ampia");if(p.carattere)d.setAttribute("data-carattere","leggibile");if(p.link&&p.link!=="no")d.setAttribute("data-link",p.link===true?"sottolineati":p.link);if(p.animazioni)d.setAttribute("data-animazioni","ferme");if(p.cursore)d.setAttribute("data-cursore","grande");if(p.zone)d.setAttribute("data-zone","evidenziate")}catch(e){}})()`;

/* ===========================================================================
   Le preferenze come "store esterno"
   ---------------------------------------------------------------------------
   Non sono stato di React: stanno in localStorage e sugli attributi di <html>,
   e ci arrivano già applicate dallo script inline prima ancora che React parta.
   Modellarle con useState + useEffect significherebbe leggerle una seconda
   volta a montaggio avvenuto; con useSyncExternalStore React le legge dove
   stanno davvero. Sul server l'istantanea è quella di partenza — il pannello è
   chiuso al primo disegno, quindi nessuna differenza da idratare.
   =========================================================================== */

let cache: Preferenze | null = null;
const ascoltatori = new Set<() => void>();

export function sottoscrivi(fn: () => void): () => void {
  ascoltatori.add(fn);
  return () => {
    ascoltatori.delete(fn);
  };
}

export function istantanea(): Preferenze {
  // Deve restituire sempre lo stesso oggetto finché nulla cambia, altrimenti
  // React ridisegna all'infinito.
  if (cache === null) cache = leggi();
  return cache;
}

export function istantaneaServer(): Preferenze {
  return PREFERENZE_INIZIALI;
}

export function imposta(p: Preferenze): void {
  cache = p;
  applica(p);
  salva(p);
  for (const fn of ascoltatori) fn();
}
