import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../api/usersApi';

export function useProfile() {
  return useQuery({
    queryKey: ['profile', 'me'],
    queryFn: usersApi.getMe,
  });
}

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: usersApi.listAll,
  });
}
