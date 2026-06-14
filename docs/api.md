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

Phase 1 scaffold note: auth, list, and metrics routes currently return synthetic demo data without persistence while Supabase auth, database tables, and role checks are added in later foundation chunks.

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
  "documentIds": ["doc_123"]
}
```

## Example RAG Response

```json
{
  "data": {
    "answer": "The document identifies incomplete security review and missing data retention terms as risks.",
    "sources": [
      {
        "documentId": "doc_123",
        "chunkId": "chunk_456",
        "snippet": "Security review must be completed before vendor approval..."
      }
    ],
    "aiRunId": "airun_789"
  },
  "error": null
}
```

## Example Review Decision Request

```json
{
  "decision": "approved",
  "reviewerNote": "Summary is accurate and cites the relevant policy section."
}
```

## Audit Events

Record audit events for document upload, processing completion, RAG queries, workflow starts, AI output generation, review decisions, sign-ins, and user-visible errors.

## Production API Hardening

For production, add rate limiting, structured request logging, correlation IDs, tighter CORS rules, idempotency keys for upload/workflow actions, and OpenAPI documentation generated from FastAPI schemas.
