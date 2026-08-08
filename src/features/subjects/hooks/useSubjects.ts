import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { subjectsApi } from '../api/subjectsApi';

export const SUBJECTS_KEY = ['subjects'];

export function useSubjects() {
  return useQuery({
    queryKey: SUBJECTS_KEY,
    queryFn: subjectsApi.list,
  });
}

export function useSubject(id: string) {
  return useQuery({
    queryKey: ['subjects', id],
    queryFn: () => subjectsApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateSubject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: subjectsApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SUBJECTS_KEY });
      toast.success('Tạo môn học thành công! 📚');
    },
    onError: () => toast.error('Tạo môn học thất bại!'),
  });
}

export function useUpdateSubject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }: { id: string; name?: string; description?: string }) =>
      subjectsApi.update(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SUBJECTS_KEY });
      toast.success('Cập nhật môn học thành công!');
    },
    onError: () => toast.error('Cập nhật thất bại!'),
  });
}

export function useDeleteSubject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: subjectsApi.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SUBJECTS_KEY });
      toast.success('Đã xoá môn học!');
    },
    onError: () => toast.error('Xoá thất bại!'),
  });
}
