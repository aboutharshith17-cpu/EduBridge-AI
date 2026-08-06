import { useQuery } from '@tanstack/react-query'
import { mentorApi } from '@/services/api'
import { Users, Calendar, BookOpen, Star } from 'lucide-react'

export default function MentorDashboard() {
  const { data } = useQuery({
    queryKey: ['mentorDashboard'],
    queryFn: mentorApi.getDashboard,
  })

  const stats = [
    { label: 'Students', value: data?.data?.total_students || 0, icon: Users, color: 'bg-blue-500' },
    { label: 'Pending Requests', value: data?.data?.pending_requests || 0, icon: Calendar, color: 'bg-yellow-500' },
    { label: 'Upcoming Meetings', value: data?.data?.upcoming_meetings || 0, icon: Calendar, color: 'bg-green-500' },
    { label: 'Resources', value: data?.data?.resources_uploaded || 0, icon: BookOpen, color: 'bg-purple-500' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Mentor Dashboard</h1>
        <p className="text-slate-600 mt-1">Welcome back! Here's your mentoring overview.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
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
          <div className="grid grid-cols-2 gap-3">
            <a href="/mentor/students" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
              <Users className="w-8 h-8 text-blue-600 mb-2" />
              <p className="font-medium text-slate-900">Manage Students</p>
            </a>
            <a href="/mentor/resources" className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
              <BookOpen className="w-8 h-8 text-purple-600 mb-2" />
              <p className="font-medium text-slate-900">Upload Resources</p>
            </a>
            <a href="/mentor/meetings" className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition">
              <Calendar className="w-8 h-8 text-green-600 mb-2" />
              <p className="font-medium text-slate-900">Schedule Meetings</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
