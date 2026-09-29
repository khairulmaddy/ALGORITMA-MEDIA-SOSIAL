import React from 'react';
import { ShieldCheck, Timer, LogOut, CheckCircle2, UserCheck } from 'lucide-react';
import { formatDuration } from '../utils/storage';

interface HeaderProps {
  currentView: 'cover' | 'exam' | 'result' | 'admin';
  studentName?: string;
  classNameVal?: string;
  stopwatchSeconds?: number;
  isAdminLoggedIn: boolean;
  onOpenAdmin: () => void;
  onAdminLogout?: () => void;
  onNavigateHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  studentName,
  classNameVal,
  stopwatchSeconds = 0,
  isAdminLoggedIn,
  onOpenAdmin,
  onAdminLogout,
  onNavigateHome,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-900/85 border-b border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        {/* Logo & Subject Info */}
        <div 
          onClick={onNavigateHome}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
            <span className="text-white font-black text-xl tracking-tighter">DO</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                DIGITAL ONBOARDING
              </h1>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Asesmen Algoritma
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 truncate max-w-[200px] sm:max-w-md">
              Memahami Algoritma Digital Marketing
            </p>
          </div>
        </div>

        {/* Center: Live Stopwatch during exam */}
        {currentView === 'exam' && (
          <div className="flex items-center gap-2 bg-slate-800/90 border border-amber-500/30 px-3.5 py-1.5 rounded-full shadow-inner shadow-black/40 animate-pulse-subtle">
            <Timer className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            <div className="flex flex-col items-center">
              <span className="text-[9px] uppercase tracking-widest text-amber-300/80 font-bold leading-none">
                Stopwatch
              </span>
              <span className="font-mono text-sm sm:text-base font-bold text-amber-300 tracking-wider">
                {formatDuration(stopwatchSeconds)}
              </span>
            </div>
          </div>
        )}

        {/* Right Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Student Badge if logged into exam */}
          {studentName && currentView !== 'cover' && currentView !== 'admin' && (
            <div className="hidden sm:flex items-center gap-2 bg-slate-800/70 border border-slate-700/80 px-3 py-1 rounded-lg text-xs">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <div className="text-left">
                <p className="font-semibold text-slate-200 truncate max-w-[120px]">{studentName}</p>
                {classNameVal && <p className="text-[10px] text-slate-400">{classNameVal}</p>}
              </div>
            </div>
          )}

          {/* Admin Button */}
          {isAdminLoggedIn ? (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onOpenAdmin}
                className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs font-semibold transition-all ${
                  currentView === 'admin'
                    ? 'bg-purple-600 text-white ring-2 ring-purple-400/50'
                    : 'bg-purple-900/40 text-purple-300 hover:bg-purple-800/60 border border-purple-500/30'
                }`}
                title="Buka Dashboard Admin"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin 🔑</span>
              </button>

              <button
                type="button"
                onClick={onAdminLogout}
                className="flex items-center gap-1 px-2.5 py-1.5 sm:py-2 rounded-lg text-xs font-medium text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 transition-all"
                title="Logout Admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs font-semibold text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 shadow-sm hover:border-amber-400/50 transition-all active:scale-95"
              title="Akses Portal Administrator"
            >
              <span>Admin 🔑</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
