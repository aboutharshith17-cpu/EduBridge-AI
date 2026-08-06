import { useQuery } from '@tanstack/react-query'
import { mentorApi } from '@/services/api'
import { Users, Mail, Calendar } from 'lucide-react'

export default function MentorStudents() {
  const { data, isLoading } = useQuery({
    queryKey: ['mentorStudents'],
    queryFn: mentorApi.getStudents,
  })

  const students = data?.data || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">My Students</h1>
        <p className="text-slate-600 mt-1">View and manage your students</p>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">Loading students...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student: any) => (
            <div key={student.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{student.name}</h3>
                  <p className="text-sm text-slate-600">{student.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!isLoading && students.length === 0 && (
        <div className="text-center py-12 text-slate-500">No students yet</div>
      )}
    </div>
  )
}
