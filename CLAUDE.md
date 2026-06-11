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
  `fetchProgrammazioneWeek`, helper date/ora (`formatShowtimeIt`, `formatDayIt`,
  `formatTimeIt`, `romeDayKey`, `isFridayRome`).
- **Solo server-side** (Server Components / Route Handlers): il token non deve
  finire nel bundle client.
- Cache: ISR (`export const revalidate = 600`). La programmazione cambia ~1/giorno.
- Env: `PROGRAMMAZIONE_API_URL`, `PROGRAMMAZIONE_API_TOKEN`
  (= `PROGRAMMAZIONE_READ_TOKEN` del gestionale, token dedicato ai consumer di
  lettura, distinto dal token webhook di Cinebot).

Contratto completo dell'API: nel gestionale, `docs/integrations/programmazione-api.md`.

## Altri servizi

- **TMDB** (`lib/tmdb.ts`): backdrop orizzontali per gli hero + poster
  ottimizzati. Env `TMDB_API_KEY`, opzionale: senza chiave si usa la locandina
  data-URI di Cinebot.
- **Biglietti online** (`lib/tickets.ts`): deep-link alla piattaforma di vendita
  Cinebot. Env `TICKET_URL_TEMPLATE` con segnaposto `{eventId}` (sostituito col
  `sourceId` della proiezione). Vuota = i bottoni "Acquista" non compaiono.
- Dati anagrafici/social dell'associazione: `lib/site.ts` (un posto solo).
- **Slideshow home** (`lib/slideshow-client.ts`): timeline gestita dalla
  Dashboard del gestionale (sezione "Sito Web → Slideshow", admin-only) ed
  esposta da `/api/public/sito-slideshow` (stesso token; URL derivato da
  PROGRAMMAZIONE_API_URL). Kind: current_programming, future_programming,
  video, image; slide vuote saltate, `fallbackOnly` solo senza programmazione.
  Endpoint assente/vuoto → timeline default (solo programmazione corrente).
  Spec backend: nel gestionale, `docs/specs/sito-web-slideshow.md`.

## Pagine

`/` (hero stile monitor di sala + settimana) · `/programmazione` (per giorno) ·
`/film/[id]` · `/prossimamente` · `/venerdi` (rassegna del venerdì, filtro
automatico) · `/associazione` · `/info` (statiche).

## Convenzioni

- Testi UI in **italiano**; codice/variabili in **inglese**.
- **Accessibilità (WCAG AA), da mantenere in ogni nuova pagina/componente:**
  - un solo `h1` per pagina (in home è `sr-only`, l'hero usa `h2`);
  - icone decorative SEMPRE con `aria-hidden="true"`;
  - link "Acquista"/esterni: `aria-label` con film+orario e "(si apre in una
    nuova scheda)";
  - orari dentro `<time dateTime={iso}>`;
  - bottoni pieni col testo bianco: usare `bg-cinema-accent-strong` (4.6:1),
    MAI `bg-cinema-accent` (3.5:1, sotto AA); testo piccolo su chip accent/15:
    `text-cinema-accent-hover`;
  - skip-link e `:focus-visible` definiti in `globals.css`; rispettare
    `prefers-reduced-motion`;
  - JSON-LD: MovieTheater nel layout, Movie+ScreeningEvent nella scheda film.
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

- Fase 2: `/corsi` e `/eventi` (layer editoriale gestito dalla dashboard del
  gestionale, nuove tabelle + read-API `/api/public/eventi`).
- Fase 3: `/rassegna-estiva` (Castello di Villafranca, campo `venue` già
  esposto dall'API), newsletter, SEO/OG/sitemap, switch dominio
  www.cinemametropol.com da Wix a Vercel.
- Flag "in evidenza" in dashboard per scegliere il film dell'hero (oggi: il
  film con la proiezione più vicina).
