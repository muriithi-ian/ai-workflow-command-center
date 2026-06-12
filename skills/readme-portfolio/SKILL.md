---
name: readme-portfolio
description: Write portfolio-focused documentation for AI Workflow Command Center. Use when creating or improving README content, architecture docs, API docs, screenshots, demo instructions, interview notes, trade-offs, security notes, or free-demo deployment explanations.
---

# Portfolio README Skill

## Goal

Make the project understandable to recruiters in 30 seconds and credible to engineers in 2 minutes.

## README Structure

Use this outline:

```md
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

## Positioning

Emphasize that the project demonstrates:

- Full-stack AI workflow engineering
- RAG with source grounding
- Human-in-the-loop review
- Auditability and traceability
- Backend APIs and data modeling
- Practical production trade-offs
- Safe use of synthetic demo data

## Real-World Readiness

When writing docs, connect demo features to realistic business workflows:

- Vendor intake and risk review
- Policy Q&A with source grounding
- Incident report summarization
- Customer escalation brief generation
- Operations report analysis
- Compliance or audit preparation

Explain operational concerns such as failure states, role boundaries, auditability, data retention, upload safety, observability, and production migration. Keep the tone practical: this is a demo implementation with real-world architecture instincts.

## Required Content

Must include:

- What the project does
- Why it exists
- Live demo link placeholder
- Screenshots placeholder
- Tech stack
- Architecture diagram placeholder
- Key features
- Free-demo architecture decision
- Production architecture upgrade path
- Security notes
- Testing instructions
- Local setup
- Trade-offs
- Future improvements

## Free Demo Messaging

Explain that the deployed demo uses free-tier services to keep it accessible:

- Vercel
- Supabase Postgres/Auth/Storage/pgvector
- Mock AI or user-provided API key mode
- GitHub Actions

Also explain the production upgrade path:

- Dedicated backend services
- Managed production database
- S3-style object storage
- Queue-based background processing
- Enterprise auth
- Full observability

## Screenshots

Capture screenshots for:

- Dashboard
- Document detail or upload
- RAG answer with sources
- Review queue
- Audit logs

Prefer clear proof-of-work screenshots over decorative visuals.

## Tone

Write in a style that is:

- Clear
- Confident
- Not hype-heavy
- Focused on engineering decisions
