import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { studentApi } from '@/services/api'
import { Calendar, Clock, Plus } from 'lucide-react'
import { useState } from 'react'

const meetingSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  mentor_id: z.coerce.number(),
  scheduled_at: z.string().datetime(),
  duration_minutes: z.coerce.number().default(60),
})

type MeetingForm = z.infer<typeof meetingSchema>

export default function Meetings() {
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const { data: meetings } = useQuery({
    queryKey: ['meetings'],
    queryFn: studentApi.getMeetings,
  })
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<MeetingForm>({
    resolver: zodResolver(meetingSchema),
  })

  const scheduleMutation = useMutation({
    mutationFn: studentApi.scheduleMeeting,
    onSuccess: () => {
      toast.success('Meeting scheduled successfully')
      queryClient.invalidateQueries({ queryKey: ['meetings'] })
      reset()
      setShowForm(false)
    },
    onError: () => {
      toast.error('Failed to schedule meeting')
    },
  })

  const onSubmit = (data: MeetingForm) => {
    scheduleMutation.mutate(data)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Meetings</h1>
          <p className="text-slate-600 mt-1">Schedule and manage your mentor meetings</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Schedule Meeting
        </button>
      </div>
      
      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
            <input {...register('title')} className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Mentor ID</label>
            <input {...register('mentor_id')} type="number" className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Scheduled At</label>
            <input {...register('scheduled_at')} type="datetime-local" className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
          </div>
          <button type="submit" className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700">
            Schedule
          </button>
        </form>
      )}
      
      <div className="space-y-4">
        {meetings?.data?.map((meeting: any) => (
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
                    <span className="capitalize">{meeting.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {!meetings?.data?.length && (
        <div className="text-center py-12 text-slate-500">No meetings scheduled yet</div>
      )}
    </div>
  )
}
