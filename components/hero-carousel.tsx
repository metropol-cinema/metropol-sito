'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

interface HeroCarouselProps {
  /** Slide già renderizzate (Server Components passati come children). */
  slides: ReactNode[];
  /** Permanenza di ogni slide in secondi, allineata a `slides`. */
  durations: number[];
}

/**
 * Il carosello dell'hero: una slide per film della settimana.
 * Il cambio è una dissolvenza lenta — un cambio bobina, non uno scorrimento.
 *
 * Accessibile: pausabile (WCAG 2.2.2), navigabile da tastiera e con swipe, si
 * ferma quando il focus entra in una slide, e non parte affatto per chi ha
 * chiesto meno animazioni. Le slide non attive sono `inert`, così i loro link
 * non finiscono nel percorso di tabulazione.
 */
export function HeroCarousel({ slides, durations }: HeroCarouselProps) {
  const autoplay = useMemo(
    () =>
      Autoplay({
        // Ogni slide ha la sua permanenza (la timeline la decide la dashboard).
        delay: (scrollSnaps) => scrollSnaps.map((_, i) => (durations[i] ?? 10) * 1000),
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        stopOnFocusIn: true,
      }),
    [durations]
  );

  // duration: la lunghezza della dissolvenza. Abbastanza lunga da leggersi come
  // un cambio bobina, abbastanza corta da non tenere due titoli sovrapposti.
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 26 }, [Fade(), autoplay]);
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => setSelected(emblaApi.selectedScrollSnap());
    const syncPlaying = () => setPlaying(autoplay.isPlaying());
    sync();
    emblaApi.on('select', sync).on('autoplay:play', syncPlaying).on('autoplay:stop', syncPlaying);
    return () => {
      emblaApi.off('select', sync).off('autoplay:play', syncPlaying).off('autoplay:stop', syncPlaying);
    };
  }, [emblaApi, autoplay]);

  // Chi ha disattivato le animazioni si vede la prima slide, ferma.
  useEffect(() => {
    if (!emblaApi) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) autoplay.stop();
  }, [emblaApi, autoplay]);

  const toggle = useCallback(() => {
    if (autoplay.isPlaying()) autoplay.stop();
    else autoplay.play();
  }, [autoplay]);

  return (
    <section aria-roledescription="carosello" aria-label="Film in evidenza" className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="min-w-0 flex-[0_0_100%]"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} di ${slides.length}`}
              aria-hidden={i !== selected}
              inert={i !== selected}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1 rounded-full border border-white/10 bg-black/65 px-1.5 py-1.5 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Film precedente"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={
              playing ? 'Metti in pausa lo scorrimento automatico' : 'Riprendi lo scorrimento automatico'
            }
            className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15"
          >
            {playing ? (
              <Pause className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Play className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Film successivo"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <span
            aria-hidden="true"
            className="px-1.5 font-utility text-xs font-semibold tabular-nums text-white"
          >
            {selected + 1}/{slides.length}
          </span>
        </div>
      )}
    </section>
  );
}
