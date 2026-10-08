import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface TimerProps {
  secondsLeft: number;
  totalSeconds: number;
}

export const Timer: React.FC<TimerProps> = ({ secondsLeft, totalSeconds }) => {
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const isLowTime = secondsLeft <= 120 && secondsLeft > 0; // less than 2 minutes
  const isCriticalTime = secondsLeft <= 60 && secondsLeft > 0; // less than 1 minute

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const percentageLeft = Math.max(0, Math.min(100, (secondsLeft / totalSeconds) * 100));

  return (
    <div 
      className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border transition-all ${
        isCriticalTime
          ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
          : isLowTime
          ? 'bg-amber-50 border-amber-300 text-amber-800'
          : 'bg-white border-slate-200 text-slate-800'
      }`}
      role="timer"
      aria-live="polite"
      aria-label={`Time remaining: ${minutes} minutes and ${seconds} seconds`}
    >
      {isCriticalTime ? (
        <AlertTriangle className="w-4 h-4 text-rose-600 animate-bounce" />
      ) : (
        <Clock className={`w-4 h-4 ${isLowTime ? 'text-amber-600' : 'text-blue-600'}`} />
      )}

      <div className="flex flex-col items-start leading-none">
        <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-600">
          Time Remaining
        </span>
        <span className="font-mono text-base font-bold tracking-tight">
          {formattedTime}
        </span>
      </div>

      {/* Mini Progress Ring / bar indicator */}
      <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden ml-1 hidden sm:block">
        <div 
          className={`h-full transition-all duration-1000 ${
            isCriticalTime ? 'bg-rose-500' : isLowTime ? 'bg-amber-500' : 'bg-blue-600'
          }`}
          style={{ width: `${percentageLeft}%` }}
        />
      </div>
    </div>
  );
};
