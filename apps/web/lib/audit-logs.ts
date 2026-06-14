export type AuditLogEntry = {
  id: string;
  action: string;
  actor: string;
  target: string;
  createdAt: string;
  metadata: Record<string, string>;
};

export const demoAuditLogs: AuditLogEntry[] = [
  {
    id: "audit_document_uploaded",
    action: "document.upload_registered",
    actor: "demo.admin@example.com",
    target: "doc_upload_synthetic_vendor_policy_md",
    createdAt: "2026-01-15T12:00:00Z",
    metadata: {
      mode: "synthetic_demo_upload",
      status: "accepted_for_processing"
    }
  },
  {
    id: "audit_document_processed",
    action: "document.processed",
    actor: "system",
    target: "doc_vendor_intake",
    createdAt: "2026-01-15T12:01:00Z",
    metadata: {
      chunkCount: "3",
      nextStep: "ready_for_rag_indexing"
    }
  },
  {
    id: "audit_rag_query_submitted",
    action: "rag.query_submitted",
    actor: "demo.admin@example.com",
    target: "airun_what_risks_a",
    createdAt: "2026-01-15T12:30:00Z",
    metadata: {
      provider: "mock",
      sourceCount: "2"
    }
  },
  {
    id: "audit_ai_run_created",
    action: "ai_run.created",
    actor: "demo.admin@example.com",
    target: "airun_vendor_risk_summary",
    createdAt: "2026-01-15T12:10:00Z",
    metadata: {
      workflow: "document_intake_review",
      status: "needs_review"
    }
  },
  {
    id: "audit_review_created",
    action: "review.created",
    actor: "system",
    target: "review_vendor_risk_summary",
    createdAt: "2026-01-15T12:12:00Z",
    metadata: {
      priority: "high",
      sourceDocumentId: "doc_vendor_intake"
    }
  },
  {
    id: "audit_review_approved",
    action: "review.approved",
    actor: "demo.reviewer@example.com",
    target: "review_vendor_risk_summary",
    createdAt: "2026-01-15T12:42:00Z",
    metadata: {
      auditability: "sources_verified",
      decision: "approved"
    }
  }
];

export function getAuditLogs(): AuditLogEntry[] {
  return demoAuditLogs;
}
