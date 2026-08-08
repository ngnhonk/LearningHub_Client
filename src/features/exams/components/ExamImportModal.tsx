import { useState, useRef } from 'react';
import { Upload, FileSpreadsheet, X } from 'lucide-react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import { Select } from '../../../components/ui/Select';
import { useImportExam } from '../hooks/useExams';
import { useSubjects } from '../../subjects/hooks/useSubjects';

interface ExamImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExamImportModal({ isOpen, onClose }: ExamImportModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [subjectId, setSubjectId] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { mutate: importExam, isPending } = useImportExam();
  const { data: subjects = [] } = useSubjects();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f && (f.name.endsWith('.xlsx') || f.name.endsWith('.xls'))) {
      setFile(f);
    }
  };

  const handleImport = () => {
    if (!file) return;
    importExam({ file, subjectId: subjectId || undefined });
    onClose();
    setFile(null);
    setSubjectId('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="📊 Import đề thi từ Excel" size="md">
      <div className="space-y-4">
        {/* Dropzone */}
        <div
          className={`border-3 rounded-2xl p-8 text-center cursor-pointer transition-all duration-150 ${
            isDragging
              ? 'border-[var(--color-primary)] bg-[var(--color-primary-50)]'
              : 'border-dashed border-[var(--color-border-strong)] hover:border-[var(--color-primary)]'
          }`}
          style={{ borderWidth: '3px', borderStyle: isDragging ? 'solid' : 'dashed' }}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
        >
          <input
            ref={fileRef}
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            aria-label="Chọn file Excel"
          />

          {file ? (
            <div className="flex items-center justify-center gap-3">
              <FileSpreadsheet size={32} className="text-green-500" />
              <div className="text-left">
                <p className="font-bold text-[var(--color-foreground)]">{file.name}</p>
                <p className="text-xs text-[var(--color-muted)]">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setFile(null); }}
                className="ml-2 p-1 rounded-lg hover:bg-red-100 cursor-pointer"
              >
                <X size={16} className="text-red-500" />
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload size={32} className="mx-auto text-[var(--color-muted)]" />
              <p className="font-bold text-[var(--color-foreground)]">Kéo thả file Excel vào đây</p>
              <p className="text-xs text-[var(--color-muted)]">hoặc click để chọn file (.xlsx)</p>
            </div>
          )}
        </div>

        {/* Subject select */}
        <Select
          label="Môn học (tuỳ chọn)"
          placeholder="— Chọn môn học —"
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          options={subjects.map((s) => ({ value: s.id, label: s.name }))}
        />

        <div className="text-xs text-[var(--color-muted)] bg-[var(--color-muted-bg)] p-3 rounded-xl">
          📋 File Excel phải có <strong>2 sheet</strong>: <code>Exam</code> và <code>Questions</code>.
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={onClose}>Huỷ</Button>
          <Button
            variant="primary"
            onClick={handleImport}
            isLoading={isPending}
            disabled={!file}
            leftIcon={<Upload size={16} />}
          >
            Import
          </Button>
        </div>
      </div>
    </Modal>
  );
}
