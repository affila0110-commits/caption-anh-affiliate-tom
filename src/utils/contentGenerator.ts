import { GeneratedAffiliatePackage, CarouselSlide } from "../types";

export function buildClientShopeeLinks(productName: string, customTag?: string, index: number = 1) {
  const cleanName = productName.replace(/\(.*?\)/g, "").trim() || "Sản phẩm chính hãng";
  const searchKeyword = encodeURIComponent(`${cleanName} chính hãng`);
  const pureKeyword = encodeURIComponent(cleanName);
  const socialKeyword = encodeURIComponent(`${cleanName} review`);

  const shopeeSearchUrl = `https://shopee.vn/search?keyword=${searchKeyword}`;
  const mallSearchUrl = `https://shopee.vn/search?keyword=${pureKeyword}&facet=11035987`;
  const topSalesSearchUrl = `https://shopee.vn/search?keyword=${pureKeyword}&sortBy=sales`;
  const tiktokSearchUrl = `https://www.tiktok.com/search?q=${socialKeyword}`;
  const facebookSearchUrl = `https://www.facebook.com/search/posts?q=${socialKeyword}`;
  const affiliateShortUrl = customTag ? `https://s.shopee.vn/${encodeURIComponent(customTag)}_${index}` : mallSearchUrl;

  const soldK = (35 + index * 18.5).toFixed(1);
  const reviewK = (parseFloat(soldK) * 0.32).toFixed(1);

  return {
    shopeeSearchUrl,
    mallSearchUrl,
    topSalesSearchUrl,
    tiktokSearchUrl,
    facebookSearchUrl,
    defaultUrl: affiliateShortUrl,
    soldCount: `${soldK}k+ đã bán`,
    ratingScore: index % 2 === 0 ? 4.9 : 4.8,
    reviewCount: `${reviewK}k đánh giá`,
    platformBadges: ["Shopee Mall 100%", "TikTok Trending", "Top Bán Chạy"],
    priceEstimate: "Deal hời chính hãng",
  };
}

export function generateClientFallbackPackage(prompt: string, customTag?: string): GeneratedAffiliatePackage {
  const trimmed = prompt.trim();
  let commandType: "/1" | "/2" | "/3" = "/1";
  if (trimmed.startsWith("/2")) commandType = "/2";
  else if (trimmed.startsWith("/3")) commandType = "/3";

  const cleanTopic = trimmed.replace(/^\/[123]\s*/, "").trim() || "Sản Phẩm Hot Trend";

  if (commandType === "/3") {
    const linkData = buildClientShopeeLinks(cleanTopic, customTag, 1);
    const slides: CarouselSlide[] = [
      {
        slideNumber: 1,
        type: "hook",
        mainText: `SỰ THẬT VỀ ${cleanTopic.toUpperCase()} MÀ CÁC SHOP KHÔNG NÓI VỚI BẠN!`,
        subText: "Có thực sự thần thánh như lời đồn hay chỉ là chiêu trò marketing?",
        visualSuggestion: `Ảnh chụp sản phẩm ${cleanTopic} cầm trên tay thật (Hand-held) trên nền trắng studio #FFFFFF, góc cận cảnh bắt sáng tốt.`,
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
        productName: `${cleanTopic} (Texture & Mùi)`,
        reviewAngle: "Trải nghiệm khi sử dụng",
        headline: "Chất mịn dễ tán, mùi nhẹ nhàng không bị nồng",
        verdictCategory: "TRẢI NGHIỆM",
        rating: 4.6,
        priceRange: "Giá tham khảo trên sàn",
        keyPoints: [
          "Hiệu quả cốt lõi: Kết cấu mềm mịn, mùi hương dịu nhẹ không bị nồng gắt hóa học.",
          "Cảm nhận khi dùng: Lên da/dùng êm ái, dễ chịu, không gây khó chịu hay châm chích.",
          "Điểm lưu ý: Nên dùng lượng vừa đủ để đạt hiệu quả tối ưu nhất.",
          "Chốt hạ: Trải nghiệm ban đầu đạt 8.5/10 - Rất ưng ý!",
        ],
        visualSuggestion: "Ảnh cận cảnh chất liệu/texture đang swatch trên tay, bắt sáng bóng nhẹ.",
        designGuide: {
          background: "#F8F9FA (Xám sáng studio)",
          dropShadow: "Đổ bóng nhẹ 8%",
          textColor: "#111111 (Đen thuần)",
          headlineFont: "Montserrat Extra Bold / Anton (50pt)",
          bodyFont: "Be Vietnam Pro (24pt, Giãn dòng 1.5)",
          highlightRule: "Highlight 'Mềm mịn' và '8.5/10' màu Đỏ đất #D9383A",
          layoutRule: "Bố cục 50/50: Nửa trái ảnh Swatch cận cảnh - Nửa phải 4 dòng review",
          visualDirection: "Góc chụp macro cận cảnh texture",
        },
      },
      {
        slideNumber: 3,
        type: "review",
        productName: `${cleanTopic} (Nhược Điểm & Lưu Ý)`,
        reviewAngle: "Những điểm cần cân nhắc",
        headline: "Dùng lâu mới thấy: 2 nhược điểm bạn cần biết trước",
        verdictCategory: "CÂN NHẮC",
        rating: 4.1,
        priceRange: "Giá tham khảo",
        keyPoints: [
          "Nhược điểm 1: Cần kiên trì sử dụng từ 2-4 tuần mới thấy rõ sự thay đổi bền vững.",
          "Nhược điểm 2: Thiết kế nắp/bao bì cần dùng cẩn thận để tránh lấy dư.",
          "Cảnh báo hàng nhái: Thị trường có nhiều hàng giả, bắt buộc chọn đúng Shopee Mall chính hãng.",
          "Chốt hạ: Khen thật chê thẳng - 7.5/10 cho sự tiện lợi.",
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
        productName: `${cleanTopic} (Tổng Kết Đánh Giá)`,
        reviewAngle: "Ai nên mua - Ai nên né",
        headline: "Đáng tiền trong phân khúc nếu chọn đúng Shop Mall",
        verdictCategory: "CHÂN ÁI",
        rating: 4.8,
        priceRange: "Ngon bổ rẻ",
        keyPoints: [
          "Ai nên mua: Những bạn cần sản phẩm lành tính, hiệu quả thực tế và giá hợp lý.",
          "Ai nên né: Ai mong muốn kết quả thần tốc sau 1 đêm (không có đâu nha).",
          "Mẹo săn deal: Canh sale Shopee Mall ngày đôi để áp voucher giảm 30-50k + Freeship.",
          "Chốt hạ: Tổng kết 9.0/10 - Rất đáng tiền để trải nghiệm!",
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
    ];

    const captionText = `🔥 BÓC TRẦN SỰ THẬT VỀ ${cleanTopic.toUpperCase()} MẤY BÀ ĐÃ BIẾT CHƯA?

Huhu thấy em này rần rần trên mạng cả tháng nay, tui đã tự tay đặt về test kỹ lưỡng để làm bài review khen thật chê thẳng cho mấy bà đây! Khỏi lo mất tiền oan nha!

🌱 ${cleanTopic} (Chính Hãng Shopee Mall Đã Check Deal): ${linkData.defaultUrl}

Mấy bà đã xài qua em này chưa? Thả cmt tui giải đáp thắc mắc nha! Nhớ thả tim & lưu bài lại kẻo cần nhé! ✨

#reviewthat #bocphot #nghecontent #gocreview #shopeehaul #affiliatemarketing`;

    return {
      id: `pkg_${Date.now()}`,
      createdAt: new Date().toISOString(),
      commandRecognized: "/3",
      topicTitle: `Bóc Trần Sự Thật: ${cleanTopic} Có Thực Sự Đáng Mua?`,
      category: "Review Chuyên Sâu",
      carousel: slides,
      caption: {
        hook: `🔥 BÓC TRẦN SỰ THẬT VỀ ${cleanTopic.toUpperCase()} MẤY BÀ ĐÃ BIẾT CHƯA?`,
        intro: `Huhu thấy em này rần rần trên mạng cả tháng nay, tui đã tự tay đặt về test kỹ lưỡng để làm bài review khen thật chê thẳng cho mấy bà đây! Khỏi lo mất tiền oan nha!`,
        productLinks: [
          {
            name: `${cleanTopic} (Shopee Mall Đã Check Deal)`,
            verdict: "Chân ái phân khúc",
            defaultUrl: linkData.defaultUrl,
            shopeeSearchUrl: linkData.shopeeSearchUrl,
            mallSearchUrl: linkData.mallSearchUrl,
            topSalesSearchUrl: linkData.topSalesSearchUrl,
            note: "Mall chính hãng, freeship extra",
          },
        ],
        cta: `Mấy bà đã xài qua em này chưa? Thả cmt tui giải đáp thắc mắc nha! Nhớ thả tim & lưu bài lại kẻo cần nhé! ✨`,
        hashtags: ["#reviewthat", "#bocphot", "#nghecontent", "#gocreview", "#shopeehaul", "#affiliatemarketing"],
        fullFormattedCaption: captionText,
      },
      fullFormattedMarkdown: `### PHẦN 1: KỊCH BẢN BỘ ẢNH (CAROUSEL SLIDES) - QUY CHUẨN NỀN SÁNG\n${slides.map((s) => `- Slide ${s.slideNumber}: ${s.mainText || s.headline}`).join("\n")}\n\n---\n\n### PHẦN 2: CAPTION GẮN LINK AFFILIATE\n${captionText}`,
    };
  }

  // Multi item comparison (/1 or /2)
  let items = [
    `${cleanTopic} Bản Cao Cấp`,
    `${cleanTopic} Bản Quốc Dân`,
    `${cleanTopic} Bản Dịu Nhẹ`,
    `${cleanTopic} Bản Tiết Kiệm`,
  ];

  if (commandType === "/2" && cleanTopic.includes(",")) {
    items = cleanTopic.split(",").map((s) => s.trim()).filter(Boolean);
  }

  const defaultItems = items.map((name, idx) => {
    let verdict = "CHÂN ÁI";
    let rating = 4.8;
    let highlight = "Hiệu quả vượt trội, đáng đồng tiền";
    if (idx === 1) {
      verdict = "CHÂN ÁI";
      rating = 4.7;
      highlight = "Ngon bổ rẻ, hợp số đông";
    } else if (idx === 2) {
      verdict = "BÌNH THƯỜNG";
      rating = 4.3;
      highlight = "Dùng ổn, dịu nhẹ lành tính";
    } else if (idx >= 3) {
      verdict = "CÂN NHẮC";
      rating = 3.9;
      highlight = "Giá rẻ nhưng cần kiên trì";
    }
    const links = buildClientShopeeLinks(name, customTag, idx + 1);
    return { name, verdict, rating, highlight, links };
  });

  const slides: CarouselSlide[] = [
    {
      slideNumber: 1,
      type: "hook",
      mainText: `TIỀN MẤT TẬT MANG NẾU CHỌN BỪA ${cleanTopic.toUpperCase()}!`,
      subText: "Bóc trần các dòng hot nhất sàn: Đâu là chân ái, đâu là món nên né?",
      visualSuggestion: `Ảnh flatlay các dòng ${cleanTopic} xếp hàng ngay ngắn trên nền trắng sáng studio, ánh sáng tự nhiên.`,
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
        "Cảm nhận khi dùng: Dễ chịu, không gây bết dính hay khó chịu khi dùng thường xuyên.",
        "Lưu ý: Nên mua tại Shopee Mall chính hãng để đảm bảo nguồn gốc và freeship.",
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
  ];

  const linksBlock = defaultItems
    .map((item) => `🌱 ${item.name} (${item.verdict}): ${item.links.defaultUrl}`)
    .join("\n");

  const fullCaption = `🔥 TIỀN MẤT TẬT MANG NẾU MẤY BÀ CHỌN BỪA ${cleanTopic.toUpperCase()}!

Huhu mùa này mà chọn sai món là vừa tốn tiền vừa bực mình luôn á mn ơi 😭. Tui đã tự tay test qua các dòng hot nhất trên Shopee/TikTok Shop, gom lại để khen thật chê thẳng cho mấy bà đây!

${linksBlock}

Mấy bà đã thử dòng nào trong list này chưa? Thả cmt tui tư vấn thêm theo nhu cầu nha! Đừng quên tim & lưu bài lại kẻo cần nhé! ✨

#reviewthat #nghecontent #gocreview #affiliatemarketing #shopeehaul #tiktokmademebuyit`;

  return {
    id: `pkg_${Date.now()}`,
    createdAt: new Date().toISOString(),
    commandRecognized: commandType,
    topicTitle: `Top Các Dòng ${cleanTopic} Hot Nhất Sàn Hiện Nay`,
    category: "Review So Sánh",
    carousel: slides,
    caption: {
      hook: `🔥 TIỀN MẤT TẬT MANG NẾU MẤY BÀ CHỌN BỪA ${cleanTopic.toUpperCase()}!`,
      intro: `Huhu mùa này mà chọn sai món là vừa tốn tiền vừa bực mình luôn á mn ơi 😭. Tui đã tự tay test qua các dòng hot nhất trên Shopee/TikTok Shop, gom lại để khen thật chê thẳng cho mấy bà đây!`,
      productLinks: defaultItems.map((item) => ({
        name: item.name,
        verdict: item.verdict,
        defaultUrl: item.links.defaultUrl,
        shopeeSearchUrl: item.links.shopeeSearchUrl,
        mallSearchUrl: item.links.mallSearchUrl,
        topSalesSearchUrl: item.links.topSalesSearchUrl,
        note: item.highlight,
      })),
      cta: `Mấy bà đã thử dòng nào trong list này chưa? Thả cmt tui tư vấn thêm theo nhu cầu nha! Đừng quên tim & lưu bài lại kẻo cần nhé! ✨`,
      hashtags: ["#reviewthat", "#nghecontent", "#gocreview", "#affiliatemarketing", "#shopeehaul", "#tiktokmademebuyit"],
      fullFormattedCaption: fullCaption,
    },
    fullFormattedMarkdown: `### PHẦN 1: KỊCH BẢN BỘ ẢNH (CAROUSEL SLIDES) - QUY CHUẨN NỀN SÁNG\n${slides.map((s) => `- Slide ${s.slideNumber}: ${s.mainText || s.headline}`).join("\n")}\n\n---\n\n### PHẦN 2: CAPTION GẮN LINK AFFILIATE\n${fullCaption}`,
  };
}
