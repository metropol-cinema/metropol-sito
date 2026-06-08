# Metropol — Sito web (programmazione)

Sito pubblico del Cinema Metropol: mostra i film **in programmazione questa
settimana** (orari + prezzi + locandina). I dati arrivano dalla **read-API del
gestionale** (`metropol-cinema`); questo progetto è un consumatore read-only.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v3 · Vercel.

## Setup

```bash
npm install
cp .env.example .env.local   # poi compila PROGRAMMAZIONE_API_TOKEN
npm run dev                   # http://localhost:3000
```

### Env

| Variabile | Valore |
| --- | --- |
| `PROGRAMMAZIONE_API_URL` | `https://app.cinemametropol.it/api/public/programmazione` |
| `PROGRAMMAZIONE_API_TOKEN` | lo stesso `CINEBOT_WEBHOOK_TOKEN` del gestionale (SOLO server-side) |

## Struttura

```
app/
  layout.tsx          # layout + metadata
  page.tsx            # home: programmazione della settimana (Server Component, ISR 10 min)
  globals.css         # Tailwind + tema dark "cinema"
components/
  film-card.tsx       # scheda film (locandina, orari, prezzi)
lib/
  programmazione-client.ts  # client tipizzato della read-API
  utils.ts            # cn() + formatEuro()
```

## Deploy (Vercel)

1. Crea un progetto Vercel da questo repo.
2. Imposta le env `PROGRAMMAZIONE_API_URL` e `PROGRAMMAZIONE_API_TOKEN`.
3. Deploy. La home è rigenerata via ISR ogni 10 minuti.

## Note

- Le date dall'API sono in **UTC**: vengono mostrate in `Europe/Rome`
  (vedi `formatShowtimeIt`).
- I **prezzi sono per proiezione**: lo stesso film può avere prezzi diversi a
  orari diversi.
- Il **token** è un segreto: resta solo lato server (mai `NEXT_PUBLIC_*`).
