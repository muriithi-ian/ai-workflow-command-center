import Link from "next/link";

import { formatDocumentDate, getDocumentSummaries } from "@/lib/documents";

export default function DocumentsPage() {
  const documents = getDocumentSummaries();

  return (
    <main className="shell min-h-screen">
      <section className="page-header" aria-labelledby="documents-title">
        <div>
          <p className="eyebrow">Document workspace</p>
          <h1 id="documents-title">Seeded documents</h1>
          <p className="lede">
            Synthetic documents show the ingestion and chunking model before uploads, Supabase
            Storage, and pgvector persistence are wired in.
          </p>
        </div>
        <Link className="button-link" href="/dashboard">
          Back to dashboard
        </Link>
        <Link className="secondary-link" href="/documents/upload">
          Register upload
        </Link>
      </section>

      <section className="panel" aria-labelledby="document-list-title">
        <div className="panel-heading">
          <h2 id="document-list-title">Document list</h2>
          <span className="status-badge">Seed data</span>
        </div>

        {documents.length === 0 ? (
          <div className="empty-state">
            <strong>No documents yet</strong>
            <p>Seed or upload a synthetic document to start the workflow.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Document</th>
                  <th scope="col">Status</th>
                  <th scope="col">Chunks</th>
                  <th scope="col">Uploaded by</th>
                  <th scope="col">Created</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((document) => (
                  <tr key={document.id}>
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
                    <td>{document.chunks.length}</td>
                    <td>{document.uploadedBy}</td>
                    <td>{formatDocumentDate(document.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
