---
name: demo-readiness
description: Verify AI Workflow Command Center is ready for a recruiter, interview, Loom recording, or public demo. Use before demos, releases, screenshots, README finalization, or when checking setup, seed data, links, docs, and end-to-end demo flow.
---

# Demo Readiness Skill

## Goal

Make the project easy to run, explain, screenshot, and record without surprises.

## Required Checks

Verify:

- App runs locally from documented setup steps.
- Public demo works if a demo URL exists.
- Seed data exists and looks realistic but synthetic.
- Demo credentials work if documented.
- Screenshots are possible for key pages.
- README explains setup clearly.
- Demo script matches the actual app.
- Links in docs and README are not obviously broken.
- No private data, API keys, or NDA-protected content appears.

## Demo Flow

Confirm the happy path:

1. Login.
2. Upload or select a document.
3. View extracted chunks.
4. Ask a RAG question.
5. Review AI answer with sources.
6. Approve, reject, or request changes.
7. View audit log.
8. Open dashboard metrics.

## UI Readiness

Check:

- Loading states.
- Empty states.
- Error states.
- Success states.
- Mobile responsiveness basics.
- Keyboard navigation basics.
- Browser console errors.

## Documentation Readiness

Confirm docs explain:

- What the project does.
- Why it exists.
- Free-demo architecture decision.
- Production upgrade path.
- Security notes.
- Testing strategy.
- Demo script.
- Roadmap.

## Completion Output

When finishing a demo-readiness pass, summarize:

- What works.
- What was fixed.
- What remains risky.
- Screenshots or demo steps still needed.
- Tests/checks not run and why.
