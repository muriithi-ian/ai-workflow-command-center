from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_process_document_returns_deterministic_chunks() -> None:
    response = client.post("/api/documents/doc_vendor_intake/process")

    assert response.status_code == 200
    body = response.json()
    assert body["error"] is None
    assert body["data"]["document_id"] == "doc_vendor_intake"
    assert body["data"]["status"] == "processed"
    assert body["data"]["chunk_count"] == 3
    assert body["data"]["chunks"][0]["id"] == "chunk_vendor_scope"
    assert [stage["name"] for stage in body["data"]["stages"]] == [
        "validate_document",
        "extract_text",
        "chunk_text",
        "prepare_rag_index",
    ]
    assert body["data"]["next_step"] == "ready_for_rag_indexing"
    assert body["data"]["audit_event"] == "document.processed"


def test_process_document_rejects_document_without_chunks() -> None:
    response = client.post("/api/documents/doc_contract_notes/process")

    assert response.status_code == 409
    assert response.json() == {
        "data": None,
        "error": {
            "code": "DOCUMENT_PROCESSING_FAILED",
            "message": (
                "Document is not ready for processing. Wait for extraction before chunk indexing."
            ),
        },
    }


def test_process_document_missing_id_returns_safe_not_found() -> None:
    response = client.post("/api/documents/doc_missing/process")

    assert response.status_code == 404
    assert response.json()["error"]["code"] == "NOT_FOUND"
