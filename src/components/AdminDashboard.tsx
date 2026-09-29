import React, { useState } from 'react';
import { 
  Users, 
  Download, 
  FileSpreadsheet, 
  Search, 
  Trash2, 
  RotateCcw, 
  ArrowLeft, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  Lock, 
  Key, 
  SlidersHorizontal,
  FileText,
  Calendar,
  Clock,
  LogOut,
  AlertTriangle,
  X
} from 'lucide-react';
import { Question, StudentResult } from '../types';
import { 
  clearAllResults, 
  clearCurrentStudentSession, 
  deleteResultById, 
  exportResultsToCSV, 
  exportResultsToExcel, 
  formatDateIndo, 
  updateAdminPassword 
} from '../utils/storage';

interface AdminDashboardProps {
  results: StudentResult[];
  questions: Question[];
  onRefreshResults: () => void;
  onLogout: () => void;
  onBackToHome: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  results,
  questions,
  onRefreshResults,
  onLogout,
  onBackToHome,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'lowest' | 'name'>('newest');
  const [selectedStudent, setSelectedStudent] = useState<StudentResult | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showChangePwModal, setShowChangePwModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [pwChangeStatus, setPwChangeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Calculate statistics
  const totalStudents = results.length;
  const averageScore = totalStudents > 0
    ? Math.round(results.reduce((acc, curr) => acc + curr.scoreScale100, 0) / totalStudents)
    : 0;
  const highestScore = totalStudents > 0
    ? Math.max(...results.map((r) => r.scoreScale100))
    : 0;
  const passedStudents = results.filter((r) => r.passed).length;
  const passPercentage = totalStudents > 0
    ? Math.round((passedStudents / totalStudents) * 100)
    : 0;

  // Filter and sort results
  const filteredResults = results
    .filter((r) => {
      const query = searchTerm.toLowerCase();
      return (
        r.name.toLowerCase().includes(query) ||
        r.className.toLowerCase().includes(query) ||
        (r.examCode && r.examCode.toLowerCase().includes(query))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
      }
      if (sortBy === 'highest') {
        return b.scoreScale100 - a.scoreScale100;
      }
      if (sortBy === 'lowest') {
        return a.scoreScale100 - b.scoreScale100;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  const handleDeleteOne = (id: string, name: string) => {
    if (window.confirm(`Hapus hasil asesmen untuk siswa "${name}"?`)) {
      deleteResultById(id);
      onRefreshResults();
    }
  };

  const handleClearAll = () => {
    clearAllResults();
    setShowClearConfirm(false);
    onRefreshResults();
  };

  const handleResetCurrentClient = () => {
    clearCurrentStudentSession();
    alert('Sesi browser berhasil di-reset. Anda dapat menguji pengerjaan asesmen dari awal.');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.trim().length < 4) {
      setPwChangeStatus('error');
      return;
    }
    const success = updateAdminPassword(newPassword.trim());
    if (success) {
      setPwChangeStatus('success');
      setTimeout(() => {
        setShowChangePwModal(false);
        setNewPassword('');
        setPwChangeStatus('idle');
      }, 1500);
    } else {
      setPwChangeStatus('error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Top Navigation & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
              Portal Rekapitulasi Guru / Admin
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dashboard Penilaian Asesmen
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Rekam jejak otomatis asesmen digital marketing media sosial.
          </p>
        </div>

        {/* Action button group */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onBackToHome}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Asesmen</span>
          </button>

          <button
            type="button"
            onClick={() => setShowChangePwModal(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Lock className="w-4 h-4 text-purple-400" />
            <span>Ubah Sandi</span>
          </button>

          <button
            type="button"
            onClick={handleResetCurrentClient}
            className="px-3.5 py-2 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/80 text-indigo-300 border border-indigo-700/50 text-xs font-semibold flex items-center gap-1.5 transition-all"
            title="Reset kesempatan ujian pada browser ini untuk keperluan uji coba siswa"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Sesi Browser</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="px-3.5 py-2 rounded-xl bg-rose-950/50 hover:bg-rose-900/70 text-rose-300 border border-rose-800/50 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Admin</span>
          </button>
        </div>
      </div>

      {/* 4 Analytics Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Siswa */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Siswa
            </span>
            <Users className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-white">{totalStudents}</div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Peserta telah menyelesaikan ujian
          </span>
        </div>

        {/* Rata-Rata Nilai */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Rata-Rata Nilai
            </span>
            <Award className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-purple-300">{averageScore}</div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Skala penilaian 0 - 100
          </span>
        </div>

        {/* Nilai Tertinggi */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Nilai Tertinggi
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">{highestScore}</div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Skor maksimal 100 (400 poin)
          </span>
        </div>

        {/* Tingkat Kelulusan */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Kelulusan (KKM ≥ 75)
            </span>
            <FileSpreadsheet className="w-5 h-5 text-teal-400" />
          </div>
          <div className="text-3xl font-black text-teal-300">{passPercentage}%</div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {passedStudents} dari {totalStudents} siswa lulus
          </span>
        </div>
      </div>

      {/* Main Table & Controls Container */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl p-5 sm:p-7 space-y-6">
        
        {/* Controls: Search, Sort, Export Buttons */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama siswa, kelas, atau kode..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          {/* Sort & Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-700/80 px-3 py-2 rounded-xl text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="newest" className="bg-slate-900 text-white">Waktu Terbaru</option>
                <option value="highest" className="bg-slate-900 text-white">Nilai Tertinggi</option>
                <option value="lowest" className="bg-slate-900 text-white">Nilai Terendah</option>
                <option value="name" className="bg-slate-900 text-white">Nama Siswa (A-Z)</option>
              </select>
            </div>

            {/* DOWNLOAD EXCEL (.XLSX) BUTTON */}
            <button
              type="button"
              onClick={() => exportResultsToExcel(results)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/25 flex items-center gap-2 transition-all active:scale-95"
              title="Unduh seluruh rekapitulasi penilaian dalam file Excel (.xlsx) resmi"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Download Excel (.xlsx)</span>
            </button>

            {/* DOWNLOAD CSV */}
            <button
              type="button"
              onClick={() => exportResultsToCSV(results)}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-all"
              title="Unduh format CSV"
            >
              <Download className="w-4 h-4" />
              <span>CSV</span>
            </button>

            {/* Clear All Data */}
            {results.length > 0 && (
              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                className="px-3 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
                title="Hapus seluruh riwayat asesmen"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Hapus Semua</span>
              </button>
            )}
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/70">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-semibold uppercase text-[11px] tracking-wider">
                <th className="py-3 px-4 text-center w-12">No</th>
                <th className="py-3 px-4">Nama Siswa</th>
                <th className="py-3 px-4">Kelas</th>
                <th className="py-3 px-4">Kode</th>
                <th className="py-3 px-4">Waktu Penyelesaian</th>
                <th className="py-3 px-4 text-center">Durasi</th>
                <th className="py-3 px-4 text-center">Benar / Salah</th>
                <th className="py-3 px-4 text-center">Skor (100)</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredResults.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FileText className="w-8 h-8 text-slate-600" />
                      <p className="font-medium">Belum ada data pengerjaan siswa.</p>
                      <p className="text-xs text-slate-600">
                        Hasil asesmen akan otomatis tercatat setiap kali siswa menekan kumpulkan.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredResults.map((item, idx) => (
                  <tr 
                    key={item.id} 
                    className="hover:bg-slate-900/50 transition-colors text-slate-200"
                  >
                    <td className="py-3.5 px-4 text-center font-mono text-slate-400 font-bold">
                      {idx + 1}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-xs">
                        {item.className}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-amber-300/90 whitespace-nowrap">
                      {item.examCode || '-'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap text-xs">
                      {formatDateIndo(item.completedAt)}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-amber-300 font-bold whitespace-nowrap">
                      {item.durationFormatted}
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="text-emerald-400 font-bold">{item.correctCount}</span>
                      <span className="text-slate-500 mx-1">/</span>
                      <span className="text-rose-400 font-bold">{item.incorrectCount}</span>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="font-extrabold text-base text-white">
                        {item.scoreScale100}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-normal">
                        {item.scorePoints} poin
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      {item.passed ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          LULUS
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                          REMEDIAL
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedStudent(item)}
                          className="px-2.5 py-1 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1 transition-all"
                          title="Lihat Rincian Jawaban Soal 1-40"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Detail</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteOne(item.id, item.name)}
                          className="p-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900 text-rose-300 transition-colors"
                          title="Hapus baris data ini"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 pt-2">
          <span>Menampilkan <strong>{filteredResults.length}</strong> data hasil siswa.</span>
          <span>Seluruh rekapitulasi tersimpan di basis data lokal komputer ini.</span>
        </div>

      </div>

      {/* Modal Detail Jawaban Siswa */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">
                    Lembar Jawaban Siswa: {selectedStudent.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-xs bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                    {selectedStudent.className}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Skor: <strong className="text-emerald-400">{selectedStudent.scoreScale100}/100</strong> • Benar: {selectedStudent.correctCount} • Salah: {selectedStudent.incorrectCount} • Durasi: {selectedStudent.durationFormatted}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Questions list */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {questions.map((q) => {
                const sAns = selectedStudent.answers[q.id];
                const isCorrect = sAns === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border ${
                      isCorrect
                        ? 'border-emerald-500/30 bg-emerald-950/20'
                        : 'border-rose-500/30 bg-rose-950/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                          #{q.id}
                        </span>
                        <span className={`text-xs font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isCorrect ? '✓ Benar (+10)' : '✗ Salah (0)'}
                        </span>
                      </div>
                      <div className="text-xs">
                        <span className="text-slate-400">Jawaban Siswa: </span>
                        <strong className={`font-black ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {sAns || 'Kosong'}
                        </strong>
                        <span className="text-slate-500 mx-2">|</span>
                        <span className="text-slate-400">Kunci: </span>
                        <strong className="text-white">{q.correctAnswer}</strong>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 mb-2">
                      "{q.question}"
                    </p>

                    <p className="text-[11px] text-slate-400 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                      💡 <strong>Pembahasan:</strong> {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all"
              >
                Tutup Lembar Jawaban
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Modal Ubah Password Admin */}
      {showChangePwModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-base flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-400" />
                <span>Ubah Kata Sandi Admin</span>
              </h4>
              <button
                type="button"
                onClick={() => setShowChangePwModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {pwChangeStatus === 'success' && (
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Kata sandi admin berhasil diperbarui!</span>
              </div>
            )}

            {pwChangeStatus === 'error' && (
              <div className="p-3 rounded-xl bg-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Kata sandi minimal 4 karakter.</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Kata Sandi Baru
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Ketik kata sandi baru..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowChangePwModal(false)}
                  className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/30"
                >
                  Simpan Sandi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal Hapus Semua */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-rose-800/80 shadow-2xl p-6 space-y-4">
            <div className="p-3 w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h4 className="font-bold text-white text-base">Hapus Semua Data Siswa?</h4>
              <p className="text-xs text-slate-400">
                Tindakan ini akan menghapus seluruh data hasil penilaian siswa dari sistem. Data tidak dapat dipulihkan.
              </p>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30"
              >
                Ya, Hapus Semua
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
