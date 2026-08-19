import React from "react";
import { X, BookOpen, Sparkles, Flame, Palette, Type, Layout } from "lucide-react";

interface NghéContentHandbookProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NghéContentHandbook: React.FC<NghéContentHandbookProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        id="modal-nghe-content-handbook"
        className="bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[88vh] overflow-y-auto shadow-2xl border border-slate-800 animate-in fade-in zoom-in-95 duration-200 text-slate-200"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-pink-500 to-orange-400 flex items-center justify-center text-white font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Cẩm Nang Tư Duy & Quy Chuẩn Thiết Kế "Nghề Content"
              </h2>
              <p className="text-xs text-slate-400">
                Bí quyết tạo Carousel Visual Nền Sáng & Caption Viral chuyển đổi cao
              </p>
            </div>
          </div>
          <button
            id="btn-close-handbook"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {/* Section 0: QUY CHUẨN THIẾT KẾ VISUAL & TYPOGRAPHY (NỀN SÁNG - DỄ NHÌN) */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-pink-500/30 space-y-4">
            <div className="flex items-center gap-2 text-pink-400 font-bold text-sm">
              <Palette className="w-4 h-4" />
              <span>QUY CHUẨN THIẾT KẾ VISUAL & TYPOGRAPHY (NỀN SÁNG - DỄ NHÌN)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {/* Box 1: Bảng màu & Phông nền */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="font-bold text-white flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                  <span>1. Bảng Màu & Nền</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  <strong>Nền ảnh:</strong> Trắng sáng tự nhiên (<code className="text-pink-400 font-mono">#FFFFFF</code>), Xám sáng studio (<code className="text-pink-400 font-mono">#F8F9FA</code>), hoặc Be kem nhạt (<code className="text-pink-400 font-mono">#FDFBF7</code>).
                </p>
                <p className="text-slate-400 text-[11px]">
                  <strong>Đổ bóng:</strong> 5-10% mờ tách biệt sản phẩm.
                </p>
                <p className="text-slate-400 text-[11px]">
                  <strong>Màu chữ:</strong> Đen thuần (<code className="text-pink-400 font-mono">#111111</code>) hoặc Xám đậm (<code className="text-pink-400 font-mono">#222222</code>).
                </p>
              </div>

              {/* Box 2: Typography */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="font-bold text-white flex items-center gap-1">
                  <Type className="w-3.5 h-3.5 text-pink-400" />
                  <span>2. Typography Chuẩn</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  <strong>Font Tiêu đề:</strong> Condensed / Sans-serif nét đậm cao hẹp (<em>Anton, League Gothic, Bebas Neue, Montserrat Extra Bold</em>), 48-60pt.
                </p>
                <p className="text-slate-400 text-[11px]">
                  <strong>Font Body:</strong> Sans-serif tròn trịa (<em>Inter, Be Vietnam Pro</em>), 22-26pt, line-height 1.4-1.5.
                </p>
                <p className="text-slate-400 text-[11px]">
                  <strong>Highlight:</strong> Bôi đậm 1-2 từ khóa then chốt màu Đỏ đất <code className="text-pink-400 font-mono">#D9383A</code>.
                </p>
              </div>

              {/* Box 3: Bố cục 50/50 */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                <div className="font-bold text-white flex items-center gap-1">
                  <Layout className="w-3.5 h-3.5 text-pink-400" />
                  <span>3. Bố Cục 50/50</span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  <strong>Nửa trái:</strong> Sản phẩm cầm trên tay thật (Hand-held) hoặc đặt nền sáng.
                </p>
                <p className="text-slate-400 text-[11px]">
                  <strong>Nửa phải:</strong> Khối chữ căn thẳng hàng rõ ràng.
                </p>
                <p className="text-slate-400 text-[11px]">
                  <strong>Khoảng trắng:</strong> Giữ tối thiểu 15% viền mép tránh tràn viền.
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: 3 Lệnh Xử Lý */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-pink-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              1. HỆ THỐNG PHÍM TẮT & 3 LỆNH CHUẨN
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-pink-500/40 transition-colors">
                <div className="font-bold text-white flex items-center gap-1.5 mb-1 font-mono">
                  <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-400 border border-pink-500/30 text-xs">/1</span>
                  <span>Tự Đề Xuất & So Sánh Nhiều Món</span>
                </div>
                <p className="text-slate-400 text-xs">
                  Cú pháp: <code className="font-mono text-pink-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">/1 [Chủ đề]</code>. AI tự chọn 4-5 sản phẩm hot nhất thị trường, phân loại rõ: <strong className="text-slate-200">1-2 món chân ái</strong>, <strong className="text-slate-200">1-2 món bình thường</strong>, <strong className="text-slate-200">1 món cần cân nhắc/né</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-pink-500/40 transition-colors">
                <div className="font-bold text-white flex items-center gap-1.5 mb-1 font-mono">
                  <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-400 border border-pink-500/30 text-xs">/2</span>
                  <span>Review So Sánh Từ Danh Sách Có Sẵn</span>
                </div>
                <p className="text-slate-400 text-xs">
                  Cú pháp: <code className="font-mono text-pink-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">/2 [Danh sách sản phẩm]</code>. Giữ đúng danh sách được giao, chắt lọc ưu/nhược điểm đắt giá nhất.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-pink-500/40 transition-colors">
                <div className="font-bold text-white flex items-center gap-1.5 mb-1 font-mono">
                  <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-400 border border-pink-500/30 text-xs">/3</span>
                  <span>Review Chuyên Sâu 1 Sản Phẩm Duy Nhất (4 Slide Chuẩn)</span>
                </div>
                <p className="text-slate-400 text-xs">
                  Cú pháp: <code className="font-mono text-pink-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">/3 [Tên sản phẩm]</code>. Cấu trúc 4 ảnh: 
                  <strong className="text-slate-200"> Slide 1 (Hook tranh cãi)</strong> → 
                  <strong className="text-slate-200"> Slide 2 (Texture & Mùi)</strong> → 
                  <strong className="text-slate-200"> Slide 3 (Bóc phốt nhược điểm)</strong> → 
                  <strong className="text-slate-200"> Slide 4 (Hiệu quả & Đánh giá chốt hạ)</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Nguyên tắc Khen thật - Chê thẳng */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold text-pink-400 flex items-center gap-2">
              <Flame className="w-4 h-4" />
              2. NGUYÊN TẮC: KHEN THẬT - CHÊ THẲNG
            </h3>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <p className="font-medium text-slate-200">
                Tại sao các bài review "khen lấy khen để" thường không chuyển đổi được link Affiliate?
              </p>
              <ul className="space-y-1.5 list-disc list-inside text-slate-400">
                <li>Khách hàng Gen Z rất nhạy cảm với quảng cáo "giả trân".</li>
                <li>Khi bạn thẳng thắn bóc ra nhược điểm của món bình thường hoặc lưu ý khi dùng món chân ái, mức độ tin cậy (Trust) tăng vọt 300%.</li>
                <li>Người xem thấy bạn review thật lòng sẽ sẵn sàng bấm vào link Shopee/TikTok Shop để ủng hộ hoa hồng.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-200 transition-colors"
          >
            Đã Hiểu & Bắt Đầu Sáng Tạo
          </button>
        </div>
      </div>
    </div>
  );
};
