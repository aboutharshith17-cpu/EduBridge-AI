import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/stores/AuthContext'
import {
  LayoutDashboard, BookOpen, GraduationCap, Briefcase, Calendar, TrendingUp,
  Users, LogOut, Settings
} from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'

const studentNavItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/learning', icon: BookOpen, label: 'My Learning' },
  { path: '/scholarships', icon: GraduationCap, label: 'Scholarships' },
  { path: '/internships', icon: Briefcase, label: 'Internships' },
  { path: '/mentors', icon: Users, label: 'Mentors' },
  { path: '/meetings', icon: Calendar, label: 'Meetings' },
  { path: '/progress', icon: TrendingUp, label: 'Progress' },
]

const mentorNavItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/mentor/students', icon: Users, label: 'Students' },
  { path: '/mentor/resources', icon: BookOpen, label: 'Resources' },
  { path: '/mentor/meetings', icon: Calendar, label: 'Meetings' },
]

const adminNavItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/users', icon: Users, label: 'Users' },
  { path: '/admin/scholarships', icon: GraduationCap, label: 'Scholarships' },
  { path: '/admin/internships', icon: Briefcase, label: 'Internships' },
  { path: '/admin/analytics', icon: TrendingUp, label: 'Analytics' },
]

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const navItems =
    user?.role === 'student' ? studentNavItems :
    user?.role === 'mentor' ? mentorNavItems :
    adminNavItems

  const handleLogout = () => {
    logout()
    navigate('/login')
    onClose?.()
  }

  return (
    <aside className="h-full flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
            EduBridge<span className="text-primary-600 dark:text-primary-400">AI</span>
          </span>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
            <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
              }`
            }
          >
            <item.icon className="w-[18px] h-[18px]" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
            }`
          }
        >
          <Settings className="w-[18px] h-[18px]" />
          <span>Settings</span>
        </NavLink>

        <div className="flex items-center gap-3 px-3 py-2.5">
          <Avatar name={`${user?.first_name} ${user?.last_name}`} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user?.role}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="w-[18px] h-[18px]" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
