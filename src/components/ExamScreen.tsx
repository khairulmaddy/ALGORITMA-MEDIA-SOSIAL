import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  AlertTriangle, 
  Timer,
  Check,
  X,
  HelpCircle,
  FileQuestion,
  Layers
} from 'lucide-react';
import { AnswerType, Question, StudentAnswers } from '../types';
import { formatDuration } from '../utils/storage';

interface ExamScreenProps {
  questions: Question[];
  studentName: string;
  classNameVal: string;
  stopwatchSeconds: number;
  answers: StudentAnswers;
  onAnswerChange: (questionId: number, answer: AnswerType) => void;
  onSubmitExam: () => void;
}

export const ExamScreen: React.FC<ExamScreenProps> = ({
  questions,
  studentName,
  classNameVal,
  stopwatchSeconds,
  answers,
  onAnswerChange,
  onSubmitExam,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showNavGridMobile, setShowNavGridMobile] = useState(false);

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSelectAnswer = (ans: AnswerType) => {
    onAnswerChange(currentQ.id, ans);
  };

  const isCurrentAnswered = answers[currentQ.id] !== undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Status & Stopwatch Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        {/* Student identification */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-bold text-sm">
            {currentIndex + 1}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm sm:text-base">
                {studentName}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                {classNameVal}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Soal {currentIndex + 1} dari {totalQuestions}
            </p>
          </div>
        </div>

        {/* Stopwatch Card */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-500/30 px-4 py-2 rounded-xl shadow-inner">
          <Timer className="w-5 h-5 text-amber-400 animate-pulse" />
          <div>
            <span className="text-[10px] font-bold tracking-wider text-amber-300/80 uppercase block">
              Durasi Stopwatch
            </span>
            <span className="font-mono text-base sm:text-lg font-extrabold text-amber-300">
              {formatDuration(stopwatchSeconds)}
            </span>
          </div>
        </div>

        {/* Progress pill & Quick finish button */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-300">
              {answeredCount}/{totalQuestions} Terjawab
            </span>
            <div className="w-32 sm:w-40 h-2 bg-slate-800 rounded-full overflow-hidden mt-1 border border-slate-700">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowConfirmModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>Kumpulkan</span>
          </button>
        </div>
      </div>

      {/* Main Examination Layout: Question Area + Question Grid Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Active Question Display (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl p-6 sm:p-8 space-y-6">
            
            {/* Question Header & Badge */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="px-3.5 py-1 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-bold shadow-sm">
                  Nomor {currentQ.id}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  True or False (Benar / Salah) • Bobot: 10 Poin
                </span>
              </div>

              {/* Status answered indicator */}
              {isCurrentAnswered ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2.5 py-1 rounded-lg">
                  <Check className="w-3.5 h-3.5" /> Sudah Terjawab
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-950/40 border border-amber-800/60 px-2.5 py-1 rounded-lg">
                  <HelpCircle className="w-3.5 h-3.5" /> Belum Dijawab
                </span>
              )}
            </div>

            {/* Question Text */}
            <div className="min-h-[110px] sm:min-h-[130px] flex items-center py-2">
              <p className="text-base sm:text-lg lg:text-xl font-medium text-slate-100 leading-relaxed">
                "{currentQ.question}"
              </p>
            </div>

            {/* Answer Options: High contrast, easy to read font colors */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Pilih Jawaban Anda:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Opsi BENAR */}
                <button
                  type="button"
                  onClick={() => handleSelectAnswer('BENAR')}
                  className={`group relative p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 text-left ${
                    answers[currentQ.id] === 'BENAR'
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-xl shadow-emerald-500/25 ring-4 ring-emerald-500/20 scale-[1.01]'
                      : 'bg-slate-950/80 hover:bg-slate-800/80 border-slate-700/80 text-emerald-300 hover:border-emerald-500/60'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm transition-colors ${
                      answers[currentQ.id] === 'BENAR'
                        ? 'bg-white text-emerald-700 shadow'
                        : 'bg-emerald-500/20 text-emerald-300 group-hover:bg-emerald-500/30'
                    }`}>
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      {/* Bold, bright font color easily readable */}
                      <span className={`block text-lg sm:text-xl font-black tracking-wide ${
                        answers[currentQ.id] === 'BENAR' ? 'text-white' : 'text-emerald-400 font-extrabold'
                      }`}>
                        BENAR
                      </span>
                      <span className={`text-xs block ${
                        answers[currentQ.id] === 'BENAR' ? 'text-emerald-100' : 'text-slate-300'
                      }`}>
                        Pernyataan sesuai fakta
                      </span>
                    </div>
                  </div>

                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQ.id] === 'BENAR'
                      ? 'border-white bg-white text-emerald-700'
                      : 'border-emerald-500/50 group-hover:border-emerald-400'
                  }`}>
                    {answers[currentQ.id] === 'BENAR' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
                    )}
                  </div>
                </button>

                {/* Opsi SALAH */}
                <button
                  type="button"
                  onClick={() => handleSelectAnswer('SALAH')}
                  className={`group relative p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 text-left ${
                    answers[currentQ.id] === 'SALAH'
                      ? 'bg-rose-600 text-white border-rose-400 shadow-xl shadow-rose-500/25 ring-4 ring-rose-500/20 scale-[1.01]'
                      : 'bg-slate-950/80 hover:bg-slate-800/80 border-slate-700/80 text-rose-300 hover:border-rose-500/60'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm transition-colors ${
                      answers[currentQ.id] === 'SALAH'
                        ? 'bg-white text-rose-700 shadow'
                        : 'bg-rose-500/20 text-rose-300 group-hover:bg-rose-500/30'
                    }`}>
                      <X className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      {/* Bold, bright font color easily readable */}
                      <span className={`block text-lg sm:text-xl font-black tracking-wide ${
                        answers[currentQ.id] === 'SALAH' ? 'text-white' : 'text-rose-400 font-extrabold'
                      }`}>
                        SALAH
                      </span>
                      <span className={`text-xs block ${
                        answers[currentQ.id] === 'SALAH' ? 'text-rose-100' : 'text-slate-300'
                      }`}>
                        Pernyataan tidak sesuai
                      </span>
                    </div>
                  </div>

                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQ.id] === 'SALAH'
                      ? 'border-white bg-white text-rose-700'
                      : 'border-rose-500/50 group-hover:border-rose-400'
                  }`}>
                    {answers[currentQ.id] === 'SALAH' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-700" />
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Bottom Nav Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800 gap-3">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={handlePrev}
                className="px-4 sm:px-5 py-2.5 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              <button
                type="button"
                onClick={() => setShowNavGridMobile(!showNavGridMobile)}
                className="lg:hidden px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300 flex items-center gap-1.5"
              >
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Daftar Soal</span>
              </button>

              {currentIndex < totalQuestions - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 sm:px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
                >
                  <span>Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(true)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Selesai & Kumpulkan</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Right Side: Question Navigation Grid (lg:col-span-4) */}
        <div className={`lg:col-span-4 space-y-4 ${showNavGridMobile ? 'block' : 'hidden lg:block'}`}>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 shadow-xl backdrop-blur-xl p-5 sm:p-6 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <FileQuestion className="w-4 h-4 text-indigo-400" />
                <span>Navigasi Nomor Soal</span>
              </h3>
              <span className="text-xs font-semibold text-slate-400">
                Total: {totalQuestions}
              </span>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] pb-1">
              <div className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                <div className="w-3.5 h-3.5 rounded bg-emerald-500" />
                <span className="text-slate-300 font-medium">Sudah Terjawab ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                <div className="w-3.5 h-3.5 rounded bg-slate-800 border border-slate-700" />
                <span className="text-slate-300 font-medium">Belum ({unansweredCount})</span>
              </div>
            </div>

            {/* Grid 1 to 40 buttons */}
            <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-5 gap-2 max-h-[360px] overflow-y-auto pr-1">
              {questions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isCurrent = idx === currentIndex;
                const chosenAns = answers[q.id];

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowNavGridMobile(false);
                    }}
                    className={`relative h-10 rounded-xl font-bold text-xs flex flex-col items-center justify-center transition-all ${
                      isCurrent
                        ? 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900 bg-indigo-600 text-white font-extrabold shadow-lg scale-105'
                        : isAnswered
                        ? 'bg-emerald-600/90 text-white hover:bg-emerald-500 border border-emerald-400/30'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200 border border-slate-700/80'
                    }`}
                  >
                    <span>{q.id}</span>
                    {isAnswered && (
                      <span className="text-[9px] font-mono leading-none opacity-90">
                        {chosenAns === 'BENAR' ? 'B' : 'S'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Submit inside nav sidebar */}
            <div className="pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Kumpulkan Asesmen</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Confirmation Modal before Submit */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-7 space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Konfirmasi Pengumpulan</h4>
                <p className="text-xs text-slate-400">Pastikan semua jawaban telah diperiksa.</p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-slate-300 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                <span>Total Soal:</span>
                <span className="font-bold text-white">{totalQuestions} Soal</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                <span>Sudah Dijawab:</span>
                <span className="font-bold text-emerald-400">{answeredCount} Soal</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                <span>Belum Terisi:</span>
                <span className={`font-bold ${unansweredCount > 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                  {unansweredCount} Soal
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>Waktu Dihabiskan:</span>
                <span className="font-mono font-bold text-amber-300">{formatDuration(stopwatchSeconds)}</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <p className="text-xs text-amber-300/90 bg-amber-950/40 p-3 rounded-xl border border-amber-500/30">
                Peringatan: Masih terdapat <strong>{unansweredCount} soal</strong> yang belum Anda jawab. Anda hanya memiliki 1 kesempatan untuk asesmen ini.
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs sm:text-sm border border-slate-700 transition-all"
              >
                Cek Kembali
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmModal(false);
                  onSubmitExam();
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/25 transition-all"
              >
                Ya, Kumpulkan Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
