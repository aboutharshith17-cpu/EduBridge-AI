import { useQuery } from '@tanstack/react-query'
import { studentApi } from '@/services/api'
import { BookOpen, GraduationCap, Briefcase, Calendar, TrendingUp } from 'lucide-react'

export default function StudentDashboard() {
  const { data: dashboard } = useQuery({
    queryKey: ['studentDashboard'],
    queryFn: studentApi.getDashboard,
  })

  const { data: recommendations } = useQuery({
    queryKey: ['recommendations'],
    queryFn: studentApi.getRecommendations,
  })

  const stats = [
    { label: 'Applications', value: dashboard?.data?.total_applications || 0, icon: Briefcase, color: 'bg-blue-500' },
    { label: 'Upcoming Meetings', value: dashboard?.data?.upcoming_meetings || 0, icon: Calendar, color: 'bg-green-500' },
    { label: 'Resources', value: dashboard?.data?.resources_accessed || 0, icon: BookOpen, color: 'bg-purple-500' },
    { label: 'Progress', value: '75%', icon: TrendingUp, color: 'bg-orange-500' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Student Dashboard</h1>
        <p className="text-slate-600 mt-1">Welcome back! Here's your learning journey overview.</p>
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
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Recommendations</h3>
          <div className="space-y-3">
            {recommendations?.data?.slice(0, 3).map((rec: any, idx: number) => (
              <div key={idx} className="p-4 bg-primary-50 rounded-lg">
                <p className="font-medium text-slate-900">{rec.title}</p>
                <p className="text-sm text-slate-600 mt-1">{rec.description}</p>
              </div>
            )) || <p className="text-slate-500">No recommendations yet</p>}
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <a href="/scholarships" className="p-4 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-lg hover:shadow-lg transition">
              <GraduationCap className="w-8 h-8 mb-2" />
              <p className="font-medium">Find Scholarships</p>
            </a>
            <a href="/internships" className="p-4 bg-gradient-to-br from-secondary-500 to-secondary-600 text-white rounded-lg hover:shadow-lg transition">
              <Briefcase className="w-8 h-8 mb-2" />
              <p className="font-medium">Explore Internships</p>
            </a>
            <a href="/meetings" className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition">
              <Calendar className="w-8 h-8 mb-2" />
              <p className="font-medium">Schedule Meeting</p>
            </a>
            <a href="/resources" className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg transition">
              <BookOpen className="w-8 h-8 mb-2" />
              <p className="font-medium">Browse Resources</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
