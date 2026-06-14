import Link from "next/link";
import { notFound } from "next/navigation";

import { demoDocuments, formatDocumentDate, getDocumentById } from "@/lib/documents";

type DocumentDetailPageProps = {
  params: Promise<{
    documentId: string;
  }>;
};

export function generateStaticParams() {
  return demoDocuments.map((document) => ({
    documentId: document.id
  }));
}

export default async function DocumentDetailPage({ params }: DocumentDetailPageProps) {
  const { documentId } = await params;
  const document = getDocumentById(documentId);

  if (!document) {
    notFound();
  }

  return (
    <main className="shell min-h-screen">
      <section className="page-header" aria-labelledby="document-title">
        <div>
          <p className="eyebrow">Document detail</p>
          <h1 id="document-title">{document.title}</h1>
          <p className="lede">{document.summary}</p>
        </div>
        <Link className="button-link" href="/documents">
          Back to documents
        </Link>
      </section>

      <section className="detail-grid" aria-label="Document metadata">
        <article className="metric-card">
          <span>Status</span>
          <strong>{document.status}</strong>
          <small>{document.sourceType} source</small>
        </article>
        <article className="metric-card">
          <span>Chunks</span>
          <strong>{document.chunks.length}</strong>
          <small>Ready for RAG retrieval</small>
        </article>
        <article className="metric-card">
          <span>Uploaded by</span>
          <strong className="small-strong">{document.uploadedBy}</strong>
          <small>{formatDocumentDate(document.createdAt)}</small>
        </article>
      </section>

      <section className="panel" aria-labelledby="source-title">
        <div className="panel-heading">
          <h2 id="source-title">Source file</h2>
          <span className="status-badge">{document.fileName}</span>
        </div>
        <p className="muted-copy">
          This is synthetic seed content. Upload handling, file validation, and Supabase Storage are
          intentionally deferred to the document upload chunk.
        </p>
        {document.status === "ready" ? (
          <Link className="button-link" href="/workflows/document-intake">
            Start intake workflow
          </Link>
        ) : null}
      </section>

      <section className="panel" aria-labelledby="chunks-title">
        <div className="panel-heading">
          <h2 id="chunks-title">Extracted chunks</h2>
          <span className="status-badge">Source snippets</span>
        </div>

        {document.chunks.length === 0 ? (
          <div className="empty-state">
            <strong>Processing not complete</strong>
            <p>Chunks will appear after text extraction and chunking finish.</p>
          </div>
        ) : (
          <div className="chunk-list">
            {document.chunks.map((chunk) => (
              <article className="chunk-card" key={chunk.id}>
                <div className="panel-heading">
                  <h3>
                    {chunk.ordinal}. {chunk.heading}
                  </h3>
                  <span className="status-badge">{chunk.tokenCount} tokens</span>
                </div>
                <p>{chunk.content}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
