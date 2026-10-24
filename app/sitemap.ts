import type { MetadataRoute } from 'next';

import { URL_SITO } from '@/lib/ambiente';
import { fetchCorsi } from '@/lib/corsi-client';
import { fetchProgrammazione } from '@/lib/programmazione-client';

// Le schede film e corso cambiano col gestionale: rifatta ogni ora basta.
export const revalidate = 3600;

/** Le pagine fisse. /corsi/grazie no: è il ritorno dopo un pagamento. */
const PAGINE = [
  '/',
  '/programmazione',
  '/prossimamente',
  '/venerdi',
  '/info',
  '/sala',
  '/accessibilita',
  '/accessibilita/sottotitoli-e-audiodescrizione',
  '/associazione',
  '/associazione/chi-siamo',
  '/associazione/come-associarsi',
  '/associazione/diventa-volontario',
  '/associazione/storia',
  '/associazione/statuto',
  '/associazione/assemblea-2026',
  '/corsi',
  '/privacy',
];

/**
 * La mappa del sito per i motori di ricerca: le pagine fisse più una scheda
 * per ogni film in programma o annunciato e per ogni corso pubblicato.
 *
 * Se il gestionale non risponde si pubblicano almeno le pagine fisse: una
 * sitemap senza i film è meno utile, una sitemap in errore non serve a niente.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [films, corsi] = await Promise.all([
    // posters: false — servono solo gli id, non le locandine in base64.
    fetchProgrammazione({ days: 180, posters: false }).catch(() => []),
    // fetchCorsi non lancia mai: ritorna [] se l'API non risponde.
    fetchCorsi(),
  ]);

  return [
    ...PAGINE.map((pagina) => ({ url: `${URL_SITO}${pagina === '/' ? '' : pagina}` })),
    ...films.map((film) => ({ url: `${URL_SITO}/film/${film.id}` })),
    ...corsi.map((corso) => ({ url: `${URL_SITO}/corsi/${corso.slug}` })),
  ];
}
