import { useQuery } from '@tanstack/react-query'
import { studentApi } from '@/services/api'
import { Lightbulb, Target, BookOpen, Briefcase } from 'lucide-react'

export default function Recommendations() {
  const { data } = useQuery({
    queryKey: ['recommendations'],
    queryFn: studentApi.getRecommendations,
  })

  const recommendations = data?.data || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">AI Career Recommendations</h1>
        <p className="text-slate-600 mt-1">Personalized career paths based on your skills and interests</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendations.map((rec: any, idx: number) => (
          <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary-100 rounded-lg">
                <Lightbulb className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{rec.title}</h3>
                <p className="text-slate-600 text-sm mt-1">{rec.description}</p>
                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary-600" />
                    <span className="text-sm text-slate-600">Confidence Score</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${rec.confidence_score * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {recommendations.length === 0 && (
        <div className="text-center py-12 text-slate-500">No recommendations available yet</div>
      )}
    </div>
  )
}
