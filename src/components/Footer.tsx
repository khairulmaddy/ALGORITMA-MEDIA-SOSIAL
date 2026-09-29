import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-auto py-6 border-t border-slate-800/80 bg-slate-950/90 text-center relative z-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-1.5">
        <p className="text-sm font-medium tracking-wide text-slate-400 select-none">
          Copywrite by Khairul Maddy
        </p>
        <p className="text-[11px] text-slate-500">
          Modul Asesmen Digital Marketing — Media Sosial & Algoritma
        </p>
      </div>
    </footer>
  );
};
