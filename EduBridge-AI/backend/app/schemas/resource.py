from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class ResourceBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: str
    tags: Optional[List[str]] = []
    is_public: bool = True

class ResourceCreate(ResourceBase):
    pass

class ResourceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    is_public: Optional[bool] = None

class ResourceResponse(ResourceBase):
    id: int
    mentor_id: int
    file_url: Optional[str] = None
    file_type: Optional[str] = None
    download_count: int
    created_at: Optional[datetime] = None
    mentor: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True
