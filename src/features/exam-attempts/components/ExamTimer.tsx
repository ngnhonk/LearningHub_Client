import { useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';
import { useAttemptStore } from '../store/attemptStore';
import { formatSeconds } from '../../../lib/utils';
import { cn } from '../../../lib/utils';

interface ExamTimerProps {
  onTimeUp: () => void;
}

export function ExamTimer({ onTimeUp }: ExamTimerProps) {
  const { timeRemaining, decrementTimer, attemptId } = useAttemptStore();
  const hasTimedUp = useRef(false);

  useEffect(() => {
    // Don't fire if no active attempt (already submitted/reset)
    // or if already timed up
    if (!attemptId || hasTimedUp.current) return;

    if (timeRemaining <= 0) {
      hasTimedUp.current = true;
      onTimeUp();
      return;
    }
    const interval = setInterval(() => {
      decrementTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [timeRemaining, decrementTimer, onTimeUp, attemptId]);

  const isWarning = timeRemaining <= 300; // 5 phút
  const isDanger = timeRemaining <= 60;   // 1 phút

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-2xl font-extrabold text-sm border-3 transition-all duration-300',
        isDanger
          ? 'bg-red-100 border-red-400 text-red-700 animate-pulse shadow-[3px_3px_0px_#b91c1c]'
          : isWarning
          ? 'bg-yellow-100 border-yellow-400 text-yellow-700 shadow-[3px_3px_0px_#a16207]'
          : 'bg-teal-100 border-teal-400 text-teal-700 shadow-[3px_3px_0px_#0f766e]'
      )}
      style={{ borderWidth: '3px' }}
      role="timer"
      aria-live="polite"
      aria-label={`Thời gian còn lại: ${formatSeconds(timeRemaining)}`}
    >
      <Clock size={16} className={isDanger ? 'animate-wiggle' : ''} />
      <span style={{ fontFamily: 'var(--font-heading)' }}>{formatSeconds(timeRemaining)}</span>
    </div>
  );
}
