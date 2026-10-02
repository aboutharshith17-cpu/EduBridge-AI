import { useState, ReactNode } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'
import { MobileNav } from '@/components/layout/MobileNav'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="flex">
        <div className="hidden lg:block fixed inset-y-0 left-0 z-30 w-64">
          <Sidebar />
        </div>

        {sidebarOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <div className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden">
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>
          </>
        )}

        <div className="flex-1 lg:ml-64">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="p-4 lg:p-8 pb-24 lg:pb-8">
            {children}
          </main>
        </div>
      </div>
      <MobileNav />
    </div>
  )
}
