# Free Demo Deployment Decision

## Decision

Build the public portfolio demo on free or near-free infrastructure by default.

## Recommended Demo Stack

| Layer | Demo Choice | Reason |
|---|---|---|
| Frontend | Next.js on Vercel free tier | Fast public deployment and strong developer experience |
| Backend | FastAPI on a free/near-free host | Keeps AI, document processing, RAG, and workflow APIs in one simple MVP backend |
| Database | Supabase Postgres free tier | Real PostgreSQL with credible portfolio value |
| Vector Search | Supabase pgvector | Avoids a separate paid vector database |
| File Storage | Supabase Storage or seeded local files | Enough for demo documents |
| Auth | Supabase Auth | Avoids custom identity overhead |
| AI Provider | Mock AI mode by default; optional OpenAI/Claude key or local OpenAI-compatible LLM for local mode | Prevents draining private paid API keys |
| Background Jobs | Manual trigger or lightweight scheduled route | Avoids paid queues and workers |
| CI/CD | GitHub Actions | Free CI for public portfolio work |
| Monitoring | Logs and audit tables | Demonstrates observability concepts without paid tools |
| Deployment | Vercel, FastAPI free/near-free host, and Supabase | Keeps each part deployable without paid infrastructure |

## Why This Fits The Demo

The goal is to prove product thinking and implementation discipline, not to create a monthly infrastructure bill. Free-tier services are enough to demonstrate authentication, database design, document workflows, RAG, review queues, audit logging, and deployment readiness.

The free stack still maps to real production concerns: authenticated users, durable metadata, object storage, vector retrieval, backend validation, review workflows, and audit trails. The difference is operational scale, not product shape.

## Real-World Mapping

| Demo Component | Real-World Equivalent |
|---|---|
| Vercel frontend | CDN-backed frontend deployment with preview environments |
| FastAPI free/near-free backend | Containerized API service with autoscaling and health checks |
| Supabase Postgres | Managed PostgreSQL with backups, PITR, replicas, and stricter access control |
| Supabase Storage | S3-style object storage with lifecycle policies and scanning |
| pgvector | Tuned pgvector or dedicated vector database depending on scale |
| Mock AI or local LLM mode | Managed LLM provider with secrets, rate limits, tracing, and evals |
| Audit table | Append-only audit/event log with retention and access controls |

## Public Demo Constraints

- The deployed demo must not expose the project owner's private API keys.
- The deployed demo should prefer deterministic mock AI output.
- Local evaluation may support user-provided OpenAI or Claude API keys.
- Local evaluation may support OpenAI-compatible local LLM tools such as LM Studio.
- The MVP should use one FastAPI backend before considering service splits.
- Local LLM mode is optional and must not be required for the public demo.
- Upload sizes and retained files should be limited.
- Free-tier cold starts, quotas, and storage limits should be documented.
- Any paid or enterprise services should be described as production upgrades, not demo requirements.

## Production Upgrade Path

In a real company environment, consider:

- Dedicated FastAPI, NestJS, or service-based backend
- AWS ECS/Fargate, Lambda, or Kubernetes
- RDS/Aurora PostgreSQL
- S3 object storage
- Pinecone, Weaviate, Qdrant Cloud, or scaled pgvector
- SQS, BullMQ, Celery, or Temporal for background jobs
- Auth0, Cognito, Azure AD, or enterprise SSO
- OpenTelemetry, Sentry, Datadog, CloudWatch, or Grafana
- Terraform or AWS CDK for infrastructure

## README Wording

Include a short architecture note explaining that the project intentionally uses free-tier deployment for portfolio accessibility while documenting how the same design would evolve for production.
