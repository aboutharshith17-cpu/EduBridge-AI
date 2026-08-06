import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { studentApi } from '@/services/api'

const profileSchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  phone: z.string().optional(),
  university: z.string().optional(),
  degree: z.string().optional(),
  graduation_year: z.coerce.number().optional(),
  cgpa: z.coerce.number().optional(),
  skills: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
})

type ProfileForm = z.infer<typeof profileSchema>

export default function Profile() {
  const queryClient = useQueryClient()
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: studentApi.getProfile,
  })
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    values: profile?.data || {},
  })

  const updateMutation = useMutation({
    mutationFn: studentApi.updateProfile,
    onSuccess: () => {
      toast.success('Profile updated successfully')
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
    onError: () => {
      toast.error('Failed to update profile')
    },
  })

  const onSubmit = (data: ProfileForm) => {
    updateMutation.mutate(data)
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">My Profile</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
            <input {...register('first_name')} className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
            {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
            <input {...register('last_name')} className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
            {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
          <input {...register('phone')} className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">University</label>
            <input {...register('university')} className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Degree</label>
            <input {...register('degree')} className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Graduation Year</label>
            <input {...register('graduation_year')} type="number" className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">CGPA</label>
            <input {...register('cgpa')} type="number" step="0.01" className="w-full px-4 py-3 border border-slate-300 rounded-lg" />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
