import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api'
import { useAuth } from '@/stores/AuthContext'

export function useCurrentUser() {
  const { setUser } = useAuth()

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await api.get('/auth/me')
      const user = response.data
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      return user
    },
    retry: false,
  })
}

export function useLogin() {
  const { login } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      await login(credentials.email, credentials.password)
    },
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: any) => api.post('/auth/register', data).then((res) => res.data),
  })
}

export function useRefreshToken() {
  return useMutation({
    mutationFn: async (refreshToken: string) => {
      const response = await api.post('/auth/refresh', { refresh_token: refreshToken })
      return response.data
    },
  })
}
