import { useState } from 'react'
import { PageContainer } from '@/components/layout/PageContainer'
import { Card, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { Input } from '@/components/ui/Input'
import {
  useMentorResources,
  useUploadResource,
  useDeleteResource,
} from '@/hooks/useMentor'
import type { Resource } from '@/types'
import { BookOpen, Upload, Trash2, Search, Download, FileText } from 'lucide-react'

function ResourceCardSkeleton() {
  return (
    <Card padding="md">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Skeleton variant="rectangular" className="h-12 w-12 rounded-xl" />
          <div className="space-y-2 flex-1">
            <Skeleton variant="text" className="w-40" />
            <Skeleton variant="text" className="w-full" />
            <Skeleton variant="text" className="w-24" />
          </div>
        </div>
        <Skeleton variant="circular" className="h-8 w-8" />
      </div>
    </Card>
  )
}

export default function MentorResources() {
  const { data, isLoading, error } = useMentorResources()
  const uploadMutation = useUploadResource()
  const deleteMutation = useDeleteResource()

  const [searchQuery, setSearchQuery] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    is_public: true,
  })

  const resourcesList: Resource[] = data?.data || []

  const filteredResources = resourcesList.filter((resource) => {
    if (!searchQuery.trim()) return true
    return (
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    uploadMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({ title: '', description: '', category: '', is_public: true })
      },
    })
  }

  if (error) {
    return (
      <PageContainer
        title="Resource Management"
        subtitle="Upload and manage educational resources"
      >
        <EmptyState
          icon={<BookOpen className="w-12 h-12" />}
          title="Unable to load resources"
          description="We couldn't fetch your resources. Please try again later."
          action={<Button onClick={() => window.location.reload()}>Retry</Button>}
        />
      </PageContainer>
    )
  }

  return (
    <PageContainer
      title="Resource Management"
      subtitle="Upload and manage educational resources"
    >
      <Card padding="lg">
        <CardHeader
          title="Upload Resource"
          subtitle="Share educational materials with your students"
        />
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="e.g., Intro to React Hooks"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="e.g., Frontend Development"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Description
            </label>
            <textarea
              placeholder="Brief description of the resource..."
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm transition-all duration-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:border-transparent focus:ring-primary-500 disabled:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:border-slate-600 dark:focus:ring-primary-500 dark:disabled:bg-slate-900"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              id="is_public"
              type="checkbox"
              checked={formData.is_public}
              onChange={(e) => setFormData({ ...formData, is_public: e.target.checked })}
              className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="is_public" className="text-sm text-slate-700 dark:text-slate-300">
              Make this resource public
            </label>
          </div>
          <Button
            type="submit"
            isLoading={uploadMutation.isPending}
            className="w-full sm:w-auto"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Resource
          </Button>
        </form>
      </Card>

      <Card padding="lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <CardHeader
            title="Your Resources"
            subtitle={`${filteredResources.length} resource${filteredResources.length !== 1 ? 's' : ''} uploaded`}
          />
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ResourceCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} padding="md" hover>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/30">
                      <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm truncate">
                        {resource.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {resource.description || 'No description provided'}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        <Badge variant="primary" size="sm">
                          {resource.category}
                        </Badge>
                        <Badge variant={resource.is_public ? 'success' : 'warning'} size="sm">
                          {resource.is_public ? 'Public' : 'Private'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteMutation.mutate(resource.id)}
                    className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                    title="Delete resource"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5" />
                    {resource.download_count} downloads
                  </span>
                  {resource.file_type && (
                    <Badge variant="default" size="sm">
                      {resource.file_type}
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <EmptyState
              icon={<BookOpen className="w-12 h-12" />}
              title="No resources uploaded"
              description={
                searchQuery
                  ? `We couldn't find any resources matching "${searchQuery}". Try a different search.`
                  : "You haven't uploaded any resources yet. Start sharing educational materials with your students above."
              }
            />
          </Card>
        )}
      </Card>
    </PageContainer>
  )
}
