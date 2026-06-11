'use client';

import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';

interface HeroCarouselProps {
  /** Slide già renderizzate (Server Components passati come children). */
  slides: ReactNode[];
  /** Permanenza di ogni slide in secondi (allineata a `slides`). */
  durations: number[];
}

/**
 * Carosello della home: ruota le slide della timeline "Sito Web → Slideshow".
 * Accessibile: pausabile (WCAG 2.2.2), navigabile da tastiera, parte fermo per
 * chi ha prefers-reduced-motion.
 */
export function HeroCarousel({ slides, durations }: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPaused(true);
  }, []);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const ms = (durations[index] ?? 10) * 1000;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % slides.length), ms);
    return () => clearTimeout(timer);
  }, [index, paused, slides.length, durations]);

  const go = (delta: number) => setIndex((i) => (i + delta + slides.length) % slides.length);

  return (
    <section aria-roledescription="carosello" aria-label="In evidenza" className="relative">
      {slides.map((slide, i) => (
        <div
          key={i}
          hidden={i !== index}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${i + 1} di ${slides.length}`}
        >
          {slide}
        </div>
      ))}

      {slides.length > 1 && (
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-2 py-1.5 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Slide precedente"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white hover:bg-white/15"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Riprendi lo scorrimento automatico' : 'Metti in pausa lo scorrimento automatico'}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white hover:bg-white/15"
          >
            {paused ? (
              <Play className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Pause className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Slide successiva"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white hover:bg-white/15"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="px-1 text-xs font-medium tabular-nums text-white" aria-hidden="true">
            {index + 1}/{slides.length}
          </span>
        </div>
      )}
    </section>
  );
}
