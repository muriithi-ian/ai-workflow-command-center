from datetime import datetime
from typing import Literal

from pydantic import BaseModel

DocumentStatus = Literal["queued", "processing", "ready", "failed"]


class DocumentChunk(BaseModel):
    id: str
    document_id: str
    ordinal: int
    heading: str
    content: str
    token_count: int


class DocumentSummary(BaseModel):
    id: str
    title: str
    status: DocumentStatus
    chunk_count: int
    uploaded_by: str
    created_at: datetime


class DocumentDetail(DocumentSummary):
    source_type: Literal["seed", "upload"]
    file_name: str
    summary: str
    chunks: list[DocumentChunk]
