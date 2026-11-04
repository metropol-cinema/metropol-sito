'use client';

import type { ReactNode } from 'react';
import { useSyncExternalStore } from 'react';

import { testoScadenza } from '@/lib/cinecompleanni';

// Un telefono lasciato con la pagina aperta può attraversare la mezzanotte: si
// ricontrolla quando si torna a guardarla.
function onReturn(callback: () => void) {
  document.addEventListener('visibilitychange', callback);
  return () => document.removeEventListener('visibilitychange', callback);
}

/**
 * Fino a quando si può prenotare. Il server scrive già la frase (`iniziale`),
 * così c'è anche senza JavaScript; qui si rimette a posto quando la copia della
 * pagina in cache è di ieri: di venerdì mattina non deve dire «entro oggi».
 *
 * `children` è quello che ha senso solo finché si fa in tempo, cioè il bottone.
 */
export function ScadenzaCineCompleanno({
  scadenze,
  iniziale,
  children,
  className,
}: {
  scadenze: string[];
  iniziale: string | null;
  children?: ReactNode;
  className?: string;
}) {
  const scadenza = useSyncExternalStore(
    onReturn,
    () => testoScadenza(scadenze),
    () => iniziale
  );

  if (!scadenza) {
    return (
      <p className={className}>
        Per queste date le prenotazioni sono chiuse: si prenota entro il giovedì del fine settimana
        in cui c&apos;è il film.
      </p>
    );
  }

  return (
    <>
      <p className={className}>
        Prenota entro <strong className="font-semibold text-cinema-text">{scadenza}</strong>.
      </p>
      {children}
    </>
  );
}
