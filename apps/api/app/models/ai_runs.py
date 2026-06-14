from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class RagQueryRequest(BaseModel):
    question: str = Field(min_length=3, max_length=500)
    document_ids: list[str] = Field(default_factory=list, max_length=10)


class RagSource(BaseModel):
    document_id: str
    document_title: str
    chunk_id: str
    heading: str
    snippet: str
    score: float


class RagQueryData(BaseModel):
    answer: str
    sources: list[RagSource]
    ai_run_id: str
    status: Literal["completed", "no_context"]
    provider: Literal["mock"]
    model: str
    created_at: datetime
    input_summary: str
