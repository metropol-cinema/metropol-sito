/**
 * Controllo strutturale di accessibilità sulle pagine generate da `next build`.
 *
 * Perché non axe: axe misura anche contrasti e sovrapposizioni, e per farlo
 * vuole un browser vero — significa trascinarsi dietro Chromium (~300 MB) in un
 * repo che non ha nemmeno un test runner. Qui si legge l'HTML già costruito e
 * si verificano le cose che si rompono davvero riscrivendo una pagina:
 * intestazioni, nomi accessibili, etichette, alt, punti di riferimento.
 * I contrasti li abbiamo fissati nella palette (app/globals.css), non li
 * decide una pagina.
 *
 * Uso:  npm run a11y        (dopo un `npm run build`)
 *
 * LIMITE NOTO: controlla solo le pagine pre-generate. /film/[id] e
 * /corsi/[slug] sono dinamiche e non finiscono in .next/server/app.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

import { parseHTML } from 'linkedom';

const RADICE = '.next/server/app';

/**
 * `_global-error.html` non è una nostra pagina: è il documento di scialuppa che
 * Next serve quando non riesce nemmeno a far partire React, e non è
 * modificabile — la nostra pagina di errore grave è `app/global-error.tsx`, che
 * viene renderizzata a runtime. Lasciarlo nel conto significherebbe un
 * controllo rosso per sempre, e un controllo che è sempre rosso smette di
 * essere letto.
 */
const NON_NOSTRE = new Set(['/_global-error']);

/* ------------------------------------------------------------------ utili */

function paginaHtml(dir) {
  const trovate = [];
  for (const voce of readdirSync(dir)) {
    const percorso = join(dir, voce);
    if (statSync(percorso).isDirectory()) trovate.push(...paginaHtml(percorso));
    else if (voce.endsWith('.html')) trovate.push(percorso);
  }
  return trovate;
}

/** Testo visibile a un lettore di schermo: niente script, niente aria-hidden. */
function testoAccessibile(elemento) {
  if (!elemento) return '';
  let testo = '';
  for (const nodo of elemento.childNodes ?? []) {
    if (nodo.nodeType === 3) {
      testo += nodo.textContent;
      continue;
    }
    if (nodo.nodeType !== 1) continue;
    const tag = nodo.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEMPLATE') continue;
    if (nodo.getAttribute('aria-hidden') === 'true') continue;
    // Un'icona con alt vale come testo: è il caso del marchio nella testata.
    if (tag === 'IMG') testo += ` ${nodo.getAttribute('alt') ?? ''} `;
    testo += testoAccessibile(nodo);
  }
  return testo;
}

/** Nome accessibile, nell'ordine in cui lo calcola un lettore di schermo. */
function nomeAccessibile(elemento, documento) {
  const perId = elemento.getAttribute('aria-labelledby');
  if (perId) {
    const parti = perId
      .split(/\s+/)
      .map((id) => testoAccessibile(documento.getElementById(id)).trim())
      .filter(Boolean);
    if (parti.length) return parti.join(' ');
  }
  const etichetta = elemento.getAttribute('aria-label');
  if (etichetta?.trim()) return etichetta.trim();
  const titolo = elemento.getAttribute('title');
  if (titolo?.trim()) return titolo.trim();
  return testoAccessibile(elemento).replace(/\s+/g, ' ').trim();
}

const visibileAllaTecnologia = (el) => !el.closest('[aria-hidden="true"]');

/* ---------------------------------------------------------------- controlli
   Ognuno riceve il documento e restituisce la lista dei problemi trovati. */

const CONTROLLI = [
  ['una sola intestazione di primo livello', (d) => {
    const n = d.querySelectorAll('h1').length;
    return n === 1 ? [] : [`trovate ${n} <h1>, dev'essere esattamente una`];
  }],

  ['livelli di intestazione senza salti', (d) => {
    const problemi = [];
    let precedente = 0;
    for (const h of d.querySelectorAll('h1,h2,h3,h4,h5,h6')) {
      if (!visibileAllaTecnologia(h)) continue;
      const livello = Number(h.tagName[1]);
      if (precedente && livello > precedente + 1) {
        problemi.push(
          `da <h${precedente}> si salta a <h${livello}> ("${testoAccessibile(h).trim().slice(0, 40)}")`
        );
      }
      precedente = livello;
    }
    return problemi;
  }],

  ['ogni immagine ha un alt (anche vuoto, se decorativa)', (d) =>
    [...d.querySelectorAll('img')]
      .filter((img) => img.getAttribute('alt') === null)
      .map((img) => `<img src="${(img.getAttribute('src') ?? '').slice(0, 60)}"> senza alt`)],

  ['ogni riquadro incorporato ha un title', (d) =>
    [...d.querySelectorAll('iframe')]
      .filter((f) => !f.getAttribute('title')?.trim())
      .map((f) => `<iframe src="${(f.getAttribute('src') ?? '').slice(0, 60)}"> senza title`)],

  ['ogni link e ogni bottone ha un nome', (d) => {
    const problemi = [];
    for (const el of d.querySelectorAll('a[href], button, summary')) {
      if (!visibileAllaTecnologia(el)) continue;
      if (nomeAccessibile(el, d)) continue;
      const dove = el.getAttribute('href') ?? el.getAttribute('class') ?? '';
      problemi.push(`<${el.tagName.toLowerCase()}> senza nome (${dove.slice(0, 50)})`);
    }
    return problemi;
  }],

  ['ogni campo di modulo ha un’etichetta', (d) => {
    const problemi = [];
    for (const campo of d.querySelectorAll('input, select, textarea')) {
      const tipo = campo.getAttribute('type');
      if (tipo === 'hidden' || tipo === 'submit' || tipo === 'button') continue;
      if (nomeAccessibile(campo, d)) continue;
      if (campo.closest('label')) continue;
      const id = campo.getAttribute('id');
      if (id && d.querySelector(`label[for="${id}"]`)) continue;
      problemi.push(`<${campo.tagName.toLowerCase()}${tipo ? ` type="${tipo}"` : ''}> senza etichetta`);
    }
    return problemi;
  }],

  ['nessun tabindex positivo', (d) =>
    [...d.querySelectorAll('[tabindex]')]
      .filter((el) => Number(el.getAttribute('tabindex')) > 0)
      .map((el) => `<${el.tagName.toLowerCase()} tabindex="${el.getAttribute('tabindex')}">`)],

  ['nessun id ripetuto', (d) => {
    const visti = new Set();
    const doppi = new Set();
    for (const el of d.querySelectorAll('[id]')) {
      const id = el.getAttribute('id');
      if (visti.has(id)) doppi.add(id);
      visti.add(id);
    }
    return [...doppi].map((id) => `id="${id}" compare più di una volta`);
  }],

  ['un solo <main>', (d) => {
    const n = d.querySelectorAll('main').length;
    return n === 1 ? [] : [`trovati ${n} <main>, dev'essercene uno`];
  }],

  ['i link che aprono una nuova scheda lo dicono', (d) =>
    [...d.querySelectorAll('a[target="_blank"]')]
      .filter((a) => !/nuova scheda/i.test(nomeAccessibile(a, d)))
      .map((a) => `"${nomeAccessibile(a, d).slice(0, 40)}" non avvisa della nuova scheda`)],
];

/* ------------------------------------------------------------------- corpo */

let pagine;
try {
  pagine = paginaHtml(RADICE).sort();
} catch {
  console.error(`Non trovo ${RADICE}. Esegui prima: npm run build`);
  process.exit(2);
}

if (pagine.length === 0) {
  console.error(`Nessuna pagina in ${RADICE}. Esegui prima: npm run build`);
  process.exit(2);
}

let totaleProblemi = 0;
let controllate = 0;

for (const file of pagine) {
  const percorso = '/' + relative(RADICE, file).replace(/\.html$/, '').replace(/^index$/, '');
  if (NON_NOSTRE.has(percorso)) {
    console.log(`  --   ${percorso} (documento interno di Next, non nostro)`);
    continue;
  }
  const { document } = parseHTML(readFileSync(file, 'utf8'));
  controllate += 1;

  const problemi = [];
  if (document.documentElement.getAttribute('lang') !== 'it') {
    problemi.push(['lingua del documento dichiarata', ['manca lang="it" su <html>']]);
  }
  for (const [nome, controllo] of CONTROLLI) {
    const trovati = controllo(document);
    if (trovati.length) problemi.push([nome, trovati]);
  }

  if (problemi.length === 0) {
    console.log(`  ok   ${percorso}`);
    continue;
  }
  console.log(`  KO   ${percorso}`);
  for (const [nome, elenco] of problemi) {
    console.log(`         ${nome}:`);
    for (const dettaglio of elenco) console.log(`           · ${dettaglio}`);
    totaleProblemi += elenco.length;
  }
}

console.log(
  totaleProblemi === 0
    ? `\n${controllate} pagine, ${CONTROLLI.length + 1} controlli ciascuna: nessun problema.`
    : `\n${totaleProblemi} problemi su ${controllate} pagine controllate.`
);
process.exit(totaleProblemi === 0 ? 0 : 1);
