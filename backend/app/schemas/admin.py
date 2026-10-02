from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class AdminBase(BaseModel):
    pass

class AdminResponse(AdminBase):
    id: int
    user_id: int
    created_at: Optional[datetime] = None
    user: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True

class AdminStats(BaseModel):
    total_users: int
    total_students: int
    total_mentors: int
    total_resources: int
    total_scholarships: int
    total_internships: int
    total_applications: int
    active_mentors: int
    pending_verifications: int

class UserManagement(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str
    role: str
    status: str
    is_verified: bool
    created_at: Optional[datetime] = None
