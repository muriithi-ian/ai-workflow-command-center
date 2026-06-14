# AI Workflow Command Center

AI Workflow Command Center is a production-style portfolio project for managing AI-assisted document workflows: document ingestion, RAG search, AI runs, human review, and audit logs.

The MVP uses a Next.js + TypeScript frontend, a single FastAPI backend, Supabase Postgres with pgvector, Supabase Auth, Supabase Storage, and mock AI mode by default. Optional local development can use OpenAI/Claude keys or an OpenAI-compatible local LLM server such as LM Studio.

## Current Status

The project is in MVP scaffolding with a working mock/demo flow. It does not require Supabase or paid AI credentials to run locally.

Implemented so far:

- Demo login with HTTP-only mock session cookie
- Protected dashboard routes
- Seeded document list/detail pages with extracted chunks
- Upload metadata validation API
- Deterministic document processing scaffold
- Document processing pipeline UI with completed and blocked states
- Deterministic mock embedding pipeline with retrieval diagnostics
- RAG index status API/UI evidence with vector previews
- Mock RAG query API and frontend with source snippets
- AI run history API and frontend detail views
- Document Intake Review workflow API and frontend tool-step page
- Human review queue and decision API
- Local review decision panel with reviewer note validation and audit event preview
- Audit log API and frontend event trail
- Linked audit evidence back to documents, processing, RAG, AI runs, and reviews
- Dashboard metrics computed from seeded demo data
- Supabase schema scaffold with pgvector, RLS policies, and synthetic seed SQL
- Project guidance in `AGENTS.md`, `skills/`, and `docs/`

## Local Setup

Copy environment placeholders:

```bash
cp .env.example .env
```

Install frontend dependencies:

```bash
npm install
```

Create and install backend dependencies:

```bash
cd apps/api
python -m venv .venv
.venv\Scripts\activate
python -m pip install -e ".[dev]"
```

On macOS/Linux, activate the backend environment with:

```bash
source .venv/bin/activate
```

Run the frontend:

```bash
npm run dev:web
```

Run the backend:

```bash
npm run dev:api
```

Open `http://localhost:3000`, continue as Demo Admin, then use the dashboard navigation.

## Demo Path

1. Login at `/login`.
2. Open `/dashboard` and review computed metrics.
3. Open `/documents/doc_vendor_intake` and inspect extracted chunks.
4. Open `/documents/doc_vendor_intake/processing` and show the processing stages.
5. Ask a grounded question in `/rag` and inspect matched terms, embedding IDs, and vector previews.
6. Inspect stored AI run details in `/ai-runs` and verify retrieved context metadata.
7. Open `/workflows/document-intake` and review the tool-call sequence.
8. Open `/reviews/review_vendor_risk_summary` and submit a local reviewer decision.
9. Open `/audit-logs` and follow links back to workflow evidence.

## Current Local Phase Boundary

Phase 2 is complete for local/mock mode: the app can register upload metadata, show seeded document detail, expose deterministic processing stages, show extracted chunks, and document the Supabase persistence path. Real file storage, persisted document rows, background jobs, and pgvector writes require Supabase project credentials.

Phase 3 is complete for local/mock mode: the app can generate deterministic mock embeddings, expose RAG index readiness, retrieve grounded source snippets, show matched terms and embedding IDs, store AI run-shaped records, and demonstrate no-context fallback behavior. Real OpenAI/Anthropic/local LLM generation requires provider configuration and a selected model.

Phase 4 is complete for local/mock mode: the app can show review queue state, validate local reviewer decisions, preview the audit event that would be written, reject repeat decisions in the backend API, and link audit events back to workflow evidence. Persisted review decisions and durable audit writes require Supabase credentials.

## Checks

```bash
npm run format:check
npm run typecheck
npm run lint
npm run test
npm run build
```

These commands require dependencies to be installed first.

Known local note: if `next dev` is running while `next build` runs, clear or restart the dev server if stale `_next` assets appear in the browser.

## Documentation

- `docs/project-harness.md`: concise project operating harness
- `docs/architecture.md`: system architecture
- `docs/architecture-decisions.md`: ADR-style trade-offs
- `docs/api.md`: API expectations
- `docs/security-notes.md`: security posture
- `docs/testing-strategy.md`: testing approach
- `docs/demo-script.md`: walkthrough path
- `docs/roadmap.md`: MVP and future scope
