import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import type { UserRole } from '@/lib/types'

interface Props {
  role: UserRole
}

const ProtectedRoute = ({ role }: Props) => {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  if (profile && profile.role !== role) {
    return <Navigate to={profile.role === 'admin' ? '/admin' : '/client'} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
