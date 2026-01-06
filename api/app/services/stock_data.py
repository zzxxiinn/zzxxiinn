import akshare as ak
import pandas as pd
from datetime import datetime, timedelta


class StockService:
    @staticmethod
    async def fetch_history(code: str, period: str = "3mo"):
        """
        使用 AkShare 获取 A 股历史数据
        code: 002149 (AkShare 不需要后缀 .SZ)
        period: 为了简化，我们暂时把 period 映射为具体的开始时间
        """
        # 1. 清洗代码：如果你传了 "002149.SZ"，去掉后缀，只留 "002149"
        clean_code = code.split(".")[0]

        # 2. 计算开始时间
        # AkShare 需要具体的 start_date (YYYYMMDD)
        end_date = datetime.now()
        if period == "1mo":
            start_date = end_date - timedelta(days=30)
        elif period == "3mo":
            start_date = end_date - timedelta(days=90)
        elif period == "6mo":
            start_date = end_date - timedelta(days=180)
        elif period == "1y":
            start_date = end_date - timedelta(days=365)
        else:
            start_date = end_date - timedelta(days=90)  # 默认 3 个月

        start_str = start_date.strftime("%Y%m%d")
        end_str = end_date.strftime("%Y%m%d")

        print(f"📡 AkShare: 正在抓取 {clean_code} 从 {start_str} 到 {end_str} ...")

        try:
            # 3. 调用 AkShare 接口 (数据源：东方财富)
            # adjust="qfq" 表示前复权，看盘一般都看复权价
            df = ak.stock_zh_a_hist(symbol=clean_code, period="daily", start_date=start_str, end_date=end_str,
                                    adjust="qfq")

            if df.empty:
                return None

            # 4. 数据清洗
            # AkShare 返回的列名是中文的，我们要映射回前端需要的英文格式
            # 原始列名: ['日期', '开盘', '收盘', '最高', '最低', '成交量', ...]

            kline_data = []
            for _, row in df.iterrows():
                kline_data.append({
                    "time": row['日期'],  # 格式已经是 "2024-01-01"
                    "open": row['开盘'],
                    "high": row['最高'],
                    "low": row['最低'],
                    "close": row['收盘'],
                    "volume": row['成交量']
                })

            return {
                "symbol": code,
                "data": kline_data,
                "latest_price": kline_data[-1]["close"] if kline_data else 0
            }

        except Exception as e:
            print(f"❌ AkShare Error: {e}")
            # 如果报错，可能是代码不对，或者网络问题
            return None