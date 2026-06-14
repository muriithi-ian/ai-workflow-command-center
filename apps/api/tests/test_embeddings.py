from app.services.embeddings import (
    MOCK_EMBEDDING_DIMENSIONS,
    build_mock_embedding,
    cosine_similarity,
    tokenize,
)


def test_mock_embedding_is_deterministic_and_normalized() -> None:
    first = build_mock_embedding("vendor security review")
    second = build_mock_embedding("vendor security review")

    assert first == second
    assert len(first) == MOCK_EMBEDDING_DIMENSIONS
    assert any(value > 0 for value in first)


def test_cosine_similarity_scores_related_text_higher_than_empty_text() -> None:
    query = build_mock_embedding("vendor risk")
    related = build_mock_embedding("vendor risk review")
    empty = build_mock_embedding("")

    assert cosine_similarity(query, related) > cosine_similarity(query, empty)


def test_tokenize_removes_stop_words() -> None:
    assert "what" not in tokenize("What does the policy say about deletion?")
    assert "deletion" in tokenize("What does the policy say about deletion?")
