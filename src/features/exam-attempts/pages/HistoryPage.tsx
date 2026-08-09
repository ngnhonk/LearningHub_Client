import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Eye, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { AppShell } from '../../../components/layout/AppShell';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { LoadingSpinner } from '../../../components/feedback/LoadingSpinner';
import { EmptyState } from '../../../components/feedback/EmptyState';
import { attemptsApi } from '../api/attemptsApi';
import { ROUTES } from '../../../constants/routes';
import { formatDate, formatSeconds } from '../../../lib/utils';
import type { AttemptStatus } from '../../../types/models';

const statusConfig: Record<AttemptStatus, { variant: 'success' | 'warning' | 'danger' | 'gray'; label: string; icon: React.ReactNode }> = {
  submitted: { variant: 'success', label: 'Đã nộp', icon: <CheckCircle2 size={12} /> },
  in_progress: { variant: 'warning', label: 'Đang làm', icon: <Clock size={12} /> },
  time_out: { variant: 'danger', label: 'Hết giờ', icon: <AlertCircle size={12} /> },
};

export function HistoryPage() {
  const navigate = useNavigate();
  const { data: history = [], isLoading } = useQuery({
    queryKey: ['attempts', 'me'],
    queryFn: () => attemptsApi.getUserHistory('me'),
  });

  return (
    <AppShell title="Lịch sử làm bài">
      {isLoading ? (
        <LoadingSpinner size="lg" label="Đang tải lịch sử..." className="py-20" />
      ) : history.length === 0 ? (
        <EmptyState
          emoji="📊"
          title="Chưa có lần thi nào"
          description="Bắt đầu làm bài thi để xem lịch sử của bạn!"
          action={{ label: 'Xem đề thi', onClick: () => navigate(ROUTES.EXAMS) }}
        />
      ) : (
        <div className="space-y-3 animate-slide-up">
          {history.map((attempt, i) => {
            const status = statusConfig[attempt.status];
            return (
              <div
                key={attempt.id}
                className="clay-card-sm p-4 flex items-center gap-4"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="w-10 h-10 rounded-2xl bg-[var(--color-muted-bg)] border-2 border-[var(--color-border)] flex items-center justify-center shrink-0 font-extrabold text-sm text-[var(--color-muted)]"
                  style={{ fontFamily: 'var(--font-heading)' }}>
                  {i + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[var(--color-foreground)] line-clamp-1">
                    {attempt.exam?.title || `Lần thi #${attempt.id.slice(-8)}`}
                  </p>
                  <p className="text-xs text-[var(--color-muted)]">
                    {formatDate(attempt.started_at)}
                    {attempt.time_spent_seconds && ` · ${formatSeconds(attempt.time_spent_seconds)}`}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {attempt.score !== null && (
                    <span className="text-lg font-extrabold text-[var(--color-foreground)]"
                      style={{ fontFamily: 'var(--font-heading)' }}>
                      {Number(attempt.score).toFixed(1)}{attempt.exam?.total_marks ? `/${attempt.exam.total_marks}` : ''} pts
                    </span>
                  )}
                  <Badge variant={status.variant} size="sm">
                    {status.label}
                  </Badge>
                  {attempt.status !== 'in_progress' && (
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Eye size={14} />}
                      onClick={() => navigate(ROUTES.EXAM_RESULT(attempt.id))}
                    >
                      Xem
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
