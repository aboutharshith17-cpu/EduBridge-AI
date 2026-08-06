from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class MentorBase(BaseModel):
    company: Optional[str] = None
    designation: Optional[str] = None
    experience_years: Optional[int] = None
    expertise: Optional[List[str]] = []
    linkedin_url: Optional[str] = None

class MentorCreate(MentorBase):
    pass

class MentorUpdate(MentorBase):
    verification_status: Optional[str] = None

class MentorResponse(MentorBase):
    id: int
    user_id: int
    verification_status: str
    verified_at: Optional[datetime] = None
    created_at: Optional[datetime] = None
    user: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True

class MentorDashboard(BaseModel):
    total_students: int
    pending_requests: int
    upcoming_meetings: int
    resources_uploaded: int
    avg_rating: Optional[float] = None
