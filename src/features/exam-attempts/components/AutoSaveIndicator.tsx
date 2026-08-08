import { CheckCircle2, CloudUpload, Clock } from 'lucide-react';
import { useAttemptStore } from '../store/attemptStore';
import { formatDate } from '../../../lib/utils';

export function AutoSaveIndicator() {
  const { isSaving, lastSavedAt } = useAttemptStore();

  if (isSaving) {
    return (
      <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-muted)]">
        <CloudUpload size={14} className="animate-pulse text-[var(--color-primary)]" />
        Đang lưu...
      </div>
    );
  }

  if (lastSavedAt) {
    return (
      <div className="flex items-center gap-1.5 text-xs font-semibold text-green-600">
        <CheckCircle2 size={14} />
        Đã lưu {formatDate(lastSavedAt.toISOString())}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-muted)]">
      <Clock size={14} />
      Tự động lưu
    </div>
  );
}
