'use client';

import { useEffect, useRef } from 'react';

/**
 * La maschera di lettura: la pagina si oscura tranne una fascia orizzontale
 * attorno al puntatore, così l'occhio ha un solo posto dove stare. Come la
 * guida di lettura, il componente sa solo *dove*; il *come* è
 * `.maschera-lettura` in app/globals.css, che legge `--maschera-y`.
 *
 * Segue anche il focus: chi va avanti col tabulatore si ritrova in luce il
 * campo o il bottone su cui è arrivato, invece di lavorare al buio.
 */
export function MascheraLettura() {
  const fasciaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fascia = fasciaRef.current;
    if (!fascia) return;

    let frame = 0;
    // Prima che il puntatore si muova: a un terzo dello schermo, dove di
    // solito comincia il contenuto, e non in cima sulla testata.
    let centro = window.innerHeight / 3;

    const disegna = () => {
      frame = 0;
      fascia.style.setProperty('--maschera-y', `${centro - fascia.offsetHeight / 2}px`);
    };
    const sposta = (y: number) => {
      centro = y;
      if (frame === 0) frame = window.requestAnimationFrame(disegna);
    };

    const suMovimento = (e: PointerEvent) => sposta(e.clientY);
    const suFocus = (e: FocusEvent) => {
      const el = e.target;
      if (!(el instanceof Element)) return;
      const r = el.getBoundingClientRect();
      sposta(r.top + r.height / 2);
    };

    disegna();
    window.addEventListener('pointermove', suMovimento, { passive: true });
    document.addEventListener('focusin', suFocus);
    return () => {
      window.removeEventListener('pointermove', suMovimento);
      document.removeEventListener('focusin', suFocus);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={fasciaRef} className="maschera-lettura" aria-hidden="true" />;
}
