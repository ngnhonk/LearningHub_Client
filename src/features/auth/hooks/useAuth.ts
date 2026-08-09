import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const accessToken = useAuthStore((s) => s.accessToken);

  const isAdmin = user?.role === 'admin';
  const isTeacher = user?.role === 'teacher';
  const isStudent = user?.role === 'student';
  const isTeacherOrAdmin = isTeacher || isAdmin;

  return { user, isAuthenticated, accessToken, isAdmin, isTeacher, isStudent, isTeacherOrAdmin };
}
