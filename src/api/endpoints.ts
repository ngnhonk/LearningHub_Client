// =====================================================
// API ENDPOINTS — tất cả path strings tập trung ở đây
// =====================================================

export const ENDPOINTS = {
  // Auth
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    TOKEN: '/auth/token',
    LOGOUT: '/auth/logout',
  },

  // Users
  USERS: {
    ME: '/users/me',
    LIST: '/users',
    BY_ID: (id: string) => `/users/${id}`,
    CHANGE_AVATAR: '/users/change-avatar',
    CHANGE_PASSWORD: '/users/change-password',
    CHANGE_ROLE: '/users/change-user-role',
  },

  // Subjects
  SUBJECTS: {
    LIST: '/subjects',
    BY_ID: (id: string) => `/subjects/${id}`,
  },

  // Exams
  EXAMS: {
    LIST: '/exams',
    BY_SUBJECT: (subjectId: string) => `/exams/subject/${subjectId}`,
    BY_ID: (id: string) => `/exams/${id}`,
    DETAIL: (id: string) => `/exams/${id}/detail`,
    IMPORT: '/exams/import',
  },

  // Questions
  QUESTIONS: {
    LIST: '/questions',
    BY_ID: (id: string) => `/questions/${id}`,
  },

  // Answers
  ANSWERS: {
    BY_QUESTION: (questionId: string) => `/answers/question/${questionId}`,
    CREATE: '/answers',
  },

  // Exam Attempts
  ATTEMPTS: {
    START: '/user-exam-attempts/start',
    ACTIVE: (examId: string) => `/user-exam-attempts/active/${examId}`,
    SAVE_ANSWERS: (id: string) => `/user-exam-attempts/${id}/answers`,
    SUBMIT: (id: string) => `/user-exam-attempts/${id}/submit`,
    RESULT: (id: string) => `/user-exam-attempts/${id}/result`,
    BY_USER: (userId: string) => `/user-exam-attempts/user/${userId}`,
  },

  // AI
  AI: {
    GENERATE_EXAM: '/ai/generate-exam',
    UPLOAD_DOCUMENT: '/ai/upload-document',
    SYNC_QUESTIONS: '/ai/sync-questions',
    VECTOR_STATUS: '/ai/vector-status',
  },

  // Statistics
  STATISTICS: {
    EXAM: (examId: string) => `/statistics/exam/${examId}`,
    ADMIN_OVERVIEW: '/statistics/admin/overview',
  },
} as const;
