# Testing Strategy

## Goals

Testing should prove the MVP workflow works and prevent regressions in security-sensitive, AI-sensitive, and demo-critical paths.

The strategy should reflect real production habits even if the project is a demo: deterministic fixtures, API boundary tests, role checks, failure states, and manual QA for the end-to-end story.

## Unit Tests

Cover:

- Text chunking
- Input validation helpers
- AI provider mock responses
- Local LLM provider configuration parsing
- Review decision state transitions
- Audit event creation helpers

## API Tests

Cover:

- Auth-required endpoints
- Role-protected review/admin endpoints
- Consistent success and error response shapes
- Upload validation errors
- RAG query request validation
- Review decision request validation

## Integration Tests

Cover:

- Document upload through chunk creation.
- RAG query through source retrieval and AI run persistence.
- Document Intake Review through pending review item creation.
- Review decision through audit log creation.
- Authenticated and unauthorized versions of key workflows.

## RAG And Mock AI Tests

Use deterministic fixtures to test:

- Retrieved source snippets are returned.
- AI runs are stored.
- Mock AI mode returns predictable outputs.
- Local LLM mode handles unavailable server and missing model errors.
- Provider failure states are handled clearly.

## Auth Checks

Verify:

- Unauthenticated users cannot access protected routes.
- Review actions require Reviewer or Admin role.
- Admin-only routes reject non-admin users.

## Upload Validation Tests

Verify:

- Unsupported file types are rejected.
- Oversized files are rejected.
- Failed extraction returns a clear error.
- Successful processing stores document status and chunks.

## Error-State Tests

Verify:

- LLM provider unavailable state.
- Empty RAG results.
- Failed document processing.
- Missing review item.
- Invalid reviewer decision.

## Non-Functional Checks

For a real-world-ready demo, check:

- Large but allowed document handling.
- Empty document handling.
- Slow AI provider or timeout behavior.
- Duplicate upload or repeated workflow submission.
- Basic accessibility and keyboard navigation.
- API response consistency across failures.

## Manual QA Checklist

- Login works.
- Protected routes redirect to login before the demo session exists.
- Dashboard metrics load.
- Document upload or seeded document flow works.
- Document chunks display.
- RAG answer includes source snippets.
- AI workflow creates a review item.
- Workflow page shows deterministic tool-call steps and blocked state.
- Reviewer can approve, reject, or request changes.
- Audit log records the flow.
- Empty/loading/error states are visible.
- Browser console is clean.

## Required Checks

Before marking implementation complete, run available:

- Format check
- Typecheck
- Lint
- Tests
- Build

If a check cannot run, document why and what would be needed.

Current scaffold commands:

```bash
npm run format:check
npm run typecheck
npm run lint
npm run test
npm run build
```

## Production Test Upgrades

- Contract tests from OpenAPI schemas.
- End-to-end tests against deployed preview environments.
- Load tests for upload and RAG query endpoints.
- Regression evaluation sets for RAG answer quality and source selection.
- Security tests for prompt injection and file upload abuse.
