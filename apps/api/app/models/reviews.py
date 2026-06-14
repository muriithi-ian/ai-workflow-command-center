from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field

ReviewStatus = Literal["pending", "approved", "rejected", "changes_requested"]
ReviewDecision = Literal["approved", "rejected", "changes_requested"]


class ReviewItem(BaseModel):
    id: str
    title: str
    status: ReviewStatus
    priority: Literal["low", "medium", "high"]
    source_document_id: str
    ai_run_id: str
    created_at: datetime


class ReviewDecisionRequest(BaseModel):
    decision: ReviewDecision
    reviewer_note: str = Field(min_length=3, max_length=500)
    reviewer_email: str = Field(min_length=3, max_length=180)


class ReviewDecisionResult(BaseModel):
    review: ReviewItem
    reviewer_email: str
    reviewer_note: str
    decided_at: datetime
    audit_event: str
