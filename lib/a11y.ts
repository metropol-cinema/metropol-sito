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
export type Colori = 'normali' | 'tenui' | 'vivaci' | 'grigi';

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
  /** Intensità dei colori: un filtro su tutta la pagina, sopra il tema. */
  colori: Colori;
  /** Titoli su fondo e con la barretta del colore d'azione. */
  titoli: boolean;
  /** Oscura la pagina tranne una fascia attorno al puntatore. */
  maschera: boolean;
  /** Ingrandisce in un riquadro il testo sotto il puntatore. */
  lente: boolean;
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
  colori: 'normali',
  titoli: false,
  maschera: false,
  lente: false,
};

/**
 * Come ogni preferenza diventa un attributo su `<html>`. È l'unica fonte:
 * da qui leggono `applica()`, `leggi()` e lo script inline che gira prima del
 * primo disegno — che quindi non si può più dimenticare di aggiornare.
 *
 * - scelta fra valori: l'attributo porta il valore, e manca se è il
 *   predefinito (`:root` nudo è già il tema "sala");
 * - interruttore: l'attributo porta `acceso` quando la voce è attiva.
 *
 * `guida`, `maschera` e `lente` non ci sono: non sono CSS, sono componenti
 * che si montano o no.
 */
const ATTRIBUTI = {
  tema: {
    attributo: 'data-tema',
    predefinito: 'sala',
    valori: ['sala', 'chiaro', 'contrasto-scuro', 'contrasto-chiaro'],
  },
  testo: { attributo: 'data-testo', predefinito: '100', valori: ['100', '115', '130', '150'] },
  link: { attributo: 'data-link', predefinito: 'no', valori: ['no', 'sottolineati', 'evidenziati'] },
  colori: {
    attributo: 'data-colori',
    predefinito: 'normali',
    valori: ['normali', 'tenui', 'vivaci', 'grigi'],
  },
  spaziatura: { attributo: 'data-spaziatura', acceso: 'ampia' },
  carattere: { attributo: 'data-carattere', acceso: 'leggibile' },
  animazioni: { attributo: 'data-animazioni', acceso: 'ferme' },
  cursore: { attributo: 'data-cursore', acceso: 'grande' },
  zone: { attributo: 'data-zone', acceso: 'evidenziate' },
  titoli: { attributo: 'data-titoli', acceso: 'evidenziati' },
} as const satisfies Partial<
  Record<
    keyof Preferenze,
    | { attributo: string; predefinito: string; valori: readonly string[] }
    | { attributo: string; acceso: string }
  >
>;

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

export const ETICHETTE_COLORI: Record<Colori, { nome: string; nota: string }> = {
  normali: { nome: 'Naturali', nota: 'Come sono' },
  tenui: { nome: 'Tenui', nota: 'Meno saturi' },
  vivaci: { nome: 'Vivaci', nota: 'Più saturi' },
  grigi: { nome: 'Grigi', nota: 'Bianco e nero' },
};

/* ===========================================================================
   Profili
   ---------------------------------------------------------------------------
   Scorciatoie: un interruttore che accende insieme più voci del pannello.
   Non sono una preferenza a sé — non si salvano, non scrivono attributi — ma
   una lettura delle voci: un profilo è acceso quando tutte le sue voci lo
   sono. Così, se poi si ritocca una voce a mano, il profilo si spegne da
   solo, e il pannello non racconta mai una cosa diversa da quella che fa.

   Niente profili «lettore di schermo» o «tastiera»: chi usa un lettore di
   schermo ce l'ha già, e il sito deve funzionare con la tastiera sempre,
   non a richiesta. Promettere di «ottimizzarlo» da qui sarebbe falso.
   Stessi profili dell'area soci del gestionale (lib/accessibilita/).
   =========================================================================== */

export type Profilo = 'vista' | 'epilessia' | 'concentrazione' | 'dislessia' | 'anziani';

export const PROFILI: Record<
  Profilo,
  {
    nome: string;
    nota: string;
    /** Le voci che il profilo accende. Una funzione e non un oggetto per il
     *  tema: il contrasto forte segue quello che si ha già, chiaro o scuro. */
    voci: (p: Preferenze) => Partial<Preferenze>;
  }
> = {
  vista: {
    nome: 'Vista ridotta',
    nota: 'Contrasto forte, testo e puntatore grandi',
    voci: (p) => ({
      tema: p.tema.endsWith('chiaro') ? 'contrasto-chiaro' : 'contrasto-scuro',
      testo: '130',
      titoli: true,
      link: 'sottolineati',
      cursore: true,
      zone: true,
    }),
  },
  epilessia: {
    nome: 'Sicurezza epilessia',
    nota: 'Niente animazioni né video, colori tenui',
    voci: () => ({ animazioni: true, colori: 'tenui' }),
  },
  concentrazione: {
    nome: 'Concentrazione',
    nota: 'Una fascia sola in luce, niente animazioni',
    voci: () => ({ maschera: true, animazioni: true }),
  },
  dislessia: {
    nome: 'Dislessia',
    nota: 'Carattere leggibile, più spazio, guida di lettura',
    voci: () => ({ carattere: true, spaziatura: true, guida: true, link: 'sottolineati' }),
  },
  anziani: {
    nome: 'Persone anziane',
    nota: 'Testo più grande, puntatore grande, niente animazioni',
    voci: () => ({ testo: '130', cursore: true, link: 'sottolineati', animazioni: true }),
  },
};

export function profiloAttivo(p: Preferenze, profilo: Profilo): boolean {
  const voci = PROFILI[profilo].voci(p);
  return (Object.keys(voci) as Array<keyof Preferenze>).every((k) => p[k] === voci[k]);
}

export function accendiProfilo(p: Preferenze, profilo: Profilo): Preferenze {
  return { ...p, ...PROFILI[profilo].voci(p) };
}

/**
 * Riporta le voci del profilo al valore di partenza — tranne quelle che
 * servono a un altro profilo ancora acceso: spegnere «Dislessia» non deve
 * spegnere i link sottolineati a chi ha anche «Vista ridotta».
 */
export function spegniProfilo(p: Preferenze, profilo: Profilo): Preferenze {
  const altriAccesi = (Object.keys(PROFILI) as Profilo[]).filter(
    (q) => q !== profilo && profiloAttivo(p, q)
  );
  const tenute = new Set(altriAccesi.flatMap((q) => Object.keys(PROFILI[q].voci(p))));
  const prossime: Preferenze = { ...p };
  for (const k of Object.keys(PROFILI[profilo].voci(p)) as Array<keyof Preferenze>) {
    if (tenute.has(k)) continue;
    // Il contrasto forte si spegne nel tema da cui era partito, non nello scuro.
    if (k === 'tema') prossime.tema = p.tema === 'contrasto-chiaro' ? 'chiaro' : 'sala';
    else (prossime as Record<keyof Preferenze, unknown>)[k] = PREFERENZE_INIZIALI[k];
  }
  return prossime;
}

/** True se il visitatore ha cambiato almeno una cosa. */
export function personalizzate(p: Preferenze): boolean {
  return (Object.keys(PREFERENZE_INIZIALI) as Array<keyof Preferenze>).some(
    (k) => p[k] !== PREFERENZE_INIZIALI[k]
  );
}

/** Quel che serve di un elemento per scriverci gli attributi: così la stessa
 *  funzione gira sul DOM vero e, in una verifica, su un elemento finto. */
type Radice = Pick<Element, 'setAttribute' | 'removeAttribute'>;

/** Scrive le preferenze come attributi su `<html>`. */
export function applica(p: Preferenze, radice: Radice = document.documentElement): void {
  for (const [chiave, regola] of Object.entries(ATTRIBUTI)) {
    const valore = p[chiave as keyof typeof ATTRIBUTI];
    const scritto =
      'acceso' in regola
        ? valore === true
          ? regola.acceso
          : null
        : valore !== regola.predefinito
          ? (valore as string)
          : null;
    if (scritto === null) radice.removeAttribute(regola.attributo);
    else radice.setAttribute(regola.attributo, scritto);
  }
}

/** Valida campo per campo quel che arriva dallo storage. Non è `Preferenze`:
 *  l'ha scritto una versione qualsiasi del sito, anche di un anno fa, o
 *  chiunque abbia aperto gli strumenti del browser. Va guardato come un
 *  modulo arrivato per posta. */
export function valida(grezzo: unknown): Preferenze {
  const salvate = (grezzo && typeof grezzo === 'object' ? grezzo : {}) as Record<string, unknown>;
  // `link` era un booleano fino a settembre 2026: chi aveva acceso la
  // sottolineatura non deve ritrovarsela spenta.
  const link = salvate.link === true ? 'sottolineati' : salvate.link;
  const scelta = <T extends string>(chiave: 'tema' | 'testo' | 'link' | 'colori', v: unknown): T => {
    const regola = ATTRIBUTI[chiave];
    return (
      typeof v === 'string' && (regola.valori as readonly string[]).includes(v)
        ? v
        : regola.predefinito
    ) as T;
  };
  return {
    tema: scelta<Tema>('tema', salvate.tema),
    testo: scelta<Testo>('testo', salvate.testo),
    link: scelta<Link>('link', link),
    colori: scelta<Colori>('colori', salvate.colori),
    spaziatura: salvate.spaziatura === true,
    carattere: salvate.carattere === true,
    animazioni: salvate.animazioni === true,
    cursore: salvate.cursore === true,
    zone: salvate.zone === true,
    guida: salvate.guida === true,
    titoli: salvate.titoli === true,
    maschera: salvate.maschera === true,
    lente: salvate.lente === true,
  };
}

/** Rilegge le preferenze salvate, scartando qualsiasi cosa non riconosca. */
export function leggi(): Preferenze {
  try {
    const grezzo = window.localStorage.getItem(CHIAVE_STORAGE);
    return grezzo ? valida(JSON.parse(grezzo)) : PREFERENZE_INIZIALI;
  } catch {
    // Navigazione privata, storage negato o JSON rotto: valori di partenza.
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
 * Il lavoro di `applica(valida(...))`, in JavaScript nudo, da eseguire **prima
 * del primo disegno**: senza, chi ha scelto il tema chiaro si vede lampeggiare
 * il nero a ogni caricamento. Va inline nel `<head>` — un file esterno
 * arriverebbe troppo tardi. È generato dalla stessa tabella ATTRIBUTI, quindi
 * non c'è più una copia a mano da tenere allineata.
 */
export const SCRIPT_INIZIALE = `(function(){try{var p=JSON.parse(localStorage.getItem(${JSON.stringify(
  CHIAVE_STORAGE
)})||"{}")||{},d=document.documentElement,A=${JSON.stringify(
  ATTRIBUTI
)};if(p.link===true)p.link="sottolineati";for(var k in A){var a=A[k],v=p[k];if(a.acceso){if(v===true)d.setAttribute(a.attributo,a.acceso)}else if(typeof v==="string"&&v!==a.predefinito&&a.valori.indexOf(v)>=0)d.setAttribute(a.attributo,v)}}catch(e){}})()`;

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
