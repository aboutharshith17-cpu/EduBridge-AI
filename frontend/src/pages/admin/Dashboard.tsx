import { useMemo } from 'react'
import { Users, GraduationCap, BookOpen, Briefcase, TrendingUp, Shield, UserCheck, Activity } from 'lucide-react'
import { useAdminStats } from '@/hooks/useAdmin'
import { StatCard } from '@/components/dashboard/StatCard'
import { Card, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import { PageContainer } from '@/components/layout/PageContainer'
import { Link } from 'react-router-dom'
import { AdminStats } from '@/types'

const SKELETON_CARDS = Array.from({ length: 8 })

export default function AdminDashboard() {
  const { data: stats, isLoading, error, refetch } = useAdminStats()

  const quickActions = useMemo(
    () => [
      { label: 'Manage Users', description: 'View and manage all platform users', to: '/admin/users', color: 'bg-primary-600' },
      { label: 'Manage Scholarships', description: 'Add and manage scholarship listings', to: '/admin/scholarships', color: 'bg-emerald-600' },
      { label: 'Manage Internships', description: 'Add and manage internship opportunities', to: '/admin/internships', color: 'bg-sky-600' },
      { label: 'Platform Analytics', description: 'View platform insights and metrics', to: '/admin/analytics', color: 'bg-violet-600' },
    ],
    []
  )

  const isLoadingState = isLoading || !stats

  return (
    <PageContainer
      title="Admin Dashboard"
      subtitle="Platform overview and management"
      actions={
        <Button variant="secondary" size="sm" onClick={() => refetch()} isLoading={isLoading}>
          Refresh
        </Button>
      }
    >
      {error && (
        <Card padding="sm" className="border-red-200 bg-red-50 dark:bg-red-900/10">
          <p className="text-sm text-red-700 dark:text-red-400">Failed to load dashboard stats. Please try again later.</p>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoadingState
          ? SKELETON_CARDS.map((_, i) => (
              <Card key={i} padding="md">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Skeleton variant="text" className="w-24 mb-2" />
                    <Skeleton variant="text" className="w-16 h-8" />
                  </div>
                  <Skeleton variant="circular" className="w-11 h-11" />
                </div>
              </Card>
            ))
          : [
              { title: 'Total Users', value: (stats as AdminStats).total_users ?? 0, icon: <Users className="w-5 h-5" />, color: 'blue' as const },
              { title: 'Students', value: (stats as AdminStats).total_students ?? 0, icon: <GraduationCap className="w-5 h-5" />, color: 'green' as const },
              { title: 'Mentors', value: (stats as AdminStats).total_mentors ?? 0, icon: <BookOpen className="w-5 h-5" />, color: 'purple' as const },
              { title: 'Resources', value: (stats as AdminStats).total_resources ?? 0, icon: <Briefcase className="w-5 h-5" />, color: 'orange' as const },
              { title: 'Scholarships', value: (stats as AdminStats).total_scholarships ?? 0, icon: <GraduationCap className="w-5 h-5" />, color: 'pink' as const },
              { title: 'Internships', value: (stats as AdminStats).total_internships ?? 0, icon: <Briefcase className="w-5 h-5" />, color: 'indigo' as const },
              { title: 'Applications', value: (stats as AdminStats).total_applications ?? 0, icon: <TrendingUp className="w-5 h-5" />, color: 'teal' as const },
              { title: 'Pending Verifications', value: (stats as AdminStats).pending_verifications ?? 0, icon: <Shield className="w-5 h-5" />, color: 'red' as const },
            ].map((stat) => (
              <StatCard key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
            ))}
      </div>

      {/* Two-column layout: Quick Actions + Overview */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card padding="md" className="xl:col-span-2">
          <CardHeader title="Quick Actions" subtitle="Frequently used admin tools" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.to}
                to={action.to}
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 group"
              >
                <div className={`h-10 w-1.5 rounded-full ${action.color} shrink-0`} />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                    {action.label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Side Panel: Platform Health */}
        <Card padding="md">
          <CardHeader title="Platform Health" subtitle="Key operational metrics" />
          {isLoadingState ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton variant="text" className="w-28" />
                  <Skeleton variant="text" className="w-12" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {[
                { label: 'Active Mentors', value: (stats as AdminStats).active_mentors ?? 0, icon: <UserCheck className="w-4 h-4" />, color: 'text-green-600 bg-green-50 dark:bg-green-900/20' },
                { label: 'Pending Verifications', value: (stats as AdminStats).pending_verifications ?? 0, icon: <Shield className="w-4 h-4" />, color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' },
                { label: 'Total Applications', value: (stats as AdminStats).total_applications ?? 0, icon: <Activity className="w-4 h-4" />, color: 'text-primary-600 bg-primary-50 dark:bg-primary-900/20' },
                { label: 'Total Resources', value: (stats as AdminStats).total_resources ?? 0, icon: <BookOpen className="w-4 h-4" />, color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className={`p-1.5 rounded-md ${item.color}`}>{item.icon}</span>
                    <span className="text-sm text-slate-700 dark:text-slate-300">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </PageContainer>
  )
}
