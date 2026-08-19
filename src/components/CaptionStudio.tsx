import React, { useState } from "react";
import confetti from "canvas-confetti";
import { GeneratedCaption, AffiliateProductLink } from "../types";
import { 
  ExternalLink as ExtIcon, 
  ShoppingBag as BagIcon,
  Search as SearchIcon,
  Flame as FlameIcon,
  Copy as CopyIcon,
  Check as CheckIcon,
  Edit2 as EditIcon,
  CheckCircle2 as CheckCircleIcon,
  Hash as HashIcon,
  Link as ChainIcon,
} from "lucide-react";

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

  const buildCleanCaption = (links?: AffiliateProductLink[]) => {
    const effectiveLinks = links || caption.productLinks || [];
    const linksBlock = effectiveLinks
      .map((l) => `🌱 ${l.name} (${l.verdict || "Chính Hãng"}): ${l.defaultUrl}`)
      .join("\n");
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

  const handleApplyAllShopeeMall = () => {
    const updatedLinks = caption.productLinks.map((link) => {
      const cleanName = link.name.replace(/\(.*?\)/g, "").trim();
      const mallUrl = link.mallSearchUrl || `https://shopee.vn/search?keyword=${encodeURIComponent(cleanName + " chính hãng")}&facet=11035987`;
      return {
        ...link,
        defaultUrl: mallUrl,
      };
    });

    const fullCaption = buildCleanCaption(updatedLinks);
    onUpdateCaption({
      ...caption,
      productLinks: updatedLinks,
      fullFormattedCaption: fullCaption,
    });
    triggerCopyFeedback("applied-mall", "Đã cập nhật tất cả sang link Shopee Mall!");
  };

  const handleApplyAllShopeeSearch = () => {
    const updatedLinks = caption.productLinks.map((link) => {
      const cleanName = link.name.replace(/\(.*?\)/g, "").trim();
      const searchUrl = link.shopeeSearchUrl || `https://shopee.vn/search?keyword=${encodeURIComponent(cleanName + " chính hãng")}`;
      return {
        ...link,
        defaultUrl: searchUrl,
      };
    });

    const fullCaption = buildCleanCaption(updatedLinks);
    onUpdateCaption({
      ...caption,
      productLinks: updatedLinks,
      fullFormattedCaption: fullCaption,
    });
    triggerCopyFeedback("applied-search", "Đã cập nhật link tìm kiếm Shopee!");
  };

  const handleApplyAllShopeeTopSales = () => {
    const updatedLinks = caption.productLinks.map((link) => {
      const cleanName = link.name.replace(/\(.*?\)/g, "").trim();
      const salesUrl = link.topSalesSearchUrl || `https://shopee.vn/search?keyword=${encodeURIComponent(cleanName)}&sortBy=sales`;
      return {
        ...link,
        defaultUrl: salesUrl,
      };
    });

    const fullCaption = buildCleanCaption(updatedLinks);
    onUpdateCaption({
      ...caption,
      productLinks: updatedLinks,
      fullFormattedCaption: fullCaption,
    });
    triggerCopyFeedback("applied-sales", "Đã cập nhật link Shopee Bán Chạy!");
  };

  const handleUpdateFullCaptionText = (text: string) => {
    onUpdateCaption({
      ...caption,
      fullFormattedCaption: text,
    });
  };

  const copyOnlyLinks = () => {
    const links = caption.productLinks?.map((l) => `🌱 ${l.name} (${l.verdict || "Chính hãng"}): ${l.defaultUrl}`).join("\n") || "";
    triggerCopyFeedback("links-only", links);
  };

  const copyOnlyHashtags = () => {
    const tags = caption.hashtags?.join(" ") || "";
    triggerCopyFeedback("hashtags-only", tags);
  };

  const fullCaptionContent = caption.fullFormattedCaption || buildCleanCaption();

  return (
    <div id="caption-studio-container" className="bg-slate-900/60 rounded-2xl border border-slate-800 shadow-xl shadow-black/40 overflow-hidden mb-8 backdrop-blur-md">
      {/* Top Studio Header Bar */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <BagIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span>PHẦN 2: Caption & Link Shopee Chính Hãng (Đã Check Deal)</span>
              <span className="text-[10px] font-mono font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                <BagIcon className="w-2.5 h-2.5" /> Shopee Mall Verified
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Giọng bạn thân gần gũi • Xưng hô t - mấy bà / mn • Link Shopee Mall chính hãng 100%
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
                activeTab === "caption" ? "bg-slate-800 text-orange-400 font-bold border border-slate-700" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Caption TikTok / Shopee
            </button>
            <button
              id="tab-view-markdown"
              onClick={() => setActiveTab("markdown")}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeTab === "markdown" ? "bg-slate-800 text-orange-400 font-bold border border-slate-700" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Kịch Bản Đầy Đủ (Markdown)
            </button>
          </div>

          {/* Primary Big Copy Button */}
          <button
            id="btn-copy-full-caption-header"
            onClick={() => triggerCopyFeedback("all-caption", fullCaptionContent)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 text-white hover:opacity-95 active:scale-95 transition-all shadow-md shadow-orange-500/25 cursor-pointer"
            title="Sao chép toàn bộ nội dung caption (Hook, Story, Link Shopee Mall, CTA, Hashtag)"
          >
            {copiedType === "all-caption" ? (
              <>
                <CheckCircleIcon className="w-4 h-4 text-white" />
                <span>ĐÃ COPY TOÀN BỘ CAPTION!</span>
              </>
            ) : (
              <>
                <CopyIcon className="w-4 h-4" />
                <span>COPY TOÀN BỘ CAPTION</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Shopee Smart Link Preset Bar */}
      <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300 flex-wrap">
          <span className="font-semibold text-orange-400 flex items-center gap-1.5 font-mono text-[11px]">
            <SearchIcon className="w-3.5 h-3.5 text-orange-400" />
            <span>Tùy chọn Link Shopee:</span>
          </span>
          <button
            id="btn-preset-shopee-mall"
            onClick={handleApplyAllShopeeMall}
            className="px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-300 hover:bg-orange-500/20 transition-all font-mono text-[11px] inline-flex items-center gap-1 font-bold shadow-xs cursor-pointer"
            title="Chuyển toàn bộ link sang tìm kiếm Shopee Mall chính hãng"
          >
            <BagIcon className="w-3 h-3 text-orange-400" />
            <span>⚡ Link Shopee Mall Chính Hãng</span>
          </button>
          <button
            id="btn-preset-shopee-sales"
            onClick={handleApplyAllShopeeTopSales}
            className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 transition-all font-mono text-[11px] inline-flex items-center gap-1 cursor-pointer"
            title="Chuyển sang link tìm kiếm Top Bán Chạy / Deal Hot"
          >
            <FlameIcon className="w-3 h-3 text-rose-400" />
            <span>🔥 Link Shopee Bán Chạy</span>
          </button>
          <button
            id="btn-preset-shopee-search"
            onClick={handleApplyAllShopeeSearch}
            className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition-all font-mono text-[11px] inline-flex items-center gap-1 cursor-pointer"
            title="Link tìm kiếm trực tiếp trên Shopee"
          >
            <SearchIcon className="w-3 h-3 text-slate-400" />
            <span>🔍 Link Tìm Kiếm Chuẩn</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="btn-copy-only-links"
            onClick={copyOnlyLinks}
            className="text-[11px] font-mono text-slate-400 hover:text-orange-400 inline-flex items-center gap-1 transition-colors px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer"
            title="Chỉ chép danh sách link Shopee"
          >
            <ChainIcon className="w-3 h-3" />
            <span>{copiedType === "links-only" ? "Đã chép link!" : "Chép Chỉ Link"}</span>
          </button>
          <button
            id="btn-copy-only-hashtags"
            onClick={copyOnlyHashtags}
            className="text-[11px] font-mono text-slate-400 hover:text-orange-400 inline-flex items-center gap-1 transition-colors px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer"
            title="Chỉ chép bộ Hashtag viral"
          >
            <HashIcon className="w-3 h-3" />
            <span>{copiedType === "hashtags-only" ? "Đã chép thẻ!" : "Chép Hashtags"}</span>
          </button>
        </div>
      </div>

      {activeTab === "caption" ? (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span>Nội dung bài viết hoàn chỉnh (Kèm link Shopee Mall chính hãng):</span>
              <span className="text-[10px] text-slate-500 font-normal">
                ({fullCaptionContent.length} ký tự)
              </span>
            </span>
            <div className="flex items-center gap-2">
              <button
                id="btn-toggle-edit-caption-text"
                onClick={() => setIsEditingCaption(!isEditingCaption)}
                className="text-xs text-orange-400 hover:text-orange-300 font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <EditIcon className="w-3 h-3" />
                <span>{isEditingCaption ? "Xem định dạng" : "Chỉnh sửa tự do"}</span>
              </button>
            </div>
          </div>

          {isEditingCaption ? (
            <div className="space-y-3">
              <textarea
                id="textarea-caption-edit"
                value={fullCaptionContent}
                onChange={(e) => handleUpdateFullCaptionText(e.target.value)}
                rows={16}
                className="w-full text-xs sm:text-sm font-mono p-4 rounded-xl border border-slate-700 bg-slate-950 text-slate-100 focus:outline-none focus:ring-1 focus:ring-orange-500 leading-relaxed shadow-inner"
                placeholder="Nhập nội dung caption..."
              />
              <div className="flex justify-end gap-2">
                <button
                  id="btn-copy-edited-caption"
                  onClick={() => triggerCopyFeedback("all-caption", fullCaptionContent)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-xs cursor-pointer"
                >
                  <CopyIcon className="w-3.5 h-3.5" />
                  <span>Copy Toàn Bộ Caption Đã Sửa</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-300 space-y-4 text-xs sm:text-sm leading-relaxed font-mono relative group">
              {/* Float Copy Button in preview */}
              <button
                id="btn-copy-preview-float"
                onClick={() => triggerCopyFeedback("all-caption", fullCaptionContent)}
                className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800/90 hover:bg-orange-500 text-slate-200 hover:text-white border border-slate-700 transition-all shadow-md backdrop-blur-xs cursor-pointer"
                title="Sao chép toàn bộ caption"
              >
                {copiedType === "all-caption" ? (
                  <>
                    <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Đã Copy!</span>
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-3.5 h-3.5" />
                    <span>Copy Toàn Bộ Caption</span>
                  </>
                )}
              </button>

              {/* Hook Line */}
              <div className="font-bold text-white text-sm sm:text-base border-b border-slate-800 pb-3 pr-32">
                {caption.hook}
              </div>

              {/* Intro Story Line */}
              <p className="text-slate-300 italic">
                {caption.intro}
              </p>

              {/* Affiliate Links Block with Shopee Badges */}
              <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-bold text-orange-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <BagIcon className="w-3.5 h-3.5 text-orange-400" />
                    <span>Link Mua Hàng Shopee Mall Chính Hãng Đã Check Deal:</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {caption.productLinks?.length || 0} sản phẩm
                  </span>
                </div>

                <div className="space-y-2">
                  {caption.productLinks?.map((item, idx) => {
                    const searchUrl = item.defaultUrl || item.shopeeSearchUrl || `https://shopee.vn/search?keyword=${encodeURIComponent(item.name + " chính hãng")}`;
                    return (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs py-2 border-b border-slate-800/60 last:border-0 hover:bg-slate-800/30 px-2 rounded-lg transition-colors">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-emerald-400 font-bold">🌱</span>
                          <strong className="text-slate-100">{item.name}</strong>
                          {item.verdict && (
                            <span className="text-[10px] text-pink-300 bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded font-bold">
                              {item.verdict}
                            </span>
                          )}
                          {item.note && (
                            <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                              {item.note}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2.5 shrink-0">
                          <a
                            href={searchUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="text-orange-400 underline hover:text-orange-300 truncate max-w-[280px] inline-flex items-center gap-1 text-[11px] font-mono"
                            title="Bấm để mở và kiểm tra deal thật trên Shopee"
                          >
                            <span>{searchUrl}</span>
                            <ExtIcon className="w-2.5 h-2.5 shrink-0" />
                          </a>
                          <a
                            href={searchUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="px-2.5 py-1 rounded-md bg-orange-500/15 hover:bg-orange-500 text-orange-300 hover:text-white border border-orange-500/30 text-[11px] font-bold inline-flex items-center gap-1 transition-all shadow-xs cursor-pointer"
                            title="Mở tìm kiếm Shopee trong tab mới để check deal & mã giảm giá"
                          >
                            <BagIcon className="w-3 h-3" />
                            <span>Mở Shopee</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <p className="font-semibold text-slate-200">
                {caption.cta}
              </p>

              {/* Hashtags */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800 text-slate-500 font-mono text-[11px]">
                {caption.hashtags?.map((tag, idx) => (
                  <span key={idx} className="text-slate-400 hover:text-orange-400 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Big Bottom Action Bar inside Card */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Link chuẩn Shopee Mall chính hãng, không lỗi font khi đăng bài TikTok / Shopee.</span>
                </span>
                <button
                  id="btn-copy-full-caption-card-bottom"
                  onClick={() => triggerCopyFeedback("all-caption", fullCaptionContent)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40 hover:bg-orange-500 hover:text-white transition-all shadow-xs cursor-pointer shrink-0"
                >
                  <CopyIcon className="w-3.5 h-3.5" />
                  <span>Copy Toàn Bộ Caption</span>
                </button>
              </div>
            </div>
          )}
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
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              {copiedType === "markdown" ? (
                <>
                  <CheckIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Đã sao chép toàn bộ!</span>
                </>
              ) : (
                <>
                  <CopyIcon className="w-3.5 h-3.5" />
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
