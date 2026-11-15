import { NextResponse } from 'next/server';

import { URL_SITO } from '@/lib/ambiente';
import { screeningCalendar } from '@/lib/calendario';
import { SERATA_21_NOVEMBRE as SERATA } from '@/lib/serate';
import { SITE } from '@/lib/site';

/** «Aggiungi al calendario» della serata: tutto viene da `lib/serate.ts`, niente dall'indirizzo. */
export function GET() {
  const url = `${URL_SITO}/serate/${SERATA.slug}`;
  const body = screeningCalendar({
    uid: `serata-${SERATA.slug}-2026@cinemametropol.it`,
    title: `${SERATA.titolo} al ${SITE.name}`,
    startsAt: SERATA.inizio,
    durationMinutes: null,
    location: `${SITE.venueName}, ${SITE.venueAddress}`,
    description: `${SERATA.ingresso}.\n${url}`,
    url,
  });

  return new NextResponse(body, {
    headers: {
      'content-type': 'text/calendar; charset=utf-8',
      'content-disposition': 'inline; filename="metropol-21-novembre.ics"',
      'x-robots-tag': 'noindex',
    },
  });
}
