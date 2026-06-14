from fastapi.testclient import TestClient

from app.core.config import Settings
from app.main import app

client = TestClient(app)


def test_settings_report_supabase_when_required_public_values_exist() -> None:
    settings = Settings(
        next_public_supabase_url="https://demo.supabase.co",
        next_public_supabase_anon_key="anon-demo-key",
    )

    assert settings.supabase_configured is True
    assert settings.supabase_service_role_configured is False


def test_settings_report_local_llm_only_when_model_is_selected() -> None:
    settings = Settings(local_llm_base_url="http://localhost:1234/v1", local_llm_model="")

    assert settings.local_llm_configured is False


def test_config_status_does_not_expose_secret_values() -> None:
    response = client.get("/api/config/status")

    assert response.status_code == 200
    body = response.json()
    assert body["error"] is None
    assert set(body["data"]) == {
        "ai_mode",
        "supabase_configured",
        "supabase_service_role_configured",
        "local_llm_configured",
    }
    assert "SUPABASE_SERVICE_ROLE_KEY" not in response.text
