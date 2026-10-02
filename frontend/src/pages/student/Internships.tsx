import { PageContainer } from '@/components/layout/PageContainer'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { useInternships } from '@/hooks/useStudent'
import { Briefcase, ExternalLink, Calendar, MapPin, DollarSign, Clock } from 'lucide-react'

export default function Internships() {
  const { data, isLoading, error } = useInternships()
  const internships = data?.data || []

  if (error) {
    return (
      <PageContainer title="Internship Tracker" subtitle="Find internships to kickstart your career">
        <EmptyState
          icon={<Briefcase className="w-12 h-12" />}
          title="Failed to load internships"
          description="Please try refreshing the page."
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer title="Internship Tracker" subtitle="Find internships to kickstart your career">
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} padding="lg">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <Skeleton className="h-5 w-2/3 rounded-lg" />
                  <Skeleton className="h-4 w-1/2 rounded-lg" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-3/4 rounded-lg" />
                <Skeleton className="h-4 w-1/2 rounded-lg" />
              </div>
              <Skeleton className="h-4 w-full rounded-lg mt-4" />
              <Skeleton className="h-10 w-full rounded-xl mt-4" />
            </Card>
          ))}
        </div>
      ) : internships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {internships.map((internship: any) => {
            const isClosed = !internship.is_active
            const isExpired = internship.deadline ? new Date(internship.deadline) < new Date() : false
            return (
              <Card key={internship.id} hover padding="lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {internship.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {internship.company}
                    </p>
                  </div>
                  <Badge variant={isClosed || isExpired ? 'danger' : 'success'} size="sm">
                    {isClosed ? 'Closed' : isExpired ? 'Expired' : 'Active'}
                  </Badge>
                </div>

                <div className="mt-4 space-y-2.5">
                  {internship.location && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {internship.location}
                    </div>
                  )}
                  {internship.stipend && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <DollarSign className="w-4 h-4 text-slate-400" />
                      <span className="font-medium">{internship.stipend}</span>
                    </div>
                  )}
                  {internship.duration_months && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {internship.duration_months} months
                    </div>
                  )}
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 line-clamp-2">
                  {internship.description}
                </p>

                {internship.deadline && (
                  <p className={`text-sm mt-3 flex items-center gap-1.5 ${isExpired ? 'text-red-600 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'}`}>
                    <Clock className="w-4 h-4" />
                    Deadline:{' '}
                    {new Date(internship.deadline).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                )}

                {internship.application_url && (
                  <a
                  href={internship.application_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 w-full mt-4 text-sm px-4 py-2.5 rounded-xl font-medium transition-all duration-200 bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50"
                >
                  {isClosed || isExpired ? 'View Details' : 'Apply Now'} <ExternalLink className="w-4 h-4" />
                </a>
                )}
              </Card>
            )
          })}
        </div>
      ) : (
        <EmptyState
          icon={<Briefcase className="w-12 h-12" />}
          title="No internships available"
          description="New internship opportunities will appear here when they become available."
        />
      )}
    </PageContainer>
  )
}
