import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { attemptsApi } from '../api/attemptsApi';
import { useAttemptStore } from '../store/attemptStore';
import { ROUTES } from '../../../constants/routes';

export function useStartAttempt() {
  const { initAttempt } = useAttemptStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (examId: string) => {
      // 1. Start attempt
      const attempt = await attemptsApi.start(examId);
      // 2. Get active attempt with questions
      const active = await attemptsApi.getActive(examId);
      return { attempt, active };
    },
    onSuccess: ({ attempt, active }) => {
      const durationSeconds = (active.exam?.duration_minutes ?? 60) * 60;

      initAttempt(
        attempt.id,
        attempt.exam_id,
        active.questions,
        active.saved_answers,
        durationSeconds,
        active.exam,
      );
      navigate(ROUTES.TAKE_EXAM(attempt.exam_id));
    },
    onError: () => toast.error('Không thể bắt đầu bài thi. Thử lại!'),
  });
}
