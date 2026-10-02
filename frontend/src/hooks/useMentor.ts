import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { mentorApi } from '@/services/api'

export function useMentorDashboard() {
  return useQuery({
    queryKey: ['mentorDashboard'],
    queryFn: async () => {
      const response = await mentorApi.getDashboard()
      return response.data
    },
  })
}

export function useMentorStudents() {
  return useQuery({
    queryKey: ['mentorStudents'],
    queryFn: async () => {
      const response = await mentorApi.getStudents()
      return response.data
    },
  })
}

export function useMentorResources() {
  return useQuery({
    queryKey: ['mentorResources'],
    queryFn: async () => {
      const response = await mentorApi.getResources()
      return response.data
    },
  })
}

export function useUploadResource() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => mentorApi.uploadResource(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mentorResources'] })
      toast.success('Resource uploaded')
    },
    onError: () => toast.error('Failed to upload resource'),
  })
}

export function useDeleteResource() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => mentorApi.deleteResource(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mentorResources'] })
      toast.success('Resource deleted')
    },
    onError: () => toast.error('Failed to delete resource'),
  })
}

export function useMentorMeetings() {
  return useQuery({
    queryKey: ['mentorMeetings'],
    queryFn: async () => {
      const response = await mentorApi.getMeetings()
      return response.data
    },
  })
}

export function useMentorFeedback() {
  return useQuery({
    queryKey: ['mentorFeedback'],
    queryFn: async () => {
      const response = await mentorApi.getFeedback()
      return response.data
    },
  })
}
