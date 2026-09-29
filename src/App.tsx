/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CoverScreen } from './components/CoverScreen';
import { ExamScreen } from './components/ExamScreen';
import { ResultScreen } from './components/ResultScreen';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { QUESTIONS } from './data/questions';
import { AnswerType, StudentAnswers, StudentResult } from './types';
import { 
  checkAdminAuth, 
  formatDateIndo, 
  formatDuration, 
  getCurrentStudentSession, 
  getSavedResults, 
  saveStudentResult, 
  setAdminAuth 
} from './utils/storage';

export default function App() {
  const [currentView, setCurrentView] = useState<'cover' | 'exam' | 'result' | 'admin'>('cover');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState<boolean>(false);

  // Student state
  const [studentName, setStudentName] = useState<string>('');
  const [classNameVal, setClassNameVal] = useState<string>('');
  const [examCode, setExamCode] = useState<string>('');
  const [answers, setAnswers] = useState<StudentAnswers>({});

  // Active student completed result (for 1-attempt rule and review)
  const [currentResult, setCurrentResult] = useState<StudentResult | null>(null);

  // All saved results in global local database for Admin
  const [allResults, setAllResults] = useState<StudentResult[]>([]);

  // Stopwatch state
  const [stopwatchSeconds, setStopwatchSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Initial load
  useEffect(() => {
    // Check if admin is currently authenticated
    const adminAuth = checkAdminAuth();
    setIsAdminLoggedIn(adminAuth);

    // Load results from global local database
    const saved = getSavedResults();
    setAllResults(saved);

    // Check if this browser already completed an exam (1-attempt rule)
    const existingSession = getCurrentStudentSession();
    if (existingSession) {
      setCurrentResult(existingSession);
      setStudentName(existingSession.name);
      setClassNameVal(existingSession.className);
      setExamCode(existingSession.examCode);
    }
  }, []);

  // Stopwatch effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setStopwatchSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isTimerRunning && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  // Handler: Start Exam
  const handleStartExam = (data: { name: string; className: string; examCode: string }) => {
    setStudentName(data.name);
    setClassNameVal(data.className);
    setExamCode(data.examCode);
    setAnswers({});
    setStopwatchSeconds(0);
    setIsTimerRunning(true);
    setCurrentView('exam');
  };

  // Handler: Select Answer
  const handleAnswerChange = (questionId: number, answer: AnswerType) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Handler: Submit Exam
  const handleSubmitExam = () => {
    setIsTimerRunning(false);

    // Calculate score
    let correctCount = 0;
    QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const totalQuestions = QUESTIONS.length;
    const incorrectCount = totalQuestions - correctCount;
    // Each question is worth 10 points = 400 points total, scaled to 100
    const scoreScale100 = Math.round((correctCount / totalQuestions) * 100);
    const scorePoints = correctCount * 10;
    const passed = scoreScale100 >= 75;

    const completedAt = new Date().toISOString();
    const durationFormatted = formatDuration(stopwatchSeconds);
    const completedDateFormatted = formatDateIndo(completedAt);

    const newResult: StudentResult = {
      id: `res_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: studentName,
      className: classNameVal,
      examCode: examCode,
      answers: answers,
      correctCount,
      incorrectCount,
      unansweredCount: totalQuestions - Object.keys(answers).length,
      totalQuestions,
      scoreScale100,
      scorePoints,
      durationSeconds: stopwatchSeconds,
      durationFormatted,
      completedAt,
      completedDateFormatted,
      passed,
    };

    // Save automatically to global local database and lock student session
    saveStudentResult(newResult);
    setCurrentResult(newResult);
    setAllResults(getSavedResults());

    // Switch to result screen
    setCurrentView('result');
  };

  // Handler: Admin Open
  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setCurrentView('admin');
    } else {
      setShowAdminLoginModal(true);
    }
  };

  // Handler: Admin Login Success
  const handleAdminLoginSuccess = () => {
    setAdminAuth(true);
    setIsAdminLoggedIn(true);
    setShowAdminLoginModal(false);
    setAllResults(getSavedResults());
    setCurrentView('admin');
  };

  // Handler: Admin Logout
  const handleAdminLogout = () => {
    setAdminAuth(false);
    setIsAdminLoggedIn(false);
    if (currentView === 'admin') {
      setCurrentView(currentResult ? 'result' : 'cover');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 bg-mesh-glow selection:bg-indigo-500 selection:text-white">
      {/* Header with Stopwatch and Admin 🔑 */}
      <Header
        currentView={currentView}
        studentName={studentName}
        classNameVal={classNameVal}
        stopwatchSeconds={stopwatchSeconds}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdmin={handleOpenAdmin}
        onAdminLogout={handleAdminLogout}
        onNavigateHome={() => {
          if (currentView === 'admin') {
            setCurrentView(currentResult ? 'result' : 'cover');
          } else if (currentView === 'result') {
            setCurrentView('cover');
          }
        }}
      />

      {/* Main Content Router */}
      <main className="flex-1 flex flex-col">
        {currentView === 'cover' && (
          <CoverScreen
            onStartExam={handleStartExam}
            existingResult={currentResult}
            onViewExistingResult={() => setCurrentView('result')}
          />
        )}

        {currentView === 'exam' && (
          <ExamScreen
            questions={QUESTIONS}
            studentName={studentName}
            classNameVal={classNameVal}
            stopwatchSeconds={stopwatchSeconds}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onSubmitExam={handleSubmitExam}
          />
        )}

        {currentView === 'result' && currentResult && (
          <ResultScreen
            result={currentResult}
            questions={QUESTIONS}
            onBackToCover={() => setCurrentView('cover')}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard
            results={allResults}
            questions={QUESTIONS}
            onRefreshResults={() => {
              setAllResults(getSavedResults());
              setCurrentResult(getCurrentStudentSession());
            }}
            onLogout={handleAdminLogout}
            onBackToHome={() => setCurrentView(currentResult ? 'result' : 'cover')}
          />
        )}
      </main>

      {/* Admin Login Modal (No default password hint shown in UI) */}
      <AdminLoginModal
        isOpen={showAdminLoginModal}
        onClose={() => setShowAdminLoginModal(false)}
        onSuccess={handleAdminLoginSuccess}
      />

      {/* Footer: PALING BAWAH APLIKASI “ Copywrite by Khairul Maddy” */}
      <Footer />
    </div>
  );
}
