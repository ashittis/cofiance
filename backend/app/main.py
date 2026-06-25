from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import Base, engine
from .routers import admin, applicants, apply, case_studies, clients

# Create tables on startup if they don't exist (seed.py does a full reset).
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Confiance Services API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(clients.router, tags=["clients"])
app.include_router(case_studies.router, tags=["case-studies"])
app.include_router(apply.router, tags=["apply"])
app.include_router(applicants.router, tags=["applicants"])
app.include_router(admin.router, tags=["admin"])


@app.get("/")
def health():
    return {"ok": True, "service": "confiance-api"}
