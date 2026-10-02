from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

class NotificationBase(BaseModel):
    title: str
    message: str
    type: str = "info"
    data: Optional[Dict[str, Any]] = None

class NotificationCreate(NotificationBase):
    pass

class NotificationResponse(NotificationBase):
    id: int
    user_id: int
    is_read: bool
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class ProgressBase(BaseModel):
    skill_name: str
    proficiency_level: int = 0
    hours_spent: float = 0.0

class ProgressCreate(ProgressBase):
    pass

class ProgressUpdate(BaseModel):
    proficiency_level: Optional[int] = None
    hours_spent: Optional[float] = None

class ProgressResponse(ProgressBase):
    id: int
    student_id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class ProgressStats(BaseModel):
    total_skills: int
    average_proficiency: float
    total_hours: float
    top_skills: List[Dict[str, Any]]

class ChatBase(BaseModel):
    receiver_id: int
    message: str

class ChatCreate(ChatBase):
    pass

class ChatResponse(ChatBase):
    id: int
    sender_id: int
    is_read: bool
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class AIRecommendation(BaseModel):
    type: str
    title: str
    description: str
    confidence_score: float
    resources: Optional[List[str]] = None
