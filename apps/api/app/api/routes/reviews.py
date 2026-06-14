from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from app.api.errors import ApiErrorResponse, not_found_response, review_state_conflict_response
from app.models.reviews import ReviewDecisionRequest, ReviewDecisionResult, ReviewItem
from app.services.reviews import decide_review, get_demo_review, get_demo_reviews

router = APIRouter(prefix="/reviews", tags=["reviews"])


class ReviewListData(BaseModel):
    items: list[ReviewItem]
    page: int
    page_size: int
    total: int


class ReviewListResponse(BaseModel):
    data: ReviewListData
    error: None = None


class ReviewDecisionResponse(BaseModel):
    data: ReviewDecisionResult
    error: None = None


@router.get("", response_model=ReviewListResponse)
def list_reviews() -> ReviewListResponse:
    reviews = get_demo_reviews()
    return ReviewListResponse(
        data=ReviewListData(items=reviews, page=1, page_size=25, total=len(reviews))
    )


@router.post(
    "/{review_id}/decision",
    response_model=ReviewDecisionResponse,
    responses={404: {"model": ApiErrorResponse}, 409: {"model": ApiErrorResponse}},
)
def create_review_decision(
    review_id: str,
    request: ReviewDecisionRequest,
) -> ReviewDecisionResponse | JSONResponse:
    review = get_demo_review(review_id)
    if review is None:
        return not_found_response(f"Review '{review_id}' was not found.")

    try:
        result = decide_review(review, request)
    except ValueError as error:
        return review_state_conflict_response(str(error))

    return ReviewDecisionResponse(data=result)
