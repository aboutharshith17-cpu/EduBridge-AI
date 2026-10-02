import { PageContainer } from '@/components/layout/PageContainer'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { Progress as ProgressBar } from '@/components/ui/Progress'
import { useRecommendations } from '@/hooks/useStudent'
import { Lightbulb, Target, BookOpen } from 'lucide-react'

const typeConfig: Record<
  string,
  { label: string; variant: any; icon: any }
> = {
  career_path: { label: 'Career Path', variant: 'primary', icon: Target },
  skill: { label: 'Skill', variant: 'info', icon: Lightbulb },
  resource: { label: 'Resource', variant: 'success', icon: BookOpen },
  default: { label: 'Recommendation', variant: 'default', icon: Lightbulb },
}

export default function Recommendations() {
  const { data, isLoading, error } = useRecommendations()
  const recommendations = data?.data || []

  if (error) {
    return (
      <PageContainer title="AI Career Recommendations" subtitle="Personalized career paths based on your skills and interests">
        <EmptyState
          icon={<Lightbulb className="w-12 h-12" />}
          title="Failed to load recommendations"
          description="Please try refreshing the page."
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="AI Career Recommendations"
      subtitle="Personalized career paths based on your skills and interests"
    >
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} padding="lg">
              <div className="flex items-start gap-4">
                <Skeleton className="h-12 w-12 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-5 w-2/3 rounded-lg" />
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-3 w-1/2 rounded-full" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : recommendations.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recommendations.map((rec: any, idx: number) => {
            const conf = Math.round((rec.confidence_score || 0) * 100)
            const config = typeConfig[rec.type] || typeConfig.default
            const TypeIcon = config.icon
            return (
              <Card key={idx} hover padding="lg">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex-shrink-0">
                    <TypeIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {rec.title}
                      </h3>
                      <Badge variant={config.variant} size="sm">
                        {config.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-3">
                      {rec.description}
                    </p>
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                          Confidence Score
                        </span>
                        <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                          {conf}%
                        </span>
                      </div>
                      <ProgressBar value={conf} color="primary" size="md" />
                    </div>
                    {rec.resources && rec.resources.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                          Related Resources
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {rec.resources.slice(0, 4).map((resource: string, i: number) => (
                            <Badge key={i} variant="default" size="sm">
                              {resource}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      ) : (
        <EmptyState
          icon={<Lightbulb className="w-12 h-12" />}
          title="No recommendations available"
          description="Complete your profile and explore resources to receive personalized AI recommendations."
        />
      )}
    </PageContainer>
  )
}
