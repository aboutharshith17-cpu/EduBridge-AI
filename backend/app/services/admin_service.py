from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.models.models import User, Student, Mentor, Resource, Scholarship, Internship
from app.schemas.admin import AdminStats, UserManagement
from app.schemas.opportunity import ScholarshipCreate, ScholarshipUpdate, InternshipCreate, InternshipUpdate
from app.services.notification_service import NotificationService

class AdminService:
    def __init__(self, db: Session):
        self.db = db
        self.notification_service = NotificationService(db)

    async def get_stats(self) -> Dict[str, int]:
        total_users = self.db.query(User).count()
        total_students = self.db.query(Student).count()
        total_mentors = self.db.query(Mentor).count()
        total_resources = self.db.query(Resource).count()
        total_scholarships = self.db.query(Scholarship).count()
        total_internships = self.db.query(Internship).count()
        from app.models.models import Application
        total_applications = self.db.query(Application).count()
        active_mentors = self.db.query(Mentor).filter(Mentor.verification_status == "verified").count()
        pending_verifications = self.db.query(Mentor).filter(Mentor.verification_status == "pending").count()
        
        return {
            "total_users": total_users,
            "total_students": total_students,
            "total_mentors": total_mentors,
            "total_resources": total_resources,
            "total_scholarships": total_scholarships,
            "total_internships": total_internships,
            "total_applications": total_applications,
            "active_mentors": active_mentors,
            "pending_verifications": pending_verifications,
        }

    async def get_all_users(self) -> List[UserManagement]:
        users = self.db.query(User).all()
        return [
            UserManagement(
                id=u.id,
                email=u.email,
                first_name=u.first_name,
                last_name=u.last_name,
                role=u.role.value,
                status=u.status.value,
                is_verified=u.is_verified,
                created_at=u.created_at,
            )
            for u in users
        ]

    async def update_user_status(self, user_id: int, status: str) -> Dict[str, str]:
        user = self.db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        user.status = status
        self.db.commit()
        return {"message": "User status updated"}

    async def get_pending_verifications(self) -> List[Dict[str, Any]]:
        mentors = self.db.query(Mentor).filter(Mentor.verification_status == "pending").all()
        result = []
        for m in mentors:
            user = self.db.query(User).filter(User.id == m.user_id).first()
            result.append({
                "mentor_id": m.id,
                "user_id": m.user_id,
                "name": f"{user.first_name} {user.last_name}",
                "email": user.email,
                "company": m.company,
                "designation": m.designation,
                "experience_years": m.experience_years,
            })
        return result

    async def verify_mentor(self, mentor_id: int, status: str) -> Dict[str, str]:
        mentor = self.db.query(Mentor).filter(Mentor.id == mentor_id).first()
        if not mentor:
            raise HTTPException(status_code=404, detail="Mentor not found")
        mentor.verification_status = status
        if status == "verified":
            mentor.verified_at = datetime.utcnow()
        self.db.commit()
        return {"message": f"Mentor {status}"}

    async def create_scholarship(self, scholarship) -> Scholarship:
        scholarship_obj = Scholarship(**scholarship.model_dump())
        self.db.add(scholarship_obj)
        self.db.commit()
        self.db.refresh(scholarship_obj)
        return scholarship_obj

    async def update_scholarship(self, scholarship_id: int, scholarship) -> Scholarship:
        scholarship_obj = self.db.query(Scholarship).filter(Scholarship.id == scholarship_id).first()
        if not scholarship_obj:
            raise HTTPException(status_code=404, detail="Scholarship not found")
        
        for field, value in scholarship.model_dump(exclude_unset=True).items():
            setattr(scholarship_obj, field, value)
        
        self.db.commit()
        self.db.refresh(scholarship_obj)
        return scholarship_obj

    async def delete_scholarship(self, scholarship_id: int):
        scholarship_obj = self.db.query(Scholarship).filter(Scholarship.id == scholarship_id).first()
        if scholarship_obj:
            self.db.delete(scholarship_obj)
            self.db.commit()

    async def create_internship(self, internship) -> Internship:
        internship_obj = Internship(**internship.model_dump())
        self.db.add(internship_obj)
        self.db.commit()
        self.db.refresh(internship_obj)
        return internship_obj

    async def update_internship(self, internship_id: int, internship) -> Internship:
        internship_obj = self.db.query(Internship).filter(Internship.id == internship_id).first()
        if not internship_obj:
            raise HTTPException(status_code=404, detail="Internship not found")
        
        for field, value in internship.model_dump(exclude_unset=True).items():
            setattr(internship_obj, field, value)
        
        self.db.commit()
        self.db.refresh(internship_obj)
        return internship_obj

    async def delete_internship(self, internship_id: int):
        internship_obj = self.db.query(Internship).filter(Internship.id == internship_id).first()
        if internship_obj:
            self.db.delete(internship_obj)
            self.db.commit()
