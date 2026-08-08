import { BookOpen, ChevronRight, Pencil, Trash2 } from 'lucide-react';
import type { Subject } from '../../../types/models';
import { getSubjectColor } from '../../../lib/utils';
import { Badge } from '../../../components/ui/Badge';
import { useAuth } from '../../auth/hooks/useAuth';

interface SubjectCardProps {
  subject: Subject;
  examCount?: number;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  index?: number;
}

export function SubjectCard({ subject, examCount, onClick, onEdit, onDelete, index = 0 }: SubjectCardProps) {
  const { isAdmin } = useAuth();
  const color = getSubjectColor(subject.id);

  return (
    <div
      className="rounded-3xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-1 group"
      style={{
        background: color.bg,
        border: `3px solid ${color.border}`,
        boxShadow: `4px 4px 0px ${color.shadow}`,
        animationDelay: `${index * 80}ms`,
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      aria-label={`Xem môn học ${subject.name}`}
    >
      {/* Icon */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center border-3 shadow-[2px_2px_0px_rgba(0,0,0,0.15)]"
          style={{ background: color.border, borderColor: color.shadow, borderWidth: '3px' }}
        >
          <BookOpen size={22} className="text-white" />
        </div>

        {isAdmin && (
          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit?.(); }}
              className="p-1.5 rounded-xl hover:bg-white/60 transition-colors cursor-pointer"
              aria-label="Chỉnh sửa"
            >
              <Pencil size={14} style={{ color: color.text }} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
              className="p-1.5 rounded-xl hover:bg-red-100 transition-colors cursor-pointer"
              aria-label="Xoá"
            >
              <Trash2 size={14} className="text-red-500" />
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <h3 className="text-base font-extrabold mb-1 line-clamp-2"
        style={{ color: color.text, fontFamily: 'var(--font-heading)' }}>
        {subject.name}
      </h3>
      <p className="text-xs font-medium line-clamp-2 mb-4" style={{ color: color.text + 'BB' }}>
        {subject.description || 'Không có mô tả'}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        {examCount !== undefined && (
          <Badge variant="gray" size="sm">{examCount} đề thi</Badge>
        )}
        <div className="ml-auto flex items-center gap-1 text-xs font-bold"
          style={{ color: color.text }}>
          Xem đề
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}
