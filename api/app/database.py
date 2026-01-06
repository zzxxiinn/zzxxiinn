# app/database.py
from sqlmodel import SQLModel, create_engine, Session

sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

engine = create_engine(sqlite_url, connect_args={"check_same_thread": False})


def create_db_and_tables():
    # 👇 关键修复：在这里导入你的模型！
    # 只要这行代码被执行，SQLModel 就会把 TradeRecord 注册到 metadata 里
    from app.models import TradeRecord

    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
