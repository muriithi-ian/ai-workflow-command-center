# API Overview

## Response Shape

Use consistent JSON responses:

```json
{
  "data": {},
  "error": null
}
```

For errors:

```json
{
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "A user-friendly error message"
  }
}
```

## Backend

The MVP exposes these routes from a single FastAPI backend. The Next.js frontend calls this backend rather than implementing a separate Node.js API layer.

## Operational API Expectations

- Use authenticated requests for dashboard and workflow APIs.
- Include stable resource IDs, timestamps, and actor IDs where relevant.
- Return user-safe error messages and machine-readable error codes.
- Use pagination for list endpoints before data grows.
- Include request IDs or correlation IDs in production logs.
- Validate file type, file size, role permissions, and required fields at the API boundary.
- Record audit events for workflow actions, not just successful happy paths.

## Auth

Dashboard and workflow routes should require an authenticated user. Review decisions should require a Reviewer or Admin role.

## Routes

| Method | Route | Purpose | Auth |
|---|---|---|---|
| `GET` | `/api/health` | Return backend health status | Public |
| `GET` | `/api/auth/session` | Return current demo session scaffold | Public during scaffold |
| `GET` | `/api/config/status` | Return safe runtime configuration booleans | Public |
| `GET` | `/api/dashboard/metrics` | Return dashboard metrics | User |
| `GET` | `/api/documents` | List documents | User |
| `POST` | `/api/documents` | Upload or register a document | User |
| `GET` | `/api/documents/:id` | Get document metadata and chunks | User |
| `POST` | `/api/documents/:id/process` | Extract, chunk, and index document text | Admin |
| `POST` | `/api/rag/query` | Ask a grounded question over documents | User |
| `GET` | `/api/ai-runs` | List AI runs | User |
| `GET` | `/api/ai-runs/:id` | Get AI run details and retrieved context | User |
| `POST` | `/api/workflows/document-intake` | Start Document Intake Review workflow | User |
| `GET` | `/api/reviews` | List pending and completed review items | Reviewer |
| `POST` | `/api/reviews/:id/decision` | Approve, reject, or request changes | Reviewer |
| `GET` | `/api/audit-logs` | List audit events | Admin |

Phase 1/3 scaffold note: auth, list, metrics, document detail, upload registration, processing, and RAG routes currently return deterministic synthetic demo data without persistence while Supabase auth, database tables, pgvector, and role checks are added in later chunks.

## Example Document Upload Registration Request

The scaffold accepts upload metadata first. Binary file storage and Supabase Storage integration are deferred to a later document-upload chunk.

```json
{
  "title": "Synthetic Vendor Policy",
  "file_name": "synthetic-vendor-policy.md",
  "mime_type": "text/markdown",
  "size_bytes": 2048,
  "uploaded_by": "demo.admin@example.com"
}
```

Validation rules:

- Max size: 5 MB.
- MIME types: `application/pdf`, `text/plain`, `text/markdown`, `.docx` Office MIME type.
- Extensions: `.pdf`, `.txt`, `.md`, `.docx`.
- Rejected types return `UPLOAD_REJECTED` with a user-safe message.

## Example Document Processing Response

`POST /api/documents/doc_vendor_intake/process` currently runs deterministic seed chunking and returns the chunks that would later be indexed for RAG.

```json
{
  "data": {
    "document_id": "doc_vendor_intake",
    "status": "processed",
    "chunk_count": 3,
    "chunks": [
      {
        "id": "chunk_vendor_scope",
        "document_id": "doc_vendor_intake",
        "ordinal": 1,
        "heading": "Scope and data access",
        "content": "The vendor will process synthetic customer support summaries...",
        "token_count": 39
      }
    ],
    "processed_at": "2026-01-15T12:30:00Z",
    "next_step": "ready_for_rag_indexing"
  },
  "error": null
}
```

Documents without extracted chunks return `DOCUMENT_PROCESSING_FAILED` until extraction is complete.

## Example Document Detail Response

```json
{
  "data": {
    "id": "doc_vendor_intake",
    "title": "Vendor Intake Security Review",
    "status": "ready",
    "chunk_count": 3,
    "uploaded_by": "demo.admin@example.com",
    "source_type": "seed",
    "file_name": "vendor-intake-security-review.md",
    "summary": "Security review notes for a synthetic vendor onboarding workflow...",
    "chunks": [
      {
        "id": "chunk_vendor_scope",
        "document_id": "doc_vendor_intake",
        "ordinal": 1,
        "heading": "Scope and data access",
        "content": "The vendor will process synthetic customer support summaries...",
        "token_count": 39
      }
    ]
  },
  "error": null
}
```

## Error Codes

Use a small predictable set of error codes:

- `VALIDATION_ERROR`
- `UNAUTHORIZED`
- `FORBIDDEN`
- `NOT_FOUND`
- `UPLOAD_REJECTED`
- `DOCUMENT_PROCESSING_FAILED`
- `AI_PROVIDER_UNAVAILABLE`
- `REVIEW_STATE_CONFLICT`
- `INTERNAL_ERROR`

## List Responses

List endpoints should support pagination when implemented:

```json
{
  "data": {
    "items": [],
    "page": 1,
    "pageSize": 25,
    "total": 0
  },
  "error": null
}
```

## Example RAG Request

```json
{
  "question": "What risks are mentioned in the vendor onboarding document?",
  "document_ids": ["doc_vendor_intake"]
}
```

## Example RAG Response

```json
{
  "data": {
    "answer": "Mock RAG answer for: 'What risks are mentioned in the vendor onboarding document?'. The grounded context comes from Vendor Intake Security Review.",
    "sources": [
      {
        "document_id": "doc_vendor_intake",
        "document_title": "Vendor Intake Security Review",
        "chunk_id": "chunk_vendor_risks",
        "heading": "Approval blockers",
        "snippet": "Open blockers include incomplete subprocesser review...",
        "score": 0.25
      }
    ],
    "ai_run_id": "airun_abc123",
    "status": "completed",
    "provider": "mock",
    "model": "mock-rag-v1",
    "created_at": "2026-01-15T12:30:00Z",
    "input_summary": "What risks are mentioned in the vendor onboarding document?"
  },
  "error": null
}
```

Mock RAG fallback responses return `status: "no_context"` and an empty `sources` array. The deployed public demo must keep mock mode as the default and must not consume the project owner's private paid API key.

## Example AI Run Detail Response

`GET /api/ai-runs/{id}` returns the stored run output, provider metadata, and retrieved context used by RAG answers.

```json
{
  "data": {
    "id": "airun_abc123",
    "workflow": "RAG Question Answering",
    "status": "completed",
    "provider": "mock",
    "model": "mock-rag-v1",
    "created_at": "2026-01-15T12:30:00Z",
    "input_summary": "What risks are mentioned in the vendor onboarding document?",
    "output": "Mock RAG answer...",
    "retrieved_context": [
      {
        "document_id": "doc_vendor_intake",
        "chunk_id": "chunk_vendor_risks",
        "heading": "Approval blockers",
        "snippet": "Open blockers include incomplete subprocesser review...",
        "score": 0.25
      }
    ],
    "errors": []
  },
  "error": null
}
```

## Example Review Decision Request

```json
{
  "decision": "approved",
  "reviewer_note": "Summary is accurate and cites the relevant policy section.",
  "reviewer_email": "demo.reviewer@example.com"
}
```

Review decisions return the updated review state and an audit event name. Completed reviews return `REVIEW_STATE_CONFLICT` if another decision is attempted.

## Audit Events

Record audit events for document upload, processing completion, RAG queries, workflow starts, AI output generation, review decisions, sign-ins, and user-visible errors.

## Production API Hardening

For production, add rate limiting, structured request logging, correlation IDs, tighter CORS rules, idempotency keys for upload/workflow actions, and OpenAPI documentation generated from FastAPI schemas.
