import { useState } from 'react';
import { Clock, HelpCircle, Award, Target, FileText, Flag, CheckCircle2, Circle } from 'lucide-react';
import { useAttemptStore } from '../store/attemptStore';
import { cn } from '../../../lib/utils';

export function QuestionNavigator() {
  const {
    exam,
    questions,
    selectedAnswers,
    flaggedQuestions,
    currentQuestionIndex,
    setCurrentQuestion,
    toggleFlag,
  } = useAttemptStore();

  const [filter, setFilter] = useState<'all' | 'flagged'>('all');

  const answeredCount = Object.keys(selectedAnswers).length;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
  const unansweredCount = questions.length - answeredCount;

  const filteredQuestions = questions
    .map((q, idx) => ({ q, idx }))
    .filter(({ q }) => (filter === 'flagged' ? !!flaggedQuestions[q.id] : true));

  return (
    <div className="p-4 space-y-4 max-w-full">
      {/* ================= PART 1: EXAM INFO CARD ================= */}
      <div className="clay-card p-4 bg-[var(--color-surface)] border-3 border-[var(--color-border-strong)] rounded-2xl shadow-[4px_4px_0px_var(--color-border-strong)] transition-all">
        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[var(--color-border)]">
          <div className="p-1 rounded-lg bg-[var(--color-primary)] text-white shrink-0 shadow-sm">
            <FileText size={14} />
          </div>
          <span className="text-[11px] font-black uppercase tracking-wider text-[var(--color-foreground)]">
            Thông tin bài thi
          </span>
        </div>

        <h3
          className="text-sm font-extrabold text-[var(--color-foreground)] leading-snug mb-3 line-clamp-2"
          title={exam?.title || 'Đề thi trắc nghiệm'}
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {exam?.title || 'Bài thi trắc nghiệm'}
        </h3>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* Duration */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[var(--color-muted-bg)] border border-[var(--color-border)] shadow-xs">
            <div className="p-1 rounded-md bg-amber-100 text-amber-600 shrink-0">
              <Clock size={13} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-[var(--color-muted)] font-semibold block leading-none mb-0.5">Thời lượng</span>
              <span className="font-black text-[var(--color-foreground)] truncate block">
                {exam?.duration_minutes ?? 60} phút
              </span>
            </div>
          </div>

          {/* Question Count */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[var(--color-muted-bg)] border border-[var(--color-border)] shadow-xs">
            <div className="p-1 rounded-md bg-teal-100 text-teal-600 shrink-0">
              <HelpCircle size={13} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-[var(--color-muted)] font-semibold block leading-none mb-0.5">Số câu hỏi</span>
              <span className="font-black text-[var(--color-foreground)] truncate block">
                {questions.length} câu
              </span>
            </div>
          </div>

          {/* Total Marks */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[var(--color-muted-bg)] border border-[var(--color-border)] shadow-xs">
            <div className="p-1 rounded-md bg-purple-100 text-purple-600 shrink-0">
              <Award size={13} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-[var(--color-muted)] font-semibold block leading-none mb-0.5">Điểm tối đa</span>
              <span className="font-black text-[var(--color-foreground)] truncate block">
                {exam?.total_marks ?? 10} điểm
              </span>
            </div>
          </div>

          {/* Pass Percentage */}
          <div className="flex items-center gap-2 p-2 rounded-xl bg-[var(--color-muted-bg)] border border-[var(--color-border)] shadow-xs">
            <div className="p-1 rounded-md bg-emerald-100 text-emerald-600 shrink-0">
              <Target size={13} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-[var(--color-muted)] font-semibold block leading-none mb-0.5">Đạt qua môn</span>
              <span className="font-black text-[var(--color-foreground)] truncate block">
                {exam?.pass_percentage ?? 50}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PART 2: QUESTION LIST CARD & FLAGGING ================= */}
      <div className="clay-card p-4 bg-[var(--color-surface)] border-3 border-[var(--color-border-strong)] rounded-2xl shadow-[4px_4px_0px_var(--color-border-strong)] space-y-3">
        {/* Header & Title */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
          <h3
            className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            Danh sách câu hỏi
          </h3>
          <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            {answeredCount}/{questions.length}
          </span>
        </div>

        {/* Status Pills / Legend */}
        <div className="grid grid-cols-3 gap-1 text-[10px] font-bold text-center">
          <div className="flex flex-col items-center p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
            <div className="flex items-center gap-1">
              <CheckCircle2 size={11} />
              <span>Đã làm</span>
            </div>
            <span className="text-xs font-black">{answeredCount}</span>
          </div>

          <div className="flex flex-col items-center p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
            <div className="flex items-center gap-1">
              <Flag size={11} className="fill-amber-500" />
              <span>Đánh dấu</span>
            </div>
            <span className="text-xs font-black">{flaggedCount}</span>
          </div>

          <div className="flex flex-col items-center p-1.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-200">
            <div className="flex items-center gap-1">
              <Circle size={11} />
              <span>Chưa làm</span>
            </div>
            <span className="text-xs font-black">{unansweredCount}</span>
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="flex bg-slate-100 p-0.5 rounded-xl text-[11px] font-extrabold gap-1">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              'flex-1 py-1 px-2 rounded-lg transition-all text-center cursor-pointer',
              filter === 'all'
                ? 'bg-white text-teal-800 shadow-xs border border-slate-200/80 font-black'
                : 'text-slate-500 hover:text-slate-800'
            )}
          >
            Tất cả ({questions.length})
          </button>
          <button
            onClick={() => setFilter('flagged')}
            className={cn(
              'flex-1 py-1 px-2 rounded-lg transition-all text-center flex items-center justify-center gap-1 cursor-pointer',
              filter === 'flagged'
                ? 'bg-amber-500 text-white shadow-xs font-black'
                : 'text-slate-500 hover:text-amber-700'
            )}
          >
            <Flag size={11} className={filter === 'flagged' ? 'fill-white' : 'fill-amber-500'} />
            Đã dấu ({flaggedCount})
          </button>
        </div>

        {/* Questions Grid */}
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-400 font-semibold italic bg-slate-50 rounded-xl border border-dashed border-slate-200">
            Không có câu hỏi nào trong mục này
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-1.5 pt-1">
            {filteredQuestions.map(({ q, idx }) => {
              const isAnswered = !!selectedAnswers[q.id];
              const isCurrent = idx === currentQuestionIndex;
              const isFlagged = !!flaggedQuestions[q.id];

              return (
                <div key={q.id} className="relative group">
                  <button
                    onClick={() => setCurrentQuestion(idx)}
                    className={cn(
                      'w-full h-9 rounded-xl text-xs font-extrabold border-2 transition-all duration-150 cursor-pointer flex items-center justify-center relative overflow-hidden',
                      isCurrent
                        ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary-dark)] shadow-[2px_2px_0px_var(--color-primary-dark)] scale-105 ring-2 ring-teal-400 ring-offset-1 z-10'
                        : isFlagged
                        ? 'bg-amber-100 text-amber-900 border-amber-400 shadow-[2px_2px_0px_#d97706]'
                        : isAnswered
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-400 shadow-[2px_2px_0px_#059669]'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-teal-400 hover:bg-teal-50/50'
                    )}
                    title={`Câu ${idx + 1}${isAnswered ? ' (Đã trả lời)' : ''}${isFlagged ? ' (Đã đánh dấu xem lại)' : ''}`}
                    aria-label={`Câu ${idx + 1}`}
                  >
                    {idx + 1}

                    {/* Flag Badge Corner Indicator */}
                    {isFlagged && (
                      <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-amber-500 rounded-bl-md flex items-center justify-center">
                        <span className="w-1 h-1 bg-white rounded-full"></span>
                      </span>
                    )}
                  </button>

                  {/* Flag Quick Toggle Icon Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlag(q.id);
                    }}
                    className={cn(
                      'absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] z-20 border transition-transform opacity-80 hover:opacity-100 hover:scale-125 cursor-pointer',
                      isFlagged
                        ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                        : 'bg-slate-200 text-slate-600 border-slate-300 hover:bg-amber-400 hover:text-white'
                    )}
                    title={isFlagged ? 'Bỏ đánh dấu' : 'Đánh dấu xem lại'}
                  >
                    🚩
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Tip text */}
        <p className="text-[10px] text-slate-400 text-center pt-1 font-medium italic">
          💡 Mẹo: Nhấn icon 🚩 trên từng câu để đánh dấu xem lại sau.
        </p>
      </div>
    </div>
  );
}
