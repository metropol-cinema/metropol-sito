/**
 * Slide media dello slideshow in home: video (autoplay muto in loop) o
 * immagine a tutta larghezza, con didascalia opzionale sovrimpressa.
 *
 * Compare SOLO quando in settimana non c'è nessun film (la regola è applicata
 * dalla home): è il fondale che riempie la parete quando non c'è un manifesto
 * da appendere.
 */
export function MediaSlide({
  kind,
  src,
  caption,
}: {
  kind: 'video' | 'image';
  src: string;
  caption: string | null;
}) {
  return (
    <div className="grain relative isolate h-[24rem] overflow-hidden border-b border-cinema-border sm:h-[34rem]">
      {kind === 'video' ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          // Decorativo: l'eventuale messaggio sta nella caption testuale.
          aria-hidden="true"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      ) : (
        // Host arbitrario configurato dalla dashboard: <img> semplice.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={caption ?? ''}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 -z-10 vignette" />

      {caption && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cinema-bg via-cinema-bg/70 to-transparent pb-8 pt-24 sm:pb-12">
          <p className="container text-2xl font-black leading-tight text-cinema-text sm:text-5xl">
            {caption}
          </p>
        </div>
      )}
    </div>
  );
}
