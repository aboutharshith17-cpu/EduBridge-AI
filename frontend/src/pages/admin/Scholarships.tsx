import { useState, useMemo } from 'react'
import { useAdminScholarships, useDeleteScholarship } from '@/hooks/useAdmin'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageContainer } from '@/components/layout/PageContainer'
import { Scholarship } from '@/types'
import { GraduationCap, Search, Trash2, Plus, Calendar } from 'lucide-react'

const PAGE_SIZE = 8

function getStatusBadge(s: Scholarship) {
  if (s.is_active) return { label: 'Active', variant: 'success' as const }
  return { label: 'Closed', variant: 'default' as const }
}

function formatAmount(amount?: number) {
  if (!amount) return null
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)
}

export default function AdminScholarships() {
  const { data: scholarships = [], isLoading, error, refetch } = useAdminScholarships()
  const deleteScholarship = useDeleteScholarship()

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [page, setPage] = useState(1)
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null)

  const filtered = useMemo(() => {
    let result: Scholarship[] = scholarships
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter((s: Scholarship) =>
        s.title.toLowerCase().includes(q) || s.provider.toLowerCase().includes(q)
      )
    }
    if (statusFilter === 'active') result = result.filter((s: Scholarship) => s.is_active)
    if (statusFilter === 'closed') result = result.filter((s: Scholarship) => !s.is_active)
    return result
  }, [scholarships, searchQuery, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleDelete = (id: number) => {
    deleteScholarship.mutate(id, {
      onSuccess: () => setDeleteConfirmId(null),
    })
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setPage(1)
  }

  return (
    <PageContainer
      title="Scholarship Management"
      subtitle="Manage scholarship opportunities on the platform"
      actions={
        <Button variant="primary" size="sm">
          <Plus className="w-4 h-4 mr-1.5" />
          Add Scholarship
        </Button>
      }
    >
      {error && (
        <Card padding="sm" className="border-red-200 bg-red-50 dark:bg-red-900/10">
          <p className="text-sm text-red-700 dark:text-red-400">Failed to load scholarships. Please try again later.</p>
        </Card>
      )}

      {/* Toolbar */}
      <Card padding="sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search scholarships or providers..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </select>
          <Button variant="secondary" size="sm" onClick={() => refetch()} isLoading={isLoading}>
            Refresh
          </Button>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
          {filtered.length} scholarship{filtered.length !== 1 ? 's' : ''} found
        </p>
      </Card>

      {/* Table */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Scholarship
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Provider
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Amount
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Deadline
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Status
                </th>
                <th className="text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {isLoading
                ? Array.from({ length: 5 }).map((_, i: number) => (
                    <tr key={i}>
                      <td className="px-4 py-4"><div className="flex items-center gap-3"><Skeleton variant="circular" className="w-9 h-9" /><Skeleton variant="text" className="w-36 h-4" /></div></td>
                      <td className="px-4 py-4"><Skeleton variant="text" className="w-28 h-4" /></td>
                      <td className="px-4 py-4"><Skeleton variant="text" className="w-20 h-4" /></td>
                      <td className="px-4 py-4"><Skeleton variant="text" className="w-24 h-4" /></td>
                      <td className="px-4 py-4"><Skeleton variant="rectangular" className="w-16 h-6 rounded-full" /></td>
                      <td className="px-4 py-4"><Skeleton variant="text" className="w-10 h-8 rounded-lg ml-auto" /></td>
                    </tr>
                  ))
                : paginated.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4">
                        <EmptyState
                          icon={<GraduationCap className="w-12 h-12" />}
                          title="No scholarships found"
                          description={
                            searchQuery || statusFilter !== 'all'
                              ? 'Try adjusting your search or filter criteria'
                              : 'No scholarships have been added to the platform yet'
                          }
                          action={
                            <Button variant="primary" size="sm">
                              <Plus className="w-4 h-4 mr-1.5" />
                              Add Your First Scholarship
                            </Button>
                          }
                        />
                      </td>
                    </tr>
                  )
                : paginated.map((scholarship: Scholarship) => {
                    const status = getStatusBadge(scholarship)
                    const isConfirmingDelete = deleteConfirmId === scholarship.id
                    return (
                      <tr key={scholarship.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-700/30 transition-colors">
                        {/* Title + description */}
                        <td className="px-4 py-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 shrink-0">
                              <GraduationCap className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate max-w-[260px]">
                                {scholarship.title}
                              </p>
                              {scholarship.description && (
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1 max-w-[260px]">
                                  {scholarship.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Provider */}
                        <td className="px-4 py-4">
                          <span className="text-sm text-slate-700 dark:text-slate-300">{scholarship.provider}</span>
                        </td>

                        {/* Amount */}
                        <td className="px-4 py-4">
                          {formatAmount(scholarship.amount) ? (
                            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                              {formatAmount(scholarship.amount)}
                            </span>
                          ) : (
                            <span className="text-sm text-slate-400 dark:text-slate-500">—</span>
                          )}
                        </td>

                        {/* Deadline */}
                        <td className="px-4 py-4">
                          {scholarship.deadline ? (
                            <span className="inline-flex items-center gap-1.5 text-sm text-slate-700 dark:text-slate-300">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              {new Date(scholarship.deadline).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          ) : (
                            <span className="text-sm text-slate-400 dark:text-slate-500">—</span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          <Badge variant={status.variant} size="sm">
                            {status.label}
                          </Badge>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="!px-2 !py-1.5"
                              title="Edit scholarship"
                            >
                              Edit
                            </Button>

                            {isConfirmingDelete ? (
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleDelete(scholarship.id)}
                                  isLoading={deleteScholarship.isPending}
                                  className="!px-2 !py-1.5 text-xs"
                                >
                                  Confirm
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setDeleteConfirmId(null)}
                                  className="!px-2 !py-1.5 text-xs"
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setDeleteConfirmId(scholarship.id)}
                                className="!px-2 !py-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                title="Delete scholarship"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
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
              <Button variant="ghost" size="sm" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="!px-2">
                ←
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
              <Button variant="ghost" size="sm" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="!px-2">
                →
              </Button>
            </div>
          </div>
        )}
      </Card>
    </PageContainer>
  )
}
