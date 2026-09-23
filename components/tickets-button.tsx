import { ExternalLink, Ticket } from 'lucide-react';

/**
 * «Acquista biglietti»: porta al portale di vendita in una scheda nuova.
 *
 * ── PERCHÉ UNA SCHEDA E NON UNA FINESTRA SOPRA LA PAGINA ────────────────────
 *
 * Provata, e non funziona con questo portale: `ticket.cinebot.it` manda i suoi
 * cookie — `ticketcinebot` (la sessione) e `SERVERID` (che tiene la richiesta
 * sullo stesso server) — senza `SameSite=None; Secure`. Dentro una cornice di
 * un altro sito i browser non li rimandano indietro e spesso non li salvano
 * nemmeno: la sessione si perde a ogni richiesta e l'acquisto resta su una
 * pagina bianca. Non è un rifiuto dichiarato (di `X-Frame-Options` e CSP non ce
 * n'è) — la cornice si apre e basta, e dentro non si compra.
 * Il giorno che quei cookie avessero `SameSite=None; Secure`, la finestra
 * sovrapposta tornerebbe possibile.
 *
 * La scheda nuova fa comunque la cosa che conta: chi non conclude l'acquisto
 * ritrova la scheda del film **esattamente com'era** — stessa posizione, niente
 * ricaricamento — perché quella pagina non si è mai mossa.
 *
 * Nessun 'use client': è un link, non serve JavaScript.
 */
export function TicketsButton({ url, title }: { url: string; title: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full bg-cinema-ticket px-5 py-2.5 font-utility text-sm font-bold uppercase tracking-wider text-cinema-on-ticket transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <Ticket className="h-4 w-4" aria-hidden="true" />
      Acquista biglietti
      {/* Chi apre in una scheda nuova va avvisato prima di cliccare: il simbolo
          per chi guarda, la frase per chi ascolta. */}
      <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
      <span className="sr-only"> per {title}, si apre in una scheda nuova</span>
    </a>
  );
}
