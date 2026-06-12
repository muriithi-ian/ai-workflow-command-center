---
name: frontend-quality
description: Improve frontend implementation quality for AI Workflow Command Center. Use when building dashboard pages, forms, review queues, RAG search UI, document views, audit log views, loading states, error states, empty states, accessibility, or portfolio screenshots.
---

# Frontend Quality Skill

## Goal

Create a clear internal-tools dashboard that communicates the product quickly and supports a polished demo.

## UX Priorities

- Make the core workflow understandable in under 60 seconds.
- Show dashboard metrics for documents, AI runs, pending reviews, approvals, rejections, and errors.
- Make RAG answers visibly grounded with source snippets.
- Make review decisions obvious and auditable.
- Use synthetic demo data that looks realistic but not proprietary.

## Frontend Rules

- Use clean, simple dashboard UI.
- Keep pages recruiter-demo friendly.
- Give every page loading, empty, success, and error states.
- Use accessible labels and semantic HTML.
- Do not add animation-heavy UI unless requested.
- Prefer clear tables, cards, filters, and status badges.
- Keep copy concise and professional.

## Page Expectations

Include focused views:

- Dashboard overview
- Documents
- RAG search
- AI workflow run/detail
- Review queue
- Audit logs
- Settings or demo mode notes if useful

## State Handling

Every interactive page should include:

- Loading state
- Empty state
- Error state
- Success/confirmation state where appropriate

## Visual Direction

- Prefer clean enterprise SaaS styling.
- Keep animations subtle.
- Avoid visual complexity that distracts from workflow proof.
- Use consistent cards, tables, badges, and status colors.
- Ensure screenshots look good in the README.

## Accessibility

- Use semantic headings and labels.
- Keep contrast readable.
- Make buttons and form controls keyboard-friendly.
- Do not rely on color alone for status.

## Before Finishing

Check:

- Mobile responsiveness
- Keyboard navigation basics
- Broken states
- Console errors
