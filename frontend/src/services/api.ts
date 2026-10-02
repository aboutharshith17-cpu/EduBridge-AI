import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refreshToken = localStorage.getItem('refresh_token')
        if (refreshToken) {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/auth/refresh`,
            { refresh_token: refreshToken }
          )
          const { access_token } = response.data
          localStorage.setItem('access_token', access_token)
          originalRequest.headers.Authorization = `Bearer ${access_token}`
          return api(originalRequest)
        }
      } catch {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', new URLSearchParams({ username: email, password }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }),
  register: (data: any) => api.post('/auth/register', data),
  refresh: (refreshToken: string) => api.post('/auth/refresh', { refresh_token: refreshToken }),
  me: () => api.get('/auth/me'),
}

export const studentApi = {
  getDashboard: () => api.get('/student/dashboard'),
  getProfile: () => api.get('/student/profile'),
  updateProfile: (data: any) => api.put('/student/profile', data),
  getResources: () => api.get('/student/resources'),
  getScholarships: () => api.get('/student/scholarships'),
  getInternships: () => api.get('/student/internships'),
  getApplications: () => api.get('/student/applications'),
  apply: (data: any) => api.post('/student/applications', data),
  scheduleMeeting: (data: any) => api.post('/student/meetings', data),
  getMeetings: () => api.get('/student/meetings'),
  updateMeeting: (id: number, data: any) => api.put(`/student/meetings/${id}`, data),
  getProgress: () => api.get('/student/progress'),
  addProgress: (data: any) => api.post('/student/progress', data),
  getProgressStats: () => api.get('/student/progress/stats'),
  getRecommendations: () => api.get('/student/recommendations'),
  getChats: (receiverId: number) => api.get(`/student/chats/${receiverId}`),
  sendChat: (data: any) => api.post('/student/chats', data),
}

export const mentorApi = {
  getDashboard: () => api.get('/mentor/dashboard'),
  getProfile: () => api.get('/mentor/profile'),
  updateProfile: (data: any) => api.put('/mentor/profile', data),
  getStudents: () => api.get('/mentor/students'),
  getRequests: () => api.get('/mentor/requests'),
  getResources: () => api.get('/mentor/resources'),
  uploadResource: (data: any) => api.post('/mentor/resources', data),
  updateResource: (id: number, data: any) => api.put(`/mentor/resources/${id}`, data),
  deleteResource: (id: number) => api.delete(`/mentor/resources/${id}`),
  getMeetings: () => api.get('/mentor/meetings'),
  updateMeeting: (id: number, data: any) => api.put(`/mentor/meetings/${id}`, data),
  getFeedback: () => api.get('/mentor/feedback'),
}

export const adminApi = {
  getStats: () => api.get('/admin/stats'),
  getUsers: () => api.get('/admin/users'),
  updateUserStatus: (userId: number, status: string) => api.put(`/admin/users/${userId}/status`, { status }),
  getPendingVerifications: () => api.get('/admin/mentors/verifications'),
  verifyMentor: (mentorId: number, status: string) => api.put(`/admin/mentors/${mentorId}/verify`, { status }),
  getScholarships: () => api.get('/admin/scholarships'),
  createScholarship: (data: any) => api.post('/admin/scholarships', data),
  updateScholarship: (id: number, data: any) => api.put(`/admin/scholarships/${id}`, data),
  deleteScholarship: (id: number) => api.delete(`/admin/scholarships/${id}`),
  getInternships: () => api.get('/admin/internships'),
  createInternship: (data: any) => api.post('/admin/internships', data),
  updateInternship: (id: number, data: any) => api.put(`/admin/internships/${id}`, data),
  deleteInternship: (id: number) => api.delete(`/admin/internships/${id}`),
}

export const aiApi = {
  getCareerRecommendations: () => api.get('/ai/career-recommendations'),
  analyzeResume: (filePath: string) => api.post('/ai/analyze-resume', { file_path: filePath }),
  getLearningPath: (skill: string) => api.get(`/ai/learning-path?skill=${skill}`),
  chatAssistant: (message: string) => api.post('/ai/chat-assistant', { message }),
}
