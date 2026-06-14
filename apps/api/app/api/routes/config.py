from fastapi import APIRouter
from pydantic import BaseModel

from app.core.config import get_settings

router = APIRouter(prefix="/config", tags=["config"])


class RuntimeConfigData(BaseModel):
    ai_mode: str
    supabase_configured: bool
    supabase_service_role_configured: bool
    local_llm_configured: bool


class RuntimeConfigResponse(BaseModel):
    data: RuntimeConfigData
    error: None = None


@router.get("/status", response_model=RuntimeConfigResponse)
def get_runtime_config_status() -> RuntimeConfigResponse:
    settings = get_settings()
    return RuntimeConfigResponse(
        data=RuntimeConfigData(
            ai_mode=settings.ai_mode,
            supabase_configured=settings.supabase_configured,
            supabase_service_role_configured=settings.supabase_service_role_configured,
            local_llm_configured=settings.local_llm_configured,
        )
    )
