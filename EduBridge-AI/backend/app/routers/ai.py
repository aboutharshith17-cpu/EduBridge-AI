from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from app.core.database import get_db
from app.core.auth import get_current_user
from app.schemas.notification import AIRecommendation
from app.services.ai_service import AIService

router = APIRouter()

@router.get("/career-recommendations", response_model=List[AIRecommendation])
async def get_career_recommendations(current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = AIService(db)
    return await service.generate_career_recommendations(int(current_user_id))

@router.post("/analyze-resume")
async def analyze_resume(file_path: str, current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = AIService(db)
    return await service.analyze_resume(int(current_user_id), file_path)

@router.get("/learning-path")
async def get_learning_path(skill: str, current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = AIService(db)
    return await service.generate_learning_path(int(current_user_id), skill)

@router.post("/chat-assistant")
async def chat_assistant(message: Dict[str, str], current_user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    service = AIService(db)
    return await service.chat_with_assistant(int(current_user_id), message.get("message", ""))
