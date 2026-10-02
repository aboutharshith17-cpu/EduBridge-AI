from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Dict, Any
from datetime import datetime
from app.models.models import Student, Application, Meeting, Progress, Resource, Scholarship, Internship, Chat, Notification, NotificationType
from app.schemas.student import StudentDashboard
from app.services.notification_service import NotificationService

class StudentService:
    def __init__(self, db: Session):
        self.db = db
        self.notification_service = NotificationService(db)

    async def get_dashboard(self, user_id: int) -> Dict[str, Any]:
        student = self.db.query(Student).filter(Student.user_id == user_id).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student profile not found")
        
        total_apps = self.db.query(Application).filter(Application.student_id == student.id).count()
        pending_apps = self.db.query(Application).filter(
            Application.student_id == student.id,
            Application.status == "pending"
        ).count()
        upcoming_meetings = self.db.query(Meeting).filter(
            Meeting.student_id == student.id,
            Meeting.status.in_(["scheduled", "confirmed"]),
            Meeting.scheduled_at > datetime.utcnow()
        ).count()
        
        return {
            "total_applications": total_apps,
            "pending_applications": pending_apps,
            "upcoming_meetings": upcoming_meetings,
            "resources_accessed": 0,
            "recent_activities": []
        }

    async def get_profile(self, user_id: int):
        student = self.db.query(Student).filter(Student.user_id == user_id).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student profile not found")
        return student

    async def update_profile(self, user_id: int, profile_data):
        student = self.db.query(Student).filter(Student.user_id == user_id).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student profile not found")
        
        for field, value in profile_data.model_dump(exclude_unset=True).items():
            setattr(student, field, value)
        
        self.db.commit()
        self.db.refresh(student)
        return student

    async def get_resources(self) -> List[Dict[str, Any]]:
        resources = self.db.query(Resource).filter(Resource.is_public == True).all()
        return [{"id": r.id, "title": r.title, "category": r.category, "file_url": r.file_url} for r in resources]

    async def get_scholarships(self) -> List[Scholarship]:
        return self.db.query(Scholarship).filter(Scholarship.is_active == True).all()

    async def get_internships(self) -> List[Internship]:
        return self.db.query(Internship).filter(Internship.is_active == True).all()

    async def apply(self, user_id: int, application) -> Application:
        student = self.db.query(Student).filter(Student.user_id == user_id).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student profile not found")
        
        app_obj = Application(
            student_id=student.id,
            scholarship_id=application.scholarship_id,
            internship_id=application.internship_id,
            cover_letter=application.cover_letter,
            documents=application.documents,
        )
        self.db.add(app_obj)
        self.db.commit()
        self.db.refresh(app_obj)
        
        self.notification_service.create_notification(
            user_id=user_id,
            title="Application Submitted",
            message="Your application has been submitted successfully.",
            notification_type=NotificationType.SUCCESS,
        )
        return app_obj

    async def get_applications(self, user_id: int) -> List[Application]:
        student = self.db.query(Student).filter(Student.user_id == user_id).first()
        if not student:
            return []
        return self.db.query(Application).filter(Application.student_id == student.id).all()

    async def schedule_meeting(self, user_id: int, meeting) -> Meeting:
        student = self.db.query(Student).filter(Student.user_id == user_id).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student profile not found")
        
        meeting_obj = Meeting(
            student_id=student.id,
            mentor_id=meeting.mentor_id,
            title=meeting.title,
            description=meeting.description,
            scheduled_at=meeting.scheduled_at,
            duration_minutes=meeting.duration_minutes,
            meeting_link=meeting.meeting_link,
        )
        self.db.add(meeting_obj)
        self.db.commit()
        self.db.refresh(meeting_obj)
        return meeting_obj

    async def get_meetings(self, user_id: int) -> List[Meeting]:
        student = self.db.query(Student).filter(Student.user_id == user_id).first()
        if not student:
            return []
        return self.db.query(Meeting).filter(Meeting.student_id == student.id).all()

    async def update_meeting(self, user_id: int, meeting_id: int, meeting_data) -> Meeting:
        meeting = self.db.query(Meeting).filter(Meeting.id == meeting_id).first()
        if not meeting:
            raise HTTPException(status_code=404, detail="Meeting not found")
        
        for field, value in meeting_data.model_dump(exclude_unset=True).items():
            setattr(meeting, field, value)
        
        self.db.commit()
        self.db.refresh(meeting)
        return meeting

    async def give_feedback(self, user_id: int, feedback) -> Dict[str, str]:
        from app.models.models import Feedback
        student = self.db.query(Student).filter(Student.user_id == user_id).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student profile not found")
        
        feedback_obj = Feedback(
            student_id=student.id,
            mentor_id=feedback.mentor_id,
            rating=feedback.rating,
            comment=feedback.comment,
        )
        self.db.add(feedback_obj)
        self.db.commit()
        return {"message": "Feedback submitted successfully"}

    async def get_progress(self, user_id: int) -> List[Progress]:
        student = self.db.query(Student).filter(Student.user_id == user_id).first()
        if not student:
            return []
        return self.db.query(Progress).filter(Progress.student_id == student.id).all()

    async def add_progress(self, user_id: int, progress) -> Progress:
        student = self.db.query(Student).filter(Student.user_id == user_id).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student profile not found")
        
        progress_obj = Progress(
            student_id=student.id,
            skill_name=progress.skill_name,
            proficiency_level=progress.proficiency_level,
            hours_spent=progress.hours_spent,
        )
        self.db.add(progress_obj)
        self.db.commit()
        self.db.refresh(progress_obj)
        return progress_obj

    async def get_progress_stats(self, user_id: int) -> Dict[str, Any]:
        student = self.db.query(Student).filter(Student.user_id == user_id).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student profile not found")
        
        progress_list = self.db.query(Progress).filter(Progress.student_id == student.id).all()
        total = len(progress_list)
        avg_prof = sum(p.proficiency_level for p in progress_list) / max(total, 1)
        total_hours = sum(p.hours_spent for p in progress_list)
        
        return {
            "total_skills": total,
            "average_proficiency": round(avg_prof, 2),
            "total_hours": round(total_hours, 2),
            "top_skills": [{"skill": p.skill_name, "level": p.proficiency_level} for p in progress_list[:5]]
        }

    async def get_career_recommendations(self, user_id: int) -> List[Dict[str, Any]]:
        student = self.db.query(Student).filter(Student.user_id == user_id).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student profile not found")
        
        return [
            {
                "type": "career",
                "title": "Software Engineer",
                "description": "Based on your skills in programming and problem-solving.",
                "confidence_score": 0.85,
            }
        ]

    async def get_chats(self, user_id: int, receiver_id: int) -> List[Dict[str, Any]]:
        return self.db.query(Chat).filter(
            ((Chat.sender_id == user_id) & (Chat.receiver_id == receiver_id)) |
            ((Chat.sender_id == receiver_id) & (Chat.receiver_id == user_id))
        ).order_by(Chat.created_at).all()

    async def send_chat(self, user_id: int, chat) -> Chat:
        chat_obj = Chat(
            sender_id=user_id,
            receiver_id=chat.receiver_id,
            message=chat.message,
        )
        self.db.add(chat_obj)
        self.db.commit()
        self.db.refresh(chat_obj)
        return chat_obj
