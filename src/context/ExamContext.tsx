import React, { createContext, useContext, useState, useEffect } from 'react';
import { Exam, ExamResult } from '../types';
import { SAMPLE_EXAMS } from '../data/exams';

interface SubmissionData {
  examId: string;
  userId: string;
  userName: string;
  userEmail: string;
  durationTakenSeconds: number;
  userAnswers: Record<number, number>;
  markedForReview: number[];
}

interface ExamContextType {
  exams: Exam[];
  getExamById: (id: string) => Exam | undefined;
  results: ExamResult[];
  getUserResults: (userId: string) => ExamResult[];
  getResultById: (id: string) => ExamResult | undefined;
  submitExam: (data: SubmissionData) => ExamResult;
  deleteResult: (id: string) => void;
}

const STORAGE_KEY_RESULTS = 'exampro_results';

// Initial pre-seeded past result for demo user
const INITIAL_DEMO_RESULTS: ExamResult[] = [
  {
    id: 'res-demo-seed-1',
    examId: 'general-knowledge',
    examTitle: 'General Knowledge & Current Affairs',
    subject: 'General Knowledge',
    userId: 'user-demo-1',
    userName: 'Alex Morgan',
    userEmail: 'alex.morgan@example.com',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    durationTakenSeconds: 385,
    score: 8,
    totalQuestions: 10,
    correctCount: 8,
    wrongCount: 2,
    unansweredCount: 0,
    percentage: 80,
    passed: true,
    userAnswers: {
      1: 2,
      2: 1,
      3: 0,
      4: 1,
      5: 2,
      6: 0, // Mars was 1, so wrong
      7: 2,
      8: 1,
      9: 0, // Nile was 1, so wrong
      10: 1
    },
    markedForReview: [6]
  }
];

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export const ExamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [exams] = useState<Exam[]>(SAMPLE_EXAMS);
  const [results, setResults] = useState<ExamResult[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_RESULTS);
      if (stored) {
        return JSON.parse(stored);
      }
      localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(INITIAL_DEMO_RESULTS));
      return INITIAL_DEMO_RESULTS;
    } catch {
      return INITIAL_DEMO_RESULTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(results));
    } catch (e) {
      console.error('Failed to save results to localStorage', e);
    }
  }, [results]);

  const getExamById = (id: string): Exam | undefined => {
    return exams.find(e => e.id === id);
  };

  const getUserResults = (userId: string): ExamResult[] => {
    return results
      .filter(r => r.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const getResultById = (id: string): ExamResult | undefined => {
    return results.find(r => r.id === id);
  };

  const submitExam = (data: SubmissionData): ExamResult => {
    const exam = getExamById(data.examId);
    if (!exam) {
      throw new Error(`Exam not found with id ${data.examId}`);
    }

    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    exam.questions.forEach(q => {
      const selected = data.userAnswers[q.id];
      if (selected === undefined || selected === null) {
        unansweredCount++;
      } else if (selected === q.correctAnswer) {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    const totalQuestions = exam.questions.length;
    const score = correctCount;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= exam.passingPercentage;

    const newResult: ExamResult = {
      id: `res-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      examId: exam.id,
      examTitle: exam.title,
      subject: exam.subject,
      userId: data.userId,
      userName: data.userName,
      userEmail: data.userEmail,
      date: new Date().toISOString(),
      durationTakenSeconds: data.durationTakenSeconds,
      score,
      totalQuestions,
      correctCount,
      wrongCount,
      unansweredCount,
      percentage,
      passed,
      userAnswers: data.userAnswers,
      markedForReview: data.markedForReview
    };

    setResults(prev => [newResult, ...prev]);
    return newResult;
  };

  const deleteResult = (id: string) => {
    setResults(prev => prev.filter(r => r.id !== id));
  };

  return (
    <ExamContext.Provider
      value={{
        exams,
        getExamById,
        results,
        getUserResults,
        getResultById,
        submitExam,
        deleteResult
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
};
