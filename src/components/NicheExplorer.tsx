import React, { useState } from "react";
import { CURATED_NICHES_DATA, CuratedProduct, NicheCategory } from "../data/curatedNiches";
import { NicheTrendChart } from "./NicheTrendChart";
import { 
  ShoppingBag, 
  Flame, 
  Search, 
  ExternalLink, 
  Sparkles, 
  Star, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  Compass,
  ArrowRight,
  Filter
} from "lucide-react";

interface NicheExplorerProps {
  onSelectProductForReview: (productName: string, command: "/1" | "/3") => void;
  onSelectDirectPrompt?: (prompt: string) => void;
}

export const NicheExplorer: React.FC<NicheExplorerProps> = ({ 
  onSelectProductForReview,
  onSelectDirectPrompt 
}) => {
  const [selectedNicheId, setSelectedNicheId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const currentNiches = CURATED_NICHES_DATA;

  // Filter products based on selected niche and search keyword
  const allProducts: CuratedProduct[] = currentNiches.flatMap((niche) => niche.products);

  const filteredProducts = allProducts.filter((product) => {
    const matchesNiche = selectedNicheId === "all" || product.nicheId === selectedNicheId;
    const matchesQuery = !searchQuery.trim() || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.niche.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.highlight.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesNiche && matchesQuery;
  });

  const handleApplyKeywordPrompt = (prompt: string) => {
    if (onSelectDirectPrompt) {
      onSelectDirectPrompt(prompt);
    } else {
      onSelectProductForReview(prompt.replace(/^\/[123]\s*/, ""), prompt.startsWith("/3") ? "/3" : "/1");
    }
  };

  return (
    <div id="niche-explorer-section" className="bg-slate-900/80 rounded-2xl border border-slate-800 shadow-xl p-4 sm:p-6 mb-8 backdrop-blur-md">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Đã Lọc Lượt Mua & Đánh Giá 4.8★+
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20 inline-flex items-center gap-1">
              <ShoppingBag className="w-3 h-3" /> Shopee • TikTok • Facebook
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-orange-400" />
            <span>KHO SẢN PHẨM & XU HƯỚNG TỪNG NGÁCH AFFILIATE</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Phân tích biểu đồ từ khóa tăng trưởng và chọn lọc sản phẩm theo lượt bán thật, tỷ lệ mua lại trên Shopee Mall, TikTok Shop & Facebook.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="relative min-w-[240px] sm:min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="input-search-niche-products"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên món, thương hiệu..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 font-mono"
          />
        </div>
      </div>

      {/* Niche Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto py-3.5 scrollbar-thin border-b border-slate-800/80 mb-5">
        <button
          id="tab-niche-all"
          onClick={() => setSelectedNicheId("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
            selectedNicheId === "all"
              ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md shadow-orange-500/20 font-bold"
              : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800"
          }`}
        >
          <span>✨ Tất cả ngách ({allProducts.length})</span>
        </button>

        {currentNiches.map((niche) => (
          <button
            key={niche.id}
            id={`tab-niche-${niche.id}`}
            onClick={() => setSelectedNicheId(niche.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedNicheId === niche.id
                ? "bg-orange-500 text-white font-bold shadow-md shadow-orange-500/20"
                : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800"
            }`}
          >
            <span>{niche.icon}</span>
            <span>{niche.name}</span>
            <span className="text-[10px] opacity-70">({niche.products.length})</span>
          </button>
        ))}
      </div>

      {/* Biểu đồ xu hướng từ khóa Recharts cho ngách đã chọn */}
      <NicheTrendChart
        currentNicheId={selectedNicheId}
        onSelectPrompt={handleApplyKeywordPrompt}
      />

      {/* Header cho danh sách sản phẩm */}
      <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800/60">
        <div className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <ShoppingBag className="w-3.5 h-3.5 text-orange-400" />
          <span>Sản phẩm tuyển chọn đạt chuẩn doanh số ({filteredProducts.length})</span>
        </div>
        <span className="text-[11px] text-slate-500 font-mono">
          Bấm nút link để mở xem trang sản phẩm
        </span>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            id={`card-product-${product.id}`}
            className="bg-slate-950/90 rounded-2xl border border-slate-800/90 hover:border-orange-500/40 p-4 transition-all hover:shadow-lg hover:shadow-black/50 flex flex-col justify-between group relative"
          >
            <div>
              {/* Card Header: Badge & Rating */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  {product.badge}
                </span>
                <div className="flex items-center gap-1 text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md text-[11px] font-bold font-mono">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{product.ratingScore}</span>
                </div>
              </div>

              {/* Product Name */}
              <h3 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors line-clamp-2 mb-1.5">
                {product.name}
              </h3>

              {/* Highlights & Price */}
              <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                {product.highlight}
              </p>

              {/* Stats Bar: Sold & Reviews & Repurchase */}
              <div className="grid grid-cols-3 gap-1.5 py-2 px-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 mb-3.5 text-center font-mono">
                <div>
                  <div className="text-[10px] text-slate-500">ĐÃ BÁN</div>
                  <div className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-0.5">
                    <TrendingUp className="w-2.5 h-2.5" />
                    <span>{product.soldCount}</span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">ĐÁNH GIÁ</div>
                  <div className="text-xs font-bold text-slate-200">{product.reviewCount}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">MUA LẠI</div>
                  <div className="text-xs font-bold text-pink-400">{product.repurchaseRate}</div>
                </div>
              </div>
            </div>

            <div>
              {/* Direct Clickable Platform Links */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80 mb-3">
                <div className="text-[10px] font-mono text-slate-400 font-semibold flex items-center justify-between">
                  <span>Mở xem sản phẩm trực tiếp:</span>
                  <span className="text-orange-400 font-bold">{product.priceEstimate}</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
                  {/* Shopee Mall */}
                  <a
                    href={product.mallSearchUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="p-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500 text-orange-300 hover:text-white border border-orange-500/25 transition-all font-bold flex items-center justify-between gap-1 shadow-xs"
                    title="Bấm để mở và xem sản phẩm Shopee Mall chính hãng"
                  >
                    <span className="flex items-center gap-1">
                      <ShoppingBag className="w-3 h-3 text-orange-400" />
                      <span>Shopee Mall</span>
                    </span>
                    <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-70" />
                  </a>

                  {/* Top Bán Chạy */}
                  <a
                    href={product.topSalesSearchUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/25 transition-all font-bold flex items-center justify-between gap-1 shadow-xs"
                    title="Xem gian hàng Top 1 Bán Chạy trên Shopee"
                  >
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-rose-400" />
                      <span>Top Bán Chạy</span>
                    </span>
                    <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-70" />
                  </a>

                  {/* TikTok Review */}
                  <a
                    href={product.tiktokSearchUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-cyan-200 border border-slate-700 transition-all font-bold flex items-center justify-between gap-1"
                    title="Xem video review triệu view & giỏ hàng trên TikTok"
                  >
                    <span className="flex items-center gap-1">
                      <span className="text-[10px]">🎵</span>
                      <span>TikTok Review</span>
                    </span>
                    <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-70" />
                  </a>

                  {/* Facebook Review */}
                  <a
                    href={product.facebookSearchUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-blue-300 hover:text-blue-200 border border-slate-700 transition-all font-bold flex items-center justify-between gap-1"
                    title="Xem thảo luận và feedback trong hội nhóm Facebook"
                  >
                    <span className="flex items-center gap-1">
                      <span className="text-[10px]">💬</span>
                      <span>Facebook Group</span>
                    </span>
                    <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-70" />
                  </a>
                </div>
              </div>

              {/* Instant Script Generator Actions */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                <button
                  id={`btn-gen-3-${product.id}`}
                  onClick={() => onSelectProductForReview(product.name, "/3")}
                  className="w-full py-1.5 px-2 rounded-xl bg-orange-500/20 hover:bg-orange-500 text-orange-300 hover:text-white border border-orange-500/30 text-[11px] font-bold transition-all inline-flex items-center justify-center gap-1 cursor-pointer"
                  title="Tạo bộ kịch bản Carousel 4 Slide chuyên sâu bóc trần ưu nhược điểm"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Tạo Review /3</span>
                </button>

                <button
                  id={`btn-gen-1-${product.id}`}
                  onClick={() => onSelectProductForReview(product.niche, "/1")}
                  className="w-full py-1.5 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-[11px] font-bold transition-all inline-flex items-center justify-center gap-1 cursor-pointer"
                  title="Tạo bộ kịch bản Carousel 5 Slide so sánh toàn ngách"
                >
                  <Layers className="w-3 h-3" />
                  <span>So Sánh Ngách /1</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
