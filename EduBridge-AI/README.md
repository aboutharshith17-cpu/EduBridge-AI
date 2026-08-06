# EduBridge AI

A production-ready full-stack educational platform connecting students with mentors, providing AI-powered career recommendations, scholarship finder, and internship tracker.

## Technology Stack

### Backend
- **Framework**: FastAPI
- **ORM**: SQLAlchemy 2.0
- **Migrations**: Alembic
- **Authentication**: JWT with refresh tokens
- **Databases**: PostgreSQL (relational), MongoDB (chats, notifications, logs)
- **AI**: LangChain, OpenAI/Gemini, ChromaDB (RAG)
- **Task Queue**: Celery + Redis

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form + Zod
- **Routing**: React Router v6
- **HTTP Client**: Axios

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Web Server**: Nginx
- **Deployment**: Render, AWS

## Project Structure

```
EduBridge-AI/
├── backend/
│   ├── app/
│   │   ├── core/          # Config, security, database, auth
│   │   ├── models/        # SQLAlchemy models
│   │   ├── schemas/       # Pydantic schemas
│   │   ├── routers/       # API routes
│   │   ├── services/      # Business logic
│   │   ├── ai/            # AI services
│   │   ├── utils/         # Utilities
│   │   └── main.py        # FastAPI entry point
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── layouts/       # Layout wrappers
│   │   ├── stores/        # Context providers
│   │   ├── services/      # API services
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # Utilities
│   │   └── main.tsx       # React entry point
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── database/
│   ├── migrations/        # Alembic migrations
│   └── seeds/             # Seed data
├── docker/
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   ├── nginx/
│   │   └── nginx.conf
│   └── docker-compose.yml
└── docs/
    ├── api/               # API documentation
    └── deployment/        # Deployment guides
```

## Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js 20+
- Python 3.11+
- PostgreSQL 16+
- MongoDB 7+
- Redis 7+

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd EduBridge-AI
```

2. **Configure environment variables**
```bash
cp backend/.env.example backend/.env
# Update backend/.env with your configuration
```

3. **Start with Docker Compose**
```bash
docker-compose up -d
```

4. **Run database migrations**
```bash
docker-compose exec backend alembic upgrade head
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/api/docs

## Development

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user

### Student
- `GET /api/student/dashboard` - Student dashboard
- `GET /api/student/profile` - Get profile
- `PUT /api/student/profile` - Update profile
- `GET /api/student/resources` - Browse resources
- `GET /api/student/scholarships` - Find scholarships
- `GET /api/student/internships` - Find internships
- `POST /api/student/applications` - Apply for opportunity
- `POST /api/student/meetings` - Schedule meeting
- `GET /api/student/progress` - Track progress
- `GET /api/student/recommendations` - AI recommendations

### Mentor
- `GET /api/mentor/dashboard` - Mentor dashboard
- `GET /api/mentor/students` - View students
- `POST /api/mentor/resources` - Upload resource
- `GET /api/mentor/meetings` - View meetings
- `GET /api/mentor/feedback` - View feedback

### Admin
- `GET /api/admin/stats` - Platform statistics
- `GET /api/admin/users` - Manage users
- `GET /api/admin/mentors/verifications` - Pending verifications
- `POST /api/admin/scholarships` - Create scholarship
- `POST /api/admin/internships` - Create internship

## Deployment

### Render
See `docs/deployment/render.md` for detailed instructions.

### AWS
See `docs/deployment/aws.md` for detailed instructions.

## License
MIT
