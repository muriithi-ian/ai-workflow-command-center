from pydantic import BaseModel


class RagIndexItem(BaseModel):
    document_id: str
    document_title: str
    chunk_id: str
    embedding_id: str
    heading: str
    token_count: int
    vector_preview: list[float]


class RagIndexStatus(BaseModel):
    provider: str
    model: str
    dimensions: int
    chunk_count: int
    status: str
    items: list[RagIndexItem]
