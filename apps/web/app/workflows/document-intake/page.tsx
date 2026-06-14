import Link from "next/link";

import { startDemoDocumentIntakeWorkflow } from "@/lib/workflows";

export default function DocumentIntakeWorkflowPage() {
  const workflow = startDemoDocumentIntakeWorkflow("doc_vendor_intake", "demo.admin@example.com");
  const blockedWorkflow = startDemoDocumentIntakeWorkflow(
    "doc_contract_notes",
    "demo.admin@example.com"
  );

  if (!workflow.ok) {
    throw new Error(workflow.reason);
  }

  return (
    <main className="shell min-h-screen">
      <section className="page-header" aria-labelledby="workflow-title">
        <div>
          <p className="eyebrow">Constrained agent workflow</p>
          <h1 id="workflow-title">Document Intake Review</h1>
          <p className="lede">
            This demo workflow shows how an AI-assisted process should stay bounded: retrieve source
            chunks, generate a grounded summary, create a human review item, and write an audit
            event.
          </p>
        </div>
        <Link className="button-link" href="/dashboard">
          Back to dashboard
        </Link>
      </section>

      <section className="detail-grid" aria-label="Workflow metadata">
        <article className="metric-card">
          <span>Status</span>
          <strong>{workflow.result.status}</strong>
          <small>Human approval required</small>
        </article>
        <article className="metric-card">
          <span>AI run</span>
          <strong className="small-strong">{workflow.result.aiRunId}</strong>
          <small>Mock provider trace</small>
        </article>
        <article className="metric-card">
          <span>Audit event</span>
          <strong className="small-strong">{workflow.result.auditEvent}</strong>
          <small>Workflow start recorded</small>
        </article>
      </section>

      <section className="panel" aria-labelledby="tool-calls-title">
        <div className="panel-heading">
          <h2 id="tool-calls-title">Tool-call steps</h2>
          <span className="status-badge">Deterministic mock mode</span>
        </div>
        <div className="stack-list">
          {workflow.result.toolCalls.map((toolCall, index) => (
            <article className="queue-item" key={toolCall.name}>
              <div>
                <strong>
                  {index + 1}. {toolCall.name}
                </strong>
                <p>{toolCall.summary}</p>
              </div>
              <span className="status-badge">{toolCall.status}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="panel" aria-labelledby="blocked-title">
        <div className="panel-heading">
          <h2 id="blocked-title">Safe blocked state</h2>
          <span className="status-badge warning">Not ready</span>
        </div>
        <p className="muted-copy">
          The same workflow refuses to start for a document that is still processing:
          {!blockedWorkflow.ok ? ` ${blockedWorkflow.reason}` : " no blocker found."}
        </p>
        <Link className="button-link" href="/reviews">
          Open review queue
        </Link>
        <Link className="secondary-link" href="/audit-logs">
          View audit trail
        </Link>
      </section>
    </main>
  );
}
