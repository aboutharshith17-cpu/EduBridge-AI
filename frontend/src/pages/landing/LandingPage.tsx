import { Link } from 'react-router-dom'
import { GraduationCap, Users, BookOpen, Briefcase, ArrowRight, Star, CheckCircle2, MessageSquare, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full text-sm mb-6">
              <Star className="w-4 h-4 text-yellow-300" />
              <span>Trusted by 10,000+ students</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your AI-powered bridge to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-primary-200"> learning</span> and
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-primary-200"> career success</span>
            </h1>
            <p className="text-lg sm:text-xl text-primary-100 mb-8 max-w-lg">
              Personalized learning, AI mentorship, and career opportunities all in one platform. Start building your future today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto bg-white text-primary-700 hover:bg-primary-50">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
                  Explore Platform
                </Button>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">AI Career Mentor</h3>
                      <p className="text-xs text-slate-500">Online now</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-slate-50 rounded-xl p-3 text-sm text-slate-600">
                      Based on your skills in Python and Data Science, I recommend exploring these career paths...
                    </div>
                    <div className="bg-primary-50 rounded-xl p-3 text-sm text-primary-700">
                      <BarChart3 className="w-4 h-4 inline mr-1.5" />
                      Career Readiness Score: 78%
                    </div>
                    <div className="bg-green-50 rounded-xl p-3 text-sm text-green-700">
                      <CheckCircle2 className="w-4 h-4 inline mr-1.5" />
                      3 new opportunities matched for you
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function StatsSection() {
  const stats = [
    { label: 'Learning Resources', value: '10K+', icon: BookOpen },
    { label: 'Expert Mentors', value: '500+', icon: Users },
    { label: 'Opportunities', value: '1K+', icon: Briefcase },
    { label: 'AI Assistance', value: '24/7', icon: MessageSquare },
  ]

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400 mb-3">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FeaturesSection() {
  const features = [
    {
      icon: MessageSquare,
      title: 'AI Career Guidance',
      description: 'Get personalized career advice and learning paths powered by advanced AI.',
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    },
    {
      icon: BookOpen,
      title: 'Personalized Learning',
      description: 'Curated resources and courses tailored to your skills and career goals.',
      color: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    },
    {
      icon: Users,
      title: 'Mentor Connection',
      description: 'Connect with experienced professionals who can guide your career journey.',
      color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    },
    {
      icon: Briefcase,
      title: 'Internship Tracking',
      description: 'Discover and track internship opportunities matched to your profile.',
      color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
    },
    {
      icon: GraduationCap,
      title: 'Scholarship Discovery',
      description: 'Find scholarships you qualify for and streamline your applications.',
      color: 'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400',
    },
    {
      icon: BarChart3,
      title: 'Progress Analytics',
      description: 'Track your learning progress and skill development with detailed analytics.',
      color: 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400',
    },
  ]

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            From learning resources to career opportunities, EduBridge AI provides all the tools you need.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-300 group"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HowItWorksSection() {
  const steps = [
    { num: '01', title: 'Create your profile', description: 'Sign up and tell us about your skills, interests, and career goals.' },
    { num: '02', title: 'Discover opportunities', description: 'Get personalized recommendations for learning, mentors, and careers.' },
    { num: '03', title: 'Learn with AI + mentors', description: 'Access curated resources and get guidance from industry experts.' },
    { num: '04', title: 'Track your progress', description: 'Monitor your growth and build a portfolio that stands out.' },
  ]

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            How it works
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Getting started is easy. Follow these simple steps to begin your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="relative">
              <div className="text-5xl font-bold text-primary-100 dark:text-primary-900/40 mb-4">{step.num}</div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CTASection() {
  return (
    <section className="py-20 bg-primary-600 dark:bg-primary-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Ready to start your journey?
        </h2>
        <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
          Join thousands of students and mentors already using EduBridge AI to learn smarter and build better careers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register">
            <Button size="lg" className="w-full sm:w-auto bg-white text-primary-700 hover:bg-primary-50">
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-primary-400" />
            <span className="text-lg font-bold text-white">EduBridge AI</span>
          </div>
          <p className="text-sm">© 2024 EduBridge AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  )
}
