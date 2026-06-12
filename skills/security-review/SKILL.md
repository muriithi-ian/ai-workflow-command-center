---
name: security-review
description: Review AI Workflow Command Center for security risks. Use when changing auth, API routes, file uploads, Supabase access, AI prompts, RAG workflows, public demo behavior, secrets, data handling, or before release/demo readiness checks.
---

# Security Review Skill

## Goal

Catch security and privacy risks before they reach the public demo.

## Required Checks

Check for:

- Secrets committed to the repo.
- `.env.example` missing required variables.
- Hardcoded API keys, tokens, passwords, or service-role keys.
- Public demo paths that consume the project owner's paid API key.
- Missing auth on protected routes.
- Missing Admin/Reviewer role checks.
- Missing API input validation.
- Unsafe file upload types or sizes.
- Raw stack traces or provider errors exposed to users.
- Prompt injection risks in uploaded documents or retrieved chunks.
- Data leakage through logs, screenshots, AI prompts, or audit metadata.

## Auth And Access

- Use Supabase Auth for identity.
- Enforce role checks in the FastAPI backend for sensitive actions.
- Prefer backend-mediated workflow actions over direct client writes.
- If direct Supabase client access is used, verify row-level security policies.

## File Upload Safety

- Restrict accepted file extensions and MIME types.
- Limit upload size.
- Reject executable or unknown formats.
- Store only synthetic demo files unless the user explicitly provides safe local test files.
- Return user-friendly processing errors.

## AI And RAG Safety

- Treat uploaded document text as untrusted input.
- Keep system prompts and tool rules separate from retrieved document text.
- Do not let retrieved text override tool permissions or reveal secrets.
- Require source snippets for RAG answers.
- Route high-impact or uncertain outputs to human review.
- Use deterministic mock AI mode for the deployed public demo.

## Public Demo Safety

- Do not expose private keys.
- Do not log sensitive user-provided content unnecessarily.
- Document free-tier limits and demo data assumptions.
- Confirm screenshots and seed data contain no private or NDA-protected content.

## Completion Output

When finishing a security review, summarize:

- Risks found.
- Fixes made.
- Remaining risks.
- Files reviewed or changed.
- Checks not run and why.
