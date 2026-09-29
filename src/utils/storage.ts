import * as XLSX from 'xlsx';
import { StudentResult } from '../types';

const STORAGE_KEY_RESULTS = 'digital_onboarding_assessment_results_v1';
const STORAGE_KEY_STUDENT_SESSION = 'digital_onboarding_student_session_v1';
const STORAGE_KEY_ADMIN_AUTH = 'digital_onboarding_admin_auth_v1';
const STORAGE_KEY_ADMIN_PW = 'digital_onboarding_admin_pw_v1';

// Default initial secret (never shown in UI)
const DEFAULT_ADMIN_SECRET = 'admin123';

/**
 * Format elapsed seconds into mm:ss or hh:mm:ss
 */
export function formatDuration(seconds: number): string {
  if (seconds < 0) return '00:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const pad = (num: number) => num.toString().padStart(2, '0');

  if (hrs > 0) {
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }
  return `${pad(mins)}:${pad(secs)}`;
}

/**
 * Format date into Indonesian readable format
 */
export function formatDateIndo(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

/**
 * Get all student results from global local database
 */
export function getSavedResults(): StudentResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RESULTS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading saved results:', e);
    return [];
  }
}

/**
 * Save new student result into global local database and student session
 */
export function saveStudentResult(result: StudentResult): void {
  try {
    const current = getSavedResults();
    // Add to beginning of array so newest shows first
    const updated = [result, ...current.filter((r) => r.id !== result.id)];
    localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(updated));

    // Save as current browser session (1 attempt limit)
    localStorage.setItem(STORAGE_KEY_STUDENT_SESSION, JSON.stringify(result));
  } catch (e) {
    console.error('Error saving student result:', e);
  }
}

/**
 * Check if current student has already completed an exam on this browser
 */
export function getCurrentStudentSession(): StudentResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STUDENT_SESSION);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Clear student session (e.g. allowed by admin or test reset)
 */
export function clearCurrentStudentSession(): void {
  localStorage.removeItem(STORAGE_KEY_STUDENT_SESSION);
}

/**
 * Delete a specific result from database (admin only)
 */
export function deleteResultById(id: string): StudentResult[] {
  try {
    const current = getSavedResults();
    const updated = current.filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(updated));

    // Also check if current student session matches
    const session = getCurrentStudentSession();
    if (session && session.id === id) {
      clearCurrentStudentSession();
    }
    return updated;
  } catch (e) {
    console.error('Error deleting result:', e);
    return getSavedResults();
  }
}

/**
 * Clear all results from database (admin only)
 */
export function clearAllResults(): void {
  localStorage.removeItem(STORAGE_KEY_RESULTS);
  localStorage.removeItem(STORAGE_KEY_STUDENT_SESSION);
}

/**
 * Admin Authentication
 */
export function checkAdminAuth(): boolean {
  return localStorage.getItem(STORAGE_KEY_ADMIN_AUTH) === 'true';
}

export function setAdminAuth(isLoggedIn: boolean): void {
  if (isLoggedIn) {
    localStorage.setItem(STORAGE_KEY_ADMIN_AUTH, 'true');
  } else {
    localStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
  }
}

export function getAdminPassword(): string {
  return localStorage.getItem(STORAGE_KEY_ADMIN_PW) || DEFAULT_ADMIN_SECRET;
}

export function verifyAdminPassword(inputPass: string): boolean {
  const current = getAdminPassword();
  return inputPass === current;
}

export function updateAdminPassword(newPass: string): boolean {
  if (!newPass || newPass.trim().length < 4) return false;
  localStorage.setItem(STORAGE_KEY_ADMIN_PW, newPass.trim());
  return true;
}

/**
 * Export results to official Excel (.xlsx) file
 */
export function exportResultsToExcel(results: StudentResult[]): void {
  if (!results || results.length === 0) {
    alert('Tidak ada data hasil siswa untuk diunduh.');
    return;
  }

  // Build row objects for XLSX
  const rows = results.map((item, index) => {
    const rowObj: Record<string, string | number> = {
      'No.': index + 1,
      'Nama Siswa': item.name,
      'Kelas': item.className,
      'Kode Peserta': item.examCode || '-',
      'Tanggal Pengerjaan': formatDateIndo(item.completedAt),
      'Durasi Pengerjaan': item.durationFormatted,
      'Durasi (Detik)': item.durationSeconds,
      'Jumlah Benar': item.correctCount,
      'Jumlah Salah': item.incorrectCount,
      'Total Soal': item.totalQuestions,
      'Skor Akhir (Skala 100)': item.scoreScale100,
      'Total Poin': item.scorePoints,
      'Status Kelulusan': item.passed ? 'LULUS (>=75)' : 'REMEDIAL (<75)',
    };

    // Add columns for answers 1 to 40
    for (let q = 1; q <= item.totalQuestions; q++) {
      rowObj[`Soal ${q}`] = item.answers[q] || '-';
    }

    return rowObj;
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Auto-fit column widths
  const colWidths = [
    { wch: 6 },  // No
    { wch: 25 }, // Nama Siswa
    { wch: 15 }, // Kelas
    { wch: 16 }, // Kode
    { wch: 22 }, // Tanggal
    { wch: 18 }, // Durasi
    { wch: 14 }, // Detik
    { wch: 14 }, // Benar
    { wch: 14 }, // Salah
    { wch: 12 }, // Total Soal
    { wch: 22 }, // Skor
    { wch: 14 }, // Poin
    { wch: 20 }, // Status
  ];
  // Add width for Q1-Q40
  for (let q = 1; q <= 40; q++) {
    colWidths.push({ wch: 10 });
  }
  worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Rekapitulasi Nilai');

  const todayStr = new Date().toISOString().split('T')[0];
  XLSX.writeFile(workbook, `Rekap_Nilai_Digital_Onboarding_${todayStr}.xlsx`);
}

/**
 * Also export as CSV as convenient secondary export
 */
export function exportResultsToCSV(results: StudentResult[]): void {
  if (!results || results.length === 0) {
    alert('Tidak ada data hasil siswa untuk diunduh.');
    return;
  }

  const headers = [
    'No',
    'Nama Siswa',
    'Kelas',
    'Kode Peserta',
    'Tanggal Pengerjaan',
    'Durasi',
    'Jumlah Benar',
    'Jumlah Salah',
    'Skor (100)',
    'Total Poin',
    'Status'
  ];

  const csvRows = [headers.join(',')];

  results.forEach((item, index) => {
    const row = [
      index + 1,
      `"${item.name.replace(/"/g, '""')}"`,
      `"${item.className.replace(/"/g, '""')}"`,
      `"${(item.examCode || '-').replace(/"/g, '""')}"`,
      `"${formatDateIndo(item.completedAt)}"`,
      `"${item.durationFormatted}"`,
      item.correctCount,
      item.incorrectCount,
      item.scoreScale100,
      item.scorePoints,
      `"${item.passed ? 'LULUS' : 'REMEDIAL'}"`
    ];
    csvRows.push(row.join(','));
  });

  const blob = new Blob(['\uFEFF' + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Rekap_Nilai_Digital_Onboarding_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
