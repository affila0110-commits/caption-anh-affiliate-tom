import React, { useState } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Palette, 
  Layers, 
  Camera, 
  Edit3, 
  Sparkles,
  Layout,
  Type,
  Maximize2,
  CheckCircle2,
  Copy,
  Info
} from "lucide-react";
import confetti from "canvas-confetti";
import { CarouselSlide, SlideThemeId } from "../types";
import { SLIDE_THEMES } from "../utils/themePresets";
import { downloadSlideAsImage } from "../utils/exportCanvas";

interface CarouselStudioProps {
  slides: CarouselSlide[];
  topicTitle: string;
  onUpdateSlides: (newSlides: CarouselSlide[]) => void;
}

export const CarouselStudio: React.FC<CarouselStudioProps> = ({
  slides,
  topicTitle,
  onUpdateSlides,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedThemeId, setSelectedThemeId] = useState<SlideThemeId>("clean-bright-white");
  const [aspectRatio, setAspectRatio] = useState<"4:5" | "9:16">("4:5");
  const [layoutMode, setLayoutMode] = useState<"50-50" | "standard">("50-50");
  const [isEditing, setIsEditing] = useState(false);
  const [showDesignGuide, setShowDesignGuide] = useState(true);
  const [copiedGuide, setCopiedGuide] = useState(false);

  const activeSlide = slides[currentSlideIndex] || slides[0];
  const activeTheme = SLIDE_THEMES.find((t) => t.id === selectedThemeId) || SLIDE_THEMES[0];

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const handleDownloadCurrent = () => {
    downloadSlideAsImage(activeSlide, selectedThemeId, aspectRatio, "carousel_slide");
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
    });
  };

  const handleDownloadAll = async () => {
    for (let i = 0; i < slides.length; i++) {
      downloadSlideAsImage(slides[i], selectedThemeId, aspectRatio, `carousel_full_${i + 1}`);
      await new Promise((res) => setTimeout(res, 250));
    }
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.7 },
    });
  };

  const handleCopyDesignGuide = () => {
    const guideText = `[Hướng dẫn Design Slide ${activeSlide.slideNumber} - ${activeSlide.productName || activeSlide.mainText}]
1. BẢNG MÀU & PHÔNG NỀN:
- Nền: ${activeSlide.designGuide?.background || "#FFFFFF (Trắng sáng tự nhiên)"}
- Đổ bóng: ${activeSlide.designGuide?.dropShadow || "Đổ bóng mờ 5-10%"}
- Màu chữ: ${activeSlide.designGuide?.textColor || "#111111 (Đen thuần)"}

2. QUY CHUẨN TYPOGRAPHY:
- Headline Font: ${activeSlide.designGuide?.headlineFont || "Anton / Bebas Neue / Montserrat Extra Bold (In hoa, 48-60pt)"}
- Body Font: ${activeSlide.designGuide?.bodyFont || "Be Vietnam Pro / Inter (22-26pt, line-height 1.4-1.5)"}
- Highlight: ${activeSlide.designGuide?.highlightRule || "Bôi đậm tối đa 1-2 từ khóa then chốt màu Đỏ đất #D9383A"}

3. NGUYÊN TẮC BỐ CỤC:
- ${activeSlide.designGuide?.layoutRule || "Bố cục 50/50: Nửa trái Sản phẩm cầm tay thật (Hand-held) - Nửa phải Khối chữ, chừa mép viền 15%"}
- Gợi ý visual: ${activeSlide.visualSuggestion}`;

    navigator.clipboard.writeText(guideText);
    setCopiedGuide(true);
    setTimeout(() => setCopiedGuide(false), 2000);
  };

  const handleUpdateActiveSlide = (field: keyof CarouselSlide, value: any) => {
    const updated = [...slides];
    updated[currentSlideIndex] = {
      ...updated[currentSlideIndex],
      [field]: value,
    };
    onUpdateSlides(updated);
  };

  const handleUpdateKeyPoint = (pointIdx: number, newText: string) => {
    const updated = [...slides];
    const points = [...(updated[currentSlideIndex].keyPoints || [])];
    points[pointIdx] = newText;
    updated[currentSlideIndex] = {
      ...updated[currentSlideIndex],
      keyPoints: points,
    };
    onUpdateSlides(updated);
  };

  return (
    <div id="carousel-studio-container" className="bg-slate-900/60 rounded-2xl border border-slate-800 shadow-xl shadow-black/40 overflow-hidden mb-8 backdrop-blur-md">
      {/* Top Studio Control Bar */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span>Studio Thiết Kế Slide (Visual & Typography Nền Sáng)</span>
              <span className="text-[11px] font-mono font-bold text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded-full">
                Slide {currentSlideIndex + 1} / {slides.length}
              </span>
            </h3>
            <p className="text-xs text-slate-400 line-clamp-1">{topicTitle}</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Bố cục 50/50 Toggle */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-0.5 rounded-xl text-xs font-semibold">
            <button
              id="btn-layout-50-50"
              onClick={() => setLayoutMode("50-50")}
              className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                layoutMode === "50-50" ? "bg-slate-800 text-pink-400 font-bold border border-slate-700" : "text-slate-400 hover:text-slate-200"
              }`}
              title="Bố cục 50/50: Nửa trái sản phẩm trên tay thật - Nửa phải khối chữ"
            >
              <Layout className="w-3 h-3" />
              <span>Bố cục 50/50</span>
            </button>
            <button
              id="btn-layout-standard"
              onClick={() => setLayoutMode("standard")}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                layoutMode === "standard" ? "bg-slate-800 text-pink-400 font-bold border border-slate-700" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Chuẩn
            </button>
          </div>

          {/* Ratio Selector */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-0.5 rounded-xl text-xs font-semibold">
            <button
              id="btn-ratio-4-5"
              onClick={() => setAspectRatio("4:5")}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                aspectRatio === "4:5" ? "bg-slate-800 text-pink-400 font-bold border border-slate-700" : "text-slate-400 hover:text-slate-200"
              }`}
              title="Tỉ lệ 4:5 chuẩn Instagram/Facebook Carousel"
            >
              4:5 Feed
            </button>
            <button
              id="btn-ratio-9-16"
              onClick={() => setAspectRatio("9:16")}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                aspectRatio === "9:16" ? "bg-slate-800 text-pink-400 font-bold border border-slate-700" : "text-slate-400 hover:text-slate-200"
              }`}
              title="Tỉ lệ 9:16 chuẩn TikTok Photo / Story"
            >
              9:16 Story
            </button>
          </div>

          {/* Edit Toggle */}
          <button
            id="btn-toggle-slide-edit"
            onClick={() => setIsEditing(!isEditing)}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
              isEditing
                ? "bg-pink-500/20 text-pink-300 border-pink-500/50 shadow-xs"
                : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700/80 hover:text-white"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? "Xong Sửa" : "Sửa Chữ"}</span>
          </button>

          {/* Download Buttons */}
          <button
            id="btn-download-current-slide"
            onClick={handleDownloadCurrent}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 hover:text-white transition-colors"
            title="Tải ảnh PNG độ nét cao theo quy chuẩn nền sáng"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải Slide</span>
          </button>

          <button
            id="btn-download-all-slides"
            onClick={handleDownloadAll}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white hover:opacity-90 transition-all shadow-md shadow-pink-500/20"
            title="Tải toàn bộ bộ ảnh Carousel"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Tải Cả Bộ ({slides.length} ảnh)</span>
          </button>
        </div>
      </div>

      {/* Clean & Bright Theme Presets Selector */}
      <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-slate-400 flex items-center gap-1 whitespace-nowrap">
            <Palette className="w-3.5 h-3.5 text-pink-400" />
            Bảng màu Nền Sáng Dễ Nhìn:
          </span>
          <div className="flex items-center gap-1.5">
            {SLIDE_THEMES.map((theme) => (
              <button
                key={theme.id}
                id={`theme-btn-${theme.id}`}
                onClick={() => setSelectedThemeId(theme.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-all border ${
                  selectedThemeId === theme.id
                    ? "bg-slate-800 text-pink-400 border-pink-500/50 shadow-xs font-bold"
                    : "bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-300"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/20 inline-block shadow-xs"
                  style={{ backgroundColor: theme.previewColor }}
                />
                <span>{theme.name}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowDesignGuide(!showDesignGuide)}
          className="text-xs text-slate-400 hover:text-pink-400 inline-flex items-center gap-1 font-mono whitespace-nowrap"
        >
          <Info className="w-3.5 h-3.5 text-pink-400" />
          <span>{showDesignGuide ? "Ẩn Quy Chuẩn Design" : "Hiện Quy Chuẩn Design"}</span>
        </button>
      </div>

      {/* Main Studio Viewport & Design Guide Section */}
      <div className="p-4 sm:p-6 bg-slate-950 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Slide Canvas Mockup */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[540px]">
          {/* Navigation Arrow Left */}
          <button
            id="btn-slide-prev"
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700 shadow-xl flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed z-10 transition-all"
            aria-label="Slide trước"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Navigation Arrow Right */}
          <button
            id="btn-slide-next"
            onClick={handleNext}
            disabled={currentSlideIndex === slides.length - 1}
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700 shadow-xl flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed z-10 transition-all"
            aria-label="Slide tiếp theo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide Visual Card Box - Nền Sáng Dễ Nhìn (#FFFFFF, text #111111) */}
          <div
            id="rendered-slide-preview-card"
            className={`w-full max-w-[430px] rounded-3xl p-6 sm:p-7 bg-white text-[#111111] shadow-[0_12px_40px_rgba(0,0,0,0.18)] border-4 border-stone-200/90 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
              aspectRatio === "4:5" ? "min-h-[520px]" : "min-h-[620px]"
            }`}
          >
            {/* Top Brand Watermark & Safe margin 15% */}
            <div className="flex items-center justify-between mb-3 border-b border-stone-200 pb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#111111] text-white">
                SLIDE {activeSlide.slideNumber}
              </span>
              <span className="text-[11px] font-black tracking-wider text-stone-500 uppercase font-mono">
                V-Reviewer • Nền Sáng Chuẩn
              </span>
            </div>

            {/* Slide Content Rendering */}
            {activeSlide.type === "hook" ? (
              /* HOOK SLIDE LAYOUT */
              <div className="flex-1 flex flex-col justify-center text-center my-auto py-2">
                {activeSlide.badge && (
                  <div className="mb-2.5">
                    <span className="inline-block px-3 py-1 rounded-md text-xs font-black bg-[#D9383A] text-white tracking-wide shadow-xs">
                      {activeSlide.badge}
                    </span>
                  </div>
                )}

                {isEditing ? (
                  <textarea
                    value={activeSlide.mainText || ""}
                    onChange={(e) => handleUpdateActiveSlide("mainText", e.target.value)}
                    className="w-full text-lg font-black text-center p-2 rounded-lg border-2 border-stone-800 bg-stone-50 text-[#111111] mb-2 uppercase leading-snug focus:outline-none"
                    rows={3}
                    placeholder="Main Text giật tít in hoa..."
                  />
                ) : (
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-snug mb-2 text-[#111111] font-sans">
                    {activeSlide.mainText}
                  </h2>
                )}

                <div className="w-16 h-1.5 bg-[#D9383A] mx-auto rounded-full my-2" />

                {isEditing ? (
                  <textarea
                    value={activeSlide.subText || ""}
                    onChange={(e) => handleUpdateActiveSlide("subText", e.target.value)}
                    className="w-full text-xs sm:text-sm font-semibold text-center p-2 rounded-lg border border-stone-400 bg-stone-50 text-stone-800 leading-relaxed focus:outline-none"
                    rows={2}
                    placeholder="Sub text kích thích..."
                  />
                ) : (
                  <p className="text-xs sm:text-sm font-medium text-stone-700 leading-relaxed max-w-xs mx-auto">
                    {activeSlide.subText}
                  </p>
                )}

                {/* Hand-held mockup visual hint */}
                <div className="mt-4 p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-left text-[11px] text-stone-600 space-y-1">
                  <div className="flex items-center gap-1 font-bold text-[#D9383A]">
                    <Camera className="w-3 h-3" />
                    <span>Visual Nền Sáng Studio:</span>
                  </div>
                  <p className="line-clamp-2 italic">{activeSlide.visualSuggestion}</p>
                </div>

                <div className="mt-4 flex items-center justify-center gap-1 text-xs font-bold text-[#D9383A] animate-pulse">
                  <span>VUỐT SANG ĐỂ XEM TIẾP</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ) : (
              /* REVIEW SLIDE LAYOUT - Hỗ trợ Bố Cục 50/50 */
              <div className="flex-1 flex flex-col justify-between py-1">
                {/* Header: Product Name & Verdict */}
                <div className="text-center mb-2">
                  {activeSlide.verdictCategory && (
                    <div className="mb-1">
                      <span
                        className={`inline-block px-3 py-0.5 rounded-full text-xs font-black text-white shadow-xs ${
                          activeSlide.verdictCategory.includes("CHÂN ÁI")
                            ? "bg-[#166534]"
                            : activeSlide.verdictCategory.includes("BÌNH THƯỜNG")
                            ? "bg-[#b45309]"
                            : "bg-[#991b1b]"
                        }`}
                      >
                        {activeSlide.verdictCategory}
                      </span>
                    </div>
                  )}

                  {isEditing ? (
                    <input
                      type="text"
                      value={activeSlide.productName || ""}
                      onChange={(e) => handleUpdateActiveSlide("productName", e.target.value)}
                      className="w-full text-sm font-black text-center p-1.5 rounded border border-stone-400 bg-stone-50 text-[#111111] mb-1"
                    />
                  ) : (
                    <h3 className="text-base sm:text-lg font-black text-[#111111] leading-tight">
                      {activeSlide.productName}
                    </h3>
                  )}

                  {isEditing ? (
                    <input
                      type="text"
                      value={activeSlide.headline || ""}
                      onChange={(e) => handleUpdateActiveSlide("headline", e.target.value)}
                      className="w-full text-xs font-bold text-center p-1 rounded border border-stone-400 bg-stone-50 text-[#D9383A]"
                    />
                  ) : (
                    <p className="text-xs font-bold text-[#D9383A] line-clamp-2 mt-0.5">
                      "{activeSlide.headline}"
                    </p>
                  )}
                </div>

                {/* Main Content: Bố cục 50/50 (Nửa trái: Visual Hand-held / Nửa phải: Review Text) */}
                {layoutMode === "50-50" ? (
                  <div className="grid grid-cols-12 gap-2.5 my-2">
                    {/* Left 5/12: Hand-held photo mockup preview */}
                    <div className="col-span-5 rounded-2xl bg-stone-100 border border-stone-200 p-2.5 flex flex-col justify-between items-center text-center shadow-inner">
                      <div className="w-full aspect-[3/4] bg-white rounded-xl border border-stone-200 flex flex-col items-center justify-center p-2 shadow-xs">
                        <Camera className="w-6 h-6 text-stone-400 mb-1" />
                        <span className="text-[10px] font-black text-stone-700 uppercase leading-tight">
                          [Ảnh Cầm Tay Thật]
                        </span>
                        <span className="text-[9px] text-stone-500 mt-1">Nền sáng #FFFFFF</span>
                      </div>
                      <span className="text-[9px] font-semibold text-stone-500 mt-1 line-clamp-2">
                        Đổ bóng 5-10%
                      </span>
                    </div>

                    {/* Right 7/12: Key Points text box */}
                    <div className="col-span-7 p-3 rounded-2xl bg-stone-50 border border-stone-200 shadow-xs space-y-1.5 text-left">
                      {activeSlide.keyPoints?.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D9383A] mt-1 shrink-0" />
                          {isEditing ? (
                            <input
                              type="text"
                              value={point}
                              onChange={(e) => handleUpdateKeyPoint(pIdx, e.target.value)}
                              className="w-full text-[11px] p-1 rounded border border-stone-300 bg-white"
                            />
                          ) : (
                            <p className="text-[11px] leading-snug text-[#111111]">
                              {point.includes("Hiệu quả") ? (
                                <>
                                  <strong className="font-black text-stone-900">Hiệu quả:</strong>{" "}
                                  {point.replace(/^Hiệu quả cốt lõi:?\s*/i, "")}
                                </>
                              ) : point.includes("Cảm nhận") ? (
                                <>
                                  <strong className="font-black text-stone-900">Cảm nhận:</strong>{" "}
                                  {point.replace(/^Cảm nhận khi dùng:?\s*/i, "")}
                                </>
                              ) : point.includes("Nhược điểm") ? (
                                <>
                                  <strong className="font-black text-[#D9383A]">Nhược điểm:</strong>{" "}
                                  {point.replace(/^Nhược điểm\/Lưu ý:?\s*/i, "")}
                                </>
                              ) : point.includes("Chốt hạ") ? (
                                <>
                                  <strong className="font-black text-emerald-800">Chốt hạ:</strong>{" "}
                                  {point.replace(/^Chốt hạ:?\s*/i, "")}
                                </>
                              ) : (
                                point
                              )}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Standard Stacked Layout */
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 shadow-xs space-y-2 mb-2">
                    {activeSlide.keyPoints?.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-left">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D9383A] mt-1.5 shrink-0" />
                        <p className="text-xs leading-snug text-[#111111]">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bottom Bar: Price & Rating */}
                <div className="flex items-center justify-between text-xs font-black text-stone-800 px-1 border-t border-stone-200 pt-2 mt-1">
                  <span>💰 {activeSlide.priceRange || "Giá học sinh"}</span>
                  <span className="text-[#D9383A]">⭐ {activeSlide.rating || 4.5}/5.0</span>
                </div>
              </div>
            )}

            {/* Bottom Visual Angle Guide */}
            <div className="mt-2 pt-2 border-t border-stone-200 flex items-start gap-1.5 text-[11px] bg-stone-50 p-2 rounded-xl border border-stone-200">
              <Camera className="w-3.5 h-3.5 text-[#D9383A] mt-0.5 shrink-0" />
              <div className="flex-1 text-stone-700">
                <strong className="font-bold text-stone-900">Visual chụp ảnh:</strong>{" "}
                <span>{activeSlide.visualSuggestion}</span>
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex items-center gap-2 mt-5 overflow-x-auto max-w-full p-1">
            {slides.map((s, idx) => (
              <button
                key={idx}
                id={`slide-thumb-${idx}`}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                  currentSlideIndex === idx
                    ? "bg-pink-500 text-white border-pink-400 shadow-md shadow-pink-500/20 scale-105"
                    : "bg-slate-900/80 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <span>Slide {s.slideNumber}</span>
                {s.type === "hook" && <span className="text-[10px] opacity-80 font-normal">(Hook)</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: [Hướng Dẫn Design] Chi Tiết Cho Slide Đang Xem */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 sm:p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4 text-xs font-sans">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">
                  <Type className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-bold text-white uppercase font-mono tracking-wider">
                  [Hướng Dẫn Design] Slide {activeSlide.slideNumber}
                </h4>
              </div>

              <button
                id="btn-copy-design-specs"
                type="button"
                onClick={handleCopyDesignGuide}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-pink-400 hover:text-pink-300 font-semibold px-2 py-1 rounded-lg bg-slate-800 border border-slate-700"
              >
                {copiedGuide ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Đã chép spec!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Chép Thông Số</span>
                  </>
                )}
              </button>
            </div>

            {/* Spec 1: Bảng màu & Phông nền */}
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="font-bold text-pink-400 flex items-center justify-between">
                <span>1. BẢNG MÀU & PHÔNG NỀN (Clean & Bright):</span>
              </div>
              <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                <li>
                  <strong className="text-white">Nền ảnh:</strong>{" "}
                  {activeSlide.designGuide?.background || "Tone trắng sáng tự nhiên (#FFFFFF) hoặc Xám studio (#F8F9FA)"}
                </li>
                <li>
                  <strong className="text-white">Đổ bóng:</strong>{" "}
                  {activeSlide.designGuide?.dropShadow || "Nhẹ 5-10% mờ để tách biệt sản phẩm và nền"}
                </li>
                <li>
                  <strong className="text-white">Màu chữ:</strong>{" "}
                  {activeSlide.designGuide?.textColor || "Đen thuần (#111111) hoặc Xám đậm (#222222) - Tương phản tối đa"}
                </li>
              </ul>
            </div>

            {/* Spec 2: Typography */}
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="font-bold text-pink-400">
                <span>2. QUY CHUẨN PHÔNG CHỮ (Typography):</span>
              </div>
              <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                <li>
                  <strong className="text-white">Font Tiêu đề/Headline:</strong>{" "}
                  {activeSlide.designGuide?.headlineFont || "Anton / Bebas Neue / Montserrat Extra Bold (Condensed, In hoa, 48-60pt)"}
                </li>
                <li>
                  <strong className="text-white">Font Thân bài/Body:</strong>{" "}
                  {activeSlide.designGuide?.bodyFont || "Be Vietnam Pro / Inter (22-26pt, Giãn dòng 1.4-1.5)"}
                </li>
                <li>
                  <strong className="text-white">Kỹ thuật Highlight:</strong>{" "}
                  {activeSlide.designGuide?.highlightRule || "Bôi đậm tối đa 1-2 từ khóa then chốt màu Đỏ đất #D9383A"}
                </li>
              </ul>
            </div>

            {/* Spec 3: Nguyên tắc bố cục */}
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="font-bold text-pink-400">
                <span>3. NGUYÊN TẮC BỐ CỤC (50/50 & Safe Space):</span>
              </div>
              <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                <li>
                  <strong className="text-white">Bố cục 50/50:</strong>{" "}
                  {activeSlide.designGuide?.layoutRule || "Nửa trái: Sản phẩm cầm tay thật (Hand-held) - Nửa phải: Khối chữ căn thẳng hàng"}
                </li>
                <li>
                  <strong className="text-white">Khoảng trắng (White Space):</strong> Giữ tối thiểu 15% viền mép để không bị tràn màn hình điện thoại.
                </li>
                <li>
                  <strong className="text-white">Gợi ý Visual:</strong> {activeSlide.visualSuggestion}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
