'use client';

import { useEffect, useRef } from 'react';

/** Gli elementi di cui la lente legge il testo: il più vicino al puntatore
 *  vince, così su una parola in grassetto dentro un paragrafo si legge il
 *  paragrafo intero e non la parola sola. */
const DA_INGRANDIRE =
  'p, li, h1, h2, h3, h4, h5, h6, a, button, label, legend, dt, dd, td, th, summary, figcaption, blockquote';

/** Oltre questa lunghezza il riquadro coprirebbe mezza pagina. */
const MASSIMO = 280;

/** Distanza fra il puntatore e il riquadro, per non coprire quel che si legge. */
const SCARTO = 24;

function testoDi(el: Element): string {
  const testo = (el instanceof HTMLElement ? el.innerText : el.textContent ?? '').replace(/\s+/g, ' ').trim();
  // Un bottone fatto di sola icona: la lente mostra il suo nome.
  const nome = testo || el.getAttribute('aria-label')?.trim() || '';
  return nome.length > MASSIMO ? `${nome.slice(0, MASSIMO).trimEnd()}…` : nome;
}

/**
 * La lente sul testo: un riquadro che riporta, in grande, il testo su cui
 * passa il puntatore o arriva il focus. Per chi vede poco ma non vuole
 * ingrandire tutta la pagina e perdere l'impaginazione.
 *
 * Solo su schermi con un puntatore vero: col dito non c'è un «passare sopra»,
 * e la lente apparirebbe a ogni tocco. Col tabulatore funziona comunque.
 * Aspetto in `.lente-testo` (app/globals.css); qui solo testo e posizione,
 * scritti direttamente sul nodo come per la guida di lettura.
 */
export function LenteTesto() {
  const lenteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lente = lenteRef.current;
    if (!lente) return;
    const conPuntatore = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    let mostrato: Element | null = null;
    let frame = 0;
    let x = 0;
    let y = 0;

    const nascondi = () => {
      mostrato = null;
      lente.hidden = true;
    };

    // Il riquadro sta sotto il puntatore; se non c'è posto, sopra. E non esce
    // mai dai lati, anche col testo al 150%.
    const disegna = () => {
      frame = 0;
      const { offsetWidth: w, offsetHeight: h } = lente;
      const sx = Math.min(Math.max(8, x - w / 2), window.innerWidth - w - 8);
      const sotto = y + SCARTO;
      const sy = sotto + h <= window.innerHeight - 8 ? sotto : Math.max(8, y - SCARTO - h);
      lente.style.setProperty('--lente-x', `${sx}px`);
      lente.style.setProperty('--lente-y', `${sy}px`);
    };

    const mostra = (el: Element | null, px: number, py: number) => {
      x = px;
      y = py;
      if (el !== mostrato) {
        const testo = el ? testoDi(el) : '';
        if (!testo) return nascondi();
        mostrato = el;
        lente.textContent = testo;
        lente.hidden = false;
      }
      if (frame === 0) frame = window.requestAnimationFrame(disegna);
    };

    const suMovimento = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const el = e.target instanceof Element ? e.target.closest(DA_INGRANDIRE) : null;
      mostra(el, e.clientX, e.clientY);
    };
    const suFocus = (e: FocusEvent) => {
      if (!(e.target instanceof Element)) return;
      const r = e.target.getBoundingClientRect();
      // Fuori dall'elenco conta solo un nome esplicito: il «Salta al
      // contenuto» porta il focus su <main>, e la lente mostrerebbe l'inizio
      // di tutta la pagina.
      const el =
        e.target.closest(DA_INGRANDIRE) ?? (e.target.hasAttribute('aria-label') ? e.target : null);
      // Centrato sotto l'elemento, come se il puntatore fosse sul suo bordo.
      mostra(el, r.left + r.width / 2, r.bottom);
    };
    // Scorrendo, il testo sotto il puntatore cambia ma il riquadro no:
    // meglio toglierlo e lasciarlo ricomparire al prossimo movimento.
    const suScorrimento = () => nascondi();

    if (conPuntatore) {
      window.addEventListener('pointermove', suMovimento, { passive: true });
      document.documentElement.addEventListener('pointerleave', nascondi);
    }
    document.addEventListener('focusin', suFocus);
    document.addEventListener('focusout', nascondi);
    window.addEventListener('scroll', suScorrimento, { passive: true, capture: true });
    return () => {
      window.removeEventListener('pointermove', suMovimento);
      document.documentElement.removeEventListener('pointerleave', nascondi);
      document.removeEventListener('focusin', suFocus);
      document.removeEventListener('focusout', nascondi);
      window.removeEventListener('scroll', suScorrimento, { capture: true });
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Per chi legge con le orecchie è un doppione di quel che sente già.
  return <div ref={lenteRef} className="lente-testo" aria-hidden="true" hidden />;
}
