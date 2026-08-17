import type { AgeRating } from '@/lib/age-rating';
import { cn } from '@/lib/utils';

/**
 * Età consigliata: la sigla in un quadrato bordato d'oro, come il bollino sui
 * manifesti in bacheca. L'etichetta estesa è opzionale — nelle righe di meta
 * fitte basta la sigla, con il testo completo nel `title` per chi ci passa sopra
 * e nello screen reader.
 */
export function AgeBadge({
  rating,
  showLabel = false,
  className,
}: {
  rating: AgeRating;
  showLabel?: boolean;
  className?: string;
}) {
  const full = rating.note ? `${rating.label} (${rating.note})` : rating.label;

  return (
    <span className={cn('inline-flex items-center gap-2', className)} title={full}>
      <span
        aria-hidden="true"
        className="inline-flex min-w-[1.9rem] items-center justify-center rounded border border-cinema-ticket/70 px-1.5 py-0.5 font-utility text-xs font-bold tracking-wide text-cinema-ticket"
      >
        {rating.code}
      </span>
      <span className="sr-only">Età consigliata: {full}.</span>
      {showLabel && (
        <span aria-hidden="true" className="text-sm text-cinema-text-muted">
          {rating.label}
          {rating.note && (
            <span className="text-cinema-text-subtle"> ({rating.note})</span>
          )}
        </span>
      )}
    </span>
  );
}
