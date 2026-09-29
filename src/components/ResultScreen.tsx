import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  CheckCircle, 
  XCircle, 
  Timer, 
  Calendar, 
  User, 
  GraduationCap, 
  Printer, 
  BookOpen, 
  ArrowLeft, 
  Filter,
  Check,
  X,
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { Question, StudentResult } from '../types';
import { formatDuration } from '../utils/storage';

interface ResultScreenProps {
  result: StudentResult;
  questions: Question[];
  onBackToCover: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  questions,
  onBackToCover,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'correct' | 'incorrect'>('all');

  useEffect(() => {
    // Launch celebratory confetti if score >= 75
    if (result.scoreScale100 >= 70) {
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.error('Confetti error:', err);
      }
    }
  }, [result.scoreScale100]);

  // Filtered review questions
  const filteredQuestions = questions.filter((q) => {
    const studentAns = result.answers[q.id];
    const isCorrect = studentAns === q.correctAnswer;
    if (filterType === 'correct') return isCorrect;
    if (filterType === 'incorrect') return !isCorrect;
    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Summary Card */}
      <div className="relative rounded-3xl border border-slate-800 bg-slate-900/95 shadow-2xl backdrop-blur-xl overflow-hidden p-6 sm:p-10 space-y-8">
        {/* Animated decorative top bar */}
        <div className="h-2 w-full absolute top-0 left-0 bg-gradient-to-r from-emerald-500 via-indigo-500 to-pink-500 animate-gradient-x" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Asesmen Selesai Dievaluasi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Laporan Hasil Asesmen Siswa
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Mata Pelajaran: <strong>DIGITAL ONBOARDING</strong> — Memahami Algoritma Digital Marketing
            </p>
          </div>

          {/* Student Profile Info */}
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-xs space-y-1.5 min-w-[240px]">
            <div className="flex items-center gap-2 text-slate-300">
              <User className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <span className="font-bold text-white text-sm truncate">{result.name}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <GraduationCap className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span>Kelas: <strong className="text-slate-200">{result.className}</strong></span>
            </div>
            {result.examCode && (
              <div className="flex items-center gap-2 text-slate-400">
                <span className="font-mono text-[11px] text-amber-300">Kode: {result.examCode}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-slate-400 pt-1 border-t border-slate-800/80">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{result.completedDateFormatted}</span>
            </div>
          </div>
        </div>

        {/* 4 Score Key Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Nilai Akhir (Skala 100) */}
          <div className="bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 text-center relative overflow-hidden shadow-lg">
            <span className="text-[11px] uppercase tracking-wider font-bold text-indigo-300 block mb-1">
              Skor Akhir (100)
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white">
              {result.scoreScale100}
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              Total Poin: {result.scorePoints} / 400
            </span>
          </div>

          {/* Jumlah Benar */}
          <div className="bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/30 rounded-2xl p-5 text-center relative overflow-hidden shadow-lg">
            <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-300 block mb-1">
              Jawaban Benar
            </span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 flex items-center justify-center gap-1.5">
              <Check className="w-7 h-7 stroke-[3]" />
              <span>{result.correctCount}</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              dari {result.totalQuestions} soal
            </span>
          </div>

          {/* Jumlah Salah */}
          <div className="bg-gradient-to-br from-rose-950/60 to-slate-900 border border-rose-500/30 rounded-2xl p-5 text-center relative overflow-hidden shadow-lg">
            <span className="text-[11px] uppercase tracking-wider font-bold text-rose-300 block mb-1">
              Jawaban Salah
            </span>
            <div className="text-3xl sm:text-4xl font-black text-rose-400 flex items-center justify-center gap-1.5">
              <X className="w-7 h-7 stroke-[3]" />
              <span>{result.incorrectCount}</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              dari {result.totalQuestions} soal
            </span>
          </div>

          {/* Durasi Stopwatch */}
          <div className="bg-gradient-to-br from-amber-950/60 to-slate-900 border border-amber-500/30 rounded-2xl p-5 text-center relative overflow-hidden shadow-lg">
            <span className="text-[11px] uppercase tracking-wider font-bold text-amber-300 block mb-1">
              Durasi Stopwatch
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-amber-300 flex items-center justify-center gap-2">
              <Timer className="w-6 h-6 text-amber-400" />
              <span>{result.durationFormatted}</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              {result.durationSeconds} Detik
            </span>
          </div>
        </div>

        {/* 1 Attempt status callout */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
            <span>
              <strong>Pemberitahuan Sistem:</strong> Siswa telah menggunakan <strong>1 kesempatan ujian</strong> pada sesi ini. Data telah otomatis tersimpan ke database lokal aplikasi.
            </span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold flex items-center gap-1.5 transition-all text-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              type="button"
              onClick={onBackToCover}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center gap-1.5 transition-all text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Cover</span>
            </button>
          </div>
        </div>

      </div>

      {/* Review & Pembahasan Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-indigo-400" />
              <span>Review Kunci Jawaban & Pembahasan Lengkap</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Evaluasi setiap nomor soal dengan pembahasan mendalam cara kerja algoritma media sosial.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filterType === 'all'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Semua ({questions.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('correct')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filterType === 'correct'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Benar ({result.correctCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('incorrect')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filterType === 'incorrect'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Salah ({result.incorrectCount})
            </button>
          </div>
        </div>

        {/* List of Questions with Student's Answer, Correct Answer, and Explanation */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const studentAns = result.answers[q.id];
            const isCorrect = studentAns === q.correctAnswer;

            return (
              <div
                key={q.id}
                className={`rounded-2xl border p-5 sm:p-6 transition-all bg-slate-900/90 shadow-md ${
                  isCorrect
                    ? 'border-emerald-500/30 hover:border-emerald-500/50'
                    : 'border-rose-500/30 hover:border-rose-500/50'
                }`}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200">
                      Soal #{q.id}
                    </span>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <Check className="w-3.5 h-3.5" /> Jawaban Tepat (+10 Poin)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        <X className="w-3.5 h-3.5" /> Kurang Tepat (0 Poin)
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-mono text-slate-400">
                    Kunci: <strong className="text-white">{q.correctAnswer}</strong>
                  </span>
                </div>

                {/* Question Text */}
                <p className="text-sm sm:text-base font-medium text-slate-100 mb-4 leading-relaxed">
                  "{q.question}"
                </p>

                {/* Answers Comparison: Made with high contrast font color so it's very easy to see */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {/* Jawaban Siswa */}
                  <div className={`p-3 rounded-xl border flex items-center justify-between ${
                    isCorrect
                      ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-100'
                      : 'bg-rose-950/40 border-rose-600/50 text-rose-100'
                  }`}>
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                        Jawaban Siswa:
                      </span>
                      <span className={`text-base font-black ${
                        studentAns === 'BENAR' ? 'text-emerald-400' : studentAns === 'SALAH' ? 'text-rose-400' : 'text-slate-400'
                      }`}>
                        {studentAns || 'Tidak Dijawab'}
                      </span>
                    </div>
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                  </div>

                  {/* Kunci Jawaban Resmi */}
                  <div className="p-3 rounded-xl border border-indigo-500/40 bg-indigo-950/30 flex items-center justify-between text-indigo-100">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-indigo-300/80 block font-semibold">
                        Kunci Jawaban Resmi:
                      </span>
                      <span className={`text-base font-black ${
                        q.correctAnswer === 'BENAR' ? 'text-emerald-300 font-extrabold' : 'text-rose-300 font-extrabold'
                      }`}>
                        {q.correctAnswer}
                      </span>
                    </div>
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                  </div>
                </div>

                {/* Pembahasan Singkat */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-1">
                  <span className="font-bold text-amber-300 block text-xs uppercase tracking-wider">
                    💡 Pembahasan Singkat:
                  </span>
                  <p className="leading-relaxed text-slate-200">
                    {q.explanation}
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Back to cover bottom button */}
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={onBackToCover}
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm inline-flex items-center gap-2 shadow-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Halaman Depan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
