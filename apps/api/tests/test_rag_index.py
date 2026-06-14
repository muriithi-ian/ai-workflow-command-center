from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_rag_index_status_reports_mock_embedding_inventory() -> None:
    response = client.get("/api/rag/index")

    assert response.status_code == 200
    body = response.json()
    assert body["error"] is None
    assert body["data"]["provider"] == "mock"
    assert body["data"]["model"] == "mock-hash-embedding-v1"
    assert body["data"]["dimensions"] == 8
    assert body["data"]["chunk_count"] == len(body["data"]["items"])
    assert body["data"]["chunk_count"] > 0
    assert body["data"]["items"][0]["embedding_id"].startswith("emb_chunk_")
    assert len(body["data"]["items"][0]["vector_preview"]) == 4
