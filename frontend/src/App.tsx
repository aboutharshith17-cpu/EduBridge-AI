import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/stores/AuthContext'
import { AppShell } from '@/components/layout/AppShell'
import AuthLayout from '@/layouts/AuthLayout'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import LandingPage from '@/pages/landing/LandingPage'
import StudentDashboard from '@/pages/student/Dashboard'
import StudentResources from '@/pages/student/Resources'
import StudentScholarships from '@/pages/student/Scholarships'
import StudentInternships from '@/pages/student/Internships'
import StudentApplications from '@/pages/student/Applications'
import StudentMeetings from '@/pages/student/Meetings'
import StudentProgress from '@/pages/student/Progress'
import StudentRecommendations from '@/pages/student/Recommendations'
import StudentProfile from '@/pages/student/Profile'
import MentorDashboard from '@/pages/mentor/Dashboard'
import MentorStudents from '@/pages/mentor/Students'
import MentorResources from '@/pages/mentor/Resources'
import MentorMeetings from '@/pages/mentor/Meetings'
import AdminDashboard from '@/pages/admin/Dashboard'
import AdminUsers from '@/pages/admin/Users'
import AdminScholarships from '@/pages/admin/Scholarships'
import AdminInternships from '@/pages/admin/Internships'
import AdminAnalytics from '@/pages/admin/Analytics'

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return <AppShell>{children}</AppShell>
}

function RoleBasedDashboard() {
  const { user } = useAuth()

  if (user?.role === 'student') return <StudentDashboard />
  if (user?.role === 'mentor') return <MentorDashboard />
  if (user?.role === 'admin') return <AdminDashboard />
  return <Navigate to="/login" replace />
}

export default function App() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <AuthLayout><Login /></AuthLayout>} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <AuthLayout><Register /></AuthLayout>} />

      <Route path="/dashboard" element={<ProtectedRoute><RoleBasedDashboard /></ProtectedRoute>} />

      <Route path="/learning" element={<ProtectedRoute allowedRoles={['student']}><StudentResources /></ProtectedRoute>} />
      <Route path="/scholarships" element={<ProtectedRoute allowedRoles={['student', 'admin']}><StudentScholarships /></ProtectedRoute>} />
      <Route path="/internships" element={<ProtectedRoute allowedRoles={['student', 'admin']}><StudentInternships /></ProtectedRoute>} />
      <Route path="/mentors" element={<ProtectedRoute allowedRoles={['student']}><div className="text-center py-12 text-slate-500">Mentor discovery coming soon</div></ProtectedRoute>} />
      <Route path="/meetings" element={<ProtectedRoute allowedRoles={['student', 'mentor']}><StudentMeetings /></ProtectedRoute>} />
      <Route path="/progress" element={<ProtectedRoute allowedRoles={['student']}><StudentProgress /></ProtectedRoute>} />
      <Route path="/recommendations" element={<ProtectedRoute allowedRoles={['student']}><StudentRecommendations /></ProtectedRoute>} />
      <Route path="/ai-mentor" element={<ProtectedRoute allowedRoles={['student']}><div className="text-center py-12 text-slate-500">AI Mentor chat coming soon</div></ProtectedRoute>} />
      <Route path="/applications" element={<ProtectedRoute allowedRoles={['student']}><StudentApplications /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute allowedRoles={['student', 'mentor']}><StudentProfile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><div className="text-center py-12 text-slate-500">Settings coming soon</div></ProtectedRoute>} />

      <Route path="/mentor/students" element={<ProtectedRoute allowedRoles={['mentor']}><MentorStudents /></ProtectedRoute>} />
      <Route path="/mentor/resources" element={<ProtectedRoute allowedRoles={['mentor']}><MentorResources /></ProtectedRoute>} />
      <Route path="/mentor/meetings" element={<ProtectedRoute allowedRoles={['mentor']}><MentorMeetings /></ProtectedRoute>} />
      <Route path="/mentor/feedback" element={<ProtectedRoute allowedRoles={['mentor']}><div className="text-center py-12 text-slate-500">Feedback coming soon</div></ProtectedRoute>} />

      <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
      <Route path="/admin/scholarships" element={<ProtectedRoute allowedRoles={['admin']}><AdminScholarships /></ProtectedRoute>} />
      <Route path="/admin/internships" element={<ProtectedRoute allowedRoles={['admin']}><AdminInternships /></ProtectedRoute>} />
      <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['admin']}><AdminAnalytics /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
