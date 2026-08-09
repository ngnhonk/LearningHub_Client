// =====================================================
// MODELS — Tất cả domain types theo API documentation
// =====================================================

export type UserRole = 'student' | 'teacher' | 'admin';

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
  question_count?: number;
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
  exam?: {
    title: string;
    total_marks: number;
  };
}

export interface SavedAnswer {
  question_id: string;
  selected_answer_id: string;
}

export interface ActiveAttempt {
  attempt: ExamAttempt;
  exam: Exam;
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
  total_questions?: number;
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

export interface SubjectAnalytics {
  subject_id: string;
  subject_name: string;
  total_exams: number;
  total_attempts: number;
  avg_score: number;
  avg_time_seconds: number;
  pass_rate: number;
}

export interface DetailedExamAnalytics {
  exam_id: string;
  exam_title: string;
  subject_name: string;
  total_attempts: number;
  avg_score: number;
  avg_time_seconds: number;
  highest_score: number;
  lowest_score: number;
  pass_rate: number;
}

export interface TimePoint {
  label: string;
  attempts_count: number;
  avg_score: number;
}

export interface TopStudent {
  user_id: string;
  full_name: string;
  username: string;
  attempts_count: number;
  avg_score: number;
  passed_count: number;
}

export interface LearningAnalyticsData {
  summary: {
    total_attempts: number;
    overall_avg_score: number;
    overall_avg_time_seconds: number;
    overall_pass_rate: number;
  };
  subject_stats: SubjectAnalytics[];
  exam_stats: DetailedExamAnalytics[];
  time_series: {
    daily: TimePoint[];
    monthly: TimePoint[];
  };
  top_students: TopStudent[];
}

export interface SystemStatisticsData {
  users_breakdown: {
    total: number;
    students: number;
    teachers: number;
    admins: number;
    new_7days: number;
    new_30days: number;
  };
  auth_tokens: {
    total_refresh_tokens: number;
    active_tokens: number;
    revoked_tokens: number;
    expired_tokens: number;
  };
  ai_stats: {
    ai_exams_count: number;
    estimated_prompt_tokens: number;
    estimated_completion_tokens: number;
    estimated_total_tokens: number;
    vector_points_count: number;
    vector_status: string;
  };
  data_volumes: {
    total_subjects: number;
    total_exams: number;
    published_exams: number;
    draft_exams: number;
    total_questions: number;
    total_answers: number;
    total_attempts: number;
    total_user_answers: number;
  };
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
  vectors_count?: number;
  count?: number;
  collections?: Array<{
    name: string;
    count: number;
  }>;
}
