import React from 'react';
import { AlertCircle, CheckCircle2, Flag, HelpCircle, X } from 'lucide-react';

interface SubmitConfirmModalProps {
  isOpen: boolean;
  totalQuestions: number;
  answeredCount: number;
  unansweredCount: number;
  markedCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export const SubmitConfirmModal: React.FC<SubmitConfirmModalProps> = ({
  isOpen,
  totalQuestions,
  answeredCount,
  unansweredCount,
  markedCount,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="submit-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 id="submit-modal-title" className="text-base font-bold text-slate-900">
                Submit Examination?
              </h3>
              <p className="text-xs text-slate-500">
                Review your test summary before finalizing
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content & Stats */}
        <div className="p-6 space-y-4">
          {unansweredCount > 0 && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-800 text-xs leading-relaxed">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Attention: </span>
                You still have <strong>{unansweredCount} unanswered {unansweredCount === 1 ? 'question' : 'questions'}</strong>. Once submitted, you cannot change your answers.
              </div>
            </div>
          )}

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-lg font-bold text-slate-900">{totalQuestions}</div>
              <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1 mt-0.5">
                <HelpCircle className="w-3 h-3 text-slate-400" />
                <span>Total</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <div className="text-lg font-bold text-emerald-700">{answeredCount}</div>
              <div className="text-[11px] text-emerald-800 flex items-center justify-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Answered</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <div className="text-lg font-bold text-amber-700">{markedCount}</div>
              <div className="text-[11px] text-amber-800 flex items-center justify-center gap-1 mt-0.5">
                <Flag className="w-3 h-3 text-amber-600" />
                <span>Marked</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 text-center pt-1">
            Are you sure you want to conclude this assessment and compute your final score?
          </p>
        </div>

        {/* Footer Buttons */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            Return to Test
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
          >
            Yes, Submit Exam
          </button>
        </div>
      </div>
    </div>
  );
};
