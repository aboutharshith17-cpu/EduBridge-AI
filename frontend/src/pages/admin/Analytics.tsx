import { useMemo } from 'react'
import { useAdminStats } from '@/hooks/useAdmin'
import { Card, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { StatCard } from '@/components/dashboard/StatCard'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageContainer } from '@/components/layout/PageContainer'
import { Users, GraduationCap, BookOpen, Briefcase, TrendingUp, RefreshCw } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const COLORS = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

function StatSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
      <Skeleton variant="text" className="w-24 mb-2" />
      <Skeleton variant="text" className="w-16 h-8 mb-3" />
      <Skeleton variant="rectangular" className="w-full h-2 rounded-full" />
    </div>
  )
}

function ChartSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
      <Skeleton variant="text" className="w-40 h-5 mb-4" />
      <Skeleton variant="rectangular" className="w-full h-[280px] rounded-xl" />
    </div>
  )
}

function MetricSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/40 rounded-xl">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" className="w-10 h-10" />
        <Skeleton variant="text" className="w-36 h-4" />
      </div>
      <Skeleton variant="text" className="w-12 h-7" />
    </div>
  )
}

export default function AdminAnalytics() {
  const { data: stats, isLoading, error, refetch } = useAdminStats()

  const chartData = useMemo(
    () => [
      { name: 'Students', count: stats?.total_students ?? 0, fill: '#4f46e5' },
      { name: 'Mentors', count: stats?.total_mentors ?? 0, fill: '#10b981' },
      { name: 'Resources', count: stats?.total_resources ?? 0, fill: '#f59e0b' },
      { name: 'Applications', count: stats?.total_applications ?? 0, fill: '#0ea5e9' },
      { name: 'Scholarships', count: stats?.total_scholarships ?? 0, fill: '#8b5cf6' },
      { name: 'Internships', count: stats?.total_internships ?? 0, fill: '#ef4444' },
    ],
    [stats]
  )

  const totalItems = useMemo(() => {
    return chartData.reduce((acc, item) => acc + (item.count || 0), 0)
  }, [chartData])

  const pieData = useMemo(
    () =>
      chartData
        .filter((item) => (item.count ?? 0) > 0)
        .map((item) => ({ name: item.name, value: item.count })),
    [chartData]
  )

  return (
    <PageContainer
      title="Analytics"
      subtitle="Platform insights, trends, and key metrics"
      actions={
        <Button variant="secondary" size="sm" onClick={() => refetch()} isLoading={isLoading}>
          <RefreshCw className="w-4 h-4 mr-1.5" />
          Refresh
        </Button>
      }
    >
      {error && (
        <Card padding="sm" className="border-red-200 bg-red-50 dark:bg-red-900/10">
          <p className="text-sm text-red-700 dark:text-red-400">Failed to load analytics data. Please try again later.</p>
        </Card>
      )}

      {/* Row 1: Full stat strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {isLoading || !stats
          ? Array.from({ length: 6 }).map((_, i) => <StatSkeleton key={i} />)
          : [
              { title: 'Total Users', value: stats.total_users, icon: <Users className="w-5 h-5" />, color: 'blue' as const },
              { title: 'Students', value: stats.total_students, icon: <GraduationCap className="w-5 h-5" />, color: 'green' as const },
              { title: 'Mentors', value: stats.total_mentors, icon: <BookOpen className="w-5 h-5" />, color: 'purple' as const },
              { title: 'Resources', value: stats.total_resources, icon: <Briefcase className="w-5 h-5" />, color: 'orange' as const },
              { title: 'Applications', value: stats.total_applications, icon: <TrendingUp className="w-5 h-5" />, color: 'teal' as const },
              { title: 'Active Mentors', value: stats.active_mentors, icon: <BookOpen className="w-5 h-5" />, color: 'indigo' as const },
            ].map((s) => (
              <StatCard key={s.title} title={s.title} value={s.value} icon={s.icon} color={s.color} />
            ))}
      </div>

      {/* Row 2: Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Bar chart — takes 2 cols */}
        <Card padding="md" className="xl:col-span-2">
          <CardHeader title="Platform Overview" subtitle="Item counts by category" />
          {isLoading || !stats ? (
            <ChartSkeleton />
          ) : (
            <div className="w-full" style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    axisLine={false}
                    tickLine={false}
                    width={40}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: '1px solid #e2e8f0',
                      fontSize: 13,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
                    {chartData.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        {/* Pie chart */}
        <Card padding="md">
          <CardHeader title="Distribution" subtitle="Breakdown of total platform items" />
          {isLoading || !stats ? (
            <ChartSkeleton />
          ) : pieData.length === 0 ? (
            <div className="flex items-center justify-center h-[280px]">
              <EmptyState
                icon={<TrendingUp className="w-10 h-10" />}
                title="No data"
                description="No items to display in distribution chart"
              />
            </div>
          ) : (
            <div className="w-full" style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    paddingAngle={3}
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} fillOpacity={0.85} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: '1px solid #e2e8f0',
                      fontSize: 13,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Custom legend */}
              <div className="flex flex-wrap gap-2 mt-3 justify-center">
                {pieData.map((entry, i) => (
                  <span key={entry.name} className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <span
                      className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: COLORS[i % COLORS.length] }}
                    />
                    {entry.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Row 3: Key Metrics + Breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Key Metrics */}
        <Card padding="md">
          <CardHeader title="Key Metrics" subtitle="Core platform statistics" />
          {isLoading || !stats ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => <MetricSkeleton key={i} />)}
            </div>
          ) : (
            <div className="space-y-3">
              {[
                { label: 'Total Users', value: stats.total_users, icon: <Users className="w-5 h-5" />, color: 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' },
                { label: 'Total Scholarships', value: stats.total_scholarships, icon: <GraduationCap className="w-5 h-5" />, color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' },
                { label: 'Total Internships', value: stats.total_internships, icon: <Briefcase className="w-5 h-5" />, color: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/20' },
                { label: 'Active Mentors', value: stats.active_mentors, icon: <BookOpen className="w-5 h-5" />, color: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20' },
                { label: 'Pending Verifications', value: stats.pending_verifications, icon: <Users className="w-5 h-5" />, color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20' },
              ].map((metric) => {
                const pct = totalItems > 0 ? Math.round((metric.value / Math.max(totalItems, 1)) * 100) : 0
                return (
                  <div key={metric.label} className="p-4 bg-slate-50 dark:bg-slate-700/40 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className={`p-2 rounded-lg ${metric.color}`}>{metric.icon}</span>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{metric.label}</span>
                      </div>
                      <span className="text-xl font-bold text-slate-900 dark:text-slate-100">{metric.value.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden ml-11">
                      <div
                        className="h-full bg-primary-500 dark:bg-primary-400 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Card>

        {/* Breakdown */}
        <Card padding="md">
          <CardHeader title="Resource Breakdown" subtitle="User role and resource distribution" />
          {isLoading || !stats ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/40 rounded-xl">
                  <Skeleton variant="circular" className="w-9 h-9 shrink-0" />
                  <div className="flex-1">
                    <Skeleton variant="text" className="w-32 h-4 mb-1.5" />
                    <Skeleton variant="rectangular" className="w-full h-1.5 rounded-full" />
                  </div>
                  <Skeleton variant="text" className="w-10 h-5" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {[
                { label: 'Students', count: stats.total_students, color: 'bg-primary-600', total: stats.total_users },
                { label: 'Mentors', count: stats.total_mentors, color: 'bg-emerald-500', total: stats.total_users },
                { label: 'Admins', count: 0, color: 'bg-amber-500', total: stats.total_users },
                { label: 'Resources', count: stats.total_resources, color: 'bg-sky-500', total: undefined },
                { label: 'Total Applications', count: stats.total_applications, color: 'bg-violet-500', total: undefined },
              ].map((item) => {
                const pct = item.total && item.total > 0 ? Math.round((item.count / item.total) * 100) : null
                return (
                  <div key={item.label} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/40 rounded-xl">
                    <div className={`h-9 w-9 rounded-lg ${item.color} bg-opacity-10 flex items-center justify-center shrink-0`} style={{ backgroundColor: item.color.replace('bg-', 'bg-opacity-10 ') }}>
                      <div className={`h-3 w-3 rounded-sm ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item.label}</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{item.count.toLocaleString()}</span>
                      </div>
                      {pct !== null && (
                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full transition-all duration-500`}
                            style={{ width: `${Math.min(pct, 100)}%` }}
                          />
                        </div>
                      )}
                    </div>
                    {pct !== null && <Badge variant="default" size="sm">{pct}%</Badge>}
                  </div>
                )
              })}
            </div>
          )}
        </Card>
      </div>
    </PageContainer>
  )
}
