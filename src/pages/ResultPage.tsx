import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useExam } from '../context/ExamContext';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  RotateCcw, 
  ArrowLeft, 
  Award, 
  BookOpen, 
  ChevronRight, 
  Printer, 
  HelpCircle,
  Check,
  X,
  Flag
} from 'lucide-react';

export const ResultPage: React.FC = () => {
  const { resultId } = useParams<{ resultId: string }>();
  const navigate = useNavigate();
  const { getResultById, getExamById } = useExam();

  const [activeFilter, setActiveFilter] = useState<'all' | 'correct' | 'wrong' | 'unanswered'>('all');

  const result = resultId ? getResultById(resultId) : undefined;
  const exam = result ? getExamById(result.examId) : undefined;

  // Trigger celebration confetti on mount if passed
  useEffect(() => {
    if (result && result.passed) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.error('Confetti trigger error', err);
      }
    }
  }, [result]);

  if (!result || !exam) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 max-w-md w-full text-center shadow-sm">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Result Record Not Found</h2>
          <p className="text-sm text-slate-600 mb-6">
            The examination attempt you are looking for is unavailable or has been cleared.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  // Filter review questions
  const filteredQuestions = exam.questions.filter((q) => {
    const userAnswer = result.userAnswers[q.id];
    const isAnswered = userAnswer !== undefined;
    const isCorrect = isAnswered && userAnswer === q.correctAnswer;
    const isWrong = isAnswered && userAnswer !== q.correctAnswer;

    if (activeFilter === 'correct') return isCorrect;
    if (activeFilter === 'wrong') return isWrong;
    if (activeFilter === 'unanswered') return !isAnswered;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer print:hidden"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>

        {/* Hero Performance Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div
            className={`p-6 sm:p-10 border-b ${
              result.passed
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white'
                : 'bg-gradient-to-r from-rose-600 to-red-700 text-white'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold uppercase tracking-wider">
                  {result.passed ? 'Assessment Passed' : 'Assessment Not Cleared'}
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {result.examTitle}
                </h1>
                <p className="text-xs sm:text-sm text-white/90">
                  Candidate: <strong>{result.userName}</strong> ({result.userEmail}) · Completed on {formatDate(result.date)}
                </p>
              </div>

              {/* Big Percentage Score Badge */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center min-w-[160px] shrink-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/80 block">
                  Final Score
                </span>
                <div className="text-4xl sm:text-5xl font-black text-white mt-1">
                  {result.percentage}%
                </div>
                <span className="text-xs text-white/80 mt-1 block">
                  Passing Mark: {exam.passingPercentage}%
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Statistics Metrics */}
          <div className="p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50/50 border-b border-slate-100">
            {/* Total Score */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="text-xs font-medium text-slate-500">Correct Score</div>
              <div className="text-2xl font-bold text-slate-900 mt-1">
                {result.score} <span className="text-sm font-normal text-slate-400">/ {result.totalQuestions}</span>
              </div>
            </div>

            {/* Correct Answers */}
            <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-xs">
              <div className="text-xs font-medium text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Correct</span>
              </div>
              <div className="text-2xl font-bold text-emerald-700 mt-1">
                {result.correctCount}
              </div>
            </div>

            {/* Wrong Answers */}
            <div className="p-4 rounded-2xl bg-white border border-rose-200 shadow-xs">
              <div className="text-xs font-medium text-rose-700 flex items-center gap-1">
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>Wrong</span>
              </div>
              <div className="text-2xl font-bold text-rose-700 mt-1">
                {result.wrongCount}
              </div>
            </div>

            {/* Time Taken */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Time Spent</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 mt-1">
                {formatDuration(result.durationTakenSeconds)}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white print:hidden">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </Link>

            <Link
              to={`/exam/${exam.id}/instructions`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs hover:shadow transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Exam</span>
            </Link>
          </div>
        </div>

        {/* Question-by-Question Review Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>Question Review & Answer Key</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Examine your submitted responses alongside correct answers and rationales.
              </p>
            </div>

            {/* Review Segmented Filter Tabs (Buttons) */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl print:hidden">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({exam.questions.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('correct')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === 'correct'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Correct ({result.correctCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('wrong')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === 'wrong'
                    ? 'bg-white text-rose-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Wrong ({result.wrongCount})
              </button>
              {result.unansweredCount > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveFilter('unanswered')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeFilter === 'unanswered'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Unanswered ({result.unansweredCount})
                </button>
              )}
            </div>
          </div>

          {/* List of reviewed questions */}
          <div className="space-y-6">
            {filteredQuestions.map((question) => {
              const userAnswer = result.userAnswers[question.id];
              const isAnswered = userAnswer !== undefined;
              const isCorrect = isAnswered && userAnswer === question.correctAnswer;
              const isMarked = result.markedForReview.includes(question.id);

              return (
                <div
                  key={question.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5"
                >
                  {/* Question header with evaluation status */}
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                        #{question.id}
                      </span>
                      <h3 className="text-base font-semibold text-slate-900 leading-snug">
                        {question.question}
                      </h3>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {isMarked && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
                          <Flag className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span>Flagged</span>
                        </span>
                      )}

                      {!isAnswered ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>Unanswered</span>
                        </span>
                      ) : isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Correct</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-md">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          <span>Incorrect</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Options review list */}
                  <div className="space-y-2.5">
                    {question.options.map((optText, optIdx) => {
                      const isUserChoice = userAnswer === optIdx;
                      const isCorrectChoice = question.correctAnswer === optIdx;
                      const letter = optionLetters[optIdx];

                      let optionCardStyle = 'bg-white border-slate-200 text-slate-700';

                      if (isCorrectChoice) {
                        optionCardStyle = 'bg-emerald-50/80 border-emerald-300 ring-1 ring-emerald-400 font-medium text-emerald-950';
                      } else if (isUserChoice && !isCorrectChoice) {
                        optionCardStyle = 'bg-rose-50/80 border-rose-300 ring-1 ring-rose-400 font-medium text-rose-950';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 text-sm transition-all ${optionCardStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                                isCorrectChoice
                                  ? 'bg-emerald-600 text-white'
                                  : isUserChoice
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {letter}
                            </span>
                            <span>{optText}</span>
                          </div>

                          <div className="shrink-0 flex items-center gap-2 text-xs">
                            {isUserChoice && (
                              <span
                                className={`font-semibold ${
                                  isCorrectChoice ? 'text-emerald-700' : 'text-rose-700'
                                }`}
                              >
                                Your Answer
                              </span>
                            )}
                            {isCorrectChoice && (
                              <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                                <Check className="w-3.5 h-3.5" />
                                <span>Correct Answer</span>
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Educational Rationale / Explanation */}
                  <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs leading-relaxed text-slate-700">
                    <span className="font-bold text-blue-900 block mb-1">
                      Explanation & Key Concept:
                    </span>
                    <p>{question.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom navigation */}
          <div className="pt-6 flex items-center justify-between">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Dashboard</span>
            </Link>

            <Link
              to={`/exam/${exam.id}/instructions`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake This Exam</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
