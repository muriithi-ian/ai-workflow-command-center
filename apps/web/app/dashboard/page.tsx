import Link from "next/link";

import { getAuditLogs } from "@/lib/audit-logs";
import { getDemoSession, hasRole } from "@/lib/auth";
import { getDashboardMetrics } from "@/lib/dashboard";
import { getDocumentSummaries } from "@/lib/documents";
import { getRuntimeEnvironment } from "@/lib/env";

const reviewQueue = [
  {
    title: "Review AI vendor risk summary",
    priority: "High",
    source: "Vendor Intake Security Review"
  },
  {
    title: "Confirm contract exception classification",
    priority: "Medium",
    source: "Contract Exception Notes"
  }
];

export default function DashboardPage() {
  const runtime = getRuntimeEnvironment();
  const session = getDemoSession();
  const metrics = getDashboardMetrics();
  const documents = getDocumentSummaries();
  const auditEvents = getAuditLogs().slice(0, 3);

  return (
    <main className="dashboard-shell">
      <aside className="sidebar" aria-label="Primary navigation">
        <Link className="brand" href="/">
          AI Workflow
        </Link>
        <nav>
          <a aria-current="page" href="/dashboard">
            Dashboard
          </a>
          <Link href="/login">Login</Link>
          <Link href="/documents">Documents</Link>
          <Link href="/rag">RAG search</Link>
          <Link href="/ai-runs">AI runs</Link>
          <Link href="/workflows/document-intake">Workflow</Link>
          <Link href="/reviews">Reviews</Link>
          <Link href="/audit-logs">Audit logs</Link>
        </nav>
      </aside>

      <section className="dashboard-main" aria-labelledby="dashboard-title">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Phase 1 foundation</p>
            <h1 id="dashboard-title">Command center dashboard</h1>
            <p className="lede">
              Synthetic demo data shows the intended document, RAG, review, and audit workflow
              before Supabase auth and persistence are wired in.
            </p>
          </div>
          <div className="mode-card" aria-label="Demo mode">
            <span>AI mode</span>
            <strong>{runtime.aiMode}</strong>
            <small>
              {runtime.supabaseConfigured ? "Supabase configured" : "Demo data, no database yet"}
            </small>
          </div>
        </header>

        <section className="auth-card" aria-label="Current demo session">
          <div>
            <span className="eyebrow">Protected dashboard scaffold</span>
            <h2>{session.user.displayName}</h2>
            <p>{session.user.email}</p>
          </div>
          <div className="role-list" aria-label="Current user roles">
            {session.user.roles.map((role) => (
              <span className="status-badge" key={role}>
                {role}
              </span>
            ))}
          </div>
          <p className="muted-copy">
            Reviewer access: {hasRole(session.user, "reviewer") ? "enabled" : "disabled"} · Admin
            access: {hasRole(session.user, "admin") ? "enabled" : "disabled"}
          </p>
        </section>

        <section className="metrics" aria-label="Dashboard metrics">
          {metrics.map((metric) => (
            <article className="metric-card" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.detail}</small>
            </article>
          ))}
        </section>

        <section className="dashboard-grid">
          <article className="panel" id="documents" aria-labelledby="documents-title">
            <div className="panel-heading">
              <h2 id="documents-title">Documents</h2>
              <span className="status-badge">Success state</span>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Document</th>
                    <th scope="col">Status</th>
                    <th scope="col">Owner</th>
                    <th scope="col">Chunks</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((document) => (
                    <tr key={document.title}>
                      <td>
                        <Link className="table-link" href={`/documents/${document.id}`}>
                          {document.title}
                        </Link>
                      </td>
                      <td>
                        <span
                          className={`status-badge ${
                            document.status === "processing" ? "warning" : ""
                          }`}
                        >
                          {document.status}
                        </span>
                      </td>
                      <td>{document.uploadedBy}</td>
                      <td>{document.chunks.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="panel" id="reviews" aria-labelledby="reviews-title">
            <div className="panel-heading">
              <h2 id="reviews-title">Human review queue</h2>
              <span className="status-badge warning">Needs review</span>
            </div>
            <div className="stack-list">
              {reviewQueue.map((item) => (
                <div className="queue-item" key={item.title}>
                  <div>
                    <Link className="table-link" href="/reviews">
                      {item.title}
                    </Link>
                    <p>{item.source}</p>
                  </div>
                  <span className="status-badge warning">{item.priority}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel" aria-labelledby="states-title">
            <h2 id="states-title">Page states</h2>
            <div className="state-grid">
              <div>
                <strong>Loading</strong>
                <p>Reserved for API-backed dashboard data.</p>
              </div>
              <div>
                <strong>Empty</strong>
                <p>Shown when no documents or reviews exist.</p>
              </div>
              <div>
                <strong>Error</strong>
                <p>Uses concise messages without raw stack traces.</p>
              </div>
            </div>
          </article>

          <article className="panel" aria-labelledby="rag-title">
            <div className="panel-heading">
              <h2 id="rag-title">RAG search</h2>
              <span className="status-badge">Mock mode</span>
            </div>
            <p className="muted-copy">
              Ask a grounded question over seeded chunks and inspect the cited source snippets.
            </p>
            <Link className="button-link" href="/rag">
              Open RAG search
            </Link>
            <Link className="secondary-link" href="/documents/upload">
              Register upload
            </Link>
          </article>

          <article className="panel" aria-labelledby="ai-runs-title">
            <div className="panel-heading">
              <h2 id="ai-runs-title">AI run history</h2>
              <span className="status-badge">Traceable</span>
            </div>
            <p className="muted-copy">
              Inspect provider metadata, outputs, retrieved context, and fallback notes.
            </p>
            <Link className="button-link" href="/ai-runs">
              View AI runs
            </Link>
          </article>

          <article className="panel" aria-labelledby="workflow-title">
            <div className="panel-heading">
              <h2 id="workflow-title">Document Intake workflow</h2>
              <span className="status-badge warning">Needs review</span>
            </div>
            <p className="muted-copy">
              Inspect the bounded tool-call flow that creates an AI run, review checkpoint, and
              audit event.
            </p>
            <Link className="button-link" href="/workflows/document-intake">
              Open workflow
            </Link>
          </article>

          <article className="panel" id="audit" aria-labelledby="audit-title">
            <div className="panel-heading">
              <h2 id="audit-title">Recent audit events</h2>
              <Link className="table-link" href="/audit-logs">
                View all
              </Link>
            </div>
            <ol className="timeline">
              {auditEvents.map((event) => (
                <li key={event.id}>
                  <Link className="table-link" href={event.href}>
                    {event.action}
                  </Link>{" "}
                  by {event.actor}
                </li>
              ))}
            </ol>
          </article>
        </section>
      </section>
    </main>
  );
}
