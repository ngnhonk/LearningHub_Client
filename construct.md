src/
├── app/
│   ├── App.tsx
│   ├── router.tsx              # React Router config, route guards
│   └── providers.tsx           # QueryClientProvider, AuthProvider, ToastProvider...
│
├── api/
│   ├── axiosClient.ts          # instance chính, baseURL, interceptors
│   ├── interceptors/
│   │   ├── authInterceptor.ts  # gắn Bearer token
│   │   └── refreshInterceptor.ts # auto refresh khi 401 (dùng /auth/token)
│   └── endpoints.ts            # const object các path, tránh hardcode string
│
├── features/                   # chia theo domain, KHÔNG chia theo loại file
│   ├── auth/
│   │   ├── api/authApi.ts      # login, register, logout, refresh
│   │   ├── hooks/useAuth.ts
│   │   ├── hooks/useLogin.ts   # react-query mutation
│   │   ├── store/authStore.ts  # zustand: user, token state
│   │   ├── types.ts
│   │   └── pages/LoginPage.tsx, RegisterPage.tsx
│   │
│   ├── users/
│   │   ├── api/usersApi.ts     # /users/me, change-avatar, change-password
│   │   ├── hooks/useProfile.ts
│   │   └── pages/ProfilePage.tsx
│   │
│   ├── subjects/
│   │   ├── api/subjectsApi.ts
│   │   ├── hooks/useSubjects.ts
│   │   ├── components/SubjectCard.tsx, SubjectForm.tsx
│   │   └── pages/SubjectListPage.tsx
│   │
│   ├── exams/
│   │   ├── api/examsApi.ts     # list, detail, import excel
│   │   ├── hooks/useExams.ts, useExamDetail.ts
│   │   ├── components/ExamCard.tsx, ExamImportModal.tsx
│   │   └── pages/ExamListPage.tsx, ExamDetailPage.tsx
│   │
│   ├── questions/
│   │   ├── api/questionsApi.ts, answersApi.ts
│   │   └── components/QuestionForm.tsx, AnswerOptionList.tsx
│   │
│   ├── exam-attempts/          # phần quan trọng nhất về UX (làm bài thi)
│   │   ├── api/attemptsApi.ts
│   │   ├── hooks/useStartAttempt.ts, useSaveAnswers.ts, useSubmitAttempt.ts
│   │   ├── store/attemptStore.ts   # local state câu trả lời đang chọn, timer
│   │   ├── components/
│   │   │   ├── ExamTimer.tsx
│   │   │   ├── QuestionNavigator.tsx
│   │   │   └── AutoSaveIndicator.tsx
│   │   └── pages/
│   │       ├── TakeExamPage.tsx     # /user-exam-attempts/start + active
│   │       └── ResultPage.tsx       # /:id/result
│   │
│   ├── ai/
│   │   ├── api/aiApi.ts        # generate-exam, upload-document, sync, vector-status
│   │   ├── hooks/useGenerateExam.ts
│   │   └── pages/AiGeneratorPage.tsx
│   │
│   └── statistics/
│       ├── api/statisticsApi.ts
│       └── pages/AdminOverviewPage.tsx, ExamStatsPage.tsx
│
├── components/                 # UI dùng chung, không gắn domain
│   ├── ui/                     # Button, Modal, Input, Table, Badge...
│   ├── layout/                 # AppShell, Sidebar, Navbar, AdminLayout
│   └── feedback/                # LoadingSpinner, ErrorBoundary, EmptyState
│
├── lib/
│   ├── queryClient.ts          # react-query config
│   └── utils.ts                # cn(), formatDate, formatScore...
│
├── types/
│   ├── api.types.ts             # ApiResponse<T> generic wrapper (success, message, responseObject, statusCode)
│   └── models.ts                # User, Subject, Exam, Question, Answer, Attempt...
│
├── hooks/                       # hooks dùng chung, không gắn domain cụ thể
│   └── useDebounce.ts, usePagination.ts
│
├── constants/
│   ├── roles.ts                 # "student" | "admin"
│   └── routes.ts
│
└── main.tsx