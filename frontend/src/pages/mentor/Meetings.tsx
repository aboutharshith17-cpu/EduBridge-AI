import { useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { Avatar } from '@/components/ui/Avatar'
import { Calendar, Clock, Search, CheckCircle, XCircle, Video } from 'lucide-react'
import { useMentorMeetings } from '@/hooks/useMentor'
import type { Meeting } from '@/types'

function MeetingRowSkeleton() {
  return (
    <Card padding="md">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <Skeleton variant="rectangular" className="h-12 w-12 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" className="w-48" />
            <Skeleton variant="text" className="w-72" />
            <Skeleton variant="text" className="w-40" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton variant="text" className="w-20" />
          <Skeleton variant="rectangular" className="h-8 w-24 rounded-lg" />
        </div>
      </div>
    </Card>
  )
}

function getStatusConfig(status: string) {
  switch (status) {
    case 'completed':
      return {
        label: 'Completed',
        variant: 'primary' as const,
        icon: <CheckCircle className="w-4 h-4" />,
      }
    case 'cancelled':
      return {
        label: 'Cancelled',
        variant: 'danger' as const,
        icon: <XCircle className="w-4 h-4" />,
      }
    case 'confirmed':
      return {
        label: 'Confirmed',
        variant: 'success' as const,
        icon: <CheckCircle className="w-4 h-4" />,
      }
    case 'pending':
      return {
        label: 'Pending',
        variant: 'warning' as const,
        icon: <Clock className="w-4 h-4" />,
      }
    default:
      return {
        label: status,
        variant: 'default' as const,
        icon: <Clock className="w-4 h-4" />,
      }
  }
}

function formatMeetingTime(isoString: string) {
  const date = new Date(isoString)
  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()

  const timeStr = date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  })

  const dateStr = isToday
    ? 'Today'
    : date.toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })

  return { timeStr, dateStr, isToday }
}

export default function MentorMeetings() {
  const { data, isLoading, error } = useMentorMeetings()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const meetingsList: Meeting[] = data?.data || []

  const filteredMeetings = meetingsList.filter((meeting) => {
    const matchesSearch = !searchQuery.trim() || meeting.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || meeting.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusCounts = meetingsList.reduce(
    (acc, meeting) => {
      acc[meeting.status] = (acc[meeting.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  if (error) {
    return (
      <PageContainer
        title="My Meetings"
        subtitle="Manage your scheduled meetings"
      >
        <EmptyState
          icon={<Calendar className="w-12 h-12" />}
          title="Unable to load meetings"
          description="We couldn't fetch your meetings. Please try again later."
          action={<Button onClick={() => window.location.reload()}>Retry</Button>}
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="My Meetings"
      subtitle="Manage your scheduled meetings"
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => {
          const config = getStatusConfig(status)
          return (
            <Card key={status} padding="md" hover>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-700">
                  {config.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{count}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{config.label}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <Card padding="lg">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search meetings by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm transition-all duration-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-800 dark:text-slate-100 dark:border-slate-600"
            />
          </div>
          <div className="flex items-center gap-2">
            {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <>
              <MeetingRowSkeleton />
              <MeetingRowSkeleton />
              <MeetingRowSkeleton />
              <MeetingRowSkeleton />
            </>
          ) : filteredMeetings.length > 0 ? (
            filteredMeetings.map((meeting) => {
              const student = meeting.student as any
              const studentName = student?.user
                ? `${student.user.first_name} ${student.user.last_name}`
                : `Student #${meeting.student_id}`
              const { dateStr, timeStr } = formatMeetingTime(meeting.scheduled_at)
              const statusConfig = getStatusConfig(meeting.status)
              const isUpcoming =
                meeting.status === 'confirmed' || meeting.status === 'pending'

              return (
                <Card
                  key={meeting.id}
                  padding="md"
                  hover={isUpcoming}
                  className={isUpcoming ? 'border-indigo-100 dark:border-indigo-900/50' : ''}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700 shrink-0">
                        <Calendar className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                            {meeting.title}
                          </h3>
                          <Badge variant={statusConfig.variant} size="sm">
                            {statusConfig.label}
                          </Badge>
                        </div>
                        {meeting.description && (
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                            {meeting.description}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                            <Calendar className="w-3.5 h-3.5" />
                            {dateStr}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                            <Clock className="w-3.5 h-3.5" />
                            {timeStr}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                            <Clock className="w-3.5 h-3.5" />
                            {meeting.duration_minutes} min
                          </div>
                          {student && (
                            <div className="flex items-center gap-1.5">
                              <Avatar
                                name={studentName}
                                src={student.user?.avatar_url}
                                size="sm"
                              />
                              <span className="text-xs text-slate-600 dark:text-slate-300">
                                {studentName}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {meeting.meeting_link && (
                      <a
                        href={meeting.meeting_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center font-medium transition-all duration-200 text-xs px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 shrink-0 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                      >
                        <Video className="w-4 h-4 mr-1.5" />
                        Join
                      </a>
                    )}
                  </div>
                </Card>
              )
            })
          ) : (
            <Card>
              <EmptyState
                icon={<Calendar className="w-12 h-12" />}
                title="No meetings found"
                description={
                  searchQuery || statusFilter !== 'all'
                    ? 'No meetings match your search criteria. Try adjusting your filters.'
                    : "You don't have any scheduled meetings yet. Meetings will appear here once they're booked."
                }
              />
            </Card>
          )}
        </div>
      </Card>
    </PageContainer>
  )
}
