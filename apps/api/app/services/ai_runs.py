from datetime import UTC, datetime

from app.models.ai_runs import AiRunDetail, AiRunSummary, RagQueryRequest
from app.services.rag import run_mock_rag_query


def get_demo_ai_runs() -> list[AiRunDetail]:
    rag_run = run_mock_rag_query(
        RagQueryRequest(
            question="What risks are mentioned in the vendor onboarding document?",
            document_ids=["doc_vendor_intake"],
        )
    )
    no_context_run = run_mock_rag_query(
        RagQueryRequest(question="What does the demo say about lunar agriculture?")
    )

    return [
        AiRunDetail(
            id=rag_run.ai_run_id,
            workflow="RAG Question Answering",
            status=rag_run.status,
            provider=rag_run.provider,
            model=rag_run.model,
            created_at=rag_run.created_at,
            input_summary=rag_run.input_summary,
            output=rag_run.answer,
            retrieved_context=rag_run.sources,
            errors=[],
        ),
        AiRunDetail(
            id="airun_vendor_risk_summary",
            workflow="Document Intake Review",
            status="needs_review",
            provider="mock",
            model="mock-rag-v1",
            created_at=datetime(2026, 1, 15, 12, 10, tzinfo=UTC),
            input_summary="Summarize vendor onboarding risks for human review.",
            output=(
                "The vendor review has unresolved subprocesser, incident notification, and "
                "deletion timeline questions that should be reviewed before approval."
            ),
            retrieved_context=[],
            errors=[],
        ),
        AiRunDetail(
            id=no_context_run.ai_run_id,
            workflow="RAG Question Answering",
            status=no_context_run.status,
            provider=no_context_run.provider,
            model=no_context_run.model,
            created_at=no_context_run.created_at,
            input_summary=no_context_run.input_summary,
            output=no_context_run.answer,
            retrieved_context=no_context_run.sources,
            errors=["No matching seed chunks were retrieved for the question."],
        ),
    ]


def get_ai_run_summaries() -> list[AiRunSummary]:
    return [
        AiRunSummary(
            id=run.id,
            workflow=run.workflow,
            status=run.status,
            provider=run.provider,
            model=run.model,
            created_at=run.created_at,
            input_summary=run.input_summary,
        )
        for run in get_demo_ai_runs()
    ]


def get_demo_ai_run(run_id: str) -> AiRunDetail | None:
    return next((run for run in get_demo_ai_runs() if run.id == run_id), None)
