import { NavLink } from 'react-router-dom'
import { useAuth } from '@/stores/AuthContext'
import { Home, BookOpen, MessageSquare, Briefcase, User } from 'lucide-react'

const studentMobileNavItems = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/learning', icon: BookOpen, label: 'Learning' },
  { path: '/ai-mentor', icon: MessageSquare, label: 'AI' },
  { path: '/internships', icon: Briefcase, label: 'Jobs' },
  { path: '/profile', icon: User, label: 'Profile' },
]

const mentorMobileNavItems = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/mentor/students', icon: BookOpen, label: 'Students' },
  { path: '/mentor/meetings', icon: MessageSquare, label: 'Meetings' },
  { path: '/mentor/resources', icon: Briefcase, label: 'Resources' },
  { path: '/profile', icon: User, label: 'Profile' },
]

const adminMobileNavItems = [
  { path: '/dashboard', icon: Home, label: 'Home' },
  { path: '/admin/users', icon: BookOpen, label: 'Users' },
  { path: '/admin/scholarships', icon: MessageSquare, label: 'Scholarships' },
  { path: '/admin/internships', icon: Briefcase, label: 'Internships' },
  { path: '/profile', icon: User, label: 'Profile' },
]

export function MobileNav() {
  const { user } = useAuth()

  const mobileNavItems =
    user?.role === 'student' ? studentMobileNavItems :
    user?.role === 'mentor' ? mentorMobileNavItems :
    adminMobileNavItems

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 safe-area-pb">
      <div className="flex items-center justify-around h-14 px-2">
        {mobileNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-xl transition-colors ${
                isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
