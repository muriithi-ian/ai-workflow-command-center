from fastapi import APIRouter
from pydantic import BaseModel

from app.models.ai_runs import RagQueryData, RagQueryRequest
from app.models.rag_index import RagIndexStatus
from app.services.demo_documents import get_demo_documents
from app.services.embeddings import build_rag_index_status
from app.services.rag import run_mock_rag_query

router = APIRouter(prefix="/rag", tags=["rag"])


class RagQueryResponse(BaseModel):
    data: RagQueryData
    error: None = None


class RagIndexStatusResponse(BaseModel):
    data: RagIndexStatus
    error: None = None


@router.get("/index", response_model=RagIndexStatusResponse)
def get_rag_index_status() -> RagIndexStatusResponse:
    return RagIndexStatusResponse(data=build_rag_index_status(get_demo_documents()))


@router.post("/query", response_model=RagQueryResponse)
def query_rag(request: RagQueryRequest) -> RagQueryResponse:
    return RagQueryResponse(data=run_mock_rag_query(request))
