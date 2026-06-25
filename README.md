# Confiance Services

Workforce-solutions platform — a marketing site + applicant lead-capture funnel +
client directory. Split into two independently-run apps:

```
.
├── frontend/   Next.js 14 (App Router, Tailwind, framer-motion)  →  npm run dev   :3000
└── backend/    FastAPI + SQLAlchemy + PostgreSQL                  →  uvicorn        :8000
```

The frontend renders the UI and fetches all dynamic data (client outlets, case
studies) from the backend over HTTP. The Apply form POSTs applicants to the
backend, which persists them to Postgres and (optionally) sends a Resend
confirmation email. If the backend is down, the frontend falls back to static
seed content so pages still render.

There's also a NextAuth-protected **admin panel** at `/admin` (dashboard,
applicant status management, outlet CRUD) that talks to protected backend
`/admin/*` endpoints via a shared admin key.

## Prerequisites
- Node.js 18+
- Python 3.11 (3.12 ok; **not** 3.14 yet — no pydantic-core wheels)
- PostgreSQL running locally with a `confiance` database

## 1. Backend (FastAPI)
```bash
cd backend
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# configure DB (edit if your Postgres user/host differ)
cp .env.example .env

# reset schema + load seed data (2 verticals, 14 outlets, 5 case studies)
python -m app.seed

# run with autoreload
uvicorn app.main:app --reload --port 8000
```
API docs: http://localhost:8000/docs

Public endpoints:
- `GET  /clients?sector=&city=` — client outlets (filterable)
- `GET  /case-studies` — operational showcase case studies
- `POST /apply` — create an applicant (Pydantic-validated; sends Resend email if configured)

Admin endpoints (require `X-Admin-Key` header):
- `GET    /admin/stats` — counts for the dashboard
- `GET    /admin/applicants` · `PATCH /admin/applicants/{id}` — list / update status
- `GET    /admin/outlets` · `POST /admin/outlets` · `PATCH /admin/outlets/{id}` · `DELETE /admin/outlets/{id}`

Key backend env (`backend/.env`): `DATABASE_URL`, `CORS_ORIGINS`,
`ADMIN_API_KEY` (must match the frontend), `RESEND_API_KEY` + `RESEND_FROM`
(optional — emails are skipped when unset).

## 2. Frontend (Next.js)
```bash
cd frontend
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL, NEXTAUTH_SECRET, ADMIN_* vars
npm run dev
```
Site: http://localhost:3000 · Admin: http://localhost:3000/admin

**Admin login (dev):** `admin@confiance.services` / `confiance123`
(change via `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `frontend/.env.local`).
Generate `NEXTAUTH_SECRET` with `openssl rand -base64 32`. `ADMIN_API_KEY` must
match `backend/.env`.

## Notes
- Both apps share the same Postgres `confiance` database; the backend owns the schema.
- Point either app at another DB by editing `backend/.env` (`DATABASE_URL`).
- Images are temporary keyword placeholders (loremflickr) and contact details are
  placeholders — swap when real assets are ready.
- Resend emails are wired but inactive until you set `RESEND_API_KEY` in `backend/.env`.
