import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { studentApi } from '@/services/api'
import { FileText, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Applications() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: studentApi.getApplications,
  })

  const applications = data?.data || []

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'rejected': return <XCircle className="w-5 h-5 text-red-500" />
      case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />
      default: return <AlertCircle className="w-5 h-5 text-blue-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">My Applications</h1>
        <p className="text-slate-600 mt-1">Track your scholarship and internship applications</p>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">Loading applications...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Applied On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {applications.map((app: any) => (
                <tr key={app.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-slate-400" />
                      <span className="text-sm font-medium text-slate-900 capitalize">
                        {app.scholarship_id ? 'Scholarship' : 'Internship'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">Application #{app.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(app.status)}
                      <span className="text-sm font-medium capitalize">{app.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {new Date(app.applied_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {applications.length === 0 && (
            <div className="text-center py-12 text-slate-500">No applications yet</div>
          )}
        </div>
      )}
    </div>
  )
}
