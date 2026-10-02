import { useEffect } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { Card, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { Input } from '@/components/ui/Input'
import { Avatar } from '@/components/ui/Avatar'
import {
  useStudentProfile,
  useUpdateStudentProfile,
} from '@/hooks/useStudent'
import { Camera, CheckCircle2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const profileSchema = z.object({
  first_name: z.string().min(2, 'First name is required'),
  last_name: z.string().min(2, 'Last name is required'),
  phone: z.string().optional().or(z.literal('')),
  university: z.string().optional().or(z.literal('')),
  degree: z.string().optional().or(z.literal('')),
  graduation_year: z.coerce.number().optional().or(z.literal('')),
  cgpa: z.coerce.number().optional().or(z.literal('')),
  skills: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
})

type ProfileForm = z.infer<typeof profileSchema>

export default function Profile() {
  const { data: profile, isLoading, error } = useStudentProfile()
  const updateMutation = useUpdateStudentProfile()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      phone: '',
      university: '',
      degree: '',
      graduation_year: '',
      cgpa: '',
      skills: [],
      interests: [],
    },
  })

  useEffect(() => {
    if (profile?.data) {
      const p = profile.data
      reset({
        first_name: p.first_name || p.user?.first_name || '',
        last_name: p.last_name || p.user?.last_name || '',
        phone: p.phone || p.user?.phone || '',
        university: p.university || '',
        degree: p.degree || '',
        graduation_year: p.graduation_year || '',
        cgpa: p.cgpa || '',
        skills: p.skills || [],
        interests: p.interests || [],
      })
    }
  }, [profile, reset])

  const onSubmit = (data: ProfileForm) => {
    updateMutation.mutate(data)
  }

  const fullName =
    profile?.data?.user
      ? `${profile.data.user.first_name} ${profile.data.user.last_name}`
      : profile?.data?.first_name
        ? `${profile.data.first_name} ${profile.data.last_name || ''}`
        : 'Student'
  const avatarName = fullName.trim() || 'Student'
  const email = profile?.data?.user?.email || profile?.data?.user?.email || ''

  if (error) {
    return (
      <PageContainer title="My Profile" subtitle="Manage your personal information">
        <EmptyState
          icon={<CheckCircle2 className="w-12 h-12" />}
          title="Failed to load profile"
          description="Please try refreshing the page."
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer title="My Profile" subtitle="Manage your personal information">
      {isLoading ? (
        <div className="max-w-4xl space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-48 rounded-lg" />
              <Skeleton className="h-4 w-64 rounded-lg" />
            </div>
          </div>
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-12 rounded-xl" />
              ))}
            </div>
          </Card>
        </div>
      ) : (
        <div className="max-w-4xl space-y-6">
          <Card>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <div className="relative">
                <Avatar src={profile?.data?.user?.avatar_url} name={avatarName} size="xl" />
                <button
                  type="button"
                  className="absolute -bottom-1 -right-1 p-1.5 bg-primary-600 text-white rounded-full shadow-sm hover:bg-primary-700 transition-colors"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-center sm:text-left flex-1 min-w-0">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {avatarName}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{email}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                  <Badge variant="primary" size="sm">
                    Student
                  </Badge>
                  {profile?.data?.degree && (
                    <Badge variant="info" size="sm">
                      {profile.data.degree}
                    </Badge>
                  )}
                  {profile?.data?.university && (
                    <Badge variant="default" size="sm">
                      {profile.data.university}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Personal Information"
              subtitle="Update your basic details"
            />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="First Name"
                  error={errors.first_name?.message}
                  {...register('first_name')}
                />
                <Input
                  label="Last Name"
                  error={errors.last_name?.message}
                  {...register('last_name')}
                />
              </div>

              <Input
                label="Phone Number"
                placeholder="e.g. +1 (555) 000-0000"
                error={errors.phone?.message}
                {...register('phone')}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="University"
                  placeholder="e.g. Stanford University"
                  error={errors.university?.message}
                  {...register('university')}
                />
                <Input
                  label="Degree"
                  placeholder="e.g. B.S. Computer Science"
                  error={errors.degree?.message}
                  {...register('degree')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Graduation Year"
                  type="number"
                  placeholder="e.g. 2026"
                  error={errors.graduation_year?.message}
                  {...register('graduation_year')}
                />
                <Input
                  label="CGPA"
                  type="number"
                  step="0.01"
                  placeholder="e.g. 3.85"
                  error={errors.cgpa?.message}
                  {...register('cgpa')}
                />
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <Button
                  type="submit"
                  isLoading={isSubmitting || updateMutation.isPending}
                >
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Save Changes
                  </span>
                </Button>
                {!isDirty && (
                  <span className="text-xs text-slate-400">No unsaved changes</span>
                )}
              </div>
            </form>
          </Card>
        </div>
      )}
    </PageContainer>
  )
}
