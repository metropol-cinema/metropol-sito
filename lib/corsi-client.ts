/**
 * Client della read-API dei corsi del gestionale. SOLO server-side: usa lo
 * stesso token di lettura della programmazione, che non deve finire nel bundle.
 *
 * L'URL si deriva da PROGRAMMAZIONE_API_URL sostituendo l'ultimo segmento,
 * come già fa `lib/slideshow-client.ts`.
 */

export interface PublicCourseLesson {
  /** ISO, o null: una lezione può essere annunciata prima di avere la data. */
  startsAt: string | null;
  title: string;
  teacher: string | null;
  topics: string | null;
}

export interface PublicCourse {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  imageUrl: string | null;
  venue: string | null;
  /** In centesimi; null = non si paga online. */
  priceCents: number | null;
  infoFormUrl: string | null;
  paypalUrl: string | null;
  /** Finestra in cui la voce "Corsi" compare nel menu (date `YYYY-MM-DD`). */
  menuFrom: string | null;
  menuTo: string | null;
  soldOut: boolean;
  lessons: PublicCourseLesson[];
}

function endpoint(): { url: string; token: string } | null {
  const base = process.env.PROGRAMMAZIONE_API_URL;
  const token = process.env.PROGRAMMAZIONE_API_TOKEN;
  if (!base || !token) return null;
  const url = base.replace(/\/programmazione\/?$/, '/corsi');
  return url === base ? null : { url, token };
}

/**
 * I corsi pubblicati. Ritorna `[]` — non lancia — se l'API non risponde o non è
 * configurata: un corso è contenuto in più, non deve poter buttare giù il menu
 * di tutto il sito.
 */
export async function fetchCorsi(): Promise<PublicCourse[]> {
  const config = endpoint();
  if (!config) return [];

  try {
    const url = new URL(config.url);
    url.searchParams.set('token', config.token);
    const res = await fetch(url, {
      headers: { accept: 'application/json' },
      // Finestra ISR; il gestionale la fa cadere prima con /api/revalidate.
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];
    const json = (await res.json().catch(() => null)) as
      | { ok?: boolean; courses?: PublicCourse[] }
      | null;
    if (!json?.ok || !Array.isArray(json.courses)) return [];
    return json.courses;
  } catch {
    return [];
  }
}

/** True se oggi cade nella finestra scelta in dashboard. */
export function inMenuWindow(course: PublicCourse, today = new Date()): boolean {
  const key = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Rome',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(today);
  return (!course.menuFrom || course.menuFrom <= key) && (!course.menuTo || key <= course.menuTo);
}

/** "40,00 €", o null se il corso non ha un prezzo. */
export function formatCoursePrice(cents: number | null): string | null {
  if (cents == null) return null;
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(cents / 100);
}
