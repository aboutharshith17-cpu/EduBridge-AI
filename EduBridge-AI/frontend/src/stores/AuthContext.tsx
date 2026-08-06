import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { api } from '@/services/api'

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  role: string
  status: string
  is_verified: boolean
  avatar_url?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (data: { email: string; password: string; first_name: string; last_name: string; role: string }) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'))
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('access_token')
      const storedUser = localStorage.getItem('user')
      
      if (storedToken && storedUser) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
          setUser(JSON.parse(storedUser))
        } catch {
          localStorage.removeItem('access_token')
          localStorage.removeItem('user')
        }
      }
      setIsLoading(false)
    }
    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const formData = new FormData()
    formData.append('username', email)
    formData.append('password', password)
    
    const response = await api.post('/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    
    const { access_token, refresh_token } = response.data
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
    setToken(access_token)
    api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
    
    const userResponse = await api.get('/auth/me')
    const userData = userResponse.data
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const register = async (data: { email: string; password: string; first_name: string; last_name: string; role: string }) => {
    const response = await api.post('/auth/register', data)
    const userData = response.data
    setUser(userData)
    return userData
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
    setToken(null)
  }

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token')
    if (!refreshToken) throw new Error('No refresh token')
    
    const response = await api.post('/auth/refresh', { refresh_token: refreshToken })
    const { access_token } = response.data
    localStorage.setItem('access_token', access_token)
    setToken(access_token)
    api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, refreshToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
