# api/app/models/trade.py
from typing import Optional
from datetime import datetime
from sqlmodel import Field, SQLModel


class TradeRecord(SQLModel, table=True):
    # 表名默认是类名小写 (traderecord)，如果你想指定表名：
    __tablename__ = "trade_records"

    id: Optional[int] = Field(default=None, primary_key=True)

    stock_code: str
    stock_name: str
    action: str
    price: float
    note: str = Field(default="")
    created_at: datetime = Field(default_factory=datetime.now)