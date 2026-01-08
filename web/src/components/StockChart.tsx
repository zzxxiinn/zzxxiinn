"use client";

import { CandlestickSeries, ColorType, createChart } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";

interface Trade {
  id: number;
  action: 'BUY' | 'SELL';
  price: number;
  created_at: string;
  note?: string;
}

export const StockChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //判断当前是否是暗色模式 (通过 Tailwind 的 dark 类名)
  const isDarkMode =
    typeof window !== "undefined" &&
    document.documentElement.classList.contains("dark");

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const textColor = isDarkMode ? "#a3a3a3" : "#737373";
    const gridLineColor = isDarkMode
      ? "rgba(255, 255, 255, 0.04)"
      : "rgba(0, 0, 0, 0.04)";
    const scaleColor = isDarkMode ? "#404040" : "#e5e5e5";

    // 创建图标实例
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor,
        attributionLogo: false,
      },
      grid: {
        vertLines: { color: gridLineColor },
        horzLines: { color: gridLineColor },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      autoSize: true,

      rightPriceScale: {
        borderColor: scaleColor,
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
      timeScale: {
        borderColor: scaleColor,
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // 2. 添加 K 线系列 (Candlestick)
    const newSeries = chart.addSeries(CandlestickSeries, {
      // 涨：实体透明，边框红色
      upColor: "transparent",
      borderUpColor: "#F6465D",
      wickUpColor: "#F6465D",

      // 跌：实体绿色，边框同色
      downColor: "#0ECB81",
      borderDownColor: "#0ECB81",
      wickDownColor: "#0ECB81",
    });

    // 3. 获取数据并设置到图表中
    const fetchData = async () => {
      try {
        // Hardcode for testing
        const res = await fetch(
          "http://127.0.0.1:8000/api/stock/history?code=002149&period=3mo"
        );
        const json = await res.json();

        if (json.data) {
          // 必须确保数据是按照时间升序排列
          newSeries.setData(json.data);
          chart.timeScale().fitContent(); // 自动缩放以适应数据
        }
      } catch (err) {
        setError("Failed to fetch stock data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // const handleResize = () => {
    //   if (chartContainerRef.current) {
    //     chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    //   }
    // };

    // window.addEventListener("resize", handleResize);
    const resizeObserver = new ResizeObserver((entries) => {
      if (
        entries.length === 0 ||
        entries[0].target !== chartContainerRef.current
      ) {
        return;
      }

      const newRect = entries[0].contentRect;
      chart.applyOptions({
        width: newRect.width,
        height: newRect.height,
      });
    });

    resizeObserver.observe(chartContainerRef.current);

    return () => {
      // window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [isDarkMode]);

  return (
    <div className="w-full h-full relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 z-10">
          <span className="animate-pulse text-sm text-gray-500">
            正在连线交易所...
          </span>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* 图表挂载 */}
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
};
