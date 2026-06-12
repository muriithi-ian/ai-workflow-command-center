# Architecture Decisions

These decisions document the trade-offs behind the MVP. They are intentionally written like lightweight ADRs so the project can be discussed as an engineering system, not just a demo.

## Architectural Decision: FastAPI Instead Of Node Backend

### Context

The MVP needs strong support for document processing, embeddings, RAG, AI orchestration, and clean API boundaries.

### Decision

Use FastAPI as the single backend for the MVP.

### Why

FastAPI fits Python-based AI workflows naturally while still providing clear typed APIs and production-style backend structure.

### Trade-offs

- Improves AI workflow implementation speed and backend simplicity.
- Avoids maintaining a separate Node API during MVP.
- Defers a backend-for-frontend pattern that may be useful later.

### Production Upgrade Path

Split into a Node.js app API and Python AI service if scale, team ownership, or deployment complexity justifies it.

## Architectural Decision: Explicit Workflow State

### Context

Real AI workflows need to show where work is in the lifecycle: uploaded, processing, ready, failed, pending review, approved, rejected, or needs changes.

### Decision

Represent document, AI run, and review lifecycle states explicitly in the database and UI.

### Why

Explicit states make failures visible, support dashboard metrics, simplify debugging, and make the system easier to explain to reviewers.

### Trade-offs

- Adds data-model and UI complexity.
- Requires careful transitions to avoid impossible states.
- Improves operational clarity and auditability.

### Production Upgrade Path

Move state transitions behind workflow orchestration, queue workers, or Temporal-style durable workflows when async processing becomes more complex.

## Architectural Decision: Free-Tier Supabase And Vercel

### Context

The public demo should be easy to access without creating a monthly bill.

### Decision

Use Vercel for the frontend and Supabase for Auth, Postgres, Storage, and pgvector.

### Why

This gives the demo real hosted infrastructure while staying free or near-free.

### Trade-offs

- Improves accessibility and deployment speed.
- Accepts free-tier limits, cold starts, and quota constraints.
- Defers enterprise-grade reliability and observability.

### Production Upgrade Path

Move to AWS ECS/Fargate or Lambda, RDS/Aurora PostgreSQL, S3, production queues, and full monitoring.

## Architectural Decision: Mock AI Mode By Default

### Context

Public demos can accidentally consume paid API credits or expose private keys. Local development may also benefit from running against local OpenAI-compatible LLM tools such as LM Studio.

### Decision

Use deterministic mock AI responses by default and allow optional OpenAI/Claude keys or a local OpenAI-compatible LLM endpoint for local mode.

### Why

Mock mode makes the public demo safe, repeatable, and inexpensive. Local LLM mode lets the project demonstrate provider abstraction and offline/cost-controlled experimentation without requiring paid cloud inference.

### Trade-offs

- Improves safety and reproducibility.
- Does not prove live model quality in the public demo.
- Local LLM output quality varies by model and hardware.
- Local LLM setup adds developer configuration steps.
- Requires clear documentation so reviewers understand the design.

### Production Upgrade Path

Use OpenAI, Anthropic, Azure OpenAI, or Bedrock with secret management, rate limits, monitoring, and evaluation.

## Architectural Decision: OpenAI-Compatible Local LLM Adapter

### Context

Tools such as LM Studio can expose local models through an OpenAI-compatible API. Supporting that shape avoids building a one-off integration while keeping the app provider-agnostic.

### Decision

Support `AI_MODE=local` through the existing AI provider abstraction using `LOCAL_LLM_BASE_URL`, `LOCAL_LLM_API_KEY`, and `LOCAL_LLM_MODEL`.

### Why

This keeps local LLM support small, testable, and aligned with the same interface used for cloud providers and mock responses.

### Trade-offs

- Improves local development flexibility and reduces API cost.
- Depends on the evaluator running a compatible local server.
- Requires clear timeout and unavailable-provider errors.
- Local models may produce weaker or less structured output than managed models.

### Production Upgrade Path

Use managed model endpoints with secret management, observability, model evaluations, and reliability controls. Keep local LLM mode as a development option unless explicitly approved for internal deployment.

## Architectural Decision: pgvector Instead Of Pinecone

### Context

The MVP needs vector search without adding another paid service.

### Decision

Use Supabase Postgres with pgvector.

### Why

pgvector keeps relational data and embeddings in one free-demo database while still demonstrating RAG architecture.

### Trade-offs

- Improves simplicity and cost control.
- May not match dedicated vector database performance at larger scale.
- Requires careful indexing and filtering if the corpus grows.

### Production Upgrade Path

Move to Pinecone, Weaviate, Qdrant Cloud, or a tuned managed Postgres/pgvector setup when scale requires it.

## Architectural Decision: Single Backend For MVP

### Context

Separate product and AI services add operational complexity.

### Decision

Use one FastAPI backend for product APIs, document workflows, RAG, reviews, and audit logging.

### Why

The single backend keeps the MVP easier to build, deploy, explain, and review.

### Trade-offs

- Improves delivery speed and reduces implementation risk.
- Defers independent scaling of product APIs and AI processing.
- Requires clear service boundaries inside the FastAPI app.

### Production Upgrade Path

Split into a Node.js backend-for-frontend and Python AI service when scale or team boundaries justify it.

## Architectural Decision: Human Review And Audit Logs

### Context

AI outputs can be wrong, incomplete, or unsupported by source material.

### Decision

Require human review for at least one workflow and record important actions in audit logs.

### Why

This demonstrates production-aware AI workflow design rather than blind model automation.

### Trade-offs

- Improves safety, trust, and traceability.
- Adds UX and data model complexity.
- Slows automated workflows intentionally.

### Production Upgrade Path

Add risk scoring, reviewer assignment, escalation, approval policies, retention rules, and compliance reporting.

## Architectural Decision: Auditability Over Full Automation

### Context

Automating document decisions without traceability creates risk when AI output is wrong, unsupported, or misunderstood.

### Decision

Favor reviewable drafts, source references, AI run records, and audit logs over fully automated actions.

### Why

This makes the system safer for real business workflows where accountability matters.

### Trade-offs

- Slower than direct automation.
- Requires more UI and data modeling.
- Better reflects how AI should be introduced into operational systems.

### Production Upgrade Path

Add policy-based auto-approval only for low-risk outputs with confidence thresholds, evaluation history, reviewer override, and post-action monitoring.
