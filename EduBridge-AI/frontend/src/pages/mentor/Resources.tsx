import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { mentorApi } from '@/services/api'
import { BookOpen, Upload, Trash2 } from 'lucide-react'

const resourceSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  category: z.string().min(2),
  tags: z.array(z.string()).optional(),
  is_public: z.boolean().default(true),
})

type ResourceForm = z.infer<typeof resourceSchema>

export default function MentorResources() {
  const queryClient = useQueryClient()
  const { data: resources } = useQuery({
    queryKey: ['mentorResources'],
    queryFn: mentorApi.getResources,
  })
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ResourceForm>({
    resolver: zodResolver(resourceSchema),
  })

  const uploadMutation = useMutation({
    mutationFn: mentorApi.uploadResource,
    onSuccess: () => {
      toast.success('Resource uploaded')
      queryClient.invalidateQueries({ queryKey: ['mentorResources'] })
      reset()
    },
    onError: () => {
      toast.error('Failed to upload resource')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => mentorApi.deleteResource(id),
    onSuccess: () => {
      toast.success('Resource deleted')
      queryClient.invalidateQueries({ queryKey: ['mentorResources'] })
    },
  })

  const onSubmit = (data: ResourceForm) => {
    uploadMutation.mutate(data)
  }

  const resourceList = resources?.data || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Resource Management</h1>
        <p className="text-slate-600 mt-1">Upload and manage educational resources</p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
            <input {...register('title')} className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
            <input {...register('category')} className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
          <textarea {...register('description')} rows={3} className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
        </div>
        <button type="submit" className="btn-primary flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Upload Resource
        </button>
      </form>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resourceList.map((resource: any) => (
          <div key={resource.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-primary-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-primary-600" />
              </div>
              <button onClick={() => deleteMutation.mutate(resource.id)} className="text-red-500 hover:text-red-700">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mt-4">{resource.title}</h3>
            <p className="text-slate-600 text-sm mt-2">{resource.description}</p>
            <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full mt-3 inline-block">
              {resource.category}
            </span>
          </div>
        ))}
      </div>
      
      {resourceList.length === 0 && (
        <div className="text-center py-12 text-slate-500">No resources uploaded yet</div>
      )}
    </div>
  )
}
