from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Applicant
from ..schemas import ApplicantOut

router = APIRouter()


# Foundation for a future /admin view — lists captured applicants newest first.
@router.get("/applicants", response_model=list[ApplicantOut])
def list_applicants(db: Session = Depends(get_db)):
    rows = (
        db.execute(select(Applicant).order_by(Applicant.created_at.desc()))
        .scalars()
        .all()
    )
    return [
        ApplicantOut(
            id=r.id,
            fullName=r.full_name,
            phone=r.phone,
            email=r.email,
            city=r.city,
            sectorPref=r.sector_pref,
            experience=r.experience,
            availability=r.availability,
            status=r.status,
            createdAt=r.created_at,
        )
        for r in rows
    ]
