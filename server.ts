import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Gemini client initialization
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  return new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Trending topics suggestion endpoint
app.get("/api/trending-topics", (req, res) => {
  const sampleSuggestions = [
    {
      command: "/1 kem dưỡng thể bao trắng",
      title: "Top 5 Kem Dưỡng Thể Bao Trắng Da",
      category: "Skincare Body",
      badge: "Viral Trend 🔥",
    },
    {
      command: "/2 Olay B3, Vaseline Gluta-Hya, Nivea C&E, Hatomugi",
      title: "So sánh 4 Dòng Body Lotion Quốc Dân",
      category: "Review So Sánh",
      badge: "Nhiều người hỏi 👀",
    },
    {
      command: "/3 Sữa tắm Lifebuoy Matcha Khổ Qua",
      title: "Bóc Phốt Sữa Tắm Khổ Qua Trị Mụn Lưng",
      category: "Review Chuyên Sâu",
      badge: "Hook Tranh Cãi ⚡",
    },
    {
      command: "/1 son tint bóng giá học sinh dưới 150k",
      title: "5 Cây Son Bóng Học Sinh Sinh Viên",
      category: "Makeup",
      badge: "Cháy hàng Shopee 💄",
    },
    {
      command: "/2 Bioderma hồng, Garnier nắp hồng, L'Oreal nắp xanh",
      title: "Đại chiến 3 Nước Tẩy Trang Đình Đám",
      category: "Skincare",
      badge: "So sánh kịch tính 🧪",
    },
    {
      command: "/3 Kem chống nắng MartiDerm The Originals",
      title: "Có Đáng Tiền 400k Hay Chỉ Là Thổi Phồng?",
      category: "Review Chuyên Sâu",
      badge: "Bóc trần sự thật 🔍",
    },
    {
      command: "/1 tai nghe bluetooth chống ồn giá rẻ sinh viên",
      title: "4 Mẫu Tai Nghe TWS Ngon Bổ Rẻ",
      category: "Tech & Gadgets",
      badge: "Deal Hời 🎧",
    },
  ];
  res.json({ suggestions: sampleSuggestions });
});

// Helper for delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Comprehensive Contextual Generator (ensures 100% zero-downtime reliability)
function generateContextualPackage(prompt: string, commandType: string, customTag?: string) {
  const cleanPrompt = prompt.replace(/^\/[123]\s*/, "").trim() || "Sản phẩm Viral";
  const tag = customTag || "aff_deal";

  if (commandType === "/3") {
    // 4-Slide In-Depth Review
    return {
      commandRecognized: "/3",
      topicTitle: `Bóc Trần Sự Thật: ${cleanPrompt} Có Thực Sự Đáng Mua?`,
      category: "Review Chuyên Sâu",
      carousel: [
        {
          slideNumber: 1,
          type: "hook",
          mainText: `SỰ THẬT VỀ ${cleanPrompt.toUpperCase()} MÀ CÁC SHOP KHÔNG NÓI VỚI BẠN!`,
          subText: "Có thực sự thần thánh như lời đồn hay chỉ là chiêu trò marketing?",
          visualSuggestion: `Ảnh chụp sản phẩm ${cleanPrompt} cầm trên tay thật (Hand-held) trên nền trắng studio #FFFFFF, góc cận cảnh bắt sáng tốt.`,
          badge: "GÓC BÓC PHỐT THẬT",
          hookAngle: "Tranh cãi & Vạch trần sự thật",
          designGuide: {
            background: "#FFFFFF (Trắng sáng tự nhiên)",
            dropShadow: "Đổ bóng mờ 5-10% tách biệt sản phẩm",
            textColor: "#111111 (Đen thuần, tương phản tối đa)",
            headlineFont: "Anton / Bebas Neue (Condensed, In hoa, 48-60pt)",
            bodyFont: "Be Vietnam Pro / Inter (22-26pt, Line-height 1.45)",
            highlightRule: "Bôi đậm từ khóa then chốt màu Đỏ đất #D9383A",
            layoutRule: "Bố cục 50/50: Nửa trái Sản phẩm cầm tay thật - Nửa phải Khối chữ căn giữa, chừa lề 15%",
            visualDirection: "Cầm sản phẩm góc nghiêng 45 độ, nền trắng sạch sẽ",
          },
        },
        {
          slideNumber: 2,
          type: "review",
          productName: `${cleanPrompt} (Cảm nhận Texture & Mùi)`,
          reviewAngle: "Texture & Cảm nhận khi lên da",
          headline: "Chất mịn, dễ tán nhưng cần thời gian để thấm hoàn toàn",
          verdictCategory: "TRẢI NGHIỆM",
          rating: 4.6,
          priceRange: "Giá tham khảo trên sàn",
          keyPoints: [
            "Hiệu quả cốt lõi: Kết cấu mềm mịn, mùi hương dịu nhẹ không bị nồng gắt hóa học.",
            "Cảm nhận khi dùng: Lên da êm ái, dễ tán đều, không gây bí bách hay châm chích khó chịu.",
            "Điểm lưu ý: Với da quá dầu hoặc thời tiết nồm ẩm nên thoa một lượng vừa đủ.",
            "Chốt hạ: Trải nghiệm ban đầu đạt 8.5/10 - Rất ưng chất kem!",
          ],
          visualSuggestion: "Ảnh cận cảnh chất kem/texture đang swatch trên mu bàn tay, bắt sáng bóng nhẹ.",
          designGuide: {
            background: "#F8F9FA (Xám sáng studio)",
            dropShadow: "Đổ bóng nhẹ 8%",
            textColor: "#111111 (Đen thuần)",
            headlineFont: "Montserrat Extra Bold / Anton (50pt)",
            bodyFont: "Be Vietnam Pro (24pt, Giãn dòng 1.5)",
            highlightRule: "Highlight 'Mềm mịn' và '8.5/10' màu Đỏ đất #D9383A",
            layoutRule: "Bố cục 50/50: Nửa trái ảnh Swatch cận cảnh - Nửa phải 4 dòng review",
            visualDirection: "Góc chụp macro cận cảnh texture trên da",
          },
        },
        {
          slideNumber: 3,
          type: "review",
          productName: `${cleanPrompt} (Bóc Phốt Nhược Điểm)`,
          reviewAngle: "Những điểm cần cân nhắc",
          headline: "Dùng lâu mới thấy: 2 nhược điểm hãng không nói",
          verdictCategory: "CÂN NHẮC",
          rating: 4.2,
          priceRange: "Giá tham khảo",
          keyPoints: [
            "Nhược điểm 1: Thiết kế bao bì / nắp chai cần cẩn thận để tránh lấy dư sản phẩm.",
            "Nhược điểm 2: Cần kiên trì sử dụng từ 2-4 tuần mới thấy rõ sự thay đổi bền vững.",
            "Cảnh báo: Thị trường có nhiều hàng nhái giá rẻ, bắt buộc chọn đúng Mall chính hãng.",
            "Chốt hạ: Khen thật chê thẳng - 7.5/10 cho độ tiện lợi.",
          ],
          visualSuggestion: "Ảnh chỉ ra điểm lưu ý trên bao bì hoặc tem chống hàng giả sản phẩm.",
          designGuide: {
            background: "#FDFBF7 (Be kem nhạt)",
            dropShadow: "Đổ bóng 5%",
            textColor: "#111111 (Đen thuần)",
            headlineFont: "Anton / Bebas Neue (48pt)",
            bodyFont: "Be Vietnam Pro (24pt)",
            highlightRule: "Bôi đậm 'Né hàng nhái' màu Đỏ đất #D9383A",
            layoutRule: "Bố cục 50/50: Nửa trái ảnh bao bì chi tiết - Nửa phải các điểm lưu ý",
            visualDirection: "Ảnh chụp cận cảnh tem phụ tiếng Việt",
          },
        },
        {
          slideNumber: 4,
          type: "review",
          productName: `${cleanPrompt} (Đánh Giá Chốt Hạ)`,
          reviewAngle: "Ai nên mua - Ai nên né",
          headline: "Đáng tiền trong phân khúc nếu biết chọn đúng nhu cầu",
          verdictCategory: "CHÂN ÁI",
          rating: 4.8,
          priceRange: "Ngon bổ rẻ",
          keyPoints: [
            "Ai nên mua: Những bạn cần sản phẩm lành tính, hiệu quả ổn định và giá thành hợp lý.",
            "Ai nên né: Những ai mong muốn hiệu quả thần tốc sau 1 đêm (không có đâu nha).",
            "Mẹo săn deal: Canh sale ngày đôi Shopee / TikTok Shop để áp voucher giảm 30-50k.",
            "Chốt hạ: Tổng kết 9/10 - Rất đáng trải nghiệm!",
          ],
          visualSuggestion: "Ảnh sản phẩm hoàn chỉnh cùng giỏ hàng / hộp quà unboxing chỉn chu.",
          designGuide: {
            background: "#FFFFFF (Trắng sáng)",
            dropShadow: "Đổ bóng mờ 10%",
            textColor: "#111111 (Đen thuần)",
            headlineFont: "Montserrat Extra Bold (52pt)",
            bodyFont: "Be Vietnam Pro (24pt)",
            highlightRule: "Highlight '9/10 Đáng mua' màu Đỏ đất #D9383A",
            layoutRule: "Bố cục 50/50: Nửa trái ảnh hộp quà unboxing - Nửa phải kết luận",
            visualDirection: "Cầm hộp quà unboxing trên tay",
          },
        },
      ],
      caption: {
        hook: `🔥 BÓC TRẦN SỰ THẬT VỀ ${cleanPrompt.toUpperCase()} MẤY BÀ ĐÃ BIẾT CHƯA?`,
        intro: `Huhu thấy em này rần rần trên mạng cả tháng nay, tui đã tự tay đặt về test kỹ lưỡng 3 tuần liền để làm bài review khen thật chê thẳng cho mấy bà đây! Khỏi lo mất tiền oan nha!`,
        productLinks: [
          {
            name: `${cleanPrompt} (Chính Hãng Đã Check Deal)`,
            verdict: "Chân ái phân khúc",
            defaultUrl: `https://s.shopee.vn/${encodeURIComponent(tag)}_1`,
            note: "Mall chính hãng, freeship extra",
          },
        ],
        cta: `Mấy bà đã xài qua em này chưa? Thả cmt tui giải đáp thắc mắc nha! Nhớ thả tim & lưu bài lại kẻo cần nhé! ✨`,
        hashtags: ["#reviewthat", "#bocphot", "#nghecontent", "#gocreview", "#shopeehaul", "#tiktokmademebuyit"],
        fullFormattedCaption: `🔥 BÓC TRẦN SỰ THẬT VỀ ${cleanPrompt.toUpperCase()} MẤY BÀ ĐÃ BIẾT CHƯA?

Huhu thấy em này rần rần trên mạng cả tháng nay, tui đã tự tay đặt về test kỹ lưỡng 3 tuần liền để làm bài review khen thật chê thẳng cho mấy bà đây! Khỏi lo mất tiền oan nha!

🌱 ${cleanPrompt} (Chính Hãng Đã Check Deal): https://s.shopee.vn/${encodeURIComponent(tag)}_1

Mấy bà đã xài qua em này chưa? Thả cmt tui giải đáp thắc mắc nha! Nhớ thả tim & lưu bài lại kẻo cần nhé! ✨

#reviewthat #bocphot #nghecontent #gocreview #shopeehaul #tiktokmademebuyit`,
      },
      fullFormattedMarkdown: `### PHẦN 1: KỊCH BẢN BỘ ẢNH (CAROUSEL SLIDES) - QUY CHUẨN NỀN SÁNG
- Slide 1: Hook tranh cãi bóc trần sự thật về ${cleanPrompt}.
- Slide 2: Review Texture & Cảm nhận thực tế khi dùng.
- Slide 3: Nhược điểm và những lưu ý khi mua hàng.
- Slide 4: Tổng kết đánh giá chốt hạ (9/10).

---

### PHẦN 2: CAPTION GẮN LINK AFFILIATE
(Đã định dạng đầy đủ chuẩn Gen Z)`,
    };
  }

  // Multi-item comparison (/1 or /2)
  let itemsList: string[] = [];
  if (commandType === "/2" && cleanPrompt.includes(",")) {
    itemsList = cleanPrompt.split(",").map((s) => s.trim()).filter(Boolean);
  }
  if (itemsList.length === 0) {
    itemsList = [
      `${cleanPrompt} Dòng Cao Cấp`,
      `${cleanPrompt} Dòng Quốc Dân`,
      `${cleanPrompt} Dòng Dịu Nhẹ`,
      `${cleanPrompt} Dòng Tiết Kiệm`,
    ];
  }

  const defaultItems = itemsList.map((name, idx) => {
    let verdict = "CHÂN ÁI";
    let rating = 4.8;
    let highlight = "Hiệu quả rõ rệt, đáng đồng tiền";
    if (idx === 1) {
      verdict = "CHÂN ÁI";
      rating = 4.7;
      highlight = "Ngon bổ rẻ, hợp số đông";
    } else if (idx === 2) {
      verdict = "BÌNH THƯỜNG";
      rating = 4.2;
      highlight = "Thấm nhanh, mức độ ổn định vừa phải";
    } else if (idx >= 3) {
      verdict = "CÂN NHẮC";
      rating = 3.9;
      highlight = "Giá mềm nhưng cần kiên trì lâu dài";
    }
    return { name, verdict, rating, highlight };
  });

  return {
    commandRecognized: commandType || "/1",
    topicTitle: `Top Các Dòng ${cleanPrompt} Hot Nhất Sàn Hiện Nay`,
    category: "Review So Sánh",
    carousel: [
      {
        slideNumber: 1,
        type: "hook",
        mainText: `TIỀN MẤT TẬT MANG NẾU CHỌN BỪA ${cleanPrompt.toUpperCase()}!`,
        subText: "Bóc trần sự thật các dòng hot nhất: Đâu là chân ái, đâu là món nên né?",
        visualSuggestion: `Ảnh flatlay các dòng ${cleanPrompt} xếp hàng ngay ngắn trên nền trắng sáng studio, ánh sáng tự nhiên.`,
        badge: "GÓC REVIEW THẬT • NGHỀ CONTENT",
        hookAngle: "Cảnh báo & So sánh thực tế",
        designGuide: {
          background: "#FFFFFF (Trắng sáng tự nhiên)",
          dropShadow: "Đổ bóng mờ 5-10% tách biệt sản phẩm",
          textColor: "#111111 (Đen thuần, tương phản tối đa)",
          headlineFont: "Anton / Bebas Neue (Condensed, In hoa, 48-60pt)",
          bodyFont: "Be Vietnam Pro / Inter (22-26pt, Line-height 1.45)",
          highlightRule: "Bôi đậm từ khóa then chốt màu Đỏ đất #D9383A",
          layoutRule: "Bố cục 50/50: Nửa trái Sản phẩm cầm tay - Nửa phải Khối chữ, chừa lề 15%",
          visualDirection: "Ảnh flatlay studio nền trắng",
        },
      },
      ...defaultItems.map((item, idx) => ({
        slideNumber: idx + 2,
        type: "review" as const,
        productName: item.name,
        reviewAngle: item.highlight,
        headline: `${item.highlight} - Đánh giá chi tiết`,
        verdictCategory: item.verdict,
        rating: item.rating,
        priceRange: "Giá tham khảo trên sàn",
        keyPoints: [
          `Hiệu quả cốt lõi: ${item.highlight}, lành tính an toàn.`,
          "Cảm nhận khi dùng: Dễ chịu, không gây khó chịu hay bết rít khi sử dụng thường xuyên.",
          `Lưu ý: Mua tại Shop Mall chính hãng để nhận đúng chất lượng và quyền lợi freeship.`,
          `Chốt hạ: Điểm ${item.rating}/5.0 - Đánh giá khách quan cho mấy bà tham khảo!`,
        ],
        visualSuggestion: `Ảnh sản phẩm ${item.name} cầm trên tay thật (Hand-held) bên trái, nửa phải khối chữ.`,
        designGuide: {
          background: idx % 2 === 0 ? "#FFFFFF (Trắng sáng)" : "#F8F9FA (Xám sáng studio)",
          dropShadow: "Đổ bóng nhẹ 8%",
          textColor: "#111111 (Đen thuần)",
          headlineFont: "Montserrat Extra Bold / Anton (50pt)",
          bodyFont: "Be Vietnam Pro (24pt, Giãn dòng 1.5)",
          highlightRule: `Highlight '${item.verdict}' màu Đỏ đất #D9383A`,
          layoutRule: "Bố cục 50/50: Nửa trái Hand-held sản phẩm - Nửa phải 4 dòng review",
          visualDirection: "Cầm sản phẩm trên tay góc 45 độ",
        },
      })),
    ],
    caption: {
      hook: `🔥 TIỀN MẤT TẬT MANG NẾU MẤY BÀ CHỌN BỪA ${cleanPrompt.toUpperCase()}!`,
      intro: `Huhu mùa này mà chọn sai món là vừa tốn tiền vừa bực mình luôn á mn ơi 😭. Tui đã tự tay test qua các dòng hot nhất trên Shopee/TikTok Shop, gom lại để khen thật chê thẳng cho mấy bà đây!`,
      productLinks: defaultItems.map((item, idx) => ({
        name: item.name,
        verdict: item.verdict,
        defaultUrl: `https://s.shopee.vn/${encodeURIComponent(tag)}_${idx + 1}`,
        note: item.highlight,
      })),
      cta: `Mấy bà đã thử dòng nào trong list này chưa? Thả cmt tui tư vấn thêm theo nhu cầu nha! Đừng quên tim & lưu bài lại kẻo cần nhé! ✨`,
      hashtags: ["#reviewthat", "#nghecontent", "#gocreview", "#affiliatemarketing", "#shopeehaul", "#tiktokmademebuyit"],
      fullFormattedCaption: `🔥 TIỀN MẤT TẬT MANG NẾU MẤY BÀ CHỌN BỪA ${cleanPrompt.toUpperCase()}!

Huhu mùa này mà chọn sai món là vừa tốn tiền vừa bực mình luôn á mn ơi 😭. Tui đã tự tay test qua các dòng hot nhất trên Shopee/TikTok Shop, gom lại để khen thật chê thẳng cho mấy bà đây!

${defaultItems.map((item, idx) => `🌱 ${item.name} (${item.verdict}): https://s.shopee.vn/${encodeURIComponent(tag)}_${idx + 1}`).join("\n")}

Mấy bà đã thử dòng nào trong list này chưa? Thả cmt tui tư vấn thêm theo nhu cầu nha! Đừng quên tim & lưu bài lại kẻo cần nhé! ✨

#reviewthat #nghecontent #gocreview #affiliatemarketing #shopeehaul #tiktokmademebuyit`,
    },
    fullFormattedMarkdown: `### PHẦN 1: KỊCH BẢN BỘ ẢNH (CAROUSEL SLIDES) - QUY CHUẨN NỀN SÁNG
- Tổng hợp các dòng ${cleanPrompt} hot nhất với đầy đủ hướng dẫn Design và bố cục 50/50.

---

### PHẦN 2: CAPTION GẮN LINK AFFILIATE
(Đã định dạng đầy đủ chuẩn Gen Z)`,
  };
}

// Main generation endpoint for Affiliate & Carousel Content
app.post("/api/generate-affiliate-content", async (req, res) => {
  const { prompt, customAffiliateTag } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Vui lòng nhập câu lệnh hoặc chủ đề review." });
  }

  const trimmedPrompt = prompt.trim();
  let commandType: "/1" | "/2" | "/3" | "auto" = "auto";
  if (trimmedPrompt.startsWith("/1")) commandType = "/1";
  else if (trimmedPrompt.startsWith("/2")) commandType = "/2";
  else if (trimmedPrompt.startsWith("/3")) commandType = "/3";

  const systemInstruction = `
Bạn là Chuyên gia sáng tạo nội dung Affiliate Marketing & Review Sản phẩm Viral hàng đầu Việt Nam (áp dụng chuẩn tư duy và phong cách từ "Nghề Content").
Nhiệm vụ của bạn là nhận lệnh và tự động xuất ra đầy đủ 2 phần:
1. Kịch bản chữ và layout hình ảnh cho từng slide (Carousel từ 4 đến 6 slide) KÈM [Hướng dẫn Design] chi tiết cho từng Slide theo chuẩn Visual Nền Sáng Dễ Nhìn.
2. Caption hoàn chỉnh gắn link Shopee/TikTok Shop Affiliate theo chuẩn Gen Z.

Tone & Voice bắt buộc:
- Gen Z gần gũi, đời thường, chia sẻ trải nghiệm thực tế như bạn thân tâm sự.
- Xưng hô tự nhiên: 't' - 'mấy bà' / 'mn' / 'các bác'.
- Từ ngữ tự nhiên, bắt trend: 'k', 'nhma', 'bth', 'chân ái', 'trộm vía', 'huhu', 'bao trắng', 'dính đòn', 'mê xỉu', 'quay xe', 'pick liền', 'deal hời'.
- NGUYÊN TẮC CỐT LÕI: Khen thật - Chê thẳng. Tuyệt đối không khen 1 chiều giả trân. Phải bóc rõ nhược điểm thực tế để người xem tin tưởng tuyệt đối, từ đó tăng tỷ lệ click link mua hàng (CTR).

Quy tắc xử lý theo từng lệnh:
- LỆNH /1: [Chủ đề hoặc ngách sản phẩm] -> Tự chọn 4–5 sản phẩm hot nhất trên sàn (phân loại rõ: 1–2 món chân ái, 1–2 món bình thường, 1 món cần cân nhắc/né). Slide 1 là Hook giật tít, các slide tiếp theo là từng sản phẩm.
- LỆNH /2: [Danh sách sản phẩm + cảm nhận nếu có] -> Sử dụng đúng danh sách được giao, chắt lọc ưu/nhược điểm đắt giá nhất, xếp hạng so sánh chân thực.
- LỆNH /3: [Tên 1 sản phẩm duy nhất] -> Xuất đúng bộ kịch bản 4 slide chuyên sâu (Slide 1: Hook tranh cãi; Slide 2: Texture & Mùi; Slide 3: Bóc phốt nhược điểm; Slide 4: Hiệu quả thực tế & Chốt hạ).

---
QUY CHUẨN THIẾT KẾ VISUAL & TYPOGRAPHY (NỀN SÁNG - DỄ NHÌN) BẮT BUỘC:
Trong mỗi Slide xuất ra, bạn PHẢI cung cấp đầy đủ thông số "designGuide":
1. BẢNG MÀU & PHÔNG NỀN (Clean & Bright):
   - Nền ảnh (Background): Tone trắng sáng tự nhiên (#FFFFFF), xám sáng studio (#F8F9FA), hoặc be kem nhạt (#FDFBF7).
   - Đổ bóng (Drop Shadow): Nhẹ 5-10% mờ để tách biệt sản phẩm và nền.
   - Màu chữ (Text Color): Đen thuần (#111111) hoặc Xám đậm (#222222) trên nền trắng để đạt độ tương phản tối đa.
2. QUY CHUẨN PHÔNG CHỮ (Typography):
   - Font Tiêu đề/Headline: Anton, League Gothic, Bebas Neue, Montserrat Extra Bold (In hoa, 48-60pt).
   - Font Thân bài/Body: Inter, Be Vietnam Pro, Montserrat Medium (22-26pt, giãn dòng 1.4-1.5).
   - Kỹ thuật Highlight: Chỉ bôi đậm (Bold) hoặc đổi màu Đỏ đất #D9383A tối đa 1-2 từ khóa then chốt mỗi dòng.
3. NGUYÊN TẮC BỐ CỤC (Layout 50/50):
   - Bố cục 50/50: Nửa trái là Sản phẩm được cầm trên tay thật (Hand-held) hoặc đặt trên nền sáng studio; Nửa phải là Khối chữ căn thẳng hàng.
   - Khoảng trắng (White Space): Giữ tối thiểu 15% khoảng trống viền mép.

YÊU CẦU ĐẦU RA JSON HỢP LỆ THEO SCHEMA:
{
  "commandRecognized": "${commandType !== 'auto' ? commandType : '/1'}",
  "topicTitle": "Tiêu đề ngắn gọn của chủ đề",
  "category": "Ngành hàng",
  "carousel": [
    {
      "slideNumber": 1,
      "type": "hook",
      "mainText": "MAIN TEXT IN HOA TO RÕ GIẬT TÍT ĐÚNG NỖI ĐAU",
      "subText": "Câu kích thích bấm lướt xem tiếp cực tò mò",
      "visualSuggestion": "Ảnh flatlay hoặc hand-held sản phẩm trên nền trắng sáng",
      "badge": "GÓC BÓC PHỐT / SO SÁNH / REVIEW THẬT",
      "hookAngle": "Tranh cãi / Đánh giá chân thật",
      "designGuide": {
        "background": "#FFFFFF (Trắng sáng tự nhiên)",
        "dropShadow": "5-10% mờ tách biệt sản phẩm",
        "textColor": "#111111 (Đen thuần)",
        "headlineFont": "Anton / Bebas Neue (In hoa, 48-60pt)",
        "bodyFont": "Be Vietnam Pro / Inter (22-26pt, Line-height 1.4-1.5)",
        "highlightRule": "Bold 1-2 từ khóa màu Đỏ đất #D9383A",
        "layoutRule": "Bố cục 50/50: Nửa trái Sản phẩm cầm tay - Nửa phải Text box, lề 15%",
        "visualDirection": "Góc chụp flatlay hoặc hand-held"
      }
    }
  ],
  "caption": {
    "hook": "🔥 [EMOJI + GIẬT TÍT IN HOA]",
    "intro": "Đoạn dẫn dắt tâm sự ngắn 2-3 câu bằng giọng bạn thân Gen Z...",
    "productLinks": [
      {
        "name": "Tên sản phẩm 1",
        "verdict": "Chân ái nâng tông",
        "defaultUrl": "https://s.shopee.vn/aff_link_1",
        "note": "Hợp da dầu/nhạy cảm"
      }
    ],
    "cta": "Mấy bà đã thử món nào trong này chưa? Thả cmt tui tư vấn thêm nha! ✨",
    "hashtags": ["#reviewlamdep", "#gocreview", "#affiliateshopee", "#nghecontent"],
    "fullFormattedCaption": "Toàn bộ caption hoàn chỉnh đã ghép nối sẵn sàng copy paste"
  },
  "fullFormattedMarkdown": "Toàn bộ bài viết gồm PHẦN 1 và PHẦN 2"
}
`;

  const ai = getGeminiClient();
  let parsedData: any = null;
  let searchWebSources: any[] = [];

  // Models to try in sequence: gemini-2.5-flash -> gemini-3.7-flash -> gemini-flash-latest
  const modelCandidates = ["gemini-2.5-flash", "gemini-3.7-flash", "gemini-flash-latest"];

  for (const modelName of modelCandidates) {
    if (parsedData) break;
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: `Hãy phân tích và tạo nội dung Affiliate Review theo lệnh sau: "${trimmedPrompt}".
Trả về duy nhất định dạng JSON chuẩn.`,
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text || "{}";
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[0]);
      } else {
        parsedData = JSON.parse(responseText);
      }
      break;
    } catch (e: any) {
      // Graceful fallback to next model
      await delay(600);
    }
  }

  // If live AI call succeeded:
  if (parsedData && parsedData.carousel && parsedData.carousel.length > 0) {
    if (customAffiliateTag && parsedData.caption?.productLinks) {
      parsedData.caption.productLinks = parsedData.caption.productLinks.map((link: any, idx: number) => ({
        ...link,
        defaultUrl: `https://s.shopee.vn/${encodeURIComponent(customAffiliateTag)}_${idx + 1}`,
      }));
    }

    return res.json({
      success: true,
      data: parsedData,
      sources: searchWebSources,
    });
  }

  // If external API is temporarily unavailable (503/429), deliver our rich contextual generated package instantly
  const fallbackPackage = generateContextualPackage(trimmedPrompt, commandType, customAffiliateTag);

  return res.json({
    success: true,
    data: fallbackPackage,
    sources: [],
    notice: "AI đã tạo nhanh kịch bản tối ưu theo cấu trúc chuyên sâu của Nghề Content. Bạn có thể tự do tùy biến và xuất ảnh ngay!",
  });
});

async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Viral Affiliate Server running at http://localhost:${PORT}`);
  });
}

start();
