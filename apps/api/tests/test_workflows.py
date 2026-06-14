from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_document_intake_workflow_starts_for_ready_document() -> None:
    response = client.post(
        "/api/workflows/document-intake",
        json={
            "document_id": "doc_vendor_intake",
            "requested_by": "demo.admin@example.com",
        },
    )

    assert response.status_code == 200
    body = response.json()
    assert body["error"] is None
    assert body["data"]["status"] == "needs_review"
    assert body["data"]["document_id"] == "doc_vendor_intake"
    assert body["data"]["audit_event"] == "workflow.document_intake.started"
    assert [tool_call["name"] for tool_call in body["data"]["tool_calls"]] == [
        "load_document_chunks",
        "generate_intake_summary",
        "create_human_review_item",
        "write_audit_event",
    ]


def test_document_intake_workflow_returns_not_found_for_missing_document() -> None:
    response = client.post(
        "/api/workflows/document-intake",
        json={
            "document_id": "doc_missing",
            "requested_by": "demo.admin@example.com",
        },
    )

    assert response.status_code == 404
    assert response.json()["error"]["code"] == "NOT_FOUND"


def test_document_intake_workflow_requires_ready_document() -> None:
    response = client.post(
        "/api/workflows/document-intake",
        json={
            "document_id": "doc_contract_notes",
            "requested_by": "demo.admin@example.com",
        },
    )

    assert response.status_code == 409
    assert response.json()["error"] == {
        "code": "WORKFLOW_NOT_READY",
        "message": "Document must be ready before the intake workflow can start.",
    }
