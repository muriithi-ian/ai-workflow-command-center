from math import sqrt

MOCK_EMBEDDING_MODEL = "mock-hash-embedding-v1"
MOCK_EMBEDDING_DIMENSIONS = 8

STOP_WORDS = {
    "a",
    "an",
    "about",
    "and",
    "are",
    "demo",
    "does",
    "for",
    "in",
    "is",
    "of",
    "or",
    "say",
    "the",
    "to",
    "what",
    "which",
}


def build_mock_embedding_id(chunk_id: str) -> str:
    return f"emb_{chunk_id}"


def build_mock_embedding(text: str) -> list[float]:
    vector = [0.0] * MOCK_EMBEDDING_DIMENSIONS

    for token in tokenize(text):
        bucket = sum(ord(character) for character in token) % MOCK_EMBEDDING_DIMENSIONS
        vector[bucket] += 1.0

    magnitude = sqrt(sum(value * value for value in vector))
    if magnitude == 0:
        return vector

    return [round(value / magnitude, 4) for value in vector]


def cosine_similarity(left: list[float], right: list[float]) -> float:
    if not left or not right or len(left) != len(right):
        return 0.0

    return round(
        sum(left_value * right_value for left_value, right_value in zip(left, right, strict=True)),
        3,
    )


def tokenize(value: str) -> set[str]:
    cleaned = "".join(character.lower() if character.isalnum() else " " for character in value)
    return {word for word in cleaned.split() if word and word not in STOP_WORDS}
