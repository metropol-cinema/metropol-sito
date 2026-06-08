# CLAUDE.md — Sito web Metropol

## WHAT

Sito pubblico del Cinema Metropol (Villafranca di Verona). Mostra i film **in
programmazione settimanalmente** (orari, prezzi, locandina). I dati arrivano
dalla **read-API del gestionale** `metropol-cinema`: questo è un consumatore
**read-only**, senza database proprio.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v3 · Vercel.

## Dati: read-API della programmazione

- Client: `lib/programmazione-client.ts` — `fetchProgrammazione`,
  `fetchProgrammazioneWeek`, `formatShowtimeIt`, `formatDayIt`.
- **Solo server-side** (Server Components / Route Handlers): il token non deve
  finire nel bundle client.
- Cache: ISR (`export const revalidate = 600`). La programmazione cambia ~1/giorno.
- Env: `PROGRAMMAZIONE_API_URL`, `PROGRAMMAZIONE_API_TOKEN` (= `CINEBOT_WEBHOOK_TOKEN`).

Contratto completo dell'API: nel gestionale, `docs/integrations/programmazione-api.md`.

## Convenzioni

- Testi UI in **italiano**; codice/variabili in **inglese**.
- Date/ore SEMPRE in `Europe/Rome` (l'API è in UTC) — usa gli helper del client.
- `prices` è **per proiezione**: niente assunzioni di prezzo unico per film.
- Palette "cinema dark" in `tailwind.config.ts` (token `cinema-*`).
- Locandina: `film.poster` è un data-URI pronto; in alternativa `film.tmdbId`
  con `next/image` (host `image.tmdb.org` già in `next.config.mjs`).

## Comandi

- `npm run dev` · `npm run build` · `npm run lint`

## DON'TS

- Niente `PROGRAMMAZIONE_API_TOKEN` in client/`NEXT_PUBLIC_*`.
- Niente accesso diretto a Supabase: solo la read-API del gestionale.
- Non reimplementare visibilità/override: l'API restituisce già dati pronti.

## Idee successive

- Pagina `/film/[id]` (scheda singola, arricchita con TMDB via `tmdbId`).
- Filtro per giorno; vista "oggi"; locandina hero del film in evidenza.
