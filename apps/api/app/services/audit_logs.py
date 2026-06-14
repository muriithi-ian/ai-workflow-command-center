from datetime import UTC, datetime

from app.models.audit_logs import AuditLogEntry


def get_demo_audit_logs() -> list[AuditLogEntry]:
    return [
        AuditLogEntry(
            id="audit_document_uploaded",
            action="document.upload_registered",
            actor="demo.admin@example.com",
            target="doc_upload_synthetic_vendor_policy_md",
            created_at=datetime(2026, 1, 15, 11, 50, tzinfo=UTC),
            metadata={"mode": "metadata_only", "status": "queued"},
        ),
        AuditLogEntry(
            id="audit_document_processed",
            action="document.processed",
            actor="system",
            target="doc_vendor_intake",
            created_at=datetime(2026, 1, 15, 12, 1, tzinfo=UTC),
            metadata={"chunk_count": "3", "next_step": "ready_for_rag_indexing"},
        ),
        AuditLogEntry(
            id="audit_rag_query_submitted",
            action="rag.query_submitted",
            actor="demo.admin@example.com",
            target="airun_what_risks_a",
            created_at=datetime(2026, 1, 15, 12, 5, tzinfo=UTC),
            metadata={"provider": "mock", "source_count": "3"},
        ),
        AuditLogEntry(
            id="audit_ai_run_created",
            action="ai_run.created",
            actor="demo.admin@example.com",
            target="airun_vendor_risk_summary",
            created_at=datetime(2026, 1, 15, 12, 10, tzinfo=UTC),
            metadata={"workflow": "Document Intake Review", "status": "needs_review"},
        ),
        AuditLogEntry(
            id="audit_review_created",
            action="review.created",
            actor="system",
            target="review_vendor_risk_summary",
            created_at=datetime(2026, 1, 15, 12, 12, tzinfo=UTC),
            metadata={"priority": "high", "source_document_id": "doc_vendor_intake"},
        ),
        AuditLogEntry(
            id="audit_review_approved",
            action="review.approved",
            actor="demo.reviewer@example.com",
            target="review_vendor_risk_summary",
            created_at=datetime(2026, 1, 15, 12, 18, tzinfo=UTC),
            metadata={"auditability": "human_decision", "decision": "approved"},
        ),
    ]
