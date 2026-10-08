import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Exam<span className="text-blue-400">Pro</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Standardized, timed examination platform designed for skill assessments, academic practice, and self-evaluation.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Engine
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                Real-time Timers
              </span>
            </div>
          </div>

          {/* Core Subjects */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase mb-3">
              Assessment Subjects
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>General Knowledge & Current Affairs</li>
              <li>Essential Mathematics & Algebra</li>
              <li>General Science & Environmental</li>
              <li>English Grammar & Vocabulary</li>
              <li>Computer Fundamentals & IT</li>
              <li>Logical Reasoning & Aptitude</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Home & Overview
                </Link>
              </li>
              <li>
                <Link to="/signin" className="text-slate-400 hover:text-white transition-colors">
                  Candidate Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-slate-400 hover:text-white transition-colors">
                  Register Account
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors">
                  Exam Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Exam Standards */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase mb-3">
              Platform Standards
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Strict 40% passing benchmark with full transparent answer breakdowns.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Zero-server privacy: all session credentials & test records safely kept in your browser.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Mark for review feature allows flexible pacing throughout the test.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ExamPro Online Examination Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Client-Side Local Storage Mode</span>
            <span>·</span>
            <span>WCAG Accessible</span>
            <span>·</span>
            <span>Responsive Layout</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
