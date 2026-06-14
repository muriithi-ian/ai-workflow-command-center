from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    frontend_origin: str = "http://localhost:3000"
    ai_mode: str = "mock"
    local_llm_base_url: str = "http://localhost:1234/v1"
    local_llm_model: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()
