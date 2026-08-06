import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/stores/AuthContext'
import {
  LayoutDashboard, BookOpen, GraduationCap, Briefcase, Calendar, TrendingUp,
  Lightbulb, Users, FileText, LogOut, Menu, X, Bell
} from 'lucide-react'
import { useState } from 'react'

const studentNavItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/profile', icon: Users, label: 'Profile' },
  { path: '/resources', icon: BookOpen, label: 'Resources' },
  { path: '/scholarships', icon: GraduationCap, label: 'Scholarships' },
  { path: '/internships', icon: Briefcase, label: 'Internships' },
  { path: '/applications', icon: FileText, label: 'Applications' },
  { path: '/meetings', icon: Calendar, label: 'Meetings' },
  { path: '/progress', icon: TrendingUp, label: 'Progress' },
  { path: '/recommendations', icon: Lightbulb, label: 'AI Recommendations' },
]

const mentorNavItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/profile', icon: Users, label: 'Profile' },
  { path: '/mentor/students', icon: Users, label: 'Students' },
  { path: '/mentor/meetings', icon: Calendar, label: 'Meetings' },
  { path: '/mentor/resources', icon: BookOpen, label: 'Resources' },
]

const adminNavItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/users', icon: Users, label: 'Users' },
  { path: '/admin/scholarships', icon: GraduationCap, label: 'Scholarships' },
  { path: '/admin/internships', icon: Briefcase, label: 'Internships' },
  { path: '/admin/analytics', icon: TrendingUp, label: 'Analytics' },
]

export default function MainLayout() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  
  const navItems = user?.role === 'student' ? studentNavItems :
                   user?.role === 'mentor' ? mentorNavItems :
                   adminNavItems

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-primary-600">EduBridge AI</h2>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50'}`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      
      <div className="lg:ml-64">
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2">
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-4 ml-auto">
              <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                <Bell className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-slate-900">{user?.first_name} {user?.last_name}</p>
                  <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
                </div>
                <button
                  onClick={() => { logout(); navigate('/login'); }}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
      
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
