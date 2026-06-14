from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_audit_logs_include_workflow_trace_metadata() -> None:
    response = client.get("/api/audit-logs")

    assert response.status_code == 200
    body = response.json()
    assert body["error"] is None
    assert body["data"]["total"] >= 6
    assert body["data"]["items"][0]["action"] == "document.upload_registered"
    assert body["data"]["items"][1]["metadata"]["chunk_count"] == "3"


def test_audit_logs_include_review_decision_event() -> None:
    response = client.get("/api/audit-logs")

    actions = {item["action"] for item in response.json()["data"]["items"]}

    assert "review.approved" in actions
    assert "rag.query_submitted" in actions
