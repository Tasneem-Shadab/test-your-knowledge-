import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useExam } from '../context/ExamContext';
import { ExamCard } from '../components/ExamCard';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Search, 
  TrendingUp, 
  ArrowRight, 
  FileText,
  Calendar,
  Sparkles,
  BarChart3
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { exams, getUserResults } = useExam();

  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const userResults = currentUser ? getUserResults(currentUser.id) : [];

  // Compute stats
  const totalAttempts = userResults.length;
  const passedAttempts = userResults.filter(r => r.passed).length;
  const averagePercentage = totalAttempts > 0 
    ? Math.round(userResults.reduce((acc, r) => acc + r.percentage, 0) / totalAttempts) 
    : 0;

  // Filter exams
  const filteredExams = exams.filter(exam => {
    const matchesSubject = selectedSubject === 'All' || exam.subject === selectedSubject;
    const matchesSearch = 
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const subjects = ['All', 'General Knowledge', 'Mathematics', 'Science', 'English', 'Computer Basics', 'Reasoning'];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Welcome Banner & Summary KPIs */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-semibold backdrop-blur-xs mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Assessment Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Welcome back, {currentUser?.name || 'Candidate'}!
            </h1>
            <p className="mt-2 text-sm sm:text-base text-blue-100 max-w-xl leading-relaxed">
              Ready to evaluate your knowledge? Choose an assessment below, test your critical skills under timed conditions, and review your performance instantly.
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div className="relative z-10 mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3.5 border border-white/15">
              <div className="text-xs text-blue-150 font-medium">Tests Taken</div>
              <div className="text-2xl font-bold mt-1 text-white">{totalAttempts}</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3.5 border border-white/15">
              <div className="text-xs text-blue-150 font-medium">Average Score</div>
              <div className="text-2xl font-bold mt-1 text-white">{averagePercentage}%</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3.5 border border-white/15 col-span-2 sm:col-span-1">
              <div className="text-xs text-blue-150 font-medium">Passed Tests</div>
              <div className="text-2xl font-bold mt-1 text-white">{passedAttempts}</div>
            </div>
          </div>
        </div>

        {/* Available Exams Section */}
        <div id="exams" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span>Available Examinations</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Standardized 10-question multiple-choice evaluations across foundational topics.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search subject or keyword..."
                className="w-full pl-10 pr-3.5 py-2 text-xs sm:text-sm text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Interactive Subject Filter Tabs (Buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {subjects.map((sub) => {
              const isActive = selectedSubject === sub;
              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>

          {/* Grid of Exams */}
          {filteredExams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map((exam) => {
                // Find latest attempt for this specific exam
                const latestResult = userResults.find(r => r.examId === exam.id);
                return (
                  <ExamCard
                    key={exam.id}
                    exam={exam}
                    latestResult={latestResult}
                  />
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">No matching exams found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for a different keyword or switch subject filter back to "All".
              </p>
              <button
                onClick={() => { setSelectedSubject('All'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* My Results Section */}
        <div id="results" className="space-y-6 pt-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span>My Past Results & Attempts</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Review your historical assessment performance, scores, and full answer keys.
              </p>
            </div>
            {userResults.length > 0 && (
              <span className="text-xs font-semibold text-slate-500">
                {userResults.length} {userResults.length === 1 ? 'attempt' : 'attempts'} recorded
              </span>
            )}
          </div>

          {userResults.length > 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3.5 px-6">Examination</th>
                      <th className="py-3.5 px-6">Date</th>
                      <th className="py-3.5 px-6">Score</th>
                      <th className="py-3.5 px-6">Percentage</th>
                      <th className="py-3.5 px-6">Status</th>
                      <th className="py-3.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {userResults.map((res) => (
                      <tr key={res.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-4 px-6 font-semibold text-slate-900">
                          <div>{res.examTitle}</div>
                          <div className="text-xs font-normal text-slate-500">{res.subject} · {formatDuration(res.durationTakenSeconds)} taken</div>
                        </td>
                        <td className="py-4 px-6 text-slate-600 text-xs">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{formatDate(res.date)}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-slate-700 font-medium">
                          <span className="font-bold text-slate-900">{res.score}</span> / {res.totalQuestions}
                        </td>
                        <td className="py-4 px-6 font-bold">
                          <span className={res.passed ? 'text-emerald-600' : 'text-rose-600'}>
                            {res.percentage}%
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold ${
                              res.passed
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-rose-50 text-rose-700'
                            }`}
                          >
                            {res.passed ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Award className="w-3.5 h-3.5 text-rose-500" />
                            )}
                            <span>{res.passed ? 'Passed' : 'Failed'}</span>
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <Link
                            to={`/result/${res.id}`}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            <span>View Review</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
              <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">No examination attempts yet</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Once you complete an examination, your scores, percentage, and complete question reviews will be tracked here.
              </p>
              <a
                href="#exams"
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-xs"
              >
                <span>Select an Exam to Start</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
