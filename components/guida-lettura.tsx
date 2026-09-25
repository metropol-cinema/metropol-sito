'use client';

import { useEffect, useRef } from 'react';

/**
 * La riga orizzontale che segue il puntatore: un righello per non perdere il
 * rigo, che è il bisogno vero dietro alla «maschera di lettura» dei widget di
 * accessibilità — con la differenza che qui non si scurisce metà pagina.
 *
 * Il componente sa solo *dove*: il *come* è `.guida-lettura` in globals.css,
 * che legge `--guida-y`. La posizione non passa dallo stato di React — sono
 * decine di eventi al secondo e ogni ridisegno sarebbe sprecato: si scrive
 * direttamente sul nodo, dentro un frame di animazione.
 */
export function GuidaLettura() {
  const rigaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const riga = rigaRef.current;
    if (!riga) return;

    let frame = 0;
    let y = -10;

    const disegna = () => {
      frame = 0;
      riga.style.setProperty('--guida-y', `${y}px`);
    };

    const suMovimento = (e: PointerEvent) => {
      // A metà dell'altezza della riga: il puntatore ci sta sopra, non sotto.
      y = e.clientY - 2;
      if (frame === 0) frame = window.requestAnimationFrame(disegna);
    };

    // `pointermove` e non `mousemove`: arriva anche da penna e dito, e chi usa
    // un dispositivo di puntamento assistivo passa di qui lo stesso.
    window.addEventListener('pointermove', suMovimento, { passive: true });
    return () => {
      window.removeEventListener('pointermove', suMovimento);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Decorativa: per chi legge con le orecchie non esiste.
  return <div ref={rigaRef} className="guida-lettura" aria-hidden="true" />;
}
