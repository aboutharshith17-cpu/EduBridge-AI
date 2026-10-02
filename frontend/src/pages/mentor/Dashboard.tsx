import { Users, Calendar, BookOpen, Award } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { Card, CardHeader } from '@/components/ui/Card'
import { StatCard } from '@/components/dashboard/StatCard'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { Link } from 'react-router-dom'
import { useMentorDashboard, useMentorStudents, useMentorMeetings } from '@/hooks/useMentor'
import type { MentorDashboard, StudentProfile, Meeting } from '@/types'

function StatSkeleton() {
  return (
    <Card padding="md">
      <div className="flex items-center justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" className="w-20" />
          <Skeleton variant="text" className="w-12 h-8" />
        </div>
        <Skeleton variant="circular" className="h-12 w-12" />
      </div>
    </Card>
  )
}

function MeetingRowSkeleton() {
  return (
    <Card padding="md">
      <div className="flex items-start gap-4">
        <Skeleton variant="circular" className="h-10 w-10 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-48" />
          <Skeleton variant="text" className="w-72" />
          <Skeleton variant="text" className="w-32" />
        </div>
      </div>
    </Card>
  )
}

function StudentRowSkeleton() {
  return (
    <Card padding="md">
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" className="h-12 w-12" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-32" />
          <Skeleton variant="text" className="w-48" />
        </div>
      </div>
    </Card>
  )
}

export default function MentorDashboard() {
  const { data: dashboard, isLoading: dashboardLoading, error: dashboardError } = useMentorDashboard()
  const { data: students, isLoading: studentsLoading } = useMentorStudents()
  const { data: meetings, isLoading: meetingsLoading } = useMentorMeetings()

  const dashboardData: MentorDashboard | undefined = dashboard?.data
  const studentsList: StudentProfile[] = students?.data || []
  const meetingsList: Meeting[] = meetings?.data || []

  const upcomingMeetings = meetingsList
    .filter((m) => m.status === 'confirmed' || m.status === 'pending')
    .slice(0, 3)

  const recentStudents = studentsList.slice(0, 4)

  if (dashboardError) {
    return (
      <PageContainer
        title="Mentor Dashboard"
        subtitle="Welcome back! Here's your mentoring overview."
      >
        <EmptyState
          icon={<Award className="w-12 h-12" />}
          title="Unable to load dashboard"
          description="We couldn't fetch your dashboard data. Please try again later."
          action={
            <Button onClick={() => window.location.reload()}>Retry</Button>
          }
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="Welcome back"
      subtitle="Here's what's happening with your mentoring sessions today."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {dashboardLoading ? (
          <>
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
          </>
        ) : (
          <>
            <StatCard
              title="Total Students"
              value={dashboardData?.total_students || 0}
              icon={<Users className="w-6 h-6" />}
              color="indigo"
            />
            <StatCard
              title="Pending Requests"
              value={dashboardData?.pending_requests || 0}
              icon={<BookOpen className="w-6 h-6" />}
              color="orange"
            />
            <StatCard
              title="Upcoming Meetings"
              value={dashboardData?.upcoming_meetings || 0}
              icon={<Calendar className="w-6 h-6" />}
              color="green"
            />
            <StatCard
              title="Resources Uploaded"
              value={dashboardData?.resources_uploaded || 0}
              icon={<BookOpen className="w-6 h-6" />}
              color="blue"
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card padding="lg" className="xl:col-span-2">
          <CardHeader
            title="Upcoming Meetings"
            subtitle="Your scheduled mentoring sessions"
            action={
              <Link
                to="/mentor/meetings"
                className="inline-flex items-center justify-center font-medium transition-all duration-200 text-xs px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                View all
              </Link>
            }
          />
          <div className="space-y-3">
            {meetingsLoading ? (
              <>
                <MeetingRowSkeleton />
                <MeetingRowSkeleton />
                <MeetingRowSkeleton />
              </>
            ) : upcomingMeetings.length > 0 ? (
              upcomingMeetings.map((meeting) => {
                const student = meeting.student as StudentProfile | undefined
                const studentName = student?.user
                  ? `${student.user.first_name} ${student.user.last_name}`
                  : `Student #${meeting.student_id}`

                return (
                  <div
                    key={meeting.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/60 dark:bg-slate-800/60 dark:border-slate-700"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30">
                        <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                          {meeting.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {studentName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 pl-10 sm:pl-0">
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {new Date(meeting.scheduled_at).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <Badge
                        variant={
                          meeting.status === 'confirmed'
                            ? 'success'
                            : meeting.status === 'pending'
                            ? 'warning'
                            : meeting.status === 'completed'
                            ? 'primary'
                            : 'danger'
                        }
                      >
                        {meeting.status}
                      </Badge>
                    </div>
                  </div>
                )
              })
            ) : (
              <EmptyState
                icon={<Calendar className="w-8 h-8" />}
                title="No upcoming meetings"
                description="You don't have any scheduled meetings yet."
              />
            )}
          </div>
        </Card>

        <Card padding="lg">
          <CardHeader
            title="My Students"
            subtitle="Students you're mentoring"
            action={
              <Link
                to="/mentor/students"
                className="inline-flex items-center justify-center font-medium transition-all duration-200 text-xs px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                View all
              </Link>
            }
          />
          <div className="space-y-3">
            {studentsLoading ? (
              <>
                <StudentRowSkeleton />
                <StudentRowSkeleton />
                <StudentRowSkeleton />
                <StudentRowSkeleton />
              </>
            ) : recentStudents.length > 0 ? (
              recentStudents.map((student) => {
                const user = student.user
                const name = user
                  ? `${user.first_name} ${user.last_name}`
                  : `Student #${student.user_id}`

                return (
                  <div
                    key={student.id}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <Avatar
                      name={name}
                      src={user?.avatar_url}
                      size="md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 dark:text-slate-100 text-sm truncate">
                        {name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <Link to={`/mentor/students/${student.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                )
              })
            ) : (
              <EmptyState
                icon={<Users className="w-8 h-8" />}
                title="No students yet"
                description="You haven't accepted any student requests yet."
              />
            )}
          </div>
        </Card>
      </div>

      <Card padding="lg">
        <CardHeader title="Quick Actions" subtitle="Common tasks to help you manage your mentoring" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            {
              label: 'Manage Students',
              href: '/mentor/students',
              icon: <Users className="w-6 h-6" />,
              color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
              hoverColor: 'hover:bg-indigo-100 dark:hover:bg-indigo-900/50',
            },
            {
              label: 'Upload Resources',
              href: '/mentor/resources',
              icon: <BookOpen className="w-6 h-6" />,
              color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
              hoverColor: 'hover:bg-emerald-100 dark:hover:bg-emerald-900/50',
            },
            {
              label: 'Schedule Meetings',
              href: '/mentor/meetings',
              icon: <Calendar className="w-6 h-6" />,
              color: 'bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400',
              hoverColor: 'hover:bg-sky-100 dark:hover:bg-sky-900/50',
            },
            {
              label: 'View Feedback',
              href: '/mentor/feedback',
              icon: <Award className="w-6 h-6" />,
              color: 'bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
              hoverColor: 'hover:bg-violet-100 dark:hover:bg-violet-900/50',
            },
          ].map((action) => (
            <Link
              key={action.label}
              to={action.href}
              className={`flex flex-col items-center justify-center gap-3 p-5 rounded-xl border border-slate-100 dark:border-slate-700 transition-all duration-200 ${action.color} ${action.hoverColor}`}
            >
              {action.icon}
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </Card>
    </PageContainer>
  )
}
