import { useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { Card, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { Input } from '@/components/ui/Input'
import { Progress as ProgressBar } from '@/components/ui/Progress'
import { StatCard } from '@/components/dashboard/StatCard'
import {
  useProgress,
  useProgressStats,
  useAddProgress,
} from '@/hooks/useStudent'
import { Plus, TrendingUp, Clock, Target } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const progressSchema = z.object({
  skill_name: z.string().min(2, 'Skill name is required'),
  proficiency_level: z.coerce.number().min(0).max(100, 'Must be between 0 and 100'),
  hours_spent: z.coerce.number().min(0, 'Cannot be negative'),
})

type ProgressForm = z.infer<typeof progressSchema>

export default function Progress() {
  const [showForm, setShowForm] = useState(false)
  const { data: progress, isLoading, error } = useProgress()
  const { data: stats } = useProgressStats()
  const addMutation = useAddProgress()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProgressForm>({
    resolver: zodResolver(progressSchema),
  })

  const onSubmit = (data: ProgressForm) => {
    addMutation.mutate(data, {
      onSuccess: () => {
        reset()
      },
    })
  }

  const progressList = progress?.data || []

  if (error) {
    return (
      <PageContainer title="Progress Tracking" subtitle="Monitor your skill development and learning journey">
        <EmptyState
          icon={<TrendingUp className="w-12 h-12" />}
          title="Failed to load progress"
          description="Please try refreshing the page."
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="Progress Tracking"
      subtitle="Monitor your skill development and learning journey"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <StatCard
          title="Total Skills"
          value={stats?.data?.total_skills || 0}
          icon={<Target className="w-5 h-5" />}
          color="indigo"
        />
        <StatCard
          title="Avg Proficiency"
          value={`${Math.round(stats?.data?.average_proficiency || 0)}%`}
          icon={<TrendingUp className="w-5 h-5" />}
          color="teal"
        />
        <StatCard
          title="Total Hours"
          value={stats?.data?.total_hours || 0}
          icon={<Clock className="w-5 h-5" />}
          color="blue"
        />
      </div>

      <Card>
        <CardHeader
          title="Add Progress"
          subtitle="Log a new skill entry"
          action={
              <Button
                variant={showForm ? 'outline' : 'primary'}
                size="sm"
                onClick={() => setShowForm(!showForm)}
              >
                <span className="flex items-center gap-1.5">
                  {showForm ? null : <Plus className="w-4 h-4" />}
                  {showForm ? 'Hide Form' : 'New Entry'}
                </span>
              </Button>
          }
        />
        {showForm && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Skill Name"
                placeholder="e.g. Python, Design, Communication"
                error={errors.skill_name?.message}
                {...register('skill_name')}
              />
              <Input
                label="Proficiency Level"
                type="number"
                placeholder="0 - 100"
                error={errors.proficiency_level?.message}
                {...register('proficiency_level')}
              />
              <Input
                label="Hours Spent"
                type="number"
                step="0.5"
                placeholder="e.g. 4.5"
                error={errors.hours_spent?.message}
                {...register('hours_spent')}
              />
            </div>
            <div className="flex items-center gap-3">
              <Button
                type="submit"
                isLoading={isSubmitting || addMutation.isPending}
              >
                <span className="flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> Add Progress
                </span>
              </Button>
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </Card>

      <Card>
        <CardHeader title="Skills Tracker" subtitle="Your proficiency over time" />
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-5 w-32 rounded-lg flex-shrink-0" />
                <Skeleton className="h-4 flex-1 rounded-full" />
                <Skeleton className="h-4 w-12 rounded-lg flex-shrink-0" />
              </div>
            ))}
          </div>
        ) : progressList.length > 0 ? (
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {progressList.map((entry: any) => (
              <div key={entry.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {entry.skill_name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {entry.hours_spent}h logged
                    </span>
                    <Badge
                      variant={
                        (entry.proficiency_level || 0) >= 70
                          ? 'success'
                          : (entry.proficiency_level || 0) >= 40
                            ? 'warning'
                            : 'danger'
                      }
                      size="sm"
                    >
                      {entry.proficiency_level || 0}%
                    </Badge>
                  </div>
                </div>
                <ProgressBar
                  value={entry.proficiency_level || 0}
                  size="md"
                  color={
                    (entry.proficiency_level || 0) >= 70
                      ? 'success'
                      : (entry.proficiency_level || 0) >= 40
                        ? 'warning'
                        : 'danger'
                  }
                  showLabel
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Target className="w-10 h-10" />}
            title="No progress tracked yet"
            description="Start adding your skills and hours to see your progress visualized here."
          />
        )}
      </Card>
    </PageContainer>
  )
}
