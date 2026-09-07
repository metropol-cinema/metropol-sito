'use client';

import { useEffect, useState } from 'react';
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
 *
 * LE LISTE IN PIÙ ARRIVANO DALLA DASHBOARD, non da qui: l'elenco lo dà
 * `/api/public/newsletter/liste`, e sono quelle che l'associazione ha marcato
 * come pubbliche. Così creare una lista nuova e renderla disponibile qui non
 * richiede di toccare il sito. Se la chiamata fallisce il modulo resta quello
 * di prima e l'iscrizione funziona lo stesso: un elenco di caselle facoltative
 * non vale un modulo rotto.
 */

const API =
  process.env.NEXT_PUBLIC_NEWSLETTER_API_URL ?? 'https://app.cinemametropol.it';

/** La lista storica: è lo scopo stesso di questo modulo, non un'opzione. */
const LISTA_NEWSLETTER = 'iscritti_sito';

interface ListaPubblica {
  chiave: string;
  nome: string;
  descrizione: string;
}
export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  /* Campo-trappola: invisibile a una persona, irresistibile per uno script che
     riempie tutto quello che trova. Se arriva pieno, il server risponde OK e
     non scrive niente. */
  const [sito, setSito] = useState('');
  const [stato, setStato] = useState<'fermo' | 'invio' | 'fatto' | 'errore'>('fermo');
  const [messaggio, setMessaggio] = useState('');
  /* Il dominio sembra sbagliato. Si CHIEDE, non si corregge: `gmial.com`
     esiste davvero, e riscrivere l'indirizzo di qualcuno vorrebbe dire
     mandare la sua posta a un altro. */
  const [suggerimento, setSuggerimento] = useState<string | null>(null);
  /* Le altre liste a cui ci si può iscrivere da qui, e quelle spuntate. La
     newsletter non è fra queste: è il motivo per cui il modulo esiste. */
  const [altreListe, setAltreListe] = useState<ListaPubblica[]>([]);
  const [scelte, setScelte] = useState<string[]>([]);

  useEffect(() => {
    let vivo = true;
    void (async () => {
      try {
        const res = await fetch(`${API}/api/public/newsletter/liste`);
        const json = (await res.json()) as { ok?: boolean; liste?: ListaPubblica[] };
        if (!vivo || !json.ok) return;
        setAltreListe((json.liste ?? []).filter((l) => l.chiave !== LISTA_NEWSLETTER));
      } catch {
        // Silenzio voluto: senza l'elenco il modulo fa quello che ha sempre
        // fatto, e chi si iscrive non deve vedere un errore per una casella
        // facoltativa che non è arrivata.
      }
    })();
    return () => {
      vivo = false;
    };
  }, []);

  async function invia(e: React.FormEvent, opzioni: { forza?: boolean; indirizzo?: string } = {}) {
    e.preventDefault();
    if (stato === 'invio') return;
    setStato('invio');
    setSuggerimento(null);

    const indirizzo = opzioni.indirizzo ?? email;

    try {
      const res = await fetch(
        `${API}/api/public/newsletter/iscrizione`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: indirizzo,
            nome,
            sito,
            forza: opzioni.forza ?? false,
            liste: [LISTA_NEWSLETTER, ...scelte],
          }),
        }
      );
      const json = (await res.json()) as {
        ok?: boolean;
        messaggio?: string;
        errore?: string;
        suggerimento?: string;
      };

      if (res.ok && json.ok) {
        setStato('fatto');
        setMessaggio(json.messaggio ?? 'Iscrizione registrata.');
        setEmail('');
        setNome('');
        setSito('');
        setScelte([]);
      } else if (json.suggerimento) {
        // Non è un errore: è una domanda. Il modulo resta com'è e si chiede
        // conferma, così basta un clic sia per correggere sia per insistere.
        setStato('fermo');
        setSuggerimento(json.suggerimento);
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
        <p className="font-medium text-cinema-text">Controlla la posta.</p>
        <p className="mt-1">{messaggio}</p>
      </div>
    );
  }

  return (
    <form onSubmit={invia} className="relative space-y-2">
      <label htmlFor="newsletter-email" className="flex items-center gap-2 text-sm font-medium text-cinema-text">
        <Mail className="h-4 w-4 text-cinema-ticket-ink" aria-hidden="true" />
        Il film di venerdì, nella tua posta
      </label>
      <p className="text-xs text-cinema-text-subtle">
        Una email a settimana con il film in programma. Ti arriverà prima una richiesta di
        conferma. Ti puoi cancellare quando vuoi, con un clic.
      </p>

      {suggerimento && (
        <div
          role="status"
          className="rounded-md border border-cinema-ticket-ink/40 bg-cinema-ticket-ink/10 p-3 text-sm"
        >
          <p className="text-cinema-text">
            Forse intendevi <strong>{suggerimento}</strong>?
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={(e) => {
                setEmail(suggerimento);
                void invia(e, { forza: true, indirizzo: suggerimento });
              }}
              className="rounded-md bg-cinema-ticket-ink px-3 py-1.5 text-xs font-medium text-cinema-bg transition-opacity hover:opacity-90"
            >
              Sì, usa questo
            </button>
            <button
              type="button"
              onClick={(e) => void invia(e, { forza: true })}
              className="rounded-md border border-cinema-border px-3 py-1.5 text-xs font-medium text-cinema-text-subtle transition-colors hover:text-cinema-text"
            >
              No, il mio è corretto
            </button>
          </div>
        </div>
      )}

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
      >
        <label htmlFor="newsletter-sito">Non compilare questo campo</label>
        <input
          id="newsletter-sito"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={sito}
          onChange={(e) => setSito(e.target.value)}
        />
      </div>

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

      {altreListe.length > 0 && (
        <fieldset className="space-y-1.5">
          <legend className="text-xs text-cinema-text-subtle">Mandami anche:</legend>
          {altreListe.map((l) => (
            <label
              key={l.chiave}
              className="flex cursor-pointer items-start gap-2 text-xs text-cinema-text"
            >
              <input
                type="checkbox"
                checked={scelte.includes(l.chiave)}
                onChange={(e) =>
                  setScelte((prima) =>
                    e.target.checked
                      ? [...prima, l.chiave]
                      : prima.filter((c) => c !== l.chiave)
                  )
                }
                className="mt-0.5 h-4 w-4 shrink-0 accent-cinema-ticket-ink"
              />
              <span>
                {l.nome}
                {l.descrizione && (
                  <span className="block text-cinema-text-subtle">{l.descrizione}</span>
                )}
              </span>
            </label>
          ))}
        </fieldset>
      )}

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
