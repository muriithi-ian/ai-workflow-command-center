from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_mock_rag_query_returns_grounded_answer_with_sources() -> None:
    response = client.post(
        "/api/rag/query",
        json={
            "question": "What risks are mentioned in the vendor onboarding document?",
            "document_ids": ["doc_vendor_intake"],
        },
    )

    assert response.status_code == 200
    body = response.json()
    assert body["error"] is None
    assert body["data"]["status"] == "completed"
    assert body["data"]["provider"] == "mock"
    assert body["data"]["model"] == "mock-rag-v1"
    assert body["data"]["ai_run_id"].startswith("airun_")
    assert body["data"]["sources"][0]["document_id"] == "doc_vendor_intake"
    assert body["data"]["sources"][0]["snippet"]


def test_mock_rag_query_can_filter_to_document_ids() -> None:
    response = client.post(
        "/api/rag/query",
        json={
            "question": "What does the policy say about deletion?",
            "document_ids": ["doc_policy_update"],
        },
    )

    assert response.status_code == 200
    body = response.json()
    assert body["data"]["status"] == "completed"
    assert {source["document_id"] for source in body["data"]["sources"]} == {
        "doc_policy_update"
    }


def test_mock_rag_query_returns_no_context_fallback() -> None:
    response = client.post(
        "/api/rag/query",
        json={"question": "What does the demo say about lunar agriculture?"},
    )

    assert response.status_code == 200
    body = response.json()
    assert body["data"]["status"] == "no_context"
    assert body["data"]["sources"] == []
    assert "could not find enough grounded context" in body["data"]["answer"]


def test_mock_rag_query_validates_short_question() -> None:
    response = client.post("/api/rag/query", json={"question": "hi"})

    assert response.status_code == 422
