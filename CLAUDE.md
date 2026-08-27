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

**Il quadro settimana LUN→DOM è stato tolto** (ago 2026, decisione dell'utente):
si proietta da ottobre a maggio e quasi solo nel fine settimana, quindi mostrava
quattro o cinque caselle spente su sette; e da quando ogni gruppo di orari porta
la sua data sopra (`<DayLabel>` in `components/showtimes.tsx`), ripeteva
informazioni già presenti — con meno contesto, perché non diceva di quale film
fossero quegli orari. Sotto l'hero resta solo il filo dorato dell'insegna, a
separare le due zone.

Le `<section>` di `DaySchedule` conservano `id={dayKey}`: permalink a un singolo
giorno, es. `/programmazione#2026-08-22`.

## Accessibilità: la barra e i quattro temi

In basso a sinistra c'è la **barra di accessibilità** (`components/accessibility-bar.tsx`):
roba nostra, non un widget di terzi — nessuno script esterno, niente richieste
in uscita, tutto in italiano. Offre quattro temi di colore, quattro dimensioni
del testo, il carattere ad alta leggibilità, più spazio fra righe e lettere,
link sottolineati e uno stop alle animazioni.

**Come funziona**, perché è il pezzo che tocca tutto il resto:

1. le preferenze stanno in `localStorage` (`lib/a11y.ts`) e diventano attributi
   `data-*` su `<html>`;
2. uno **script inline** nel layout le riapplica **prima del primo disegno** —
   senza, chi ha scelto il tema chiaro vedrebbe un lampo di nero a ogni pagina.
   Da qui il `suppressHydrationWarning` sull'`<html>`: la differenza fra server
   e client è voluta;
3. tutto l'aspetto lo decide il CSS in `app/globals.css`. **Nessun componente
   sa che la barra esiste**, tranne il carosello e i video, che il CSS non può
   fermare.

### Colori: token, non valori

I token `cinema-*` di Tailwind puntano a variabili CSS (`--c-*`) definite in
`globals.css`, una lista per tema: `sala` (predefinito), `chiaro`,
`contrasto-scuro`, `contrasto-chiaro`. **Scrivi sempre classi con token**, mai
un colore letterale: un `#0B0B0D` in una classe resta nero anche sulla carta.
Se aggiungi un token, aggiungilo a tutte e quattro le liste.

L'oro ha **tre** ruoli distinti, ed è l'unico punto dove si sbaglia facile:

| Classe | Quando | Sul chiaro diventa |
| --- | --- | --- |
| `bg-cinema-ticket` | superficie d'azione (bottone pieno, tagliando) | oro, sempre |
| `text-cinema-on-ticket` | il testo **sopra** quella superficie | quasi nero |
| `text-cinema-ticket-ink` / `border-cinema-ticket-ink` | oro come **inchiostro** (occhielli, icone, bordi) | ambra scura |

Regola pratica: `bg-cinema-ticket` va **sempre** con `text-cinema-on-ticket`
(mai `text-cinema-bg`), e l'oro che scrive è sempre `-ink`.

### `data-zona="scura"` e `data-decor="fondale"`

- **`data-zona="scura"`** su una fascia costruita sopra una fotografia (hero del
  film, testata della scheda, slide media): dentro quel sottoalbero valgono
  sempre i colori della sala, in tutti e quattro i temi. Una locandina porta la
  sua luce, e un velo bianco su un fotogramma non fa contrasto, fa nebbia.
  Serve anche `bg-cinema-bg` sulla fascia, o in tema chiaro resterebbe
  trasparente. Le due fasce senza fotografia (`HeroClosed`, `HeroUpcoming`)
  **non** sono zone scure: seguono il tema.
- **`data-decor="fondale"`** su un fondale puramente decorativo (il backdrop del
  film, gli aloni dorati): sparisce nei due temi ad alto contrasto, dove
  un'immagine al 60% dietro al testo toglie proprio a chi non può permetterselo.

### `/accessibilita`: la pagina che conta più della barra

Contenuti in `lib/accessibilita.ts`, linkata dal piè di pagina, da `/info` e dal
pannello della barra. Dice due cose: **come si entra davvero in Sala "Alida
Ferrarini"** e cosa abbiamo fatto (e non fatto) su questo sito.

**La regola del file è una sola, e non si negozia: ci va solo ciò che qualcuno
ha verificato di persona.** Chi legge quella pagina non sta scegliendo un film,
sta decidendo se mettersi in viaggio: una voce ottimistica scritta per non fare
brutta figura è peggio di una voce mancante — quella si può chiedere, un viaggio
a vuoto no. Se una cosa non si sa, si toglie la voce. Le stesse tre voci stanno
anche nei dati strutturati del cinema (`amenityFeature` in `app/layout.tsx`):
cambiano lì, cambiale anche qui.

`CONTATTO_ACCESSIBILITA` è ancora `null` — manca un indirizzo email pubblico, e
finché manca la pagina rimanda ai social e alla cassa.

### Verifiche automatiche

- `npm run lint` — le regole di accessibilità di **jsx-a11y al set `strict`**
  (30 regole, non la manciata che accende `eslint-config-next`): alt mancanti,
  bottoni senza nome, etichette scollegate, ruoli inventati. Prende gli errori
  mentre scrivi.
- `npm run a11y` — dopo un `npm run build`, controlla l'HTML **già generato** di
  ogni pagina statica: una sola `<h1>`, livelli di intestazione senza salti,
  `alt` su ogni immagine, `title` su ogni iframe, un nome accessibile su ogni
  link e bottone, etichette sui campi, niente `tabindex` positivo, niente id
  ripetuti, un solo `<main>`, e i link che aprono una nuova scheda che lo
  dicono. `scripts/verifica-accessibilita.mjs`.
- `npm run verifica` — i tre in fila.

Perché non axe: misura anche i contrasti, e per farlo vuole un browser vero —
Chromium, ~300 MB, in un repo che non ha nemmeno un test runner. I contrasti qui
li fissa la palette una volta per tutte, non le singole pagine. **Limite noto:**
`npm run a11y` vede solo le pagine pre-generate, quindi non `/film/[id]` né
`/corsi/[slug]`, che sono dinamiche.

Il controllo **non** è agganciato al deploy: `npm run build` su Vercel non lo
esegue. Volendo si può, ma vuol dire che una pagina con un alt mancante blocca
la messa in produzione — è una scelta da fare a mente fredda.

### Da rispettare scrivendo pagine nuove

- Il resto delle regole WCAG AA è più sotto, in "Convenzioni".
- **Niente misure in pixel per il testo**: tutto in `rem`, altrimenti
  l'ingrandimento non ingrandisce. Oggi il sito non ne ha nemmeno una.
- Un contenitore con altezza fissa e `overflow-hidden` attorno a del testo si
  rompe al 150%: usa `min-h-`.
- Il **marchio** in testata e in fondo porta la classe `.marchio`: sui temi
  chiari viene rovesciato in nero via `filter: invert(1)`. È monocromatico,
  quindi funziona; se un domani ci fosse un logo a colori servirebbe un file.
- Il **menu su schermo stretto** (`components/mobile-menu.tsx`) resta un
  `<details>` — è una tendina già dal browser e funziona anche senza
  JavaScript — con sopra le tre cose che a tastiera si sentono subito: Esc che
  chiude e restituisce il focus, click fuori, e chiusura al cambio pagina.
- Il **carattere ad alta leggibilità** è Atkinson Hyperlegible (Braille
  Institute, licenza OFL, servito da noi via `next/font`). Non si usa
  direttamente in una classe: la barra ridefinisce `--font-display`,
  `--font-sans` e `--font-utility`, e cambiano tutti e tre insieme.
  *Nota licenza:* EasyReading, il font italiano dyslexia-friendly, **non** è
  utilizzabile gratuitamente da un'associazione — la loro licenza gratuita
  esclude esplicitamente gli enti e le associazioni, anche senza scopo di lucro.
  Se un giorno se ne comprasse la licenza webfont, si sostituisce qui e basta.

## Pagine

`/` (hero + settimana) · `/programmazione` (per giorno) ·
`/film/[id]` · `/prossimamente` (solo film marcati, vedi sotto) · `/venerdi` (rassegna del venerdì, filtro
automatico) · `/associazione` (hub con card) e sottopagine `/chi-siamo`,
`/storia`, `/come-associarsi` (modulo PDF in `public/docs/`),
`/diventa-volontario`, `/statuto` (testo in `content.ts` accanto alla pagina) ·
`/corsi` e `/corsi/[slug]` (corsi di cinema, vedi sotto) ·
`/info` · `/accessibilita` (vedi sotto) (statiche; le sottopagine
dell'associazione sono linkate da `ASSOCIATION_LINKS` in hub e footer, non nel
menu principale). `not-found.tsx` e `global-error.tsx` sono nostre: le pagine
di serie di Next erano in inglese e senza `<main>`.

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
  - l'oro: `bg-cinema-ticket` + `text-cinema-on-ticket` per le superfici,
    `text-cinema-ticket-ink` per l'oro che scrive (vedi "Accessibilità");
  - skip-link e `:focus-visible` definiti in `globals.css`; rispettare
    `prefers-reduced-motion`;
  - JSON-LD: MovieTheater nel layout, Movie+ScreeningEvent nella scheda film.
- **"Prossimamente" non è automatico**: sono i film con `showInUpcoming` acceso
  in dashboard (Programmazione → interruttore "prossimam."). Due conseguenze da
  ricordare:
  1. un film marcato arriva dall'API **anche senza proiezioni**, quindi
     `film.showtimes` può essere `[]` — mai dare per scontato `showtimes[0]`;
  2. la voce di menu "Prossimamente" compare solo se esiste almeno un film
     marcato (`lib/nav.ts`, `visibleNavLinks()`): header e footer sono per
     questo Server Component **async**. Se la read-API non risponde la voce
     resta nascosta, il menu non è il posto dove segnalare un guasto.
- **Corsi** (`lib/corsi-client.ts`, read-API `/api/public/corsi` del gestionale,
  contratto in `docs/integrations/corsi-api.md`):
  - `/corsi` con **un solo** corso pubblicato È la pagina del corso, non un
    elenco di una voce; con più corsi diventa l'indice;
  - `menuFrom`/`menuTo` accendono e spengono **solo la voce di menu**: la
    pagina resta raggiungibile finché il corso è pubblicato, così i link già
    condivisi non si rompono;
  - il pagamento è di Stripe e vive **nel gestionale**. Il sito ha solo
    `/api/corsi/checkout`, un ponte che tiene la chiamata sullo stesso dominio
    (dal browser sarebbe cross-origin): non conosce chiavi e non manda prezzi,
    che il gestionale legge dal database;
  - `/corsi/grazie` è il ritorno da Stripe e **non interroga Stripe**:
    l'iscrizione la registra il webhook, l'unica fonte attendibile.
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
