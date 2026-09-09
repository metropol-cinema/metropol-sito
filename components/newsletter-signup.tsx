'use client';

import { useEffect, useState } from 'react';
import { Mail } from 'lucide-react';
import Link from 'next/link';

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
 *
 * ANCHE LA NEWSLETTER È UNA CASELLA, e si può togliere. Prima era implicita:
 * qualunque cosa si spuntasse, l'iscrizione comprendeva sempre la newsletter
 * storica. Con «Film accessibili» non regge più — chi chiede di essere
 * avvisato quando c'è una proiezione che può seguire non sta chiedendo una
 * email a settimana, e dargliela lo stesso è il motivo per cui la gente preme
 * «segnala come spam».
 *
 * QUALE CASELLA ARRIVA SPUNTATA LO DICE LA DASHBOARD, col flag `predefinita`
 * (migrazione 0107), non questo file: cambiare la lista di partenza non deve
 * costare un deploy del sito, che è lo stesso motivo per cui le liste sono
 * diventate righe di una tabella. Qui resta solo la rete di sicurezza: se
 * l'elenco non arriva, le caselle non si vedono e vale la newsletter storica,
 * cioè quello che il modulo ha sempre fatto.
 */

const API =
  process.env.NEXT_PUBLIC_NEWSLETTER_API_URL ?? 'https://app.cinemametropol.it';

/** La lista storica («Tutta la programmazione»). Serve solo da ripiego quando
 *  l'elenco delle liste non arriva: in quel caso è a lei che ci si iscrive. */
const LISTA_NEWSLETTER = 'iscritti_sito';

interface ListaPubblica {
  chiave: string;
  nome: string;
  descrizione: string;
  /** La casella arriva già spuntata: lo decide la dashboard, non il sito. */
  predefinita?: boolean;
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
  /* Le liste a cui ci si può iscrivere da qui, nell'ordine deciso in
     dashboard, e quelle spuntate in questo momento. */
  const [liste, setListe] = useState<ListaPubblica[]>([]);
  const [predefinite, setPredefinite] = useState<string[]>([LISTA_NEWSLETTER]);
  const [scelte, setScelte] = useState<string[]>([LISTA_NEWSLETTER]);

  useEffect(() => {
    let vivo = true;
    void (async () => {
      try {
        const res = await fetch(`${API}/api/public/newsletter/liste`);
        const json = (await res.json()) as { ok?: boolean; liste?: ListaPubblica[] };
        if (!vivo || !json.ok) return;
        const arrivate = json.liste ?? [];
        if (arrivate.length === 0) return;
        setListe(arrivate);
        /* Le spuntate di partenza le dice la dashboard. Se non ne marca
           nessuna si parte dalla lista storica invece che da niente: un
           modulo che si apre con tutte le caselle vuote sembra rotto, e chi
           preme «Iscriviti» senza guardare si sentirebbe dire di scegliere
           qualcosa. */
        const marcate = arrivate.filter((l) => l.predefinita).map((l) => l.chiave);
        const partenza =
          marcate.length > 0
            ? marcate
            : arrivate.some((l) => l.chiave === LISTA_NEWSLETTER)
              ? [LISTA_NEWSLETTER]
              : [arrivate[0].chiave];
        setPredefinite(partenza);
        setScelte(partenza);
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
    /* Nessuna casella spuntata: non c'è niente da mandare, e iscrivere
       qualcuno «a niente» lo lascerebbe convinto di essersi iscritto. */
    if (scelte.length === 0) {
      setStato('errore');
      setMessaggio('Scegli almeno una cosa da ricevere.');
      return;
    }

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
            liste: scelte,
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
        setScelte(predefinite);
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
        Le nostre proposte, nella tua posta
      </label>
      {/* «Una email a settimana» sta qui solo quando le caselle non ci sono:
          quando ci sono, ogni lista si descrive da sé, e ripetere la stessa
          frase a tre centimetri di distanza fa sembrare che parlino di due
          cose diverse. */}
      <p className="text-xs text-cinema-text-subtle">
        {liste.length === 0 && 'Una email a settimana con il film in programma. '}
        Ti arriverà prima una richiesta di conferma. Ti puoi cancellare quando vuoi, con un
        clic.
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

      {liste.length > 0 && (
        <fieldset className="space-y-1.5">
          <legend className="text-xs text-cinema-text-subtle">Cosa vuoi ricevere:</legend>
          {liste.map((l) => (
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

      <p className="text-xs text-cinema-text-subtle">
        Usiamo il tuo indirizzo solo per mandarti questa newsletter, e per
        nient’altro:{' '}
        <Link href="/privacy#newsletter" className="underline underline-offset-2 hover:text-cinema-ticket-ink">
          come trattiamo i tuoi dati
        </Link>
        .
      </p>
    </form>
  );
}
