---
name: development-chunking
description: Break AI Workflow Command Center development into small, reviewable chunks. Use before planning, implementing, or refactoring features, API routes, UI pages, database changes, AI workflows, tests, docs, or any multi-file project work.
---

# Development Chunking Skill

## Purpose

Break development into small, feasible, reviewable chunks that can become clean Git commits. Each chunk should have a clear goal, limited scope, testable outcome, and short completion summary.

The goal is to avoid large, messy changes and keep the project easy to review, debug, and document.

## Core Rule

Do not implement large multi-feature changes in one pass.

Every implementation task must be broken into small chunks before coding.

Each chunk should be small enough to fit into one focused Git commit.

## Chunk Size Rules

A good chunk should usually modify:

- One feature area.
- One API route group.
- One UI page.
- One database migration.
- One documentation file.
- One test suite.

Avoid chunks that modify unrelated frontend, backend, database, AI workflow, and documentation files all at once.

## Required Planning Format

Before implementing, produce a chunk plan:

```md
## Chunk Plan

### Chunk 1: <name>
Goal:
Files likely to change:
Acceptance check:
Suggested commit message:

### Chunk 2: <name>
Goal:
Files likely to change:
Acceptance check:
Suggested commit message:
```

Only proceed after the chunk plan is clear.

## Commit Message Format

Use clear conventional-style commit messages:

- `feat: add document upload API`
- `feat: add document list page`
- `feat: add RAG query endpoint`
- `fix: handle empty document upload state`
- `test: add API validation tests`
- `docs: add free demo architecture decision`
- `refactor: extract audit log helper`
- `chore: configure lint and typecheck`

## Commit Types

Use these prefixes:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `test:` for tests
- `refactor:` for internal code improvements
- `chore:` for config, tooling, or setup
- `style:` for formatting-only changes

## Development Flow

For each chunk:

1. Restate the goal.
2. Identify files to change.
3. Implement only that chunk.
4. Run relevant checks.
5. Summarize what changed.
6. Provide a suggested commit message.
7. List any follow-up chunks.

## Acceptance Check Rules

Each chunk must have a concrete acceptance check.

Examples:

- User can upload a PDF and see it listed in the document table.
- `POST /documents` rejects unsupported file types with a clear error.
- RAG query returns an answer with source references in mock mode.
- Audit log entry is created when a document is uploaded.
- README includes free-demo architecture decision and production upgrade path.

## Git Safety Rules

Before finishing a chunk:

- Run tests relevant to the changed area.
- Run typecheck where available.
- Run lint where available.
- Do not leave broken imports.
- Do not leave placeholder code unless clearly marked and documented.
- Do not commit secrets, API keys, tokens, `.env` files, or private data.
- Do not mix unrelated changes.
- Do not silently reformat the whole repository.

## Branching Recommendation

Use short feature branches:

- `feature/project-setup`
- `feature/auth`
- `feature/document-upload`
- `feature/rag-search`
- `feature/review-queue`
- `feature/audit-logs`
- `feature/dashboard`
- `docs/architecture`

## MVP Chunk Sequence

Follow this sequence unless instructed otherwise:

### Phase 0: Project Setup

- `chore: initialize project structure`
- `chore: configure linting typecheck and formatting`
- `docs: add project harness and architecture decisions`

### Phase 1: Foundation

- `feat: add app shell and dashboard layout`
- `feat: configure Supabase client and environment validation`
- `feat: add authentication flow`
- `test: add auth and environment validation tests`

### Phase 2: Documents

- `feat: add document upload API`
- `feat: add document list and detail views`
- `feat: add document chunking pipeline`
- `test: add document upload validation tests`

### Phase 3: AI Workflow

- `feat: add mock AI provider`
- `feat: add RAG query endpoint`
- `feat: show RAG answers with source references`
- `feat: store AI run history`
- `test: add mock AI and RAG workflow tests`

### Phase 4: Review and Audit

- `feat: add human review queue`
- `feat: add approval and rejection actions`
- `feat: add audit log service`
- `feat: show audit log timeline`

### Phase 5: Portfolio Polish

- `docs: add architecture diagrams`
- `docs: add demo script`
- `docs: add security notes`
- `docs: add testing strategy`
- `feat: add seed demo data`
- `docs: polish README for portfolio review`

## Scope Control

If a requested chunk is too large, split it.

If a requested feature is outside the MVP, stop and explain:

```text
This request is outside the MVP scope. The smallest MVP-safe alternative is...
```

Do not add:

- Payments
- Mobile apps
- Chat rooms
- Complex billing
- Enterprise SSO
- Paid cloud services
- Production queues
- Unnecessary microservices
- Unrelated UI redesigns

## Completion Response Format

After each chunk, respond with:

```md
## Completed Chunk

Chunk:
Summary:
Files changed:
Checks run:
Suggested commit message:
Remaining risks:
Next recommended chunk:
```

## Quality Bar

A chunk is not complete unless:

- The feature works for the intended path.
- Basic error states are handled.
- Types are valid.
- Tests or manual checks are described.
- Documentation is updated if behavior changed.
- Suggested commit message is provided.
