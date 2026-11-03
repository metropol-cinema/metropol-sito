'use client';

import { Check, Share2 } from 'lucide-react';
import { useState } from 'react';

/**
 * «Condividi»: sul telefono apre il pannello del sistema (WhatsApp, messaggi…),
 * dove non c'è copia l'indirizzo e lo dice.
 */
export function ShareFilm({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}`;
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, text: `${title} al Cinema Metropol`, url });
      } catch {
        // Pannello richiuso senza scegliere: non è un errore da segnalare.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Appunti negati dal browser: resta l'indirizzo nella barra.
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-cinema-border-strong bg-cinema-bg/40 px-4 font-utility text-xs font-semibold uppercase tracking-wider text-cinema-text transition-colors hover:border-cinema-ticket-ink hover:text-cinema-ticket-ink"
    >
      {copied ? (
        <Check className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Share2 className="h-4 w-4" aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? 'Link copiato' : 'Condividi'}</span>
    </button>
  );
}
