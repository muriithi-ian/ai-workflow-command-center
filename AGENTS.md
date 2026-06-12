# AI Workflow Command Center Agent Guide

## Project Constitution

Build a polished portfolio demo that proves practical AI workflow engineering: document ingestion, RAG search, AI-assisted workflows, human review, audit logs, role-aware UX, and production-minded documentation.

Keep the project small, complete, and demo-ready. Prefer a focused MVP over a broad unfinished platform.

This file is the main repo harness for Codex sessions. Apply it before making product, architecture, backend, frontend, AI, testing, or documentation changes. AGENTS.md-style guidance should improve consistency across runs and may reduce runtime and output token usage while preserving task completion behavior.

## Project Goal

Create a public portfolio project that demonstrates:

- Full-stack product engineering
- Backend API design
- Authentication and role-based access control
- Document processing
- RAG search with source grounding
- Tool/function calling or constrained agent workflow
- Human review and approval flows
- Audit logging
- Dashboard and reporting
- Deployment and production readiness
- Clear technical documentation

## Non-Negotiables

- Use only synthetic, public-domain, or self-created data.
- Do not use private employer code, UI, prompts, screenshots, workflows, or data.
- Do not commit secrets, API keys, tokens, or private credentials.
- Do not build a generic chatbot as the core product.
- Do not build paid services into the default demo.
- Do not invent features outside the MVP.
- Ask before changing the architecture.
- Show source snippets for RAG answers.
- Store AI runs, reviewer decisions, and audit events.
- Include documentation for setup, architecture, API routes, trade-offs, and demo limitations.

## Free-Demo Stack Decision

Use the free-demo architecture unless explicitly instructed otherwise:

- Next.js, React, TypeScript, and Tailwind CSS
- FastAPI backend
- Supabase Postgres, Auth, Storage, and pgvector
- Vercel for the frontend
- GitHub Actions for CI
- Mock AI mode by default, with optional OpenAI/Claude key or local OpenAI-compatible LLM mode for local development

Do not introduce paid services, paid databases, paid queues, paid observability tools, paid storage, or paid LLM usage that consumes the project owner's private API key for public visitors.

If AI is needed, implement one of these modes:

- Mock AI mode for the deployed public demo.
- User-provided OpenAI/Claude API key mode for local evaluators.
- Local OpenAI-compatible LLM mode for local development tools such as LM Studio.

## Tech Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: FastAPI as the single MVP backend
- Database: Supabase Postgres
- Vector search: Supabase pgvector
- Auth: Supabase Auth
- Storage: Supabase Storage or local/seeded demo files
- AI: Mock AI mode by default, with optional OpenAI/Claude key or local OpenAI-compatible LLM mode
- CI/CD: GitHub Actions
- Deployment: Vercel frontend, free/near-free FastAPI backend host, and Supabase

## MVP Features

Build these before considering stretch work:

- Auth with Admin and Reviewer roles
- Protected dashboard routes
- Document upload or seeded document ingestion
- Document list/detail views
- Text extraction, chunking, and processing status
- Embedding generation or mock embeddings
- RAG search with source snippets
- AI run history
- Document Intake Review workflow
- Constrained tool/function calling or agent workflow
- Human review queue
- Audit logs
- Admin dashboard metrics
- API documentation
- Seed/demo data
- Basic tests
- README and architecture docs

## Architecture Boundaries

- Keep product logic out of visual components where practical.
- Use one FastAPI backend for the MVP instead of separate Node.js and Python services.
- Keep route handlers thin; move workflow logic into services.
- Keep AI provider logic behind a small abstraction.
- Treat local LLMs as development-only providers unless explicitly approved for deployment.
- Keep audit logging centralized.
- Keep database schema changes intentional, documented, and migrated.
- Ask before moving to microservices, paid infrastructure, enterprise auth, or a different deployment model.

## Implementation Phases

1. Foundation: scaffold app, auth, database, dashboard shell, document model, seed data, README draft.
2. Document processing: upload or seed documents, extract text, chunk text, store chunks, show status.
3. RAG search: embeddings, vector search, Q&A UI, source snippets, AI run storage.
4. Workflow review: Document Intake Review, review queue, approve/reject/request changes, audit logs.
5. Production polish: tests, CI, deployment notes, screenshots, architecture diagram, API docs, security notes.

## Local Skills

When working in this repo, use the relevant skill in `skills/`:

- `development-chunking`: break features and refactors into small, reviewable chunks before coding.
- `product-scope`: keep MVP scope disciplined and portfolio-friendly.
- `backend-quality`: design APIs, schemas, services, validation, and audit logging.
- `frontend-quality`: build clear dashboard UX with loading, empty, and error states.
- `ai-workflows`: implement RAG, AI runs, tool use, review queues, and traceability.
- `architecture-diagrams`: create architecture docs, Mermaid diagrams, API flows, deployment diagrams, and production upgrade paths.
- `security-review`: check secrets, auth, uploads, API validation, prompt injection, public demo risk, and data leakage.
- `demo-readiness`: verify local run, public demo, seed data, screenshots, links, README setup, and demo script accuracy.
- `testing-and-review`: add tests and perform implementation review.
- `readme-portfolio`: write recruiter-friendly portfolio documentation.

## Engineering Standards

- Keep business logic out of UI components where practical.
- Use clear route and service boundaries.
- Validate input at API boundaries.
- Return consistent error responses.
- Log important user, document, AI, review, and error events.
- Prefer simple implementation over clever architecture.
- Keep comments for non-obvious logic only.
- Write docs as real-world engineering artifacts: include operational concerns, trade-offs, failure modes, security posture, and production upgrade paths.

## Coding Rules

- Use TypeScript where applicable.
- Use meaningful names.
- Keep functions small where practical.
- Avoid unrelated rewrites.
- Do not hardcode secrets or mock credentials outside documented demo seed paths.
- Do not silently change database schema.
- Update docs when API, architecture, setup, or workflow behavior changes.

## Testing Rules

- Run typecheck, lint, tests, and build before marking implementation complete when available.
- Add or update tests for changed backend logic, AI workflow behavior, review decisions, and audit events.
- Prefer deterministic mock AI fixtures in automated tests.
- Do not ignore failing tests; fix root causes or clearly explain blockers.

## Security Rules

- Never commit `.env` files or private keys.
- Keep `.env.example` current.
- Validate uploaded file type and size.
- Protect dashboard routes.
- Enforce role checks for review/admin actions.
- Avoid exposing raw stack traces to users.
- Make public demo AI behavior safe by using mock mode or user-provided keys.

## Source Of Truth

Use these files for development guidance:

- `AGENTS.md` for project-wide rules.
- `skills/development-chunking/SKILL.md` before implementing features or refactors; all work should be broken into small, reviewable chunks.
- `skills/product-scope/SKILL.md` for feature scope decisions.
- `skills/backend-quality/SKILL.md` for backend/API/database changes.
- `skills/frontend-quality/SKILL.md` for UI changes.
- `skills/ai-workflows/SKILL.md` for RAG, AI, and review workflows.
- `skills/architecture-diagrams/SKILL.md` for architecture docs, Mermaid diagrams, API flows, deployment diagrams, and production upgrade paths.
- `skills/security-review/SKILL.md` for secrets, auth, file upload safety, API validation, prompt injection, public demo risk, and data leakage review.
- `skills/demo-readiness/SKILL.md` for local run checks, public demo checks, seed data, screenshots, links, setup docs, and demo script alignment.
- `skills/testing-and-review/SKILL.md` before marking work complete.
- `skills/readme-portfolio/SKILL.md` for README and docs.
- `docs/project-harness.md` for the concise project operating harness.
- `docs/portfolio-story.md` for the recruiter-facing project narrative.
- `docs/architecture.md` and `docs/architecture-decisions.md` for system design and trade-offs.
- `docs/api.md` for API route expectations.
- `docs/free-demo-decision.md` for free-demo stack constraints.
- `docs/demo-script.md` for walkthrough and recording flow.
- `docs/interview-talking-points.md` for interview prep.
- `docs/security-notes.md` for security posture and risks.
- `docs/testing-strategy.md` for test expectations.
- `docs/roadmap.md` for MVP, next, and later scope.

Keep `ai_workflow_command_center_harness_free_stack.md` as the complete long-form reference harness. For day-to-day development, use `AGENTS.md`, `skills/`, and `docs/` as the operational guidance layer. If these files conflict with the big harness, pause and ask before changing architecture or removing guidance.

## Definition of Done

- App runs locally from documented setup steps.
- Demo data is seeded or easy to create.
- At least one protected route exists.
- At least one document workflow reaches human review.
- RAG answers include source snippets.
- Audit logs record important actions.
- README and docs explain stack choices, trade-offs, and demo limitations.
- At least one basic test exists.
- The public demo does not consume the project owner's private paid API key.
