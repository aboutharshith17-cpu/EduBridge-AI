import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { studentApi } from '@/services/api'
import { toast } from 'react-hot-toast'

export function useStudentDashboard() {
  return useQuery({
    queryKey: ['studentDashboard'],
    queryFn: async () => {
      const response = await studentApi.getDashboard()
      return response.data
    },
  })
}

export function useStudentProfile() {
  return useQuery({
    queryKey: ['studentProfile'],
    queryFn: async () => {
      const response = await studentApi.getProfile()
      return response.data
    },
  })
}

export function useUpdateStudentProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => studentApi.updateProfile(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentProfile'] })
      toast.success('Profile updated successfully')
    },
    onError: () => toast.error('Failed to update profile'),
  })
}

export function useResources() {
  return useQuery({
    queryKey: ['resources'],
    queryFn: async () => {
      const response = await studentApi.getResources()
      return response.data
    },
  })
}

export function useScholarships() {
  return useQuery({
    queryKey: ['scholarships'],
    queryFn: async () => {
      const response = await studentApi.getScholarships()
      return response.data
    },
  })
}

export function useInternships() {
  return useQuery({
    queryKey: ['internships'],
    queryFn: async () => {
      const response = await studentApi.getInternships()
      return response.data
    },
  })
}

export function useApplications() {
  return useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const response = await studentApi.getApplications()
      return response.data
    },
  })
}

export function useMeetings() {
  return useQuery({
    queryKey: ['meetings'],
    queryFn: async () => {
      const response = await studentApi.getMeetings()
      return response.data
    },
  })
}

export function useScheduleMeeting() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => studentApi.scheduleMeeting(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetings'] })
      toast.success('Meeting scheduled')
    },
    onError: () => toast.error('Failed to schedule meeting'),
  })
}

export function useProgress() {
  return useQuery({
    queryKey: ['progress'],
    queryFn: async () => {
      const response = await studentApi.getProgress()
      return response.data
    },
  })
}

export function useProgressStats() {
  return useQuery({
    queryKey: ['progressStats'],
    queryFn: async () => {
      const response = await studentApi.getProgressStats()
      return response.data
    },
  })
}

export function useAddProgress() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => studentApi.addProgress(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress'] })
      queryClient.invalidateQueries({ queryKey: ['progressStats'] })
      toast.success('Progress added')
    },
    onError: () => toast.error('Failed to add progress'),
  })
}

export function useRecommendations() {
  return useQuery({
    queryKey: ['recommendations'],
    queryFn: async () => {
      const response = await studentApi.getRecommendations()
      return response.data
    },
  })
}
