from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    frontend_origin: str = "http://localhost:3000"
    api_base_url: str = "http://localhost:8000"
    next_public_supabase_url: str = ""
    next_public_supabase_anon_key: str = ""
    supabase_service_role_key: str = ""
    ai_mode: str = "mock"
    local_llm_base_url: str = "http://localhost:1234/v1"
    local_llm_model: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_prefix="",
        extra="ignore",
    )

    @property
    def supabase_configured(self) -> bool:
        return bool(self.next_public_supabase_url and self.next_public_supabase_anon_key)

    @property
    def supabase_service_role_configured(self) -> bool:
        return bool(self.supabase_service_role_key)

    @property
    def local_llm_configured(self) -> bool:
        return bool(self.local_llm_base_url and self.local_llm_model)


@lru_cache
def get_settings() -> Settings:
    return Settings()
