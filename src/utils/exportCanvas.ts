import { CarouselSlide, SlideThemeId } from "../types";

export function renderSlideToCanvas(
  slide: CarouselSlide,
  themeId: SlideThemeId,
  aspectRatio: "4:5" | "9:16" = "4:5"
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const width = 1080;
  const height = aspectRatio === "4:5" ? 1350 : 1920;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  // Clean & Bright default parameters
  let bgStart = "#ffffff";
  let bgEnd = "#ffffff";
  let textColor = "#111111"; // Deep black contrast
  let secondaryTextColor = "#333333";
  let accentColor = "#D9383A"; // Đỏ đất highlight
  let accentTextColor = "#ffffff";
  let cardBg = "#ffffff";
  let borderColor = "#e5e7eb";

  if (themeId === "studio-light-gray") {
    bgStart = "#f8f9fa";
    bgEnd = "#f1f3f5";
    textColor = "#111111";
    secondaryTextColor = "#495057";
    accentColor = "#D9383A";
    cardBg = "#ffffff";
    borderColor = "#dee2e6";
  } else if (themeId === "minimalist-cream") {
    bgStart = "#fdfbf7";
    bgEnd = "#f9f5ec";
    textColor = "#111111";
    secondaryTextColor = "#44403c";
    accentColor = "#1b4332";
    cardBg = "#ffffff";
    borderColor = "#e7e5e4";
  } else if (themeId === "pastel-peach") {
    bgStart = "#fff5f0";
    bgEnd = "#ffede5";
    textColor = "#111111";
    secondaryTextColor = "#57534e";
    accentColor = "#ea580c";
    cardBg = "#ffffff";
    borderColor = "#fed7aa";
  } else if (themeId === "matcha-fresh") {
    bgStart = "#f4f9f4";
    bgEnd = "#eaf3ea";
    textColor = "#111111";
    secondaryTextColor = "#1e3a2f";
    accentColor = "#166534";
    cardBg = "#ffffff";
    borderColor = "#bbf7d0";
  } else if (themeId === "dark-luxury") {
    bgStart = "#0f172a";
    bgEnd = "#020617";
    textColor = "#f8fafc";
    secondaryTextColor = "#94a3b8";
    accentColor = "#ec4899";
    accentTextColor = "#ffffff";
    cardBg = "#1e293b";
    borderColor = "#334155";
  }

  // 1. Draw Clean & Bright background
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, bgStart);
  gradient.addColorStop(1, bgEnd);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // 2. Safe margin boundary (15% white space padding)
  const marginX = 90; // ~15% safe edge
  const marginY = 80;
  const contentWidth = width - marginX * 2;

  // Header slide badge
  ctx.fillStyle = accentColor;
  roundRect(ctx, marginX, marginY, 200, 48, 12, true, false);
  ctx.fillStyle = accentTextColor;
  ctx.font = "bold 22px 'Anton', 'Bebas Neue', 'Montserrat', system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`SLIDE ${slide.slideNumber}`, marginX + 100, marginY + 32);

  // Top right watermark / brand tag
  ctx.textAlign = "right";
  ctx.font = "bold 18px 'Be Vietnam Pro', 'Inter', system-ui, sans-serif";
  ctx.fillStyle = secondaryTextColor;
  ctx.fillText("NGHỀ CONTENT • NỀN SÁNG CHUYÊN NGHIỆP", width - marginX, marginY + 32);

  if (slide.type === "hook") {
    // HOOK SLIDE
    // Badge pill
    if (slide.badge) {
      ctx.fillStyle = accentColor;
      const badgeWidth = 440;
      roundRect(ctx, (width - badgeWidth) / 2, 220, badgeWidth, 54, 12, true, false);
      ctx.fillStyle = accentTextColor;
      ctx.font = "bold 22px 'Be Vietnam Pro', system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(slide.badge.toUpperCase(), width / 2, 255);
    }

    // Main Text (Condensed, Bold, In hoa, 48-60pt)
    ctx.textAlign = "center";
    ctx.fillStyle = textColor;
    ctx.font = "900 60px 'Anton', 'Bebas Neue', 'Montserrat Extra Bold', system-ui, sans-serif";
    const mainText = slide.mainText || "TIÊU ĐỀ HOOK GIẬT TÍT";
    drawWrappedText(ctx, mainText, width / 2, 380, contentWidth - 40, 76, "center");

    // Divider in accent color
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 80, height / 2 + 30);
    ctx.lineTo(width / 2 + 80, height / 2 + 30);
    ctx.stroke();

    // Sub text (Sans-serif 24-28pt)
    ctx.fillStyle = secondaryTextColor;
    ctx.font = "600 32px 'Be Vietnam Pro', 'Inter', system-ui, sans-serif";
    const subText = slide.subText || "Lướt xem để né mất tiền oan!";
    drawWrappedText(ctx, subText, width / 2, height / 2 + 100, contentWidth - 60, 48, "center");

    // Design specs visual suggestion card
    ctx.fillStyle = cardBg;
    // Drop shadow 5-10%
    ctx.shadowColor = "rgba(0, 0, 0, 0.08)";
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 8;
    roundRect(ctx, marginX, height - 330, contentWidth, 200, 20, true, true);
    ctx.shadowColor = "transparent"; // Reset shadow

    ctx.fillStyle = accentColor;
    ctx.font = "bold 20px 'Be Vietnam Pro', system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("📸 VISUAL & HƯỚNG DẪN DESIGN NỀN SÁNG:", marginX + 30, height - 280);

    ctx.fillStyle = textColor;
    ctx.font = "500 22px 'Be Vietnam Pro', system-ui, sans-serif";
    drawWrappedText(
      ctx,
      slide.visualSuggestion || "Chụp sản phẩm cầm tay thật trên nền sáng #FFFFFF, đổ bóng nhẹ 5-10%",
      marginX + 30,
      height - 240,
      contentWidth - 60,
      34,
      "left"
    );

    // Swipe indicator
    ctx.fillStyle = accentColor;
    ctx.font = "bold 24px 'Be Vietnam Pro', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("VUỐT SANG ĐỂ XEM TIẾP 👉", width / 2, height - 70);
  } else {
    // REVIEW SLIDE - BỐ CỤC CHUẨN NỀN SÁNG
    // Verdict Pill
    if (slide.verdictCategory) {
      const verdict = slide.verdictCategory;
      let badgeColor = accentColor;
      if (verdict.includes("CHÂN ÁI")) badgeColor = "#166534";
      else if (verdict.includes("BÌNH THƯỜNG")) badgeColor = "#b45309";
      else if (verdict.includes("CÂN NHẮC") || verdict.includes("NÉ")) badgeColor = "#991b1b";

      ctx.fillStyle = badgeColor;
      const vWidth = 320;
      roundRect(ctx, (width - vWidth) / 2, 160, vWidth, 52, 26, true, false);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 22px 'Be Vietnam Pro', system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(verdict, width / 2, 194);
    }

    // Product Name (Condensed Sans-serif, In hoa)
    ctx.textAlign = "center";
    ctx.fillStyle = textColor;
    ctx.font = "800 44px 'Anton', 'Montserrat Extra Bold', 'Be Vietnam Pro', system-ui, sans-serif";
    const prodName = slide.productName || "Tên Sản Phẩm";
    drawWrappedText(ctx, prodName, width / 2, 270, contentWidth, 54, "center");

    // Headline punchline
    if (slide.headline) {
      ctx.fillStyle = accentColor;
      ctx.font = "bold 26px 'Be Vietnam Pro', system-ui, sans-serif";
      drawWrappedText(ctx, `"${slide.headline}"`, width / 2, 355, contentWidth - 40, 36, "center");
    }

    // Review content card with 5-10% drop shadow
    const cardTop = 410;
    const cardHeight = height - cardTop - 220;
    ctx.fillStyle = cardBg;
    ctx.shadowColor = "rgba(0, 0, 0, 0.08)";
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 8;
    roundRect(ctx, marginX, cardTop, contentWidth, cardHeight, 24, true, true);
    ctx.shadowColor = "transparent";

    // Key points (Sans-serif 22-26pt, Line height 1.5, Highlight bold keywords)
    const points = slide.keyPoints || [];
    let pointY = cardTop + 55;
    ctx.textAlign = "left";

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      // Bullet dot
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(marginX + 35, pointY + 10, 7, 0, Math.PI * 2);
      ctx.fill();

      // Point text with high contrast #111111
      ctx.fillStyle = textColor;
      ctx.font = "600 24px 'Be Vietnam Pro', 'Inter', system-ui, sans-serif";
      const linesDrawn = drawWrappedText(ctx, p, marginX + 60, pointY + 16, contentWidth - 90, 36, "left");
      pointY += (linesDrawn * 36) + 20;
    }

    // Visual direction note
    ctx.fillStyle = secondaryTextColor;
    ctx.font = "italic 20px 'Be Vietnam Pro', system-ui, sans-serif";
    ctx.fillText(`📸 Visual: ${slide.visualSuggestion || "Ảnh hand-held thật trên nền sáng"}`, marginX + 30, cardTop + cardHeight - 25);

    // Footer rating & price
    ctx.fillStyle = textColor;
    ctx.font = "bold 24px 'Be Vietnam Pro', system-ui, sans-serif";
    ctx.textAlign = "left";
    if (slide.priceRange) {
      ctx.fillText(`💰 Giá: ${slide.priceRange}`, marginX, height - 80);
    }
    if (slide.rating) {
      ctx.textAlign = "right";
      ctx.fillText(`⭐ Đánh giá: ${slide.rating}/5.0`, width - marginX, height - 80);
    }
  }

  return canvas;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
  fill: boolean,
  stroke: boolean
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  align: "center" | "left" = "left"
): number {
  const words = text.split(" ");
  let line = "";
  let currentY = y;
  let lineCount = 0;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + " ";
      currentY += lineHeight;
      lineCount++;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
  lineCount++;
  return lineCount;
}

export function downloadSlideAsImage(
  slide: CarouselSlide,
  themeId: SlideThemeId,
  aspectRatio: "4:5" | "9:16" = "4:5",
  filenamePrefix = "slide"
) {
  const canvas = renderSlideToCanvas(slide, themeId, aspectRatio);
  const link = document.createElement("a");
  link.download = `${filenamePrefix}_${slide.slideNumber}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
