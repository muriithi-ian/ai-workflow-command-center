import Link from "next/link";

import { getDemoSession, hasRole } from "@/lib/auth";
import { getRuntimeEnvironment } from "@/lib/env";

const metrics = [
  { label: "Documents", value: "3", detail: "2 ready, 1 processing" },
  { label: "AI runs", value: "5", detail: "Mock mode active" },
  { label: "Pending reviews", value: "2", detail: "1 high priority" },
  { label: "Audit events", value: "12", detail: "Traceable workflow" }
];

const documents = [
  { title: "Vendor Intake Security Review", status: "Ready", owner: "Admin", chunks: 8 },
  { title: "Data Retention Policy Update", status: "Ready", owner: "Reviewer", chunks: 6 },
  { title: "Contract Exception Notes", status: "Processing", owner: "Admin", chunks: 0 }
];

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

const auditEvents = ["document.processed", "ai_run.created", "review.created"];

export default function DashboardPage() {
  const runtime = getRuntimeEnvironment();
  const session = getDemoSession();

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
          <a href="/dashboard#documents">Documents</a>
          <a href="/dashboard#reviews">Reviews</a>
          <a href="/dashboard#audit">Audit logs</a>
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
                      <td>{document.title}</td>
                      <td>
                        <span className="status-badge">{document.status}</span>
                      </td>
                      <td>{document.owner}</td>
                      <td>{document.chunks}</td>
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
                    <strong>{item.title}</strong>
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

          <article className="panel" id="audit" aria-labelledby="audit-title">
            <h2 id="audit-title">Recent audit events</h2>
            <ol className="timeline">
              {auditEvents.map((event) => (
                <li key={event}>{event}</li>
              ))}
            </ol>
          </article>
        </section>
      </section>
    </main>
  );
}
