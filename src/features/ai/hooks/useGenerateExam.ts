import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { aiApi } from '../api/aiApi';
import type { GenerateExamPayload } from '../../../types/models';
import { EXAMS_KEY } from '../../exams/hooks/useExams';

export function useGenerateExam() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: GenerateExamPayload) => aiApi.generateExam(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: EXAMS_KEY });
      toast.success('AI đã tạo đề thi thành công! 🤖✨');
    },
    onError: (err: unknown) => {
      const msg = (err as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message || (err as { message?: string })?.message;
      toast.error(`AI không thể tạo đề: ${msg || 'Thử lại hoặc đổi provider!'}`);
    },
  });
}

export function useVectorStatus() {
  return useQuery({
    queryKey: ['ai', 'vector-status'],
    queryFn: aiApi.getVectorStatus,
    refetchInterval: 30000,
  });
}

export function useSyncQuestions() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (subjectId: string) => aiApi.syncQuestions(subjectId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['ai', 'vector-status'] });
      toast.success('Đồng bộ Vector DB thành công! 🔄✨');
    },
    onError: (err: unknown) => {
      const msg =
        (err as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message ||
        (err as { message?: string })?.message;
      toast.error(`Đồng bộ thất bại: ${msg || 'Vui lòng thử lại!'}`);
    },
  });
}

export function useUploadDocument() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ file, subjectId }: { file: File; subjectId: string }) =>
      aiApi.uploadDocument(file, subjectId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['ai', 'vector-status'] });
      toast.success('Upload tài liệu RAG thành công! 📄✨');
    },
    onError: (err: unknown) => {
      const msg =
        (err as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message ||
        (err as { message?: string })?.message;
      toast.error(`Upload thất bại: ${msg || 'Vui lòng kiểm tra lại file!'}`);
    },
  });
}
