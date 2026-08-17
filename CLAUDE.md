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

- **TMDB** (`lib/tmdb.ts`): `fetchTmdbDetails` fa **una sola** richiesta per
  film (`append_to_response=images,release_dates,videos`) e ne ricava backdrop,
  poster ottimizzato, tagline, anno, generi, **età consigliata**, **fotogallery**
  e trailer di riserva. Env `TMDB_API_KEY`, opzionale: senza chiave si resta su
  locandina e testi di Cinebot.
- **Età consigliata** (`lib/age-rating.ts`): certificazione italiana (T, 6+,
  14+, 18+ e le vecchie VM6/VM14/VM18); se manca, quella USA **dichiarata come
  tale**. Nessun dato → nessun badge, mai un'età inventata.
- **Trailer** (`lib/youtube.ts`): comanda `film.trailerUrl` della read-API (già
  preferito in italiano e sovrascrivibile dall'Admin in dashboard), TMDB è solo
  la riserva. Il player è una facciata: l'iframe `youtube-nocookie` viene montato
  al click, prima la pagina non contatta YouTube.
- **Biglietti online** (`lib/tickets.ts`): deep-link alla piattaforma di vendita
  Cinebot. Env `TICKET_URL_TEMPLATE` con segnaposto `{eventId}` (sostituito col
  `sourceId` della proiezione). Vuota = i bottoni "Acquista" non compaiono.
- Dati anagrafici/social dell'associazione: `lib/site.ts` (un posto solo).
- **Slideshow home** (`lib/slideshow-client.ts`): timeline gestita dalla
  Dashboard del gestionale (sezione "Sito Web → Slideshow", admin-only) ed
  esposta da `/api/public/sito-slideshow` (stesso token; URL derivato da
  PROGRAMMAZIONE_API_URL). **È la timeline a comandare la fascia hero**: vedi
  "L'hero" qui sotto. Spec backend: nel gestionale,
  `docs/specs/sito-web-slideshow.md`.

## L'hero (home)

**La fascia hero è la timeline di "Sito Web → Slideshow"**, nell'ordine deciso
in dashboard. `planHero` in `app/page.tsx` traduce ogni riga in slide:

| Riga della timeline | Diventa |
| --- | --- |
| `current_programming` | **una slide per film della settimana** (non una sola), in ordine di proiezione più vicina |
| `future_programming`  | il pannello `HeroUpcoming` coi film in arrivo |
| `video` / `image`     | la slide media caricata |

Regole di contorno:

- una riga senza contenuto si salta (niente film in settimana, nessun media);
- `fallbackOnly` = "solo come riserva": compare solo se **nessuna** riga di
  programmazione ha prodotto contenuto. È così che si tiene un video di scorta
  senza che copra il film in cartellone — se il flag è spento, il video sta
  dove l'hai messo, anche prima dei film;
- massimo `MAX_HERO_SLIDES` slide in totale;
- timeline assente o vuota → `DEFAULT_TIMELINE` (programmazione + prossimamente);
- niente da mostrare → `HeroClosed`, "il proiettore riposa";
- `priority` va solo alla prima slide: il backdrop è l'immagine più pesante
  della pagina.

La sezione "Prossimamente" sotto la settimana non si ripete se la timeline la
mette già nell'hero (`upcomingInHero`).

Sotto l'hero c'è il **quadro settimana** (`components/week-rail.tsx`): lunedì →
domenica, i giorni con proiezione accesi in oro con gli orari, gli altri spenti.
Punta a `/programmazione#YYYY-MM-DD` (l'ancora è sulla `<section>` di
`DaySchedule`).

## Pagine

`/` (hero stile monitor di sala + settimana) · `/programmazione` (per giorno) ·
`/film/[id]` · `/prossimamente` · `/venerdi` (rassegna del venerdì, filtro
automatico) · `/associazione` (hub con card) e sottopagine `/chi-siamo`,
`/storia`, `/come-associarsi` (modulo PDF in `public/docs/`),
`/diventa-volontario`, `/statuto` (testo in `content.ts` accanto alla pagina) ·
`/info` (statiche; le sottopagine dell'associazione sono linkate da
`ASSOCIATION_LINKS` in hub e footer, non nel menu principale).

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
- **Marchio**: `public/loghi/metropol-marchio-bianco.png` (versione
  monocromatica) in testata e piè di pagina — sul nero è quella giusta e porta
  già il nome per esteso, quindi niente wordmark accanto.
  `metropol-logo-colori.png` è il marchio da carta intestata (nero + petrolio
  `#3898B0`): serve solo a comporre `app/opengraph-image.png`, l'anteprima di
  condivisione. `app/icon.png` è la bobina del marchio, ritagliata per colore.
  Il petrolio **non** entra nella palette del sito: l'accento resta l'oro.
- Palette **"sala buia, insegna d'oro"** in `tailwind.config.ts` (token
  `cinema-*`): nero caldo `#0B0B0D`, oro dell'insegna `#F4B740` come colore
  d'azione, rosso sipario `#8C1D18` per le proiezioni fuori sala (Castello). Il
  blu `cinema-accent*` resta definito ma **fuori dalle superfici**: solo
  skip-link e focus.
- Tre ruoli tipografici: **Fraunces** display (titoli, con assi `SOFT`/`WONK`/
  `opsz` impostati in `globals.css`), **Inter** corpo/UI, **Archivo** utility
  (`font-utility`: occhielli, giorni, etichette dei biglietti).
- Elementi condivisi: `.eyebrow` (occhiello d'oro), `.ticket` (la firma del
  sito), `.grain`/`.beam`/`.vignette` (atmosfera di proiezione, spente da
  `prefers-reduced-motion`), `<PageHeader>`/`<EmptyState>`/`<LoadError>`
  (`components/page-header.tsx`), `<MetaLine>`, `<PosterGrid>`, `<AgeBadge>`.
- Caroselli su **Embla** (`embla-carousel-react` + `-autoplay` + `-fade`): hero
  della home e striscia della fotogallery. Nel carosello le slide non attive
  sono `inert`, così i loro link restano fuori dalla tabulazione.
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
- Flag "in evidenza" in dashboard per scegliere l'ordine delle slide dell'hero
  (oggi: i film della settimana, per proiezione più vicina).
