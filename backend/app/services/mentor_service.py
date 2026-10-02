from sqlalchemy.orm import Session
from typing import List, Dict, Any
from datetime import datetime
from app.models.models import Mentor, Meeting, Feedback, Resource, Student
from app.schemas.mentor import MentorDashboard, MentorResponse
from app.services.notification_service import NotificationService

class MentorService:
    def __init__(self, db: Session):
        self.db = db
        self.notification_service = NotificationService(db)

    async def get_dashboard(self, user_id: int) -> Dict[str, Any]:
        mentor = self.db.query(Mentor).filter(Mentor.user_id == user_id).first()
        if not mentor:
            raise HTTPException(status_code=404, detail="Mentor profile not found")
        
        students = self.db.query(Meeting).filter(Meeting.mentor_id == mentor.id).count()
        pending = self.db.query(Meeting).filter(
            Meeting.mentor_id == mentor.id,
            Meeting.status == "scheduled"
        ).count()
        upcoming = self.db.query(Meeting).filter(
            Meeting.mentor_id == mentor.id,
            Meeting.status.in_(["scheduled", "confirmed"]),
            Meeting.scheduled_at > datetime.utcnow()
        ).count()
        resources = self.db.query(Resource).filter(Resource.mentor_id == mentor.id).count()
        
        return {
            "total_students": students,
            "pending_requests": pending,
            "upcoming_meetings": upcoming,
            "resources_uploaded": resources,
            "avg_rating": None,
        }

    async def get_profile(self, user_id: int) -> Mentor:
        mentor = self.db.query(Mentor).filter(Mentor.user_id == user_id).first()
        if not mentor:
            raise HTTPException(status_code=404, detail="Mentor profile not found")
        return mentor

    async def update_profile(self, user_id: int, profile_data) -> Mentor:
        mentor = self.db.query(Mentor).filter(Mentor.user_id == user_id).first()
        if not mentor:
            raise HTTPException(status_code=404, detail="Mentor profile not found")
        
        for field, value in profile_data.model_dump(exclude_unset=True).items():
            setattr(mentor, field, value)
        
        self.db.commit()
        self.db.refresh(mentor)
        return mentor

    async def get_students(self) -> List[Dict[str, Any]]:
        return []

    async def get_meeting_requests(self, user_id: int) -> List[Dict[str, Any]]:
        mentor = self.db.query(Mentor).filter(Mentor.user_id == user_id).first()
        if not mentor:
            return []
        return self.db.query(Meeting).filter(Meeting.mentor_id == mentor.id, Meeting.status == "scheduled").all()

    async def upload_resource(self, user_id: int, resource) -> Resource:
        mentor = self.db.query(Mentor).filter(Mentor.user_id == user_id).first()
        if not mentor:
            raise HTTPException(status_code=404, detail="Mentor profile not found")
        
        resource_obj = Resource(
            title=resource.title,
            description=resource.description,
            category=resource.category,
            tags=resource.tags,
            is_public=resource.is_public,
            mentor_id=mentor.id,
        )
        self.db.add(resource_obj)
        self.db.commit()
        self.db.refresh(resource_obj)
        return resource_obj

    async def update_resource(self, user_id: int, resource_id: int, resource_data) -> Resource:
        resource = self.db.query(Resource).filter(Resource.id == resource_id).first()
        if not resource:
            raise HTTPException(status_code=404, detail="Resource not found")
        
        for field, value in resource_data.model_dump(exclude_unset=True).items():
            setattr(resource, field, value)
        
        self.db.commit()
        self.db.refresh(resource)
        return resource

    async def delete_resource(self, user_id: int, resource_id: int):
        resource = self.db.query(Resource).filter(Resource.id == resource_id).first()
        if not resource:
            raise HTTPException(status_code=404, detail="Resource not found")
        self.db.delete(resource)
        self.db.commit()

    async def get_meetings(self, user_id: int) -> List[Meeting]:
        mentor = self.db.query(Mentor).filter(Mentor.user_id == user_id).first()
        if not mentor:
            return []
        return self.db.query(Meeting).filter(Meeting.mentor_id == mentor.id).all()

    async def update_meeting(self, user_id: int, meeting_id: int, meeting_data) -> Meeting:
        meeting = self.db.query(Meeting).filter(Meeting.id == meeting_id).first()
        if not meeting:
            raise HTTPException(status_code=404, detail="Meeting not found")
        
        for field, value in meeting_data.model_dump(exclude_unset=True).items():
            setattr(meeting, field, value)
        
        self.db.commit()
        self.db.refresh(meeting)
        return meeting

    async def get_feedback(self, user_id: int) -> List[Feedback]:
        mentor = self.db.query(Mentor).filter(Mentor.user_id == user_id).first()
        if not mentor:
            return []
        return self.db.query(Feedback).filter(Feedback.mentor_id == mentor.id).all()
