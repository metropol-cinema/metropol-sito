'use client';

import {
  AlignJustify,
  Pause,
  PersonStanding,
  RotateCcw,
  Type,
  Underline,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';

import {
  ETICHETTE_TEMA,
  ETICHETTE_TESTO,
  imposta,
  istantanea,
  istantaneaServer,
  personalizzate,
  PREFERENZE_INIZIALI,
  sottoscrivi,
  type Preferenze,
  type Tema,
  type Testo,
} from '@/lib/a11y';
import { cn } from '@/lib/utils';

const TEMI = Object.keys(ETICHETTE_TEMA) as Tema[];
const TESTI = Object.keys(ETICHETTE_TESTO) as Testo[];

/**
 * La barra di accessibilità: un bottone in basso a sinistra che apre il
 * pannello delle preferenze di lettura.
 *
 * È roba nostra, non un widget di terzi: nessuno script esterno, nessuna
 * richiesta in uscita, tutto in italiano e con la grafica del sito. E soprattutto
 * non "ripara" niente dall'esterno — il sito sotto è già scritto per essere
 * accessibile, questa è la stanza dei bottoni per chi vuole leggere a modo suo.
 *
 * Le preferenze le applica il CSS via attributi su <html> (lib/a11y.ts): qui
 * dentro c'è solo lo stato, più le due cose che il CSS non può fare da solo —
 * fermare i video e lo scorrimento automatico del carosello.
 */
export function AccessibilityBar() {
  // Le preferenze arrivano già applicate dallo script inline: qui le leggiamo
  // dove stanno (lib/a11y.ts), non le ricostruiamo.
  const pref = useSyncExternalStore(sottoscrivi, istantanea, istantaneaServer);
  const [aperto, setAperto] = useState(false);
  const bottoneRef = useRef<HTMLButtonElement>(null);
  const pannelloRef = useRef<HTMLDivElement>(null);
  const pannelloId = useId();

  // I video di sfondo dello slideshow partono da soli: fermarli è metà del
  // senso dell'interruttore "animazioni". Il CSS qui non arriva.
  useEffect(() => {
    for (const video of Array.from(document.querySelectorAll('video'))) {
      if (pref.animazioni) video.pause();
      else void video.play().catch(() => {});
    }
  }, [pref.animazioni]);

  const chiudi = useCallback(() => {
    setAperto(false);
    bottoneRef.current?.focus();
  }, []);

  // Esc chiude e riporta il focus al bottone; un click fuori chiude e basta.
  useEffect(() => {
    if (!aperto) return;
    const suTasto = (e: KeyboardEvent) => {
      if (e.key === 'Escape') chiudi();
    };
    const suClick = (e: MouseEvent) => {
      const bersaglio = e.target as Node;
      if (pannelloRef.current?.contains(bersaglio) || bottoneRef.current?.contains(bersaglio)) return;
      setAperto(false);
    };
    document.addEventListener('keydown', suTasto);
    document.addEventListener('mousedown', suClick);
    return () => {
      document.removeEventListener('keydown', suTasto);
      document.removeEventListener('mousedown', suClick);
    };
  }, [aperto, chiudi]);

  useEffect(() => {
    if (aperto) pannelloRef.current?.focus();
  }, [aperto]);

  const cambia = <K extends keyof Preferenze>(chiave: K, valore: Preferenze[K]) =>
    imposta({ ...pref, [chiave]: valore });

  return (
    <>
      <button
        ref={bottoneRef}
        type="button"
        onClick={() => setAperto((a) => !a)}
        aria-expanded={aperto}
        aria-controls={pannelloId}
        aria-label={aperto ? 'Chiudi gli strumenti di lettura' : 'Strumenti di lettura e accessibilità'}
        className="fixed bottom-4 left-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-cinema-on-ticket/15 bg-cinema-ticket text-cinema-on-ticket shadow-xl shadow-black/40 transition-colors hover:bg-cinema-ticket-hover"
      >
        {/* Figura umana, non carrozzina: di qui si cambiano colori, testo e
            animazioni — non si entra in sala. La carrozzina sta sulle pagine
            della sala, dove vuol dire davvero qualcosa. */}
        <PersonStanding className="h-7 w-7" aria-hidden="true" />
      </button>

      {aperto && (
        <div
          ref={pannelloRef}
          id={pannelloId}
          role="dialog"
          aria-label="Strumenti di lettura e accessibilità"
          tabIndex={-1}
          className="fixed bottom-[5.5rem] left-4 z-50 max-h-[calc(100vh-7.5rem)] w-[min(21rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-cinema-border-strong bg-cinema-surface p-5 shadow-2xl shadow-black/60 outline-none"
        >
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-black leading-tight text-cinema-text">Come vuoi leggere</h2>
            <button
              type="button"
              onClick={chiudi}
              aria-label="Chiudi gli strumenti di lettura"
              className="-mr-1.5 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-cinema-text-muted transition-colors hover:bg-cinema-surface-2 hover:text-cinema-text"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <Gruppo titolo="Colori">
            <div className="grid grid-cols-2 gap-2">
              {TEMI.map((t) => (
                <Scelta
                  key={t}
                  nome="tema"
                  etichetta={`${ETICHETTE_TEMA[t].nome}: ${ETICHETTE_TEMA[t].nota.toLowerCase()}`}
                  attiva={pref.tema === t}
                  onChange={() => cambia('tema', t)}
                >
                  <span className="block font-semibold">{ETICHETTE_TEMA[t].nome}</span>
                  <span className="mt-0.5 block text-[0.7rem] text-cinema-text-subtle">
                    {ETICHETTE_TEMA[t].nota}
                  </span>
                </Scelta>
              ))}
            </div>
          </Gruppo>

          <Gruppo titolo="Dimensione del testo">
            <div className="grid grid-cols-2 gap-2">
              {TESTI.map((t) => (
                <Scelta
                  key={t}
                  nome="testo"
                  etichetta={`${ETICHETTE_TESTO[t]}, ${t}%`}
                  attiva={pref.testo === t}
                  onChange={() => cambia('testo', t)}
                >
                  <span className="font-semibold">{ETICHETTE_TESTO[t]}</span>
                  <span className="ml-1.5 text-[0.7rem] tabular-nums text-cinema-text-subtle">
                    {t}%
                  </span>
                </Scelta>
              ))}
            </div>
          </Gruppo>

          <Gruppo titolo="Lettura">
            <div className="space-y-2">
              <Interruttore
                icona={<Type className="h-4 w-4" aria-hidden="true" />}
                etichetta="Carattere ad alta leggibilità"
                nota="Atkinson Hyperlegible"
                attivo={pref.carattere}
                onChange={(v) => cambia('carattere', v)}
              />
              <Interruttore
                icona={<AlignJustify className="h-4 w-4" aria-hidden="true" />}
                etichetta="Più spazio fra righe e lettere"
                attivo={pref.spaziatura}
                onChange={(v) => cambia('spaziatura', v)}
              />
              <Interruttore
                icona={<Underline className="h-4 w-4" aria-hidden="true" />}
                etichetta="Link sottolineati"
                attivo={pref.link}
                onChange={(v) => cambia('link', v)}
              />
              <Interruttore
                icona={<Pause className="h-4 w-4" aria-hidden="true" />}
                etichetta="Ferma le animazioni"
                nota="Scorrimento automatico, video, transizioni"
                attivo={pref.animazioni}
                onChange={(v) => cambia('animazioni', v)}
              />
            </div>
          </Gruppo>

          {personalizzate(pref) && (
            <button
              type="button"
              onClick={() => imposta(PREFERENZE_INIZIALI)}
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-cinema-border-strong px-3 py-2 font-utility text-xs font-semibold uppercase tracking-wider text-cinema-text-muted transition-colors hover:border-cinema-ticket-ink hover:text-cinema-ticket-ink"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Ripristina
            </button>
          )}

          <div className="mt-5 border-t border-cinema-border pt-4">
            {/* Chi apre questo pannello spesso non cerca un tema: cerca di
                sapere se può venire in sala. La risposta sta lì. */}
            <Link
              href="/accessibilita"
              onClick={chiudi}
              className="text-sm font-semibold text-cinema-ticket-ink underline underline-offset-2"
            >
              Accessibilità della sala
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-cinema-text-subtle">
              Le scelte restano su questo browser e valgono anche alla prossima visita. Non escono
              di qui: nessun dato ci arriva.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function Gruppo({ titolo, children }: { titolo: string; children: React.ReactNode }) {
  return (
    <fieldset className="mt-5">
      <legend className="mb-2.5 font-utility text-[0.68rem] font-semibold uppercase tracking-marquee text-cinema-ticket-ink">
        {titolo}
      </legend>
      {children}
    </fieldset>
  );
}

/**
 * Una scelta fra alternative. Sotto è un `<input type="radio">` vero: gruppi,
 * frecce della tastiera e annuncio dello stato arrivano gratis dal browser,
 * e nessuna imitazione con i `div` regge il confronto.
 */
function Scelta({
  nome,
  etichetta,
  attiva,
  onChange,
  children,
}: {
  nome: string;
  /** Nome accessibile. Contiene il testo visibile (WCAG 2.5.3): chi comanda a
   *  voce deve poter dire quello che legge. */
  etichetta: string;
  attiva: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        name={nome}
        checked={attiva}
        onChange={onChange}
        aria-label={etichetta}
        className="peer sr-only"
      />
      <span
        className={cn(
          'block rounded-xl border px-3 py-2.5 text-left text-sm transition-colors',
          'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cinema-ticket-ink',
          attiva
            ? 'border-cinema-ticket-ink bg-cinema-ticket-ink/15 text-cinema-text'
            : 'border-cinema-border bg-cinema-surface-2 text-cinema-text-muted hover:border-cinema-border-strong'
        )}
      >
        {children}
      </span>
    </label>
  );
}

function Interruttore({
  icona,
  etichetta,
  nota,
  attivo,
  onChange,
}: {
  icona: React.ReactNode;
  etichetta: string;
  nota?: string;
  attivo: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors',
        attivo
          ? 'border-cinema-ticket-ink bg-cinema-ticket-ink/15'
          : 'border-cinema-border bg-cinema-surface-2 hover:border-cinema-border-strong'
      )}
    >
      <input
        type="checkbox"
        checked={attivo}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={nota ? `${etichetta} (${nota})` : etichetta}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          'shrink-0 transition-colors',
          attivo ? 'text-cinema-ticket-ink' : 'text-cinema-text-subtle'
        )}
      >
        {icona}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            'block text-sm leading-snug',
            attivo ? 'font-semibold text-cinema-text' : 'text-cinema-text-muted'
          )}
        >
          {etichetta}
        </span>
        {nota && (
          <span className="mt-0.5 block text-[0.7rem] leading-snug text-cinema-text-subtle">
            {nota}
          </span>
        )}
      </span>
      {/* L'interruttore è decorativo: lo stato lo annuncia la checkbox vera. */}
      <span
        aria-hidden="true"
        className={cn(
          'relative h-5 w-9 shrink-0 rounded-full border transition-colors',
          'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cinema-ticket-ink',
          attivo ? 'border-cinema-ticket-ink bg-cinema-ticket' : 'border-cinema-border-strong bg-cinema-surface'
        )}
      >
        <span
          className={cn(
            'absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full transition-all',
            attivo ? 'left-[1.15rem] bg-cinema-on-ticket' : 'left-1 bg-cinema-text-subtle'
          )}
        />
      </span>
    </label>
  );
}
