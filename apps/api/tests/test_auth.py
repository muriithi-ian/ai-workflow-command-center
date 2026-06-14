from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_demo_session_returns_authenticated_admin_reviewer() -> None:
    response = client.get("/api/auth/session")

    assert response.status_code == 200
    body = response.json()
    assert body["error"] is None
    assert body["data"]["authenticated"] is True
    assert body["data"]["mode"] == "demo"
    assert body["data"]["user"]["email"] == "demo.admin@example.com"
    assert body["data"]["user"]["roles"] == ["admin", "reviewer"]


def test_demo_session_does_not_return_tokens_or_secrets() -> None:
    response = client.get("/api/auth/session")

    assert "token" not in response.text.lower()
    assert "secret" not in response.text.lower()
    assert "service_role" not in response.text.lower()
