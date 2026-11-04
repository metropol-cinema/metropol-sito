import { NextResponse, type NextRequest } from 'next/server';

import { screeningCalendar } from '@/lib/calendario';
import { URL_SITO } from '@/lib/ambiente';
import { fetchProgrammazione } from '@/lib/programmazione-client';
import { BOX_OFFICE_NOTE, SITE, isHomeVenue } from '@/lib/site';

/**
 * «Aggiungi al calendario»: il file di UNA proiezione del film, scelta con
 * `?at=<startsAt>`. La proiezione deve esistere davvero: titolo e orario non si
 * prendono dall'indirizzo, altrimenti chiunque potrebbe far scaricare dal nostro
 * dominio un appuntamento scritto da lui.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const at = request.nextUrl.searchParams.get('at');
  const filmId = Number.parseInt(id, 10);

  let film;
  try {
    const films = await fetchProgrammazione({ days: 180, posters: false });
    film = films.find((f) => f.id === filmId);
  } catch {
    return new NextResponse('Programmazione non disponibile', { status: 503 });
  }

  const showtime = film?.showtimes.find((s) => s.startsAt === at);
  if (!film || !showtime) {
    return new NextResponse('Proiezione non trovata', { status: 404 });
  }

  const url = `${URL_SITO}/film/${film.id}`;
  const body = screeningCalendar({
    uid: `film-${film.id}-${showtime.startsAt}@cinemametropol.it`,
    title: `${film.title} al ${SITE.name}`,
    startsAt: showtime.startsAt,
    durationMinutes: film.durationMinutes,
    location:
      showtime.venue && !isHomeVenue(showtime.venue)
        ? showtime.venue
        : `${SITE.venueName}, ${SITE.venueAddress}`,
    description: `${BOX_OFFICE_NOTE}\n${url}`,
    url,
  });

  return new NextResponse(body, {
    headers: {
      'content-type': 'text/calendar; charset=utf-8',
      'content-disposition': 'inline; filename="metropol.ics"',
      'x-robots-tag': 'noindex',
    },
  });
}
