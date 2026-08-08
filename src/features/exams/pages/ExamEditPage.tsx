import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  ArrowLeft, Save, Plus, Trash2, Edit3, CheckCircle2, XCircle,
  HelpCircle, Settings, FileText, Check, Search
} from 'lucide-react';
import { AppShell } from '../../../components/layout/AppShell';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import { LoadingSpinner } from '../../../components/feedback/LoadingSpinner';
import { EmptyState } from '../../../components/feedback/EmptyState';
import { examsApi } from '../api/examsApi';
import { questionsApi, answersApi, examQuestionsApi } from '../../questions/api/questionsApi';
import { useSubjects } from '../../subjects/hooks/useSubjects';
import { ROUTES } from '../../../constants/routes';
import type { Answer } from '../../../types/models';

type TabType = 'questions' | 'settings';

interface FullQuestionItem {
  examQuestionId: string; // id from exam_questions table
  id: string; // question_id
  content: string;
  answers: Answer[];
}

export function ExamEditPage() {
  const { id: examId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [activeTab, setActiveTab] = useState<TabType>('questions');

  const { data: subjects = [] } = useSubjects();

  // Load Exam Info
  const { data: exam, isLoading: loadingExam } = useQuery({
    queryKey: ['exams', examId],
    queryFn: () => examsApi.getById(examId!),
    enabled: !!examId,
  });

  // Load Exam Questions with Answers
  const { data: examQuestionsData, isLoading: loadingQuestions, refetch: refetchQuestions } = useQuery({
    queryKey: ['exams', examId, 'questions-full'],
    queryFn: async () => {
      if (!examId) return [];
      // 1. Get exam_questions links
      const links = await examQuestionsApi.getByExam(examId);
      // 2. Fetch question detail and answers for each
      const items: FullQuestionItem[] = await Promise.all(
        links.map(async (link) => {
          try {
            const question = await questionsApi.getById(link.question_id);
            const answers = await answersApi.getByQuestion(link.question_id);
            return {
              examQuestionId: link.id,
              id: question.id,
              content: question.content,
              answers: answers || [],
            };
          } catch {
            return {
              examQuestionId: link.id,
              id: link.question_id,
              content: 'Câu hỏi không tồn tại hoặc đã xoá',
              answers: [],
            };
          }
        })
      );
      return items;
    },
    enabled: !!examId,
  });

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState<{
    title: string;
    description: string;
    subject_id: string;
    duration_minutes: number;
    total_marks: number;
    pass_percentage: number;
    is_published: boolean;
  }>({
    title: '',
    description: '',
    subject_id: '',
    duration_minutes: 60,
    total_marks: 100,
    pass_percentage: 50,
    is_published: false,
  });

  // Populate settings form when exam loads
  useEffect(() => {
    if (exam) {
      setSettingsForm({
        title: exam.title || '',
        description: exam.description || '',
        subject_id: exam.subject_id || '',
        duration_minutes: exam.duration_minutes || 60,
        total_marks: exam.total_marks || 100,
        pass_percentage: exam.pass_percentage || 50,
        is_published: Boolean(exam.is_published),
      });
    }
  }, [exam]);

  // Update Settings Mutation
  const updateSettingsMutation = useMutation({
    mutationFn: () => {
      if (!settingsForm.title.trim()) throw new Error('Tiêu đề đề thi không được để trống');
      if (!settingsForm.subject_id) throw new Error('Vui lòng chọn môn học');

      const duration = Number(settingsForm.duration_minutes);
      const totalMarks = Number(settingsForm.total_marks);
      const passPct = Number(settingsForm.pass_percentage);

      if (isNaN(duration) || duration <= 0) throw new Error('Thời gian làm bài phải là số lớn hơn 0');
      if (isNaN(totalMarks) || totalMarks <= 0) throw new Error('Tổng điểm phải là số lớn hơn 0');
      if (isNaN(passPct) || passPct <= 0 || passPct > 100) throw new Error('Phần trăm điểm để đỗ phải từ 1 đến 100');

      const payload = {
        title: settingsForm.title.trim(),
        description: settingsForm.description.trim(),
        subject_id: settingsForm.subject_id,
        duration_minutes: duration,
        total_marks: totalMarks,
        pass_percentage: passPct,
        is_published: Boolean(settingsForm.is_published),
      };

      return examsApi.update(examId!, payload);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['exams', examId] });
      qc.invalidateQueries({ queryKey: ['exams'] });
      toast.success('Cập nhật thông số đề thi thành công! ⚙️✨');
    },
    onError: (err: unknown) => {
      const msg = (err as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message || (err as { message?: string })?.message;
      toast.error(`Cập nhật thông số thất bại: ${msg || 'Vui lòng kiểm tra lại'}`);
    },
  });

  // Remove question link mutation
  const removeQuestionMutation = useMutation({
    mutationFn: (examQuestionId: string) => examQuestionsApi.delete(examQuestionId),
    onSuccess: () => {
      refetchQuestions();
      toast.success('Đã gỡ câu hỏi khỏi đề thi!');
    },
    onError: () => toast.error('Gỡ câu hỏi thất bại!'),
  });

  // --- Modals State ---
  // 1. Bank Modal
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankSearch, setBankSearch] = useState('');
  const [selectedBankIds, setSelectedBankIds] = useState<string[]>([]);

  const { data: allQuestions = [], isLoading: loadingBank } = useQuery({
    queryKey: ['questions', 'all'],
    queryFn: questionsApi.list,
    enabled: showBankModal,
  });

  const addFromBankMutation = useMutation({
    mutationFn: async () => {
      if (!examId) return;
      for (const questionId of selectedBankIds) {
        await examQuestionsApi.create({ exam_id: examId, question_id: questionId });
      }
    },
    onSuccess: () => {
      setShowBankModal(false);
      setSelectedBankIds([]);
      refetchQuestions();
      toast.success('Đã thêm các câu hỏi đã chọn vào đề thi! 🎉');
    },
    onError: () => toast.error('Thêm câu hỏi từ kho thất bại!'),
  });

  // 2. Create New Question Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newQuestionContent, setNewQuestionContent] = useState('');
  const [newAnswers, setNewAnswers] = useState<Array<{ content: string; is_correct: boolean }>>([
    { content: '', is_correct: true },
    { content: '', is_correct: false },
    { content: '', is_correct: false },
    { content: '', is_correct: false },
  ]);

  const createQuestionMutation = useMutation({
    mutationFn: async () => {
      if (!examId || !newQuestionContent.trim()) throw new Error('Vui lòng nhập nội dung câu hỏi');
      const validAnswers = newAnswers.filter((a) => a.content.trim().length > 0);
      if (validAnswers.length < 2) throw new Error('Cần ít nhất 2 đáp án');
      if (!validAnswers.some((a) => a.is_correct)) throw new Error('Phải chọn ít nhất 1 đáp án đúng');

      // 1. Create Question
      const q = await questionsApi.create({ content: newQuestionContent.trim() });
      // 2. Create Answers
      for (const ans of validAnswers) {
        await answersApi.create({
          question_id: q.id,
          content: ans.content.trim(),
          is_correct: ans.is_correct,
        });
      }
      // 3. Link to Exam
      await examQuestionsApi.create({ exam_id: examId, question_id: q.id });
    },
    onSuccess: () => {
      setShowCreateModal(false);
      setNewQuestionContent('');
      setNewAnswers([
        { content: '', is_correct: true },
        { content: '', is_correct: false },
        { content: '', is_correct: false },
        { content: '', is_correct: false },
      ]);
      refetchQuestions();
      toast.success('Tạo câu hỏi mới và thêm vào đề thi thành công! 📝✨');
    },
    onError: (err: unknown) => {
      const msg = (err as Error)?.message || 'Tạo câu hỏi thất bại!';
      toast.error(msg);
    },
  });

  // 3. Edit Question & Answers Modal
  const [editingItem, setEditingItem] = useState<FullQuestionItem | null>(null);
  const [editQuestionContent, setEditQuestionContent] = useState('');
  const [editAnswers, setEditAnswers] = useState<Array<{ id?: string; content: string; is_correct: boolean }>>([]);

  const openEditModal = (item: FullQuestionItem) => {
    setEditingItem(item);
    setEditQuestionContent(item.content);
    setEditAnswers(
      item.answers.map((a) => ({ id: a.id, content: a.content, is_correct: a.is_correct }))
    );
  };

  const updateQuestionMutation = useMutation({
    mutationFn: async () => {
      if (!editingItem || !editQuestionContent.trim()) throw new Error('Vui lòng nhập nội dung câu hỏi');

      // Update question text
      await questionsApi.update(editingItem.id, { content: editQuestionContent.trim() });

      // Process answers
      for (const ans of editAnswers) {
        if (!ans.content.trim()) continue;
        if (ans.id) {
          // Update existing
          await answersApi.update(ans.id, { content: ans.content.trim(), is_correct: ans.is_correct });
        } else {
          // Create new
          await answersApi.create({ question_id: editingItem.id, content: ans.content.trim(), is_correct: ans.is_correct });
        }
      }
    },
    onSuccess: () => {
      setEditingItem(null);
      refetchQuestions();
      toast.success('Cập nhật câu hỏi và đáp án thành công!');
    },
    onError: (err: unknown) => {
      const msg = (err as Error)?.message || 'Cập nhật thất bại!';
      toast.error(msg);
    },
  });

  const deleteAnswerMutation = useMutation({
    mutationFn: (answerId: string) => answersApi.delete(answerId),
    onSuccess: (_, answerId) => {
      setEditAnswers((prev) => prev.filter((a) => a.id !== answerId));
      toast.success('Đã xoá đáp án!');
    },
    onError: () => toast.error('Xoá đáp án thất bại!'),
  });

  if (loadingExam) {
    return (
      <AppShell title="Chỉnh sửa đề thi">
        <LoadingSpinner size="lg" label="Đang tải thông tin đề thi..." className="py-20" />
      </AppShell>
    );
  }

  if (!exam) return null;

  return (
    <AppShell title={`Chỉnh sửa: ${exam.title}`}>
      <div className="space-y-6 animate-slide-up">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[var(--color-surface)] p-5 rounded-3xl border-3 border-[var(--color-border-strong)] shadow-[4px_4px_0px_var(--color-primary)]">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<ArrowLeft size={16} />}
              onClick={() => navigate(ROUTES.ADMIN_EXAMS)}
            >
              Quay lại
            </Button>
            <div>
              <h1 className="text-xl font-extrabold text-[var(--color-foreground)] line-clamp-1"
                style={{ fontFamily: 'var(--font-heading)' }}>
                {exam.title}
              </h1>
              <p className="text-xs text-[var(--color-muted)]">ID: {exam.id}</p>
            </div>
          </div>
          <Badge variant={exam.is_published ? 'success' : 'gray'} dot size="md">
            {exam.is_published ? 'Đang mở' : 'Bản nháp'}
          </Badge>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b-3 border-[var(--color-border)] gap-2">
          <button
            onClick={() => setActiveTab('questions')}
            className={`flex items-center gap-2 px-5 py-3 font-extrabold text-sm border-b-3 -mb-[3px] transition-all cursor-pointer rounded-t-2xl ${
              activeTab === 'questions'
                ? 'border-[var(--color-primary)] text-[var(--color-primary-dark)] bg-teal-50/50'
                : 'border-transparent text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
            }`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <FileText size={18} />
            Quản lý câu hỏi ({examQuestionsData?.length ?? 0})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-5 py-3 font-extrabold text-sm border-b-3 -mb-[3px] transition-all cursor-pointer rounded-t-2xl ${
              activeTab === 'settings'
                ? 'border-[var(--color-primary)] text-[var(--color-primary-dark)] bg-teal-50/50'
                : 'border-transparent text-[var(--color-muted)] hover:text-[var(--color-foreground)]'
            }`}
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <Settings size={18} />
            Thông số đề thi
          </button>
        </div>

        {/* TAB 1: QUẢN LÝ CÂU HỎI */}
        {activeTab === 'questions' && (
          <div className="space-y-4">
            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[var(--color-surface)] p-4 rounded-2xl border-2 border-[var(--color-border)]">
              <p className="text-sm font-extrabold text-[var(--color-foreground)]"
                style={{ fontFamily: 'var(--font-heading)' }}>
                Tổng số câu hỏi: <span className="text-[var(--color-primary-dark)]">{examQuestionsData?.length ?? 0}</span>
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Plus size={16} />}
                  onClick={() => setShowBankModal(true)}
                >
                  Thêm từ kho câu hỏi
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Plus size={16} />}
                  onClick={() => setShowCreateModal(true)}
                >
                  Tạo câu hỏi mới ✨
                </Button>
              </div>
            </div>

            {/* Questions List */}
            {loadingQuestions ? (
              <LoadingSpinner size="lg" label="Đang tải danh sách câu hỏi..." className="py-12" />
            ) : !examQuestionsData || examQuestionsData.length === 0 ? (
              <EmptyState
                emoji="📝"
                title="Đề thi chưa có câu hỏi nào"
                description="Hãy chọn câu hỏi từ kho câu hỏi hoặc tạo câu hỏi mới trực tiếp!"
                action={{
                  label: 'Thêm từ kho câu hỏi',
                  onClick: () => setShowBankModal(true),
                }}
              />
            ) : (
              <div className="space-y-4">
                {examQuestionsData.map((item, idx) => (
                  <div
                    key={item.examQuestionId}
                    className="clay-card p-5 space-y-3 transition-all hover:border-[var(--color-primary)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div className="w-8 h-8 rounded-xl bg-[var(--color-primary)] border-2 border-[var(--color-primary-dark)] text-white font-extrabold text-sm flex items-center justify-center shrink-0"
                          style={{ fontFamily: 'var(--font-heading)' }}>
                          {idx + 1}
                        </div>
                        <h3 className="text-sm font-bold text-[var(--color-foreground)] leading-relaxed pt-1">
                          {item.content}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-2 rounded-xl hover:bg-teal-100 text-teal-700 transition-colors cursor-pointer"
                          title="Sửa câu hỏi & đáp án"
                          aria-label="Sửa câu hỏi & đáp án"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Gỡ câu hỏi #${idx + 1} khỏi đề thi?`)) {
                              removeQuestionMutation.mutate(item.examQuestionId);
                            }
                          }}
                          className="p-2 rounded-xl hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                          title="Gỡ khỏi đề thi"
                          aria-label="Gỡ khỏi đề thi"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Options list */}
                    {item.answers.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-11">
                        {item.answers.map((ans, aIdx) => (
                          <div
                            key={ans.id}
                            className={`px-3 py-2 rounded-xl border-2 text-xs flex items-center gap-2 ${
                              ans.is_correct
                                ? 'bg-green-50 border-green-400 font-bold text-green-800'
                                : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-foreground)]'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-lg bg-black/5 flex items-center justify-center font-extrabold text-[10px] shrink-0">
                              {String.fromCharCode(65 + aIdx)}
                            </span>
                            <span className="flex-1 truncate">{ans.content}</span>
                            {ans.is_correct && (
                              <CheckCircle2 size={14} className="text-green-600 shrink-0" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: THÔNG SỐ ĐỀ THI */}
        {activeTab === 'settings' && (
          <div className="clay-card p-6 space-y-5 max-w-3xl">
            <h2 className="text-lg font-extrabold text-[var(--color-foreground)] border-b-2 border-[var(--color-border)] pb-3"
              style={{ fontFamily: 'var(--font-heading)' }}>
              ⚙️ Cấu hình thông số đề thi
            </h2>

            <div className="space-y-4">
              <Input
                label="Tiêu đề đề thi *"
                value={settingsForm.title}
                onChange={(e) => setSettingsForm({ ...settingsForm, title: e.target.value })}
                placeholder="VD: Kiểm tra giữa kỳ Lập trình Web..."
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[var(--color-foreground)]">Mô tả đề thi</label>
                <textarea
                  rows={3}
                  value={settingsForm.description}
                  onChange={(e) => setSettingsForm({ ...settingsForm, description: e.target.value })}
                  placeholder="Mô tả chi tiết yêu cầu, phạm vi kiến thức..."
                  className="w-full px-4 py-2.5 rounded-2xl border-3 border-[var(--color-border)] bg-[var(--color-surface)] text-sm font-semibold text-[var(--color-foreground)] focus:border-[var(--color-primary)] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Môn học *"
                  value={settingsForm.subject_id}
                  onChange={(e) => setSettingsForm({ ...settingsForm, subject_id: e.target.value })}
                  options={subjects.map((s) => ({ value: s.id, label: s.name }))}
                />

                <Select
                  label="Trạng thái *"
                  value={settingsForm.is_published ? 'true' : 'false'}
                  onChange={(e) => setSettingsForm({ ...settingsForm, is_published: e.target.value === 'true' })}
                  options={[
                    { value: 'true', label: '🟢 Đang mở (Published)' },
                    { value: 'false', label: '🟡 Bản nháp (Draft)' },
                  ]}
                />

                <Input
                  label="Thời gian làm bài (phút) *"
                  type="number"
                  min={5}
                  max={300}
                  value={settingsForm.duration_minutes || ''}
                  onChange={(e) => {
                    const v = e.target.value;
                    setSettingsForm({ ...settingsForm, duration_minutes: v === '' ? 0 : Number(v) });
                  }}
                />

                <Input
                  label="Tổng điểm *"
                  type="number"
                  min={10}
                  max={1000}
                  value={settingsForm.total_marks || ''}
                  onChange={(e) => {
                    const v = e.target.value;
                    setSettingsForm({ ...settingsForm, total_marks: v === '' ? 0 : Number(v) });
                  }}
                />

                <Input
                  label="Phần trăm điểm để đỗ (%) *"
                  type="number"
                  min={1}
                  max={100}
                  value={settingsForm.pass_percentage || ''}
                  onChange={(e) => {
                    const v = e.target.value;
                    setSettingsForm({ ...settingsForm, pass_percentage: v === '' ? 0 : Number(v) });
                  }}
                />
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  variant="primary"
                  size="md"
                  leftIcon={<Save size={18} />}
                  isLoading={updateSettingsMutation.isPending}
                  onClick={() => updateSettingsMutation.mutate()}
                >
                  Lưu cấu hình đề thi
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 1: THÊM TỪ KHO CÂU HỎI */}
        <Modal
          isOpen={showBankModal}
          onClose={() => setShowBankModal(false)}
          title="📚 Chọn câu hỏi từ kho câu hỏi"
          size="lg"
        >
          <div className="space-y-4">
            <Input
              placeholder="Tìm kiếm nội dung câu hỏi..."
              value={bankSearch}
              onChange={(e) => setBankSearch(e.target.value)}
              leftIcon={<Search size={16} />}
            />

            {loadingBank ? (
              <LoadingSpinner size="md" label="Đang tải kho câu hỏi..." className="py-8" />
            ) : (
              <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
                {allQuestions
                  .filter((q) => !bankSearch || q.content.toLowerCase().includes(bankSearch.toLowerCase()))
                  .map((q) => {
                    const isAlreadyInExam = examQuestionsData?.some((eq) => eq.id === q.id);
                    const isSelected = selectedBankIds.includes(q.id);

                    return (
                      <div
                        key={q.id}
                        onClick={() => {
                          if (isAlreadyInExam) return;
                          if (isSelected) {
                            setSelectedBankIds(selectedBankIds.filter((id) => id !== q.id));
                          } else {
                            setSelectedBankIds([...selectedBankIds, q.id]);
                          }
                        }}
                        className={`p-3 rounded-2xl border-2 flex items-start gap-3 transition-all ${
                          isAlreadyInExam
                            ? 'bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed'
                            : isSelected
                            ? 'bg-teal-50 border-teal-500 shadow-sm cursor-pointer'
                            : 'bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-primary)] cursor-pointer'
                        }`}
                      >
                        <input
                          type="checkbox"
                          disabled={isAlreadyInExam}
                          checked={isAlreadyInExam || isSelected}
                          onChange={() => {}}
                          className="mt-1 cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-[var(--color-foreground)]">{q.content}</p>
                          {isAlreadyInExam && (
                            <span className="text-[10px] font-semibold text-gray-500">✓ Đã có trong đề thi</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t-2 border-[var(--color-border)]">
              <span className="text-xs font-semibold text-[var(--color-muted)]">
                Đã chọn: <strong>{selectedBankIds.length}</strong> câu
              </span>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => setShowBankModal(false)}>Hủy</Button>
                <Button
                  variant="primary"
                  isLoading={addFromBankMutation.isPending}
                  disabled={selectedBankIds.length === 0}
                  onClick={() => addFromBankMutation.mutate()}
                >
                  Thêm vào đề thi
                </Button>
              </div>
            </div>
          </div>
        </Modal>

        {/* MODAL 2: TẠO CÂU HỎI MỚI */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="✨ Tạo câu hỏi mới trực tiếp"
          size="lg"
        >
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[var(--color-foreground)]">Nội dung câu hỏi *</label>
              <textarea
                rows={3}
                value={newQuestionContent}
                onChange={(e) => setNewQuestionContent(e.target.value)}
                placeholder="Nhập nội dung câu hỏi..."
                className="w-full px-4 py-2 rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] text-sm font-semibold focus:border-[var(--color-primary)] focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--color-foreground)] flex items-center justify-between">
                <span>Danh sách đáp án (chọn radio cho đáp án đúng) *</span>
                <button
                  type="button"
                  onClick={() => setNewAnswers([...newAnswers, { content: '', is_correct: false }])}
                  className="text-xs font-bold text-teal-600 hover:underline cursor-pointer"
                >
                  + Thêm lựa chọn
                </button>
              </label>

              {newAnswers.map((ans, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="new-correct-choice"
                    checked={ans.is_correct}
                    onChange={() => {
                      setNewAnswers(
                        newAnswers.map((a, i) => ({ ...a, is_correct: i === idx }))
                      );
                    }}
                    className="w-4 h-4 cursor-pointer accent-[var(--color-primary)]"
                    title="Đánh dấu đáp án đúng"
                  />
                  <span className="text-xs font-extrabold w-5 text-center">{String.fromCharCode(65 + idx)}</span>
                  <Input
                    placeholder={`Nội dung đáp án ${String.fromCharCode(65 + idx)}...`}
                    value={ans.content}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNewAnswers(
                        newAnswers.map((a, i) => (i === idx ? { ...a, content: val } : a))
                      );
                    }}
                  />
                  {newAnswers.length > 2 && (
                    <button
                      type="button"
                      onClick={() => setNewAnswers(newAnswers.filter((_, i) => i !== idx))}
                      className="text-red-500 hover:bg-red-50 p-1.5 rounded-xl cursor-pointer"
                      title="Xóa lựa chọn"
                    >
                      <XCircle size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t-2 border-[var(--color-border)]">
              <Button variant="ghost" onClick={() => setShowCreateModal(false)}>Hủy</Button>
              <Button
                variant="primary"
                isLoading={createQuestionMutation.isPending}
                onClick={() => createQuestionMutation.mutate()}
              >
                Tạo & Thêm vào đề thi
              </Button>
            </div>
          </div>
        </Modal>

        {/* MODAL 3: SỬA CÂU HỎI & ĐÁP ÁN */}
        <Modal
          isOpen={!!editingItem}
          onClose={() => setEditingItem(null)}
          title="✏️ Chỉnh sửa câu hỏi & đáp án"
          size="lg"
        >
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[var(--color-foreground)]">Nội dung câu hỏi *</label>
              <textarea
                rows={3}
                value={editQuestionContent}
                onChange={(e) => setEditQuestionContent(e.target.value)}
                className="w-full px-4 py-2 rounded-2xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] text-sm font-semibold focus:border-[var(--color-primary)] focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[var(--color-foreground)] flex items-center justify-between">
                <span>Chỉnh sửa các đáp án *</span>
                <button
                  type="button"
                  onClick={() => setEditAnswers([...editAnswers, { content: '', is_correct: false }])}
                  className="text-xs font-bold text-teal-600 hover:underline cursor-pointer"
                >
                  + Thêm lựa chọn mới
                </button>
              </label>

              {editAnswers.map((ans, idx) => (
                <div key={ans.id || idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="edit-correct-choice"
                    checked={ans.is_correct}
                    onChange={() => {
                      setEditAnswers(
                        editAnswers.map((a, i) => ({ ...a, is_correct: i === idx }))
                      );
                    }}
                    className="w-4 h-4 cursor-pointer accent-[var(--color-primary)]"
                    title="Đánh dấu đáp án đúng"
                  />
                  <span className="text-xs font-extrabold w-5 text-center">{String.fromCharCode(65 + idx)}</span>
                  <Input
                    value={ans.content}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditAnswers(
                        editAnswers.map((a, i) => (i === idx ? { ...a, content: val } : a))
                      );
                    }}
                  />
                  {editAnswers.length > 2 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (ans.id) {
                          if (confirm('Xoá hẳn đáp án này khỏi cơ sở dữ liệu?')) {
                            deleteAnswerMutation.mutate(ans.id);
                          }
                        } else {
                          setEditAnswers(editAnswers.filter((_, i) => i !== idx));
                        }
                      }}
                      className="text-red-500 hover:bg-red-50 p-1.5 rounded-xl cursor-pointer"
                      title="Xóa lựa chọn"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t-2 border-[var(--color-border)]">
              <Button variant="ghost" onClick={() => setEditingItem(null)}>Hủy</Button>
              <Button
                variant="primary"
                isLoading={updateQuestionMutation.isPending}
                onClick={() => updateQuestionMutation.mutate()}
              >
                Cập nhật câu hỏi
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </AppShell>
  );
}
