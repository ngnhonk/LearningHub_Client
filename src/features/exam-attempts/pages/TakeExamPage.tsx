import { useEffect, useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { ExamTimer } from '../components/ExamTimer';
import { QuestionNavigator } from '../components/QuestionNavigator';
import { AutoSaveIndicator } from '../components/AutoSaveIndicator';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { LoadingSpinner } from '../../../components/feedback/LoadingSpinner';
import { useAttemptStore } from '../store/attemptStore';
import { useSaveAnswers } from '../hooks/useSaveAnswers';
import { useSubmitAttempt } from '../hooks/useSubmitAttempt';
import { attemptsApi } from '../api/attemptsApi';
import { ROUTES } from '../../../constants/routes';
import { cn } from '../../../lib/utils';

export function TakeExamPage() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const {
    questions, selectedAnswers, currentQuestionIndex,
    setCurrentQuestion, setAnswer, attemptId, initAttempt,
  } = useAttemptStore();

  const { mutate: saveAnswers } = useSaveAnswers();
  const { mutate: submitAttempt, isPending: submitting } = useSubmitAttempt();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isLoading, setIsLoading] = useState(!attemptId);

  // Restore state if page is refreshed (F5)
  useEffect(() => {
    if (!examId) return;
    if (attemptId) { setIsLoading(false); return; }

    // Attempt to resume active session
    attemptsApi.getActive(examId)
      .then((active) => {
        const duration = 60 * 60; // Default 60 min; ideally from exam metadata
        initAttempt(active.attempt.id, examId, active.questions, active.saved_answers, duration);
        setIsLoading(false);
      })
      .catch(() => {
        navigate(ROUTES.EXAMS);
      });
  }, [examId, attemptId]);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (attemptId && Object.keys(selectedAnswers).length > 0) {
        saveAnswers();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [attemptId, selectedAnswers, saveAnswers]);

  const handleTimeUp = useCallback(() => {
    submitAttempt();
  }, [submitAttempt]);

  const handleSubmit = () => {
    submitAttempt();
    setShowSubmitModal(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <LoadingSpinner size="xl" label="Đang tải bài thi..." />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = Object.keys(selectedAnswers).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col"
      style={{ background: 'linear-gradient(135deg, #F0FDFA 0%, #FFF7ED 100%)' }}>
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-[var(--color-surface)] border-b-3 border-[var(--color-border-strong)] px-4 py-3 flex items-center justify-between gap-4"
        style={{ borderBottomWidth: '3px' }}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 border-2 border-teal-700 flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-bold">📝</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-[var(--color-muted)] font-semibold">Câu {currentQuestionIndex + 1}/{questions.length}</p>
            <p className="text-sm font-bold text-[var(--color-foreground)] truncate">
              {answeredCount}/{questions.length} đã trả lời
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AutoSaveIndicator />
          <ExamTimer onTimeUp={handleTimeUp} />
          <Button
            variant="danger"
            size="sm"
            leftIcon={<Send size={14} />}
            onClick={() => setShowSubmitModal(true)}
          >
            Nộp bài
          </Button>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full gap-0">
        {/* Main question area */}
        <div className="flex-1 p-4 md:p-8">
          {currentQuestion && (
            <div className="animate-slide-up">
              {/* Question card */}
              <div className="clay-card p-6 mb-6">
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-[var(--color-primary)] border-2 border-[var(--color-primary-dark)] flex items-center justify-center shrink-0 text-white font-extrabold text-sm"
                    style={{ fontFamily: 'var(--font-heading)' }}>
                    {currentQuestionIndex + 1}
                  </div>
                  <p className="text-base font-bold text-[var(--color-foreground)] leading-relaxed flex-1">
                    {currentQuestion.content}
                  </p>
                </div>

                {/* Answers */}
                <div className="space-y-3">
                  {currentQuestion.answers.map((answer, i) => {
                    const isSelected = selectedAnswers[currentQuestion.id] === answer.id;
                    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
                    return (
                      <button
                        key={answer.id}
                        onClick={() => setAnswer(currentQuestion.id, answer.id)}
                        className={cn(
                          'w-full flex items-center gap-3 p-4 rounded-2xl border-3 text-left transition-all duration-150 cursor-pointer',
                          isSelected
                            ? 'bg-teal-100 border-teal-500 shadow-[3px_3px_0px_#0d9488]'
                            : 'bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-50)]'
                        )}
                        style={{ borderWidth: '3px' }}
                      >
                        <div className={cn(
                          'w-8 h-8 rounded-xl border-2 flex items-center justify-center text-sm font-extrabold shrink-0 transition-colors',
                          isSelected
                            ? 'bg-[var(--color-primary)] border-[var(--color-primary-dark)] text-white'
                            : 'bg-[var(--color-muted-bg)] border-[var(--color-border)] text-[var(--color-muted)]'
                        )}>
                          {letters[i] || i + 1}
                        </div>
                        <span className={cn(
                          'text-sm font-semibold flex-1',
                          isSelected ? 'text-teal-800' : 'text-[var(--color-foreground)]'
                        )}>
                          {answer.content}
                        </span>
                        {isSelected && (
                          <span className="text-teal-600 font-bold text-lg">✓</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Prev / Next */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  leftIcon={<ChevronLeft size={16} />}
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestionIndex - 1))}
                  disabled={currentQuestionIndex === 0}
                >
                  Câu trước
                </Button>
                <Button
                  variant="primary"
                  rightIcon={<ChevronRight size={16} />}
                  onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestionIndex + 1))}
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  Câu tiếp
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar navigator */}
        <aside className="hidden md:block w-64 border-l-3 border-[var(--color-border)] bg-[var(--color-surface)]"
          style={{ borderLeftWidth: '3px' }}>
          <QuestionNavigator />
        </aside>
      </div>

      {/* Submit confirm modal */}
      <Modal isOpen={showSubmitModal} onClose={() => setShowSubmitModal(false)}
        title="📬 Nộp bài thi?" size="sm">
        <div className="space-y-4">
          {unansweredCount > 0 ? (
            <div className="p-3 rounded-xl bg-yellow-50 border-2 border-yellow-300 text-sm text-yellow-700 font-semibold">
              ⚠️ Bạn còn <strong>{unansweredCount} câu</strong> chưa trả lời!
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-green-50 border-2 border-green-300 text-sm text-green-700 font-semibold">
              ✅ Bạn đã trả lời tất cả {questions.length} câu!
            </div>
          )}
          <p className="text-sm text-[var(--color-muted)]">
            Sau khi nộp, bạn không thể thay đổi câu trả lời.
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={() => setShowSubmitModal(false)}>Tiếp tục làm</Button>
            <Button variant="danger" isLoading={submitting} onClick={handleSubmit}
              leftIcon={<Send size={16} />}>
              Nộp bài
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
