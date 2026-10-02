from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.models.models import Student, User

class AIService:
    def __init__(self, db: Session):
        self.db = db

    async def generate_career_recommendations(self, user_id: int) -> List[Dict[str, Any]]:
        student = self.db.query(Student).filter(Student.user_id == user_id).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student profile not found")
        
        skills = student.skills or []
        interests = student.interests or []
        
        recommendations = []
        if any(skill in ["python", "javascript", "java", "c++"] for skill in skills):
            recommendations.append({
                "type": "career",
                "title": "Software Engineer",
                "description": "Your programming skills align well with software engineering roles.",
                "confidence_score": 0.87,
            })
        if any(skill in ["data", "analytics", "statistics", "machine learning"] for skill in skills):
            recommendations.append({
                "type": "career",
                "title": "Data Scientist",
                "description": "Your analytical skills are a great match for data science.",
                "confidence_score": 0.82,
            })
        if not recommendations:
            recommendations.append({
                "type": "career",
                "title": "Explore Career Paths",
                "description": "Complete your profile to get personalized recommendations.",
                "confidence_score": 0.5,
            })
        
        return recommendations

    async def analyze_resume(self, user_id: int, file_path: str) -> Dict[str, Any]:
        return {
            "score": 85,
            "strengths": ["Clear structure", "Relevant experience", "Good formatting"],
            "improvements": ["Add more metrics", "Include keywords", "Update summary"],
        }

    async def generate_learning_path(self, user_id: int, skill: str) -> Dict[str, Any]:
        return {
            "skill": skill,
            "levels": [
                {"level": "Beginner", "resources": ["Introduction to " + skill], "hours": 20},
                {"level": "Intermediate", "resources": ["Advanced " + skill], "hours": 40},
                {"level": "Advanced", "resources": ["Mastering " + skill], "hours": 60},
            ],
        }

    async def chat_with_assistant(self, user_id: int, message: str) -> Dict[str, Any]:
        return {
            "response": "I'm here to help you with your career and education questions. Could you please provide more details?",
            "suggestions": ["What career path suits me?", "How can I improve my resume?"],
        }
