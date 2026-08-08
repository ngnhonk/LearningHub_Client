import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const accessToken = useAuthStore((s) => s.accessToken);

  const isAdmin = user?.role === 'admin';
  const isStudent = user?.role === 'student';

  return { user, isAuthenticated, accessToken, isAdmin, isStudent };
}
