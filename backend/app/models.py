import uuid
from datetime import datetime

from sqlalchemy import (
    Boolean,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
    UniqueConstraint,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


def _uuid() -> str:
    return str(uuid.uuid4())


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, server_default=func.now(), onupdate=func.now()
    )


class ServiceVertical(Base, TimestampMixin):
    __tablename__ = "service_verticals"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=_uuid)
    name: Mapped[str] = mapped_column(String)
    slug: Mapped[str] = mapped_column(String, unique=True)
    blurb: Mapped[str] = mapped_column(Text)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    applicants: Mapped[list["Applicant"]] = relationship(back_populates="vertical")
    batches: Mapped[list["TrainingBatch"]] = relationship(back_populates="vertical")


class Applicant(Base, TimestampMixin):
    __tablename__ = "applicants"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=_uuid)
    full_name: Mapped[str] = mapped_column(String)
    phone: Mapped[str] = mapped_column(String)
    email: Mapped[str | None] = mapped_column(String, nullable=True)
    city: Mapped[str] = mapped_column(String)
    vertical_id: Mapped[str | None] = mapped_column(
        ForeignKey("service_verticals.id"), nullable=True
    )
    sector_pref: Mapped[str] = mapped_column(String)
    experience: Mapped[str] = mapped_column(String)
    availability: Mapped[str] = mapped_column(String)
    status: Mapped[str] = mapped_column(String, default="New")  # New|Screened|Enrolled|Placed
    source: Mapped[str] = mapped_column(String, default="website")
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    vertical: Mapped["ServiceVertical | None"] = relationship(back_populates="applicants")
    enrollments: Mapped[list["BatchEnrollment"]] = relationship(back_populates="applicant")
    placements: Mapped[list["Placement"]] = relationship(back_populates="applicant")


class TrainingBatch(Base, TimestampMixin):
    __tablename__ = "training_batches"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=_uuid)
    vertical_id: Mapped[str] = mapped_column(ForeignKey("service_verticals.id"))
    name: Mapped[str] = mapped_column(String)
    start_date: Mapped[datetime] = mapped_column(DateTime)
    capacity: Mapped[int] = mapped_column(Integer, default=20)
    status: Mapped[str] = mapped_column(String, default="Planned")  # Planned|Running|Completed
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    vertical: Mapped["ServiceVertical"] = relationship(back_populates="batches")
    enrollments: Mapped[list["BatchEnrollment"]] = relationship(back_populates="batch")


class BatchEnrollment(Base):
    __tablename__ = "batch_enrollments"
    __table_args__ = (UniqueConstraint("applicant_id", "batch_id"),)

    id: Mapped[str] = mapped_column(String, primary_key=True, default=_uuid)
    applicant_id: Mapped[str] = mapped_column(ForeignKey("applicants.id"))
    batch_id: Mapped[str] = mapped_column(ForeignKey("training_batches.id"))
    enrolled_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    applicant: Mapped["Applicant"] = relationship(back_populates="enrollments")
    batch: Mapped["TrainingBatch"] = relationship(back_populates="enrollments")


class ClientOutlet(Base, TimestampMixin):
    __tablename__ = "client_outlets"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=_uuid)
    outlet_name: Mapped[str] = mapped_column(String)
    company: Mapped[str] = mapped_column(String)
    sector: Mapped[str] = mapped_column(String)
    city: Mapped[str] = mapped_column(String)
    state: Mapped[str] = mapped_column(String)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    placements: Mapped[list["Placement"]] = relationship(back_populates="outlet")


class Placement(Base, TimestampMixin):
    __tablename__ = "placements"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=_uuid)
    applicant_id: Mapped[str] = mapped_column(ForeignKey("applicants.id"))
    outlet_id: Mapped[str] = mapped_column(ForeignKey("client_outlets.id"))
    role: Mapped[str] = mapped_column(String)
    start_date: Mapped[datetime] = mapped_column(DateTime)
    status: Mapped[str] = mapped_column(String, default="Active")  # Active|Ended

    applicant: Mapped["Applicant"] = relationship(back_populates="placements")
    outlet: Mapped["ClientOutlet"] = relationship(back_populates="placements")


class CaseStudy(Base, TimestampMixin):
    __tablename__ = "case_studies"

    id: Mapped[str] = mapped_column(String, primary_key=True, default=_uuid)
    title: Mapped[str] = mapped_column(String)
    sector: Mapped[str] = mapped_column(String)
    location: Mapped[str] = mapped_column(String)
    metric: Mapped[str] = mapped_column(String)
    body: Mapped[str] = mapped_column(Text)
    image: Mapped[str] = mapped_column(String)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
