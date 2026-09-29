export type AnswerType = 'BENAR' | 'SALAH';

export interface Question {
  id: number;
  question: string;
  correctAnswer: AnswerType;
  explanation: string;
}

export interface StudentAnswers {
  [questionId: number]: AnswerType;
}

export interface StudentResult {
  id: string;
  name: string;
  className: string;
  examCode: string;
  answers: StudentAnswers;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  totalQuestions: number;
  scoreScale100: number;
  scorePoints: number;
  durationSeconds: number;
  durationFormatted: string;
  completedAt: string; // ISO string
  completedDateFormatted: string;
  passed: boolean;
}

export interface AdminCredentials {
  passwordHash: string; // or stored password
  updatedAt: string;
}
