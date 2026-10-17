/**
 * Le impostazioni del sito decise dalla dashboard del gestionale (sezione
 * "Sito Web → Impostazioni") ed esposte da `/api/public/sito-impostazioni`.
 * SOLO server-side.
 *
 * L'endpoint vive accanto a quello della programmazione: l'URL si deriva da
 * PROGRAMMAZIONE_API_URL sostituendo l'ultimo segmento. Stesso token.
 *
 * Contratto: { ok: true, campagnaSoci: { produzione: boolean, anteprima: boolean },
 *             sociStagionePrecedente: { esercizio: "2025/26", soci: number } | null,
 *             volontari: number | null,
 *             listinoPrezzi: Array<{ label: string, amount: number }> }
 * Ogni impostazione ha un valore per ambiente; qui si prende quello di questa
 * copia del sito (lib/ambiente.ts). In locale vale quello dell'anteprima.
 */

import { IN_PRODUZIONE } from '@/lib/ambiente';
import { TIMEOUT_GESTIONALE, withTimeout } from '@/lib/fetch-timeout';
import { TICKET_PRICES } from '@/lib/site';

export interface VocePrezzo {
  label: string;
  /** Euro. */
  amount: number;
}

export interface ImpostazioniSito {
  /** Campagna associativa aperta: si mostrano i bottoni «Diventa socio». */
  campagnaSoci: boolean;
  /**
   * I soci della stagione chiusa (settembre → agosto), citati nella storia.
   * È l'anno sociale prima di quello in corso: a settembre passa da solo al
   * successivo. `null` = dato non disponibile, e allora non si cita un numero.
   */
  sociStagionePrecedente: { esercizio: string; soci: number } | null;
  /**
   * I volontari di oggi (chi ha almeno un ruolo turno), citati nella storia.
   * `null` = dato non disponibile, e allora non si cita un numero.
   */
  volontari: number | null;
  /**
   * Il listino generale dei biglietti (home e /info), scritto nella dashboard.
   * Uno solo per tutti e due gli ambienti. Se il gestionale non risponde vale
   * `TICKET_PRICES`, l'ultimo listino messo nel codice.
   */
  listinoPrezzi: VocePrezzo[];
}

/**
 * Se il gestionale non risponde si tiene il comportamento di prima che
 * l'impostazione esistesse: bottoni visibili. Un bottone di troppo porta a un
 * modulo che il gestionale gestisce comunque; un bottone sparito per un guasto
 * fa perdere un socio senza che nessuno se ne accorga.
 */
const PREDEFINITE: ImpostazioniSito = {
  campagnaSoci: true,
  sociStagionePrecedente: null,
  volontari: null,
  listinoPrezzi: [...TICKET_PRICES],
};

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
      sociStagionePrecedente?: { esercizio?: unknown; soci?: unknown } | null;
      volontari?: unknown;
      listinoPrezzi?: unknown;
    } | null;
    if (!json?.ok) return PREDEFINITE;

    const campagna = IN_PRODUZIONE ? json.campagnaSoci?.produzione : json.campagnaSoci?.anteprima;
    const soci = json.sociStagionePrecedente;
    return {
      campagnaSoci: typeof campagna === 'boolean' ? campagna : PREDEFINITE.campagnaSoci,
      sociStagionePrecedente:
        typeof soci?.esercizio === 'string' &&
        /^\d{4}\/\d{2}$/.test(soci.esercizio) &&
        typeof soci.soci === 'number' &&
        soci.soci > 0
          ? { esercizio: soci.esercizio, soci: soci.soci }
          : null,
      volontari:
        typeof json.volontari === 'number' && json.volontari > 0 ? json.volontari : null,
      listinoPrezzi: leggiListino(json.listinoPrezzi),
    };
  } catch {
    return PREDEFINITE;
  }
}

/** Le voci valide del listino; se non ne resta nessuna, quello predefinito. */
function leggiListino(raw: unknown): VocePrezzo[] {
  if (!Array.isArray(raw)) return PREDEFINITE.listinoPrezzi;
  const voci = raw
    .map((v) => v as { label?: unknown; amount?: unknown } | null)
    .filter(
      (v): v is VocePrezzo =>
        typeof v?.label === 'string' &&
        v.label.trim().length > 0 &&
        typeof v.amount === 'number' &&
        Number.isFinite(v.amount) &&
        v.amount >= 0
    )
    .map((v) => ({ label: v.label.trim(), amount: v.amount }));
  return voci.length > 0 ? voci : PREDEFINITE.listinoPrezzi;
}
