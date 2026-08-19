import { MapPin, Ticket } from 'lucide-react';
import type { CSSProperties } from 'react';

import type { PublicFilm, PublicPrice, PublicShowtime } from '@/lib/programmazione-client';
import { formatDayIt, formatTimeIt, relativeDayIt, romeDayKey } from '@/lib/programmazione-client';
import { isHomeVenue } from '@/lib/site';
import { ticketUrlFor } from '@/lib/tickets';
import { cn, formatEuro } from '@/lib/utils';

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
        const elsewhere = showVenue && s.venue && !isHomeVenue(s.venue);
        // Mostra il prezzo sul singolo orario solo se NON è comune a tutto il film.
        const ownPrice = !perFilmCommon && s.prices.length > 0 ? priceText(s.prices) : null;

        return (
          <li key={s.sourceId ?? s.startsAt} className="flex flex-col gap-1">
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

/** Etichetta del giorno: "Oggi" / "Domani" in evidenza, poi la data per esteso. */
export function DayLabel({ startsAt, className }: { startsAt: string; className?: string }) {
  const relative = relativeDayIt(startsAt);
  return (
    <p
      className={cn(
        'flex flex-wrap items-center gap-x-2.5 gap-y-1 font-utility text-xs font-semibold uppercase tracking-marquee',
        className
      )}
    >
      {relative && (
        <span className="rounded bg-cinema-ticket px-2 py-0.5 font-bold text-cinema-bg">
          {relative}
        </span>
      )}
      <span className={relative ? 'text-cinema-text-muted' : 'text-cinema-ticket'}>
        {formatDayIt(startsAt)}
      </span>
    </p>
  );
}

/** Proiezioni raggruppate per giorno italiano, in ordine cronologico. */
export function groupShowtimesByDay(
  showtimes: PublicShowtime[]
): Array<{ dayKey: string; showtimes: PublicShowtime[] }> {
  const byDay = new Map<string, PublicShowtime[]>();
  for (const s of showtimes) {
    const key = romeDayKey(s.startsAt);
    const list = byDay.get(key);
    if (list) list.push(s);
    else byDay.set(key, [s]);
  }
  return [...byDay.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([dayKey, list]) => ({
      dayKey,
      showtimes: [...list].sort((a, b) => a.startsAt.localeCompare(b.startsAt)),
    }));
}

/**
 * Gli orari con il giorno scritto sopra, un blocco per data.
 *
 * Serve ovunque un film abbia proiezioni in più giorni: una fila piatta di
 * orari ("18:30 21:00 20:00") sembra tutta dello stesso giorno e lascia il
 * lettore a indovinare — che è esattamente l'informazione che sta cercando.
 *
 * `maxDays` taglia i giorni in più dove lo spazio è poco (l'hero); quelli
 * lasciati fuori vengono contati, non nascosti in silenzio.
 */
export function ShowtimesByDay({
  film,
  showtimes,
  maxDays,
  size = 'md',
  showVenue = false,
  perfBg,
  className,
}: {
  film: PublicFilm;
  showtimes?: PublicShowtime[];
  maxDays?: number;
  size?: 'md' | 'lg';
  showVenue?: boolean;
  perfBg?: string;
  className?: string;
}) {
  const days = groupShowtimesByDay(showtimes ?? film.showtimes);
  const shown = maxDays ? days.slice(0, maxDays) : days;
  const nascosti = days.length - shown.length;

  if (shown.length === 0) return null;

  return (
    <div className={cn('space-y-4', className)}>
      {shown.map(({ dayKey, showtimes: ofDay }) => (
        <div key={dayKey}>
          <DayLabel startsAt={ofDay[0].startsAt} />
          <Showtimes
            film={film}
            showtimes={ofDay}
            size={size}
            showVenue={showVenue}
            perfBg={perfBg}
            withDayInLabel
            ariaLabel={`Orari di ${film.title} — ${formatDayIt(ofDay[0].startsAt)}`}
            className="mt-2.5"
          />
        </div>
      ))}

      {nascosti > 0 && (
        <p className="font-utility text-xs uppercase tracking-wider text-cinema-text-subtle">
          e {nascosti === 1 ? 'un altro giorno' : `altri ${nascosti} giorni`} in programma
        </p>
      )}
    </div>
  );
}
