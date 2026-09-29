# 🎓 EduBridge AI

> **A production-ready full-stack educational platform connecting students with mentors, providing AI-powered career recommendations, scholarship discovery, and internship tracking.**

---

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

---

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

---

## Infrastructure

- Docker
- Docker Compose
- Nginx
- Render
- AWS

---

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

---

# ⚙️ Prerequisites

Install the following before running the project:

- Docker & Docker Compose
- Python 3.11+
- Node.js 20+
- PostgreSQL 16+
- MongoDB 7+
- Redis 7+

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/aboutharshith17-cpu/EduBridge-AI.git
cd EduBridge-AI
```

---

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

---

## 3. Run with Docker

```bash
docker-compose up -d
```

---

## 4. Run Database Migrations

```bash
docker-compose exec backend alembic upgrade head
```

---

## 5. Access the Application

| Service | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| Swagger Docs | http://localhost:8000/api/docs |
| ReDoc | http://localhost:8000/api/redoc |

---

# 💻 Development

## Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔐 API Endpoints

## Authentication

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | `/api/auth/register` | Register User |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/refresh` | Refresh JWT Token |
| GET | `/api/auth/me` | Current User |

---

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

---

## Mentor APIs

| Method | Endpoint |
|----------|----------|
| GET | `/api/mentor/dashboard` |
| GET | `/api/mentor/students` |
| POST | `/api/mentor/resources` |
| GET | `/api/mentor/meetings` |
| GET | `/api/mentor/feedback` |

---

## Admin APIs

| Method | Endpoint |
|----------|----------|
| GET | `/api/admin/stats` |
| GET | `/api/admin/users` |
| GET | `/api/admin/mentors/verifications` |
| POST | `/api/admin/scholarships` |
| POST | `/api/admin/internships` |

---

# 🤖 AI Capabilities

- AI Career Recommendation Engine
- Resume Analysis
- Scholarship Recommendation System
- Internship Recommendation System
- AI Mentor Chatbot
- Retrieval-Augmented Generation (RAG)
- Semantic Search using ChromaDB
- LangChain AI Pipelines

---

# 🔒 Authentication

- JWT Authentication
- Refresh Tokens
- Password Hashing (bcrypt)
- Role-Based Access Control (Student / Mentor / Admin)

---

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

---

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

---

# 📈 Future Enhancements

- AI Mock Interview
- Video Calling with Mentors
- Course Recommendation Engine
- Placement Analytics Dashboard
- Real-Time Chat
- AI Resume Builder
- AI Interview Feedback
- Mobile Application (Flutter)

---

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

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Developed By

**Harshith Kumar H S**

Electronics & Instrumentation Engineering  
Full Stack Developer | DevOps Engineer | AI Enthusiast

---

**EduBridge AI** — *Empowering students through AI-driven mentorship, career guidance, and scholarships.*
