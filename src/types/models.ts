// =====================================================
// MODELS — Tất cả domain types theo API documentation
// =====================================================

export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  email: string;
  full_name: string;
  username: string;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
}

// ---- Subject ----
export interface Subject {
  id: string;
  name: string;
  description: string;
}

// ---- Exam ----
export interface Exam {
  id: string;
  title: string;
  description: string;
  subject_id: string;
  subject?: Subject;
  duration_minutes: number;
  total_marks: number;
  pass_percentage: number;
  is_published: boolean;
  created_at: string;
}

// ---- Question & Answer ----
export interface Answer {
  id: string;
  question_id: string;
  content: string;
  is_correct?: boolean; // Chỉ Admin mới thấy
}

export interface Question {
  id: string;
  content: string;
  exam_id?: string;
  answers: Answer[];
}

// ---- Exam Detail (for student, is_correct hidden) ----
export interface ExamDetail {
  exam: Exam;
  questions: Question[];
}

// ---- Exam Attempt ----
export type AttemptStatus = 'in_progress' | 'submitted' | 'time_out';

export interface ExamAttempt {
  id: string;
  exam_id: string;
  user_id: string;
  status: AttemptStatus;
  score: number | null;
  started_at: string;
  submitted_at: string | null;
  time_spent_seconds: number | null;
}

export interface SavedAnswer {
  question_id: string;
  selected_answer_id: string;
}

export interface ActiveAttempt {
  attempt: ExamAttempt;
  questions: Question[];
  saved_answers: SavedAnswer[];
}

// ---- Exam Result ----
export interface QuestionResult {
  question_id: string;
  question_content: string;
  selected_answer_id: string | null;
  selected_answer_content: string | null;
  correct_answer_id: string;
  correct_answer_content: string;
  is_correct: boolean;
  explanation?: string;
}

export interface ExamResult {
  attempt: ExamAttempt;
  total_marks: number;
  score: number;
  pass_percentage: number;
  passed: boolean;
  correct_count: number;
  wrong_count: number;
  total_questions: number;
  time_spent_seconds: number;
  questions: QuestionResult[];
}

// ---- Statistics ----
export interface AdminOverview {
  total_users: number;
  total_subjects: number;
  total_exams: number;
  total_attempts: number;
}

export interface ExamStatistics {
  exam_id: string;
  exam_title: string;
  total_attempts: number;
  average_score: number;
  pass_rate: number;
  fail_rate: number;
}

// ---- AI ----
export type AIDifficulty = 'easy' | 'medium' | 'hard' | 'mixed';
export type AIProvider = 'openrouter' | 'ollama' | 'nvidia';
export type AILanguage = 'vi' | 'en';

export interface GenerateExamPayload {
  subject_id: string;
  topic: string;
  num_questions: number;
  difficulty: AIDifficulty;
  language: AILanguage;
  exam_title: string;
  exam_duration_minutes: number;
  provider: AIProvider;
  auto_save: boolean;
}

export interface VectorStatus {
  status: string;
  count?: number;
  collections?: Array<{
    name: string;
    count: number;
  }>;
}
