# Demo Script

## Goal

Use this path to record a clean walkthrough video or live interview demo.

## Suggested Scenario

Use a realistic but synthetic vendor onboarding review. The uploaded document should contain a few operational details, missing security information, and one or two policy risks. This lets the demo show why RAG, human review, and audit logs matter in a business workflow.

## Demo Path

1. Login as a demo Admin or Reviewer.
2. Open the dashboard and briefly explain the document, AI run, review, and audit metrics.
3. Upload a synthetic document or select a seeded demo document.
4. Open the document detail page and show extracted text chunks.
5. Ask a RAG question about the document.
6. Review the AI answer and point out the source snippets.
7. Start or open the Document Intake Review workflow.
8. Show the AI-generated summary, risks, missing information, and original input.
9. Approve, reject, or request changes with a reviewer note.
10. Open the audit log and show document, AI, and review events.
11. Return to dashboard metrics and show the updated counts.

## What To Emphasize

- The system keeps source material, AI output, reviewer decisions, and audit events connected.
- The reviewer can inspect evidence instead of trusting a generated answer blindly.
- The audit log makes the workflow explainable after the fact.
- Mock AI mode protects the public demo from secret leakage and runaway API costs.

## Talk Track

- "This is not just a chatbot; it is a workflow system around AI output."
- "RAG answers are grounded with source snippets."
- "AI outputs are stored as runs so they are traceable."
- "At least one workflow requires human review before approval."
- "The audit log records important actions for operational visibility."
- "The public demo uses mock AI mode so it does not expose private paid API keys."
- "In production, the same flow would use a managed LLM provider, queue workers, stronger observability, and stricter data retention policies."

## Demo Data

Use synthetic documents such as:

- Vendor onboarding checklist
- Quarterly operations report
- Incident report
- Policy document
- Customer support summary
- Hiring workflow document

## Pre-Demo Checklist

- App runs locally or public demo URL is available.
- Demo credentials work.
- Seed data exists.
- RAG question returns source snippets.
- Review queue has a pending item or can create one.
- Audit log has visible events.
- Browser console has no obvious errors.
