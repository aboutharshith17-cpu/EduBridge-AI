import { useQuery } from '@tanstack/react-query'
import { studentApi } from '@/services/api'
import { BookOpen, Download, Search } from 'lucide-react'
import { useState } from 'react'

export default function Resources() {
  const [search, setSearch] = useState('')
  const { data, isLoading } = useQuery({
    queryKey: ['resources'],
    queryFn: studentApi.getResources,
  })

  const resources = data?.data || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Resource Library</h1>
          <p className="text-slate-600 mt-1">Discover educational resources curated by mentors</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">Loading resources...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource: any) => (
            <div key={resource.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-primary-600" />
                </div>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {resource.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mt-4">{resource.title}</h3>
              <p className="text-slate-600 text-sm mt-2">Educational resource for your learning journey</p>
              {resource.file_url && (
                <a href={resource.file_url} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-medium">
                  <Download className="w-4 h-4" />
                  Download Resource
                </a>
              )}
            </div>
          ))}
        </div>
      )}
      
      {!isLoading && resources.length === 0 && (
        <div className="text-center py-12 text-slate-500">No resources available yet</div>
      )}
    </div>
  )
}
