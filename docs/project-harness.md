# Project Harness

## Purpose

This file summarizes the operating rules for building AI Workflow Command Center. Keep the long-form reference in `ai_workflow_command_center_harness_free_stack.md`, and use this file with `AGENTS.md`, `skills/`, and the rest of `docs/` for day-to-day development.

## Project Goal

Build a polished public portfolio demo that proves practical AI workflow engineering: document ingestion, RAG search, AI workflow execution, human review, audit logs, authentication, backend APIs, and deployment-aware documentation.

The project should feel like a small but credible internal AI operations tool. Even when using mock data and free-tier infrastructure, design the workflows as if real teams would depend on clear state, safe failure modes, role boundaries, and traceable decisions.

## Chosen MVP Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Backend: single FastAPI backend
- Database: Supabase Postgres
- Vector search: Supabase pgvector
- Auth: Supabase Auth
- Storage: Supabase Storage
- AI: mock AI mode by default, optional OpenAI/Claude key or local OpenAI-compatible LLM mode for local development
- CI/CD: GitHub Actions
- Deployment: Vercel frontend, free/near-free FastAPI backend host, Supabase

## MVP Scope

- Auth with Admin and Reviewer roles
- Document upload or seeded document ingestion
- Document list/detail views
- Text extraction and chunking
- RAG search with source snippets
- AI run history
- Document Intake Review workflow
- Human review queue
- Audit logs
- Admin dashboard metrics
- README, API docs, architecture docs, and screenshots

## Phase 0 Scaffold

The current scaffold uses:

- Root `package.json` for shared scripts.
- `apps/web` for the Next.js frontend.
- `apps/api` for the FastAPI backend.
- `.github/workflows/ci.yml` for lightweight CI.
- `.env.example` for required local configuration.
- `supabase/migrations/0001_initial_schema.sql` for the planned Postgres, pgvector, RLS, and audit schema.

Initial commands:

```bash
npm install
cd apps/api
python -m venv .venv
.venv\Scripts\activate
python -m pip install -e ".[dev]"
```

Run locally:

```bash
npm run dev:web
npm run dev:api
```

Check locally:

```bash
npm run format:check
npm run typecheck
npm run lint
npm run test
npm run build
```

## Phase 1 Foundation

The foundation layer now exposes safe runtime configuration without requiring Supabase credentials:

- Frontend reads demo-safe runtime status from `apps/web/lib/env.ts`.
- Backend exposes `GET /api/config/status` with booleans only, never secret values.
- Backend exposes `GET /api/ai/providers/status` to show mock, local LLM, OpenAI, and Anthropic readiness without exposing keys.
- Supabase is optional during scaffolding; missing keys keep the app in demo/mock mode.
- Auth scaffold exposes `GET /api/auth/session` and `/login` with demo Admin/Reviewer roles only.
- Frontend middleware protects dashboard and workflow routes with an HTTP-only demo session cookie until Supabase Auth is wired in.
- The root route `/` redirects to `/login`; `/dashboard` is the post-login demo destination.
- Dashboard metrics are computed from seeded documents, AI runs, reviews, and audit logs instead of hardcoded product claims.
- Frontend document views expose `/documents` and `/documents/[documentId]` using synthetic seed data that mirrors the backend API.
- RAG scaffold exposes `POST /api/rag/query` and `/rag` with deterministic mock answers, source snippets, and no-context fallback behavior.
- AI run history exposes `GET /api/ai-runs`, `GET /api/ai-runs/{id}`, `/ai-runs`, and `/ai-runs/[runId]` for traceable mock runs.
- Review scaffold exposes `GET /api/reviews`, `POST /api/reviews/{id}/decision`, `/reviews`, and `/reviews/[reviewId]` for human review decisions.
- Workflow scaffold exposes `POST /api/workflows/document-intake` with deterministic tool-call steps that create a traceable AI run and review checkpoint.
- Frontend workflow demo exposes `/workflows/document-intake` so reviewers can inspect the bounded tool-call sequence and blocked state.
- Audit scaffold exposes `GET /api/audit-logs` and `/audit-logs` with deterministic workflow events and event-specific metadata.
- Supabase scaffold includes initial schema and synthetic seed SQL, but live Supabase credentials are not required for local mock mode.
- Full Supabase Auth, role checks, and persisted tables are later Phase 1 chunks.

## Guardrails

- Do not use private company data, code, prompts, screenshots, workflows, or UI.
- Do not build paid services into the default public demo.
- Do not expose or consume the project owner's paid API keys.
- Do not make local LLM mode required for the public demo.
- Do not add features outside MVP without explaining why.
- Ask before changing architecture.
- Prefer a complete, polished MVP over a broad unfinished system.

## Real-World Readiness Principles

- Show operational state clearly: pending, processing, failed, reviewed, approved, rejected.
- Keep AI output tied to inputs, sources, model/provider metadata, and reviewer decisions.
- Prefer source-grounded answers over unsupported generation.
- Make failure modes visible and recoverable.
- Document demo limitations as implementation trade-offs, not excuses.
- Keep a clear path from free-demo architecture to production architecture.

## Definition Of Done

- App runs locally from documented setup steps.
- Demo data exists.
- RAG answers show source snippets.
- AI outputs are stored as AI runs.
- At least one AI workflow reaches human review.
- Review decisions and important actions create audit logs.
- Tests, docs, and demo instructions are updated.
