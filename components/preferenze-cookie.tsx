'use client';

import { Check, Minus, X } from 'lucide-react';
import { useSyncExternalStore } from 'react';

import {
  imposta,
  istantanea,
  istantaneaServer,
  sottoscrivi,
  statisticheConfigurate,
  useNelBrowser,
} from '@/lib/consenso';

/**
 * Il pannello dentro /privacy: dice come sta la scelta adesso e la cambia.
 *
 * Serve a rendere vera la frase "puoi revocare il consenso quando vuoi": senza
 * un posto dove farlo, resta un modo di dire. Revocando si cancellano anche i
 * cookie già scritti (`dimenticaStatistiche` in lib/consenso.ts).
 */
export function PreferenzeCookie() {
  const scelta = useSyncExternalStore(sottoscrivi, istantanea, istantaneaServer);
  const montato = useNelBrowser();

  if (!statisticheConfigurate) {
    return (
      <p className="rounded-2xl border border-cinema-border bg-cinema-surface p-5 text-sm leading-relaxed text-cinema-text-muted">
        In questo momento il sito non ha nessuno strumento di statistica
        attivo: non c&apos;è niente da accettare o rifiutare.
      </p>
    );
  }

  const stato = !montato
    ? { icona: Minus, classe: 'text-cinema-text-subtle', testo: 'Sto leggendo la tua scelta…' }
    : scelta === 'accettato'
      ? { icona: Check, classe: 'text-cinema-success', testo: 'Hai accettato i cookie di statistica.' }
      : scelta === 'rifiutato'
        ? { icona: X, classe: 'text-cinema-text-subtle', testo: 'Hai rifiutato: nessuna statistica viene raccolta.' }
        : { icona: Minus, classe: 'text-cinema-text-subtle', testo: 'Non hai ancora risposto, quindi non raccogliamo nulla.' };
  const Icona = stato.icona;

  return (
    <div className="rounded-2xl border border-cinema-border bg-cinema-surface p-5">
      <p className="flex items-center gap-3 text-sm text-cinema-text">
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current ${stato.classe}`}
        >
          <Icona className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <span aria-live="polite">{stato.testo}</span>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => imposta('accettato')}
          disabled={!montato || scelta === 'accettato'}
          className="rounded-md bg-cinema-ticket-ink px-4 py-2 text-sm font-semibold text-cinema-bg transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          Accetta le statistiche
        </button>
        <button
          type="button"
          onClick={() => imposta('rifiutato')}
          disabled={!montato || scelta === 'rifiutato'}
          className="rounded-md border border-cinema-border-strong bg-cinema-surface-2 px-4 py-2 text-sm font-semibold text-cinema-text transition-colors hover:border-cinema-ticket-ink/60 disabled:opacity-40"
        >
          Rifiuta / revoca
        </button>
      </div>
      <p className="mt-3 text-xs text-cinema-text-subtle">
        La scelta resta su questo browser. Da un altro dispositivo, o dopo aver
        cancellato i dati del sito, te la richiederemo.
      </p>
    </div>
  );
}
