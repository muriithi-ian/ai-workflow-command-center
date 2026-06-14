from datetime import UTC, datetime
from typing import Literal

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/documents", tags=["documents"])

DocumentStatus = Literal["queued", "processing", "ready", "failed"]


class DocumentSummary(BaseModel):
    id: str
    title: str
    status: DocumentStatus
    chunk_count: int
    uploaded_by: str
    created_at: datetime


class DocumentListData(BaseModel):
    items: list[DocumentSummary]
    page: int
    page_size: int
    total: int


class DocumentListResponse(BaseModel):
    data: DocumentListData
    error: None = None


@router.get("", response_model=DocumentListResponse)
def list_documents() -> DocumentListResponse:
    documents = [
        DocumentSummary(
            id="doc_vendor_intake",
            title="Vendor Intake Security Review",
            status="ready",
            chunk_count=8,
            uploaded_by="demo.admin@example.com",
            created_at=datetime(2026, 1, 12, 14, 30, tzinfo=UTC),
        ),
        DocumentSummary(
            id="doc_policy_update",
            title="Data Retention Policy Update",
            status="ready",
            chunk_count=6,
            uploaded_by="demo.reviewer@example.com",
            created_at=datetime(2026, 1, 14, 9, 15, tzinfo=UTC),
        ),
        DocumentSummary(
            id="doc_contract_notes",
            title="Contract Exception Notes",
            status="processing",
            chunk_count=0,
            uploaded_by="demo.admin@example.com",
            created_at=datetime(2026, 1, 15, 11, 45, tzinfo=UTC),
        ),
    ]
    return DocumentListResponse(
        data=DocumentListData(items=documents, page=1, page_size=25, total=len(documents))
    )
