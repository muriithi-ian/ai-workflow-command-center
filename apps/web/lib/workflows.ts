import { getDocumentById } from "@/lib/documents";

export type WorkflowToolCall = {
  name: string;
  status: "completed" | "skipped" | "failed";
  summary: string;
};

export type DocumentIntakeWorkflowResult = {
  workflowId: string;
  status: "needs_review";
  documentId: string;
  aiRunId: string;
  reviewId: string;
  auditEvent: string;
  toolCalls: WorkflowToolCall[];
};

export type DocumentIntakeWorkflowStart =
  | {
      ok: true;
      result: DocumentIntakeWorkflowResult;
    }
  | {
      ok: false;
      reason: string;
    };

export function startDemoDocumentIntakeWorkflow(
  documentId: string,
  requestedBy: string
): DocumentIntakeWorkflowStart {
  const document = getDocumentById(documentId);

  if (!document) {
    return {
      ok: false,
      reason: `Document ${documentId} was not found.`
    };
  }

  if (document.status !== "ready") {
    return {
      ok: false,
      reason: "Document must be ready before the intake workflow can start."
    };
  }

  const workflowSlug = document.id.replace("doc_", "");
  return {
    ok: true,
    result: {
      workflowId: `workflow_document_intake_${workflowSlug}`,
      status: "needs_review",
      documentId: document.id,
      aiRunId: `airun_document_intake_${workflowSlug}`,
      reviewId: `review_document_intake_${workflowSlug}`,
      auditEvent: "workflow.document_intake.started",
      toolCalls: [
        {
          name: "load_document_chunks",
          status: "completed",
          summary: `Loaded ${document.chunks.length} source chunks for grounded summarization.`
        },
        {
          name: "generate_intake_summary",
          status: "completed",
          summary: "Created a constrained mock AI summary using only retrieved document chunks."
        },
        {
          name: "create_human_review_item",
          status: "completed",
          summary: `Created a reviewer checkpoint requested by ${requestedBy}.`
        },
        {
          name: "write_audit_event",
          status: "completed",
          summary: "Recorded workflow start metadata for traceability."
        }
      ]
    }
  };
}
