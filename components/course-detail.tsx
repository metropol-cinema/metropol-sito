import { CalendarDays, ExternalLink, MapPin } from 'lucide-react';
import Image from 'next/image';

import { CourseEnroll } from '@/components/course-enroll';
import { formatCoursePrice, type PublicCourse } from '@/lib/corsi-client';

/** "mercoledì 21 gennaio · 20:45", o null se la data non c'è ancora. */
function lessonWhen(startsAt: string | null): string | null {
  if (!startsAt) return null;
  const d = new Date(startsAt);
  const day = new Intl.DateTimeFormat('it-IT', {
    timeZone: 'Europe/Rome',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(d);
  const time = new Intl.DateTimeFormat('it-IT', {
    timeZone: 'Europe/Rome',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
  return `${day} · ${time}`;
}

/**
 * La pagina di un corso: testata, programma delle lezioni e riquadro
 * iscrizione. Condivisa fra `/corsi` (quando il corso pubblicato è uno solo) e
 * `/corsi/[slug]`, così le due strade non divergono.
 *
 * Il titolo è un h1: chi la usa non ne mette un altro.
 */
export function CourseDetail({ course }: { course: PublicCourse }) {
  const price = formatCoursePrice(course.priceCents);

  return (
    <article>
      <header className="grain relative isolate overflow-hidden border-b border-cinema-border">
        {course.imageUrl ? (
          <>
            <Image
              src={course.imageUrl}
              alt=""
              fill
              priority
              sizes="100vw"
              className="-z-10 object-cover opacity-40"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 vignette" />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_25%_0%,rgba(244,183,64,0.14),transparent_70%)]"
          />
        )}

        <div className="container py-14 sm:py-20">
          <p className="eyebrow">Corso di cinema</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black leading-[0.95] text-cinema-text sm:text-6xl">
            {course.title}
          </h1>
          {course.subtitle && (
            <p className="mt-4 max-w-2xl font-display text-lg italic text-cinema-text-muted sm:text-xl">
              {course.subtitle}
            </p>
          )}
          {course.venue && (
            <p className="mt-5 flex items-center gap-2 font-utility text-xs uppercase tracking-wider text-cinema-text-muted">
              <MapPin className="h-4 w-4 text-cinema-ticket" aria-hidden="true" />
              {course.venue}
            </p>
          )}
        </div>
      </header>

      <div className="container grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
        <div className="min-w-0">
          {course.description && (
            <div className="max-w-2xl space-y-4 text-base leading-relaxed text-cinema-text-muted">
              {course.description.split(/\n{2,}/).map((par) => (
                <p key={par.slice(0, 40)}>{par}</p>
              ))}
            </div>
          )}

          {course.lessons.length > 0 && (
            <section className="mt-12">
              <p className="eyebrow">Il programma</p>
              <h2 className="mt-2 text-2xl font-black leading-none text-cinema-text sm:text-3xl">
                Le lezioni
              </h2>

              <ol className="mt-6 space-y-4">
                {course.lessons.map((lesson, i) => {
                  const when = lessonWhen(lesson.startsAt);
                  return (
                    <li
                      key={`${lesson.title}-${i}`}
                      className="rounded-2xl border border-cinema-border bg-cinema-surface p-5"
                    >
                      <p className="flex items-center gap-2 font-utility text-xs font-semibold uppercase tracking-marquee text-cinema-ticket">
                        <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                        {lesson.startsAt ? (
                          <time dateTime={lesson.startsAt}>{when}</time>
                        ) : (
                          <span>Data da definire</span>
                        )}
                      </p>
                      <h3 className="mt-2 text-xl font-bold text-cinema-text">{lesson.title}</h3>
                      {lesson.teacher && (
                        <p className="mt-1 font-utility text-xs uppercase tracking-wider text-cinema-text-subtle">
                          con {lesson.teacher}
                        </p>
                      )}
                      {lesson.topics && (
                        <p className="mt-3 text-sm leading-relaxed text-cinema-text-muted">
                          {lesson.topics}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>
          )}
        </div>

        {/* Iscrizione: resta a portata di mano mentre si scorre il programma. */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <section
            aria-labelledby="iscrizione-titolo"
            className="rounded-2xl border border-cinema-border bg-cinema-surface p-6"
          >
            <h2 id="iscrizione-titolo" className="text-xl font-bold text-cinema-text">
              Iscriviti
            </h2>

            {price && (
              <p className="mt-3 font-display text-4xl font-black text-cinema-text">{price}</p>
            )}

            <div className="mt-5 space-y-3">
              {course.soldOut ? (
                <p className="rounded-lg border border-cinema-border-strong bg-cinema-bg p-4 text-sm leading-relaxed text-cinema-text-muted">
                  <strong className="text-cinema-text">Posti esauriti.</strong> Scrivici comunque
                  con il modulo qui sotto: se si libera un posto ti avvisiamo.
                </p>
              ) : (
                price && <CourseEnroll slug={course.slug} price={price} />
              )}

              {course.paypalUrl && !course.soldOut && (
                <a
                  href={course.paypalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-cinema-border-strong px-5 py-3 font-utility text-sm font-semibold uppercase tracking-wider text-cinema-text-muted transition-colors hover:border-cinema-ticket hover:text-cinema-ticket"
                >
                  Paga con PayPal
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only"> (si apre in una nuova scheda)</span>
                </a>
              )}

              {course.infoFormUrl && (
                <a
                  href={course.infoFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-cinema-border-strong px-5 py-3 font-utility text-sm font-semibold uppercase tracking-wider text-cinema-text-muted transition-colors hover:border-cinema-ticket hover:text-cinema-ticket"
                >
                  Chiedi informazioni
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only"> (si apre in una nuova scheda)</span>
                </a>
              )}
            </div>

            {course.paypalUrl && (
              <p className="mt-4 text-xs leading-relaxed text-cinema-text-subtle">
                Pagando con PayPal avvisaci con il modulo: quella strada non ci comunica il tuo
                nome.
              </p>
            )}
          </section>
        </aside>
      </div>
    </article>
  );
}
