import { useQuery } from '@tanstack/react-query'
import { adminApi } from '@/services/api'
import { Users, GraduationCap, BookOpen, Briefcase, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ['adminStats'],
    queryFn: adminApi.getStats,
  })

  const statItems = [
    { label: 'Total Users', value: stats?.data?.total_users || 0, icon: Users, color: 'bg-blue-500' },
    { label: 'Students', value: stats?.data?.total_students || 0, icon: GraduationCap, color: 'bg-green-500' },
    { label: 'Mentors', value: stats?.data?.total_mentors || 0, icon: BookOpen, color: 'bg-purple-500' },
    { label: 'Resources', value: stats?.data?.total_resources || 0, icon: Briefcase, color: 'bg-orange-500' },
    { label: 'Scholarships', value: stats?.data?.total_scholarships || 0, icon: GraduationCap, color: 'bg-pink-500' },
    { label: 'Internships', value: stats?.data?.total_internships || 0, icon: Briefcase, color: 'bg-indigo-500' },
    { label: 'Applications', value: stats?.data?.total_applications || 0, icon: TrendingUp, color: 'bg-teal-500' },
    { label: 'Pending Verifications', value: stats?.data?.pending_verifications || 0, icon: Users, color: 'bg-red-500' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-600 mt-1">Platform overview and management</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <a href="/admin/users" className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
              <p className="font-medium text-slate-900">Manage Users</p>
              <p className="text-sm text-slate-600">View and manage all users</p>
            </a>
            <a href="/admin/scholarships" className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
              <p className="font-medium text-slate-900">Manage Scholarships</p>
              <p className="text-sm text-slate-600">Add and manage scholarships</p>
            </a>
            <a href="/admin/internships" className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
              <p className="font-medium text-slate-900">Manage Internships</p>
              <p className="text-sm text-slate-600">Add and manage internships</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
