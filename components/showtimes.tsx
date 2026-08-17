import { MapPin, Ticket } from 'lucide-react';
import type { CSSProperties } from 'react';

import type { PublicFilm, PublicPrice, PublicShowtime } from '@/lib/programmazione-client';
import { formatDayIt, formatTimeIt } from '@/lib/programmazione-client';
import { ticketUrlFor } from '@/lib/tickets';
import { cn, formatEuro } from '@/lib/utils';

/** La sala "di casa": mostriamo il luogo solo quando la proiezione è altrove. */
const DEFAULT_VENUE = 'Cinema Metropol';

function priceText(prices: PublicPrice[]): string {
  return prices.map((p) => `${p.label} ${formatEuro(p.amount)}`).join(' · ');
}

/** Firma identica per due liste prezzi (a meno dell'ordine). */
function priceKey(prices: PublicPrice[]): string {
  return [...prices]
    .map((p) => `${p.type}:${p.amount}`)
    .sort()
    .join('|');
}

/**
 * Prezzi comuni a TUTTE le proiezioni passate (caso largamente prevalente):
 * così li mostriamo una volta sola invece di ripeterli su ogni orario.
 * null se le proiezioni hanno prezzi diversi tra loro o nessun prezzo.
 */
function commonPrices(showtimes: PublicShowtime[]): PublicPrice[] | null {
  const withPrices = showtimes.filter((s) => s.prices.length > 0);
  if (withPrices.length === 0 || withPrices.length !== showtimes.length) return null;
  const first = priceKey(withPrices[0].prices);
  return withPrices.every((s) => priceKey(s.prices) === first) ? withPrices[0].prices : null;
}

/** Legenda prezzi del film, da mostrare una volta sopra/accanto agli orari. */
export function PriceLegend({
  showtimes,
  className,
}: {
  showtimes: PublicShowtime[];
  className?: string;
}) {
  const common = commonPrices(showtimes);
  if (!common) return null;
  return (
    <p className={cn('text-xs text-cinema-text-subtle', className)}>
      <span className="sr-only">Prezzi: </span>
      {priceText(common)}
    </p>
  );
}

interface ShowtimesProps {
  film: PublicFilm;
  /** Sottoinsieme da mostrare (default: tutte le proiezioni del film). */
  showtimes?: PublicShowtime[];
  size?: 'md' | 'lg';
  /** Mostra il giorno nell'aria-label (utile dove l'orario non lo riporta). */
  withDayInLabel?: boolean;
  /** Mostra il badge "luogo" quando la proiezione è fuori sala. */
  showVenue?: boolean;
  /** Colore delle tacche della perforazione: deve combaciare con lo sfondo. */
  perfBg?: string;
  ariaLabel?: string;
  className?: string;
}

/**
 * Orari di un film come "biglietti": orario + tagliando d'acquisto dorato.
 * È il blocco di prenotazione condiviso da hero, card, scheda e calendario.
 * I prezzi comuni vanno mostrati a parte con <PriceLegend>; qui appaiono solo
 * quando differiscono tra una proiezione e l'altra.
 */
export function Showtimes({
  film,
  showtimes,
  size = 'md',
  withDayInLabel = false,
  showVenue = false,
  perfBg,
  ariaLabel,
  className,
}: ShowtimesProps) {
  const list = showtimes ?? film.showtimes;
  const perFilmCommon = commonPrices(list) !== null;
  const lg = size === 'lg';

  return (
    <ul
      className={cn('flex flex-wrap items-start gap-2.5', className)}
      aria-label={ariaLabel ?? `Orari di ${film.title}`}
    >
      {list.map((s) => {
        const buyUrl = ticketUrlFor(s.sourceId, film.title);
        const time = formatTimeIt(s.startsAt);
        const when = withDayInLabel ? `${formatDayIt(s.startsAt)} ore ${time}` : `ore ${time}`;
        const elsewhere = showVenue && s.venue && s.venue !== DEFAULT_VENUE;
        // Mostra il prezzo sul singolo orario solo se NON è comune a tutto il film.
        const ownPrice = !perFilmCommon && s.prices.length > 0 ? priceText(s.prices) : null;

        return (
          <li key={s.sourceId} className="flex flex-col gap-1">
            {buyUrl ? (
              <div className="ticket" style={perfBg ? ({ '--perf-bg': perfBg } as CSSProperties) : undefined}>
                <span className="ticket-body">
                  <time
                    dateTime={s.startsAt}
                    className={cn(
                      'font-display font-black tabular-nums text-cinema-text',
                      lg ? 'text-2xl' : 'text-lg'
                    )}
                  >
                    {time}
                  </time>
                </span>
                <a
                  href={buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Acquista biglietti per ${film.title}, ${when} (si apre in una nuova scheda)`}
                  className="ticket-stub"
                >
                  <Ticket className={lg ? 'h-4 w-4' : 'h-3.5 w-3.5'} aria-hidden="true" />
                  Acquista
                </a>
              </div>
            ) : (
              <span className="timechip">
                <time
                  dateTime={s.startsAt}
                  className={cn(
                    'font-display font-black tabular-nums text-cinema-text',
                    lg ? 'text-2xl' : 'text-lg'
                  )}
                >
                  {time}
                </time>
              </span>
            )}

            {elsewhere && (
              <span className="inline-flex w-fit items-center gap-1 rounded-md bg-cinema-curtain/25 px-2 py-0.5 font-utility text-xs font-semibold text-cinema-curtain-light">
                <MapPin className="h-3 w-3" aria-hidden="true" /> {s.venue}
              </span>
            )}
            {ownPrice && <span className="text-xs text-cinema-text-subtle">{ownPrice}</span>}
          </li>
        );
      })}
    </ul>
  );
}
