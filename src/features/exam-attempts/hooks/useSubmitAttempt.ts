import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { attemptsApi } from '../api/attemptsApi';
import { useAttemptStore } from '../store/attemptStore';
import { ROUTES } from '../../../constants/routes';

export function useSubmitAttempt() {
  const { attemptId, getSavedAnswers, resetAttempt } = useAttemptStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      if (!attemptId) throw new Error('No active attempt');
      const answers = getSavedAnswers();
      return attemptsApi.submit(attemptId, answers);
    },
    onSuccess: (attempt) => {
      const id = attempt.id;
      resetAttempt();
      navigate(ROUTES.EXAM_RESULT(id));
    },
    onError: () => toast.error('Nộp bài thất bại! Vui lòng thử lại.'),
  });
}
