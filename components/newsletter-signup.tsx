'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

/**
 * Il modulo di iscrizione alla newsletter.
 *
 * Manda l'indirizzo alla dashboard (`/api/public/newsletter/iscrizione`), che
 * è dove vive l'elenco: qui non si tiene niente. Il sito è pubblico e statico,
 * e una lista di indirizzi email non ha ragione di passarci in mezzo.
 *
 * CHIEDE SOLO L'EMAIL, e il nome come facoltativo. Ogni campo obbligatorio in
 * più è gente che non si iscrive; il nome serve solo a scrivere «Ciao Mario»
 * invece di «Ciao», e chi non lo lascia riceve comunque un saluto sensato.
 */
export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [stato, setStato] = useState<'fermo' | 'invio' | 'fatto' | 'errore'>('fermo');
  const [messaggio, setMessaggio] = useState('');

  async function invia(e: React.FormEvent) {
    e.preventDefault();
    if (stato === 'invio') return;
    setStato('invio');

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NEWSLETTER_API_URL ?? 'https://app.cinemametropol.it'}/api/public/newsletter/iscrizione`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, nome }),
        }
      );
      const json = (await res.json()) as { ok?: boolean; messaggio?: string; errore?: string };

      if (res.ok && json.ok) {
        setStato('fatto');
        setMessaggio(json.messaggio ?? 'Iscrizione registrata.');
        setEmail('');
        setNome('');
      } else {
        setStato('errore');
        setMessaggio(json.errore ?? 'Non ha funzionato. Riprova fra poco.');
      }
    } catch {
      setStato('errore');
      setMessaggio('Non ha funzionato. Controlla la connessione e riprova.');
    }
  }

  if (stato === 'fatto') {
    return (
      <div role="status" className="text-sm text-cinema-text-subtle">
        <p className="font-medium text-cinema-text">Fatto.</p>
        <p className="mt-1">{messaggio}</p>
      </div>
    );
  }

  return (
    <form onSubmit={invia} className="space-y-2">
      <label htmlFor="newsletter-email" className="flex items-center gap-2 text-sm font-medium text-cinema-text">
        <Mail className="h-4 w-4 text-cinema-ticket-ink" aria-hidden="true" />
        Il film di venerdì, nella tua posta
      </label>
      <p className="text-xs text-cinema-text-subtle">
        Una email a settimana con il film in programma. Ti puoi cancellare quando vuoi, con un clic.
      </p>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="newsletter-nome"
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome (facoltativo)"
          aria-label="Nome, facoltativo"
          autoComplete="given-name"
          className="min-w-0 flex-1 rounded-md border border-cinema-border bg-cinema-surface px-3 py-2 text-sm text-cinema-text placeholder:text-cinema-text-subtle focus:border-cinema-ticket-ink focus:outline-none focus:ring-1 focus:ring-cinema-ticket-ink"
        />
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="la-tua@email.it"
          autoComplete="email"
          className="min-w-0 flex-[2] rounded-md border border-cinema-border bg-cinema-surface px-3 py-2 text-sm text-cinema-text placeholder:text-cinema-text-subtle focus:border-cinema-ticket-ink focus:outline-none focus:ring-1 focus:ring-cinema-ticket-ink"
        />
        <button
          type="submit"
          disabled={stato === 'invio'}
          className="shrink-0 rounded-md bg-cinema-ticket-ink px-4 py-2 text-sm font-medium text-cinema-bg transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {stato === 'invio' ? 'Attendi…' : 'Iscriviti'}
        </button>
      </div>

      {stato === 'errore' && (
        <p role="alert" className="text-xs text-red-400">
          {messaggio}
        </p>
      )}

      {/* Nessun link a un'informativa: sul sito non c'è ancora una pagina
          privacy, e mandare a un 404 è peggio che dirlo in una riga. Quando la
          pagina ci sarà, il link va qui. */}
      <p className="text-xs text-cinema-text-subtle">
        Usiamo il tuo indirizzo solo per mandarti questa newsletter, e per
        nient’altro.
      </p>
    </form>
  );
}
