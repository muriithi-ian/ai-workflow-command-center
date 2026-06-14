from datetime import UTC, datetime
from typing import Literal

from pydantic import BaseModel

from app.models.documents import DocumentChunk, DocumentDetail


class DocumentProcessingStage(BaseModel):
    name: str
    status: Literal["completed", "blocked"]
    summary: str


class DocumentProcessingResult(BaseModel):
    document_id: str
    status: Literal["processed"]
    chunk_count: int
    chunks: list[DocumentChunk]
    stages: list[DocumentProcessingStage]
    processed_at: datetime
    next_step: Literal["ready_for_rag_indexing"]
    audit_event: Literal["document.processed"]


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
        stages=[
            DocumentProcessingStage(
                name="validate_document",
                status="completed",
                summary="Confirmed the seeded document is ready for deterministic processing.",
            ),
            DocumentProcessingStage(
                name="extract_text",
                status="completed",
                summary="Loaded synthetic extracted text from the demo document fixture.",
            ),
            DocumentProcessingStage(
                name="chunk_text",
                status="completed",
                summary=f"Split extracted text into {len(document.chunks)} reviewable chunks.",
            ),
            DocumentProcessingStage(
                name="prepare_rag_index",
                status="completed",
                summary="Marked chunks as ready for pgvector indexing in the persistence phase.",
            ),
        ],
        processed_at=datetime.now(UTC),
        next_step="ready_for_rag_indexing",
        audit_event="document.processed",
    )
