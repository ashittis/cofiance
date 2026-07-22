from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from ..auth import require_admin
from ..database import get_db
from ..models import Applicant, ClientOutlet, Enquiry
from ..schemas import (
    AdminStats,
    ApplicantOut,
    ApplicantStatusUpdate,
    EnquiryOut,
    EnquiryStatusUpdate,
    OutletAdminOut,
    OutletCreate,
    OutletUpdate,
)

# Every route here requires the admin key (require_admin dependency).
router = APIRouter(prefix="/admin", dependencies=[Depends(require_admin)])

VALID_STATUSES = {"New", "Screened", "Enrolled", "Placed"}
VALID_ENQUIRY_STATUSES = {"New", "Contacted", "Closed"}


def _applicant_out(r: Applicant) -> ApplicantOut:
    return ApplicantOut(
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


def _enquiry_out(r: Enquiry) -> EnquiryOut:
    return EnquiryOut(
        id=r.id,
        name=r.name,
        company=r.company,
        phone=r.phone,
        city=r.city,
        services=r.services,
        message=r.message,
        status=r.status,
        createdAt=r.created_at,
    )


def _outlet_out(r: ClientOutlet) -> OutletAdminOut:
    return OutletAdminOut(
        id=r.id,
        outletName=r.outlet_name,
        company=r.company,
        sector=r.sector,
        city=r.city,
        state=r.state,
        isActive=r.is_active,
    )


# ---- Stats ----
@router.get("/stats", response_model=AdminStats)
def stats(db: Session = Depends(get_db)):
    by_status = dict(
        db.execute(select(Applicant.status, func.count()).group_by(Applicant.status)).all()
    )
    total = sum(by_status.values())
    outlets_total = db.scalar(select(func.count()).select_from(ClientOutlet)) or 0
    outlets_active = (
        db.scalar(
            select(func.count()).select_from(ClientOutlet).where(ClientOutlet.is_active.is_(True))
        )
        or 0
    )
    enquiries_total = db.scalar(select(func.count()).select_from(Enquiry)) or 0
    enquiries_new = (
        db.scalar(select(func.count()).select_from(Enquiry).where(Enquiry.status == "New")) or 0
    )
    return AdminStats(
        applicantsTotal=total,
        applicantsByStatus={s: by_status.get(s, 0) for s in ["New", "Screened", "Enrolled", "Placed"]},
        outletsActive=outlets_active,
        outletsTotal=outlets_total,
        enquiriesTotal=enquiries_total,
        enquiriesNew=enquiries_new,
    )


# ---- Applicants ----
@router.get("/applicants", response_model=list[ApplicantOut])
def list_applicants(db: Session = Depends(get_db)):
    rows = db.execute(select(Applicant).order_by(Applicant.created_at.desc())).scalars().all()
    return [_applicant_out(r) for r in rows]


@router.patch("/applicants/{applicant_id}", response_model=ApplicantOut)
def update_applicant_status(
    applicant_id: str, payload: ApplicantStatusUpdate, db: Session = Depends(get_db)
):
    if payload.status not in VALID_STATUSES:
        raise HTTPException(status_code=422, detail="Invalid status")
    row = db.get(Applicant, applicant_id)
    if not row:
        raise HTTPException(status_code=404, detail="Applicant not found")
    row.status = payload.status
    db.commit()
    db.refresh(row)
    return _applicant_out(row)


# ---- Enquiries (Contact form submissions) ----
@router.get("/enquiries", response_model=list[EnquiryOut])
def list_enquiries(db: Session = Depends(get_db)):
    rows = db.execute(select(Enquiry).order_by(Enquiry.created_at.desc())).scalars().all()
    return [_enquiry_out(r) for r in rows]


@router.patch("/enquiries/{enquiry_id}", response_model=EnquiryOut)
def update_enquiry_status(
    enquiry_id: str, payload: EnquiryStatusUpdate, db: Session = Depends(get_db)
):
    if payload.status not in VALID_ENQUIRY_STATUSES:
        raise HTTPException(status_code=422, detail="Invalid status")
    row = db.get(Enquiry, enquiry_id)
    if not row:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    row.status = payload.status
    db.commit()
    db.refresh(row)
    return _enquiry_out(row)


# ---- Outlets CRUD ----
@router.get("/outlets", response_model=list[OutletAdminOut])
def list_outlets(db: Session = Depends(get_db)):
    rows = db.execute(select(ClientOutlet).order_by(ClientOutlet.outlet_name.asc())).scalars().all()
    return [_outlet_out(r) for r in rows]


@router.post("/outlets", response_model=OutletAdminOut, status_code=201)
def create_outlet(payload: OutletCreate, db: Session = Depends(get_db)):
    row = ClientOutlet(
        outlet_name=payload.outletName,
        company=payload.company,
        sector=payload.sector,
        city=payload.city,
        state=payload.state,
        is_active=payload.isActive,
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return _outlet_out(row)


@router.patch("/outlets/{outlet_id}", response_model=OutletAdminOut)
def update_outlet(outlet_id: str, payload: OutletUpdate, db: Session = Depends(get_db)):
    row = db.get(ClientOutlet, outlet_id)
    if not row:
        raise HTTPException(status_code=404, detail="Outlet not found")
    data = payload.model_dump(exclude_none=True)
    field_map = {
        "outletName": "outlet_name",
        "company": "company",
        "sector": "sector",
        "city": "city",
        "state": "state",
        "isActive": "is_active",
    }
    for key, value in data.items():
        setattr(row, field_map[key], value)
    db.commit()
    db.refresh(row)
    return _outlet_out(row)


@router.delete("/outlets/{outlet_id}", status_code=204)
def delete_outlet(outlet_id: str, db: Session = Depends(get_db)):
    row = db.get(ClientOutlet, outlet_id)
    if not row:
        raise HTTPException(status_code=404, detail="Outlet not found")
    db.delete(row)
    db.commit()
