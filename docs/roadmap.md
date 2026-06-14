# Roadmap

## MVP

- Auth
- Upload documents
- Document list/detail views
- Text extraction and chunking
- RAG search with source snippets
- AI run history
- Human review queue
- Audit logs
- Admin dashboard metrics
- README, API, architecture, security, and testing docs

## Completed Locally

- Phase 0 project scaffold
- Phase 1 foundation: dashboard, demo auth, protected routes, config status, seed data
- Phase 2 local documents: upload metadata validation, seeded document details, deterministic processing stages, extracted chunks, blocked processing state, Supabase schema scaffold
- Phase 3 local AI/RAG: deterministic mock embeddings, RAG index status, grounded source retrieval, source-level retrieval evidence, AI run traceability, no-context fallback
- Phase 4 local review/audit: review queue, local decision validation, decision lock state, backend review decision API, linked audit evidence

## Needs External Input

- Supabase credentials for real Auth, Storage, Postgres, and pgvector persistence
- Optional LM Studio/local model URL and model name for local LLM provider testing
- Optional OpenAI or Anthropic key for evaluator-owned provider testing
- Deployment target choices for public frontend/backend hosting

## Next

- Persist document uploads and chunks in Supabase
- Persist reviewer decisions and audit log rows in Supabase
- Background jobs for document processing
- Real local or hosted LLM provider execution
- Better AI evaluation metrics
- More granular role-based permissions
- Multi-tenant organization support
- OpenTelemetry tracing
- Production queue and retry behavior
- More robust prompt injection defenses
- Screenshot and demo video polish

## Production Hardening

- Queue workers with retries and dead-letter handling.
- Request IDs, structured logs, metrics, traces, and alerts.
- Rate limiting and abuse protection.
- Malware scanning for uploads.
- Data retention and deletion workflows.
- Backup and restore documentation.
- Reviewer assignment and escalation rules.

## Later

- Prompt versioning UI
- Cost tracking per AI run
- Scheduled reports
- Slack or email notifications
- Advanced reviewer assignment
- Enterprise SSO
- Dedicated vector database if scale requires it

## Deliberately Deferred

- Payments and billing
- Social/collaboration features outside review workflow
- Mobile app
- Complex enterprise policy engine
- Premature microservice split before MVP value is proven
