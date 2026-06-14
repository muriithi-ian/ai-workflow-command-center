from datetime import UTC, datetime

from app.models.documents import DocumentChunk, DocumentDetail, DocumentSummary


def get_demo_documents() -> list[DocumentDetail]:
    return [
        DocumentDetail(
            id="doc_vendor_intake",
            title="Vendor Intake Security Review",
            status="ready",
            chunk_count=3,
            uploaded_by="demo.admin@example.com",
            created_at=datetime(2026, 1, 12, 14, 30, tzinfo=UTC),
            source_type="seed",
            file_name="vendor-intake-security-review.md",
            summary=(
                "Security review notes for a synthetic vendor onboarding workflow, including "
                "data handling, approval blockers, and required reviewer checks."
            ),
            chunks=[
                DocumentChunk(
                    id="chunk_vendor_scope",
                    document_id="doc_vendor_intake",
                    ordinal=1,
                    heading="Scope and data access",
                    content=(
                        "The vendor will process synthetic customer support summaries for the "
                        "demo workflow. Production use would require a completed security review, "
                        "signed data processing terms, and documented retention limits."
                    ),
                    token_count=39,
                ),
                DocumentChunk(
                    id="chunk_vendor_risks",
                    document_id="doc_vendor_intake",
                    ordinal=2,
                    heading="Approval blockers",
                    content=(
                        "Open blockers include incomplete subprocesser review, missing incident "
                        "notification language, and unclear deletion timelines after contract end."
                    ),
                    token_count=28,
                ),
                DocumentChunk(
                    id="chunk_vendor_review",
                    document_id="doc_vendor_intake",
                    ordinal=3,
                    heading="Human review guidance",
                    content=(
                        "Reviewer approval should confirm that the AI summary cites source text, "
                        "does not infer unlisted controls, and flags unresolved security terms."
                    ),
                    token_count=31,
                ),
            ],
        ),
        DocumentDetail(
            id="doc_policy_update",
            title="Data Retention Policy Update",
            status="ready",
            chunk_count=3,
            uploaded_by="demo.reviewer@example.com",
            created_at=datetime(2026, 1, 14, 9, 15, tzinfo=UTC),
            source_type="seed",
            file_name="data-retention-policy-update.md",
            summary=(
                "Synthetic policy update describing retention windows, deletion review, and "
                "audit evidence expectations for AI-assisted document workflows."
            ),
            chunks=[
                DocumentChunk(
                    id="chunk_policy_window",
                    document_id="doc_policy_update",
                    ordinal=1,
                    heading="Retention window",
                    content=(
                        "Demo documents may be retained for 30 days in local development. "
                        "Production retention must follow customer configuration and legal holds."
                    ),
                    token_count=27,
                ),
                DocumentChunk(
                    id="chunk_policy_deletion",
                    document_id="doc_policy_update",
                    ordinal=2,
                    heading="Deletion workflow",
                    content=(
                        "Deletion requests should remove document files, extracted text, chunks, "
                        "embeddings, review records, and non-required AI run payloads."
                    ),
                    token_count=27,
                ),
                DocumentChunk(
                    id="chunk_policy_audit",
                    document_id="doc_policy_update",
                    ordinal=3,
                    heading="Audit evidence",
                    content=(
                        "The system should record who requested deletion, when it completed, "
                        "and whether any records were retained for compliance reasons."
                    ),
                    token_count=28,
                ),
            ],
        ),
        DocumentDetail(
            id="doc_contract_notes",
            title="Contract Exception Notes",
            status="processing",
            chunk_count=0,
            uploaded_by="demo.admin@example.com",
            created_at=datetime(2026, 1, 15, 11, 45, tzinfo=UTC),
            source_type="seed",
            file_name="contract-exception-notes.md",
            summary=(
                "Synthetic notes representing a document still moving through extraction and "
                "chunking. It intentionally has no chunks yet."
            ),
            chunks=[],
        ),
    ]


def get_document_summaries() -> list[DocumentSummary]:
    return [
        DocumentSummary(
            id=document.id,
            title=document.title,
            status=document.status,
            chunk_count=len(document.chunks),
            uploaded_by=document.uploaded_by,
            created_at=document.created_at,
        )
        for document in get_demo_documents()
    ]


def get_demo_document(document_id: str) -> DocumentDetail | None:
    return next(
        (document for document in get_demo_documents() if document.id == document_id),
        None,
    )
