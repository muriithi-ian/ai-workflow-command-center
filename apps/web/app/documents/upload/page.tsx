"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

const maxUploadBytes = 5 * 1024 * 1024;
const allowedExtensions = [".pdf", ".txt", ".md", ".docx"];
const allowedMimeTypes = [
  "application/pdf",
  "text/plain",
  "text/markdown",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

type UploadState =
  | { status: "empty" }
  | { status: "error"; message: string }
  | {
      status: "success";
      documentId: string;
      fileName: string;
      title: string;
    };

function hasAllowedExtension(fileName: string): boolean {
  return allowedExtensions.some((extension) => fileName.toLowerCase().endsWith(extension));
}

function buildDemoDocumentId(fileName: string): string {
  const slug = fileName
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  return `doc_upload_${slug || "synthetic_document"}`;
}

export default function UploadDocumentPage() {
  const [uploadState, setUploadState] = useState<UploadState>({ status: "empty" });
  const acceptedTypes = useMemo(() => allowedExtensions.join(","), []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const uploadedBy = String(formData.get("uploadedBy") ?? "").trim();
    const file = formData.get("file");

    if (!title) {
      setUploadState({ status: "error", message: "Add a clear document title." });
      return;
    }

    if (!uploadedBy || !uploadedBy.includes("@")) {
      setUploadState({ status: "error", message: "Use a valid demo uploader email." });
      return;
    }

    if (!(file instanceof File) || file.size === 0) {
      setUploadState({ status: "error", message: "Choose a synthetic demo document." });
      return;
    }

    if (file.size > maxUploadBytes) {
      setUploadState({ status: "error", message: "Demo uploads are limited to 5 MB." });
      return;
    }

    if (!hasAllowedExtension(file.name) || !allowedMimeTypes.includes(file.type)) {
      setUploadState({
        status: "error",
        message: "Allowed demo file types are PDF, TXT, Markdown, and DOCX."
      });
      return;
    }

    setUploadState({
      status: "success",
      documentId: buildDemoDocumentId(file.name),
      fileName: file.name,
      title
    });
  }

  return (
    <main className="shell min-h-screen">
      <section className="page-header" aria-labelledby="upload-title">
        <div>
          <p className="eyebrow">Document intake</p>
          <h1 id="upload-title">Register a demo upload</h1>
          <p className="lede">
            Validate synthetic document metadata before storage is wired to Supabase. This mirrors
            the backend upload contract without saving files in the public scaffold.
          </p>
        </div>
        <Link className="button-link" href="/documents">
          Back to documents
        </Link>
      </section>

      <section className="rag-layout">
        <article className="panel" aria-labelledby="upload-form-title">
          <div className="panel-heading">
            <h2 id="upload-form-title">Upload metadata</h2>
            <span className="status-badge">Local validation</span>
          </div>
          <form className="demo-form" onSubmit={handleSubmit}>
            <label htmlFor="title">Document title</label>
            <input id="title" name="title" placeholder="Synthetic Vendor Policy" type="text" />

            <label htmlFor="uploadedBy">Uploaded by</label>
            <input
              id="uploadedBy"
              name="uploadedBy"
              placeholder="demo.admin@example.com"
              type="email"
            />

            <label htmlFor="file">Synthetic file</label>
            <input id="file" name="file" accept={acceptedTypes} type="file" />

            <button className="button-link" type="submit">
              Validate upload
            </button>
          </form>
        </article>

        <article className="panel" aria-labelledby="upload-state-title">
          <div className="panel-heading">
            <h2 id="upload-state-title">Validation state</h2>
            <span className={`status-badge ${uploadState.status === "error" ? "warning" : ""}`}>
              {uploadState.status}
            </span>
          </div>

          {uploadState.status === "empty" ? (
            <div className="empty-state">
              <strong>No upload checked yet</strong>
              <p>Select a synthetic document to see validation feedback.</p>
            </div>
          ) : null}

          {uploadState.status === "error" ? (
            <div className="empty-state">
              <strong>Upload rejected</strong>
              <p>{uploadState.message}</p>
            </div>
          ) : null}

          {uploadState.status === "success" ? (
            <div className="chunk-card">
              <div className="panel-heading">
                <h3>{uploadState.title}</h3>
                <span className="status-badge warning">queued</span>
              </div>
              <p>
                Registered `{uploadState.fileName}` as `{uploadState.documentId}`. In the persisted
                implementation, the backend will store the file, create a document row, and enqueue
                extraction.
              </p>
            </div>
          ) : null}
        </article>
      </section>
    </main>
  );
}
