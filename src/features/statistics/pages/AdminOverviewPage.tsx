import { useQuery } from '@tanstack/react-query';
import { Users, BookOpen, ClipboardList, Activity, TrendingUp, Award } from 'lucide-react';
import { AppShell } from '../../../components/layout/AppShell';
import { LoadingSpinner } from '../../../components/feedback/LoadingSpinner';
import { statisticsApi } from '../api/statisticsApi';
import { useSubjects } from '../../subjects/hooks/useSubjects';
import { useExams } from '../../exams/hooks/useExams';

const statCards = [
  { key: 'total_users', label: 'Học sinh', icon: <Users size={24} />, color: { bg: '#EFF6FF', border: '#3B82F6', shadow: '#2563EB', text: '#1E40AF' } },
  { key: 'total_subjects', label: 'Môn học', icon: <BookOpen size={24} />, color: { bg: '#F0FDFA', border: '#14B8A6', shadow: '#0D9488', text: '#0F766E' } },
  { key: 'total_exams', label: 'Đề thi', icon: <ClipboardList size={24} />, color: { bg: '#FAF5FF', border: '#A855F7', shadow: '#9333EA', text: '#7C3AED' } },
  { key: 'total_attempts', label: 'Lượt thi', icon: <Activity size={24} />, color: { bg: '#FFF7ED', border: '#F97316', shadow: '#EA6C00', text: '#C2570A' } },
];

export function AdminOverviewPage() {
  const { data: overview, isLoading } = useQuery({
    queryKey: ['statistics', 'overview'],
    queryFn: statisticsApi.getAdminOverview,
  });
  const { data: subjects = [] } = useSubjects();
  const { data: exams = [] } = useExams();

  return (
    <AppShell title="Tổng quan hệ thống">
      {isLoading ? (
        <LoadingSpinner size="lg" label="Đang tải thống kê..." className="py-20" />
      ) : (
        <div className="space-y-8 animate-slide-up">
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((card) => {
              const c = card.color;
              const value = overview?.[card.key as keyof typeof overview] ?? 0;
              return (
                <div key={card.key} className="rounded-3xl p-5 border-3 transition-all hover:-translate-y-1"
                  style={{ background: c.bg, border: `3px solid ${c.border}`, boxShadow: `4px 4px 0px ${c.shadow}` }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-2xl border-2" style={{ background: c.border + '20', borderColor: c.border, color: c.text }}>
                      {card.icon}
                    </div>
                    <TrendingUp size={16} style={{ color: c.text + '80' }} />
                  </div>
                  <p className="text-3xl font-extrabold mb-1" style={{ color: c.text, fontFamily: 'var(--font-heading)' }}>
                    {value.toLocaleString()}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: c.text + 'AA' }}>{card.label}</p>
                </div>
              );
            })}
          </div>

          {/* Quick subject list */}
          <div>
            <h2 className="text-xl font-extrabold text-[var(--color-foreground)] mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}>
              📚 Các môn học ({subjects.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {subjects.map((s) => {
                const examCount = exams.filter((e) => e.subject_id === s.id).length;
                return (
                  <div key={s.id} className="clay-card-sm px-4 py-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)] border-2 border-[var(--color-primary-dark)] flex items-center justify-center shrink-0">
                      <BookOpen size={16} className="text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-[var(--color-foreground)] truncate">{s.name}</p>
                      <p className="text-xs text-[var(--color-muted)]">{examCount} đề thi</p>
                    </div>
                    <Award size={16} className="text-[var(--color-accent)] shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
