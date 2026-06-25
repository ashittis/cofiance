"""Reset the public schema and load seed data. Run: python -m app.seed"""
from datetime import datetime

from sqlalchemy import text

from .database import Base, SessionLocal, engine
from .models import CaseStudy, ClientOutlet, ServiceVertical, TrainingBatch
from .seed_data import CASE_STUDIES, OUTLETS, VERTICALS


def reset_schema() -> None:
    # Fully drop everything (including any leftover Prisma tables/enums) and recreate.
    with engine.begin() as conn:
        conn.execute(text("DROP SCHEMA public CASCADE"))
        conn.execute(text("CREATE SCHEMA public"))
    Base.metadata.create_all(bind=engine)


def seed() -> None:
    db = SessionLocal()
    try:
        verticals = []
        for v in VERTICALS:
            row = ServiceVertical(name=v["name"], slug=v["slug"], blurb=v["blurb"])
            db.add(row)
            verticals.append(row)
        db.flush()
        print(f"  ✓ {len(verticals)} service verticals")

        for v in verticals:
            db.add(
                TrainingBatch(
                    vertical_id=v.id,
                    name=f"{v.name} — Batch 01",
                    start_date=datetime(2026, 7, 15),
                    capacity=25,
                    status="Planned",
                )
            )
        print("  ✓ training batches")

        for outlet, company, sector, city, state, active in OUTLETS:
            db.add(
                ClientOutlet(
                    outlet_name=outlet,
                    company=company,
                    sector=sector,
                    city=city,
                    state=state,
                    is_active=active,
                )
            )
        print(f"  ✓ {len(OUTLETS)} client outlets")

        for i, c in enumerate(CASE_STUDIES):
            db.add(CaseStudy(**c, sort_order=i))
        print(f"  ✓ {len(CASE_STUDIES)} case studies")

        db.commit()
    finally:
        db.close()


if __name__ == "__main__":
    print("Resetting schema…")
    reset_schema()
    print("Seeding…")
    seed()
    print("Done.")
