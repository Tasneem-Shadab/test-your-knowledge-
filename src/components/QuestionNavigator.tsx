import React from 'react';
import { Flag, Check, Circle } from 'lucide-react';

interface QuestionNavigatorProps {
  totalQuestions: number;
  currentIndex: number;
  userAnswers: Record<number, number>;
  markedForReview: number[];
  questionIds: number[];
  onSelectQuestion: (index: number) => void;
}

export const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  totalQuestions,
  currentIndex,
  userAnswers,
  markedForReview,
  questionIds,
  onSelectQuestion,
}) => {
  // Compute counts
  const answeredCount = Object.keys(userAnswers).filter(
    (k) => userAnswers[Number(k)] !== undefined
  ).length;
  const markedCount = markedForReview.length;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <h4 className="text-sm font-bold text-slate-900 tracking-tight">
          Question Palette
        </h4>
        <span className="text-xs font-semibold text-blue-600">
          {currentIndex + 1} of {totalQuestions}
        </span>
      </div>

      {/* Grid of question buttons */}
      <div className="grid grid-cols-5 gap-2.5 mb-6">
        {questionIds.map((qId, index) => {
          const isCurrent = index === currentIndex;
          const isAnswered = userAnswers[qId] !== undefined;
          const isMarked = markedForReview.includes(qId);

          let buttonStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

          if (isCurrent) {
            buttonStyle = 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-400 ring-offset-1 font-bold';
          } else if (isMarked && isAnswered) {
            buttonStyle = 'bg-amber-100 border-amber-300 text-amber-900 font-semibold';
          } else if (isMarked) {
            buttonStyle = 'bg-amber-50 border-dashed border-amber-400 text-amber-700 font-medium';
          } else if (isAnswered) {
            buttonStyle = 'bg-emerald-50 border-emerald-300 text-emerald-800 font-semibold';
          }

          return (
            <button
              key={qId}
              type="button"
              onClick={() => onSelectQuestion(index)}
              className={`relative h-10 rounded-xl border text-xs flex items-center justify-center transition-all cursor-pointer ${buttonStyle}`}
              aria-label={`Question ${index + 1}: ${
                isCurrent ? 'Current' : isAnswered ? 'Answered' : 'Unanswered'
              }${isMarked ? ', Marked for review' : ''}`}
            >
              <span>{index + 1}</span>

              {/* Status indicators */}
              {isMarked && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-500 rounded-full flex items-center justify-center text-[8px] text-white shadow-xs">
                  <Flag className="w-2 h-2 fill-current" />
                </span>
              )}
              {isAnswered && !isCurrent && !isMarked && (
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-600 rounded-full flex items-center justify-center text-[8px] text-white shadow-xs">
                  <Check className="w-2 h-2" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Status Summary & Legend */}
      <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
        <div className="flex items-center justify-between py-1 text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>Answered</span>
          </div>
          <span className="font-semibold text-slate-800">{answeredCount}</span>
        </div>

        <div className="flex items-center justify-between py-1 text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-300" />
            <span>Unanswered</span>
          </div>
          <span className="font-semibold text-slate-800">{unansweredCount}</span>
        </div>

        <div className="flex items-center justify-between py-1 text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span>Marked for Review</span>
          </div>
          <span className="font-semibold text-amber-700">{markedCount}</span>
        </div>

        <div className="flex items-center justify-between py-1 text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-600" />
            <span>Current Question</span>
          </div>
          <span className="font-semibold text-blue-700">#{currentIndex + 1}</span>
        </div>
      </div>
    </div>
  );
};
