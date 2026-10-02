import { useMemo } from 'react'
import { BookOpen, GraduationCap, Briefcase, Calendar, TrendingUp, ArrowRight } from 'lucide-react'
import { PageContainer } from '@/components/layout/PageContainer'
import { StatCard } from '@/components/dashboard/StatCard'
import { Card, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { useStudentDashboard, useRecommendations, useStudentProfile } from '@/hooks/useStudent'

export default function Dashboard() {
  const { data: dashboard, error: dashboardError } = useStudentDashboard()
  const { data: recommendations, isLoading: recsLoading } = useRecommendations()
  const { data: profile } = useStudentProfile()

  const firstName = profile?.data?.user?.first_name || profile?.data?.first_name || 'Student'

  const greeting = useMemo(() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }, [])

  if (dashboardError) {
    return (
      <PageContainer title="Dashboard" subtitle="Overview of your learning journey">
        <EmptyState
          icon={<TrendingUp className="w-12 h-12" />}
          title="Unable to load dashboard"
          description="Something went wrong while fetching your dashboard data."
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title={`${greeting}, ${firstName}`}
      subtitle="Here's what's happening with your learning journey today"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Applications"
          value={dashboard?.data?.total_applications || 0}
          icon={<Briefcase className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          title="Pending"
          value={dashboard?.data?.pending_applications || 0}
          icon={<Calendar className="w-6 h-6" />}
          color="orange"
        />
        <StatCard
          title="Upcoming Meetings"
          value={dashboard?.data?.upcoming_meetings || 0}
          icon={<Calendar className="w-6 h-6" />}
          color="green"
        />
        <StatCard
          title="Resources Viewed"
          value={dashboard?.data?.resources_accessed || 0}
          icon={<BookOpen className="w-6 h-6" />}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader
              title="Recent Recommendations"
              subtitle="Personalized suggestions from AI"
              action={
                <Button variant="ghost" size="sm">
                  <span className="flex items-center gap-1.5">
                    View all <ArrowRight className="w-4 h-4" />
                  </span>
                </Button>
              }
            />
            {recsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    <Skeleton className="h-10 w-10 rounded-xl flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4 rounded-lg" />
                      <Skeleton className="h-3 w-full rounded-lg" />
                      <Skeleton className="h-3 w-1/2 rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recommendations?.data && recommendations.data.length > 0 ? (
              <div className="space-y-4">
                {recommendations.data.slice(0, 3).map((rec: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700"
                  >
                    <div className="p-2.5 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {rec.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                        {rec.description}
                      </p>
                    </div>
                    <Badge variant="primary" size="sm">
                      {Math.round((rec.confidence_score || 0) * 100)}%
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<TrendingUp className="w-10 h-10" />}
                title="No recommendations yet"
                description="Complete your profile to get personalized recommendations."
              />
            )}
          </Card>
        </div>

        <Card>
          <CardHeader title="Quick Actions" subtitle="Jump to what matters" />
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Find Scholarships', href: '/student/scholarships', icon: GraduationCap, gradient: 'from-indigo-500 to-blue-600' },
              { label: 'Explore Internships', href: '/student/internships', icon: Briefcase, gradient: 'from-sky-500 to-indigo-600' },
              { label: 'Schedule Meeting', href: '/student/meetings', icon: Calendar, gradient: 'from-emerald-500 to-teal-600' },
              { label: 'Browse Resources', href: '/student/resources', icon: BookOpen, gradient: 'from-violet-500 to-purple-600' },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="group flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-br text-white transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                style={{
                  backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                }}
              >
                <div className={`p-3 rounded-xl bg-white/20 backdrop-blur-sm`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-center leading-tight">{action.label}</span>
              </a>
            ))}
          </div>
        </Card>
      </div>
    </PageContainer>
  )
}
