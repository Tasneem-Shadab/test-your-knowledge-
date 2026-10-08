import React from 'react';
import { Link } from 'react-router-dom';
import { Exam, ExamResult } from '../types';
import { 
  Clock, 
  HelpCircle, 
  ArrowRight, 
  Award, 
  CheckCircle, 
  BookOpen,
  Binary,
  Calculator,
  Atom,
  Languages,
  Brain
} from 'lucide-react';

interface ExamCardProps {
  exam: Exam;
  latestResult?: ExamResult;
}

export const ExamCard: React.FC<ExamCardProps> = ({ exam, latestResult }) => {
  const getSubjectIcon = (subject: string) => {
    switch (subject.toLowerCase()) {
      case 'mathematics':
        return <Calculator className="w-5 h-5 text-indigo-600" />;
      case 'science':
        return <Atom className="w-5 h-5 text-emerald-600" />;
      case 'english':
        return <Languages className="w-5 h-5 text-violet-600" />;
      case 'computer basics':
        return <Binary className="w-5 h-5 text-cyan-600" />;
      case 'reasoning':
        return <Brain className="w-5 h-5 text-amber-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      <div className="p-6">
        {/* Top Header info */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              {getSubjectIcon(exam.subject)}
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {exam.subject}
            </div>
          </div>
          <span className="text-xs font-medium text-slate-500">
            {exam.difficulty}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-1">
          {exam.title}
        </h3>
        <p className="text-sm text-slate-600 line-clamp-2 mb-5 leading-relaxed">
          {exam.description}
        </p>

        {/* Unboxed Metadata row */}
        <div className="flex items-center gap-3 text-xs text-slate-500 pt-1 pb-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            <HelpCircle className="w-4 h-4 text-blue-500" />
            <span>{exam.totalQuestions} Questions</span>
          </div>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            <Clock className="w-4 h-4 text-blue-500" />
            <span>{exam.durationMinutes} Minutes</span>
          </div>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="text-slate-500">Pass: {exam.passingPercentage}%</span>
        </div>

        {/* Previous attempt indicator if exists */}
        {latestResult && (
          <div className="mt-3 py-2 px-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              {latestResult.passed ? (
                <CheckCircle className="w-4 h-4 text-emerald-600" />
              ) : (
                <Award className="w-4 h-4 text-rose-500" />
              )}
              <span className="font-medium text-slate-700">
                Last Score: <strong className={latestResult.passed ? 'text-emerald-700' : 'text-rose-600'}>{latestResult.percentage}%</strong> ({latestResult.score}/{latestResult.totalQuestions})
              </span>
            </div>
            <span className={`text-[11px] font-semibold ${latestResult.passed ? 'text-emerald-700' : 'text-rose-600'}`}>
              {latestResult.passed ? 'Passed' : 'Failed'}
            </span>
          </div>
        )}
      </div>

      {/* Card Action footer */}
      <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          Instant Scoring
        </span>
        <Link
          to={`/exam/${exam.id}/instructions`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl shadow-sm hover:shadow transition-all group-hover:translate-x-0.5"
        >
          <span>{latestResult ? 'Retake Exam' : 'Start Exam'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
