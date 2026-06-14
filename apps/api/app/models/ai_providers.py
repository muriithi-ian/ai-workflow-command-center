from typing import Literal

from pydantic import BaseModel


class AiProviderStatus(BaseModel):
    provider: Literal["mock", "local_openai_compatible", "openai", "anthropic"]
    configured: bool
    default_for_public_demo: bool
    notes: str
