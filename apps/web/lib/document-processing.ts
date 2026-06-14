import { DemoDocument, getDocumentById } from "@/lib/documents";

export type DocumentProcessingStage = {
  name: string;
  status: "completed" | "blocked";
  summary: string;
};

export type DocumentProcessingState =
  | {
      ok: true;
      document: DemoDocument;
      status: "processed";
      chunkCount: number;
      stages: DocumentProcessingStage[];
      nextStep: "ready_for_rag_indexing";
      auditEvent: "document.processed";
    }
  | {
      ok: false;
      document: DemoDocument;
      status: "blocked";
      stages: DocumentProcessingStage[];
      reason: string;
    };

export function getDemoDocumentProcessingState(documentId: string): DocumentProcessingState | null {
  const document = getDocumentById(documentId);

  if (!document) {
    return null;
  }

  if (document.status !== "ready" || document.chunks.length === 0) {
    return {
      ok: false,
      document,
      status: "blocked",
      reason: "Document is not ready for processing. Wait for extraction before chunk indexing.",
      stages: [
        {
          name: "validate_document",
          status: "completed",
          summary: "Found the document metadata in the seeded workspace."
        },
        {
          name: "extract_text",
          status: "blocked",
          summary: "Extraction is still in progress, so chunks are not available yet."
        },
        {
          name: "chunk_text",
          status: "blocked",
          summary: "Chunking waits until extracted text is available."
        },
        {
          name: "prepare_rag_index",
          status: "blocked",
          summary: "RAG indexing is deferred until chunks exist."
        }
      ]
    };
  }

  return {
    ok: true,
    document,
    status: "processed",
    chunkCount: document.chunks.length,
    stages: [
      {
        name: "validate_document",
        status: "completed",
        summary: "Confirmed the seeded document is ready for deterministic processing."
      },
      {
        name: "extract_text",
        status: "completed",
        summary: "Loaded synthetic extracted text from the demo document fixture."
      },
      {
        name: "chunk_text",
        status: "completed",
        summary: `Split extracted text into ${document.chunks.length} reviewable chunks.`
      },
      {
        name: "prepare_rag_index",
        status: "completed",
        summary: "Marked chunks as ready for pgvector indexing in the persistence phase."
      }
    ],
    nextStep: "ready_for_rag_indexing",
    auditEvent: "document.processed"
  };
}
