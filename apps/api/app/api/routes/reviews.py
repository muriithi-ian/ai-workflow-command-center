from datetime import UTC, datetime
from typing import Literal

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/reviews", tags=["reviews"])

ReviewStatus = Literal["pending", "approved", "rejected", "changes_requested"]


class ReviewItem(BaseModel):
    id: str
    title: str
    status: ReviewStatus
    priority: Literal["low", "medium", "high"]
    source_document_id: str
    created_at: datetime


class ReviewListData(BaseModel):
    items: list[ReviewItem]
    page: int
    page_size: int
    total: int


class ReviewListResponse(BaseModel):
    data: ReviewListData
    error: None = None


@router.get("", response_model=ReviewListResponse)
def list_reviews() -> ReviewListResponse:
    reviews = [
        ReviewItem(
            id="review_vendor_risk_summary",
            title="Review AI vendor risk summary",
            status="pending",
            priority="high",
            source_document_id="doc_vendor_intake",
            created_at=datetime(2026, 1, 15, 12, 12, tzinfo=UTC),
        ),
        ReviewItem(
            id="review_contract_exception",
            title="Confirm contract exception classification",
            status="pending",
            priority="medium",
            source_document_id="doc_contract_notes",
            created_at=datetime(2026, 1, 15, 12, 25, tzinfo=UTC),
        ),
    ]
    return ReviewListResponse(
        data=ReviewListData(items=reviews, page=1, page_size=25, total=len(reviews))
    )
