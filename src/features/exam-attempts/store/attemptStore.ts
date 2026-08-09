import { create } from 'zustand';
import type { SavedAnswer, Question, Exam } from '../../../types/models';

interface AttemptState {
  attemptId: string | null;
  examId: string | null;
  exam: Exam | null;
  questions: Question[];
  selectedAnswers: Record<string, string>; // { [questionId]: selectedAnswerId }
  flaggedQuestions: Record<string, boolean>; // { [questionId]: boolean }
  currentQuestionIndex: number;
  timeRemaining: number; // seconds
  isSaving: boolean;
  lastSavedAt: Date | null;

  // Actions
  initAttempt: (
    attemptId: string,
    examId: string,
    questions: Question[],
    savedAnswers: SavedAnswer[],
    durationSeconds: number,
    exam?: Exam | null,
    flaggedQuestions?: Record<string, boolean>
  ) => void;
  setAnswer: (questionId: string, answerId: string) => void;
  toggleFlag: (questionId: string) => void;
  setCurrentQuestion: (index: number) => void;
  setTimeRemaining: (seconds: number) => void;
  decrementTimer: () => void;
  setIsSaving: (saving: boolean) => void;
  setLastSaved: (date: Date) => void;
  resetAttempt: () => void;

  // Computed helpers (non-reactive, call directly)
  getAnsweredCount: () => number;
  getFlaggedCount: () => number;
  getSavedAnswers: () => SavedAnswer[];
}

export const useAttemptStore = create<AttemptState>((set, get) => ({
  attemptId: null,
  examId: null,
  exam: null,
  questions: [],
  selectedAnswers: {},
  flaggedQuestions: {},
  currentQuestionIndex: 0,
  timeRemaining: 0,
  isSaving: false,
  lastSavedAt: null,

  initAttempt: (attemptId, examId, questions, savedAnswers, durationSeconds, exam = null, initialFlags) => {
    const answersMap: Record<string, string> = {};
    savedAnswers.forEach((a) => {
      answersMap[a.question_id] = a.selected_answer_id;
    });

    let flagsMap: Record<string, boolean> = initialFlags || {};
    if (!initialFlags && attemptId) {
      try {
        const stored = localStorage.getItem(`flagged_${attemptId}`);
        if (stored) {
          flagsMap = JSON.parse(stored);
        }
      } catch (e) {
        // ignore JSON parse error
      }
    }

    set({
      attemptId,
      examId,
      exam: exam || null,
      questions,
      selectedAnswers: answersMap,
      flaggedQuestions: flagsMap,
      timeRemaining: durationSeconds,
      currentQuestionIndex: 0,
    });
  },

  setAnswer: (questionId, answerId) =>
    set((state) => ({
      selectedAnswers: { ...state.selectedAnswers, [questionId]: answerId },
    })),

  toggleFlag: (questionId) =>
    set((state) => {
      const nextFlags = {
        ...state.flaggedQuestions,
        [questionId]: !state.flaggedQuestions[questionId],
      };
      if (state.attemptId) {
        try {
          localStorage.setItem(`flagged_${state.attemptId}`, JSON.stringify(nextFlags));
        } catch (e) {
          // ignore localStorage error
        }
      }
      return { flaggedQuestions: nextFlags };
    }),

  setCurrentQuestion: (index) => set({ currentQuestionIndex: index }),

  setTimeRemaining: (seconds) => set({ timeRemaining: seconds }),

  decrementTimer: () =>
    set((state) => ({ timeRemaining: Math.max(0, state.timeRemaining - 1) })),

  setIsSaving: (saving) => set({ isSaving: saving }),

  setLastSaved: (date) => set({ lastSavedAt: date }),

  resetAttempt: () =>
    set({
      attemptId: null,
      examId: null,
      exam: null,
      questions: [],
      selectedAnswers: {},
      flaggedQuestions: {},
      currentQuestionIndex: 0,
      timeRemaining: 0,
      isSaving: false,
      lastSavedAt: null,
    }),

  getAnsweredCount: () => Object.keys(get().selectedAnswers).length,

  getFlaggedCount: () => Object.values(get().flaggedQuestions).filter(Boolean).length,

  getSavedAnswers: () =>
    Object.entries(get().selectedAnswers).map(([question_id, selected_answer_id]) => ({
      question_id,
      selected_answer_id,
    })),
}));

