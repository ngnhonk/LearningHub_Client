export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',

  // Student routes
  DASHBOARD: '/dashboard',
  SUBJECTS: '/subjects',
  EXAMS: '/exams',
  EXAMS_BY_SUBJECT: (subjectId: string) => `/exams?subject=${subjectId}`,
  EXAM_DETAIL: (id: string) => `/exams/${id}`,
  TAKE_EXAM: (examId: string) => `/take-exam/${examId}`,
  EXAM_RESULT: (attemptId: string) => `/exam-result/${attemptId}`,
  HISTORY: '/history',
  PROFILE: '/profile',

  // Admin routes
  ADMIN: '/admin',
  ADMIN_SUBJECTS: '/admin/subjects',
  ADMIN_EXAMS: '/admin/exams',
  ADMIN_EXAM_DETAIL: (id: string) => `/admin/exams/${id}`,
  ADMIN_USERS: '/admin/users',
  ADMIN_AI: '/admin/ai',
  ADMIN_STATS: '/admin/statistics',
  ADMIN_EXAM_STATS: (examId: string) => `/admin/statistics/exams/${examId}`,
} as const;
