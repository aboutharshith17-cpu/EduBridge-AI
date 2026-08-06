import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/stores/AuthContext'
import MainLayout from '@/layouts/MainLayout'
import AuthLayout from '@/layouts/AuthLayout'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import StudentDashboard from '@/pages/student/Dashboard'
import MentorDashboard from '@/pages/mentor/Dashboard'
import AdminDashboard from '@/pages/admin/Dashboard'
import Profile from '@/pages/student/Profile'
import Resources from '@/pages/student/Resources'
import Scholarships from '@/pages/student/Scholarships'
import Internships from '@/pages/student/Internships'
import Applications from '@/pages/student/Applications'
import Meetings from '@/pages/student/Meetings'
import Progress from '@/pages/student/Progress'
import Recommendations from '@/pages/student/Recommendations'
import MentorStudents from '@/pages/mentor/Students'
import MentorResources from '@/pages/mentor/Resources'
import MentorMeetings from '@/pages/mentor/Meetings'
import AdminUsers from '@/pages/admin/Users'
import AdminScholarships from '@/pages/admin/Scholarships'
import AdminInternships from '@/pages/admin/Internships'
import AdminAnalytics from '@/pages/admin/Analytics'

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) {
  const { user, isLoading } = useAuth()
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }
  
  return <>{children}</>
}

export default function App() {
  const { user, isLoading } = useAuth()
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }
  
  return (
    <Routes>
      <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
      <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <MainLayout>
            {user?.role === 'student' && <StudentDashboard />}
            {user?.role === 'mentor' && <MentorDashboard />}
            {user?.role === 'admin' && <AdminDashboard />}
          </MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute allowedRoles={['student', 'mentor']}>
          <MainLayout><Profile /></MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/resources" element={
        <ProtectedRoute allowedRoles={['student', 'mentor']}>
          <MainLayout><Resources /></MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/scholarships" element={
        <ProtectedRoute allowedRoles={['student', 'admin']}>
          <MainLayout><Scholarships /></MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/internships" element={
        <ProtectedRoute allowedRoles={['student', 'admin']}>
          <MainLayout><Internships /></MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/applications" element={
        <ProtectedRoute allowedRoles={['student']}>
          <MainLayout><Applications /></MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/meetings" element={
        <ProtectedRoute allowedRoles={['student', 'mentor']}>
          <MainLayout><Meetings /></MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/progress" element={
        <ProtectedRoute allowedRoles={['student']}>
          <MainLayout><Progress /></MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/recommendations" element={
        <ProtectedRoute allowedRoles={['student']}>
          <MainLayout><Recommendations /></MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/mentor/students" element={
        <ProtectedRoute allowedRoles={['mentor']}>
          <MainLayout><MentorStudents /></MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/mentor/resources" element={
        <ProtectedRoute allowedRoles={['mentor']}>
          <MainLayout><MentorResources /></MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/mentor/meetings" element={
        <ProtectedRoute allowedRoles={['mentor']}>
          <MainLayout><MentorMeetings /></MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout><AdminUsers /></MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/scholarships" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout><AdminScholarships /></MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/internships" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout><AdminInternships /></MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/analytics" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout><AdminAnalytics /></MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
