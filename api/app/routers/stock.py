from fastapi import APIRouter, HTTPException

from app.services.stock_data import StockService

router = APIRouter(prefix="/api/stock", tags=["stock"])

@router.get("/history")
async def get_history(code: str = '002149', period: str = '3mo'):
    # 1. 调用 Service
    data = await StockService.fetch_history(code, period)

    # 2. 处理业务结果并决定返回什么 HTTP 状态
    if not data:
        raise HTTPException(status_code=404, detail="Stock data not found")

    return data