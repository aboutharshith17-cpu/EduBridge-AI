import { useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { Card, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { Input } from '@/components/ui/Input'
import { useMeetings, useScheduleMeeting } from '@/hooks/useStudent'
import { Calendar, Clock, Plus, Video, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const meetingSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  mentor_id: z.coerce.number().positive('Please enter a valid mentor ID'),
  scheduled_at: z.string().min(1, 'Please select a date and time'),
  duration_minutes: z.coerce.number().min(15).max(180).default(60),
})

type MeetingForm = z.infer<typeof meetingSchema>

export default function Meetings() {
  const [showForm, setShowForm] = useState(false)
  const { data: meetings, isLoading, error } = useMeetings()
  const scheduleMutation = useScheduleMeeting()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MeetingForm>({
    resolver: zodResolver(meetingSchema),
  })

  const onSubmit = (data: MeetingForm) => {
    scheduleMutation.mutate(data, {
      onSuccess: () => {
        reset()
        setShowForm(false)
      },
    })
  }

  const meetingList = meetings?.data || []

  if (error) {
    return (
      <PageContainer
        title="Meetings"
        subtitle="Schedule and manage your mentor meetings"
        actions={
          <Button variant="primary" onClick={() => setShowForm(true)}>
            <span className="flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> Schedule Meeting
            </span>
          </Button>
        }
      >
        <EmptyState
          icon={<Calendar className="w-12 h-12" />}
          title="Failed to load meetings"
          description="Please try refreshing the page."
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="Meetings"
      subtitle="Schedule and manage your mentor meetings"
      actions={
        <Button
          variant={showForm ? 'outline' : 'primary'}
          onClick={() => setShowForm(!showForm)}
        >
          <span className="flex items-center gap-1.5">
            {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showForm ? 'Cancel' : 'Schedule Meeting'}
          </span>
        </Button>
      }
    >
      {showForm && (
        <Card>
          <CardHeader title="Schedule a New Meeting" subtitle="Fill in the details below" />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Meeting Title"
                placeholder="e.g. Career Guidance Session"
                error={errors.title?.message}
                {...register('title')}
              />
              <Input
                label="Mentor ID"
                type="number"
                placeholder="Enter mentor ID"
                error={errors.mentor_id?.message}
                {...register('mentor_id')}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Scheduled Date & Time"
                type="datetime-local"
                error={errors.scheduled_at?.message}
                {...register('scheduled_at')}
              />
              <Input
                label="Duration (minutes)"
                type="number"
                placeholder="60"
                error={errors.duration_minutes?.message}
                {...register('duration_minutes')}
              />
            </div>
            <Input
              label="Description (optional)"
              placeholder="Brief description of the meeting agenda..."
              {...register('description')}
            />
            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" isLoading={isSubmitting || scheduleMutation.isPending}>
                Schedule Meeting
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} padding="lg">
              <div className="flex items-start gap-4">
                <Skeleton className="h-12 w-12 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-5 w-2/3 rounded-lg" />
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-4 w-1/2 rounded-lg" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : meetingList.length > 0 ? (
        <div className="space-y-4">
          {meetingList.map((meeting: any) => {
            const statusLower = (meeting.status || '').toLowerCase()
            const badgeVariant =
              statusLower === 'confirmed'
                ? 'success'
                : statusLower === 'completed'
                  ? 'info'
                  : statusLower === 'cancelled'
                    ? 'danger'
                    : 'warning'
            return (
              <Card key={meeting.id} hover padding="lg">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex-shrink-0">
                    <Calendar className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {meeting.title}
                      </h3>
                      <Badge variant={badgeVariant} size="sm">
                        {meeting.status}
                      </Badge>
                    </div>
                    {meeting.description && (
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                        {meeting.description}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {new Date(meeting.scheduled_at).toLocaleString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Video className="w-4 h-4" />
                        {meeting.duration_minutes} min
                      </span>
                    </div>
                    {meeting.notes && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic">
                        Notes: {meeting.notes}
                      </p>
                    )}
                  </div>
                  {meeting.meeting_link && (
                    <a
                      href={meeting.meeting_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center text-sm px-4 py-2.5 rounded-xl font-medium border border-slate-300 text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                    >
                      Join
                    </a>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      ) : (
        <EmptyState
          icon={<Calendar className="w-12 h-12" />}
          title="No meetings scheduled"
          description="Schedule your first meeting with a mentor to get started."
          action={
            <Button onClick={() => setShowForm(true)}>
              <span className="flex items-center gap-1.5">
                <Plus className="w-4 h-4" /> Schedule Meeting
              </span>
            </Button>
          }
        />
      )}
    </PageContainer>
  )
}
