/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ExamProvider } from './context/ExamContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

import { LandingPage } from './pages/LandingPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { DashboardPage } from './pages/DashboardPage';
import { ExamPage } from './pages/ExamPage';
import { ResultPage } from './pages/ResultPage';

// Scroll to top helper on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Layout wrapper to conditionally show standard Navbar & Footer
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // Hide global Navbar/Footer on active test screen to maximize focus if desired,
  // but keep accessible test header inside ExamPage.
  // Exam instructions still show Navbar/Footer for smooth navigation.
  const isTakingExam =
    location.pathname.startsWith('/exam/') && !location.pathname.endsWith('/instructions');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {!isTakingExam && <Navbar />}
      <div className="flex-1">{children}</div>
      {!isTakingExam && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ExamProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppLayout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/exam/:examId"
                element={
                  <ProtectedRoute>
                    <ExamPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/exam/:examId/instructions"
                element={
                  <ProtectedRoute>
                    <ExamPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/result/:resultId"
                element={
                  <ProtectedRoute>
                    <ResultPage />
                  </ProtectedRoute>
                }
              />

              {/* Fallback route */}
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </ExamProvider>
    </AuthProvider>
  );
}
