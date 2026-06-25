from fastapi import APIRouter, BackgroundTasks, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..database import get_db
from ..email import send_application_confirmation
from ..models import Applicant, ServiceVertical
from ..schemas import ApplicantCreate, ApplyResponse

router = APIRouter()


@router.post("/apply", response_model=ApplyResponse, status_code=201)
def create_application(
    payload: ApplicantCreate,
    background: BackgroundTasks,
    db: Session = Depends(get_db),
):
    # Link to a vertical by name when it matches a seeded one (optional).
    vertical = db.execute(
        select(ServiceVertical).where(ServiceVertical.name == payload.sector)
    ).scalar_one_or_none()

    applicant = Applicant(
        full_name=payload.fullName,
        phone=payload.phone,
        email=payload.email or None,
        city=payload.city,
        sector_pref=payload.sector,
        vertical_id=vertical.id if vertical else None,
        experience=payload.experience,
        availability=payload.availability,
    )
    db.add(applicant)
    db.commit()
    db.refresh(applicant)

    # Fire confirmation email out-of-band (skipped if RESEND_API_KEY is unset).
    if applicant.email:
        background.add_task(
            send_application_confirmation, applicant.email, applicant.full_name
        )

    return ApplyResponse(ok=True, persisted=True, id=applicant.id)
