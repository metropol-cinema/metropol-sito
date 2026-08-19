import { NextResponse, type NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Ponte verso il checkout del gestionale.
 *
 * Il bottone "Iscriviti e paga" è nel browser: chiamare direttamente
 * app.cinemametropol.it sarebbe una richiesta cross-origin, con tutto il
 * contorno di CORS. Passando di qui la chiamata resta sullo stesso dominio e
 * il sito non deve sapere nulla di Stripe: si limita a inoltrare lo slug e a
 * restituire il link a cui mandare la persona.
 *
 * Il prezzo non passa da qui di proposito: lo decide il gestionale leggendolo
 * dal database.
 */
function gestionaleCheckoutUrl(): string | null {
  const base = process.env.PROGRAMMAZIONE_API_URL;
  if (!base) return null;
  const url = base.replace(/\/programmazione\/?$/, '/corsi/checkout');
  return url === base ? null : url;
}

export async function POST(request: NextRequest) {
  const target = gestionaleCheckoutUrl();
  if (!target) {
    return NextResponse.json({ ok: false, error: 'Iscrizioni non configurate' }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as { slug?: unknown } | null;
  const slug = typeof body?.slug === 'string' ? body.slug : '';
  if (!slug) {
    return NextResponse.json({ ok: false, error: 'Corso non indicato' }, { status: 400 });
  }

  try {
    const res = await fetch(target, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ slug }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });
    const json = (await res.json().catch(() => null)) as
      | { ok?: boolean; url?: string; error?: string }
      | null;

    if (!res.ok || !json?.ok || !json.url) {
      return NextResponse.json(
        { ok: false, error: json?.error ?? 'Impossibile avviare il pagamento' },
        { status: res.status === 200 ? 502 : res.status }
      );
    }
    return NextResponse.json({ ok: true, url: json.url });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Il servizio di pagamento non risponde. Riprova fra poco.' },
      { status: 502 }
    );
  }
}
