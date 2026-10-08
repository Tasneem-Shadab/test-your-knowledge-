import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, 
  LogOut, 
  User as UserIcon, 
  Menu, 
  X, 
  LayoutDashboard, 
  Award,
  BookOpen
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If inside an active exam test screen, minimize distractions (optional or clean bar)
  const isTakingExam = location.pathname.startsWith('/exam/') && !location.pathname.endsWith('/instructions');

  const handleLogout = () => {
    signOut();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navLinks: { label: string; path: string; icon?: React.ComponentType<{ className?: string }> }[] = isAuthenticated
    ? [
        { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { label: 'My Results', path: '/dashboard#results', icon: Award },
        { label: 'Explore Exams', path: '/dashboard#exams', icon: BookOpen }
      ]
    : [
        { label: 'Home', path: '/' },
        { label: 'How It Works', path: '/#how-it-works' },
        { label: 'Available Tests', path: '/#sample-exams' }
      ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link 
            to={isAuthenticated ? '/dashboard' : '/'} 
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg px-1 py-1"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Exam<span className="text-blue-600">Pro</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-medium uppercase tracking-wider text-slate-600 ml-1.5 px-1.5 py-0.5 bg-slate-100 rounded">
                Assessment
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          {!isTakingExam && (
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                      isActive ? 'text-blue-600 font-semibold' : 'text-slate-600'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* User Controls / Auth CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && currentUser ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs flex items-center justify-center">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-slate-900 truncate max-w-[120px]">
                      {currentUser.name}
                    </span>
                    <span className="text-[11px] text-slate-600 truncate max-w-[120px]">
                      {currentUser.email}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-lg transition-colors border border-transparent hover:border-rose-200 cursor-pointer"
                  title="Sign out of account"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/signin"
                  className="text-sm font-medium text-slate-700 hover:text-blue-600 px-3.5 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          {isAuthenticated && currentUser && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{currentUser.name}</p>
                <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
              </div>
            </div>
          )}

          <div className="space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {item.icon && <item.icon className="w-4 h-4 text-slate-400" />}
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
