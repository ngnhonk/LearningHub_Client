import { cn } from '../../lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
}

const sizeClass = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-10 h-10 border-3',
  xl: 'w-14 h-14 border-4',
};

export function LoadingSpinner({ size = 'md', className, label }: LoadingSpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <div
        className={cn(
          'rounded-full border-[var(--color-border-strong)] border-t-[var(--color-primary)] animate-spin',
          sizeClass[size]
        )}
        style={{ borderTopColor: 'var(--color-primary)' }}
        role="status"
        aria-label={label || 'Đang tải...'}
      />
      {label && <p className="text-sm font-medium text-[var(--color-muted)]">{label}</p>}
    </div>
  );
}

// Full page loading
export function PageLoader({ label = 'Đang tải...' }: { label?: string }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--color-background)] z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-[var(--color-border-strong)] border-t-[var(--color-primary)] animate-spin" />
          <div className="absolute inset-2 w-12 h-12 rounded-full border-4 border-transparent border-t-[var(--color-accent)] animate-spin"
            style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
        </div>
        <p className="text-base font-bold text-[var(--color-foreground)]" style={{ fontFamily: 'var(--font-heading)' }}>
          {label}
        </p>
      </div>
    </div>
  );
}
