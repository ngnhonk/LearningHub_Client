import { useNavigate } from 'react-router-dom';
import { BookOpen, ClipboardList, Play, ChevronRight } from 'lucide-react';
import { AppShell } from '../../../components/layout/AppShell';
import { Button } from '../../../components/ui/Button';
import { LoadingSpinner } from '../../../components/feedback/LoadingSpinner';
import { useAuth } from '../../auth/hooks/useAuth';
import { useSubjects } from '../../subjects/hooks/useSubjects';
import { useExams } from '../../exams/hooks/useExams';
import { useQuery } from '@tanstack/react-query';
import { attemptsApi } from '../../exam-attempts/api/attemptsApi';
import { useStartAttempt } from '../../exam-attempts/hooks/useStartAttempt';
import { ROUTES } from '../../../constants/routes';
import { formatDate as _formatDate, getSubjectColor } from '../../../lib/utils';

export function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: subjects = [], isLoading: loadingSubjects } = useSubjects();
  const { data: exams = [], isLoading: loadingExams } = useExams();
  const { data: history = [] } = useQuery({
    queryKey: ['attempts', 'me'],
    queryFn: () => attemptsApi.getUserHistory('me'),
  });
  const { mutate: startAttempt, isPending: starting } = useStartAttempt();

  const publishedExams = exams.filter((e) => e.is_published);
  const recentExams = publishedExams.slice(0, 4);
  const completedAttempts = history.filter((a) => a.status !== 'in_progress');

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Chào buổi sáng';
    if (h < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  };

  return (
    <AppShell title="Tổng quan">
      <div className="space-y-8 animate-slide-up">

        {/* Welcome hero */}
        <div className="rounded-3xl p-6 border-3 border-teal-300 shadow-[5px_5px_0px_#0d9488] relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #F0FDFA, #ECFDF5)', borderWidth: '3px' }}>
          <div className="absolute top-0 right-0 text-[120px] opacity-10 pointer-events-none select-none leading-none">🎓</div>
          <div className="relative z-10">
            <p className="text-sm font-semibold text-teal-600 mb-1">{greeting()},</p>
            <h2 className="text-2xl font-extrabold text-teal-800 mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}>
              {user?.full_name} 👋
            </h2>
            <div className="flex gap-3 flex-wrap">
              <div className="bg-white rounded-2xl px-4 py-2 border-2 border-teal-200 text-sm font-bold text-teal-700">
                📚 {subjects.length} môn học
              </div>
              <div className="bg-white rounded-2xl px-4 py-2 border-2 border-teal-200 text-sm font-bold text-teal-700">
                📝 {publishedExams.length} đề thi
              </div>
              <div className="bg-white rounded-2xl px-4 py-2 border-2 border-teal-200 text-sm font-bold text-teal-700">
                🏆 {completedAttempts.length} lần thi
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <h2 className="text-lg font-extrabold text-[var(--color-foreground)] mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}>
            🚀 Truy cập nhanh
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Môn học', emoji: '📚', to: ROUTES.SUBJECTS, color: { bg: '#F0FDFA', border: '#14B8A6', shadow: '#0D9488', text: '#0F766E' } },
              { label: 'Đề thi', emoji: '📝', to: ROUTES.EXAMS, color: { bg: '#FAF5FF', border: '#A855F7', shadow: '#9333EA', text: '#7C3AED' } },
              { label: 'Lịch sử', emoji: '📊', to: ROUTES.HISTORY, color: { bg: '#FFF7ED', border: '#F97316', shadow: '#EA6C00', text: '#C2570A' } },
              { label: 'Hồ sơ', emoji: '👤', to: ROUTES.PROFILE, color: { bg: '#FFF1F2', border: '#EC4899', shadow: '#DB2777', text: '#BE185D' } },
            ].map((item) => {
              const c = item.color;
              return (
                <button
                  key={item.to}
                  onClick={() => navigate(item.to)}
                  className="rounded-3xl p-5 text-center border-3 cursor-pointer transition-all hover:-translate-y-1"
                  style={{ background: c.bg, border: `3px solid ${c.border}`, boxShadow: `3px 3px 0px ${c.shadow}` }}
                >
                  <div className="text-3xl mb-2">{item.emoji}</div>
                  <p className="font-extrabold text-sm" style={{ color: c.text, fontFamily: 'var(--font-heading)' }}>
                    {item.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent exams */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-extrabold text-[var(--color-foreground)]"
              style={{ fontFamily: 'var(--font-heading)' }}>
              📝 Đề thi nổi bật
            </h2>
            <Button variant="ghost" size="sm" rightIcon={<ChevronRight size={14} />}
              onClick={() => navigate(ROUTES.EXAMS)}>
              Xem tất cả
            </Button>
          </div>

          {loadingExams ? <LoadingSpinner /> : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recentExams.map((exam) => (
                <div key={exam.id}
                  className="clay-card-sm p-4 flex items-center gap-3 cursor-pointer hover:-translate-y-0.5 transition-all"
                  onClick={() => navigate(ROUTES.EXAM_DETAIL(exam.id))}>
                  <div className="w-10 h-10 rounded-2xl bg-[var(--color-primary-50)] border-2 border-[var(--color-border-strong)] flex items-center justify-center shrink-0">
                    <ClipboardList size={18} className="text-[var(--color-primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-[var(--color-foreground)] truncate">{exam.title}</p>
                    <p className="text-xs text-[var(--color-muted)]">{exam.duration_minutes} phút · {exam.total_marks} pts</p>
                  </div>
                  <Button variant="primary" size="sm" leftIcon={<Play size={12} />}
                    onClick={(e) => { e.stopPropagation(); startAttempt(exam.id); }}>
                    Thi
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subject list */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-extrabold text-[var(--color-foreground)]"
              style={{ fontFamily: 'var(--font-heading)' }}>
              📚 Môn học
            </h2>
            <Button variant="ghost" size="sm" rightIcon={<ChevronRight size={14} />}
              onClick={() => navigate(ROUTES.SUBJECTS)}>
              Tất cả
            </Button>
          </div>
          {loadingSubjects ? <LoadingSpinner /> : (
            <div className="flex flex-wrap gap-2">
              {subjects.map((s) => {
                const c = getSubjectColor(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => navigate(ROUTES.EXAMS_BY_SUBJECT(s.id))}
                    className="flex items-center gap-2 px-3 py-2 rounded-2xl border-2 cursor-pointer hover:-translate-y-0.5 transition-all font-bold text-sm"
                    style={{ background: c.bg, borderColor: c.border, color: c.text }}
                  >
                    <BookOpen size={14} />
                    {s.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Starting overlay */}
      {starting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 border-3 border-teal-300 shadow-[6px_6px_0px_#0d9488] text-center"
            style={{ borderWidth: '3px' }}>
            <div className="text-5xl mb-4 animate-bounce-in">🚀</div>
            <h3 className="text-xl font-extrabold text-teal-800 mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}>
              Đang chuẩn bị bài thi...
            </h3>
            <LoadingSpinner size="md" />
          </div>
        </div>
      )}
    </AppShell>
  );
}
