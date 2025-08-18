import os
from datetime import datetime
from pathlib import Path

import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
import logging
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from src.database.repositories.user_rep import select_all, insert_user

LOG_DIR = Path("logs")
LOG_DIR.mkdir(exist_ok=True)
LOG_FILE = LOG_DIR / f"app_{datetime.now().strftime('%Y-%m-%d')}.log"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler()  # Вывод также в консоль (опционально)
    ]
)
logger = logging.getLogger(__name__)

DB_CONFIG = {
    "username": "postgres",
    "password": "123",  # Замените на реальный пароль
    "host": "localhost",  # Имя сервиса в Docker Compose или localhost
    "port": "5432",
    "database": "tester"
}

# Подключение к PostgreSQL
DATABASE_URL = os.getenv("DATABASE_URL")
try:
    engine = create_engine(DATABASE_URL)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    logger.info("✅ Подключение к PostgreSQL успешно")
except SQLAlchemyError as e:
    logger.error(f"❌ Ошибка подключения к БД: {e}")
    raise

app = FastAPI()

origins = [
    "http://87.228.36.55",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Тестовый запрос к БД
def test_db_connection():
    try:
        with SessionLocal() as session:
            result = session.execute(text("SELECT version()"))
            logger.info(f"Версия PostgreSQL: {result.scalar()}")
    except Exception as e:
        logger.error(f"Ошибка при проверке БД: {e}")


@app.on_event("startup")
async def startup():
    logger.info("Сервер запущен")
    test_db_connection()


@app.get("/")
def root():
    return "Привет"


@app.get("/users")
def get_all_users():
    print("ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ")
    return select_all()


@app.get("/inssert_user")
def insert_user():
    print("ДОБАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ")
    insert_user(
        "test_email",
        "test_login",
        "123"
    )
    return "Пользователь добавлен"
