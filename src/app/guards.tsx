import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';
import { ROUTES } from '../constants/routes';
import { PageLoader } from '../components/feedback/LoadingSpinner';
import { useAuthStore } from '../features/auth/store/authStore';
import { useEffect, useState } from 'react';
import { usersApi } from '../features/users/api/usersApi';
import { useAuthStore as useStore } from '../features/auth/store/authStore';

// Guard: user phải đăng nhập
export function PrivateRoute() {
  const { isAuthenticated } = useAuth();
  const [checking, setChecking] = useState(true);

  // Nếu có user trong localStorage nhưng chưa có token, thử refresh
  useEffect(() => {
    const { isAuthenticated, accessToken } = useAuthStore.getState();

    if (isAuthenticated && !accessToken) {
      // Thử lấy lại profile (interceptor sẽ auto refresh token)
      usersApi.getMe()
        .then((profile) => {
          const token = useStore.getState().accessToken;
          if (token) useStore.getState().setAuth(profile, token);
        })
        .catch(() => useStore.getState().clearAuth())
        .finally(() => setChecking(false));
    } else {
      setChecking(false);
    }
  }, []);

  if (checking) return <PageLoader label="Đang xác thực..." />;
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;
  return <Outlet />;
}

// Guard: chỉ Admin
export function AdminRoute() {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;
  if (!isAdmin) return <Navigate to={ROUTES.DASHBOARD} replace />;
  return <Outlet />;
}

// Guard: redirect nếu đã đăng nhập
export function PublicOnlyRoute() {
  const { isAuthenticated, isAdmin } = useAuth();
  if (isAuthenticated) {
    return <Navigate to={isAdmin ? ROUTES.ADMIN : ROUTES.DASHBOARD} replace />;
  }
  return <Outlet />;
}
