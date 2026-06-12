# Interview Talking Points

## Why I Built This

I built this to publicly demonstrate practical AI workflow engineering without exposing private company code, data, UI, prompts, or workflows. The goal was to show how AI can be integrated into a real product flow with grounding, review, and auditability.

The project is framed as an internal operations platform because that is where many real AI systems create value: summarizing documents, surfacing risks, speeding up reviews, and preserving accountability.

## Hardest Technical Decision

The hardest decision was keeping the architecture simple enough to finish while still credible. I chose a single FastAPI backend for the MVP because it supports document processing, RAG, and AI orchestration well. I documented how it could later split into a Node.js app API and Python AI service.

## How RAG Works

Documents are ingested, text is extracted, content is split into chunks, embeddings are generated or mocked, relevant chunks are retrieved for a question, and the answer is generated from that retrieved context. The UI shows source snippets so the user can inspect grounding.

## How I Handle AI Failures

The app supports mock AI mode by default and should show clear failure states if an optional LLM provider is unavailable. AI runs store status and errors so failures are visible instead of disappearing.

In production, I would add provider timeouts, retry limits, circuit breakers, fallback models, alerting, and evaluation checks so failures degrade gracefully instead of blocking the entire workflow.

## Why Local LLM Mode Exists

I kept mock mode as the public demo default, but added an optional local OpenAI-compatible mode for tools such as LM Studio. That demonstrates provider abstraction, lets evaluators test locally without paid API calls, and keeps cloud secrets out of the deployed demo.

## How I Prevent Hallucination

RAG answers must include source snippets, and high-impact workflow outputs go to human review. The system treats AI output as a draft that must be reviewed, not as an automatically correct result.

## How I Would Scale This

I would add queue-based background processing, separate read/write paths where needed, tune vector indexes, add caching, move heavy AI work to a dedicated service, and introduce observability with traces and metrics.

I would also separate user-facing workflow APIs from heavy document/AI jobs once traffic, latency, or team ownership made that separation worth the operational overhead.

## How I Would Secure This

I would keep secrets in managed secret storage, enforce role-based access, validate uploads, restrict file types and sizes, add rate limits, use Supabase row-level security where applicable, log sensitive actions, and design for deletion and retention policies.

## How I Would Move This To AWS

I would host the frontend on CloudFront/S3 or Amplify, run the backend on ECS/Fargate or Lambda, use RDS/Aurora PostgreSQL, S3 for documents, SQS or EventBridge for async processing, Cognito or enterprise SSO for auth, and CloudWatch/OpenTelemetry/Sentry for observability.

## What I Would Improve Next

- Background jobs for document processing
- Evaluation metrics for AI outputs
- More granular role permissions
- Multi-tenant organization support
- OpenTelemetry traces
- Production queue and retry behavior
- More robust prompt injection defenses
- Data retention and deletion workflows
- Reviewer assignment and escalation rules
