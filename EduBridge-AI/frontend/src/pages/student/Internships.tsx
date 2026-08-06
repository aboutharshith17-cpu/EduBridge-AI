import { useQuery } from '@tanstack/react-query'
import { studentApi } from '@/services/api'
import { Briefcase, MapPin, DollarSign, Calendar, ExternalLink } from 'lucide-react'

export default function Internships() {
  const { data, isLoading } = useQuery({
    queryKey: ['internships'],
    queryFn: studentApi.getInternships,
  })

  const internships = data?.data || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Internship Tracker</h1>
        <p className="text-slate-600 mt-1">Find internships to kickstart your career</p>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">Loading internships...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {internships.map((internship: any) => (
            <div key={internship.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{internship.title}</h3>
                  <p className="text-slate-600 text-sm mt-1">{internship.company}</p>
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  {internship.is_active ? 'Active' : 'Closed'}
                </span>
              </div>
              
              <div className="mt-4 space-y-2">
                {internship.location && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4" />
                    {internship.location}
                  </div>
                )}
                {internship.stipend && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <DollarSign className="w-4 h-4" />
                    {internship.stipend}
                  </div>
                )}
                {internship.duration_months && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4" />
                    {internship.duration_months} months
                  </div>
                )}
              </div>
              
              <p className="text-slate-500 text-sm mt-3 line-clamp-2">{internship.description}</p>
              
              {internship.deadline && (
                <p className="text-sm text-slate-500 mt-3">
                  Deadline: {new Date(internship.deadline).toLocaleDateString()}
                </p>
              )}
              
              {internship.application_url && (
                <a href={internship.application_url} target="_blank" rel="noopener noreferrer" className="mt-4 btn-primary flex items-center gap-2 w-full justify-center">
                  <ExternalLink className="w-4 h-4" />
                  Apply Now
                </a>
              )}
            </div>
          ))}
        </div>
      )}
      
      {!isLoading && internships.length === 0 && (
        <div className="text-center py-12 text-slate-500">No internships available yet</div>
      )}
    </div>
  )
}
