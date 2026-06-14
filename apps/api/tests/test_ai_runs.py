from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_ai_runs_list_includes_traceability_fields() -> None:
    response = client.get("/api/ai-runs")

    assert response.status_code == 200
    body = response.json()
    assert body["error"] is None
    assert body["data"]["total"] >= 2
    assert body["data"]["items"][0]["provider"] == "mock"
    assert body["data"]["items"][0]["input_summary"]


def test_ai_run_detail_returns_retrieved_context() -> None:
    list_response = client.get("/api/ai-runs")
    run_id = list_response.json()["data"]["items"][0]["id"]

    response = client.get(f"/api/ai-runs/{run_id}")

    assert response.status_code == 200
    body = response.json()
    assert body["error"] is None
    assert body["data"]["id"] == run_id
    assert body["data"]["output"]
    assert "retrieved_context" in body["data"]


def test_ai_run_detail_missing_id_returns_safe_not_found() -> None:
    response = client.get("/api/ai-runs/airun_missing")

    assert response.status_code == 404
    assert response.json() == {
        "data": None,
        "error": {
            "code": "NOT_FOUND",
            "message": "AI run 'airun_missing' was not found.",
        },
    }
