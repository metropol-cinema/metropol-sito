import { fetchProgrammazione } from '@/lib/programmazione-client';
import { NAV_LINKS } from '@/lib/site';

/**
 * Le voci del menu principale, con "Prossimamente" nascosta finché non c'è
 * almeno un film marcato in dashboard.
 *
 * Un menu che porta a una pagina vuota è peggio di un menu più corto: da
 * ottobre a maggio capita spesso di non avere ancora annunci, e la voce
 * riapparirà da sola appena ne marcate uno.
 *
 * SOLO server-side (usa la read-API). Se l'API non risponde la voce resta
 * nascosta: il menu non è il posto dove segnalare un guasto.
 */
export async function visibleNavLinks(): Promise<ReadonlyArray<{ href: string; label: string }>> {
  let hasUpcoming = false;
  try {
    // posters: false — qui serve solo sapere se esiste un film marcato, non le
    // locandine in base64.
    const films = await fetchProgrammazione({ days: 180, posters: false });
    hasUpcoming = films.some((f) => f.showInUpcoming);
  } catch {
    hasUpcoming = false;
  }
  return NAV_LINKS.filter((link) => link.href !== '/prossimamente' || hasUpcoming);
}
