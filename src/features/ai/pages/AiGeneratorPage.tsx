import { useState } from 'react';
import { AppShell } from '../../../components/layout/AppShell';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { LoadingSpinner } from '../../../components/feedback/LoadingSpinner';
import { Badge } from '../../../components/ui/Badge';
import { Sparkles, Upload, RefreshCw, Database } from 'lucide-react';
import { useGenerateExam, useVectorStatus, useSyncQuestions, useUploadDocument } from '../hooks/useGenerateExam';
import { useSubjects } from '../../subjects/hooks/useSubjects';
import type { AIDifficulty, AILanguage, AIProvider } from '../../../types/models';

const DIFFICULTIES: { value: AIDifficulty; label: string }[] = [
  { value: 'easy', label: '🟢 Dễ' },
  { value: 'medium', label: '🟡 Trung bình' },
  { value: 'hard', label: '🔴 Khó' },
  { value: 'mixed', label: '🌈 Hỗn hợp' },
];

const PROVIDERS: { value: AIProvider; label: string }[] = [
  { value: 'openrouter', label: 'OpenRouter' },
  { value: 'ollama', label: 'Ollama (local)' },
  { value: 'nvidia', label: 'NVIDIA NIM' },
];

export function AiGeneratorPage() {
  const { data: subjects = [] } = useSubjects();
  const { mutate: generate, isPending: generating } = useGenerateExam();
  const { data: vectorStatus } = useVectorStatus();
  const { mutate: syncQuestions, isPending: syncing } = useSyncQuestions();
  const { mutate: uploadDocument, isPending: uploading } = useUploadDocument();

  const [form, setForm] = useState({
    subject_id: '',
    topic: '',
    num_questions: 10,
    difficulty: 'medium' as AIDifficulty,
    language: 'vi' as AILanguage,
    exam_title: '',
    exam_duration_minutes: 45,
    provider: 'openrouter' as AIProvider,
    auto_save: true,
  });
  const [docFile, setDocFile] = useState<File | null>(null);
  const [docSubjectId, setDocSubjectId] = useState('');

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleGenerate = () => generate(form);

  return (
    <AppShell title="AI Generator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Generate form */}
        <div className="lg:col-span-2">
          <div className="clay-card p-6 space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 border-3 border-purple-700 flex items-center justify-center"
                style={{ borderWidth: '3px' }}>
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-[var(--color-foreground)]"
                  style={{ fontFamily: 'var(--font-heading)' }}>
                  Tạo đề thi bằng AI
                </h2>
                <p className="text-xs text-[var(--color-muted)]">LLM + RAG tự động sinh câu hỏi</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Môn học *"
                placeholder="Chọn môn học..."
                value={form.subject_id}
                onChange={set('subject_id')}
                options={subjects.map((s) => ({ value: s.id, label: s.name }))}
              />
              <Select
                label="Provider AI"
                value={form.provider}
                onChange={set('provider')}
                options={PROVIDERS}
              />
              <Input
                label="Tiêu đề đề thi *"
                placeholder="Đề kiểm tra Tối ưu SQL..."
                value={form.exam_title}
                onChange={set('exam_title')}
              />
              <Input
                label="Chủ đề / Topic *"
                placeholder="Tối ưu hóa truy vấn SQL..."
                value={form.topic}
                onChange={set('topic')}
              />
              <Select
                label="Độ khó"
                value={form.difficulty}
                onChange={set('difficulty')}
                options={DIFFICULTIES}
              />
              <Select
                label="Ngôn ngữ"
                value={form.language}
                onChange={set('language')}
                options={[{ value: 'vi', label: '🇻🇳 Tiếng Việt' }, { value: 'en', label: '🇺🇸 English' }]}
              />
              <Input
                label="Số câu hỏi"
                type="number"
                min={1}
                max={50}
                value={form.num_questions}
                onChange={set('num_questions')}
              />
              <Input
                label="Thời gian thi (phút)"
                type="number"
                min={5}
                max={300}
                value={form.exam_duration_minutes}
                onChange={set('exam_duration_minutes')}
              />
            </div>

            <Button
              variant="secondary"
              size="lg"
              fullWidth
              leftIcon={generating ? undefined : <Sparkles size={18} />}
              isLoading={generating}
              onClick={handleGenerate}
              disabled={!form.subject_id || !form.topic || !form.exam_title}
            >
              {generating ? 'AI đang tạo đề thi... 🤖' : 'Tạo đề thi bằng AI ✨'}
            </Button>

            {generating && (
              <div className="text-center space-y-2">
                <LoadingSpinner size="md" />
                <p className="text-sm font-semibold text-[var(--color-muted)] animate-pulse">
                  AI đang suy nghĩ và tạo câu hỏi... ⏳
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar tools */}
        <div className="space-y-4">
          {/* Vector status */}
          <div className="clay-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Database size={18} className="text-[var(--color-primary)]" />
              <h3 className="font-extrabold text-sm text-[var(--color-foreground)]"
                style={{ fontFamily: 'var(--font-heading)' }}>
                Vector DB Status
              </h3>
            </div>
            {vectorStatus ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--color-muted)]">Trạng thái</span>
                  <Badge variant="success" size="sm" dot>{vectorStatus.status || 'Hoạt động'}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--color-muted)]">Số vector</span>
                  <span className="text-sm font-bold text-[var(--color-foreground)]">{(vectorStatus.count ?? 0).toLocaleString()}</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[var(--color-muted)]">Đang kiểm tra...</p>
            )}
          </div>

          {/* Upload document */}
          <div className="clay-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Upload size={18} className="text-[var(--color-accent)]" />
              <h3 className="font-extrabold text-sm text-[var(--color-foreground)]"
                style={{ fontFamily: 'var(--font-heading)' }}>
                Upload tài liệu
              </h3>
            </div>
            <Select
              placeholder="Chọn môn học..."
              value={docSubjectId}
              onChange={(e) => setDocSubjectId(e.target.value)}
              options={subjects.map((s) => ({ value: s.id, label: s.name }))}
            />
            <input
              type="file"
              accept=".md,.txt"
              onChange={(e) => setDocFile(e.target.files?.[0] ?? null)}
              className="text-xs text-[var(--color-muted)] w-full cursor-pointer"
              aria-label="Chọn file tài liệu"
            />
            {docFile && <p className="text-xs font-semibold text-teal-600">📄 {docFile.name}</p>}
            <Button
              variant="outline"
              size="sm"
              fullWidth
              isLoading={uploading}
              disabled={!docFile || !docSubjectId}
              onClick={() => docFile && uploadDocument({ file: docFile, subjectId: docSubjectId })}
              leftIcon={<Upload size={14} />}
            >
              Upload
            </Button>
          </div>

          {/* Sync questions */}
          <div className="clay-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <RefreshCw size={18} className="text-[var(--color-purple)]" />
              <h3 className="font-extrabold text-sm text-[var(--color-foreground)]"
                style={{ fontFamily: 'var(--font-heading)' }}>
                Đồng bộ Vector DB
              </h3>
            </div>
            <Select
              placeholder="Chọn môn học..."
              value={form.subject_id}
              onChange={set('subject_id')}
              options={subjects.map((s) => ({ value: s.id, label: s.name }))}
            />
            <Button
              variant="outline"
              size="sm"
              fullWidth
              isLoading={syncing}
              disabled={!form.subject_id}
              onClick={() => syncQuestions(form.subject_id)}
              leftIcon={<RefreshCw size={14} />}
            >
              Đồng bộ
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
