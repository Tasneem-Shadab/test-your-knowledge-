import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SAMPLE_EXAMS } from '../data/exams';
import { 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Award, 
  ShieldCheck, 
  UserPlus, 
  FileCheck, 
  Timer as TimerIcon, 
  BarChart3,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { isAuthenticated, currentUser } = useAuth();

  const steps = [
    {
      step: '01',
      title: 'Sign Up Free',
      description: 'Create your candidate account in seconds with your name and email.',
      icon: UserPlus,
    },
    {
      step: '02',
      title: 'Choose an Exam',
      description: 'Select from 6 standardized subjects spanning General Knowledge, Math, Science, and IT.',
      icon: FileCheck,
    },
    {
      step: '03',
      title: 'Take the Test',
      description: 'Engage with our real-time countdown timer, question navigator, and mark-for-review tools.',
      icon: TimerIcon,
    },
    {
      step: '04',
      title: 'See Your Result',
      description: 'Get instant pass/fail evaluation, percentage scores, and a detailed question-by-question review.',
      icon: BarChart3,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-blue-50/70 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Anti-slop kicker text */}
            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Next-Generation Evaluation Environment</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Test your knowledge with precision on <span className="text-blue-600">ExamPro</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
              A distraction-free, responsive online examination platform featuring timed tests, question navigation, auto-submission, and comprehensive answer reviews.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                >
                  <span>Go to Exam Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Sign Up Free</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/signin"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 shadow-xs hover:border-slate-400 transition-all"
                  >
                    <span>Sign In</span>
                  </Link>
                </>
              )}
            </div>

            {/* Micro value props */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                No Backend Required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Instant Score Calculation
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Detailed Explanations
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
              Workflow
            </h2>
            <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              How It Works
            </h3>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Four streamlined steps to assess your proficiency, identify knowledge gaps, and track your improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-100/70 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-2xl font-black text-slate-300 group-hover:text-blue-200 transition-colors">
                        {item.step}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-slate-300">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Available Exams Preview Section */}
      <section id="sample-exams" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
                Available Assessments
              </h2>
              <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Curated Practice Exams
              </h3>
              <p className="mt-2 text-slate-600 text-sm">
                Each examination features 10 standardized multiple-choice questions with 4 distinct options.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to={isAuthenticated ? '/dashboard' : '/signup'}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
              >
                <span>View all 6 tests in dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_EXAMS.slice(0, 6).map((exam) => (
              <div
                key={exam.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-semibold uppercase tracking-wider text-blue-600">
                      {exam.subject}
                    </span>
                    <span>{exam.difficulty}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    {exam.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                    {exam.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-500 pb-4 border-b border-slate-100">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                      {exam.totalQuestions} Questions
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      {exam.durationMinutes} Mins
                    </span>
                    <span>·</span>
                    <span>40% Pass Mark</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    to={isAuthenticated ? `/exam/${exam.id}/instructions` : `/signin`}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white rounded-xl transition-all"
                  >
                    <span>{isAuthenticated ? 'Take Exam' : 'Sign in to Start'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                Precision Countdown
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automatic submission upon timer expiration ensures strict test integrity across all device formats.
              </p>
            </div>

            <div className="p-6">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                Instant Diagnostic Scoring
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Real-time computation provides correct, wrong, and unanswered metric breakdowns without lag.
              </p>
            </div>

            <div className="p-6">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                Local Storage Persistence
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accounts, attempts, and historical review data remain securely synchronized in your browser session.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
