import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { examsApi, type CreateExamPayload } from '../api/examsApi';

export const EXAMS_KEY = ['exams'];

export function useExams() {
  return useQuery({ queryKey: EXAMS_KEY, queryFn: examsApi.list });
}

export function useExamsBySubject(subjectId: string) {
  return useQuery({
    queryKey: ['exams', 'subject', subjectId],
    queryFn: () => examsApi.listBySubject(subjectId),
    enabled: !!subjectId,
  });
}

export function useExam(id: string) {
  return useQuery({
    queryKey: ['exams', id],
    queryFn: () => examsApi.getById(id),
    enabled: !!id,
  });
}

export function useExamDetail(id: string) {
  return useQuery({
    queryKey: ['exams', id, 'detail'],
    queryFn: () => examsApi.getDetail(id),
    enabled: !!id,
  });
}

export function useCreateExam() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: examsApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: EXAMS_KEY });
      toast.success('Tạo đề thi thành công! 📝');
    },
    onError: () => toast.error('Tạo đề thi thất bại!'),
  });
}

export function useUpdateExam() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...payload }: { id: string } & Partial<CreateExamPayload>) =>
      examsApi.update(id, payload),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['exams', vars.id] });
      qc.invalidateQueries({ queryKey: EXAMS_KEY });
      toast.success('Cập nhật đề thi thành công!');
    },
    onError: () => toast.error('Cập nhật thất bại!'),
  });
}

export function useDeleteExam() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: examsApi.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: EXAMS_KEY });
      toast.success('Đã xoá đề thi!');
    },
    onError: () => toast.error('Xoá thất bại!'),
  });
}

export function useImportExam() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ file, subjectId }: { file: File; subjectId?: string }) =>
      examsApi.importExcel(file, subjectId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: EXAMS_KEY });
      toast.success('Import đề thi thành công! 🎉');
    },
    onError: () => toast.error('Import thất bại! Kiểm tra format file Excel.'),
  });
}
