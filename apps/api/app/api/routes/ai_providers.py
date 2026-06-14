from fastapi import APIRouter
from pydantic import BaseModel

from app.core.config import get_settings
from app.models.ai_providers import AiProviderStatus
from app.services.ai_providers import get_ai_provider_status

router = APIRouter(prefix="/ai/providers", tags=["ai-providers"])


class AiProviderStatusResponse(BaseModel):
    data: list[AiProviderStatus]
    error: None = None


@router.get("/status", response_model=AiProviderStatusResponse)
def list_ai_provider_status() -> AiProviderStatusResponse:
    return AiProviderStatusResponse(data=get_ai_provider_status(get_settings()))
