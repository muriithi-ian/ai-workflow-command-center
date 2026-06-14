# AI Workflow Command Center

AI Workflow Command Center is a production-style portfolio project for managing AI-assisted document workflows: document ingestion, RAG search, AI runs, human review, and audit logs.

The MVP uses a Next.js + TypeScript frontend, a single FastAPI backend, Supabase Postgres with pgvector, Supabase Auth, Supabase Storage, and mock AI mode by default. Optional local development can use OpenAI/Claude keys or an OpenAI-compatible local LLM server such as LM Studio.

## Current Status

Phase 0 scaffolding is in progress.

Implemented so far:

- Project guidance in `AGENTS.md`
- Documentation in `docs/`
- Codex skills in `skills/`
- Root `.gitignore`
- Root `.env.example`
- Initial Next.js app shell in `apps/web`
- Initial FastAPI app shell in `apps/api`

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

Run the frontend:

```bash
npm run dev:web
```

Run the backend:

```bash
npm run dev:api
```

## Checks

```bash
npm run format:check
npm run typecheck
npm run lint
npm run test
npm run build
```

These commands require dependencies to be installed first.

## Documentation

- `docs/project-harness.md`: concise project operating harness
- `docs/architecture.md`: system architecture
- `docs/architecture-decisions.md`: ADR-style trade-offs
- `docs/api.md`: API expectations
- `docs/security-notes.md`: security posture
- `docs/testing-strategy.md`: testing approach
- `docs/demo-script.md`: walkthrough path
- `docs/roadmap.md`: MVP and future scope
