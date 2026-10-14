/**
 * Le impostazioni del sito decise dalla dashboard del gestionale (sezione
 * "Sito Web → Impostazioni") ed esposte da `/api/public/sito-impostazioni`.
 * SOLO server-side.
 *
 * L'endpoint vive accanto a quello della programmazione: l'URL si deriva da
 * PROGRAMMAZIONE_API_URL sostituendo l'ultimo segmento. Stesso token.
 *
 * Contratto: { ok: true, campagnaSoci: { produzione: boolean, anteprima: boolean } }
 * Ogni impostazione ha un valore per ambiente; qui si prende quello di questa
 * copia del sito (lib/ambiente.ts). In locale vale quello dell'anteprima.
 */

import { IN_PRODUZIONE } from '@/lib/ambiente';
import { TIMEOUT_GESTIONALE, withTimeout } from '@/lib/fetch-timeout';

export interface ImpostazioniSito {
  /** Campagna associativa aperta: si mostrano i bottoni «Diventa socio». */
  campagnaSoci: boolean;
}

/**
 * Se il gestionale non risponde si tiene il comportamento di prima che
 * l'impostazione esistesse: bottoni visibili. Un bottone di troppo porta a un
 * modulo che il gestionale gestisce comunque; un bottone sparito per un guasto
 * fa perdere un socio senza che nessuno se ne accorga.
 */
const PREDEFINITE: ImpostazioniSito = { campagnaSoci: true };

export async function fetchImpostazioni(): Promise<ImpostazioniSito> {
  const base = process.env.PROGRAMMAZIONE_API_URL;
  const token = process.env.PROGRAMMAZIONE_API_TOKEN;
  if (!base || !token) return PREDEFINITE;

  const endpoint = base.replace(/\/programmazione\/?$/, '/sito-impostazioni');
  if (endpoint === base) return PREDEFINITE;

  const url = new URL(endpoint);
  url.searchParams.set('token', token);

  try {
    const res = await fetch(url, {
      headers: { accept: 'application/json' },
      signal: withTimeout(TIMEOUT_GESTIONALE),
      // Il gestionale avvisa al salvataggio (app/api/revalidate, chiave
      // `impostazioni`); questa è la rete di sicurezza se l'avviso si perde.
      next: { revalidate: 600 },
    });
    if (!res.ok) return PREDEFINITE;
    const json = (await res.json().catch(() => null)) as {
      ok?: boolean;
      campagnaSoci?: { produzione?: unknown; anteprima?: unknown };
    } | null;
    if (!json?.ok) return PREDEFINITE;

    const campagna = IN_PRODUZIONE ? json.campagnaSoci?.produzione : json.campagnaSoci?.anteprima;
    return { campagnaSoci: typeof campagna === 'boolean' ? campagna : PREDEFINITE.campagnaSoci };
  } catch {
    return PREDEFINITE;
  }
}
