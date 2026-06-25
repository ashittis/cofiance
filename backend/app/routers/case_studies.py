from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import CaseStudy
from ..schemas import CaseStudiesResponse, CaseStudyOut

router = APIRouter()


@router.get("/case-studies", response_model=CaseStudiesResponse)
def list_case_studies(db: Session = Depends(get_db)):
    rows = (
        db.execute(
            select(CaseStudy)
            .where(CaseStudy.is_active.is_(True))
            .order_by(CaseStudy.sort_order.asc())
        )
        .scalars()
        .all()
    )
    items = [
        CaseStudyOut(
            title=r.title,
            sector=r.sector,
            location=r.location,
            metric=r.metric,
            body=r.body,
            image=r.image,
        )
        for r in rows
    ]
    return CaseStudiesResponse(count=len(items), caseStudies=items)
