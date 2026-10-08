export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: string;
}

export interface Question {
  id: number;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0, 1, 2, or 3
  explanation: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  category: 'General' | 'Science & Math' | 'Language' | 'Technology' | 'Aptitude';
  description: string;
  durationMinutes: number;
  totalQuestions: number;
  passingPercentage: number; // default 40
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: Question[];
}

export interface ExamResult {
  id: string;
  examId: string;
  examTitle: string;
  subject: string;
  userId: string;
  userName: string;
  userEmail: string;
  date: string; // ISO string
  durationTakenSeconds: number;
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  percentage: number;
  passed: boolean;
  userAnswers: Record<number, number>; // questionId -> optionIndex (0-3)
  markedForReview: number[]; // array of questionIds
}
