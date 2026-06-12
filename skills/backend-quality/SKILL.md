---
name: backend-quality
description: Improve backend implementation quality for AI Workflow Command Center. Use when designing schemas, API routes, service boundaries, validation, error handling, authorization, audit logging, database access, migrations, seed data, or backend tests.
---

# Backend Quality Skill

## Goal

Build backend code that feels production-aware while staying simple enough for a portfolio demo.

Use FastAPI as the single MVP backend. Do not split into a Node.js backend-for-frontend and Python AI service until the MVP is complete and there is enough scale or team complexity to justify the extra operational overhead.

## Before Coding

For backend changes, define:

- Route
- Request body
- Response body
- Validation rules
- Error states
- Auth and role requirements
- Audit log behavior

## API Standards

- Validate all request inputs at route boundaries.
- Use typed interfaces.
- Return consistent response shapes for success and error cases.
- Avoid leaking raw internal errors to users.
- Check authentication for dashboard and API access.
- Check roles for reviewer/admin actions.
- Keep route handlers thin; move business logic into services.
- Never expose secrets.
- Add or update tests.
- Update API documentation.

## Core Entities

Model these concepts clearly:

- `User`
- `Document`
- `DocumentChunk`
- `AiRun`
- `ReviewItem`
- `AuditLog`

Add fields only when they support the demo workflow, docs, or auditability.

## Audit Logging

Create audit events for:

- User sign-in
- Document upload or seed ingestion
- Document processed or failed
- RAG query submitted
- AI workflow started
- AI output generated
- Review decision made
- Recoverable or user-visible errors

Audit metadata should be structured JSON where practical.

## Service Boundaries

Prefer explicit services:

- `documentService`
- `chunkingService`
- `ragService`
- `aiProvider`
- `reviewService`
- `auditService`

Keep provider-specific AI logic behind a small abstraction.

## Schema Changes

Do not silently change database schema. Before changing schema:

1. Explain the reason.
2. Add a migration.
3. Update seed data if needed.
4. Update docs.

## Demo Practicality

- Use Supabase Postgres and pgvector for the free demo path.
- Use Supabase Auth for authentication.
- Use Supabase Storage for uploaded documents where practical.
- Keep migrations and seed data easy to run.
- Support mock AI responses for deployed public demos.
- Document any simplified background processing or queue replacement.
