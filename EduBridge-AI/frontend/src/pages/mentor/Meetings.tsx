import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { mentorApi } from '@/services/api'
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function MentorMeetings() {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['mentorMeetings'],
    queryFn: mentorApi.getMeetings,
  })

  const meetings = data?.data || []

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-500" />
      case 'confirmed': return <CheckCircle className="w-5 h-5 text-blue-500" />
      default: return <Clock className="w-5 h-5 text-yellow-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">My Meetings</h1>
        <p className="text-slate-600 mt-1">Manage your scheduled meetings</p>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">Loading meetings...</div>
      ) : (
        <div className="space-y-4">
          {meetings.map((meeting: any) => (
            <div key={meeting.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{meeting.title}</h3>
                    <p className="text-slate-600 text-sm mt-1">{meeting.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(meeting.scheduled_at).toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(meeting.status)}
                        <span className="capitalize">{meeting.status}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!isLoading && meetings.length === 0 && (
        <div className="text-center py-12 text-slate-500">No meetings scheduled yet</div>
      )}
    </div>
  )
}
