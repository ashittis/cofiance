# Confiance Services — Backend (FastAPI)

FastAPI + SQLAlchemy 2.0 + PostgreSQL. Serves the public API consumed by the
Next.js frontend.

## Run
```bash
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # set DATABASE_URL / CORS_ORIGINS
python -m app.seed            # reset schema + seed (DESTRUCTIVE: drops public schema)
uvicorn app.main:app --reload --port 8000
```

Interactive docs at `/docs` (Swagger) and `/redoc`.

## Layout
```
app/
├── main.py          FastAPI app, CORS, router wiring, table create_all
├── config.py        env settings (DATABASE_URL, CORS_ORIGINS)
├── database.py      SQLAlchemy engine / session / Base
├── models.py        ORM models (7 tables)
├── schemas.py       Pydantic request/response models
├── seed_data.py     seed content
├── seed.py          schema reset + seed loader  (python -m app.seed)
└── routers/
    ├── clients.py        GET  /clients?sector=&city=
    ├── case_studies.py   GET  /case-studies
    ├── apply.py          POST /apply
    └── applicants.py     GET  /applicants
```

## Tables
`service_verticals`, `applicants`, `training_batches`, `batch_enrollments`,
`client_outlets`, `placements`, `case_studies`.

## Env
| var            | default                                                    |
|----------------|------------------------------------------------------------|
| `DATABASE_URL` | `postgresql+psycopg://akashsubramanian@localhost:5432/confiance` |
| `CORS_ORIGINS` | `http://localhost:3000`                                    |
