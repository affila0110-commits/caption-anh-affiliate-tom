import React from "react";
import { BookOpen, History, Flame, Globe } from "lucide-react";

interface HeaderProps {
  onOpenHandbook: () => void;
  onOpenHistory: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHandbook,
  onOpenHistory,
  historyCount,
}) => {
  return (
    <header id="main-header" className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-pink-500 to-orange-400 rounded-lg flex items-center justify-center font-bold text-white shadow-md shadow-pink-500/20">
            V
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                V-Reviewer AI
              </span>
              <span className="hidden sm:inline-flex items-center text-xs font-semibold text-pink-400 bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/20">
                Expert Mode: Nghề Content
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5 hidden md:flex">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse inline-block"></span>
              <span>Google Search Grounding Live • Gen Z Tone • Khen Thật Chê Thẳng</span>
            </p>
          </div>
        </div>

        {/* Right action indicators */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-2 text-slate-400 text-xs px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/60">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-slate-300 font-medium">System Active</span>
          </div>

          <button
            id="btn-open-handbook"
            onClick={onOpenHandbook}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-colors border border-slate-700/80 hover:border-pink-500/40"
            title="Cẩm nang tư duy Nghề Content"
          >
            <BookOpen className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">Cẩm Nang</span>
          </button>

          <button
            id="btn-open-history"
            onClick={onOpenHistory}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-colors border border-slate-700/80 hover:border-pink-500/40"
            title="Lịch sử các bài đã tạo"
          >
            <History className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Lịch Sử</span>
            {historyCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-pink-500 text-white font-bold">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
