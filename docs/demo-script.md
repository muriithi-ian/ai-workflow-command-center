# Demo Script

## Goal

Use this path to record a clean walkthrough video or live interview demo.

## Suggested Scenario

Use a realistic but synthetic vendor onboarding review. The uploaded document should contain a few operational details, missing security information, and one or two policy risks. This lets the demo show why RAG, human review, and audit logs matter in a business workflow.

## Demo Path

1. Start at `/login` and continue as Demo Admin.
2. Open `/dashboard` and briefly explain the document, AI run, review, and audit metrics.
3. Open `/documents` and select `Vendor Intake Security Review`.
4. On `/documents/doc_vendor_intake`, show extracted chunks and the workflow entry point.
5. Open `/documents/doc_vendor_intake/processing` and show validation, extraction, chunking, RAG-readiness, and audit event output.
6. Open `/documents/doc_contract_notes/processing` to demonstrate the blocked state for a document still processing.
7. Open `/rag` and ask: “What risks are mentioned in the vendor onboarding document?”
8. Review the mock RAG answer and point out source snippets, embedding IDs, matched terms, and vector previews.
9. Open `/ai-runs` and inspect a run detail page to show provider, model, input, output, retrieved context, and retrieval evidence.
10. Open `/workflows/document-intake` and explain the bounded tool-call sequence.
11. Open `/reviews` and show pending/completed review states.
12. Open `/audit-logs` and show document, RAG, AI, workflow, and review events.
13. Return to `/dashboard` and explain that counts are computed from seeded demo state.

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

- `npm run dev:web` and `npm run dev:api` run locally, or the public demo URL is available.
- Login creates the demo session and protected routes redirect unauthenticated visitors.
- Seeded document data exists and document chunks display.
- Document processing page shows completed and blocked stage states.
- RAG question returns source snippets.
- RAG page shows mock embedding index metadata and retrieval evidence.
- AI run detail page shows provider/model metadata and retrieved context.
- Workflow page shows tool-call steps and safe blocked state.
- Review queue has pending and completed items.
- Audit log has visible structured events.
- Browser console has no obvious app errors.
