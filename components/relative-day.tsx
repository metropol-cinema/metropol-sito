'use client';

import { useSyncExternalStore } from 'react';

import { relativeDayOfKey } from '@/lib/giorno-relativo';
import { cn } from '@/lib/utils';

type Relative = 'Oggi' | 'Domani' | null;

// Un telefono lasciato con la pagina aperta può attraversare la mezzanotte: si
// ricontrolla quando si torna a guardarla.
function onReturn(callback: () => void) {
  document.addEventListener('visibilitychange', callback);
  return () => document.removeEventListener('visibilitychange', callback);
}

/**
 * «Oggi» / «Domani» corretti nel browser. Il server ne scrive già uno
 * (`initial`), così c'è anche senza JavaScript; qui si rimette a posto quando la
 * pagina servita è in cache dal giorno prima.
 */
function useRelativeDay(dayKey: string | null, initial: Relative): Relative {
  return useSyncExternalStore(
    onReturn,
    () => (dayKey ? relativeDayOfKey(dayKey) : null),
    () => initial
  );
}

/** L'etichetta del giorno: "Oggi" / "Domani" in evidenza, poi la data per esteso. */
export function RelativeDayLabel({
  dayKey,
  dayText,
  initial,
  className,
}: {
  dayKey: string;
  dayText: string;
  initial: Relative;
  className?: string;
}) {
  const relative = useRelativeDay(dayKey, initial);
  return (
    <p
      className={cn(
        'flex flex-wrap items-center gap-x-2.5 gap-y-1 font-utility text-xs font-semibold uppercase tracking-marquee',
        className
      )}
    >
      {relative && (
        <span className="rounded bg-cinema-ticket px-2 py-0.5 font-bold text-cinema-on-ticket">
          {relative}
        </span>
      )}
      <span className={relative ? 'text-cinema-text-muted' : 'text-cinema-ticket-ink'}>{dayText}</span>
    </p>
  );
}

/**
 * L'occhiello dell'hero: solo il "quando" relativo. La data precisa sta sopra
 * ogni gruppo di orari — metterne una sola qui era falso appena il film aveva
 * proiezioni in giorni diversi.
 */
export function RelativeEyebrow({ dayKey, initial }: { dayKey: string | null; initial: Relative }) {
  const relative = useRelativeDay(dayKey, initial);
  const when = !dayKey
    ? 'In programmazione'
    : relative === 'Oggi'
      ? 'Stasera in sala'
      : relative === 'Domani'
        ? 'Domani in sala'
        : 'In sala questa settimana';
  return <p className="eyebrow">{when}</p>;
}
