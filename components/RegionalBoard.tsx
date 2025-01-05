import React from "react";

const data = [
  {
    region: "Alexanderplatz",
    total: 11232,
    medical: 9298,
    fire: 635,
    technical: 351,
    responseTime: "9.4",
    responseUnit: "MIN",
    responseColor: "text-green-500",
  },
  {
    region: "Wedding Zentrum",
    total: 7755,
    medical: 6979,
    fire: 195,
    technical: 251,
    responseTime: "9.7",
    responseUnit: "MIN",
    responseColor: "text-green-500",
  },
  // Add more data rows here...
];

const RegionalBoard = () => {
  return (
    <section className="py-32">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="min-h-[600px]">
          <div className="flex flex-col gap-6 mb-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="text-[10px] font-mono text-black/40 dark:text-white/40 flex items-center gap-2">
                  <div className="w-1 h-1 bg-[#D94E1E]"></div>
                  REGIONAL BOARD | 2025
                </div>
                <div className="flex-1 sm:flex-none">
                  <div className="flex items-center gap-2 px-3 py-1.5 border border-black/10 dark:border-white/10 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] w-full sm:w-[180px]">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3 h-3 text-black/40 dark:text-white/40"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                      type="text"
                      placeholder="FILTER..."
                      className="bg-transparent w-full text-[10px] font-mono text-black dark:text-white placeholder:text-black/20 dark:placeholder:text-white/20 focus:outline-none"
                      spellCheck="false"
                    />
                  </div>
                </div>
              </div>
              <div className="text-[10px] font-mono text-black/40 dark:text-white/40 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500"></div>
                  Below 10.4 min (2025 avg)
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-[#D94E1E]"></div>
                  Above 10.4 min (2025 avg)
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto border-t border-black/5 dark:border-white/10 mt-8">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1.2fr] border-b border-black/5 dark:border-white/10 py-3">
                <div className="px-4 text-[10px] font-mono text-black/40 dark:text-white/40 text-left">
                  REGION
                </div>
                <div className="px-4 text-[10px] font-mono text-black/40 dark:text-white/40 cursor-pointer select-none hover:text-black dark:hover:text-white text-right">
                  TOTAL
                </div>
                <div className="px-4 text-[10px] font-mono text-black/40 dark:text-white/40 cursor-pointer select-none hover:text-black dark:hover:text-white text-right">
                  MEDICAL
                </div>
                <div className="px-4 text-[10px] font-mono text-black/40 dark:text-white/40 cursor-pointer select-none hover:text-black dark:hover:text-white text-right">
                  FIRE
                </div>
                <div className="px-4 text-[10px] font-mono text-black/40 dark:text-white/40 cursor-pointer select-none hover:text-black dark:hover:text-white text-right">
                  TECHNICAL
                </div>
                <div className="px-4 text-[10px] font-mono text-black/40 dark:text-white/40 cursor-pointer select-none hover:text-black dark:hover:text-white text-right">
                  CRITICAL RESPONSE
                </div>
              </div>
              <div className="divide-y divide-black/5 dark:divide-white/10">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1.2fr] py-4 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                  >
                    <div className="px-4 font-mono text-black dark:text-white">
                      {item.region}
                    </div>
                    <div className="px-4 font-mono tabular-nums text-right text-black/70 dark:text-white/70">
                      {item.total}
                    </div>
                    <div className="px-4 font-mono tabular-nums text-right text-black/70 dark:text-white/70">
                      {item.medical}
                    </div>
                    <div className="px-4 font-mono tabular-nums text-right text-black/70 dark:text-white/70">
                      {item.fire}
                    </div>
                    <div className="px-4 font-mono tabular-nums text-right text-black/70 dark:text-white/70">
                      {item.technical}
                    </div>
                    <div className="px-4 font-mono tabular-nums text-right">
                      <span className={item.responseColor}>
                        {item.responseTime}
                        <span className="ml-1 text-black/40 dark:text-white/40">
                          {item.responseUnit}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionalBoard;
