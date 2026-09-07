'use client';

import Link from 'next/link';
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
 * La richiesta di consenso per le statistiche.
 *
 * Regole che si vedono nel codice, perché sono le stesse che il Garante chiede
 * di rispettare (linee guida cookie, giugno 2021):
 *
 * - "Accetta" e "Rifiuta" hanno la stessa dimensione, lo stesso peso e stanno
 *   sulla stessa riga: dire di no deve costare quanto dire di sì.
 * - Non c'è la X, e chiudere per sfinimento non è previsto: senza risposta non
 *   parte niente, il che è già il comportamento giusto.
 * - Scorrere la pagina non vale come consenso: qui non c'è nessun listener che
 *   lo interpreti così.
 * - Il rifiuto si ricorda per sei mesi (vedi `lib/consenso.ts`), non si
 *   ripropone a ogni pagina.
 * - La scelta si cambia quando si vuole, da /privacy.
 */
export function CookieBanner() {
  const scelta = useSyncExternalStore(sottoscrivi, istantanea, istantaneaServer);
  // Sul server non sappiamo cosa ha già risposto chi arriva: disegnare il
  // banner lì significherebbe farlo lampeggiare anche a chi ha detto sì mesi
  // fa. Quindi compare a montaggio avvenuto, quando la risposta è nota.
  const montato = useNelBrowser();

  if (!montato || !statisticheConfigurate || scelta !== 'ignoto') return null;

  return (
    <div
      role="region"
      aria-labelledby="cookie-banner-titolo"
      className="fixed inset-x-4 bottom-[5.5rem] z-40 rounded-2xl border border-cinema-border-strong bg-cinema-surface p-5 shadow-2xl shadow-black/60 sm:inset-x-auto sm:bottom-4 sm:right-4 sm:w-[26rem]"
    >
      <h2 id="cookie-banner-titolo" className="text-base font-bold text-cinema-text">
        Contiamo le visite?
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-cinema-text-muted">
        Con Google Analytics vediamo quali pagine vengono lette e da dove
        arrivano le persone: ci serve per capire cosa mettere in evidenza. Sono
        cookie di statistica, non di pubblicità. Se dici di no il sito funziona
        identico e a Google non arriva nulla.
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => imposta('accettato')}
          className="flex-1 rounded-md bg-cinema-ticket-ink px-4 py-2.5 text-sm font-semibold text-cinema-bg transition-opacity hover:opacity-90"
        >
          Accetta
        </button>
        <button
          type="button"
          onClick={() => imposta('rifiutato')}
          className="flex-1 rounded-md border border-cinema-border-strong bg-cinema-surface-2 px-4 py-2.5 text-sm font-semibold text-cinema-text transition-colors hover:border-cinema-ticket-ink/60"
        >
          Rifiuta
        </button>
      </div>
      <p className="mt-3 text-xs text-cinema-text-subtle">
        <Link href="/privacy#cookie" className="underline underline-offset-2 hover:text-cinema-ticket-ink">
          Cosa raccogliamo, nel dettaglio
        </Link>
      </p>
    </div>
  );
}
