import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-secondary-500">
      <Outlet />
    </div>
  )
}
