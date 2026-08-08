import { useMutation } from '@tanstack/react-query';
import { attemptsApi } from '../api/attemptsApi';
import { useAttemptStore } from '../store/attemptStore';

export function useSaveAnswers() {
  const { attemptId, getSavedAnswers, setIsSaving, setLastSaved } = useAttemptStore();

  return useMutation({
    mutationFn: async () => {
      if (!attemptId) throw new Error('No active attempt');
      const answers = getSavedAnswers();
      await attemptsApi.saveAnswers(attemptId, answers);
    },
    onMutate: () => setIsSaving(true),
    onSuccess: () => {
      setIsSaving(false);
      setLastSaved(new Date());
    },
    onError: () => setIsSaving(false),
  });
}
