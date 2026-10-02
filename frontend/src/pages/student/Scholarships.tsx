import { PageContainer } from '@/components/layout/PageContainer'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { useScholarships } from '@/hooks/useStudent'
import { GraduationCap, ExternalLink, Calendar, DollarSign, Clock } from 'lucide-react'

export default function Scholarships() {
  const { data, isLoading, error } = useScholarships()
  const scholarships = data?.data || []

  if (error) {
    return (
      <PageContainer title="Scholarship Finder" subtitle="Discover scholarships tailored to your profile">
        <EmptyState
          icon={<GraduationCap className="w-12 h-12" />}
          title="Failed to load scholarships"
          description="Please try refreshing the page."
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer title="Scholarship Finder" subtitle="Discover scholarships tailored to your profile">
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} padding="lg">
              <div className="flex items-start gap-4">
                <Skeleton className="h-12 w-12 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-5 w-2/3 rounded-lg" />
                  <Skeleton className="h-4 w-1/2 rounded-lg" />
                  <Skeleton className="h-4 w-full rounded-lg" />
                </div>
                <Skeleton className="h-10 w-24 rounded-xl flex-shrink-0" />
              </div>
            </Card>
          ))}
        </div>
      ) : scholarships.length > 0 ? (
        <div className="space-y-4">
          {scholarships.map((scholarship: any) => {
            const isExpired = scholarship.deadline ? new Date(scholarship.deadline) < new Date() : false
            return (
              <Card key={scholarship.id} hover padding="lg">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex-shrink-0">
                      <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 truncate">
                          {scholarship.title}
                        </h3>
                        <Badge variant={isExpired ? 'danger' : 'success'} size="sm">
                          {isExpired ? 'Expired' : 'Active'}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Provider: {scholarship.provider}
                      </p>
                      {scholarship.amount && (
                        <div className="flex items-center gap-1.5 mt-2">
                          <DollarSign className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                          <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                            ${scholarship.amount.toLocaleString()}
                          </span>
                        </div>
                      )}
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                        {scholarship.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-500 dark:text-slate-400">
                        {scholarship.deadline && (
                          <span className={`flex items-center gap-1.5 ${isExpired ? 'text-red-600 dark:text-red-400' : ''}`}>
                            <Calendar className="w-4 h-4" />
                            {new Date(scholarship.deadline).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        )}
                        {scholarship.eligibility_criteria && (
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            Eligibility details available
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {scholarship.application_url && (
                    <a
                      href={scholarship.application_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 text-sm px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex-shrink-0 bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50"
                    >
                      {isExpired ? 'View Details' : 'Apply Now'} <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      ) : (
        <EmptyState
          icon={<GraduationCap className="w-12 h-12" />}
          title="No scholarships available"
          description="New scholarship opportunities will appear here when they become available."
        />
      )}
    </PageContainer>
  )
}
