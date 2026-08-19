import { fetchCorsi, inMenuWindow } from '@/lib/corsi-client';
import { fetchProgrammazione } from '@/lib/programmazione-client';
import { NAV_LINKS } from '@/lib/site';

/**
 * Le voci del menu principale, con due che compaiono solo quando hanno senso:
 *
 * - **Prossimamente**: se c'è almeno un film marcato in dashboard;
 * - **Corsi**: se c'è un corso pubblicato e oggi cade nella finestra di date
 *   scelta in dashboard. Fuori finestra la pagina resta raggiungibile — sparisce
 *   solo dal menu — così i link già condivisi non si rompono.
 *
 * Un menu che porta a una pagina vuota è peggio di un menu più corto: da
 * ottobre a maggio capita spesso di non avere né annunci né corsi in corso.
 *
 * SOLO server-side (usa le read-API). Se un'API non risponde la voce resta
 * nascosta: il menu non è il posto dove segnalare un guasto.
 */
export async function visibleNavLinks(): Promise<ReadonlyArray<{ href: string; label: string }>> {
  const [hasUpcoming, hasCourse] = await Promise.all([
    (async () => {
      try {
        // posters: false — serve solo sapere se esiste un film marcato, non le
        // locandine in base64.
        const films = await fetchProgrammazione({ days: 180, posters: false });
        return films.some((f) => f.showInUpcoming);
      } catch {
        return false;
      }
    })(),
    // fetchCorsi non lancia mai: ritorna [] se l'API non risponde.
    fetchCorsi().then((courses) => courses.some((c) => inMenuWindow(c))),
  ]);

  return NAV_LINKS.filter((link) => {
    if (link.href === '/prossimamente') return hasUpcoming;
    if (link.href === '/corsi') return hasCourse;
    return true;
  });
}
