# 🎓 EduBridge AI

> **A production-ready full-stack educational platform connecting students with mentors, providing AI-powered career recommendations, scholarship discovery, and internship tracking.**



# 🚀 Features

- 👨‍🎓 Student & Mentor Authentication (JWT + Refresh Tokens)
- 🤖 AI-Powered Career Recommendations
- 📚 Personalized Learning Resources
- 🎓 Scholarship Finder
- 💼 Internship Tracker & Applications
- 📅 Mentor Meeting Scheduler
- 📈 Student Progress Dashboard
- 🔔 Real-Time Notifications
- 🧠 RAG-based AI Chat Assistant
- 🛡️ Admin Dashboard for Platform Management 

---

# 🛠️ Technology Stack

## Backend

| Technology | Purpose |
|------------|---------|
| FastAPI | Backend Framework |
| SQLAlchemy 2.0 | ORM |
| Alembic | Database Migrations |
| PostgreSQL | Relational Database |
| MongoDB | Chats, Notifications & Logs |
| JWT | Authentication |
| LangChain | AI Orchestration |
| OpenAI / Gemini | AI Models |
| ChromaDB | Vector Database (RAG) |
| Celery | Background Tasks |
| Redis | Queue & Cache |


## Frontend

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| React Query | Server State Management |
| React Hook Form | Forms |
| Zod | Validation |
| React Router v6 | Routing |
| Axios | API Communication |

## Infrastructure

- Docker
- Docker Compose
- Nginx
- Render
- AWS

# 📂 Project Structure

```text
EduBridge-AI/
├── backend/
│   ├── app/
│   │   ├── ai/
│   │   ├── core/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── stores/
│   │   ├── utils/
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── database/
│   ├── migrations/
│   └── seeds/
│
├── docker/
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   ├── docker-compose.yml
│   └── nginx/
│       └── nginx.conf
│
└── docs/
    ├── api/
    └── deployment/
```



# ⚙️ Prerequisites

Install the following before running the project:

- Docker & Docker Compose
- Python 3.11+
- Node.js 20+

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
>>>>>>> d0cb672 (Final Commit)
- PostgreSQL 16+
- MongoDB 7+
- Redis 7+

<<<<<<< HEAD
---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/aboutharshith17-cpu/EduBridge-AI.git
cd EduBridge-AI
```



## 2. Configure Environment Variables

```bash
cp backend/.env.example backend/.env
```

Update the values inside:

```env
DATABASE_URL=
MONGODB_URL=
REDIS_URL=

JWT_SECRET=

OPENAI_API_KEY=
GEMINI_API_KEY=

CHROMADB_PATH=
```


## 3. Run with Docker

=======
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
>>>>>>> d0cb672 (Final Commit)
```bash
docker-compose up -d
```

## 4. Run Database Migrations

=======
4. **Run database migrations**
>>>>>>> d0cb672 (Final Commit)
```bash
docker-compose exec backend alembic upgrade head
```

## 5. Access the Application

| Service | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| Swagger Docs | http://localhost:8000/api/docs |
| ReDoc | http://localhost:8000/api/redoc |

# 💻 Development

## Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```



## Frontend

```bash
cd frontend

npm install

npm run dev
```


# 🔐 API Endpoints

## Authentication

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/refresh` | Refresh JWT Token |
| GET | `/api/auth/me` | Current User |



## Student APIs

| Method | Endpoint |
|----------|----------|
| GET | `/api/student/dashboard` |
| GET | `/api/student/profile` |
| PUT | `/api/student/profile` |
| GET | `/api/student/resources` |
| GET | `/api/student/scholarships` |
| GET | `/api/student/internships` |
| POST | `/api/student/applications` |
| POST | `/api/student/meetings` |
| GET | `/api/student/progress` |
| GET | `/api/student/recommendations` |



## Mentor APIs

| Method | Endpoint |
|----------|----------|
| GET | `/api/mentor/dashboard` |
| GET | `/api/mentor/students` |
| POST | `/api/mentor/resources` |
| GET | `/api/mentor/meetings` |
| GET | `/api/mentor/feedback` |



## Admin APIs

| Method | Endpoint |
|----------|----------|
| GET | `/api/admin/stats` |
| GET | `/api/admin/users` |
| GET | `/api/admin/mentors/verifications` |
| POST | `/api/admin/scholarships` |
| POST | `/api/admin/internships` |


# 🤖 AI Capabilities

- AI Career Recommendation Engine
- Resume Analysis
- Scholarship Recommendation System
- Internship Recommendation System
- AI Mentor Chatbot
- Retrieval-Augmented Generation (RAG)
- Semantic Search using ChromaDB
- LangChain AI Pipelines


# 🔒 Authentication

- JWT Authentication
- Refresh Tokens
- Password Hashing (bcrypt)
- Role-Based Access Control (Student / Mentor / Admin)



# 📦 Deployment

## Render

```text
docs/deployment/render.md
```

Contains deployment instructions for:

- Backend
- Frontend
- PostgreSQL
- Redis
- Environment Variables



## AWS

```text
docs/deployment/aws.md
```

Includes:

- EC2 Deployment
- Docker Deployment
- Nginx Reverse Proxy
- SSL Configuration
- Domain Setup



# 📈 Future Enhancements

- AI Mock Interview
- Video Calling with Mentors
- Course Recommendation Engine
- Placement Analytics Dashboard
- Real-Time Chat
- AI Resume Builder
- AI Interview Feedback
- Mobile Application (Flutter)



# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/YourFeature
```

3. Commit your changes

```bash
git commit -m "Add Your Feature"
```

4. Push to your branch

```bash
git push origin feature/YourFeature
```

5. Open a Pull Request

# 📄 License

This project is licensed under the **MIT License**.


# 👨‍💻 Developed By

**Harshith Kumar H S**

Electronics & Instrumentation Engineering  
Full Stack Developer | DevOps Engineer | AI Enthusiast

---

**EduBridge AI** — *Empowering students through AI-driven mentorship, career guidance, and scholarships.*

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

