const metrics = [
  { label: "Documents", value: "0" },
  { label: "AI runs", value: "0" },
  { label: "Pending reviews", value: "0" },
  { label: "Audit events", value: "0" }
];

const workflowSteps = [
  "Upload synthetic documents",
  "Extract and chunk text",
  "Ask grounded RAG questions",
  "Route AI output to review",
  "Record decisions in audit logs"
];

export default function HomePage() {
  return (
    <main className="shell min-h-screen">
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">Portfolio MVP scaffold</p>
        <h1 id="page-title">AI Workflow Command Center</h1>
        <p className="lede">
          A production-style dashboard for document ingestion, RAG search, AI workflow review, and
          auditability.
        </p>
      </section>

      <section className="metrics" aria-label="Dashboard metrics">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </section>

      <section className="panel" aria-labelledby="workflow-title">
        <h2 id="workflow-title">MVP workflow</h2>
        <ol>
          {workflowSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
