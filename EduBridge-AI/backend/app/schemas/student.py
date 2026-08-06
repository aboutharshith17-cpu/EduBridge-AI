from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class StudentBase(BaseModel):
    university: Optional[str] = None
    degree: Optional[str] = None
    graduation_year: Optional[int] = None
    cgpa: Optional[float] = None
    skills: Optional[List[str]] = []
    interests: Optional[List[str]] = []
    resume_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None

class StudentCreate(StudentBase):
    pass

class StudentUpdate(StudentBase):
    pass

class StudentResponse(StudentBase):
    id: int
    user_id: int
    created_at: Optional[datetime] = None
    user: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True

class StudentDashboard(BaseModel):
    total_applications: int
    pending_applications: int
    upcoming_meetings: int
    resources_accessed: int
    recent_activities: List[Dict[str, Any]]
