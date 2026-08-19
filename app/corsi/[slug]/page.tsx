import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CourseDetail } from '@/components/course-detail';
import { fetchCorsi } from '@/lib/corsi-client';

export const revalidate = 600;

async function findCourse(slug: string) {
  const courses = await fetchCorsi();
  return courses.find((c) => c.slug === slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await findCourse(slug);
  if (!course) return { title: 'Corso non trovato' };
  return {
    title: course.title,
    description:
      course.subtitle ?? course.description?.slice(0, 160) ?? `${course.title} al Cinema Metropol.`,
  };
}

/**
 * La pagina di un corso. Resta raggiungibile anche fuori dalla finestra scelta
 * in dashboard — quella governa solo la voce di menu — così i link già
 * condivisi continuano a funzionare. Sparisce solo se il corso viene tolto
 * dalla pubblicazione.
 */
export default async function CorsoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await findCourse(slug);
  if (!course) notFound();

  return (
    <main>
      <CourseDetail course={course} />
    </main>
  );
}
