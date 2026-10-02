import { useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { Input } from '@/components/ui/Input'
import { Users, Search, Mail, GraduationCap } from 'lucide-react'
import { useMentorStudents } from '@/hooks/useMentor'
import type { StudentProfile } from '@/types'

function StudentCardSkeleton() {
  return (
    <Card padding="md">
      <div className="flex items-start gap-4">
        <Skeleton variant="circular" className="h-14 w-14" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-32" />
          <Skeleton variant="text" className="w-48" />
          <Skeleton variant="text" className="w-24" />
        </div>
      </div>
    </Card>
  )
}

export default function MentorStudents() {
  const { data, isLoading, error } = useMentorStudents()
  const [searchQuery, setSearchQuery] = useState('')

  const studentsList: StudentProfile[] = data?.data || []

  const filteredStudents = studentsList.filter((student) => {
    if (!searchQuery.trim()) return true
    const user = student.user
    const name = user ? `${user.first_name} ${user.last_name}` : ''
    const email = user?.email || ''
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  if (error) {
    return (
      <PageContainer
        title="My Students"
        subtitle="View and manage your students"
      >
        <EmptyState
          icon={<Users className="w-12 h-12" />}
          title="Unable to load students"
          description="We couldn't fetch your students. Please try again later."
          action={<Button onClick={() => window.location.reload()}>Retry</Button>}
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="My Students"
      subtitle="View and manage your students"
    >
      <Card padding="md">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search students by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11"
          />
        </div>
      </Card>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <StudentCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => {
            const user = student.user
            const name = user
              ? `${user.first_name} ${user.last_name}`
              : `Student #${student.user_id}`
            const email = user?.email || 'No email provided'
            const university = student.university || 'University not specified'
            const degree = student.degree || 'Degree not specified'

            return (
              <Card key={student.id} padding="md" hover>
                <div className="flex flex-col items-center text-center">
                  <Avatar
                    name={name}
                    src={user?.avatar_url}
                    size="xl"
                    className="mb-4"
                  />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-base">
                    {name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    {email}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                    <Badge variant="info" size="sm">
                      {university}
                    </Badge>
                    <Badge variant="primary" size="sm">
                      {degree}
                    </Badge>
                  </div>
                  {student.graduation_year && (
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
                      Graduating {student.graduation_year}
                    </p>
                  )}
                  {student.cgpa && (
                    <div className="flex items-center gap-1.5 mt-2">
                      <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
                      <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
                        CGPA: {student.cgpa.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card>
          <EmptyState
            icon={<Users className="w-12 h-12" />}
            title="No students found"
            description={
              searchQuery
                ? `We couldn't find any students matching "${searchQuery}". Try a different search.`
                : "You haven't accepted any student requests yet. Students will appear here once they connect with you."
            }
          />
        </Card>
      )}
    </PageContainer>
  )
}
