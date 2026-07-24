from fastapi import APIRouter, BackgroundTasks, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..email import send_enquiry_notification, send_enquiry_whatsapp
from ..models import Enquiry
from ..schemas import EnquiryCreate, EnquiryResponse

router = APIRouter()


@router.post("/enquiries", response_model=EnquiryResponse, status_code=201)
def create_enquiry(
    payload: EnquiryCreate,
    background: BackgroundTasks,
    db: Session = Depends(get_db),
):
    enquiry = Enquiry(
        name=payload.name,
        company=payload.company or None,
        phone=payload.phone,
        city=payload.city or None,
        services=payload.services,
        message=payload.message or None,
    )
    db.add(enquiry)
    db.commit()
    db.refresh(enquiry)

    # Notify the owner out-of-band (skipped if RESEND_API_KEY / NOTIFY_EMAIL unset).
    data = {
        "name": enquiry.name,
        "company": enquiry.company,
        "phone": enquiry.phone,
        "city": enquiry.city,
        "services": enquiry.services,
        "message": enquiry.message,
    }
    background.add_task(send_enquiry_notification, data)

    # Same alert over WhatsApp (skipped if the WhatsApp creds are unset).
    background.add_task(send_enquiry_whatsapp, data)

    return EnquiryResponse(ok=True, persisted=True, id=enquiry.id)
