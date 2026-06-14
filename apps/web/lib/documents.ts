export type DocumentStatus = "queued" | "processing" | "ready" | "failed";

export type DemoDocumentChunk = {
  id: string;
  documentId: string;
  ordinal: number;
  heading: string;
  content: string;
  tokenCount: number;
};

export type DemoDocument = {
  id: string;
  title: string;
  status: DocumentStatus;
  uploadedBy: string;
  createdAt: string;
  sourceType: "seed" | "upload";
  fileName: string;
  summary: string;
  chunks: DemoDocumentChunk[];
};

export const demoDocuments: DemoDocument[] = [
  {
    id: "doc_vendor_intake",
    title: "Vendor Intake Security Review",
    status: "ready",
    uploadedBy: "demo.admin@example.com",
    createdAt: "2026-01-12T14:30:00Z",
    sourceType: "seed",
    fileName: "vendor-intake-security-review.md",
    summary:
      "Security review notes for a synthetic vendor onboarding workflow, including data handling, approval blockers, and required reviewer checks.",
    chunks: [
      {
        id: "chunk_vendor_scope",
        documentId: "doc_vendor_intake",
        ordinal: 1,
        heading: "Scope and data access",
        content:
          "The vendor will process synthetic customer support summaries for the demo workflow. Production use would require a completed security review, signed data processing terms, and documented retention limits.",
        tokenCount: 39
      },
      {
        id: "chunk_vendor_risks",
        documentId: "doc_vendor_intake",
        ordinal: 2,
        heading: "Approval blockers",
        content:
          "Open blockers include incomplete subprocesser review, missing incident notification language, and unclear deletion timelines after contract end.",
        tokenCount: 28
      },
      {
        id: "chunk_vendor_review",
        documentId: "doc_vendor_intake",
        ordinal: 3,
        heading: "Human review guidance",
        content:
          "Reviewer approval should confirm that the AI summary cites source text, does not infer unlisted controls, and flags unresolved security terms.",
        tokenCount: 31
      }
    ]
  },
  {
    id: "doc_policy_update",
    title: "Data Retention Policy Update",
    status: "ready",
    uploadedBy: "demo.reviewer@example.com",
    createdAt: "2026-01-14T09:15:00Z",
    sourceType: "seed",
    fileName: "data-retention-policy-update.md",
    summary:
      "Synthetic policy update describing retention windows, deletion review, and audit evidence expectations for AI-assisted document workflows.",
    chunks: [
      {
        id: "chunk_policy_window",
        documentId: "doc_policy_update",
        ordinal: 1,
        heading: "Retention window",
        content:
          "Demo documents may be retained for 30 days in local development. Production retention must follow customer configuration and legal holds.",
        tokenCount: 27
      },
      {
        id: "chunk_policy_deletion",
        documentId: "doc_policy_update",
        ordinal: 2,
        heading: "Deletion workflow",
        content:
          "Deletion requests should remove document files, extracted text, chunks, embeddings, review records, and non-required AI run payloads.",
        tokenCount: 27
      },
      {
        id: "chunk_policy_audit",
        documentId: "doc_policy_update",
        ordinal: 3,
        heading: "Audit evidence",
        content:
          "The system should record who requested deletion, when it completed, and whether any records were retained for compliance reasons.",
        tokenCount: 28
      }
    ]
  },
  {
    id: "doc_contract_notes",
    title: "Contract Exception Notes",
    status: "processing",
    uploadedBy: "demo.admin@example.com",
    createdAt: "2026-01-15T11:45:00Z",
    sourceType: "seed",
    fileName: "contract-exception-notes.md",
    summary:
      "Synthetic notes representing a document still moving through extraction and chunking. It intentionally has no chunks yet.",
    chunks: []
  }
];

export function getDocumentSummaries(): DemoDocument[] {
  return demoDocuments;
}

export function getDocumentById(documentId: string): DemoDocument | undefined {
  return demoDocuments.find((document) => document.id === documentId);
}

export function formatDocumentDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(isoDate));
}
