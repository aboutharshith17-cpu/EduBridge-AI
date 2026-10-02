from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.auth import get_current_user, require_role
from app.models.models import User, Student, Application, Meeting, Progress, Resource, Scholarship, Internship
from app.schemas.student import StudentCreate, StudentUpdate, StudentResponse, StudentDashboard
from app.schemas.opportunity import ScholarshipResponse, InternshipResponse, ApplicationCreate, ApplicationResponse
from app.schemas.meeting import MeetingCreate, MeetingUpdate, MeetingResponse, FeedbackCreate, FeedbackResponse
from app.schemas.notification import ProgressCreate, ProgressResponse, ProgressStats, ChatCreate, ChatResponse, AIRecommendation
from app.services.student_service import StudentService
from datetime import datetime

router = APIRouter()

@router.get("/dashboard", response_model=StudentDashboard)
async def get_dashboard(current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = StudentService(db)
    return await service.get_dashboard(int(current_user_id))

@router.get("/profile", response_model=StudentResponse)
async def get_profile(current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = StudentService(db)
    return await service.get_profile(int(current_user_id))

@router.put("/profile", response_model=StudentResponse)
async def update_profile(profile_data: StudentUpdate, current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = StudentService(db)
    return await service.update_profile(int(current_user_id), profile_data)

@router.get("/resources", response_model=List[dict])
async def get_resources(current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = StudentService(db)
    return await service.get_resources()

@router.get("/scholarships", response_model=List[ScholarshipResponse])
async def get_scholarships(current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = StudentService(db)
    return await service.get_scholarships()

@router.get("/internships", response_model=List[InternshipResponse])
async def get_internships(current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = StudentService(db)
    return await service.get_internships()

@router.post("/applications", response_model=ApplicationResponse, status_code=status.HTTP_201_CREATED)
async def apply_for_opportunity(application: ApplicationCreate, current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = StudentService(db)
    return await service.apply(int(current_user_id), application)

@router.get("/applications", response_model=List[ApplicationResponse])
async def get_my_applications(current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = StudentService(db)
    return await service.get_applications(int(current_user_id))

@router.post("/meetings", response_model=MeetingResponse, status_code=status.HTTP_201_CREATED)
async def schedule_meeting(meeting: MeetingCreate, current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = StudentService(db)
    return await service.schedule_meeting(int(current_user_id), meeting)

@router.get("/meetings", response_model=List[MeetingResponse])
async def get_my_meetings(current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = StudentService(db)
    return await service.get_meetings(int(current_user_id))

@router.put("/meetings/{meeting_id}", response_model=MeetingResponse)
async def update_meeting(meeting_id: int, meeting_data: MeetingUpdate, current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = StudentService(db)
    return await service.update_meeting(int(current_user_id), meeting_id, meeting_data)

@router.post("/feedback", response_model=FeedbackResponse, status_code=status.HTTP_201_CREATED)
async def give_feedback(feedback: FeedbackCreate, current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = StudentService(db)
    return await service.give_feedback(int(current_user_id), feedback)

@router.get("/progress", response_model=List[ProgressResponse])
async def get_progress(current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = StudentService(db)
    return await service.get_progress(int(current_user_id))

@router.post("/progress", response_model=ProgressResponse, status_code=status.HTTP_201_CREATED)
async def add_progress(progress: ProgressCreate, current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = StudentService(db)
    return await service.add_progress(int(current_user_id), progress)

@router.get("/progress/stats", response_model=ProgressStats)
async def get_progress_stats(current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = StudentService(db)
    return await service.get_progress_stats(int(current_user_id))

@router.get("/recommendations", response_model=List[AIRecommendation])
async def get_career_recommendations(current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = StudentService(db)
    return await service.get_career_recommendations(int(current_user_id))

@router.get("/chats/{receiver_id}", response_model=List[ChatResponse])
async def get_chats(receiver_id: int, current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = StudentService(db)
    return await service.get_chats(int(current_user_id), receiver_id)

@router.post("/chats", response_model=ChatResponse, status_code=status.HTTP_201_CREATED)
async def send_chat(chat: ChatCreate, current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = StudentService(db)
    return await service.send_chat(int(current_user_id), chat)
