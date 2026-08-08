import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../../../components/layout/AppShell';
import { SubjectCard } from '../components/SubjectCard';
import { SubjectForm } from '../components/SubjectForm';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { LoadingSpinner } from '../../../components/feedback/LoadingSpinner';
import { EmptyState } from '../../../components/feedback/EmptyState';
import { useSubjects, useCreateSubject, useUpdateSubject, useDeleteSubject } from '../hooks/useSubjects';
import { useAuth } from '../../auth/hooks/useAuth';
import { ROUTES } from '../../../constants/routes';
import type { Subject } from '../../../types/models';

export function SubjectListPage() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { data: subjects = [], isLoading } = useSubjects();
  const { mutate: createSubject, isPending: creating } = useCreateSubject();
  const { mutate: updateSubject, isPending: updating } = useUpdateSubject();
  const { mutate: deleteSubject } = useDeleteSubject();

  const [search, setSearch] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [editTarget, setEditTarget] = useState<Subject | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Subject | null>(null);

  const filtered = subjects.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppShell title="Môn học">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
        <div>
          <p className="text-[var(--color-muted)] text-sm">
            {subjects.length} môn học · Chọn môn để xem đề thi
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="flex-1 sm:w-64">
            <Input
              id="subject-search"
              placeholder="Tìm môn học..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search size={16} />}
            />
          </div>
          {isAdmin && (
            <Button
              variant="primary"
              leftIcon={<Plus size={18} />}
              onClick={() => setShowCreate(true)}
            >
              Thêm môn
            </Button>
          )}
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <LoadingSpinner size="lg" label="Đang tải môn học..." className="py-20" />
      ) : filtered.length === 0 ? (
        <EmptyState
          emoji="📚"
          title={search ? 'Không tìm thấy môn học' : 'Chưa có môn học nào'}
          description={search ? `Không có kết quả cho "${search}"` : 'Admin hãy thêm môn học để học sinh có thể học!'}
          action={isAdmin ? { label: '+ Thêm môn học', onClick: () => setShowCreate(true) } : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((subject, i) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              index={i}
              onClick={() => navigate(ROUTES.EXAMS_BY_SUBJECT(subject.id))}
              onEdit={() => setEditTarget(subject)}
              onDelete={() => setDeleteTarget(subject)}
            />
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="📚 Thêm môn học mới">
        <SubjectForm
          onSubmit={(data) => { createSubject(data); setShowCreate(false); }}
          isLoading={creating}
          onCancel={() => setShowCreate(false)}
          submitLabel="Tạo môn học"
        />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editTarget} onClose={() => setEditTarget(null)} title="✏️ Chỉnh sửa môn học">
        {editTarget && (
          <SubjectForm
            initial={editTarget}
            onSubmit={(data) => { updateSubject({ id: editTarget.id, ...data }); setEditTarget(null); }}
            isLoading={updating}
            onCancel={() => setEditTarget(null)}
            submitLabel="Cập nhật"
          />
        )}
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="🗑️ Xác nhận xoá" size="sm">
        {deleteTarget && (
          <div className="space-y-4">
            <p className="text-sm text-[var(--color-foreground)]">
              Bạn có chắc muốn xoá môn <strong>"{deleteTarget.name}"</strong>?<br />
              <span className="text-red-500 font-semibold">⚠️ Tất cả đề thi thuộc môn này sẽ bị xoá!</span>
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Huỷ</Button>
              <Button variant="danger" onClick={() => { deleteSubject(deleteTarget.id); setDeleteTarget(null); }}>
                Xoá
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </AppShell>
  );
}
