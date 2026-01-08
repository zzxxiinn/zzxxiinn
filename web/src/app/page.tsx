import { StockChart } from "@/components/StockChart";
import { BookOpen, TrendingUp, Gamepad2, Database } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]">
        {/* 1. 核心看板 (占满第一行前两格) */}
        <div className="md:col-span-2 bg-white dark:bg-neutral-800 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-700 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-500" />
              Base 127
            </h2>
            <p className="text-neutral-500 mt-2">数字花园建设中...</p>
          </div>
          <div className="text-sm text-neutral-400">
            Status: System Online 🟢
          </div>
        </div>

        {/* 2. 股票入口 */}
        <div className="md:col-span-2 bg-white dark:bg-neutral-800 rounded-3xl p-4 border border-neutral-200 dark:border-neutral-700 shadow-sm overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-2 px-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                西部材料 (002149)
              </span>
            </div>
            <span className="text-xs text-neutral-400 bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded-full">
              Daily
            </span>
          </div>

          {/* 插入图表组件 */}
          <div className="flex-1 w-full min-h-0">
            <StockChart />
          </div>
        </div>

        {/* 3. 日记入口 */}
        <div className="bg-white dark:bg-neutral-800 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-700 shadow-sm flex flex-col justify-center items-center hover:ring-2 ring-green-500 transition-all cursor-pointer">
          <BookOpen className="w-10 h-10 text-green-500 mb-4" />
          <h3 className="font-semibold text-neutral-700 dark:text-neutral-200">
            Journal
          </h3>
          <p className="text-xs text-neutral-400 mt-1">生活 & 想法</p>
        </div>

        {/* 4. 游戏入口 */}
        <div className="bg-neutral-100 dark:bg-neutral-800/50 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-700 shadow-sm flex flex-col justify-center items-center opacity-70">
          <Gamepad2 className="w-10 h-10 text-orange-400 mb-4" />
          <h3 className="font-semibold text-neutral-500">Game</h3>
          <p className="text-xs text-neutral-400 mt-1">Coming Soon</p>
        </div>
      </div>
    </main>
  );
}
