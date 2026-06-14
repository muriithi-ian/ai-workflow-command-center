import Link from "next/link";
import { notFound } from "next/navigation";

import { demoAiRuns, getAiRunById } from "@/lib/ai-runs";
import { formatDocumentDate } from "@/lib/documents";

type AiRunDetailPageProps = {
  params: Promise<{
    runId: string;
  }>;
};

export function generateStaticParams() {
  return demoAiRuns.map((run) => ({
    runId: run.id
  }));
}

export default async function AiRunDetailPage({ params }: AiRunDetailPageProps) {
  const { runId } = await params;
  const run = getAiRunById(runId);

  if (!run) {
    notFound();
  }

  return (
    <main className="shell min-h-screen">
      <section className="page-header" aria-labelledby="ai-run-title">
        <div>
          <p className="eyebrow">AI run detail</p>
          <h1 id="ai-run-title">{run.workflow}</h1>
          <p className="lede">{run.inputSummary}</p>
        </div>
        <Link className="button-link" href="/ai-runs">
          Back to AI runs
        </Link>
      </section>

      <section className="detail-grid" aria-label="AI run metadata">
        <article className="metric-card">
          <span>Status</span>
          <strong>{run.status}</strong>
          <small>{formatDocumentDate(run.createdAt)}</small>
        </article>
        <article className="metric-card">
          <span>Provider</span>
          <strong>{run.provider}</strong>
          <small>{run.model}</small>
        </article>
        <article className="metric-card">
          <span>Sources</span>
          <strong>{run.retrievedContext.length}</strong>
          <small>retrieved context chunks</small>
        </article>
      </section>

      <section className="panel" aria-labelledby="run-output-title">
        <div className="panel-heading">
          <h2 id="run-output-title">Output</h2>
          <span className="status-badge">{run.id}</span>
        </div>
        <p className="answer-copy">{run.output}</p>
      </section>

      <section className="panel" aria-labelledby="context-title">
        <div className="panel-heading">
          <h2 id="context-title">Retrieved context</h2>
          <span className="status-badge">Source grounding</span>
        </div>
        {run.retrievedContext.length === 0 ? (
          <div className="empty-state">
            <strong>No retrieved chunks</strong>
            <p>
              This run either needs human review or intentionally demonstrates fallback behavior.
            </p>
          </div>
        ) : (
          <div className="chunk-list">
            {run.retrievedContext.map((source) => (
              <article className="chunk-card" key={source.chunkId}>
                <div className="panel-heading">
                  <h3>{source.heading}</h3>
                  <span className="status-badge">score {source.score}</span>
                </div>
                <p>{source.snippet}</p>
                <div className="metadata-list" aria-label="Retrieval evidence">
                  <span>{source.embeddingId}</span>
                  <span>{source.retrievalReason}</span>
                  <span>terms: {source.matchedTerms.join(", ")}</span>
                </div>
                <Link className="table-link" href={`/documents/${source.documentId}`}>
                  {source.documentTitle}
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {run.errors.length > 0 ? (
        <section className="panel" aria-labelledby="errors-title">
          <div className="panel-heading">
            <h2 id="errors-title">Failure notes</h2>
            <span className="status-badge warning">Visible fallback</span>
          </div>
          <ul className="clean-list">
            {run.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
