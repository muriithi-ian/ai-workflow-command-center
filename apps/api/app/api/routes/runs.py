from datetime import UTC, datetime
from typing import Literal

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/ai-runs", tags=["ai-runs"])

AiRunStatus = Literal["completed", "needs_review", "failed"]


class AiRunSummary(BaseModel):
    id: str
    workflow: str
    status: AiRunStatus
    provider: str
    model: str
    created_at: datetime


class AiRunListData(BaseModel):
    items: list[AiRunSummary]
    page: int
    page_size: int
    total: int


class AiRunListResponse(BaseModel):
    data: AiRunListData
    error: None = None


@router.get("", response_model=AiRunListResponse)
def list_ai_runs() -> AiRunListResponse:
    runs = [
        AiRunSummary(
            id="airun_vendor_risk_summary",
            workflow="Document Intake Review",
            status="needs_review",
            provider="mock",
            model="mock-rag-v1",
            created_at=datetime(2026, 1, 15, 12, 10, tzinfo=UTC),
        ),
        AiRunSummary(
            id="airun_policy_gap_check",
            workflow="Policy Gap Check",
            status="completed",
            provider="mock",
            model="mock-rag-v1",
            created_at=datetime(2026, 1, 15, 10, 5, tzinfo=UTC),
        ),
    ]
    return AiRunListResponse(data=AiRunListData(items=runs, page=1, page_size=25, total=len(runs)))
