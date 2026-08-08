import { useAttemptStore } from '../store/attemptStore';
import { cn } from '../../../lib/utils';

export function QuestionNavigator() {
  const { questions, selectedAnswers, currentQuestionIndex, setCurrentQuestion } = useAttemptStore();

  return (
    <div className="p-4">
      <h3 className="text-sm font-extrabold text-[var(--color-foreground)] mb-3"
        style={{ fontFamily: 'var(--font-heading)' }}>
        Câu hỏi ({Object.keys(selectedAnswers).length}/{questions.length} đã trả lời)
      </h3>
      <div className="grid grid-cols-5 gap-1.5">
        {questions.map((q, i) => {
          const isAnswered = !!selectedAnswers[q.id];
          const isCurrent = i === currentQuestionIndex;
          return (
            <button
              key={q.id}
              onClick={() => setCurrentQuestion(i)}
              className={cn(
                'w-9 h-9 rounded-xl text-xs font-extrabold border-2 transition-all duration-150 cursor-pointer',
                isCurrent
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary-dark)] shadow-[2px_2px_0px_var(--color-primary-dark)] scale-110'
                  : isAnswered
                  ? 'bg-teal-100 text-teal-700 border-teal-400 shadow-[2px_2px_0px_#0d9488]'
                  : 'bg-[var(--color-muted-bg)] text-[var(--color-muted)] border-[var(--color-border)] hover:border-[var(--color-primary)]'
              )}
              aria-label={`Câu ${i + 1}${isAnswered ? ' (đã trả lời)' : ''}`}
              aria-current={isCurrent ? 'page' : undefined}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
