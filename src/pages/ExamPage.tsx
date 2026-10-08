import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useExam } from '../context/ExamContext';
import { Timer } from '../components/Timer';
import { QuestionView } from '../components/QuestionView';
import { QuestionNavigator } from '../components/QuestionNavigator';
import { SubmitConfirmModal } from '../components/SubmitConfirmModal';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Play, 
  Send,
  Flag,
  BookOpen
} from 'lucide-react';

export const ExamPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { getExamById, submitExam } = useExam();

  const exam = examId ? getExamById(examId) : undefined;

  // Screen states
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Timing states
  const totalSeconds = (exam?.durationMinutes || 10) * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const startTimeRef = useRef<number | null>(null);

  // Prevent multiple submits
  const isSubmittedRef = useRef(false);

  // Timer interval
  useEffect(() => {
    if (!hasStarted || isSubmittedRef.current) return;

    startTimeRef.current = Date.now();

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [hasStarted]);

  // If exam doesn't exist
  if (!exam) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 max-w-md w-full text-center shadow-sm">
          <ShieldAlert className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Examination Not Found</h2>
          <p className="text-sm text-slate-600 mb-6">
            The requested assessment could not be located or has been modified.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  const currentQuestion = exam.questions[currentIndex];
  const questionIds = exam.questions.map((q) => q.id);

  // Option selection
  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  // Clear option
  const handleClearOption = () => {
    setUserAnswers((prev) => {
      const updated = { ...prev };
      delete updated[currentQuestion.id];
      return updated;
    });
  };

  // Toggle mark for review
  const handleToggleMark = () => {
    setMarkedForReview((prev) =>
      prev.includes(currentQuestion.id)
        ? prev.filter((id) => id !== currentQuestion.id)
        : [...prev, currentQuestion.id]
    );
  };

  // Final submission logic
  const executeSubmission = () => {
    if (isSubmittedRef.current || !currentUser) return;
    isSubmittedRef.current = true;

    const timeSpent = Math.max(1, totalSeconds - secondsLeft);

    const result = submitExam({
      examId: exam.id,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      durationTakenSeconds: timeSpent,
      userAnswers,
      markedForReview,
    });

    navigate(`/result/${result.id}`, { replace: true });
  };

  const handleTimeUp = () => {
    // Auto submit on zero
    executeSubmission();
  };

  const handleBeginExam = () => {
    setSecondsLeft(totalSeconds);
    setHasStarted(true);
  };

  // Compute counts for modal
  const answeredCount = Object.keys(userAnswers).filter(
    (k) => userAnswers[Number(k)] !== undefined
  ).length;
  const unansweredCount = exam.totalQuestions - answeredCount;

  // 1. INSTRUCTIONS SCREEN
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header banner */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-8 text-white">
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-200 mb-2">
                {exam.subject} Examination
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {exam.title}
              </h1>
              <p className="mt-2 text-sm text-blue-100 leading-relaxed">
                {exam.description}
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              {/* Exam specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-xs font-medium text-slate-500">Total Questions</div>
                  <div className="text-xl font-bold text-slate-900 mt-1">{exam.totalQuestions}</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-xs font-medium text-slate-500">Duration</div>
                  <div className="text-xl font-bold text-slate-900 mt-1">{exam.durationMinutes} mins</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-xs font-medium text-slate-500">Passing Score</div>
                  <div className="text-xl font-bold text-emerald-600 mt-1">{exam.passingPercentage}%</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-xs font-medium text-slate-500">Difficulty</div>
                  <div className="text-xl font-bold text-blue-600 mt-1">{exam.difficulty}</div>
                </div>
              </div>

              {/* Rules and Guidelines */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Important Instructions & Rules</span>
                </h3>

                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Strict Countdown: </strong> The assessment is timed for exactly <strong>{exam.durationMinutes} minutes</strong>. When the countdown hits 00:00, your test will auto-submit automatically.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Question Navigation: </strong> You can freely jump between any questions at any time using the Question Palette on the right.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Mark for Review: </strong> Flag ambiguous or challenging questions so you can easily return to them prior to final submission.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Evaluation & Pass Mark: </strong> Each correct answer earns 1 point. A minimum score of {exam.passingPercentage}% is required to earn a passing grade.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Ready prompt & Start Button */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  Logged in as candidate: <strong className="text-slate-800">{currentUser?.name}</strong> ({currentUser?.email})
                </div>

                <button
                  type="button"
                  onClick={handleBeginExam}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Begin Examination</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. ACTIVE EXAM TEST SCREEN
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top sticky test control bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Exam Name & Progress */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs">
              {currentIndex + 1}
            </div>
            <div className="truncate">
              <h1 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                {exam.title}
              </h1>
              <span className="text-xs text-slate-500 hidden sm:inline">
                Question {currentIndex + 1} of {exam.totalQuestions}
              </span>
            </div>
          </div>

          {/* Center / Right: Countdown Timer & Submit Action */}
          <div className="flex items-center gap-3 shrink-0">
            <Timer secondsLeft={secondsLeft} totalSeconds={totalSeconds} />

            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs hover:shadow transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Exam</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Examination Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Active Question View & Controls (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-6">
            <QuestionView
              question={currentQuestion}
              questionNumber={currentIndex + 1}
              totalQuestions={exam.totalQuestions}
              selectedOption={userAnswers[currentQuestion.id]}
              isMarkedForReview={markedForReview.includes(currentQuestion.id)}
              onSelectOption={handleSelectOption}
              onClearOption={handleClearOption}
              onToggleMarkForReview={handleToggleMark}
            />

            {/* Bottom Question Step Actions */}
            <div className="flex items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="text-xs text-slate-500 font-medium">
                {currentIndex + 1} / {exam.totalQuestions}
              </div>

              {currentIndex < exam.totalQuestions - 1 ? (
                <button
                  type="button"
                  onClick={() =>
                    setCurrentIndex((prev) =>
                      Math.min(exam.totalQuestions - 1, prev + 1)
                    )
                  }
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs cursor-pointer"
                >
                  <span>Review & Submit</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Question Navigator Palette (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-6">
            <QuestionNavigator
              totalQuestions={exam.totalQuestions}
              currentIndex={currentIndex}
              userAnswers={userAnswers}
              markedForReview={markedForReview}
              questionIds={questionIds}
              onSelectQuestion={(idx) => setCurrentIndex(idx)}
            />

            {/* Quick Helper Tips */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-blue-950">
                <HelpCircle className="w-4 h-4 text-blue-700" />
                <span>Navigation Tip</span>
              </div>
              <p className="leading-relaxed">
                Click any number in the palette above to jump immediately to that question. You can revisit and alter your answers as often as you wish until the test is submitted.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Submit Confirmation Popup */}
      <SubmitConfirmModal
        isOpen={isSubmitModalOpen}
        totalQuestions={exam.totalQuestions}
        answeredCount={answeredCount}
        unansweredCount={unansweredCount}
        markedCount={markedForReview.length}
        onConfirm={executeSubmission}
        onCancel={() => setIsSubmitModalOpen(false)}
      />
    </div>
  );
};
