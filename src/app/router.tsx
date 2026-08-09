import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { PrivateRoute, AdminRoute, TeacherOrAdminRoute, PublicOnlyRoute } from './guards';
import { ROUTES } from '../constants/routes';

// Auth pages
import { LoginPage } from '../features/auth/pages/LoginPage';
import { RegisterPage } from '../features/auth/pages/RegisterPage';

// Student pages
import { DashboardPage } from '../features/users/pages/DashboardPage';
import { SubjectListPage } from '../features/subjects/pages/SubjectListPage';
import { ExamListPage } from '../features/exams/pages/ExamListPage';
import { ExamDetailPage } from '../features/exams/pages/ExamDetailPage';
import { ExamEditPage } from '../features/exams/pages/ExamEditPage';
import { TakeExamPage } from '../features/exam-attempts/pages/TakeExamPage';
import { ResultPage } from '../features/exam-attempts/pages/ResultPage';
import { ProfilePage } from '../features/users/pages/ProfilePage';

import { AdminOverviewPage } from '../features/statistics/pages/AdminOverviewPage';
import { LearningStatisticsPage } from '../features/statistics/pages/LearningStatisticsPage';
import { AiGeneratorPage } from '../features/ai/pages/AiGeneratorPage';
import { UserManagementPage } from '../features/users/pages/UserManagementPage';

// History page (shared)
import { HistoryPage } from '../features/exam-attempts/pages/HistoryPage';

// 404
import { NotFoundPage } from './NotFoundPage';

const router = createBrowserRouter([
  // Public only (redirect if logged in)
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.REGISTER, element: <RegisterPage /> },
    ],
  },

  // Protected routes
  {
    element: <PrivateRoute />,
    children: [
      { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
      { path: ROUTES.SUBJECTS, element: <SubjectListPage /> },
      { path: ROUTES.EXAMS, element: <ExamListPage /> },
      { path: ROUTES.EXAM_DETAIL(':id'), element: <ExamDetailPage /> },
      { path: ROUTES.TAKE_EXAM(':examId'), element: <TakeExamPage /> },
      { path: ROUTES.EXAM_RESULT(':id'), element: <ResultPage /> },
      { path: ROUTES.HISTORY, element: <HistoryPage /> },
      { path: ROUTES.PROFILE, element: <ProfilePage /> },

      // Teacher & Admin management routes
      {
        element: <TeacherOrAdminRoute />,
        children: [
          { path: ROUTES.ADMIN, element: <AdminOverviewPage /> },
          { path: ROUTES.ADMIN_SUBJECTS, element: <SubjectListPage /> },
          { path: ROUTES.ADMIN_EXAMS, element: <ExamListPage /> },
          { path: ROUTES.ADMIN_EXAM_DETAIL(':id'), element: <ExamEditPage /> },
          { path: ROUTES.ADMIN_AI, element: <AiGeneratorPage /> },
          { path: ROUTES.ADMIN_STATS, element: <LearningStatisticsPage /> },
        ],
      },

      // Strict Admin-only routes
      {
        element: <AdminRoute />,
        children: [
          { path: ROUTES.ADMIN_USERS, element: <UserManagementPage /> },
        ],
      },
    ],
  },

  // Root redirect
  { path: ROUTES.HOME, element: <Navigate to={ROUTES.DASHBOARD} replace /> },

  // 404
  { path: '*', element: <NotFoundPage /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
