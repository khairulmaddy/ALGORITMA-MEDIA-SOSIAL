import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Award, 
  ArrowRight, 
  User, 
  GraduationCap, 
  Key, 
  Share2,
  Video,
  PlaySquare,
  Instagram,
  Twitter,
  Facebook
} from 'lucide-react';
import { StudentResult } from '../types';
import { EXAM_SUBTITLE, EXAM_TITLE, EXAM_TOPIC } from '../data/questions';

interface CoverScreenProps {
  onStartExam: (data: { name: string; className: string; examCode: string }) => void;
  existingResult: StudentResult | null;
  onViewExistingResult: () => void;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({
  onStartExam,
  existingResult,
  onViewExistingResult,
}) => {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [examCode, setExamCode] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setValidationError('Nama Siswa wajib diisi.');
      return;
    }
    if (!className.trim()) {
      setValidationError('Kelas wajib diisi.');
      return;
    }
    setValidationError('');
    onStartExam({
      name: name.trim(),
      className: className.trim(),
      examCode: examCode.trim() || 'REG-DO',
    });
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)] flex flex-col justify-center items-center py-8 px-4 sm:px-6">
      {/* Background ambient lighting glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-4xl mx-auto space-y-8">
        {/* Banner if already taken (1 attempt rule) */}
        {existingResult && (
          <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-indigo-950/60 border border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500/20 text-amber-300 rounded-xl">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-amber-200 text-base sm:text-lg">
                    Asesmen Sudah Pernah Dikerjakan
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Siswa <span className="font-semibold text-white">{existingResult.name}</span> ({existingResult.className}) telah menyelesaikan ujian dengan skor <span className="font-bold text-emerald-400">{existingResult.scoreScale100}/100</span>.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onViewExistingResult}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all"
              >
                <span>Lihat Hasil & Pembahasan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Main Cover Card */}
        <div className="relative rounded-3xl border border-slate-800/80 bg-slate-900/90 shadow-2xl backdrop-blur-xl overflow-hidden">
          {/* Animated decorative top bar */}
          <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 via-pink-500 to-emerald-400 animate-gradient-x" />

          <div className="p-6 sm:p-10 lg:p-12 space-y-8">
            {/* Header Subject Info */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shadow-sm animate-pulse-subtle">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Mata Pelajaran: {EXAM_TITLE}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {EXAM_SUBTITLE}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                {EXAM_TOPIC}
              </p>

              {/* Platform Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-blue-950/60 border border-blue-800/60 text-blue-300">
                  <Facebook className="w-3.5 h-3.5 text-blue-400" /> Facebook
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-pink-950/60 border border-pink-800/60 text-pink-300">
                  <Video className="w-3.5 h-3.5 text-pink-400" /> TikTok
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-slate-800/90 border border-slate-700 text-slate-200">
                  <Twitter className="w-3.5 h-3.5 text-cyan-400" /> Twitter / X
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-fuchsia-950/60 border border-fuchsia-800/60 text-fuchsia-300">
                  <Instagram className="w-3.5 h-3.5 text-fuchsia-400" /> Instagram
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-red-950/60 border border-red-800/60 text-red-300">
                  <PlaySquare className="w-3.5 h-3.5 text-red-400" /> YouTube
                </span>
              </div>
            </div>

            {/* Grid 2 Columns: Petunjuk Pengerjaan & Form Siswa */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 border-t border-slate-800/80">
              
              {/* Petunjuk Pengerjaan (Left Column) */}
              <div className="lg:col-span-6 bg-slate-950/60 border border-slate-800/90 rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Petunjuk Pengerjaan</span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center text-xs">
                      1
                    </span>
                    <p>
                      <strong>Bentuk Soal:</strong> True or False (Benar / Salah) sejumlah <strong>40 butir pernyataan</strong>.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center text-xs">
                      2
                    </span>
                    <p>
                      Bacalah setiap pernyataan dengan teliti sebelum menentukan jawaban.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center text-xs">
                      3
                    </span>
                    <p>
                      Berilah tanda centang pada tombol <span className="font-bold text-emerald-400">BENAR</span> jika pernyataan sesuai fakta, atau <span className="font-bold text-rose-400">SALAH</span> jika pernyataan tidak sesuai.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center text-xs">
                      4
                    </span>
                    <p>
                      Setiap nomor bernilai 10 poin (total 400 poin / dikonversi ke skala 100). Terdapat <strong>Stopwatch</strong> yang menghitung durasi pengerjaan.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs">
                      <strong>Ketentuan:</strong> Setiap siswa hanya berkesempatan mengerjakan asesmen ini sebanyak <strong>1 kali</strong>. Pastikan semua soal terisi sebelum menyelesaikan.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form Isian Siswa (Right Column) */}
              <div className="lg:col-span-6 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-lg space-y-5">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
                    <User className="w-5 h-5 text-indigo-400" />
                    <span>Identitas Peserta Ujian</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Silakan lengkapi data diri Anda sebelum menekan tombol mulai.
                  </p>
                </div>

                {validationError && (
                  <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Nama Siswa */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      Nama Lengkap Siswa <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        disabled={!!existingResult}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Contoh: Muhammad Rizky Pratama"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Form Isian Kelas Kosong (Blank Text Input) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-slate-300">
                        Kelas <span className="text-rose-400">*</span>
                      </label>
                      <span className="text-[11px] text-slate-400">Ketik bebas kelas Anda</span>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        disabled={!!existingResult}
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        placeholder="Contoh: XII Bisnis Digital 1 / X TKJ A"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Kode Peserta / Token */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-slate-300">
                        Kode Peserta / Token Ujian (Opsional)
                      </label>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Key className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        disabled={!!existingResult}
                        value={examCode}
                        onChange={(e) => setExamCode(e.target.value.toUpperCase())}
                        placeholder="Contoh: ONBOARD-2026"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Start Button with animated vibrant gradient */}
                  {existingResult ? (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={onViewExistingResult}
                        className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                      >
                        <span>Lihat Hasil & Kunci Pembahasan</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <p className="text-center text-[11px] text-slate-400 mt-2">
                        Kesempatan ujian untuk browser ini telah digunakan (1x kesempatan).
                      </p>
                    </div>
                  ) : (
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-95 border border-indigo-400/30"
                      >
                        <Clock className="w-4 h-4" />
                        <span>Mulai Asesmen Sekarang</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <p className="text-center text-[11px] text-slate-400 mt-2">
                        Timer stopwatch akan langsung berjalan saat Anda memulai.
                      </p>
                    </div>
                  )}
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
