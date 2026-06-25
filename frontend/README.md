# Confiance Services — Frontend (Next.js)

Next.js 14 (App Router) + Tailwind + framer-motion. UI only — all dynamic data
comes from the FastAPI backend (see `../backend`).

## Run
```bash
npm install
cp .env.example .env.local    # NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev                   # http://localhost:3000
```
The backend must be running for live data; otherwise pages fall back to the
static seed in `src/lib/data.ts`.

## Pages
`/` (long-scroll home), `/services`, `/how-we-work`, `/clients`, `/apply`,
`/about`, `/contact`.

## Data flow
- `src/lib/queries.ts` — server-side fetches to the backend (`/clients`,
  `/case-studies`) with static fallback.
- `src/components/ApplyForm.tsx` — POSTs applicants to the backend `/apply`.
- `NEXT_PUBLIC_API_URL` controls the backend base URL.
