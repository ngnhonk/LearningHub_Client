import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useRef } from 'react';
import { attemptsApi } from '../api/attemptsApi';
import { useAttemptStore } from '../store/attemptStore';
import { ROUTES } from '../../../constants/routes';

export function useSubmitAttempt() {
  const navigate = useNavigate();
  const isSubmittingRef = useRef(false);

  const mutation = useMutation({
    mutationFn: async () => {
      // Guard: prevent double-submit (timer + manual click race)
      if (isSubmittingRef.current) return null;
      isSubmittingRef.current = true;

      const { attemptId, getSavedAnswers } = useAttemptStore.getState();
      if (!attemptId) throw new Error('No active attempt');
      const answers = getSavedAnswers();
      return attemptsApi.submit(attemptId, answers);
    },
    onSuccess: (attempt) => {
      if (!attempt) return; // duplicate submit guard returned null
      const id = attempt.id;
      // Navigate BEFORE reset to prevent ExamTimer from firing onTimeUp
      // when timeRemaining becomes 0 from resetAttempt()
      navigate(ROUTES.EXAM_RESULT(id));
      // Defer reset so navigation takes priority over re-render
      setTimeout(() => useAttemptStore.getState().resetAttempt(), 0);
    },
    onError: () => {
      isSubmittingRef.current = false;
      toast.error('Nộp bài thất bại! Vui lòng thử lại.');
    },
  });

  return mutation;
}
