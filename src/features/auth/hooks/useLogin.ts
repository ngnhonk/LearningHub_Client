import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/authStore';
import { usersApi } from '../../users/api/usersApi';
import { ROUTES } from '../../../constants/routes';

export function useLogin() {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data) => {
      // Lưu token vào store
      useAuthStore.getState().setAccessToken(data.accessToken);

      // Lấy full profile
      const profile = await usersApi.getMe();
      setAuth(profile, data.accessToken);

      toast.success(`Chào mừng trở lại, ${profile.full_name}! 🎉`);

      // Redirect theo role
      if (profile.role === 'admin' || profile.role === 'teacher') {
        navigate(ROUTES.ADMIN);
      } else {
        navigate(ROUTES.DASHBOARD);
      }
    },
    onError: (error: unknown) => {
      const msg = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error(msg || 'Đăng nhập thất bại. Vui lòng thử lại!');
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      toast.success('Đăng ký thành công! Vui lòng đăng nhập 🎊');
      navigate(ROUTES.LOGIN);
    },
    onError: (error: unknown) => {
      const msg = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error(msg || 'Đăng ký thất bại. Vui lòng thử lại!');
    },
  });
}

export function useLogout() {
  const { clearAuth } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      clearAuth();
      navigate(ROUTES.LOGIN);
      toast.success('Đã đăng xuất thành công!');
    },
  });
}
