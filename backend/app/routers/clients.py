from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import ClientOutlet
from ..schemas import OutletOut, OutletsResponse

router = APIRouter()


@router.get("/clients", response_model=OutletsResponse)
def list_clients(
    sector: str | None = Query(default=None),
    city: str | None = Query(default=None),
    db: Session = Depends(get_db),
):
    stmt = select(ClientOutlet)
    if sector and sector != "All":
        stmt = stmt.where(ClientOutlet.sector == sector)
    if city and city != "All":
        stmt = stmt.where(ClientOutlet.city == city)
    stmt = stmt.order_by(ClientOutlet.outlet_name.asc())

    rows = db.execute(stmt).scalars().all()
    outlets = [
        OutletOut(
            outlet=r.outlet_name,
            company=r.company,
            sector=r.sector,
            city=r.city,
            state=r.state,
            active=r.is_active,
        )
        for r in rows
    ]
    return OutletsResponse(count=len(outlets), outlets=outlets)
