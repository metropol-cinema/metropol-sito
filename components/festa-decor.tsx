import { cn } from '@/lib/utils';

/**
 * Gli elementi di festa presi dalla locandina del CineCompleanno, disegnati qui
 * invece che ritagliati: pesano niente e restano nitidi a ogni misura.
 *
 * Solo decorazione: niente testo, nascosti ai lettori di schermo e spenti nei
 * temi ad alto contrasto (`data-decor="fondale"`). I colori sono letterali di
 * proposito: sono quelli della locandina e non seguono il tema.
 */
const COLORI = ['#2DD4BF', '#F97316', '#EC4899', '#FACC15', '#60A5FA', '#A855F7', '#4ADE80'];

/** Generatore fisso: i coriandoli stanno sempre allo stesso posto, a ogni visita. */
function sequenza(seme: number) {
  let n = seme;
  return () => {
    n = (n * 9301 + 49297) % 233280;
    return n / 233280;
  };
}

export function Coriandoli({ quanti = 46, className }: { quanti?: number; className?: string }) {
  const caso = sequenza(17);
  const pezzi = Array.from({ length: quanti }, (_, i) => ({
    x: Math.round(caso() * 1000),
    y: Math.round(caso() * 600),
    ruota: Math.round(caso() * 180),
    colore: COLORI[i % COLORI.length],
    tondo: i % 5 === 0,
    grande: caso() > 0.7,
  }));

  return (
    <svg
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      data-decor="fondale"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    >
      {pezzi.map((p) =>
        p.tondo ? (
          <circle key={`${p.x}-${p.y}`} cx={p.x} cy={p.y} r={p.grande ? 5 : 3.5} fill={p.colore} opacity="0.85" />
        ) : (
          <rect
            key={`${p.x}-${p.y}`}
            x={p.x}
            y={p.y}
            width={p.grande ? 14 : 9}
            height={p.grande ? 7 : 5}
            rx="1"
            fill={p.colore}
            opacity="0.85"
            transform={`rotate(${p.ruota} ${p.x} ${p.y})`}
          />
        )
      )}
    </svg>
  );
}

/** Il festone di bandierine in cima alla locandina: una per colore, a ripetere. */
export function Festone({ className }: { className?: string }) {
  const bandierine = Array.from({ length: 21 }, (_, i) => {
    const x = 20 + i * 48;
    // Stessa parabola del filo, così le bandierine ci stanno appese.
    const t = (x - 500) / 500;
    const y = 58 - 44 * t * t;
    return { x, y, colore: COLORI[i % COLORI.length] };
  });

  return (
    <svg
      viewBox="0 0 1000 110"
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
      data-decor="fondale"
      className={cn('pointer-events-none absolute inset-x-0 top-0 h-16 w-full sm:h-24', className)}
    >
      <path d="M0 14 Q500 102 1000 14" fill="none" stroke="#F5F2EC" strokeOpacity="0.55" strokeWidth="1.5" />
      {bandierine.map((b) => (
        <path
          key={b.x}
          d={`M${b.x - 17} ${b.y} L${b.x + 17} ${b.y} L${b.x} ${b.y + 36} Z`}
          fill={b.colore}
          opacity="0.92"
        />
      ))}
    </svg>
  );
}
