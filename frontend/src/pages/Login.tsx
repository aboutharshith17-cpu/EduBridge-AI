import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GraduationCap, Users, Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/stores/AuthContext'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

export default function Login() {
  const navigate = useNavigate()
  const { login, isLoading } = useAuth()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      setSubmitError(null)
      await login(data.email, data.password)
      navigate('/dashboard')
    } catch (error: any) {
      const message = error?.response?.data?.detail || error?.message || 'Login failed. Please check your credentials.'
      setSubmitError(message)
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-800 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFFFFF" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.3C87.4,-33.5,90.1,-18,88.1,-3.3C86.1,11.4,79.4,25.3,70.1,37.2C60.8,49.1,48.9,59,35.8,66.2C22.7,73.4,8.4,77.9,-4.8,76.1C-18,74.3,-30.1,66.2,-41.3,57.1C-52.5,48,-62.8,37.9,-69.3,25.5C-75.8,13.1,-78.5,-1.5,-74.6,-14.4C-70.7,-27.3,-60.2,-38.5,-48.5,-46.8C-36.8,-55.1,-23.9,-60.5,-10.3,-60.9C3.3,-61.3,30.5,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold">EduBridge AI</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Learn smarter.<br />Build your future.
          </h1>
          <p className="text-primary-100 text-lg max-w-md">
            Your AI-powered bridge to learning, mentorship, and career opportunities.
          </p>
        </div>

        <div className="space-y-4 relative">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Expert Mentors</h3>
              <p className="text-sm text-primary-100">Connect with industry professionals</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">AI-Powered Learning</h3>
              <p className="text-sm text-primary-100">Personalized recommendations for your career</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Career Opportunities</h3>
              <p className="text-sm text-primary-100">Internships and scholarships curated for you</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-primary-200 relative">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>10K+ Resources</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>500+ Mentors</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>24/7 AI Support</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-600 text-white mb-4">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">EduBridge AI</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Learn smarter. Build your future.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Welcome back</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Sign in to continue your journey</p>
            </div>

            {submitError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
                <input
                  {...register('password')}
                  type="password"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="••••••••"
                />
                {errors.password && <p className="mt-1.5 text-xs text-red-600">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full bg-primary-600 text-white py-2.5 rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {(isSubmitting || isLoading) ? 'Signing in...' : 'Sign In'}
                {!(isSubmitting || isLoading) && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <p className="text-center mt-6 text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-600 hover:text-primary-700 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
