from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.auth import get_current_user, require_role
from app.models.models import User, Resource, Meeting, Feedback
from app.schemas.mentor import MentorUpdate, MentorResponse, MentorDashboard
from app.schemas.resource import ResourceCreate, ResourceUpdate, ResourceResponse
from app.schemas.meeting import MeetingCreate, MeetingUpdate, MeetingResponse, FeedbackResponse
from app.services.mentor_service import MentorService

router = APIRouter()

@router.get("/dashboard", response_model=MentorDashboard)
async def get_dashboard(current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = MentorService(db)
    return await service.get_dashboard(int(current_user_id))

@router.get("/profile", response_model=MentorResponse)
async def get_profile(current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = MentorService(db)
    return await service.get_profile(int(current_user_id))

@router.put("/profile", response_model=MentorResponse)
async def update_profile(profile_data: MentorUpdate, current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = MentorService(db)
    return await service.update_profile(int(current_user_id), profile_data)

@router.get("/students", response_model=List[dict])
async def get_students(current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = MentorService(db)
    return await service.get_students()

@router.get("/requests", response_model=List[dict])
async def get_meeting_requests(current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = MentorService(db)
    return await service.get_meeting_requests(int(current_user_id))

@router.post("/resources", response_model=ResourceResponse, status_code=status.HTTP_201_CREATED)
async def upload_resource(resource: ResourceCreate, current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = MentorService(db)
    return await service.upload_resource(int(current_user_id), resource)

@router.put("/resources/{resource_id}", response_model=ResourceResponse)
async def update_resource(resource_id: int, resource_data: ResourceUpdate, current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = MentorService(db)
    return await service.update_resource(int(current_user_id), resource_id, resource_data)

@router.delete("/resources/{resource_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_resource(resource_id: int, current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = MentorService(db)
    await service.delete_resource(int(current_user_id), resource_id)
    return None

@router.get("/meetings", response_model=List[MeetingResponse])
async def get_my_meetings(current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = MentorService(db)
    return await service.get_meetings(int(current_user_id))

@router.put("/meetings/{meeting_id}", response_model=MeetingResponse)
async def update_meeting(meeting_id: int, meeting_data: MeetingUpdate, current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = MentorService(db)
    return await service.update_meeting(int(current_user_id), meeting_id, meeting_data)

@router.get("/feedback", response_model=List[FeedbackResponse])
async def get_feedback(current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = MentorService(db)
    return await service.get_feedback(int(current_user_id))
