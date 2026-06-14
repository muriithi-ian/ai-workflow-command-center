from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from app.api.errors import ApiErrorResponse, not_found_response
from app.models.ai_runs import AiRunDetail, AiRunSummary
from app.services.ai_runs import get_ai_run_summaries, get_demo_ai_run

router = APIRouter(prefix="/ai-runs", tags=["ai-runs"])


class AiRunListData(BaseModel):
    items: list[AiRunSummary]
    page: int
    page_size: int
    total: int


class AiRunListResponse(BaseModel):
    data: AiRunListData
    error: None = None


class AiRunDetailResponse(BaseModel):
    data: AiRunDetail
    error: None = None


@router.get("", response_model=AiRunListResponse)
def list_ai_runs() -> AiRunListResponse:
    runs = get_ai_run_summaries()
    return AiRunListResponse(data=AiRunListData(items=runs, page=1, page_size=25, total=len(runs)))


@router.get(
    "/{run_id}",
    response_model=AiRunDetailResponse,
    responses={404: {"model": ApiErrorResponse}},
)
def get_ai_run(run_id: str) -> AiRunDetailResponse | JSONResponse:
    run = get_demo_ai_run(run_id)
    if run is None:
        return not_found_response(f"AI run '{run_id}' was not found.")

    return AiRunDetailResponse(data=run)
