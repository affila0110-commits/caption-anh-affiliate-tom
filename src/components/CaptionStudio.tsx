import React, { useState } from "react";
import { 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  MessageSquare,
  Edit2,
  Share2,
  CheckCircle2,
  Hash,
  Link as LinkIcon
} from "lucide-react";
import confetti from "canvas-confetti";
import { GeneratedCaption } from "../types";

interface CaptionStudioProps {
  caption: GeneratedCaption;
  fullMarkdown: string;
  onUpdateCaption: (newCaption: GeneratedCaption) => void;
}

export const CaptionStudio: React.FC<CaptionStudioProps> = ({
  caption,
  fullMarkdown,
  onUpdateCaption,
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [activeTab, setActiveTab] = useState<"caption" | "markdown">("caption");

  const buildCleanCaption = () => {
    if (caption.fullFormattedCaption) return caption.fullFormattedCaption;
    const linksBlock = caption.productLinks
      ?.map((l) => `🌱 ${l.name}: ${l.defaultUrl}`)
      .join("\n") || "";
    return `${caption.hook}\n\n${caption.intro}\n\n${linksBlock}\n\n${caption.cta}\n\n${caption.hashtags?.join(" ") || ""}`;
  };

  const triggerCopyFeedback = (type: string, textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedType(type);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.8 },
    });
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleUpdateLinkUrl = (index: number, newUrl: string) => {
    const updatedLinks = [...caption.productLinks];
    updatedLinks[index] = {
      ...updatedLinks[index],
      defaultUrl: newUrl,
    };
    const linksBlock = updatedLinks
      .map((l) => `🌱 ${l.name}: ${l.defaultUrl}`)
      .join("\n");

    const fullCaption = `${caption.hook}\n\n${caption.intro}\n\n${linksBlock}\n\n${caption.cta}\n\n${caption.hashtags.join(" ")}`;

    onUpdateCaption({
      ...caption,
      productLinks: updatedLinks,
      fullFormattedCaption: fullCaption,
    });
  };

  const handleUpdateFullCaptionText = (text: string) => {
    onUpdateCaption({
      ...caption,
      fullFormattedCaption: text,
    });
  };

  const copyOnlyLinks = () => {
    const links = caption.productLinks?.map((l) => `🌱 ${l.name}: ${l.defaultUrl}`).join("\n") || "";
    triggerCopyFeedback("links-only", links);
  };

  const copyOnlyHashtags = () => {
    const tags = caption.hashtags?.join(" ") || "";
    triggerCopyFeedback("hashtags-only", tags);
  };

  const fullCaptionContent = buildCleanCaption();

  return (
    <div id="caption-studio-container" className="bg-slate-900/60 rounded-2xl border border-slate-800 shadow-xl shadow-black/40 overflow-hidden mb-8 backdrop-blur-md">
      {/* Top Studio Header Bar */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span>PHẦN 2: Caption Gắn Link Affiliate (Chuẩn Gen Z)</span>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                Sẵn Sàng Dán Social
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Giọng bạn thân gần gũi • Xưng hô t - mấy bà / mn • Khen thật Chê thẳng
            </p>
          </div>
        </div>

        {/* Action Controls & Top Copy Button */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-slate-950 border border-slate-800 p-0.5 rounded-xl text-xs font-semibold">
            <button
              id="tab-view-caption"
              onClick={() => setActiveTab("caption")}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeTab === "caption" ? "bg-slate-800 text-pink-400 font-bold border border-slate-700" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Caption TikTok / Shopee
            </button>
            <button
              id="tab-view-markdown"
              onClick={() => setActiveTab("markdown")}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeTab === "markdown" ? "bg-slate-800 text-pink-400 font-bold border border-slate-700" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Kịch Bản Đầy Đủ (Markdown)
            </button>
          </div>

          {/* Primary Big Copy Button */}
          <button
            id="btn-copy-full-caption-header"
            onClick={() => triggerCopyFeedback("all-caption", fullCaptionContent)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white hover:opacity-95 active:scale-95 transition-all shadow-md shadow-pink-500/25"
            title="Sao chép toàn bộ nội dung caption (Hook, Story, Link Affiliate, CTA, Hashtag)"
          >
            {copiedType === "all-caption" ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>ĐÃ COPY TOÀN BỘ CAPTION!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>COPY TOÀN BỘ CAPTION</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Paste Assistant Banner */}
      <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Share2 className="w-3.5 h-3.5 text-pink-400" />
          <span className="font-medium">Dán nhanh vào:</span>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-pink-300">TikTok Video/Photo</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-orange-300">Shopee Feed</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-blue-300">Facebook / Reels</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-purple-300">Instagram / Threads</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-copy-only-links"
            onClick={copyOnlyLinks}
            className="text-[11px] font-mono text-slate-400 hover:text-pink-400 inline-flex items-center gap-1 transition-colors px-2 py-1 rounded bg-slate-900 border border-slate-800"
            title="Chỉ chép danh sách link Affiliate"
          >
            <LinkIcon className="w-3 h-3" />
            <span>{copiedType === "links-only" ? "Đã chép link!" : "Chép Chỉ Link"}</span>
          </button>
          <button
            id="btn-copy-only-hashtags"
            onClick={copyOnlyHashtags}
            className="text-[11px] font-mono text-slate-400 hover:text-pink-400 inline-flex items-center gap-1 transition-colors px-2 py-1 rounded bg-slate-900 border border-slate-800"
            title="Chỉ chép bộ Hashtag viral"
          >
            <Hash className="w-3 h-3" />
            <span>{copiedType === "hashtags-only" ? "Đã chép thẻ!" : "Chép Hashtags"}</span>
          </button>
        </div>
      </div>

      {activeTab === "caption" ? (
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Live Caption Preview Box */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <span>Nội dung bài viết hoàn chỉnh:</span>
                <span className="text-[10px] text-slate-500 font-normal">
                  ({fullCaptionContent.length} ký tự)
                </span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  id="btn-toggle-edit-caption-text"
                  onClick={() => setIsEditingCaption(!isEditingCaption)}
                  className="text-xs text-pink-400 hover:text-pink-300 font-semibold inline-flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>{isEditingCaption ? "Xem định dạng" : "Chỉnh sửa tự do"}</span>
                </button>
              </div>
            </div>

            {isEditingCaption ? (
              <div className="space-y-2">
                <textarea
                  id="textarea-caption-edit"
                  value={fullCaptionContent}
                  onChange={(e) => handleUpdateFullCaptionText(e.target.value)}
                  rows={14}
                  className="w-full text-xs sm:text-sm font-mono p-4 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 focus:outline-none focus:ring-1 focus:ring-pink-500 leading-relaxed shadow-inner"
                  placeholder="Nhập nội dung caption..."
                />
                <div className="flex justify-end">
                  <button
                    id="btn-copy-edited-caption"
                    onClick={() => triggerCopyFeedback("all-caption", fullCaptionContent)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-pink-500 text-white hover:bg-pink-600 transition-colors shadow-xs"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Toàn Bộ Caption Đã Sửa</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-300 space-y-4 text-xs sm:text-sm leading-relaxed font-mono relative group">
                {/* Float Copy Button in preview */}
                <button
                  id="btn-copy-preview-float"
                  onClick={() => triggerCopyFeedback("all-caption", fullCaptionContent)}
                  className="absolute top-3 right-3 inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800/90 hover:bg-pink-500 text-slate-200 hover:text-white border border-slate-700 transition-all shadow-md backdrop-blur-xs"
                  title="Sao chép toàn bộ caption"
                >
                  {copiedType === "all-caption" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Đã Copy!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Toàn Bộ Caption</span>
                    </>
                  )}
                </button>

                {/* Hook Line */}
                <div className="font-bold text-white text-sm sm:text-base border-b border-slate-800 pb-2.5 pr-28">
                  {caption.hook}
                </div>

                {/* Intro Story Line */}
                <p className="text-slate-300 italic">
                  {caption.intro}
                </p>

                {/* Affiliate Links Block */}
                <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-[11px] font-bold text-pink-400 uppercase tracking-wider font-mono">
                    🔗 Link Mua Hàng Chính Hãng Đã Check Deal:
                  </div>
                  {caption.productLinks?.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs py-1 border-b border-slate-800/60 last:border-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-emerald-400">🌱</span>
                        <strong className="text-slate-100">{item.name}</strong>
                        {item.note && (
                          <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                            {item.note}
                          </span>
                        )}
                      </div>
                      <a
                        href={item.defaultUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-blue-400 underline hover:text-blue-300 truncate max-w-[220px] inline-flex items-center gap-1 text-[11px]"
                      >
                        <span>{item.defaultUrl}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <p className="font-semibold text-slate-200">
                  {caption.cta}
                </p>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800 text-slate-500 font-mono text-[11px]">
                  {caption.hashtags?.map((tag, idx) => (
                    <span key={idx} className="text-slate-400 hover:text-pink-400 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Big Bottom Action Bar inside Card */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    💡 Bấm nút để sao chép chuẩn không lỗi font khi đăng bài.
                  </span>
                  <button
                    id="btn-copy-full-caption-card-bottom"
                    onClick={() => triggerCopyFeedback("all-caption", fullCaptionContent)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/40 hover:bg-pink-500 hover:text-white transition-all shadow-xs"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Toàn Bộ Caption</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Link Manager & Gen Z Slang Toolkit */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Quản Lý Link Affiliate ({caption.productLinks?.length || 0} món)</span>
                <span className="text-[10px] text-pink-400 font-bold bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-500/20">
                  Shopee / TikTok
                </span>
              </h4>

              <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
                {caption.productLinks?.map((link, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200 truncate">
                        {idx + 1}. {link.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => triggerCopyFeedback(`link-${idx}`, link.defaultUrl)}
                        className="text-[11px] font-mono text-pink-400 hover:text-pink-300 font-semibold"
                      >
                        {copiedType === `link-${idx}` ? "Đã chép" : "Chép link"}
                      </button>
                    </div>

                    <input
                      type="text"
                      value={link.defaultUrl}
                      onChange={(e) => handleUpdateLinkUrl(idx, e.target.value)}
                      placeholder="https://s.shopee.vn/..."
                      className="w-full text-xs font-mono px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-950 text-slate-100 focus:outline-none focus:ring-1 focus:ring-pink-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Gen Z Slang Tips */}
            <div className="p-4 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border border-slate-800 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 font-bold text-pink-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gen Z Tone: Khen thật - Chê thẳng</span>
              </div>
              <div className="flex flex-wrap gap-1 text-[11px]">
                {["chân ái", "trộm vía", "bth", "bao trắng", "dính đòn", "mê xỉu", "pick liền", "tiền mất tật mang"].map((word, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700 font-mono text-slate-300">
                    {word}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 italic leading-relaxed">
                "Xưng hô: t - mấy bà / mn. Nhắc nhở check link Bio / cmt để nhận ưu đãi chuẩn sàn."
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Full Markdown Tab */
        <div className="p-4 sm:p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Kịch bản & Caption Đầy Đủ (Định dạng tài liệu Nghề Content):
            </span>
            <button
              id="btn-copy-markdown-text"
              onClick={() => triggerCopyFeedback("markdown", fullMarkdown)}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-slate-200 transition-colors"
            >
              {copiedType === "markdown" ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Đã sao chép toàn bộ!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao Chép Tất Cả Kịch Bản</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs leading-relaxed overflow-x-auto max-h-[500px] border border-slate-800">
            {fullMarkdown}
          </pre>
        </div>
      )}
    </div>
  );
};
