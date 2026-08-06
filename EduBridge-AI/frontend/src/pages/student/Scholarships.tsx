import { useQuery } from '@tanstack/react-query'
import { studentApi } from '@/services/api'
import { GraduationCap, ExternalLink, Calendar } from 'lucide-react'

export default function Scholarships() {
  const { data, isLoading } = useQuery({
    queryKey: ['scholarships'],
    queryFn: studentApi.getScholarships,
  })

  const scholarships = data?.data || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Scholarship Finder</h1>
        <p className="text-slate-600 mt-1">Discover scholarships tailored to your profile</p>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">Loading scholarships...</div>
      ) : (
        <div className="space-y-4">
          {scholarships.map((scholarship: any) => (
            <div key={scholarship.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{scholarship.title}</h3>
                    <p className="text-slate-600 text-sm mt-1">Provider: {scholarship.provider}</p>
                    {scholarship.amount && (
                      <p className="text-primary-600 font-semibold mt-2">${scholarship.amount.toLocaleString()}</p>
                    )}
                    <p className="text-slate-500 text-sm mt-2 line-clamp-2">{scholarship.description}</p>
                    {scholarship.deadline && (
                      <div className="flex items-center gap-2 mt-3 text-sm text-slate-500">
                        <Calendar className="w-4 h-4" />
                        Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                {scholarship.application_url && (
                  <a href={scholarship.application_url} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Apply
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!isLoading && scholarships.length === 0 && (
        <div className="text-center py-12 text-slate-500">No scholarships available yet</div>
      )}
    </div>
  )
}
