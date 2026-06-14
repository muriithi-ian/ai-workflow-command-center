from typing import Literal

from pydantic import BaseModel, Field


class DocumentIntakeWorkflowRequest(BaseModel):
    document_id: str = Field(min_length=3, max_length=120)
    requested_by: str = Field(min_length=3, max_length=180)


class WorkflowToolCall(BaseModel):
    name: str
    status: Literal["completed", "skipped", "failed"]
    summary: str


class DocumentIntakeWorkflowResult(BaseModel):
    workflow_id: str
    status: Literal["needs_review"]
    document_id: str
    ai_run_id: str
    review_id: str
    audit_event: str
    tool_calls: list[WorkflowToolCall]
