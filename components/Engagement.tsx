import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

const ResponseCard = ({
  title,
  subtitle,
  stats,
  extraDetails,
  icon,
  trendData,
}) => {
  return (
    <div
      className="relative group h-full"
      style={{ opacity: 1, transform: "none" }}
    >
      <div
        className="h-full bg-white dark:bg-white/5 backdrop-blur-xl p-6 
        rounded-2xl border border-black/5 dark:border-white/5 
        hover:border-black/10 dark:hover:border-white/10
        hover:bg-black/[0.02] dark:hover:bg-white/[0.07]
        shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_0_1px_rgba(255,255,255,0.02)]
        hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_4px_20px_-4px_rgba(255,255,255,0.05)]
        transition-all duration-300"
      >
        <div className="flex flex-col justify-between h-full">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-mono text-black/40 dark:text-white/40">
                {icon}
                {title}
              </div>
              <div className="text-[10px] font-mono text-black/20 dark:text-white/20">
                {stats}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-mono tabular-nums">
                  {extraDetails}
                  <span className="text-sm text-black/40 dark:text-white/40 ml-1">
                    MIN
                  </span>
                </div>
                <div className="text-[10px] font-mono text-black/40 dark:text-white/40 mt-1">
                  7-day mean response time
                </div>
              </div>
              {trendData >= 10 ? (
                <div className="flex items-center gap-1 text-[10px] font-mono text-green-500">
                  <TrendingUp className="w-3 h-3" />
                  {trendData}%
                </div>
              ) : (
                <div className="flex items-center gap-1 text-[10px] font-mono text-red-500">
                  <TrendingDown className="w-3 h-3" />
                  {trendData}%
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-black/40 dark:text-white/40 mt-4">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-3"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Median: <span>{subtitle}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Engagement = ({ data }) => {
  return (
    <section className="min-h-[200px]">
      <section className="p-8 bg-white dark:bg-black rounded-3xl border border-black/5 dark:border-white/5">
        <div className="mb-8">
          <div className="text-[10px] tracking-wider text-black/40 dark:text-white/40 mb-2">
          Engagement Summary
          </div>
          <div className="text-xl font-light tracking-tight">
          Average engagement by types
          </div>
          <div className="text-[10px] text-black/40 dark:text-white/40 pt-2">
            7-Day Analysis
          </div>
        </div>
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[1200px]">
          {data.map((item, index) => (
            <ResponseCard key={index} {...item} />
          ))}
            </div>
        </div>
      </section>
    </section>
  );
};

export default Engagement;
