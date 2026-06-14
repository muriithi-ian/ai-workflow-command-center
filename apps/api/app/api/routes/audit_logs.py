from datetime import UTC, datetime

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/audit-logs", tags=["audit-logs"])


class AuditLogEntry(BaseModel):
    id: str
    action: str
    actor: str
    target: str
    created_at: datetime


class AuditLogListData(BaseModel):
    items: list[AuditLogEntry]
    page: int
    page_size: int
    total: int


class AuditLogListResponse(BaseModel):
    data: AuditLogListData
    error: None = None


@router.get("", response_model=AuditLogListResponse)
def list_audit_logs() -> AuditLogListResponse:
    events = [
        AuditLogEntry(
            id="audit_document_processed",
            action="document.processed",
            actor="system",
            target="doc_vendor_intake",
            created_at=datetime(2026, 1, 15, 12, 1, tzinfo=UTC),
        ),
        AuditLogEntry(
            id="audit_ai_run_created",
            action="ai_run.created",
            actor="demo.admin@example.com",
            target="airun_vendor_risk_summary",
            created_at=datetime(2026, 1, 15, 12, 10, tzinfo=UTC),
        ),
        AuditLogEntry(
            id="audit_review_created",
            action="review.created",
            actor="system",
            target="review_vendor_risk_summary",
            created_at=datetime(2026, 1, 15, 12, 12, tzinfo=UTC),
        ),
    ]
    return AuditLogListResponse(
        data=AuditLogListData(items=events, page=1, page_size=25, total=len(events))
    )
