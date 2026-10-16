'use client';

import { Bell, BellOff, X } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';

import { allinea, attiva, disattiva, statoAttuale, type StatoAvviso } from '@/lib/avvisi-push';
import { istantanea, istantaneaServer, sottoscrivi, statisticheConfigurate } from '@/lib/consenso';
import { segnaAperturaApp } from '@/lib/uso-app';

/**
 * «Avvisami dei nuovi film», dentro l'app del sito.
 *
 * Due pezzi, che compaiono solo nell'app installata:
 *   - `InvitoAvvisi`: la campanella tonda in basso a destra, nello stesso posto
 *     dove nel browser c'è «Installa l'app» — che nell'app non compare più, e
 *     quindi non si pestano mai. La domanda si fa una volta: «Non ora» la
 *     rimanda di un mese, e a chi ha già risposto non si ripropone.
 *   - `AvvisiApp`: la riga in fondo alla pagina, per riaccenderlo o spegnerlo
 *     quando si vuole. Senza quella, chi ha detto «Non ora» non avrebbe più
 *     modo di cambiare idea.
 *
 * Il permesso del telefono si chiede SOLO dal tocco su «Attiva»: chiesto
 * all'apertura, la gente risponde no per riflesso e da lì non si torna indietro
 * se non dalle impostazioni del telefono.
 */

const EVENTO = 'metropol:avvisi-cambiati';
const CHIAVE_RINVIO = 'metropol:avvisi-app:rinviata-fino';
const GIORNI_RINVIO = 30;

function rinviata(): boolean {
  try {
    return Number(localStorage.getItem(CHIAVE_RINVIO) ?? 0) > Date.now();
  } catch {
    return false;
  }
}

function rinvia() {
  try {
    localStorage.setItem(CHIAVE_RINVIO, String(Date.now() + GIORNI_RINVIO * 86_400_000));
  } catch {
    // Archivio bloccato: la campanella sparisce per questa visita e basta.
  }
}

/** Lo stato condiviso dai due pezzi: quando uno lo cambia, l'altro lo rilegge. */
function useStatoAvviso(): [StatoAvviso | null, (s: StatoAvviso) => void] {
  const [stato, setStato] = useState<StatoAvviso | null>(null);

  useEffect(() => {
    let vivo = true;
    const rileggi = () => {
      statoAttuale()
        .then((s) => vivo && setStato(s))
        .catch(() => vivo && setStato('non-disponibile'));
    };
    rileggi();
    window.addEventListener(EVENTO, rileggi);
    return () => {
      vivo = false;
      window.removeEventListener(EVENTO, rileggi);
    };
  }, []);

  const cambia = useCallback((s: StatoAvviso) => {
    setStato(s);
    window.dispatchEvent(new Event(EVENTO));
  }, []);

  return [stato, cambia];
}

/** Attiva o disattiva, con l'errore detto a parole. */
function useAzione(cambia: (s: StatoAvviso) => void) {
  const [inCorso, setInCorso] = useState(false);
  const [errore, setErrore] = useState('');

  const esegui = useCallback(
    async (azione: () => Promise<StatoAvviso>) => {
      setInCorso(true);
      setErrore('');
      try {
        cambia(await azione());
      } catch {
        setErrore('Non è riuscito: controlla la connessione e riprova.');
      } finally {
        setInCorso(false);
      }
    },
    [cambia],
  );

  return { inCorso, errore, esegui };
}

export function InvitoAvvisi() {
  const consenso = useSyncExternalStore(sottoscrivi, istantanea, istantaneaServer);
  const [stato, cambia] = useStatoAvviso();
  const { inCorso, errore, esegui } = useAzione(cambia);
  const [nascosto, setNascosto] = useState(false);
  const [aperto, setAperto] = useState(false);
  const bottoneRef = useRef<HTMLButtonElement>(null);
  const pannelloRef = useRef<HTMLDivElement>(null);
  const pannelloId = useId();

  // A ogni apertura dell'app il gestionale si sente ricordare che questo
  // telefono c'è: se l'aveva perso, lo ritrova.
  useEffect(() => {
    void allinea();
    // E il contatore d'uso dell'app (Sito Web → App nel gestionale): sta qui
    // perché questo è il pezzo che c'è su ogni pagina, non perché c'entri con
    // gli avvisi. Fuori dall'app non fa niente.
    void segnaAperturaApp();
  }, []);

  const chiudi = useCallback(() => {
    setAperto(false);
    bottoneRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!aperto) return;
    const suTasto = (e: KeyboardEvent) => {
      if (e.key === 'Escape') chiudi();
    };
    const suTocco = (e: PointerEvent) => {
      const bersaglio = e.target as Node;
      if (pannelloRef.current?.contains(bersaglio) || bottoneRef.current?.contains(bersaglio)) return;
      setAperto(false);
    };
    document.addEventListener('keydown', suTasto);
    document.addEventListener('pointerdown', suTocco);
    return () => {
      document.removeEventListener('keydown', suTasto);
      document.removeEventListener('pointerdown', suTocco);
    };
  }, [aperto, chiudi]);

  useEffect(() => {
    if (aperto) pannelloRef.current?.focus();
  }, [aperto]);

  const nonOra = () => {
    rinvia();
    setAperto(false);
    setNascosto(true);
  };

  // Anche questa aspetta la risposta sui cookie: due domande insieme in fondo
  // allo schermo sono una di troppo.
  if (
    stato !== 'spento' ||
    nascosto ||
    rinviata() ||
    (statisticheConfigurate && consenso === 'ignoto')
  ) {
    return null;
  }

  return (
    <>
      <button
        ref={bottoneRef}
        type="button"
        onClick={() => setAperto((a) => !a)}
        aria-expanded={aperto}
        aria-controls={pannelloId}
        aria-label={aperto ? 'Chiudi «Avvisi dei nuovi film»' : 'Ricevi un avviso quando escono i nuovi film'}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-cinema-border-strong bg-cinema-surface text-cinema-text shadow-xl shadow-black/40 transition-colors hover:border-cinema-text-subtle"
      >
        <Bell className="h-6 w-6" aria-hidden="true" />
      </button>

      {aperto && (
        <div
          ref={pannelloRef}
          id={pannelloId}
          role="dialog"
          aria-label="Avvisi dei nuovi film"
          tabIndex={-1}
          className="fixed bottom-[5.5rem] right-4 z-50 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-cinema-border-strong bg-cinema-surface p-5 text-cinema-text shadow-2xl shadow-black/60 outline-none"
        >
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-lg font-semibold leading-tight">Avvisi dei nuovi film</h2>
            <button
              type="button"
              onClick={chiudi}
              aria-label="Chiudi"
              className="-mr-1.5 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-cinema-text-subtle transition-colors hover:bg-cinema-bg hover:text-cinema-text"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-cinema-text-muted">
            Una notifica sul telefono quando esce la nuova programmazione. Niente altro, e la
            spegni quando vuoi dal fondo della pagina.
          </p>

          {errore && (
            <p role="alert" className="mt-3 text-sm text-cinema-ticket-ink">
              {errore}
            </p>
          )}

          <div className="mt-5 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={nonOra}
              className="rounded-lg px-3 py-2 text-sm font-medium text-cinema-text-subtle transition-colors hover:bg-cinema-bg hover:text-cinema-text"
            >
              Non ora
            </button>
            <button
              type="button"
              onClick={() => void esegui(attiva)}
              disabled={inCorso}
              className="rounded-lg bg-cinema-ticket px-4 py-2 text-sm font-semibold text-cinema-on-ticket transition-colors hover:bg-cinema-ticket-hover disabled:opacity-60"
            >
              {inCorso ? 'Un attimo…' : 'Attiva'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/** La riga in fondo alla pagina: c'è sempre, nell'app, finché il telefono le notifiche le sa fare. */
export function AvvisiApp() {
  const [stato, cambia] = useStatoAvviso();
  const { inCorso, errore, esegui } = useAzione(cambia);

  if (!stato || stato === 'non-disponibile') return null;

  const acceso = stato === 'acceso';
  const Icona = acceso ? Bell : BellOff;

  return (
    <div className="border-t border-cinema-border">
      <div className="container flex max-w-2xl flex-wrap items-center justify-between gap-3 py-6">
        <div className="flex items-start gap-3">
          <Icona className="mt-0.5 h-5 w-5 shrink-0 text-cinema-ticket-ink" aria-hidden="true" />
          <div>
            <h2 className="text-base font-semibold text-cinema-text">Avvisi dei nuovi film</h2>
            <p className="text-sm text-cinema-text-muted" aria-live="polite">
              {stato === 'bloccato'
                ? 'Le notifiche per questa app sono bloccate nelle impostazioni del telefono: si riattivano da lì.'
                : acceso
                  ? 'Attivi: ti arriva una notifica quando esce la nuova programmazione.'
                  : 'Spenti. Attivali per sapere quando esce la nuova programmazione.'}
            </p>
            {errore && (
              <p role="alert" className="mt-1 text-sm text-cinema-ticket-ink">
                {errore}
              </p>
            )}
          </div>
        </div>
        {stato !== 'bloccato' && (
          <button
            type="button"
            onClick={() => void esegui(acceso ? disattiva : attiva)}
            disabled={inCorso}
            className={
              acceso
                ? 'rounded-lg border border-cinema-border-strong px-4 py-2 text-sm font-medium text-cinema-text transition-colors hover:bg-cinema-surface disabled:opacity-60'
                : 'rounded-lg bg-cinema-ticket px-4 py-2 text-sm font-semibold text-cinema-on-ticket transition-colors hover:bg-cinema-ticket-hover disabled:opacity-60'
            }
          >
            {inCorso ? 'Un attimo…' : acceso ? 'Disattiva' : 'Attiva'}
          </button>
        )}
      </div>
    </div>
  );
}
