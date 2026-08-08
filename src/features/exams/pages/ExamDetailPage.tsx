import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Target, Trophy, Play, ArrowLeft } from 'lucide-react';
import { AppShell } from '../../../components/layout/AppShell';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { LoadingSpinner } from '../../../components/feedback/LoadingSpinner';
import { useExam } from '../hooks/useExams';
import { useStartAttempt } from '../../exam-attempts/hooks/useStartAttempt';
import { formatDuration } from '../../../lib/utils';
import { ROUTES } from '../../../constants/routes';

export function ExamDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: exam, isLoading } = useExam(id!);
  const { mutate: startAttempt, isPending: starting } = useStartAttempt();

  if (isLoading) return (
    <AppShell title="Đề thi">
      <LoadingSpinner size="lg" label="Đang tải..." className="py-20" />
    </AppShell>
  );

  if (!exam) return null;

  return (
    <AppShell title={exam.title}>
      <div className="max-w-2xl mx-auto animate-slide-up">
        <Button variant="ghost" leftIcon={<ArrowLeft size={16} />}
          onClick={() => navigate(ROUTES.EXAMS)} className="mb-4">
          Quay lại
        </Button>

        <div className="clay-card p-6 space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-extrabold text-[var(--color-foreground)]"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {exam.title}
              </h1>
              {exam.description && (
                <p className="text-sm text-[var(--color-muted)] mt-1">{exam.description}</p>
              )}
            </div>
            <Badge variant={exam.is_published ? 'success' : 'gray'} dot>
              {exam.is_published ? 'Đang mở' : 'Nháp'}
            </Badge>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: <Clock size={20} />, label: 'Thời gian', value: formatDuration(exam.duration_minutes), color: 'blue' },
              { icon: <Trophy size={20} />, label: 'Tổng điểm', value: `${exam.total_marks} điểm`, color: 'yellow' },
              { icon: <Target size={20} />, label: 'Điểm đỗ', value: `≥ ${exam.pass_percentage}%`, color: 'green' },
            ].map((s) => (
              <div key={s.label} className={`clay-card-sm clay-${s.color} p-4 text-center`}>
                <div className="flex justify-center text-[var(--color-muted)] mb-2">{s.icon}</div>
                <p className="text-xs font-semibold text-[var(--color-muted)] mb-1">{s.label}</p>
                <p className="font-extrabold text-[var(--color-foreground)]"
                  style={{ fontFamily: 'var(--font-heading)' }}>{s.value}</p>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              leftIcon={<Play size={18} />}
              isLoading={starting}
              disabled={!exam.is_published}
              onClick={() => startAttempt(exam.id)}
            >
              {exam.is_published ? 'Bắt đầu thi ngay 🚀' : 'Đề thi chưa mở'}
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
