import os
from typing import Optional
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file


class Settings:
    # Database
    MONGODB_URL: str = os.getenv("MONGODB_URL")
    DATABASE_NAME: str = os.getenv("DATABASE_NAME")

    # Security
    SECRET_KEY: str = os.environ["SECRET_KEY"]  # Crash early if missing
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30")
    )

    # CORS
    ALLOWED_ORIGINS: list = [
        "http://localhost:5173",  # Vite default
        "http://localhost:3000",  # Alt port
        "http://localhost:8080",  # Alt port
    ]

    # Environment
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    DEBUG: bool = ENVIRONMENT == "development"

    # Cookie settings
    COOKIE_SECURE: bool = ENVIRONMENT == "production"
    COOKIE_SAMESITE: str = "lax"

    class Config:
        case_sensitive = True


settings = Settings()
