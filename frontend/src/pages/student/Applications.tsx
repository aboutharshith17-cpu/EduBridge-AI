import { useMemo } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { useApplications } from '@/hooks/useStudent'
import { FileText, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const statusConfig: Record<
  string,
  { variant: any; icon: any; label: string }
> = {
  accepted: { variant: 'success', icon: CheckCircle, label: 'Accepted' },
  rejected: { variant: 'danger', icon: XCircle, label: 'Rejected' },
  pending: { variant: 'warning', icon: Clock, label: 'Pending' },
  under_review: { variant: 'info', icon: AlertCircle, label: 'Under Review' },
}

export default function Applications() {
  const { data, isLoading, error } = useApplications()
  const applications = data?.data || []

  if (error) {
    return (
      <PageContainer title="My Applications" subtitle="Track your scholarship and internship applications">
        <EmptyState
          icon={<FileText className="w-12 h-12" />}
          title="Failed to load applications"
          description="Please try refreshing the page."
        />
      </PageContainer>
    )
  }

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    applications.forEach((app: any) => {
      counts[app.status] = (counts[app.status] || 0) + 1
    })
    return counts
  }, [applications])

  return (
    <PageContainer title="My Applications" subtitle="Track your scholarship and internship applications">
      {isLoading ? (
        <Card>
          <div className="overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-700/50 px-6 py-3">
              <div className="flex gap-4">
                {['Type', 'Title', 'Status', 'Applied On'].map((h) => (
                  <Skeleton key={h} className="h-4 w-24 rounded" />
                ))}
              </div>
            </div>
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="px-6 py-4 flex gap-4">
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-4 w-40 rounded" />
                  <Skeleton className="h-4 w-20 rounded-full" />
                  <Skeleton className="h-4 w-28 rounded" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      ) : (
        <>
          {applications.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {Object.entries(statusCounts).map(([status, count]) => {
                const config = statusConfig[status] || { variant: 'default' as any, label: status }
                return (
                  <Badge key={status} variant={config.variant} size="md">
                    {config.label}: {count}
                  </Badge>
                )
              })}
            </div>
          )}

          <Card>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700/50">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Applied On
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {applications.map((app: any) => {
                    const config = statusConfig[app.status] || statusConfig.pending
                    const StatusIcon = config.icon
                    return (
                      <tr
                        key={app.id}
                        className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className="p-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg">
                              <FileText className="w-4 h-4 text-slate-500" />
                            </div>
                            <span className="text-sm font-medium text-slate-900 dark:text-slate-100 capitalize">
                              {app.scholarship_id ? 'Scholarship' : 'Internship'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                          {app.scholarship_id ? `Scholarship #${app.scholarship_id}` : `Internship #${app.internship_id}`}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <StatusIcon className="w-4 h-4" />
                            <Badge variant={config.variant} size="sm">
                              {config.label}
                            </Badge>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                          {app.applied_at
                            ? new Date(app.applied_at).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })
                            : '—'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-slate-200 dark:divide-slate-700">
              {applications.map((app: any) => {
                const config = statusConfig[app.status] || statusConfig.pending
                return (
                  <div key={app.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                          <FileText className="w-5 h-5 text-slate-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {app.scholarship_id ? 'Scholarship' : 'Internship'} #{app.scholarship_id || app.internship_id}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {app.applied_at
                              ? new Date(app.applied_at).toLocaleDateString()
                              : 'No date'}
                          </p>
                        </div>
                      </div>
                      <Badge variant={config.variant} size="sm">
                        {config.label}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>

            {applications.length === 0 && (
              <EmptyState
                icon={<FileText className="w-12 h-12" />}
                title="No applications yet"
                description="Start exploring scholarships and internships to submit your first application."
              />
            )}
          </Card>
        </>
      )}
    </PageContainer>
  )
}
