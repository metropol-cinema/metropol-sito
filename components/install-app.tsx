'use client';

import { Download, Share, SquarePlus, X } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';

import { istantanea, istantaneaServer, sottoscrivi, statisticheConfigurate } from '@/lib/consenso';

/**
 * «Installa l'app»: un bottone tondo in basso a destra, al posto della
 * striscia che Chrome su Android apre da sé in fondo allo schermo.
 *
 * La striscia di Chrome (la «mini-infobar») compare quando le pare, copre il
 * fondo della pagina — dove stanno i bottoni dei moduli — e se la si chiude
 * non torna per mesi. Intercettando `beforeinstallprompt` la si sopprime e ci
 * si tiene l'evento: il dialogo nativo d'installazione parte quando lo chiede
 * l'utente, dal nostro bottone.
 *
 * iOS quell'evento non lo manda: Safari non propone mai l'installazione, la si
 * fa a mano dal menu Condividi, e quasi nessuno sa che esiste. Lì il bottone
 * apre le istruzioni invece del dialogo.
 *
 * Il bottone compare solo sui dispositivi touch (sul computer Chrome ha già la
 * sua icona discreta nella barra dell'indirizzo), mai dentro l'app già
 * installata, e sparisce per un mese con «Non ora». Il ricordo sta nel browser,
 * dominio per dominio. E aspetta che la domanda sui cookie abbia avuto
 * risposta: due richieste insieme in fondo allo schermo sono una di troppo, e
 * quella sui cookie viene prima.
 *
 * È lo stesso componente del gestionale (components/pwa/installa-app.tsx),
 * con i colori del sito.
 */

/** Non è nei tipi del DOM: è un'estensione di Chromium. */
type EventoInstallazione = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

type Modo = 'android' | 'ios';

const CHIAVE_RINVIO = 'metropol:installa-app:rinviata-fino';
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
    // Navigazione privata o archivio bloccato: il bottone sparisce lo stesso
    // per questa visita, tornerà alla prossima.
  }
}

/** Già aperta come app: dalla schermata Home, o installata da Chrome. */
function giaInstallata(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

/** iPhone e iPad. L'iPad recente si presenta come un Mac: lo tradisce il touch. */
function suIos(): boolean {
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
}

/** Telefono o tablet, non ancora installata: le condizioni comuni ai due modi. */
function daProporre(): boolean {
  return !giaInstallata() && window.matchMedia('(pointer: coarse)').matches;
}

const nessunaSottoscrizione = () => () => {};

export function InstallApp() {
  const consenso = useSyncExternalStore(sottoscrivi, istantanea, istantaneaServer);
  // Sul server non si sa che dispositivo c'è dall'altra parte: il bottone
  // compare solo a montaggio avvenuto.
  const nelBrowser = useSyncExternalStore(
    nessunaSottoscrizione,
    () => true,
    () => false,
  );
  /** Chrome ha proposto l'installazione e l'evento è da parte. */
  const [android, setAndroid] = useState(false);
  /** «Non ora» o installazione avviata: per questa visita basta così. */
  const [nascosto, setNascosto] = useState(false);
  const [aperto, setAperto] = useState(false);
  const eventoRef = useRef<EventoInstallazione | null>(null);
  const bottoneRef = useRef<HTMLButtonElement>(null);
  const pannelloRef = useRef<HTMLDivElement>(null);
  const pannelloId = useId();

  useEffect(() => {
    if (suIos() || !daProporre()) return;

    const suProposta = (e: Event) => {
      // Anche se l'utente ha detto «Non ora»: senza preventDefault Chrome
      // aprirebbe comunque la sua striscia, che è proprio ciò che si evita.
      e.preventDefault();
      eventoRef.current = e as EventoInstallazione;
      if (!rinviata()) setAndroid(true);
    };
    const suInstallata = () => {
      eventoRef.current = null;
      setAndroid(false);
      setAperto(false);
    };
    window.addEventListener('beforeinstallprompt', suProposta);
    window.addEventListener('appinstalled', suInstallata);
    return () => {
      window.removeEventListener('beforeinstallprompt', suProposta);
      window.removeEventListener('appinstalled', suInstallata);
    };
  }, []);

  const modo: Modo | null =
    !nelBrowser || nascosto
      ? null
      : android
        ? 'android'
        : suIos() && daProporre() && !rinviata()
          ? 'ios'
          : null;

  const chiudi = useCallback(() => {
    setAperto(false);
    bottoneRef.current?.focus();
  }, []);

  // Esc chiude e riporta il focus al bottone; un tocco fuori chiude e basta.
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

  const installa = async () => {
    const evento = eventoRef.current;
    if (!evento) return;
    // L'evento si usa una volta sola: se Chrome vorrà riproporre
    // l'installazione, ne manderà un altro.
    eventoRef.current = null;
    setAperto(false);
    setAndroid(false);
    await evento.prompt();
    const { outcome } = await evento.userChoice;
    if (outcome === 'dismissed') rinvia();
  };

  if (!modo || (statisticheConfigurate && consenso === 'ignoto')) return null;

  return (
    <>
      <button
        ref={bottoneRef}
        type="button"
        onClick={() => setAperto((a) => !a)}
        aria-expanded={aperto}
        aria-controls={pannelloId}
        aria-label={aperto ? "Chiudi «Installa l'app»" : "Installa l'app sul telefono"}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-cinema-border-strong bg-cinema-surface text-cinema-text shadow-xl shadow-black/40 transition-colors hover:border-cinema-text-subtle"
      >
        <Download className="h-6 w-6" aria-hidden="true" />
      </button>

      {aperto && (
        <div
          ref={pannelloRef}
          id={pannelloId}
          role="dialog"
          aria-label="Installa l'app"
          tabIndex={-1}
          className="fixed bottom-[5.5rem] right-4 z-50 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-cinema-border-strong bg-cinema-surface p-5 text-cinema-text shadow-2xl shadow-black/60 outline-none"
        >
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-lg font-semibold leading-tight">Installa l&apos;app</h2>
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
            Un&apos;icona nella schermata Home e si apre a tutto schermo, senza la barra del
            browser.
          </p>

          {modo === 'ios' && (
            <ol className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Share className="mt-0.5 h-5 w-5 shrink-0 text-cinema-text" aria-hidden="true" />
                <span>
                  Tocca <strong>Condividi</strong>, il quadrato con la freccia in su. Se non lo
                  vedi, è dentro il menu <strong>⋯</strong>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <SquarePlus className="mt-0.5 h-5 w-5 shrink-0 text-cinema-text" aria-hidden="true" />
                <span>
                  Scegli <strong>Aggiungi alla schermata Home</strong>.
                </span>
              </li>
            </ol>
          )}

          <div className="mt-5 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={nonOra}
              className="rounded-lg px-3 py-2 text-sm font-medium text-cinema-text-subtle transition-colors hover:bg-cinema-bg hover:text-cinema-text"
            >
              Non ora
            </button>
            {modo === 'android' && (
              <button
                type="button"
                onClick={installa}
                className="rounded-lg bg-cinema-ticket px-4 py-2 text-sm font-semibold text-cinema-on-ticket transition-colors hover:bg-cinema-ticket-hover"
              >
                Installa
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
