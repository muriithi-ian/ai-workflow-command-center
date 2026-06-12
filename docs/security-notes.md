# Security Notes

## Threat Model

The main risks are secret leakage, unauthorized workflow access, unsafe file uploads, prompt injection from untrusted documents, sensitive data appearing in logs or screenshots, and public demo abuse.

## Secrets

- Do not commit API keys, tokens, service-role keys, `.env` files, or private credentials.
- Keep `.env.example` current with placeholder values only.
- Use mock AI mode in the deployed public demo.
- Allow optional user-provided OpenAI/Claude keys for local mode only.
- Allow optional local OpenAI-compatible LLM mode for local development only.

## Authentication And Authorization

- Protect dashboard and API routes.
- Use Supabase Auth for identity.
- Enforce Admin and Reviewer role checks for privileged actions.
- Keep review decisions restricted to Reviewer or Admin roles.
- Use least-privilege service credentials in the backend.
- Avoid exposing Supabase service-role keys to the browser.

## Supabase Row-Level Access

If Supabase tables are accessed directly from the client, use row-level security policies. Prefer server-mediated access through FastAPI for workflow actions, audit logging, and role-sensitive behavior.

## File Upload Safety

- Restrict upload types to supported document formats.
- Limit file size.
- Validate MIME type and extension.
- Store files in Supabase Storage or use seeded demo files.
- Avoid processing executable or unknown file types.
- Show safe, user-friendly errors when processing fails.
- In production, add malware scanning and quarantine behavior before processing files.

## Audit Logging

Record important actions:

- Sign-in
- Document upload
- Document processing success or failure
- RAG query
- AI workflow start
- AI output generation
- Review decision
- User-visible errors

## Data Deletion

Document how users or admins can delete demo documents and related chunks, AI runs, review items, and audit references. For MVP, document any manual deletion limitations clearly.

In production, define retention periods for uploaded files, extracted text, embeddings, AI prompts, AI outputs, and audit events. Deletion should clean up storage objects and related database rows without leaving orphaned embeddings.

## Prompt Injection Risks

Treat uploaded document text as untrusted input. Do not let document content override system behavior, reveal secrets, change tools, or bypass review. Keep tools constrained and avoid hidden destructive actions.

Mitigations should include prompt boundaries, explicit tool allow-lists, source display, human review for important outputs, and tests with malicious document snippets.

## Sensitive Data Handling

Use only synthetic data in the repository and public demo. Do not upload private client, candidate, customer, employer, or NDA-protected data. Redact sensitive content from screenshots and logs.

## Public Demo Risks

- Do not expose private paid API keys.
- Prefer deterministic mock AI responses.
- Do not require local LLM mode for public visitors.
- Avoid writing raw provider errors to the UI.
- Limit uploads and retention.
- Document free-tier limits clearly.

## Local LLM Safety

Local LLM mode should be treated as a development convenience, not a public deployment dependency.

- Keep `LOCAL_LLM_BASE_URL` pointed at localhost or a trusted internal endpoint.
- Do not send private, client, employer, or regulated data to unknown local models.
- Do not expose a local LLM server publicly without authentication and network controls.
- Handle missing model, unavailable server, timeout, and malformed response errors safely.
- Preserve prompt injection boundaries, source display, audit logging, and human review behavior.

## Production Security Upgrades

- Centralized secret management.
- Rate limiting and abuse protection.
- Structured security logs.
- Alerting on unusual access patterns.
- Object storage lifecycle policies.
- Malware scanning for uploaded files.
- Periodic access review for Admin and Reviewer roles.
