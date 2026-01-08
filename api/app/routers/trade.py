from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List

from app.database import get_session
from app.models.trade import TradeRecord

router = APIRouter(prefix="/api/trades", tags=["trade"])


@router.post("/", response_model=TradeRecord)
def create_trade(trade: TradeRecord, session: Session = Depends(get_session)):
    """新增交易记录（买/卖）"""
    session.add(trade)
    session.commit()
    session.refresh(trade)
    return trade


@router.get("/", response_model=List[TradeRecord])
def read_trades(session: Session = Depends(get_session)):
    """获取所有交易记录"""
    statement = select(TradeRecord).order_by(TradeRecord.created_at.desc())
    trades = session.exec(statement).all()
    return trades

 
@router.delete("/{id}", status_code=204)
def delete_trade(trade_id: int, session: Session = Depends(get_session)):
    """删除单个交易记录"""
    trade = session.get(TradeRecord, trade_id)
    if trade is None:
        raise HTTPException(status_code=404, detail="Trade not found")
    session.delete(trade)
    session.commit()
    return None

