from app.models.documents import DocumentDetail
from app.models.workflows import (
    DocumentIntakeWorkflowRequest,
    DocumentIntakeWorkflowResult,
    WorkflowToolCall,
)


def start_document_intake_workflow(
    document: DocumentDetail,
    request: DocumentIntakeWorkflowRequest,
) -> DocumentIntakeWorkflowResult:
    if document.status != "ready":
        raise ValueError("Document must be ready before the intake workflow can start.")

    workflow_slug = document.id.replace("doc_", "")
    return DocumentIntakeWorkflowResult(
        workflow_id=f"workflow_document_intake_{workflow_slug}",
        status="needs_review",
        document_id=document.id,
        ai_run_id=f"airun_document_intake_{workflow_slug}",
        review_id=f"review_document_intake_{workflow_slug}",
        audit_event="workflow.document_intake.started",
        tool_calls=[
            WorkflowToolCall(
                name="load_document_chunks",
                status="completed",
                summary=f"Loaded {len(document.chunks)} source chunks for grounded summarization.",
            ),
            WorkflowToolCall(
                name="generate_intake_summary",
                status="completed",
                summary=(
                    "Created a constrained mock AI summary using only retrieved document chunks."
                ),
            ),
            WorkflowToolCall(
                name="create_human_review_item",
                status="completed",
                summary=f"Created a reviewer checkpoint requested by {request.requested_by}.",
            ),
            WorkflowToolCall(
                name="write_audit_event",
                status="completed",
                summary="Recorded workflow start metadata for traceability.",
            ),
        ],
    )
