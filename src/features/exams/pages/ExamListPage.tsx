import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Plus, Search, Upload } from 'lucide-react';
import { AppShell } from '../../../components/layout/AppShell';
import { ExamCard } from '../components/ExamCard';
import { ExamImportModal } from '../components/ExamImportModal';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Select } from '../../../components/ui/Select';
import { LoadingSpinner } from '../../../components/feedback/LoadingSpinner';
import { EmptyState } from '../../../components/feedback/EmptyState';
import { useExams, useDeleteExam } from '../hooks/useExams';
import { useSubjects } from '../../subjects/hooks/useSubjects';
import { useStartAttempt } from '../../exam-attempts/hooks/useStartAttempt';
import { useAuth } from '../../auth/hooks/useAuth';
import { ROUTES } from '../../../constants/routes';

export function ExamListPage() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: exams = [], isLoading } = useExams();
  const { data: subjects = [] } = useSubjects();
  const { mutate: deleteExam } = useDeleteExam();
  const { mutate: startAttempt, isPending: starting } = useStartAttempt();

  const [search, setSearch] = useState('');
  const [showImport, setShowImport] = useState(false);
  const subjectFilter = searchParams.get('subject') || '';

  const filtered = exams
    .filter((e) => !subjectFilter || e.subject_id === subjectFilter)
    .filter((e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description?.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <AppShell title="Đề thi">
      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 items-start sm:items-center">
        <div className="flex gap-3 flex-1 flex-wrap">
          <div className="min-w-[200px] flex-1">
            <Input
              id="exam-search"
              placeholder="Tìm đề thi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>
          <div className="min-w-[180px]">
            <Select
              placeholder="Tất cả môn học"
              value={subjectFilter}
              onChange={(e) => {
                const v = e.target.value;
                if (v) setSearchParams({ subject: v });
                else setSearchParams({});
              }}
              options={subjects.map((s) => ({ value: s.id, label: s.name }))}
            />
          </div>
        </div>

        {isAdmin && (
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" leftIcon={<Upload size={16} />} onClick={() => setShowImport(true)}>
              Import Excel
            </Button>
            <Button variant="primary" leftIcon={<Plus size={16} />} onClick={() => navigate(ROUTES.ADMIN_EXAMS)}>
              Tạo đề thi
            </Button>
          </div>
        )}
      </div>

      {/* Count */}
      <p className="text-sm text-[var(--color-muted)] mb-4">
        {filtered.length} đề thi {subjectFilter && `trong môn đã chọn`}
      </p>

      {/* Grid */}
      {isLoading ? (
        <LoadingSpinner size="lg" label="Đang tải đề thi..." className="py-20" />
      ) : filtered.length === 0 ? (
        <EmptyState
          emoji="📝"
          title="Chưa có đề thi nào"
          description={search ? `Không có kết quả cho "${search}"` : 'Admin hãy tạo hoặc import đề thi!'}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((exam) => (
            <ExamCard
              key={exam.id}
              exam={exam}
              onClick={() => navigate(ROUTES.EXAM_DETAIL(exam.id))}
              onStart={() => startAttempt(exam.id)}
              onEdit={() => navigate(ROUTES.ADMIN_EXAM_DETAIL(exam.id))}
              onDelete={() => {
                if (confirm(`Xoá đề thi "${exam.title}"?`)) deleteExam(exam.id);
              }}
            />
          ))}
        </div>
      )}

      <ExamImportModal isOpen={showImport} onClose={() => setShowImport(false)} />

      {/* Starting overlay */}
      {starting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[var(--color-surface)] rounded-3xl p-8 border-3 border-[var(--color-border-strong)] shadow-[6px_6px_0px_var(--color-primary)] text-center"
            style={{ borderWidth: '3px' }}>
            <div className="text-4xl mb-4 animate-bounce-in">🚀</div>
            <h3 className="text-xl font-extrabold text-[var(--color-foreground)] mb-2"
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
