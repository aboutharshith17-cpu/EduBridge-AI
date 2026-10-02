import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { adminApi } from '@/services/api'

export function useAdminStats() {
  return useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const response = await adminApi.getStats()
      return response.data
    },
  })
}

export function useAdminUsers() {
  return useQuery({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      const response = await adminApi.getUsers()
      return response.data
    },
  })
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, status }: { userId: number; status: string }) =>
      adminApi.updateUserStatus(userId, status).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] })
      toast.success('User status updated')
    },
    onError: () => toast.error('Failed to update user status'),
  })
}

export function useAdminScholarships() {
  return useQuery({
    queryKey: ['adminScholarships'],
    queryFn: async () => {
      const response = await adminApi.getScholarships()
      return response.data
    },
  })
}

export function useAdminInternships() {
  return useQuery({
    queryKey: ['adminInternships'],
    queryFn: async () => {
      const response = await adminApi.getInternships()
      return response.data
    },
  })
}

export function useCreateScholarship() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => adminApi.createScholarship(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminScholarships'] })
      toast.success('Scholarship created')
    },
    onError: () => toast.error('Failed to create scholarship'),
  })
}

export function useUpdateScholarship() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      adminApi.updateScholarship(id, data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminScholarships'] })
      toast.success('Scholarship updated')
    },
    onError: () => toast.error('Failed to update scholarship'),
  })
}

export function useDeleteScholarship() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => adminApi.deleteScholarship(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminScholarships'] })
      toast.success('Scholarship deleted')
    },
    onError: () => toast.error('Failed to delete scholarship'),
  })
}

export function useCreateInternship() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => adminApi.createInternship(data).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminInternships'] })
      toast.success('Internship created')
    },
    onError: () => toast.error('Failed to create internship'),
  })
}

export function useDeleteInternship() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => adminApi.deleteInternship(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminInternships'] })
      toast.success('Internship deleted')
    },
    onError: () => toast.error('Failed to delete internship'),
  })
}
