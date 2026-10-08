import React from 'react';
import { Question } from '../types';
import { Flag, RotateCcw, Check } from 'lucide-react';

interface QuestionViewProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedOption?: number;
  isMarkedForReview: boolean;
  onSelectOption: (optionIndex: number) => void;
  onClearOption: () => void;
  onToggleMarkForReview: () => void;
}

export const QuestionView: React.FC<QuestionViewProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  isMarkedForReview,
  onSelectOption,
  onClearOption,
  onToggleMarkForReview,
}) => {
  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      {/* Question Header & Action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold text-sm">
            {questionNumber}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mark for Review Toggle */}
          <button
            type="button"
            onClick={onToggleMarkForReview}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
              isMarkedForReview
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Flag
              className={`w-3.5 h-3.5 ${
                isMarkedForReview ? 'fill-amber-500 text-amber-500' : 'text-slate-400'
              }`}
            />
            <span>{isMarkedForReview ? 'Marked for Review' : 'Mark for Review'}</span>
          </button>

          {/* Clear response button */}
          {selectedOption !== undefined && (
            <button
              type="button"
              onClick={onClearOption}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 border border-transparent transition-colors cursor-pointer"
              title="Clear choice for this question"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Question Text */}
      <div className="py-6">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900 leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Four Options as Radio Buttons */}
      <div className="space-y-3" role="radiogroup" aria-label={`Options for question ${questionNumber}`}>
        {question.options.map((optionText, idx) => {
          const isSelected = selectedOption === idx;
          const letter = optionLetters[idx];

          return (
            <label
              key={idx}
              className={`flex items-start gap-3.5 p-4 rounded-xl border transition-all cursor-pointer select-none ${
                isSelected
                  ? 'bg-blue-50/80 border-blue-600 ring-1 ring-blue-500 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={idx}
                checked={isSelected}
                onChange={() => onSelectOption(idx)}
                className="sr-only"
              />

              {/* Radio Indicator & Letter Badge */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-colors mt-0.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {isSelected ? <Check className="w-3.5 h-3.5" /> : letter}
              </div>

              {/* Option Text */}
              <span
                className={`text-sm sm:text-base leading-snug pt-0.5 ${
                  isSelected ? 'font-semibold text-blue-950' : 'text-slate-700'
                }`}
              >
                {optionText}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
