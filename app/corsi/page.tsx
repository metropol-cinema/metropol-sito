import type { Metadata } from 'next';
import Link from 'next/link';

import { CourseDetail } from '@/components/course-detail';
import { EmptyState, PageHeader } from '@/components/page-header';
import { fetchCorsi } from '@/lib/corsi-client';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Corsi di cinema',
  description:
    'I corsi di cinema dell’Associazione Culturale Metropol: programma delle lezioni, informazioni e iscrizione.',
};

/**
 * Con un corso solo — il caso normale — questa È la pagina del corso: farla
 * passare da un elenco di una voce sarebbe un clic inutile. Con più corsi
 * diventa l'indice.
 */
export default async function CorsiPage() {
  const courses = await fetchCorsi();

  if (courses.length === 1) return <main>{<CourseDetail course={courses[0]} />}</main>;

  return (
    <main className="container py-10 sm:py-12">
      <PageHeader
        eyebrow="Impariamo il cinema"
        title="Corsi"
        lead={<p>I corsi organizzati dall&apos;associazione.</p>}
      />

      {courses.length === 0 ? (
        <EmptyState>
          Nessun corso in programma in questo momento. Seguici sui social: gli annunci passano di
          lì per primi.
        </EmptyState>
      ) : (
        <ul className="space-y-4">
          {courses.map((course) => (
            <li key={course.id}>
              <Link
                href={`/corsi/${course.slug}`}
                className="group block rounded-2xl border border-cinema-border bg-cinema-surface p-6 transition-colors hover:border-cinema-ticket/50"
              >
                <h2 className="text-2xl font-black text-cinema-text transition-colors group-hover:text-cinema-ticket">
                  {course.title}
                </h2>
                {course.subtitle && (
                  <p className="mt-1.5 font-display italic text-cinema-text-muted">
                    {course.subtitle}
                  </p>
                )}
                <p className="mt-3 font-utility text-xs uppercase tracking-wider text-cinema-text-subtle">
                  {course.lessons.length} lezion{course.lessons.length === 1 ? 'e' : 'i'}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
