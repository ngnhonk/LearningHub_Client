import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { usersApi } from '../api/usersApi';
import type { UserRole } from '../../../types/models';

export const USER_KEYS = {
  all: ['users'] as const,
  byId: (id: string) => ['users', id] as const,
};

export function useUsersList() {
  return useQuery({
    queryKey: USER_KEYS.all,
    queryFn: usersApi.listAll,
  });
}

export function useChangeUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { id: string; newRole: UserRole }) => usersApi.changeRole(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.all });
      toast.success('Đã cập nhật vai trò người dùng!');
    },
    onError: () => {
      toast.error('Không thể cập nhật vai trò người dùng!');
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEYS.all });
      toast.success('Xóa người dùng thành công!');
    },
    onError: () => {
      toast.error('Không thể xóa người dùng này!');
    },
  });
}
