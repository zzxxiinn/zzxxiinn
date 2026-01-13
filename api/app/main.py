from contextlib import asynccontextmanager

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.database import create_db_and_tables
from app.routers import stock, trade


@asynccontextmanager
async def lifespan(app: FastAPI):
    # --- 启动时运行(Startup) ---
    print("🚀 System Starting...")
    create_db_and_tables()  # 创建表
    yield
    # --- 关闭时运行 (Shutdown) ---
    print("🛑 System Shutting down...")


app = FastAPI(lifespan=lifespan)

# 跨域配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stock.router)
app.include_router(trade.router)


@app.get("/")
def read_root():
    return {"status": "System Online"}
