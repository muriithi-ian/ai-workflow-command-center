---
name: testing-and-review
description: Test and review AI Workflow Command Center implementation. Use when adding unit tests, integration tests, smoke tests, CI checks, manual QA, acceptance criteria, security review, accessibility review, or final demo readiness review.
---

# Testing and Review Skill

## Goal

Verify the demo works, documents its limits, and avoids embarrassing portfolio failures.

## Before Marking Complete

- Run typecheck.
- Run lint.
- Run tests.
- Run build.
- Summarize what changed.
- Summarize risks.
- List files changed.
- Mention any tests not run and why.

## Test Priorities

Add focused tests for:

- Input validation
- Document chunking
- RAG retrieval behavior
- AI provider mock mode
- Review decision state changes
- Audit log creation
- Role-protected actions

Prefer small meaningful tests over broad brittle coverage.

## Manual QA Checklist

Verify:

- App starts from documented setup steps.
- Demo login works.
- Dashboard metrics load.
- Documents can be viewed or ingested.
- RAG answer shows source snippets.
- AI workflow creates a review item.
- Reviewer can approve, reject, or request changes.
- Audit log records the flow.
- Empty, loading, and error states are visible.

## Security Review

Check:

- No secrets in repo.
- `.env.example` documents required variables.
- Upload types and sizes are restricted.
- Protected routes require auth.
- Review actions require reviewer/admin role.
- Raw stack traces are not shown to users.
- Public demo does not use the owner's private paid API key.

## CI

Include lightweight CI that runs:

- Type checking
- Linting if configured
- Unit tests
- Build

Do not add a large CI setup that slows down the demo without improving confidence.

## If Tests Fail

- Do not ignore failures.
- Fix the root cause.
- If blocked, explain the blocker clearly.
