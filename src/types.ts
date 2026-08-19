export type CommandType = "/1" | "/2" | "/3" | "auto";

export type VerdictType = "CHÂN ÁI" | "BÌNH THƯỜNG" | "CÂN NHẮC" | "CHỐT HẠ" | "NÊN THỬ" | "NÉ GẤP";

export interface SlideDesignGuide {
  background: string; // e.g. "#FFFFFF (Trắng sáng)", "#F8F9FA (Xám sáng studio)", "#FDFBF7 (Be kem nhạt)"
  dropShadow: string; // e.g. "5-10% mờ tách biệt sản phẩm"
  textColor: string; // e.g. "#111111 (Đen thuần) / #222222"
  headlineFont: string; // e.g. "Anton / Bebas Neue / Montserrat Extra Bold (Condensed, In hoa, 48-60pt)"
  bodyFont: string; // e.g. "Be Vietnam Pro / Inter / Montserrat Medium (22-26pt, Line-height 1.4-1.5)"
  highlightRule: string; // e.g. "Highlight tối đa 1-2 từ khóa màu Đỏ đất #D9383A hoặc Xanh rêu đậm"
  layoutRule: string; // e.g. "Bố cục 50/50 (Nửa trái sản phẩm trên tay - Nửa phải text box), lề an toàn 15%"
  visualDirection: string; // Chi tiết ảnh chụp/quay
}

export interface CarouselSlide {
  slideNumber: number;
  type: "hook" | "review";
  // Hook Slide properties
  mainText?: string;
  subText?: string;
  badge?: string;
  hookAngle?: string;
  // Review Slide properties
  productName?: string;
  reviewAngle?: string;
  headline?: string;
  verdictCategory?: VerdictType;
  rating?: number;
  priceRange?: string;
  keyPoints?: string[];
  visualSuggestion: string;
  // Quy chuẩn thiết kế Visual & Typography
  designGuide?: SlideDesignGuide;
}

export interface AffiliateProductLink {
  name: string;
  verdict?: string;
  defaultUrl: string;
  note?: string;
}

export interface GeneratedCaption {
  hook: string;
  intro: string;
  productLinks: AffiliateProductLink[];
  cta: string;
  hashtags: string[];
  fullFormattedCaption: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface GeneratedAffiliatePackage {
  commandRecognized: string;
  topicTitle: string;
  category: string;
  carousel: CarouselSlide[];
  caption: GeneratedCaption;
  fullFormattedMarkdown: string;
  sources?: GroundingSource[];
  createdAt?: string;
  id?: string;
}

export type SlideThemeId = 
  | "clean-bright-white"
  | "studio-light-gray"
  | "minimalist-cream"
  | "pastel-peach"
  | "matcha-fresh"
  | "berry-rose"
  | "clean-slate"
  | "dark-luxury";

export interface SlideTheme {
  id: SlideThemeId;
  name: string;
  bgGradient: string;
  cardBg: string;
  textColor: string;
  accentBadge: string;
  borderStyle: string;
  previewColor: string;
}
