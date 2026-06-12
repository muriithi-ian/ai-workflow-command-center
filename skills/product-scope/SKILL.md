---
name: product-scope
description: Keep AI Workflow Command Center scoped as a polished portfolio demo. Use when adding or changing features, defining MVP boundaries, choosing implementation phases, preventing scope creep, or deciding what belongs in the demo versus future improvements.
---

# Product Scope Skill

## Goal

Shape the project into a complete, recruiter-friendly demo that proves AI workflow engineering without becoming an unfinished enterprise platform.

## Before Implementing

Check whether the request is inside the MVP. If the request is outside scope, explain why and suggest the smallest MVP-safe alternative.

## Allowed MVP Features

- Auth
- Document upload
- Document list/detail
- Text extraction
- RAG search
- AI run history
- Document Intake Review workflow
- Constrained tool/function calling or agent workflow
- Human review queue
- Audit logs
- Admin dashboard
- Seed/demo data
- Basic tests
- API documentation
- README and architecture docs

## Scope Rules

- Prefer one complete workflow over many partial workflows.
- Prefer seeded demo documents if upload complexity blocks progress.
- Prefer mock AI mode if API cost or secret handling complicates the public demo.
- Defer multi-tenancy, billing, notifications, prompt management, and advanced observability.
- Defer enterprise infrastructure unless documenting the production upgrade path.

## Do Not Add

- Payments
- Chat rooms
- Social features
- Complex multi-tenant billing
- Mobile app
- Unrequested UI redesigns
- Paid cloud services
- Enterprise SSO
- Over-engineered microservices

## Decision Heuristic

Include a feature only when it improves one of these demo signals:

- Shows full-stack engineering ability.
- Shows backend/API quality.
- Shows AI output traceability.
- Shows human-in-the-loop workflow design.
- Makes the portfolio story easier to understand in 60 seconds.

Otherwise, document it as a future improvement.
