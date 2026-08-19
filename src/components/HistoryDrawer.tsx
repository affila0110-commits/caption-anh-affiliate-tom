import React from "react";
import { X, Trash2, Clock, ArrowUpRight, Sparkles, Target, Scale } from "lucide-react";
import { GeneratedAffiliatePackage } from "../types";

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: GeneratedAffiliatePackage[];
  onSelectPackage: (pkg: GeneratedAffiliatePackage) => void;
  onDeleteHistoryItem: (id: string) => void;
  onClearAllHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectPackage,
  onDeleteHistoryItem,
  onClearAllHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
      <div 
        id="drawer-history-panel"
        className="bg-slate-900 w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200 border-l border-slate-800 text-slate-200"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-pink-400" />
            <h2 className="text-sm font-bold text-white font-mono">
              Lịch Sử Kịch Bản Đã Tạo ({history.length})
            </h2>
          </div>
          <button
            id="btn-close-history-drawer"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-xs">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
              <p>Chưa có kịch bản nào được lưu.</p>
              <p className="mt-1">Hãy dùng lệnh /1, /2 hoặc /3 để tạo bài review đầu tiên!</p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id || item.topicTitle}
                className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/80 hover:border-pink-500/40 transition-all text-xs group relative"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold font-mono bg-slate-900 text-pink-400 border border-slate-700">
                    {item.commandRecognized === "/1" && <Sparkles className="w-3 h-3 text-pink-400" />}
                    {item.commandRecognized === "/2" && <Scale className="w-3 h-3 text-pink-400" />}
                    {item.commandRecognized === "/3" && <Target className="w-3 h-3 text-pink-400" />}
                    <span>{item.commandRecognized}</span>
                  </span>

                  <span className="text-[10px] text-slate-500 font-mono">
                    {item.createdAt ? new Date(item.createdAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) : "Vừa xong"}
                  </span>
                </div>

                <h4 className="font-bold text-white line-clamp-1 mb-1">
                  {item.topicTitle}
                </h4>

                <p className="text-slate-400 line-clamp-2 text-[11px] mb-3">
                  {item.caption?.hook || item.carousel?.[0]?.mainText}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-[10px] text-slate-500 font-mono">
                    {item.carousel?.length || 0} slide • {item.caption?.productLinks?.length || 0} link
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectPackage(item);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white text-slate-950 font-bold text-[11px] hover:bg-slate-200 transition-colors"
                    >
                      <span>Mở</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>

                    {item.id && (
                      <button
                        type="button"
                        onClick={() => onDeleteHistoryItem(item.id!)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
            <button
              onClick={onClearAllHistory}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
            >
              Xóa tất cả lịch sử
            </button>
            <span className="text-xs text-slate-500 font-mono">
              Lưu tự động trong trình duyệt
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
