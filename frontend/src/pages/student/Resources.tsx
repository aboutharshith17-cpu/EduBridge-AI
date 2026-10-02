import { useState, useMemo } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { Input } from '@/components/ui/Input'
import { useResources } from '@/hooks/useStudent'
import { BookOpen, Download, Search, FileText } from 'lucide-react'

export default function Resources() {
  const [search, setSearch] = useState('')
  const { data, isLoading, error } = useResources()
  const resources = data?.data || []

  const filtered = useMemo(() => {
    if (!search.trim()) return resources
    const q = search.toLowerCase()
    return resources.filter(
      (r: any) =>
        r.title?.toLowerCase().includes(q) ||
        r.category?.toLowerCase().includes(q) ||
        r.tags?.some((t: string) => t.toLowerCase().includes(q))
    )
  }, [resources, search])

  return (
    <PageContainer
      title="Resource Library"
      subtitle="Discover educational resources curated by mentors"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search resources by title, category, or tag..."
            leftIcon={<Search className="w-4 h-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <EmptyState
          icon={<BookOpen className="w-12 h-12" />}
          title="Failed to load resources"
          description="Please try refreshing the page."
        />
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} padding="lg">
              <div className="flex items-start justify-between">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <Skeleton className="h-5 w-3/4 rounded-lg mt-4" />
              <Skeleton className="h-4 w-full rounded-lg mt-3" />
              <Skeleton className="h-4 w-2/3 rounded-lg mt-2" />
            </Card>
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((resource: any) => (
            <Card key={resource.id} hover padding="lg">
              <div className="flex items-start justify-between">
                <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                  <BookOpen className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <Badge variant="primary" size="sm">
                  {resource.category}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-4">
                {resource.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                {resource.description || 'Educational resource for your learning journey.'}
              </p>
              <div className="flex items-center gap-2 mt-4">
                {resource.tags?.slice(0, 3).map((tag: string) => (
                  <Badge key={tag} variant="default" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {resource.download_count || 0} downloads
                </span>
                {resource.file_url && (
                  <a
                    href={resource.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 text-sm px-3 py-1.5 rounded-lg font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <Download className="w-4 h-4" /> Download
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<FileText className="w-12 h-12" />}
          title="No resources found"
          description={search ? 'Try adjusting your search query.' : 'Resources will appear here once mentors upload them.'}
        />
      )}
    </PageContainer>
  )
}
