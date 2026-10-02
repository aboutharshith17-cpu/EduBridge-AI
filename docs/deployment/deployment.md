# EduBridge AI Deployment Guide

## Local Development with Docker

### Prerequisites
- Docker Engine 20.10+
- Docker Compose 2.0+
- At least 4GB RAM and 10GB disk space

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd EduBridge-AI
```

2. **Configure environment**
```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your settings
```

3. **Start all services**
```bash
docker-compose up -d
```

4. **Run database migrations**
```bash
docker-compose exec backend alembic upgrade head
```

5. **Create admin user**
```bash
docker-compose exec backend python -c "
from app.core.database import SessionLocal
from app.models.models import User, UserRole
from app.core.security import get_password_hash

db = SessionLocal()
admin = User(
    email='admin@edubridge.ai',
    hashed_password=get_password_hash('admin123'),
    first_name='Admin',
    last_name='User',
    role=UserRole.ADMIN
)
db.add(admin)
db.commit()
db.close()
"
```

6. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/api/docs
- ChromaDB: http://localhost:8001

## Deployment on Render

### Backend Deployment

1. **Push to GitHub**
```bash
git push origin main
```

2. **Create PostgreSQL Database**
   - Go to Render Dashboard
   - Create new PostgreSQL database
   - Copy the connection string

3. **Create MongoDB Database**
   - Create new MongoDB database
   - Copy the connection string

4. **Deploy Backend**
   - Create new Web Service
   - Connect your repository
   - Set build command: `pip install -r requirements.txt`
   - Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Add environment variables:
     - `DATABASE_URL`: Your PostgreSQL URL
     - `MONGODB_URL`: Your MongoDB URL
     - `SECRET_KEY`: Generate with `openssl rand -hex 32`
     - `OPENAI_API_KEY`: Your OpenAI key

5. **Run migrations**
```bash
render shell
alembic upgrade head
```

### Frontend Deployment

1. **Create Static Site**
   - Connect repository
   - Set build command: `npm install && npm run build`
   - Set publish directory: `dist`

2. **Environment Variables**
   - `VITE_API_URL`: Your backend URL

## Deployment on AWS

### Architecture
- **EC2 / ECS**: Backend API
- **RDS**: PostgreSQL
- **DocumentDB**: MongoDB
- **ElastiCache**: Redis
- **S3**: File storage
- **CloudFront**: CDN
- **Route53**: DNS
- **ECS Fargate**: Containers
- **ALB**: Load balancer

### Using AWS ECS with Fargate

1. **Push images to ECR**
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com

docker tag edubridge-backend:latest <account>.dkr.ecr.us-east-1.amazonaws.com/edubridge-backend:latest
docker tag edubridge-frontend:latest <account>.dkr.ecr.us-east-1.amazonaws.com/edubridge-frontend:latest

docker push <account>.dkr.ecr.us-east-1.amazonaws.com/edubridge-backend:latest
docker push <account>.dkr.ecr.us-east-1.amazonaws.com/edubridge-frontend:latest
```

2. **Create ECS Task Definitions**
3. **Create ECS Services**
4. **Configure ALB**

## Environment Variables

### Required
- `DATABASE_URL`: PostgreSQL connection string
- `MONGODB_URL`: MongoDB connection string
- `REDIS_URL`: Redis connection string
- `SECRET_KEY`: JWT secret (use `openssl rand -hex 32`)
- `OPENAI_API_KEY`: OpenAI API key for AI features

### Optional
- `GEMINI_API_KEY`: Gemini API key
- `ENVIRONMENT`: `development` or `production`
- `FRONTEND_URL`: Frontend URL for CORS
- `BACKEND_URL`: Backend URL

## Health Checks

### Backend
```bash
curl http://localhost:8000/health
```

### Frontend
```bash
curl http://localhost:3000
```

## Monitoring

### Application Logs
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Database Health
```bash
docker-compose exec postgres pg_isready -U edubridge
```
