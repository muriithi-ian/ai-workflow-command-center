from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_dashboard_metrics_returns_demo_metrics() -> None:
    response = client.get("/api/dashboard/metrics")

    assert response.status_code == 200
    body = response.json()
    assert body["error"] is None
    assert body["data"]["metrics"][0]["label"] == "Documents"


def test_documents_list_uses_paginated_response_shape() -> None:
    response = client.get("/api/documents")

    assert response.status_code == 200
    body = response.json()
    assert body["error"] is None
    assert body["data"]["page"] == 1
    assert body["data"]["total"] == len(body["data"]["items"])
    assert body["data"]["items"][0]["id"] == "doc_vendor_intake"


def test_document_detail_returns_seeded_chunks() -> None:
    response = client.get("/api/documents/doc_vendor_intake")

    assert response.status_code == 200
    body = response.json()
    assert body["error"] is None
    assert body["data"]["id"] == "doc_vendor_intake"
    assert body["data"]["source_type"] == "seed"
    assert body["data"]["chunks"][0]["id"] == "chunk_vendor_scope"


def test_document_detail_missing_id_returns_safe_error() -> None:
    response = client.get("/api/documents/doc_missing")

    assert response.status_code == 404
    assert response.json() == {
        "data": None,
        "error": {
            "code": "NOT_FOUND",
            "message": "Document 'doc_missing' was not found.",
        },
    }


def test_ai_runs_list_identifies_mock_provider() -> None:
    response = client.get("/api/ai-runs")

    assert response.status_code == 200
    body = response.json()
    assert body["error"] is None
    assert body["data"]["items"][0]["provider"] == "mock"


def test_reviews_list_includes_pending_review_items() -> None:
    response = client.get("/api/reviews")

    assert response.status_code == 200
    body = response.json()
    assert body["error"] is None
    assert body["data"]["items"][0]["status"] == "pending"


def test_audit_logs_list_includes_structured_events() -> None:
    response = client.get("/api/audit-logs")

    assert response.status_code == 200
    body = response.json()
    assert body["error"] is None
    assert body["data"]["items"][0]["action"] == "document.processed"
