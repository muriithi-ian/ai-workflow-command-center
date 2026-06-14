from datetime import UTC, datetime
from typing import Literal

from pydantic import BaseModel

from app.models.documents import DocumentChunk, DocumentDetail


class DocumentProcessingResult(BaseModel):
    document_id: str
    status: Literal["processed"]
    chunk_count: int
    chunks: list[DocumentChunk]
    processed_at: datetime
    next_step: Literal["ready_for_rag_indexing"]


def process_seed_document(document: DocumentDetail) -> DocumentProcessingResult:
    if document.status != "ready" or not document.chunks:
        raise ValueError(
            "Document is not ready for processing. Wait for extraction before chunk indexing."
        )

    return DocumentProcessingResult(
        document_id=document.id,
        status="processed",
        chunk_count=len(document.chunks),
        chunks=document.chunks,
        processed_at=datetime.now(UTC),
        next_step="ready_for_rag_indexing",
    )
