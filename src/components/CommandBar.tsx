import React, { useState } from "react";
import { Sparkles, Scale, Target, ArrowRight, Loader2, Link as LinkIcon, Compass, Terminal } from "lucide-react";
import { CommandType } from "../types";

interface CommandBarProps {
  onGenerate: (prompt: string, customTag: string) => Promise<void>;
  isLoading: boolean;
}

export const CommandBar: React.FC<CommandBarProps> = ({ onGenerate, isLoading }) => {
  const [selectedCommand, setSelectedCommand] = useState<CommandType>("/1");
  const [inputText, setInputText] = useState("kem dưỡng thể bao trắng");
  const [customTag, setCustomTag] = useState("affila0110");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const quickSamples: Record<CommandType, { label: string; text: string }[]> = {
    "/1": [
      { label: "Kem dưỡng thể bao trắng", text: "kem dưỡng thể bao trắng" },
      { label: "Son tint bóng học sinh", text: "son tint bóng dưỡng ẩm dưới 150k" },
      { label: "Tai nghe chống ồn giá rẻ", text: "tai nghe bluetooth chống ồn giá rẻ sinh viên" },
      { label: "Nồi chiên không dầu", text: "nồi chiên không dầu dung tích lớn cho gia đình" },
    ],
    "/2": [
      { label: "Olay vs Vaseline vs Nivea", text: "Olay B3, Vaseline Gluta-Hya, Nivea C&E" },
      { label: "Bioderma vs Garnier vs L'Oreal", text: "Bioderma hồng, Garnier nắp hồng, L'Oreal nắp xanh" },
      { label: "Phấn phủ Innisfree vs Eglips", text: "Phấn phủ kiềm dầu Innisfree No-Sebum, Eglips Blur Pact, Perfect Diary" },
    ],
    "/3": [
      { label: "Sữa tắm Lifebuoy Khổ Qua", text: "Sữa tắm Lifebuoy Matcha Khổ Qua" },
      { label: "KCN MartiDerm The Originals", text: "Kem chống nắng MartiDerm The Originals Formula" },
      { label: "Serum The Ordinary Niacinamide", text: "Serum The Ordinary Niacinamide 10% + Zinc 1%" },
    ],
    "auto": [
      { label: "Review body lotion", text: "/1 kem dưỡng thể bao trắng" },
    ],
  };

  const handleCommandSwitch = (cmd: CommandType) => {
    setSelectedCommand(cmd);
    if (cmd === "/1" && !inputText.includes("Olay")) {
      setInputText("kem dưỡng thể bao trắng");
    } else if (cmd === "/2") {
      setInputText("Olay B3, Vaseline Gluta-Hya, Nivea C&E");
    } else if (cmd === "/3") {
      setInputText("Sữa tắm Lifebuoy Matcha Khổ Qua");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    let fullPrompt = inputText.trim();
    if (!fullPrompt.startsWith("/1") && !fullPrompt.startsWith("/2") && !fullPrompt.startsWith("/3")) {
      fullPrompt = `${selectedCommand} ${fullPrompt}`;
    }
    onGenerate(fullPrompt, customTag);
  };

  return (
    <div id="command-studio-bar" className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 sm:p-6 mb-8 backdrop-blur-md shadow-xl shadow-black/40">
      {/* Top Section: Command Cards */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-pink-400" />
            <span>Hệ Thống Phím Tắt (Command Shortcuts)</span>
          </span>

          <button
            id="btn-toggle-affiliate-settings"
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            <LinkIcon className="w-3 h-3 text-pink-400" />
            <span>Mã Sub-ID: <strong className="text-pink-400 font-mono">{customTag || "Mặc định"}</strong></span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Card /1 */}
          <div
            onClick={() => handleCommandSwitch("/1")}
            className={`p-3 rounded-xl cursor-pointer transition-all border ${
              selectedCommand === "/1"
                ? "border-pink-500 bg-pink-500/10 shadow-md shadow-pink-500/10"
                : "bg-slate-800/40 border-slate-700/60 hover:border-pink-500/40 hover:bg-slate-800/70"
            }`}
          >
            <div className="text-pink-400 font-mono text-xs font-bold mb-1 flex items-center justify-between">
              <span>/1 [Chủ đề hoặc ngách]</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="text-[11px] text-slate-300">
              Tự chọn 4–5 món hot (Chân ái / Bình thường / Cân nhắc)
            </div>
          </div>

          {/* Card /2 */}
          <div
            onClick={() => handleCommandSwitch("/2")}
            className={`p-3 rounded-xl cursor-pointer transition-all border ${
              selectedCommand === "/2"
                ? "border-pink-500 bg-pink-500/10 shadow-md shadow-pink-500/10"
                : "bg-slate-800/40 border-slate-700/60 hover:border-pink-500/40 hover:bg-slate-800/70"
            }`}
          >
            <div className="text-pink-400 font-mono text-xs font-bold mb-1 flex items-center justify-between">
              <span>/2 [Danh sách sản phẩm]</span>
              <Scale className="w-3.5 h-3.5" />
            </div>
            <div className="text-[11px] text-slate-300">
              Review so sánh ưu/nhược điểm theo list giao
            </div>
          </div>

          {/* Card /3 */}
          <div
            onClick={() => handleCommandSwitch("/3")}
            className={`p-3 rounded-xl cursor-pointer transition-all border ${
              selectedCommand === "/3"
                ? "border-pink-500 bg-pink-500/10 shadow-md shadow-pink-500/10"
                : "bg-slate-800/40 border-slate-700/60 hover:border-pink-500/40 hover:bg-slate-800/70"
            }`}
          >
            <div className="text-pink-400 font-mono text-xs font-bold mb-1 flex items-center justify-between">
              <span>/3 [Tên 1 sản phẩm duy nhất]</span>
              <Target className="w-3.5 h-3.5" />
            </div>
            <div className="text-[11px] text-slate-300">
              Review chuyên sâu 4 slide (Hook → Texture → Bóc phốt → Chốt)
            </div>
          </div>
        </div>
      </div>

      {showAdvanced && (
        <div className="mb-4 p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center gap-3 animate-in fade-in duration-200">
          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Mã Sub-ID Affiliate Shopee / TikTok Shop của bạn:
            </label>
            <div className="flex items-center gap-2">
              <input
                id="input-affiliate-tag"
                type="text"
                value={customTag}
                onChange={(e) => setCustomTag(e.target.value)}
                placeholder="VD: affila0110 hoặc tracking_campaign_1"
                className="w-full text-xs font-mono px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-100 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
              />
              <span className="text-xs text-slate-400 whitespace-nowrap">
                Link tạo sẽ tự động gắn sub-ID này
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Terminal Input Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="text-pink-400 font-bold">[INPUT]</span>
          <span>&gt; user_prompt</span>
        </div>

        <div className="relative flex items-center">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 font-mono text-sm font-bold text-pink-400 select-none">
            <span>{selectedCommand}</span>
          </div>

          <input
            id="input-command-prompt"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
            placeholder={
              selectedCommand === "/1"
                ? "Nhập chủ đề hoặc ngách (VD: kem dưỡng thể bao trắng, son bóng giá rẻ...)"
                : selectedCommand === "/2"
                ? "Nhập danh sách sản phẩm (VD: Olay B3, Vaseline Gluta-Hya, Nivea C&E...)"
                : "Nhập tên 1 sản phẩm cần bóc trần chuyên sâu (VD: Sữa tắm Lifebuoy Matcha Khổ Qua...)"
            }
            className="w-full pl-12 pr-36 py-3.5 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all font-medium placeholder:text-slate-500 shadow-inner"
          />

          <button
            id="btn-generate-content"
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white font-bold text-xs tracking-wide hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-pink-500/20 transition-all cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Đang tạo...</span>
              </>
            ) : (
              <>
                <span>Tạo Kịch Bản</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-2 pt-1 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-500 flex items-center gap-1 whitespace-nowrap font-mono text-[11px]">
            <Compass className="w-3.5 h-3.5 text-pink-400" />
            Mẫu nhanh:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {quickSamples[selectedCommand]?.map((chip, idx) => (
              <button
                key={idx}
                id={`chip-sample-${selectedCommand.replace("/", "")}-${idx}`}
                type="button"
                onClick={() => {
                  setInputText(chip.text);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 hover:text-pink-400 text-slate-300 transition-colors border border-slate-700/60 font-mono text-[11px] whitespace-nowrap hover:border-pink-500/40"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};
