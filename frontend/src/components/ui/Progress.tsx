import { cn } from '@/utils/cn'

interface ProgressProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'success' | 'warning' | 'danger'
  showLabel?: boolean
  label?: string
  className?: string
}

const colorClasses = {
  primary: 'bg-primary-600 dark:bg-primary-500',
  success: 'bg-green-600 dark:bg-green-500',
  warning: 'bg-amber-500 dark:bg-amber-400',
  danger: 'bg-red-600 dark:bg-red-500',
}

export function Progress({ value, max = 100, size = 'md', color = 'primary', showLabel = false, label, className }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const trackClasses = cn('w-full bg-slate-200 rounded-full overflow-hidden dark:bg-slate-700', {
    'h-2': size === 'sm',
    'h-3': size === 'md',
    'h-4': size === 'lg',
  })

  const barClasses = cn('rounded-full transition-all duration-500 ease-out', colorClasses[color], {
    'h-2': size === 'sm',
    'h-3': size === 'md',
    'h-4': size === 'lg',
  })

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>}
          {showLabel && <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={trackClasses}>
        <div className={barClasses} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
