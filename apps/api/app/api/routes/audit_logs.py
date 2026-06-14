from fastapi import APIRouter
from pydantic import BaseModel

from app.models.audit_logs import AuditLogEntry
from app.services.audit_logs import get_demo_audit_logs

router = APIRouter(prefix="/audit-logs", tags=["audit-logs"])


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
    events = get_demo_audit_logs()
    return AuditLogListResponse(
        data=AuditLogListData(items=events, page=1, page_size=25, total=len(events))
    )
