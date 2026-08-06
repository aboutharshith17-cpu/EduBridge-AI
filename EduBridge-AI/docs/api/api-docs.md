# EduBridge AI API Documentation

## Base URL
```
/api
```

## Authentication
All authenticated endpoints require a Bearer token in the Authorization header.

## Endpoints

### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "first_name": "string",
  "last_name": "string",
  "role": "student|mentor|admin"
}
```

**Response:**
```json
{
  "id": 1,
  "email": "string",
  "first_name": "string",
  "last_name": "string",
  "role": "student"
}
```

### POST /auth/login
Login and get access token.

**Request Body (form-data):**
```
username: email
password: password
```

**Response:**
```json
{
  "access_token": "string",
  "refresh_token": "string",
  "token_type": "bearer"
}
```

### GET /auth/me
Get current user information.

**Headers:**
```
Authorization: Bearer <token>
```

### POST /auth/refresh
Refresh access token.

**Request Body:**
```json
{
  "refresh_token": "string"
}
```

### GET /student/dashboard
Get student dashboard data.

### GET /student/profile
Get student profile.

### PUT /student/profile
Update student profile.

### GET /student/resources
Get resource library.

### GET /student/scholarships
Get available scholarships.

### GET /student/internships
Get available internships.

### POST /student/applications
Apply for scholarship or internship.

### GET /student/meetings
Get student meetings.

### POST /student/meetings
Schedule a meeting.

### GET /student/progress
Get progress tracking data.

### POST /student/progress
Add progress entry.

### GET /student/recommendations
Get AI career recommendations.

### GET /mentor/dashboard
Get mentor dashboard data.

### POST /mentor/resources
Upload a resource.

### GET /mentor/meetings
Get mentor meetings.

### GET /admin/stats
Get platform statistics.

### GET /admin/users
Get all users.

### PUT /admin/users/{user_id}/status
Update user status.

### GET /admin/mentors/verifications
Get pending mentor verifications.

### PUT /admin/mentors/{mentor_id}/verify
Verify or reject a mentor.

### POST /admin/scholarships
Create a scholarship.

### POST /admin/internships
Create an internship.

### GET /ai/career-recommendations
Get AI career recommendations.

### POST /ai/analyze-resume
Analyze a resume using AI.

### GET /ai/learning-path
Get personalized learning path.

### POST /ai/chat-assistant
Chat with AI assistant.

## Error Responses

All errors follow this format:
```json
{
  "detail": "Error message"
}
```

## Status Codes
- `200 OK`: Request succeeded
- `201 Created`: Resource created
- `400 Bad Request`: Invalid request
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Permission denied
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error
