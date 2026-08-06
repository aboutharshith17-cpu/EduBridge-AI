import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { studentApi } from '@/services/api'
import { TrendingUp, Plus } from 'lucide-react'

const progressSchema = z.object({
  skill_name: z.string().min(2),
  proficiency_level: z.coerce.number().min(0).max(100),
  hours_spent: z.coerce.number().min(0),
})

type ProgressForm = z.infer<typeof progressSchema>

export default function Progress() {
  const queryClient = useQueryClient()
  const { data: progress } = useQuery({
    queryKey: ['progress'],
    queryFn: studentApi.getProgress,
  })
  
  const { data: stats } = useQuery({
    queryKey: ['progressStats'],
    queryFn: studentApi.getProgressStats,
  })
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProgressForm>({
    resolver: zodResolver(progressSchema),
  })

  const addMutation = useMutation({
    mutationFn: studentApi.addProgress,
    onSuccess: () => {
      toast.success('Progress updated')
      queryClient.invalidateQueries({ queryKey: ['progress'] })
      queryClient.invalidateQueries({ queryKey: ['progressStats'] })
      reset()
    },
    onError: () => {
      toast.error('Failed to update progress')
    },
  })

  const onSubmit = (data: ProgressForm) => {
    addMutation.mutate(data)
  }

  const progressList = progress?.data || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Progress Tracking</h1>
        <p className="text-slate-600 mt-1">Monitor your skill development and learning journey</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-600">Total Skills</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{stats?.data?.total_skills || 0}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-600">Avg Proficiency</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{stats?.data?.average_proficiency || 0}%</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <p className="text-sm text-slate-600">Total Hours</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{stats?.data?.total_hours || 0}</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Add Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Skill</label>
            <input {...register('skill_name')} className="w-full px-4 py-3 border border-slate-300 rounded-lg" placeholder="e.g. Python" />
            {errors.skill_name && <p className="text-red-500 text-sm mt-1">{errors.skill_name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Proficiency (%)</label>
            <input {...register('proficiency_level')} type="number" min="0" max="100" className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Hours Spent</label>
            <input {...register('hours_spent')} type="number" step="0.5" className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
          </div>
        </div>
        <button type="submit" className="btn-primary mt-4 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Progress
        </button>
      </form>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Skill</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Proficiency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Hours</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {progressList.map((p: any) => (
              <tr key={p.id}>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">{p.skill_name}</td>
                <td className="px-6 py-4">
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${p.proficiency_level}%` }} />
                  </div>
                  <span className="text-xs text-slate-500 mt-1">{p.proficiency_level}%</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{p.hours_spent}h</td>
              </tr>
            ))}
          </tbody>
        </table>
        {progressList.length === 0 && (
          <div className="text-center py-12 text-slate-500">No progress tracked yet</div>
        )}
      </div>
    </div>
  )
}
