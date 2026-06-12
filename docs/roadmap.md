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

## Next

- Background jobs for document processing
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
