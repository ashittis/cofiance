from datetime import datetime

from pydantic import BaseModel, Field


# ---- Outlets ----
class OutletOut(BaseModel):
    outlet: str
    company: str
    sector: str
    city: str
    state: str
    active: bool


class OutletsResponse(BaseModel):
    ok: bool = True
    count: int
    outlets: list[OutletOut]


# ---- Case studies ----
class CaseStudyOut(BaseModel):
    title: str
    sector: str
    location: str
    metric: str
    body: str
    image: str


class CaseStudiesResponse(BaseModel):
    ok: bool = True
    count: int
    caseStudies: list[CaseStudyOut]


# ---- Apply ----
class ApplicantCreate(BaseModel):
    fullName: str = Field(min_length=1)
    phone: str = Field(min_length=5)
    email: str | None = None
    city: str = Field(min_length=1)
    sector: str = ""
    experience: str = ""
    availability: str = ""


class ApplyResponse(BaseModel):
    ok: bool = True
    persisted: bool = True
    id: str


# ---- Applicants (admin foundation) ----
class ApplicantOut(BaseModel):
    id: str
    fullName: str
    phone: str
    email: str | None
    city: str
    sectorPref: str
    experience: str
    availability: str
    status: str
    createdAt: datetime


# ---- Admin ----
class ApplicantStatusUpdate(BaseModel):
    status: str  # New | Screened | Enrolled | Placed


class OutletAdminOut(BaseModel):
    id: str
    outletName: str
    company: str
    sector: str
    city: str
    state: str
    isActive: bool


class OutletCreate(BaseModel):
    outletName: str = Field(min_length=1)
    company: str = ""
    sector: str = "Hospitality"
    city: str = ""
    state: str = ""
    isActive: bool = True


class OutletUpdate(BaseModel):
    outletName: str | None = None
    company: str | None = None
    sector: str | None = None
    city: str | None = None
    state: str | None = None
    isActive: bool | None = None


class AdminStats(BaseModel):
    applicantsTotal: int
    applicantsByStatus: dict[str, int]
    outletsActive: int
    outletsTotal: int
