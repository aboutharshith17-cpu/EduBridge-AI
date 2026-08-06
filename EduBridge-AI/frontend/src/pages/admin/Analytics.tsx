import { useQuery } from '@tanstack/react-query'
import { adminApi } from '@/services/api'
import { Users, GraduationCap, BookOpen, Briefcase } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function AdminAnalytics() {
  const { data: stats } = useQuery({
    queryKey: ['adminStats'],
    queryFn: adminApi.getStats,
  })

  const chartData = [
    { name: 'Students', count: stats?.data?.total_students || 0 },
    { name: 'Mentors', count: stats?.data?.total_mentors || 0 },
    { name: 'Resources', count: stats?.data?.total_resources || 0 },
    { name: 'Applications', count: stats?.data?.total_applications || 0 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-600 mt-1">Platform insights and metrics</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Platform Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-blue-500" />
                <span className="font-medium text-slate-900">Total Users</span>
              </div>
              <span className="text-2xl font-bold text-slate-900">{stats?.data?.total_users || 0}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-green-500" />
                <span className="font-medium text-slate-900">Total Scholarships</span>
              </div>
              <span className="text-2xl font-bold text-slate-900">{stats?.data?.total_scholarships || 0}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-purple-500" />
                <span className="font-medium text-slate-900">Total Internships</span>
              </div>
              <span className="text-2xl font-bold text-slate-900">{stats?.data?.total_internships || 0}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-orange-500" />
                <span className="font-medium text-slate-900">Active Mentors</span>
              </div>
              <span className="text-2xl font-bold text-slate-900">{stats?.data?.active_mentors || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
