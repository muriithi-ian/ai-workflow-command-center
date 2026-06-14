import Link from "next/link";

import { getAiRuns } from "@/lib/ai-runs";
import { formatDocumentDate } from "@/lib/documents";

export default function AiRunsPage() {
  const runs = getAiRuns();

  return (
    <main className="shell min-h-screen">
      <section className="page-header" aria-labelledby="ai-runs-title">
        <div>
          <p className="eyebrow">AI observability</p>
          <h1 id="ai-runs-title">AI run history</h1>
          <p className="lede">
            Every AI workflow should be traceable: input summary, provider, model, output, retrieved
            context, status, and failure notes.
          </p>
        </div>
        <Link className="button-link" href="/dashboard">
          Back to dashboard
        </Link>
      </section>

      <section className="panel" aria-labelledby="runs-table-title">
        <div className="panel-heading">
          <h2 id="runs-table-title">Recent runs</h2>
          <span className="status-badge">Mock trace data</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Run</th>
                <th scope="col">Workflow</th>
                <th scope="col">Status</th>
                <th scope="col">Provider</th>
                <th scope="col">Created</th>
              </tr>
            </thead>
            <tbody>
              {runs.map((run) => (
                <tr key={run.id}>
                  <td>
                    <Link className="table-link" href={`/ai-runs/${run.id}`}>
                      {run.id}
                    </Link>
                  </td>
                  <td>{run.workflow}</td>
                  <td>
                    <span
                      className={`status-badge ${run.status === "needs_review" ? "warning" : ""}`}
                    >
                      {run.status}
                    </span>
                  </td>
                  <td>{run.provider}</td>
                  <td>{formatDocumentDate(run.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
