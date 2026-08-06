from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class ScholarshipBase(BaseModel):
    title: str
    provider: str
    amount: Optional[float] = None
    description: Optional[str] = None
    eligibility_criteria: Optional[Dict[str, Any]] = None
    deadline: Optional[datetime] = None
    application_url: Optional[str] = None
    is_active: bool = True

class ScholarshipCreate(ScholarshipBase):
    pass

class ScholarshipUpdate(BaseModel):
    title: Optional[str] = None
    provider: Optional[str] = None
    amount: Optional[float] = None
    description: Optional[str] = None
    eligibility_criteria: Optional[Dict[str, Any]] = None
    deadline: Optional[datetime] = None
    application_url: Optional[str] = None
    is_active: Optional[bool] = None

class ScholarshipResponse(ScholarshipBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class InternshipBase(BaseModel):
    title: str
    company: str
    location: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[Dict[str, Any]] = None
    stipend: Optional[str] = None
    duration_months: Optional[int] = None
    application_url: Optional[str] = None
    deadline: Optional[datetime] = None
    is_active: bool = True

class InternshipCreate(InternshipBase):
    pass

class InternshipUpdate(BaseModel):
    title: Optional[str] = None
    company: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[Dict[str, Any]] = None
    stipend: Optional[str] = None
    duration_months: Optional[int] = None
    application_url: Optional[str] = None
    deadline: Optional[datetime] = None
    is_active: Optional[bool] = None

class InternshipResponse(InternshipBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
