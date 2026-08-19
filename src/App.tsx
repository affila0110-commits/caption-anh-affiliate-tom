import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { CommandBar } from "./components/CommandBar";
import { CarouselStudio } from "./components/CarouselStudio";
import { CaptionStudio } from "./components/CaptionStudio";
import { NghéContentHandbook } from "./components/NghéContentHandbook";
import { HistoryDrawer } from "./components/HistoryDrawer";
import { GeneratedAffiliatePackage, CarouselSlide, GeneratedCaption } from "./types";
import { DEFAULT_SAMPLE_PACKAGE } from "./data/defaultPackage";
import { Globe, AlertCircle, Info, RefreshCw, Sparkles } from "lucide-react";

export default function App() {
  const [currentPackage, setCurrentPackage] = useState<GeneratedAffiliatePackage>(() => {
    const saved = localStorage.getItem("current_affiliate_package");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_SAMPLE_PACKAGE;
      }
    }
    return DEFAULT_SAMPLE_PACKAGE;
  });

  const [history, setHistory] = useState<GeneratedAffiliatePackage[]>(() => {
    const saved = localStorage.getItem("affiliate_history");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [DEFAULT_SAMPLE_PACKAGE];
      }
    }
    return [DEFAULT_SAMPLE_PACKAGE];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [systemNotice, setSystemNotice] = useState<string | null>(null);
  const [lastPrompt, setLastPrompt] = useState<{ prompt: string; tag: string } | null>(null);
  const [isHandbookOpen, setIsHandbookOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("current_affiliate_package", JSON.stringify(currentPackage));
  }, [currentPackage]);

  useEffect(() => {
    localStorage.setItem("affiliate_history", JSON.stringify(history));
  }, [history]);

  const handleGenerate = async (prompt: string, customTag: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSystemNotice(null);
    setLastPrompt({ prompt, tag: customTag });

    try {
      const response = await fetch("/api/generate-affiliate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, customAffiliateTag: customTag }),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        let userFacingError = json.error || "Không thể kết nối đến máy chủ AI.";
        if (typeof userFacingError === "string" && (userFacingError.includes("429") || userFacingError.includes("quota") || userFacingError.includes("RESOURCE_EXHAUSTED"))) {
          userFacingError = "Hệ thống AI tạm thời quá tải hạn ngạch yêu cầu (429 Quota Limit). Vui lòng đợi vài giây và bấm 'Thử Lại'!";
        }
        throw new Error(userFacingError);
      }

      if (json.notice) {
        setSystemNotice(json.notice);
      }

      const generatedData: GeneratedAffiliatePackage = {
        ...json.data,
        sources: json.sources || [],
        createdAt: new Date().toISOString(),
        id: `pkg_${Date.now()}`,
      };

      setCurrentPackage(generatedData);
      setHistory((prev) => [generatedData, ...prev.slice(0, 19)]);
    } catch (err: any) {
      console.error("Generation error:", err);
      let msg = err.message || "Đã xảy ra lỗi khi tạo kịch bản.";
      if (msg.includes("429") || msg.includes("quota") || msg.includes("RESOURCE_EXHAUSTED")) {
        msg = "Hạn ngạch API của Gemini đang bị quá tải tạm thời (429 Rate Limit). Vui lòng chờ 5-10 giây rồi bấm 'Thử Lại' hoặc bấm 'Tải Dữ Liệu Mẫu' để tiếp tục làm việc!";
      }
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetryLastPrompt = () => {
    if (lastPrompt) {
      handleGenerate(lastPrompt.prompt, lastPrompt.tag);
    }
  };

  const handleLoadDefaultSample = () => {
    setCurrentPackage(DEFAULT_SAMPLE_PACKAGE);
    setErrorMessage(null);
    setSystemNotice("Đã tải dữ liệu mẫu Skincare Body hot nhất để bạn tiếp tục trải nghiệm!");
    setTimeout(() => setSystemNotice(null), 5000);
  };

  const handleUpdateSlides = (newSlides: CarouselSlide[]) => {
    setCurrentPackage((prev) => ({
      ...prev,
      carousel: newSlides,
    }));
  };

  const handleUpdateCaption = (newCaption: GeneratedCaption) => {
    setCurrentPackage((prev) => ({
      ...prev,
      caption: newCaption,
    }));
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAllHistory = () => {
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col selection:bg-pink-500/30 selection:text-pink-200">
      {/* Top Main Navigation Header */}
      <Header
        onOpenHandbook={() => setIsHandbookOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Command shortcuts prompt bar */}
        <CommandBar onGenerate={handleGenerate} isLoading={isLoading} />

        {/* Error Alert Box with quick recovery buttons */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-950/50 border border-rose-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-rose-200 animate-in fade-in duration-200 shadow-lg shadow-rose-950/40">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold">{errorMessage}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              {lastPrompt && (
                <button
                  id="btn-retry-prompt"
                  onClick={handleRetryLastPrompt}
                  className="px-3 py-1.5 rounded-xl bg-rose-800 hover:bg-rose-700 text-white font-bold inline-flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Thử Lại</span>
                </button>
              )}
              <button
                id="btn-load-sample-demo"
                onClick={handleLoadDefaultSample}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-200 font-bold inline-flex items-center gap-1 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>Tải Mẫu Demo</span>
              </button>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-rose-400 hover:text-white px-2 py-1"
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        {/* System Notice Box */}
        {systemNotice && (
          <div className="mb-6 p-3.5 rounded-2xl bg-amber-950/40 border border-amber-800/60 flex items-center justify-between gap-3 text-xs text-amber-200 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{systemNotice}</span>
            </div>
            <button
              onClick={() => setSystemNotice(null)}
              className="text-amber-400 hover:underline font-mono"
            >
              Đã hiểu
            </button>
          </div>
        )}

        {/* Google Search Grounding Sources Bar (if available) */}
        {currentPackage.sources && currentPackage.sources.length > 0 && (
          <div className="mb-6 p-3 rounded-xl bg-slate-900/60 border border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-2 text-xs backdrop-blur-md">
            <div className="flex items-center gap-2 text-slate-300">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-slate-200">Dữ liệu thực tế từ Google Search Grounding:</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {currentPackage.sources.slice(0, 3).map((source, sIdx) => (
                <a
                  key={sIdx}
                  href={source.uri}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[11px] text-slate-400 hover:text-pink-400 bg-slate-950 hover:bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-800 transition-colors truncate max-w-[200px] font-mono"
                >
                  {source.title}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Section 1: Kịch bản bộ ảnh (Carousel Studio) */}
        <CarouselStudio
          slides={currentPackage.carousel || []}
          topicTitle={currentPackage.topicTitle || "Kịch bản Carousel"}
          onUpdateSlides={handleUpdateSlides}
        />

        {/* Section 2: Caption gắn link affiliate (Caption Studio) */}
        {currentPackage.caption && (
          <CaptionStudio
            caption={currentPackage.caption}
            fullMarkdown={currentPackage.fullFormattedMarkdown || ""}
            onUpdateCaption={handleUpdateCaption}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/40 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono">
          <p>
            V-Reviewer AI • Expert Mode: <strong>Nghề Content</strong>
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsHandbookOpen(true)}
              className="text-pink-400 hover:text-pink-300 font-semibold"
            >
              Cẩm Nang Lệnh /1, /2, /3
            </button>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Search Grounding Active
            </span>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <NghéContentHandbook
        isOpen={isHandbookOpen}
        onClose={() => setIsHandbookOpen(false)}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectPackage={(pkg) => setCurrentPackage(pkg)}
        onDeleteHistoryItem={handleDeleteHistoryItem}
        onClearAllHistory={handleClearAllHistory}
      />
    </div>
  );
}
