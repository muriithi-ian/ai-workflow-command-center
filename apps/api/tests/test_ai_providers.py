from fastapi.testclient import TestClient

from app.core.config import Settings
from app.main import app
from app.services.ai_providers import get_ai_provider_status

client = TestClient(app)


def test_ai_provider_status_keeps_mock_enabled_by_default() -> None:
    response = client.get("/api/ai/providers/status")

    assert response.status_code == 200
    body = response.json()
    assert body["error"] is None
    assert body["data"][0] == {
        "provider": "mock",
        "configured": True,
        "default_for_public_demo": True,
        "notes": "Deterministic provider used by the public demo and automated tests.",
    }


def test_ai_provider_status_reports_local_llm_when_model_is_configured() -> None:
    settings = Settings(local_llm_model="local-demo-model")
    providers = get_ai_provider_status(settings)
    local_provider = next(
        provider for provider in providers if provider.provider == "local_openai_compatible"
    )

    assert local_provider.configured is True
    assert local_provider.default_for_public_demo is False


def test_ai_provider_status_does_not_return_api_key_values() -> None:
    settings = Settings(openai_api_key="sk-local-secret", anthropic_api_key="anthropic-secret")

    serialized = "".join(
        provider.model_dump_json() for provider in get_ai_provider_status(settings)
    )

    assert "sk-local-secret" not in serialized
    assert "anthropic-secret" not in serialized
