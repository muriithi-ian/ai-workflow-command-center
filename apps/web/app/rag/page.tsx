import Link from "next/link";

import { getDefaultRagQuestion, getFrontendRagIndexStatus, runFrontendMockRag } from "@/lib/rag";

export default function RagSearchPage() {
  const question = getDefaultRagQuestion();
  const result = runFrontendMockRag(question);
  const emptyResult = runFrontendMockRag("What does the demo say about lunar agriculture?");
  const indexStatus = getFrontendRagIndexStatus();

  return (
    <main className="shell min-h-screen">
      <section className="page-header" aria-labelledby="rag-title">
        <div>
          <p className="eyebrow">Mock RAG workflow</p>
          <h1 id="rag-title">Grounded AI search</h1>
          <p className="lede">
            This page demonstrates the public-demo RAG behavior with deterministic mock output,
            source snippets, and AI run metadata. The backend exposes the same shape at
            <code> /api/rag/query</code>.
          </p>
        </div>
        <Link className="button-link" href="/dashboard">
          Back to dashboard
        </Link>
      </section>

      <section className="rag-layout">
        <article className="panel" aria-labelledby="rag-query-title">
          <div className="panel-heading">
            <h2 id="rag-query-title">Demo query</h2>
            <span className="status-badge">{indexStatus.status}</span>
          </div>
          <form className="demo-form">
            <label htmlFor="rag-question">Question</label>
            <textarea id="rag-question" name="question" readOnly rows={4} value={question} />
            <p className="muted-copy">
              Interactive querying will be wired after the API client/auth layer. For now this stays
              deterministic for demos and tests.
            </p>
          </form>
          <div className="run-meta" aria-label="RAG index metadata">
            <span>{indexStatus.model}</span>
            <span>{indexStatus.dimensions} dimensions</span>
            <span>{indexStatus.chunkCount} indexed chunks</span>
          </div>
        </article>

        <article className="panel" aria-labelledby="rag-answer-title">
          <div className="panel-heading">
            <h2 id="rag-answer-title">Answer</h2>
            <span className="status-badge">{result.status}</span>
          </div>
          <p className="answer-copy">{result.answer}</p>
          <div className="run-meta" aria-label="AI run metadata">
            <span>{result.aiRunId}</span>
            <span>{result.provider}</span>
            <span>{result.model}</span>
          </div>
        </article>
      </section>

      <section className="panel" aria-labelledby="sources-title">
        <div className="panel-heading">
          <h2 id="sources-title">Source snippets</h2>
          <span className="status-badge">Grounded context</span>
        </div>
        <div className="chunk-list">
          {result.sources.map((source) => (
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
      </section>

      <section className="panel" aria-labelledby="index-title">
        <div className="panel-heading">
          <h2 id="index-title">Mock embedding index</h2>
          <span className="status-badge">pgvector-ready shape</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Chunk</th>
                <th scope="col">Embedding</th>
                <th scope="col">Tokens</th>
                <th scope="col">Vector preview</th>
              </tr>
            </thead>
            <tbody>
              {indexStatus.items.slice(0, 4).map((item) => (
                <tr key={item.embeddingId}>
                  <td>{item.heading}</td>
                  <td>{item.embeddingId}</td>
                  <td>{item.tokenCount}</td>
                  <td>{item.vectorPreview.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel" aria-labelledby="fallback-title">
        <div className="panel-heading">
          <h2 id="fallback-title">No-context fallback</h2>
          <span className="status-badge warning">{emptyResult.status}</span>
        </div>
        <p className="muted-copy">{emptyResult.answer}</p>
      </section>
    </main>
  );
}
