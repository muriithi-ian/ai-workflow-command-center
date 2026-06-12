# AI Workflow Command Center — Portfolio Project Harness

## 1. Project Purpose

Build a production-style portfolio project that demonstrates practical AI workflow engineering, not just a chatbot.

The project should prove the following skills publicly:

- Full-stack product engineering
- Backend API design
- Authentication and role-based access control
- Document processing
- RAG / retrieval-augmented generation
- AI agent/tool-calling workflow
- Human review and approval flows
- Audit logging
- Dashboard and reporting
- Deployment and production readiness
- Clear technical documentation

This project is designed to replace NDA-restricted work by showing equivalent public proof of capability without using private company code, data, UI, internal logic, or confidential workflows.

## 2. Project Name

Recommended name:

```text
AI Workflow Command Center
```

Alternative names:

```text
AgentOps Dashboard
RAGOps Console
Executive AI Workflow Console
AI Operations Dashboard
```

## 3. Portfolio Tagline

```text
A production-style dashboard for managing AI document workflows, RAG search, agent actions, human review, and audit logs.
```

## 4. Target Roles This Project Should Support

This project should help applications for:

- AI Solutions Engineer
- AI Engineer
- AI Platform Engineer
- Backend Engineer
- Full Stack Engineer
- Internal Tools Engineer
- Automation Engineer
- Data / AI Workflow Engineer
- LLMOps / Agentic AI roles
- Executive decision-support AI roles

## 5. Core Product Concept

The application allows a user to upload documents, extract useful information, search across knowledge sources using RAG, trigger AI-assisted workflows, review AI outputs, approve or reject actions, and view audit logs and workflow metrics.

The product should feel like an internal AI operations platform that a company could use to manage document-heavy workflows, executive briefs, compliance workflows, or recruitment/business operations.

## 6. Non-Negotiable Rules

The implementor must follow these rules strictly.

### 6.1 NDA and Safety Rules

Do not use:

- Any real company source code
- Any private company data
- Any private client data
- Any internal UI from current or past employers
- Any confidential business logic
- Any proprietary prompts from employers
- Any screenshots from employer systems
- Any internal workflows copied directly from employer products
- Any real candidate/client/customer data

Use only:

- Synthetic data
- Public-domain sample documents
- Self-created mock documents
- Generic business scenarios
- Open-source libraries
- Public APIs where permitted

### 6.2 Scope Rules

Do not turn this into a giant unfinished platform.

The first version must be a polished MVP with a small number of complete features.

Do not build:

- A generic chatbot only
- A todo app
- A frontend-only dashboard
- A simple OpenAI wrapper
- A non-deployed local demo only
- A project with no tests
- A project with no README
- A project with no screenshots
- A project with no architecture explanation

### 6.3 Engineering Rules

Every feature should have:

- Clear API route or service boundary
- Basic validation
- Error handling
- Loading/error UI state
- Audit event where relevant
- README documentation

The codebase must include:

- TypeScript where applicable
- Environment variable example file
- Clear folder structure
- Database schema/migrations
- API documentation
- Basic tests
- Seed data
- Deployment instructions

### 6.4 AI Rules

AI output must never be treated as automatically correct.

The app must show that AI workflows are reviewed, traceable, and auditable.

Every AI run should store:

- Prompt or prompt template ID
- Input reference
- Output
- Model/provider used
- Timestamp
- Status
- Reviewer decision, if applicable
- Source citations or retrieved chunks, where applicable

The system must include a human review step for at least one workflow.

### 6.5 Portfolio Rules

The finished project must be easy for recruiters and engineers to understand within 60 seconds.

The README must include:

- What the project does
- Why it exists
- Tech stack
- Screenshots
- Architecture diagram
- Key features
- Setup instructions
- API overview
- Trade-offs
- Future improvements
- Security considerations
- Demo credentials if applicable

## 7. Recommended Tech Stack

Preferred stack:

```text
Frontend: Next.js, React, TypeScript, Tailwind CSS
Backend: Node.js/NestJS or FastAPI
Database: PostgreSQL
Vector Search: pgvector or Qdrant
Auth: NextAuth, Clerk, Auth.js, or custom JWT
AI Provider: OpenAI, Claude, Gemini, or local LLM-compatible abstraction
Storage: S3-compatible storage, local storage for MVP, or Supabase Storage
Deployment: Render, Railway, Fly.io, Vercel + managed backend, or AWS
CI/CD: GitHub Actions
```

Recommended simple version:

```text
Next.js full-stack app + PostgreSQL + pgvector + OpenAI/Claude API + GitHub Actions + Vercel/Railway deployment
```

## 8. MVP Features

### 8.1 Authentication

Required:

- Sign in / sign out
- At least two roles: Admin and Reviewer
- Protected dashboard routes

Optional:

- Demo login button
- Organization/team concept

### 8.2 Document Upload

Required:

- Upload PDF, TXT, or Markdown documents
- Store document metadata
- Extract text
- Chunk document text
- Store chunks
- Generate embeddings
- Store embeddings in vector database

Document metadata should include:

- File name
- File type
- Upload date
- Uploaded by
- Processing status
- Chunk count

### 8.3 RAG Search

Required:

- Ask a question over uploaded documents
- Retrieve relevant chunks
- Generate answer using retrieved context
- Show source snippets used for the answer
- Store each query as an AI run

Do not return answers without showing source context.

### 8.4 AI Workflow

Required workflow example:

```text
Document Intake Review
```

The workflow should:

1. Accept a document
2. Extract key points
3. Identify risks or missing information
4. Generate a structured summary
5. Send output to a human review queue
6. Allow reviewer to approve, reject, or request changes
7. Store the final decision in audit logs

### 8.5 Agent / Tool Calling

Add at least one tool-calling or agent-style workflow.

Example tools:

- Search uploaded documents
- Summarize selected document
- Generate executive brief
- Create action checklist
- Compare two documents
- Extract entities

The agent must be constrained. It should only use approved tools and should not perform hidden destructive actions.

### 8.6 Human Review Queue

Required:

- List AI outputs pending review
- Show original input
- Show AI output
- Show retrieved sources, if applicable
- Approve / reject / request revision
- Add reviewer note
- Store decision

### 8.7 Audit Logs

Required:

Track important events:

- Document uploaded
- Document processed
- RAG query submitted
- AI workflow started
- AI output generated
- Review decision made
- User signed in
- Error occurred

Audit log fields:

```text
id
actorId
action
resourceType
resourceId
metadata
createdAt
```

### 8.8 Dashboard

Required widgets:

- Total documents
- Processed documents
- Failed documents
- AI runs this week
- Pending reviews
- Approved outputs
- Rejected outputs
- Average processing time, if easy

### 8.9 API Documentation

Required:

- Route list
- Request examples
- Response examples
- Auth requirements
- Error format

## 9. Data Model Draft

Use this as a starting point.

```text
User
- id
- name
- email
- role
- createdAt

Document
- id
- title
- fileName
- fileType
- status
- uploadedById
- createdAt
- updatedAt

DocumentChunk
- id
- documentId
- chunkIndex
- content
- embedding
- metadata
- createdAt

AiRun
- id
- type
- provider
- model
- status
- input
- output
- retrievedContext
- createdById
- createdAt

ReviewItem
- id
- aiRunId
- status
- reviewerId
- reviewerNote
- decision
- createdAt
- reviewedAt

AuditLog
- id
- actorId
- action
- resourceType
- resourceId
- metadata
- createdAt
```

## 10. Suggested Repo Structure

```text
ai-workflow-command-center/
  README.md
  docs/
    architecture.md
    api.md
    security.md
    tradeoffs.md
    screenshots/
  apps/
    web/
  packages/
    database/
    ai/
    shared/
  prisma/ or migrations/
  tests/
  .env.example
  docker-compose.yml
  .github/
    workflows/
      ci.yml
```

Simpler structure is allowed if using one app, but keep documentation clear.

## 11. Implementation Phases

### Phase 1 — Foundation

Deliverables:

- Project setup
- Auth
- Database
- Dashboard shell
- Document model
- Seed data
- README draft

Acceptance criteria:

- App runs locally
- User can sign in
- Dashboard loads
- Database migrations work
- README explains local setup

### Phase 2 — Document Processing

Deliverables:

- Upload document
- Extract text
- Chunk text
- Store chunks
- Store processing status

Acceptance criteria:

- User can upload a TXT/MD/PDF file
- Document appears in dashboard
- Chunks are stored
- Failed processing shows clear error

### Phase 3 — RAG Search

Deliverables:

- Embeddings
- Vector search
- Question-answer interface
- Source snippets
- AI run storage

Acceptance criteria:

- User can ask a question over documents
- Answer includes retrieved source snippets
- AI run is stored
- Empty/no-result state is handled

### Phase 4 — Workflow + Review Queue

Deliverables:

- Document Intake Review workflow
- AI summary/risk extraction
- Review queue
- Approve/reject/request revision
- Audit logs

Acceptance criteria:

- AI output goes to review queue
- Reviewer can make decision
- Decision is stored
- Audit log records workflow events

### Phase 5 — Production Polish

Deliverables:

- Tests
- CI
- Deployment
- Screenshots
- Architecture diagram
- API docs
- Security notes
- Trade-offs page

Acceptance criteria:

- Live demo works
- README is complete
- Screenshots included
- CI passes
- Project can be explained in interviews

## 12. Acceptance Checklist

The project is not complete until all of these are true:

- [ ] Live demo is deployed
- [ ] GitHub repo is public
- [ ] README has screenshots
- [ ] README has architecture diagram
- [ ] README has setup instructions
- [ ] README explains business problem
- [ ] README explains AI workflow
- [ ] README explains security considerations
- [ ] README explains trade-offs
- [ ] At least one test exists
- [ ] At least one protected route exists
- [ ] At least one AI workflow exists
- [ ] RAG answers show source snippets
- [ ] Audit logs are implemented
- [ ] Human review queue is implemented
- [ ] No private/NDA data is used

## 13. README Positioning Statement

Use this near the top of the README:

```text
AI Workflow Command Center is a production-style portfolio project demonstrating AI workflow engineering: document ingestion, RAG search, agent-style tool use, human review, audit logs, backend APIs, PostgreSQL, authentication, and cloud deployment.
```

## 14. Interview Talking Points

Use this project to say:

```text
I built this project to publicly demonstrate the type of AI-enabled workflow engineering I have worked around professionally, without exposing any NDA-protected code or data.
```

```text
The focus was not to build a chatbot, but to build a production-style AI workflow system with traceability, review, audit logs, and operational thinking.
```

```text
I designed it to show how AI output should be grounded, reviewed, and logged before being used in business workflows.
```

## 15. Implementation Restrictions

The implementor must not:

- Add random unrelated features
- Build social login before core workflow works
- Spend too much time on UI animations
- Skip backend validation
- Skip documentation
- Skip audit logs
- Hardcode secrets
- Commit API keys
- Use real private data
- Build only a chatbot
- Ignore deployment
- Leave broken setup instructions
- Add tools without explaining why
- Use AI output without review/traceability

## 16. Coding Standards

Required:

- Use meaningful names
- Keep functions small where practical
- Validate inputs
- Handle errors clearly
- Use consistent API response format
- Add comments only where they explain non-obvious logic
- Prefer simple architecture over over-engineering
- Keep business logic out of UI components where possible
- Store secrets in environment variables
- Use migrations or documented schema setup

## 17. AI Provider Abstraction

Do not hardwire the whole app to one provider.

Create a small abstraction such as:

```text
AiProvider.generateText()
AiProvider.generateEmbedding()
AiProvider.runToolCall()
```

This allows switching between OpenAI, Claude, Gemini, or local models later.

## 18. Security Requirements

Minimum security expectations:

- No secrets in Git
- Use `.env.example`
- Validate uploaded files
- Limit upload size
- Restrict file types
- Protect dashboard routes
- Use role checks for review actions
- Log important actions
- Avoid exposing raw internal errors to users
- Add basic rate limiting if practical

## 19. Suggested Synthetic Demo Scenario

Use a fake business scenario:

```text
A company receives operational reports, vendor notes, and policy documents. The system helps teams ingest documents, ask grounded questions, generate executive summaries, identify risks, and route AI outputs for human review before action.
```

Sample documents can include:

- Fake vendor onboarding checklist
- Fake quarterly operations report
- Fake incident report
- Fake policy document
- Fake customer support summary
- Fake hiring workflow document

## 20. Starter Prompt for Implementor

Paste the following prompt into Codex, Claude Code, or another implementation agent.

```text
You are implementing a portfolio project called AI Workflow Command Center.

Your goal is to build a production-style full-stack AI workflow dashboard that demonstrates document ingestion, RAG search, AI workflow execution, human review, audit logging, backend APIs, authentication, and deployment readiness.

This is a portfolio project for a senior full-stack/backend/AI solutions engineer. It must look practical, disciplined, and production-aware. Do not build a toy chatbot.

Core stack preference:
- Next.js + React + TypeScript for the frontend
- Node.js/NestJS or FastAPI for backend services
- PostgreSQL for relational data
- pgvector or Qdrant for vector search
- OpenAI/Claude/Gemini-compatible AI provider abstraction
- Docker where useful
- GitHub Actions for CI

Non-negotiable rules:
1. Do not use any private company code, data, UI, workflows, screenshots, or NDA-protected material.
2. Use only synthetic documents and mock business data.
3. Build a complete MVP before adding extra features.
4. RAG answers must show source snippets.
5. AI outputs must be stored as AI runs.
6. At least one workflow must require human review before approval.
7. Important actions must create audit logs.
8. Do not hardcode API keys or secrets.
9. Include a clear README, setup instructions, architecture notes, and API documentation.
10. Prefer simple, working, maintainable implementation over over-engineered abstractions.

Required MVP features:
- Auth with Admin and Reviewer roles
- Dashboard with basic metrics
- Document upload and processing
- Text extraction and chunking
- Embedding generation and vector search
- RAG question-answering with source snippets
- AI workflow: Document Intake Review
- Human review queue with approve/reject/request changes
- Audit logs
- API documentation
- Seed/demo data
- At least basic tests

Build in phases:
Phase 1: Project setup, auth, database, dashboard shell, seed data.
Phase 2: Document upload, text extraction, chunking, document status.
Phase 3: Embeddings, vector search, RAG Q&A with sources, AI run storage.
Phase 4: Document Intake Review workflow, review queue, approval/rejection, audit logs.
Phase 5: Tests, CI, deployment readiness, screenshots, README, architecture diagram.

Before writing code, produce:
1. The proposed folder structure.
2. The data model.
3. The API route list.
4. The first implementation plan for Phase 1 only.

After each phase, verify acceptance criteria before moving on. Do not skip documentation. Do not add unrelated features.
```

## 21. First Commit Scope

The first commit should include only:

- Project scaffold
- README with project purpose
- `.env.example`
- Basic dashboard shell
- Database/schema setup
- Auth placeholder or implementation
- Seed data script
- Initial architecture note

Commit message:

```text
chore: scaffold AI workflow command center
```

## 22. Portfolio README Outline

Use this README structure:

```markdown
# AI Workflow Command Center

## Overview
## Why I Built This
## Key Features
## Screenshots
## Architecture
## Tech Stack
## Core AI Workflow
## Data Model
## API Overview
## Security Considerations
## Local Setup
## Environment Variables
## Testing
## Deployment
## Trade-offs
## Future Improvements
## Interview Notes
```

## 23. What Success Looks Like

A recruiter should understand this in 30 seconds:

```text
Ian can build practical AI workflow systems, not just call an LLM API.
```

An engineer should understand this in 2 minutes:

```text
The project includes real backend structure, RAG, AI run storage, review workflows, audit logs, and production-aware documentation.
```

A hiring manager should understand this:

```text
This project proves Ian can turn ambiguous AI/business workflow problems into useful, maintainable software.
```

## 24. Optional Stretch Features

Only add these after MVP is complete:

- Organization/team multi-tenancy
- CSV ingestion
- Email brief generation
- Scheduled reports
- Evaluation scoring for AI outputs
- Prompt versioning
- Cost tracking per AI run
- More advanced agent tools
- Admin settings page
- Dockerized full local stack
- Role-specific dashboards
- Slack/Discord notification integration

## 25. Final Warning

This project should be finished, deployed, and documented. A smaller complete project is better than a large incomplete one.

The project must communicate discipline, judgment, and production thinking.

Do not let the implementor drift into side quests.

---

## Free Demo Stack Decision

### Goal

The portfolio demo should be deployable at **zero monthly cost** or as close to zero as possible, while still proving the architecture, product thinking, and engineering discipline expected for AI Solutions Engineer, Full Stack Engineer, Backend Engineer, and AI Platform roles.

This is an intentional architectural decision for a public portfolio project. The demo prioritizes accessibility, reproducibility, and low operating cost over full enterprise-grade infrastructure.

### Free / Near-Free Demo Stack

Use this stack for the public demo:

| Layer | Free-demo choice | Why |
|---|---|---|
| Frontend | Next.js on Vercel free tier | Fast deployment, good developer experience, easy public demo link |
| Backend | Next.js API routes or FastAPI on Render/Fly/Railway free tier where available | Keeps infrastructure simple and avoids paid server costs |
| Database | Supabase Postgres free tier | Real PostgreSQL, auth support, easy setup, good portfolio credibility |
| Vector search | Supabase pgvector or local embeddings stored in Postgres | Avoids paying for a separate vector database |
| File storage | Supabase Storage free tier or local demo seed files | Enough for portfolio uploads and document demos |
| Auth | Supabase Auth or simple credentials-based auth | Avoids building full identity infrastructure from scratch |
| LLM provider | OpenAI/Claude/Gemini key supplied by the user running the demo, or mocked AI responses in public demo mode | Prevents your own API key from being drained |
| Background jobs | Manual trigger or lightweight scheduled route | Avoids paid queues/workers |
| CI/CD | GitHub Actions free tier | Shows production workflow without extra cost |
| Monitoring | Application logs + simple audit table | Demonstrates observability concepts without paid tools |
| Deployment | Vercel + Supabase | Easiest free public deployment path |

### Free Demo Limitations

Document these limitations clearly in the README:

- The demo uses free-tier infrastructure, so cold starts, request limits, and storage limits may apply.
- The public demo may use mocked AI responses or require the evaluator to provide their own API key.
- Background jobs are simplified to manual or lightweight triggers instead of a production queue.
- Observability is limited to logs, audit tables, and basic error handling instead of Datadog, CloudWatch, Grafana, or ELK.
- File upload size and retention are intentionally limited.
- The system is designed to demonstrate architecture and implementation discipline, not to operate at enterprise scale.
- Secrets, API keys, and private data must never be committed to the repository.
- The project must not use any proprietary employer data, workflows, UI, code, or business logic.

### Optimal Production Architecture

If this were built for a real company, the optimal stack would be stronger:

| Layer | Optimal production choice | Why |
|---|---|---|
| Frontend | Next.js on Vercel Pro, AWS Amplify, or CloudFront/S3 | Reliable hosting, previews, CDN, team workflows |
| Backend | FastAPI or Node.js/NestJS services on AWS ECS/Fargate, Lambda, or Kubernetes | Better scaling, service separation, observability, deployment control |
| Database | AWS RDS PostgreSQL or Aurora PostgreSQL | Managed backups, scaling, security, reliability |
| Vector database | Pinecone, Weaviate, Qdrant Cloud, or pgvector on managed Postgres | Better vector search performance, filtering, and scaling |
| File storage | AWS S3 | Durable, cheap, secure object storage |
| Auth | AWS Cognito, Auth0, or enterprise SSO | Production-grade identity, MFA, SSO, access controls |
| LLM provider | OpenAI, Anthropic, Azure OpenAI, or Bedrock | Better enterprise controls, model choice, security options |
| Background jobs | SQS + Lambda, Celery + Redis, BullMQ, or Temporal | Reliable async processing, retries, monitoring |
| CI/CD | GitHub Actions + IaC deployment | Repeatable infrastructure and safer releases |
| Observability | CloudWatch, Datadog, Grafana, Sentry, OpenTelemetry | Production monitoring, tracing, alerting, incident response |
| Infrastructure | Terraform / AWS CDK | Versioned infrastructure, reproducibility, auditability |

### Why Not Use the Optimal Stack for the Demo?

The optimal stack is better for production, but it adds cost and operational overhead. For a portfolio project, the goal is to prove the architecture and implementation choices without creating a monthly bill.

The free demo should therefore use managed free-tier services while explaining how the same system would evolve into the production architecture.

### Required README Wording

Include this in the public README:

```md
## Architectural Decision: Free Demo Deployment

This project is deployed using free-tier services to keep the public demo accessible at no cost. The demo uses Vercel and Supabase to provide a working full-stack application with authentication, PostgreSQL, document storage, and vector search through pgvector.

This is a deliberate portfolio decision. In a production environment, I would move the backend to AWS ECS/Fargate or Lambda, store files in S3, use RDS/Aurora PostgreSQL, add a production queue for background jobs, integrate enterprise authentication, and implement full observability with CloudWatch, OpenTelemetry, Sentry, or Datadog.

The free version demonstrates the same core engineering concepts: API design, authentication, document workflows, RAG, audit logs, human review, deployment, and maintainable architecture, while keeping operating costs at zero.
```

### Implementation Rule

The implementor must build the public demo using the free-demo stack unless explicitly instructed otherwise.

Do not introduce paid services, paid databases, paid queues, paid observability tools, or paid LLM usage that requires the project owner’s private API key to be used by public visitors.

If an LLM provider is needed, implement one of these modes:

1. **User-provided API key mode** — the evaluator can enter their own key locally.
2. **Mock AI mode** — the public demo returns realistic fixed AI outputs.
3. **Local model mode** — optional, only if it can run without cloud cost.

The default deployed demo must not expose or consume the project owner’s private paid API key.


