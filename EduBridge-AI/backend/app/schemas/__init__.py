from app.schemas.auth import *
from app.schemas.user import *
from app.schemas.student import *
from app.schemas.mentor import *
from app.schemas.admin import *
from app.schemas.resource import *
from app.schemas.opportunity import *
from app.schemas.meeting import *
from app.schemas.notification import *

__all__ = [
    "UserBase", "UserCreate", "UserLogin", "Token", "TokenRefresh",
    "UserResponse", "RefreshTokenResponse",
    "StudentBase", "StudentCreate", "StudentUpdate", "StudentResponse", "StudentDashboard",
    "MentorBase", "MentorCreate", "MentorUpdate", "MentorResponse", "MentorDashboard",
    "AdminBase", "AdminResponse", "AdminStats", "UserManagement",
    "ResourceBase", "ResourceCreate", "ResourceUpdate", "ResourceResponse",
    "ScholarshipBase", "ScholarshipCreate", "ScholarshipUpdate", "ScholarshipResponse",
    "InternshipBase", "InternshipCreate", "InternshipUpdate", "InternshipResponse",
    "MeetingBase", "MeetingCreate", "MeetingUpdate", "MeetingResponse",
    "FeedbackBase", "FeedbackCreate", "FeedbackResponse",
    "ApplicationBase", "ApplicationCreate", "ApplicationUpdate", "ApplicationResponse",
    "NotificationBase", "NotificationCreate", "NotificationResponse",
    "ProgressBase", "ProgressCreate", "ProgressUpdate", "ProgressResponse", "ProgressStats",
    "ChatBase", "ChatCreate", "ChatResponse", "AIRecommendation",
]
