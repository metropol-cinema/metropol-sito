import { timingSafeEqual } from 'node:crypto';
import { revalidatePath } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Rigenerazione su richiesta: il gestionale chiama qui appena cambia qualcosa
 * di pubblico (programmazione, slideshow) e le pagine che mostrano quel dato
 * cadono subito, invece di aspettare la finestra ISR di 10 minuti.
 *
 * L'ISR resta come rete di sicurezza: se questa chiamata non parte (gestionale
 * giù, segreto sbagliato, modifica fatta a mano sul database) il sito si
 * aggiorna comunque da solo entro dieci minuti.
 *
 * Si usa `revalidatePath` e non `revalidateTag`: in Next 16 revalidateTag è
 * passato al nuovo modello di cache (`use cache`) e vuole un profilo di
 * cacheLife, mentre qui le pagine sono ISR classiche. revalidatePath svuota
 * sia la pagina sia le fetch fatte durante il suo render.
 *
 * Env: REVALIDATE_SECRET (condiviso col gestionale). Non impostata → 503, e il
 * sito continua a funzionare col solo ISR.
 */

/** Cosa è cambiato → quali pagine devono cadere. */
const PATHS: Record<string, ReadonlyArray<[string, 'page' | 'layout']>> = {
  // La programmazione compare praticamente ovunque.
  programmazione: [
    ['/', 'page'],
    ['/programmazione', 'page'],
    ['/prossimamente', 'page'],
    ['/venerdi', 'page'],
    // Rotta dinamica: così cadono tutte le schede film insieme.
    ['/film/[id]', 'page'],
  ],
  // Lo slideshow lo mostra solo la home.
  slideshow: [['/', 'page']],
  // Un corso cambia la sua pagina e — se cambia la finestra o la pubblicazione
  // — anche il menu, che sta nel layout: quindi cade tutto.
  corsi: [
    ['/corsi', 'page'],
    ['/corsi/[slug]', 'page'],
    ['/', 'layout'],
  ],
};

/** Confronto a tempo costante: un `===` racconta quanti caratteri combaciano. */
function secretMatches(given: string, expected: string): boolean {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) {
    return NextResponse.json({ ok: false, error: 'Endpoint non configurato' }, { status: 503 });
  }

  const given = request.headers.get('x-revalidate-secret') ?? '';
  if (!secretMatches(given, expected)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  // Nessun tag indicato = rigenera tutto: è il caso di un reinvio Cinebot, che
  // può toccare qualunque cosa.
  const tag = request.nextUrl.searchParams.get('tag');
  if (tag && !(tag in PATHS)) {
    return NextResponse.json({ ok: false, error: 'Tag sconosciuto' }, { status: 400 });
  }

  const entries = tag ? PATHS[tag] : Object.values(PATHS).flat();
  const done = new Set<string>();
  for (const [path, type] of entries) {
    if (done.has(path)) continue;
    revalidatePath(path, type);
    done.add(path);
  }

  return NextResponse.json({
    ok: true,
    revalidated: [...done],
    at: new Date().toISOString(),
  });
}
