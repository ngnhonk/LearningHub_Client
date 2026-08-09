import { Clock, Target, Trophy, ChevronRight, Pencil, Trash2, Play } from 'lucide-react';
import type { Exam } from '../../../types/models';
import { formatDuration } from '../../../lib/utils';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { useAuth } from '../../auth/hooks/useAuth';

interface ExamCardProps {
  exam: Exam;
  onClick?: () => void;
  onStart?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const cardColors = [
  { bg: '#EFF6FF', border: '#3B82F6', shadow: '#2563EB', text: '#1E40AF' },
  { bg: '#FFF7ED', border: '#F97316', shadow: '#EA6C00', text: '#C2570A' },
  { bg: '#F0FDFA', border: '#14B8A6', shadow: '#0D9488', text: '#0F766E' },
  { bg: '#FAF5FF', border: '#A855F7', shadow: '#9333EA', text: '#7C3AED' },
  { bg: '#FFF1F2', border: '#EC4899', shadow: '#DB2777', text: '#BE185D' },
  { bg: '#F0FDF4', border: '#22C55E', shadow: '#16A34A', text: '#15803D' },
  { bg: '#FEFCE8', border: '#EAB308', shadow: '#CA8A04', text: '#A16207' },
];

function getExamColor(id: string) {
  const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return cardColors[hash % cardColors.length];
}

export function ExamCard({ exam, onClick, onStart, onEdit, onDelete }: ExamCardProps) {
  const { isAdmin } = useAuth();
  const color = getExamColor(exam.id);



  return (
    <div
      className="rounded-3xl p-5 transition-all duration-200 hover:-translate-y-1 group relative"
      style={{
        background: color.bg,
        border: `3px solid ${color.border}`,
        boxShadow: `4px 4px 0px ${color.shadow}`,
      }}
    >
      {/* Published badge */}
      <div className="flex items-start justify-between mb-3">
        <Badge
          variant={exam.is_published ? 'success' : 'gray'}
          size="sm"
          dot
        >
          {exam.is_published ? 'Sẵn sàng' : 'Tạm khoá'}
        </Badge>

        {isAdmin && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={(e) => { e.stopPropagation(); onEdit?.(); }}
              className="p-1.5 rounded-xl hover:bg-white/60 cursor-pointer" aria-label="Sửa">
              <Pencil size={14} style={{ color: color.text }} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
              className="p-1.5 rounded-xl hover:bg-red-100 cursor-pointer" aria-label="Xoá">
              <Trash2 size={14} className="text-red-500" />
            </button>
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-base font-extrabold mb-1 line-clamp-2 cursor-pointer hover:underline"
        style={{ color: color.text, fontFamily: 'var(--font-heading)' }}
        onClick={onClick}>
        {exam.title}
      </h3>
      {exam.description && (
        <p className="text-xs mb-3 line-clamp-1" style={{ color: color.text + 'AA' }}>{exam.description}</p>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { icon: <Clock size={12} />, label: formatDuration(exam.duration_minutes) },
          { icon: <Trophy size={12} />, label: `${exam.total_marks} pts` },
          { icon: <Target size={12} />, label: `Đỗ ≥${exam.pass_percentage}%` },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl"
            style={{ background: color.border + '20' }}>
            <span style={{ color: color.text }}>{stat.icon}</span>
            <span className="text-xs font-bold" style={{ color: color.text }}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      {!isAdmin && exam.is_published && onStart && (
        <Button
          variant="primary"
          size="sm"
          fullWidth
          leftIcon={<Play size={14} />}
          onClick={(e) => { e.stopPropagation(); onStart(); }}
        >
          Bắt đầu thi
        </Button>
      )}
      {isAdmin && (
        <button className="w-full flex items-center justify-end gap-1 text-xs font-bold mt-1 cursor-pointer"
          style={{ color: color.text }} onClick={onClick}>
          Xem chi tiết <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}
