import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  NICHE_KEYWORD_TRENDS,
  HotKeywordMeta,
  NicheTrendSummary,
} from "../data/curatedNiches";
import {
  TrendingUp,
  Flame,
  Search,
  Sparkles,
  Layers,
  ArrowUpRight,
  BarChart3,
  Globe2,
} from "lucide-react";

interface NicheTrendChartProps {
  currentNicheId: string;
  onSelectPrompt: (prompt: string) => void;
}

// Custom tooltip renderer for Recharts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950/95 border border-slate-700/80 p-3 rounded-xl shadow-2xl shadow-black/80 backdrop-blur-md text-xs font-mono">
        <div className="text-slate-300 font-bold border-b border-slate-800 pb-1.5 mb-2 flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-orange-400" />
          <span>{label} (Chỉ số tìm kiếm hàng tháng)</span>
        </div>
        <div className="space-y-1.5">
          {payload.map((item: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-300 font-medium">{item.name}:</span>
              </div>
              <span className="font-bold text-white">
                {item.value.toLocaleString()}k search
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const NicheTrendChart: React.FC<NicheTrendChartProps> = ({
  currentNicheId,
  onSelectPrompt,
}) => {
  const [chartMode, setChartMode] = useState<"area" | "breakdown">("area");

  // Get active trend summary based on current niche or fallback to "all"
  const trendData: NicheTrendSummary =
    NICHE_KEYWORD_TRENDS[currentNicheId] || NICHE_KEYWORD_TRENDS["all"];

  const { keywords, timeline, nicheName } = trendData;

  return (
    <div
      id="niche-trend-chart-container"
      className="mb-8 rounded-2xl bg-slate-950/70 border border-slate-800 p-4 sm:p-5 shadow-lg relative overflow-hidden"
    >
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 flex-wrap">
              <span>XU HƯỚNG TỪ KHÓA TĂNG TRƯỞNG AFFILIATE</span>
              <span className="text-[10px] font-mono font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                <Flame className="w-2.5 h-2.5" /> {nicheName}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Dữ liệu tổng hợp từ tần suất tìm kiếm trên TikTok Shop, Shopee Search & Google Trend 6 tháng qua
            </p>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center bg-slate-900 border border-slate-800 p-0.5 rounded-xl text-xs font-semibold self-start sm:self-auto shrink-0">
          <button
            id="btn-trend-chart-view"
            onClick={() => setChartMode("area")}
            className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
              chartMode === "area"
                ? "bg-slate-800 text-orange-400 font-bold border border-slate-700"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Biểu đồ Recharts</span>
          </button>
          <button
            id="btn-trend-keywords-view"
            onClick={() => setChartMode("breakdown")}
            className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
              chartMode === "breakdown"
                ? "bg-slate-800 text-orange-400 font-bold border border-slate-700"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Bảng Phân Tích ({keywords.length})</span>
          </button>
        </div>
      </div>

      {/* Main Recharts Area */}
      {chartMode === "area" ? (
        <div className="pt-4">
          <div className="h-[260px] sm:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={timeline}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  {keywords.map((kw, i) => (
                    <linearGradient
                      key={i}
                      id={`color-${i}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor={kw.color} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={kw.color} stopOpacity={0.0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  vertical={false}
                />
                <XAxis
                  dataKey="period"
                  stroke="#64748b"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  tickLine={false}
                  axisLine={{ stroke: "#334155" }}
                />
                <YAxis
                  stroke="#64748b"
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  tickLine={false}
                  axisLine={{ stroke: "#334155" }}
                  tickFormatter={(val) => `${val}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{
                    paddingTop: "12px",
                    fontSize: "11px",
                    fontFamily: "monospace",
                  }}
                  iconType="circle"
                />
                {keywords.map((kw, i) => (
                  <Area
                    key={kw.keyword}
                    type="monotone"
                    dataKey={kw.keyword}
                    name={kw.keyword}
                    stroke={kw.color}
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill={`url(#color-${i})`}
                    activeDot={{ r: 5, stroke: "#0f172a", strokeWidth: 2 }}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : null}

      {/* Quick Keywords Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 mt-4">
        {keywords.map((kw) => (
          <div
            key={kw.keyword}
            className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex flex-col justify-between transition-all group"
          >
            <div>
              <div className="flex items-center justify-between gap-1.5 mb-1.5">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60 inline-flex items-center gap-1">
                  <Globe2 className="w-2.5 h-2.5 text-orange-400" />
                  <span>{kw.primaryPlatform}</span>
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-400 inline-flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+{kw.growthPercent}%</span>
                </span>
              </div>

              <div className="text-xs font-bold text-white group-hover:text-orange-300 transition-colors mb-1 line-clamp-1">
                {kw.keyword}
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2.5">
                <span>{kw.monthlySearchVolume} search/tháng</span>
                <span className="text-slate-500">Cạnh tranh: {kw.competition}</span>
              </div>
            </div>

            <button
              id={`btn-apply-kw-${kw.keyword.replace(/\s+/g, "-")}`}
              onClick={() => onSelectPrompt(kw.suggestedPrompt)}
              className="w-full py-1.5 px-2 rounded-lg bg-orange-500/15 hover:bg-orange-500 text-orange-300 hover:text-white border border-orange-500/30 text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-xs"
              title={`Tạo ngay kịch bản với lệnh: ${kw.suggestedPrompt}`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Tạo Kịch Bản Này</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
