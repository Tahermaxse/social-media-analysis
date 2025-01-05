"use client";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Image, Film, Share2, Heart, MessageCircle, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

const mockData = [
  { date: "Dec 27", carousel: 12500, reels: 25000, static: 8000, likes: 45000, shares: 2800, comments: 1500 },
  { date: "Dec 28", carousel: 13000, reels: 28000, static: 7500, likes: 48000, shares: 3200, comments: 1800 },
  { date: "Dec 29", carousel: 11800, reels: 24000, static: 8200, likes: 42000, shares: 2500, comments: 1400 },
  { date: "Dec 30", carousel: 14200, reels: 30000, static: 7800, likes: 52000, shares: 3500, comments: 2000 },
  { date: "Dec 31", carousel: 15000, reels: 32000, static: 8500, likes: 55000, shares: 3800, comments: 2200 },
  { date: "Jan 01", carousel: 16500, reels: 35000, static: 9000, likes: 60000, shares: 4200, comments: 2500 },
  { date: "Jan 02", carousel: 14800, reels: 31000, static: 8300, likes: 54000, shares: 3600, comments: 2100 },
];

const categories = [
  {
    id: "post_types",
    name: "POST TYPES",
    subcategories: [
      { 
        id: "carousel",
        name: "Carousel",
        icon: Image,
        color: "#8b5cf6",
        count: "97.8K",
        description: "Multi-image carousel posts performance"
      },
      {
        id: "reels",
        name: "Reels",
        icon: Film,
        color: "#ec4899",
        count: "205K",
        description: "Short-form video content performance"
      },
      {
        id: "static",
        name: "Static",
        icon: BarChart2,
        color: "#10b981",
        count: "57.3K",
        description: "Single image post performance"
      }
    ]
  },
  {
    id: "engagement",
    name: "ENGAGEMENT",
    subcategories: [
      {
        id: "likes",
        name: "Likes",
        icon: Heart,
        color: "#ef4444",
        count: "356K",
        description: "Total post likes and reactions"
      },
      {
        id: "shares",
        name: "Shares",
        icon: Share2,
        color: "#f59e0b",
        count: "23.6K",
        description: "Content shares and reposts"
      },
      {
        id: "comments",
        name: "Comments",
        icon: MessageCircle,
        color: "#3b82f6",
        count: "13.5K",
        description: "User comments and replies"
      }
    ]
  }
];

type TimeRange = "D" | "W" | "M";

export function SocialMediaTrends() {
  const [activeCategories, setActiveCategories] = useState<string[]>(["carousel"]);
  const [timeRange, setTimeRange] = useState<TimeRange>("D");
  const [activeGroup, setActiveGroup] = useState<string>("post_types");

  const toggleCategory = (categoryId: string) => {
    setActiveCategories(prev => {
      if (prev.length === 1 && prev.includes(categoryId)) {
        return prev;
      }
      return prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId];
    });
  };

  const allSubcategories = categories.flatMap(cat => cat.subcategories);

  return (
    <div className="w-full">
      <div className="mb-8">
        <div className="text-[10px] tracking-wider text-black/40 dark:text-white/40 mb-2">
          ANALYTICS
        </div>
        <div className="text-xl font-light tracking-tight">Social Media Performance</div>
      </div>

      <div className="border border-black/10 dark:border-white/10 bg-white dark:bg-black rounded-xl">
        <div className="border-b border-black/10 dark:border-white/10 p-4">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              {/* <div className="flex gap-1 p-1 bg-black/[0.02] dark:bg-white/[0.02] rounded-lg">
                {(["D", "W", "M"] as TimeRange[]).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={cn(
                      "w-8 h-7 rounded-md text-[10px] font-mono",
                      "flex items-center justify-center transition-colors duration-200",
                      timeRange === range
                        ? "bg-[#D94E1E] text-white shadow-lg shadow-[#D94E1E]/20"
                        : "text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                    )}
                  >
                    {range}
                  </button>
                ))}
              </div> */}

              <div className="flex gap-2">
                {categories.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => setActiveGroup(group.id)}
                    className={cn(
                      "px-4 py-1.5 text-[10px] font-mono rounded-lg transition-colors duration-200",
                      activeGroup === group.id
                        ? "bg-[#D94E1E] text-white shadow-lg shadow-[#D94E1E]/20"
                        : "text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                    )}
                  >
                    {group.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {categories
                .find(group => group.id === activeGroup)
                ?.subcategories.map((category) => {
                  const Icon = category.icon;
                  const isActive = activeCategories.includes(category.id);
                  return (
                    <button
                      key={category.id}
                      onClick={() => toggleCategory(category.id)}
                      className={cn(
                        "px-3 py-2 text-[10px] font-mono tracking-wider flex items-center gap-2",
                        "border rounded-full transition-all duration-300",
                        isActive
                          ? `border-[${category.color}] bg-[${category.color}]/5 text-[${category.color}]`
                          : "border-black/5 dark:border-white/5 text-black/40 dark:text-white/40"
                      )}
                    >
                      <Icon className="w-3 h-3" style={{ color: isActive ? category.color : "currentColor" }} />
                      <span>{category.name}</span>
                      <span className={cn(
                        "text-xs",
                        isActive ? "opacity-60" : "opacity-40"
                      )}>{category.count}</span>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="h-[350px] sm:h-[450px] md:h-[500px] p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData}>
              <defs>
                {allSubcategories.map((category) => (
                  <linearGradient key={category.id} id={`gradient-${category.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={`${category.color}25`} />
                    <stop offset="100%" stopColor={`${category.color}00`} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "currentColor", opacity: 0.4 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "currentColor", opacity: 0.4 }}
                tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              {allSubcategories.map((category) => (
                <Area
                  key={category.id}
                  type="monotone"
                  dataKey={category.id}
                  stroke={category.color}
                  fill={`url(#gradient-${category.id})`}
                  strokeWidth={1.5}
                  fillOpacity={0.6}
                  strokeOpacity={0.8}
                  hide={!activeCategories.includes(category.id)}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="border-t border-black/5 dark:border-white/5">
          <div className="flex flex-nowrap gap-4 overflow-x-auto scrollbar-hide py-3 px-4">
            {activeCategories.map((activeCategoryId) => {
              const category = allSubcategories.find(c => c.id === activeCategoryId)!;
              const Icon = category.icon;
              return (
                <div key={category.id} className="flex-shrink-0 w-[280px] sm:w-[320px]">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-black/[0.02] dark:bg-white/[0.02] mt-0.5">
                      <Icon className="w-3 h-3" style={{ color: category.color }} />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-medium" style={{ color: category.color }}>
                        {category.name}
                      </div>
                      <div className="text-[10px] text-black/40 dark:text-white/40 leading-relaxed">
                        {category.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}