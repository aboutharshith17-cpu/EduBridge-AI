from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.core.database import get_db
from app.core.auth import get_current_user
from app.models.models import User, Student, Mentor, Resource, Scholarship, Internship
from app.schemas.admin import AdminStats, UserManagement, MentorUpdate
from app.schemas.opportunity import ScholarshipCreate, ScholarshipUpdate, ScholarshipResponse, InternshipCreate, InternshipUpdate, InternshipResponse
from app.services.admin_service import AdminService

router = APIRouter()

@router.get("/stats", response_model=AdminStats)
async def get_stats(current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = AdminService(db)
    return await service.get_stats()

@router.get("/users", response_model=List[UserManagement])
async def get_users(current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = AdminService(db)
    return await service.get_all_users()

@router.put("/users/{user_id}/status")
async def update_user_status(user_id: int, status_data: Dict[str, str], current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = AdminService(db)
    return await service.update_user_status(user_id, status_data.get("status"))

@router.get("/mentors/verifications", response_model=List[dict])
async def get_pending_verifications(current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = AdminService(db)
    return await service.get_pending_verifications()

@router.put("/mentors/{mentor_id}/verify")
async def verify_mentor(mentor_id: int, verification_data: Dict[str, str], current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = AdminService(db)
    return await service.verify_mentor(mentor_id, verification_data.get("status"))

@router.post("/scholarships", response_model=ScholarshipResponse, status_code=status.HTTP_201_CREATED)
async def create_scholarship(scholarship: ScholarshipCreate, current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = AdminService(db)
    return await service.create_scholarship(scholarship)

@router.put("/scholarships/{scholarship_id}", response_model=ScholarshipResponse)
async def update_scholarship(scholarship_id: int, scholarship: ScholarshipUpdate, current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = AdminService(db)
    return await service.update_scholarship(scholarship_id, scholarship)

@router.delete("/scholarships/{scholarship_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_scholarship(scholarship_id: int, current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = AdminService(db)
    await service.delete_scholarship(scholarship_id)
    return None

@router.post("/internships", response_model=InternshipResponse, status_code=status.HTTP_201_CREATED)
async def create_internship(internship: InternshipCreate, current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = AdminService(db)
    return await service.create_internship(internship)

@router.put("/internships/{internship_id}", response_model=InternshipResponse)
async def update_internship(internship_id: int, internship: InternshipUpdate, current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = AdminService(db)
    return await service.update_internship(internship_id, internship)

@router.delete("/internships/{internship_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_internship(internship_id: int, current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = AdminService(db)
    await service.delete_internship(internship_id)
    return None
