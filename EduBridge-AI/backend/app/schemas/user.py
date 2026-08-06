from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    email: str
    first_name: str
    last_name: str
    phone: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str
    phone: Optional[str] = None
    role: str
    status: str

    class Config:
        from_attributes = True
