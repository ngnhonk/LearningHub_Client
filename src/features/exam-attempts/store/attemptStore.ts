import { create } from 'zustand';
import type { SavedAnswer, Question } from '../../../types/models';

interface AttemptState {
  attemptId: string | null;
  examId: string | null;
  questions: Question[];
  selectedAnswers: Record<string, string>; // { [questionId]: selectedAnswerId }
  currentQuestionIndex: number;
  timeRemaining: number; // seconds
  isSaving: boolean;
  lastSavedAt: Date | null;

  // Actions
  initAttempt: (attemptId: string, examId: string, questions: Question[], savedAnswers: SavedAnswer[], durationSeconds: number) => void;
  setAnswer: (questionId: string, answerId: string) => void;
  setCurrentQuestion: (index: number) => void;
  setTimeRemaining: (seconds: number) => void;
  decrementTimer: () => void;
  setIsSaving: (saving: boolean) => void;
  setLastSaved: (date: Date) => void;
  resetAttempt: () => void;

  // Computed helpers (non-reactive, call directly)
  getAnsweredCount: () => number;
  getSavedAnswers: () => SavedAnswer[];
}

export const useAttemptStore = create<AttemptState>((set, get) => ({
  attemptId: null,
  examId: null,
  questions: [],
  selectedAnswers: {},
  currentQuestionIndex: 0,
  timeRemaining: 0,
  isSaving: false,
  lastSavedAt: null,

  initAttempt: (attemptId, examId, questions, savedAnswers, durationSeconds) => {
    const answersMap: Record<string, string> = {};
    savedAnswers.forEach((a) => {
      answersMap[a.question_id] = a.selected_answer_id;
    });
    set({ attemptId, examId, questions, selectedAnswers: answersMap, timeRemaining: durationSeconds, currentQuestionIndex: 0 });
  },

  setAnswer: (questionId, answerId) =>
    set((state) => ({
      selectedAnswers: { ...state.selectedAnswers, [questionId]: answerId },
    })),

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
      questions: [],
      selectedAnswers: {},
      currentQuestionIndex: 0,
      timeRemaining: 0,
      isSaving: false,
      lastSavedAt: null,
    }),

  getAnsweredCount: () => Object.keys(get().selectedAnswers).length,

  getSavedAnswers: () =>
    Object.entries(get().selectedAnswers).map(([question_id, selected_answer_id]) => ({
      question_id,
      selected_answer_id,
    })),
}));
