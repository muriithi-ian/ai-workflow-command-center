from fastapi import APIRouter
from pydantic import BaseModel

from app.models.ai_runs import RagQueryData, RagQueryRequest
from app.services.rag import run_mock_rag_query

router = APIRouter(prefix="/rag", tags=["rag"])


class RagQueryResponse(BaseModel):
    data: RagQueryData
    error: None = None


@router.post("/query", response_model=RagQueryResponse)
def query_rag(request: RagQueryRequest) -> RagQueryResponse:
    return RagQueryResponse(data=run_mock_rag_query(request))
