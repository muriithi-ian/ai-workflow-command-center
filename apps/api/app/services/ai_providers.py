from app.core.config import Settings
from app.models.ai_providers import AiProviderStatus


def get_ai_provider_status(settings: Settings) -> list[AiProviderStatus]:
    return [
        AiProviderStatus(
            provider="mock",
            configured=True,
            default_for_public_demo=True,
            notes="Deterministic provider used by the public demo and automated tests.",
        ),
        AiProviderStatus(
            provider="local_openai_compatible",
            configured=settings.local_llm_configured,
            default_for_public_demo=False,
            notes=(
                "Optional local development provider for LM Studio or another "
                "OpenAI-compatible server."
            ),
        ),
        AiProviderStatus(
            provider="openai",
            configured=bool(settings.openai_api_key),
            default_for_public_demo=False,
            notes="Optional local evaluator mode. Never required for public visitors.",
        ),
        AiProviderStatus(
            provider="anthropic",
            configured=bool(settings.anthropic_api_key),
            default_for_public_demo=False,
            notes="Optional local evaluator mode. Never required for public visitors.",
        ),
    ]
