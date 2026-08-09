import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle2, XCircle, Home, RotateCcw } from 'lucide-react';
import { attemptsApi } from '../api/attemptsApi';
import { LoadingSpinner } from '../../../components/feedback/LoadingSpinner';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { formatSeconds, formatScore } from '../../../lib/utils';
import { ROUTES } from '../../../constants/routes';
import { cn } from '../../../lib/utils';

export function ResultPage() {
  const { id: attemptId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: result, isLoading } = useQuery({
    queryKey: ['result', attemptId],
    queryFn: () => attemptsApi.getResult(attemptId!),
    enabled: !!attemptId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <LoadingSpinner size="xl" label="Đang tải kết quả..." />
      </div>
    );
  }

  if (!result) return null;

  const attemptData = result.attempt;
  const score = attemptData.score ?? 0;
  const totalMarks = result.total_marks ?? 10;
  const scorePercent = totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0;
  const passPercentage = result.pass_percentage ?? 50;
  const passed = scorePercent >= passPercentage;
  const correctCount = result.correct_count ?? 0;
  const wrongCount = result.wrong_count ?? 0;
  const timeSpentSeconds = attemptData.time_spent_seconds ?? 0;

  const rawDetails: any[] = (result as any).details || [];
  const questionsList = rawDetails.map((item, idx) => ({
    question_id: item.question?.id || String(idx),
    question_content: item.question?.content || '',
    selected_answer_content: item.selected_answer?.content || '',
    correct_answer_content: item.correct_answer?.content || '',
    is_correct: Boolean(item.is_correct),
    explanation: item.question?.explanation || '',
  }));

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-8 px-4"
      style={{ background: passed ? 'linear-gradient(135deg,#F0FDF4,#ECFDF5)' : 'linear-gradient(135deg,#FFF1F2,#FFF7ED)' }}>
      <div className="max-w-3xl mx-auto">

        {/* Result hero */}
        <div className={cn(
          'text-center rounded-3xl p-8 mb-6 border-3 shadow-[6px_6px_0px]',
          passed
            ? 'bg-white border-green-400 shadow-[6px_6px_0px_#16a34a]'
            : 'bg-white border-orange-400 shadow-[6px_6px_0px_#ea6c00]'
        )} style={{ borderWidth: '3px' }}>
          <div className="text-6xl mb-4 animate-bounce-in">
            {passed ? '🏆' : '💪'}
          </div>
          <h1 className="text-3xl font-extrabold mb-2"
            style={{ fontFamily: 'var(--font-heading)', color: passed ? '#15803d' : '#c2570a' }}>
            {passed ? 'Chúc mừng! Bạn đã vượt qua bài thi!' : 'Không sao đâu, Làm lại nhé!'}
          </h1>

          {/* Score circle */}
          <div className={cn(
            'inline-flex items-center justify-center w-24 h-24 rounded-full border-4 my-5',
            passed ? 'border-green-400 bg-green-50' : 'border-orange-400 bg-orange-50'
          )}>
            <div>
              <div className="text-3xl font-extrabold"
                style={{ color: passed ? '#15803d' : '#c2570a', fontFamily: 'var(--font-heading)' }}>
                {scorePercent}%
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {[
              { label: 'Điểm số', value: formatScore(score, totalMarks), color: 'teal' },
              { label: 'Đúng', value: `${correctCount} câu`, color: 'green' },
              { label: 'Sai', value: `${wrongCount} câu`, color: 'red' },
              { label: 'Thời gian', value: formatSeconds(timeSpentSeconds), color: 'blue' },
            ].map((stat) => (
              <div key={stat.label} className="bg-[var(--color-muted-bg)] rounded-2xl p-3 border-2 border-[var(--color-border)]">
                <p className="text-xs font-semibold text-[var(--color-muted)]">{stat.label}</p>
                <p className="text-lg font-extrabold text-[var(--color-foreground)]"
                  style={{ fontFamily: 'var(--font-heading)' }}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-center mb-8 flex-wrap">
          <Button variant="outline" leftIcon={<Home size={16} />}
            onClick={() => navigate(ROUTES.DASHBOARD)}>
            Về trang chủ
          </Button>
          <Button variant="primary" leftIcon={<RotateCcw size={16} />}
            onClick={() => navigate(ROUTES.EXAMS)}>
            Thi lại
          </Button>
        </div>

        {/* Detailed questions */}
        <h2 className="text-xl font-extrabold text-[var(--color-foreground)] mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}>
          📋 Chi tiết từng câu
        </h2>
        <div className="space-y-3">
          {questionsList.map((q, i) => (
            <div key={q.question_id}
              className={cn(
                'rounded-2xl p-4 border-3 transition-all',
                q.is_correct
                  ? 'bg-green-50 border-green-300 shadow-[3px_3px_0px_#16a34a]'
                  : 'bg-red-50 border-red-300 shadow-[3px_3px_0px_#dc2626]'
              )}
              style={{ borderWidth: '3px' }}>
              <div className="flex items-start gap-3">
                <div className={cn(
                  'w-8 h-8 rounded-xl border-2 flex items-center justify-center shrink-0 font-extrabold text-sm',
                  q.is_correct
                    ? 'bg-green-500 border-green-700 text-white'
                    : 'bg-red-400 border-red-600 text-white'
                )}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[var(--color-foreground)] mb-2">{q.question_content}</p>

                  {/* Selected answer */}
                  {q.selected_answer_content && (
                    <div className="flex items-center gap-2 text-xs mb-1">
                      {q.is_correct
                        ? <CheckCircle2 size={14} className="text-green-600 shrink-0" />
                        : <XCircle size={14} className="text-red-500 shrink-0" />
                      }
                      <span className={cn('font-semibold', q.is_correct ? 'text-green-700' : 'text-red-600')}>
                        Bạn chọn: {q.selected_answer_content}
                      </span>
                    </div>
                  )}

                  {/* Correct answer (if wrong) */}
                  {!q.is_correct && (
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle2 size={14} className="text-green-600 shrink-0" />
                      <span className="font-semibold text-green-700">Đáp án: {q.correct_answer_content}</span>
                    </div>
                  )}

                  {q.explanation && (
                    <p className="text-xs text-[var(--color-muted)] mt-2 italic">💡 {q.explanation}</p>
                  )}
                </div>
                <Badge variant={q.is_correct ? 'success' : 'danger'} size="sm">
                  {q.is_correct ? '✓ Đúng' : '✗ Sai'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
