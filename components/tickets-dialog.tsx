'use client';

import { ExternalLink, Ticket, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * «Acquista biglietti»: apre la pagina di vendita in una finestra sopra la
 * scheda, invece di portare via da questo sito.
 *
 * PERCHÉ SOPRA E NON AL POSTO: chi non conclude l'acquisto — ci ripensa,
 * sbaglia, vuole ricontrollare l'orario — chiudendo si ritrova esattamente dove
 * era partito, con la scheda aperta e la pagina alla stessa altezza. Mandarlo
 * via e farlo tornare indietro col tasto del browser significa ricaricare,
 * ripartire dall'alto e, spesso, non tornare affatto.
 *
 * È un `<dialog>` nativo: chiusura con Esc, focus confinato dentro e restituito
 * al bottone quando si chiude, senza scrivere niente di tutto questo a mano.
 *
 * L'iframe si monta al primo click — prima la pagina non contatta il portale
 * dei biglietti — e da lì resta montato: chi chiude a metà e riapre ritrova
 * l'acquisto dov'era, non da capo.
 *
 * ⚠️ IL RIPARO: dentro una cornice di un altro sito certi browser bloccano i
 * cookie di terze parti, e un acquisto senza sessione si pianta a metà. Per
 * questo in alto c'è sempre «Apri in una scheda nuova»: se la pagina non si
 * carica o si comporta male, la via d'uscita è lì e non è da cercare.
 */
export function TicketsDialog({ url, title }: { url: string; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [montato, setMontato] = useState(false);

  const apri = useCallback(() => {
    setMontato(true);
    dialogRef.current?.showModal();
  }, []);

  const chiudi = useCallback(() => dialogRef.current?.close(), []);

  // Clic sullo sfondo = chiudi. Il dialog nativo occupa tutto lo schermo, e i
  // clic fuori dal riquadro arrivano a lui: si distinguono dal bersaglio.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClick = (e: MouseEvent) => {
      if (e.target === dialog) dialog.close();
    };
    dialog.addEventListener('click', onClick);
    return () => dialog.removeEventListener('click', onClick);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={apri}
        className="inline-flex items-center gap-2 rounded-full bg-cinema-ticket px-5 py-2.5 font-utility text-sm font-bold uppercase tracking-wider text-cinema-on-ticket transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <Ticket className="h-4 w-4" aria-hidden="true" />
        Acquista biglietti
        <span className="sr-only"> per {title}, si apre in una finestra su questa pagina</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={`Acquisto biglietti per ${title}`}
        className="w-[min(100vw-1.5rem,64rem)] max-w-none rounded-2xl border border-cinema-border bg-cinema-surface p-0 text-cinema-text backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center justify-between gap-3 border-b border-cinema-border px-4 py-3">
          <p className="font-utility text-xs font-bold uppercase tracking-wider text-cinema-text-subtle">
            Biglietti · <span className="text-cinema-text">{title}</span>
          </p>
          <div className="flex items-center gap-3">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-utility text-xs font-semibold uppercase tracking-wider text-cinema-ticket-ink underline underline-offset-4"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              Apri in una scheda nuova
            </a>
            <button
              type="button"
              onClick={chiudi}
              className="rounded-full border border-cinema-border p-1.5 text-cinema-text-subtle transition-colors hover:text-cinema-text"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Chiudi e torna alla scheda del film</span>
            </button>
          </div>
        </div>

        <div className="h-[min(80vh,44rem)] w-full bg-white">
          {montato && (
            <iframe
              src={url}
              title={`Acquisto biglietti per ${title}`}
              // `payment` serve ai metodi di pagamento del browser; senza, certi
              // portali non arrivano in fondo.
              allow="payment"
              className="h-full w-full border-0"
            />
          )}
        </div>
      </dialog>
    </>
  );
}
