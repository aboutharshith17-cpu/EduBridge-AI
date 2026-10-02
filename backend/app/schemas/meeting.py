from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class MeetingBase(BaseModel):
    title: str
    description: Optional[str] = None
    scheduled_at: datetime
    duration_minutes: int = 60
    meeting_link: Optional[str] = None
    notes: Optional[str] = None

class MeetingCreate(MeetingBase):
    mentor_id: int

class MeetingUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    scheduled_at: Optional[datetime] = None
    duration_minutes: Optional[int] = None
    meeting_link: Optional[str] = None
    status: Optional[str] = None
    notes: Optional[str] = None

class MeetingResponse(MeetingBase):
    id: int
    student_id: int
    mentor_id: int
    status: str
    created_at: Optional[datetime] = None
    student: Optional[Dict[str, Any]] = None
    mentor: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True

class FeedbackBase(BaseModel):
    mentor_id: int
    rating: Optional[int] = None
    comment: Optional[str] = None

class FeedbackCreate(FeedbackBase):
    pass

class FeedbackResponse(FeedbackBase):
    id: int
    student_id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class ApplicationBase(BaseModel):
    scholarship_id: Optional[int] = None
    internship_id: Optional[int] = None
    cover_letter: Optional[str] = None
    documents: Optional[List[str]] = []

class ApplicationCreate(ApplicationBase):
    pass

class ApplicationUpdate(BaseModel):
    status: Optional[str] = None

class ApplicationResponse(ApplicationBase):
    id: int
    student_id: int
    status: str
    applied_at: Optional[datetime] = None

    class Config:
        from_attributes = True
