export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  role: 'student' | 'mentor' | 'admin'
  status: string
  is_verified: boolean
  avatar_url?: string
  phone?: string
  created_at?: string
}

export interface StudentProfile {
  id: number
  user_id: number
  university?: string
  degree?: string
  graduation_year?: number
  cgpa?: number
  skills?: string[]
  interests?: string[]
  resume_url?: string
  linkedin_url?: string
  github_url?: string
  user?: User
}

export interface MentorProfile {
  id: number
  user_id: number
  company?: string
  designation?: string
  experience_years?: number
  expertise?: string[]
  linkedin_url?: string
  verification_status: string
  verified_at?: string
  user?: User
}

export interface StudentDashboard {
  total_applications: number
  pending_applications: number
  upcoming_meetings: number
  resources_accessed: number
  recent_activities: any[]
}

export interface MentorDashboard {
  total_students: number
  pending_requests: number
  upcoming_meetings: number
  resources_uploaded: number
  avg_rating?: number
}

export interface AdminStats {
  total_users: number
  total_students: number
  total_mentors: number
  total_resources: number
  total_scholarships: number
  total_internships: number
  total_applications: number
  active_mentors: number
  pending_verifications: number
}

export interface Resource {
  id: number
  title: string
  description?: string
  category: string
  tags?: string[]
  is_public: boolean
  file_url?: string
  file_type?: string
  download_count: number
  mentor_id: number
  mentor?: any
  created_at?: string
}

export interface Scholarship {
  id: number
  title: string
  provider: string
  amount?: number
  description?: string
  eligibility_criteria?: any
  deadline?: string
  application_url?: string
  is_active: boolean
  created_at?: string
}

export interface Internship {
  id: number
  title: string
  company: string
  location?: string
  description?: string
  requirements?: any
  stipend?: string
  duration_months?: number
  application_url?: string
  deadline?: string
  is_active: boolean
  created_at?: string
}

export interface Application {
  id: number
  scholarship_id?: number
  internship_id?: number
  cover_letter?: string
  documents?: string[]
  student_id: number
  status: string
  applied_at?: string
}

export interface Meeting {
  id: number
  title: string
  description?: string
  scheduled_at: string
  duration_minutes: number
  meeting_link?: string
  notes?: string
  student_id: number
  mentor_id: number
  status: string
  created_at?: string
  student?: any
  mentor?: any
}

export interface ProgressEntry {
  id: number
  skill_name: string
  proficiency_level: number
  hours_spent: number
  student_id: number
  created_at?: string
  updated_at?: string
}

export interface ProgressStats {
  total_skills: number
  average_proficiency: number
  total_hours: number
  top_skills: any[]
}

export interface AIRecommendation {
  type: string
  title: string
  description: string
  confidence_score: number
  resources?: string[]
}

export interface ChatMessage {
  id: number
  receiver_id: number
  message: string
  sender_id: number
  is_read: boolean
  created_at?: string
}

export interface Notification {
  id: number
  title: string
  message: string
  type: string
  data?: any
  user_id: number
  is_read: boolean
  created_at?: string
}

export interface UserManagement {
  id: number
  email: string
  first_name: string
  last_name: string
  role: string
  status: string
  is_verified: boolean
  created_at?: string
}
