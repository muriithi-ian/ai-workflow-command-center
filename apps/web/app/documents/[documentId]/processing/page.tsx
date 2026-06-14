import Link from "next/link";
import { notFound } from "next/navigation";

import { demoDocuments } from "@/lib/documents";
import { getDemoDocumentProcessingState } from "@/lib/document-processing";

type DocumentProcessingPageProps = {
  params: Promise<{
    documentId: string;
  }>;
};

export function generateStaticParams() {
  return demoDocuments.map((document) => ({
    documentId: document.id
  }));
}

export default async function DocumentProcessingPage({ params }: DocumentProcessingPageProps) {
  const { documentId } = await params;
  const processing = getDemoDocumentProcessingState(documentId);

  if (!processing) {
    notFound();
  }

  return (
    <main className="shell min-h-screen">
      <section className="page-header" aria-labelledby="processing-title">
        <div>
          <p className="eyebrow">Document processing</p>
          <h1 id="processing-title">{processing.document.title}</h1>
          <p className="lede">
            Follow the local deterministic ingestion pipeline from metadata validation through text
            extraction, chunking, and RAG index readiness.
          </p>
        </div>
        <Link className="button-link" href={`/documents/${processing.document.id}`}>
          Back to document
        </Link>
      </section>

      <section className="detail-grid" aria-label="Processing summary">
        <article className="metric-card">
          <span>Processing status</span>
          <strong>{processing.status}</strong>
          <small>{processing.ok ? processing.nextStep : processing.reason}</small>
        </article>
        <article className="metric-card">
          <span>Chunks</span>
          <strong>{processing.ok ? processing.chunkCount : 0}</strong>
          <small>{processing.ok ? "Ready for retrieval" : "Waiting for extraction"}</small>
        </article>
        <article className="metric-card">
          <span>Audit event</span>
          <strong className="small-strong">
            {processing.ok ? processing.auditEvent : "document.processing_blocked"}
          </strong>
          <small>Shown as structured workflow evidence</small>
        </article>
      </section>

      <section className="panel" aria-labelledby="stages-title">
        <div className="panel-heading">
          <h2 id="stages-title">Pipeline stages</h2>
          <span className={`status-badge ${processing.ok ? "" : "warning"}`}>
            {processing.ok ? "Complete" : "Blocked"}
          </span>
        </div>
        <div className="stack-list">
          {processing.stages.map((stage, index) => (
            <article className="queue-item" key={stage.name}>
              <div>
                <strong>
                  {index + 1}. {stage.name}
                </strong>
                <p>{stage.summary}</p>
              </div>
              <span className={`status-badge ${stage.status === "blocked" ? "warning" : ""}`}>
                {stage.status}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="panel" aria-labelledby="next-step-title">
        <div className="panel-heading">
          <h2 id="next-step-title">Next step</h2>
          <span className="status-badge">Phase 2 local mode</span>
        </div>
        <p className="muted-copy">
          In local mock mode, processing state is deterministic and does not write files. With
          Supabase credentials, the same boundaries become storage writes, database rows, chunk
          inserts, embedding jobs, and audit events.
        </p>
        {processing.ok ? (
          <Link className="button-link" href="/rag">
            Ask a RAG question
          </Link>
        ) : (
          <Link className="button-link" href="/documents/upload">
            Register another upload
          </Link>
        )}
      </section>
    </main>
  );
}
