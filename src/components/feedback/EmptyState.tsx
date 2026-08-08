import { type LucideIcon } from 'lucide-react';
import { Button } from '../ui/Button';

interface EmptyStateProps {
  icon?: LucideIcon;
  emoji?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
  };
}

export function EmptyState({ icon: Icon, emoji, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <div className="w-20 h-20 rounded-3xl bg-[var(--color-muted-bg)] border-3 border-[var(--color-border-strong)] flex items-center justify-center animate-float"
        style={{ borderWidth: '3px' }}>
        {emoji ? (
          <span className="text-4xl">{emoji}</span>
        ) : Icon ? (
          <Icon size={32} className="text-[var(--color-muted)]" />
        ) : (
          <span className="text-4xl">📭</span>
        )}
      </div>
      <div>
        <h3 className="text-lg font-bold text-[var(--color-foreground)]"
          style={{ fontFamily: 'var(--font-heading)' }}>
          {title}
        </h3>
        {description && (
          <p className="text-sm text-[var(--color-muted)] mt-1 max-w-xs">{description}</p>
        )}
      </div>
      {action && (
        <Button variant={action.variant || 'primary'} onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
