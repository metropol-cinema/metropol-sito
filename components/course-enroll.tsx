'use client';

import { CreditCard, Loader2 } from 'lucide-react';
import { useState } from 'react';

/**
 * Il bottone "Iscriviti e paga": chiede al sito il link di pagamento e ci porta.
 *
 * Il prezzo non viene mai mandato da qui — lo decide il gestionale leggendolo
 * dal database — quindi non c'è nulla da manomettere nel browser.
 */
export function CourseEnroll({ slug, price }: { slug: string; price: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function start() {
    setPending(true);
    setError(null);
    try {
      const res = await fetch('/api/corsi/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
      const json = (await res.json().catch(() => null)) as
        | { ok?: boolean; url?: string; error?: string }
        | null;
      if (json?.ok && json.url) {
        window.location.href = json.url;
        return;
      }
      setError(json?.error ?? 'Impossibile avviare il pagamento. Riprova.');
    } catch {
      setError('Impossibile avviare il pagamento. Riprova.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={start}
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cinema-ticket px-5 py-3 font-utility text-sm font-bold uppercase tracking-wider text-cinema-bg transition-colors hover:bg-cinema-ticket-hover disabled:opacity-60"
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <CreditCard className="h-4 w-4" aria-hidden="true" />
        )}
        Iscriviti e paga {price}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-sm text-cinema-danger">
          {error}
        </p>
      )}
      <p className="mt-2 text-xs leading-relaxed text-cinema-text-subtle">
        Pagamento con carta gestito da Stripe. Il Cinema Metropol non vede né conserva i dati della
        tua carta.
      </p>
    </div>
  );
}
