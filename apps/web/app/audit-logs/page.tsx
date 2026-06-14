import Link from "next/link";

import { getAuditLogs } from "@/lib/audit-logs";
import { formatDocumentDate } from "@/lib/documents";

export default function AuditLogsPage() {
  const auditLogs = getAuditLogs();

  return (
    <main className="shell min-h-screen">
      <section className="page-header" aria-labelledby="audit-title">
        <div>
          <p className="eyebrow">Operational traceability</p>
          <h1 id="audit-title">Audit logs</h1>
          <p className="lede">
            Important document, RAG, AI, and review actions are captured as structured events so the
            demo can explain what happened, who triggered it, and what evidence changed.
          </p>
        </div>
        <Link className="button-link" href="/dashboard">
          Back to dashboard
        </Link>
      </section>

      <section className="panel" aria-labelledby="audit-table-title">
        <div className="panel-heading">
          <h2 id="audit-table-title">Workflow event trail</h2>
          <span className="status-badge">Synthetic timeline</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Action</th>
                <th scope="col">Actor</th>
                <th scope="col">Target</th>
                <th scope="col">Created</th>
                <th scope="col">Evidence</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((event) => (
                <tr key={event.id}>
                  <td>
                    <span className="status-badge">{event.action}</span>
                  </td>
                  <td>{event.actor}</td>
                  <td>{event.target}</td>
                  <td>{formatDocumentDate(event.createdAt)}</td>
                  <td>
                    <div className="metadata-list">
                      {Object.entries(event.metadata).map(([key, value]) => (
                        <span key={key}>
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel" aria-labelledby="audit-readiness-title">
        <div className="panel-heading">
          <h2 id="audit-readiness-title">Why this matters</h2>
          <span className="status-badge warning">Review evidence</span>
        </div>
        <p className="muted-copy">
          The MVP keeps audit events deterministic for the public demo. The production path is to
          write these events from backend services whenever documents are uploaded, AI runs execute,
          reviewers decide, or user-visible failures occur.
        </p>
      </section>
    </main>
  );
}
