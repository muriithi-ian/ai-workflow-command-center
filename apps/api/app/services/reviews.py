from datetime import UTC, datetime

from app.models.reviews import ReviewDecisionRequest, ReviewDecisionResult, ReviewItem


def get_demo_reviews() -> list[ReviewItem]:
    return [
        ReviewItem(
            id="review_vendor_risk_summary",
            title="Review AI vendor risk summary",
            status="pending",
            priority="high",
            source_document_id="doc_vendor_intake",
            ai_run_id="airun_vendor_risk_summary",
            created_at=datetime(2026, 1, 15, 12, 12, tzinfo=UTC),
        ),
        ReviewItem(
            id="review_contract_exception",
            title="Confirm contract exception classification",
            status="pending",
            priority="medium",
            source_document_id="doc_contract_notes",
            ai_run_id="airun_contract_exception",
            created_at=datetime(2026, 1, 15, 12, 25, tzinfo=UTC),
        ),
        ReviewItem(
            id="review_policy_gap_completed",
            title="Approved policy gap summary",
            status="approved",
            priority="low",
            source_document_id="doc_policy_update",
            ai_run_id="airun_policy_gap_check",
            created_at=datetime(2026, 1, 15, 10, 15, tzinfo=UTC),
        ),
    ]


def get_demo_review(review_id: str) -> ReviewItem | None:
    return next((review for review in get_demo_reviews() if review.id == review_id), None)


def decide_review(
    review: ReviewItem,
    request: ReviewDecisionRequest,
) -> ReviewDecisionResult:
    if review.status != "pending":
        raise ValueError("Review decision cannot be changed after it leaves the pending state.")

    decided_review = review.model_copy(update={"status": request.decision})
    return ReviewDecisionResult(
        review=decided_review,
        reviewer_email=request.reviewer_email,
        reviewer_note=request.reviewer_note,
        decided_at=datetime.now(UTC),
        audit_event=f"review.{request.decision}",
    )
