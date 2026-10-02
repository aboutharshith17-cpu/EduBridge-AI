import { useState, useMemo } from 'react'
import { useAdminUsers, useUpdateUserStatus } from '@/hooks/useAdmin'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageContainer } from '@/components/layout/PageContainer'
import { UserManagement } from '@/types'
import { Search, Filter, UserCheck, UserX, ChevronLeft, ChevronRight, Users } from 'lucide-react'

const PAGE_SIZE = 10

const ROLE_BADGE_VARIANT: Record<string, 'primary' | 'success' | 'warning' | 'default'> = {
  admin: 'primary',
  mentor: 'success',
  student: 'warning',
}

const STATUS_VARIANT: Record<string, 'success' | 'danger' | 'warning' | 'default'> = {
  active: 'success',
  inactive: 'danger',
  pending: 'warning',
}

export default function AdminUsers() {
  const { data: users = [], isLoading, error, refetch } = useAdminUsers()
  const updateStatus = useUpdateUserStatus()

  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let result: UserManagement[] = users

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter((u: UserManagement) =>
        u.first_name?.toLowerCase().includes(q) ||
        u.last_name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q)
      )
    }

    if (roleFilter !== 'all') {
      result = result.filter((u: UserManagement) => u.role === roleFilter)
    }

    if (statusFilter !== 'all') {
      result = result.filter((u: UserManagement) => u.status === statusFilter)
    }

    return result
  }, [users, searchQuery, roleFilter, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setPage(1)
  }
  const handleRoleChange = (value: string) => {
    setRoleFilter(value)
    setPage(1)
  }
  const handleStatusChange = (value: string) => {
    setStatusFilter(value)
    setPage(1)
  }

  const handleToggleStatus = (user: UserManagement) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active'
    updateStatus.mutate({ userId: user.id, status: newStatus })
  }

  const activeFiltersCount = [roleFilter !== 'all', statusFilter !== 'all'].filter(Boolean).length

  return (
    <PageContainer
      title="User Management"
      subtitle="View and manage all platform users"
      actions={
        <Button variant="secondary" size="sm" onClick={() => refetch()} isLoading={isLoading}>
          Refresh
        </Button>
      }
    >
      {error && (
        <Card padding="sm" className="border-red-200 bg-red-50 dark:bg-red-900/10">
          <p className="text-sm text-red-700 dark:text-red-400">Failed to load users. Please try again later.</p>
        </Card>
      )}

      {/* Toolbar */}
      <Card padding="sm">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Role Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <select
              value={roleFilter}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="student">Student</option>
              <option value="mentor">Mentor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>

          {/* Active filter badge */}
          {activeFiltersCount > 0 && (
            <Badge variant="info" size="sm" className="shrink-0">
              {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
            </Badge>
          )}
        </div>

        {/* Result count */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
          Showing {paginated.length} of {filtered.length} user{filtered.length !== 1 ? 's' : ''}
        </p>
      </Card>

      {/* Table */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  User
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Email
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Role
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Verified
                </th>
                <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i: number) => (
                  <tr key={i}>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Skeleton variant="circular" className="w-9 h-9 shrink-0" />
                        <div>
                          <Skeleton variant="text" className="w-28 h-4 mb-1.5" />
                          <Skeleton variant="text" className="w-20 h-3" />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4"><Skeleton variant="text" className="w-40 h-4" /></td>
                    <td className="px-4 py-4"><Skeleton variant="rectangular" className="w-16 h-6 rounded-full" /></td>
                    <td className="px-4 py-4"><Skeleton variant="rectangular" className="w-20 h-6 rounded-full" /></td>
                    <td className="px-4 py-4"><Skeleton variant="text" className="w-12 h-4" /></td>
                    <td className="px-4 py-4"><Skeleton variant="text" className="w-16 h-8 rounded-lg ml-auto" /></td>
                  </tr>
                ))
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4">
                    <EmptyState
                      icon={<Users className="w-12 h-12" />}
                      title="No users found"
                      description={
                        searchQuery || roleFilter !== 'all' || statusFilter !== 'all'
                          ? 'Try adjusting your search or filter criteria'
                          : 'There are no users on the platform yet'
                      }
                    />
                  </td>
                </tr>
              ) : (
                paginated.map((user: UserManagement) => (
                  <tr key={user.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-700/30 transition-colors">
                    {/* Name column */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar
                          name={`${user.first_name ?? ''} ${user.last_name ?? ''}`}
                          size="sm"
                          className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                        />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                            {user.first_name} {user.last_name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3.5">
                      <span className="text-sm text-slate-600 dark:text-slate-300 truncate block max-w-[220px]">
                        {user.email}
                      </span>
                    </td>

                    {/* Role */}
                    <td className="px-4 py-3.5">
                      <Badge variant={ROLE_BADGE_VARIANT[user.role] ?? 'default'} size="sm">
                        {user.role}
                      </Badge>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <Badge variant={STATUS_VARIANT[user.status] ?? 'default'} size="sm">
                        {user.status}
                      </Badge>
                    </td>

                    {/* Verified */}
                    <td className="px-4 py-3.5">
                      {user.is_verified ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 dark:text-green-400">
                          <UserCheck className="w-3.5 h-3.5" /> Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                          <UserX className="w-3.5 h-3.5" /> No
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant={user.status === 'active' ? 'ghost' : 'secondary'}
                          size="sm"
                          className="!px-2 !py-1.5 text-green-700 dark:text-green-400"
                          onClick={() => handleToggleStatus(user)}
                          isLoading={updateStatus.isPending}
                          title={user.status === 'active' ? 'Deactivate user' : 'Activate user'}
                        >
                          {user.status === 'active' ? (
                            <UserX className="w-4 h-4" />
                          ) : (
                            <UserCheck className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 px-4 py-3">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Page {page} of {totalPages}
            </p>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="!px-2"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, idx: number) => {
                let pageNum: number
                if (totalPages <= 5) pageNum = idx + 1
                else if (page <= 3) pageNum = idx + 1
                else if (page >= totalPages - 2) pageNum = totalPages - 4 + idx
                else pageNum = page - 2 + idx

                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                      page === pageNum
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="!px-2"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </PageContainer>
  )
}
