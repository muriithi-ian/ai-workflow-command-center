---
name: ai-workflows
description: Implement AI workflow features for AI Workflow Command Center. Use when building RAG, embeddings, retrieval, source citations, AI provider abstraction, tool-calling flows, AI run storage, mock AI mode, document intake review, human review queues, or AI traceability.
---

# AI Workflow Skill

## Goal

Show practical AI workflow engineering: grounded outputs, traceability, review, and auditability.

## AI Rules

- Support mock mode by default for the public demo.
- Never treat AI output as automatically correct.
- Never hardcode or expose the project owner's API key.
- Keep prompts versioned in code.
- Store every AI run with input summary, input reference, output, status, model/provider, timestamp, retrieved context when relevant, and errors when failures occur.
- Show source snippets for RAG answers.
- Route at least one AI workflow through human review.
- Keep tools constrained and explicit.
- Add clear failure states when the LLM provider is unavailable.
- Prefer deterministic test fixtures for automated tests.

## Provider Abstraction

Use a small interface such as:

```ts
generateText(input)
generateEmbedding(input)
runToolCall(input)
```

Keep OpenAI, Anthropic, Gemini, local model, and mock behavior behind the abstraction.

## RAG Flow

Implement the flow in this order:

1. Extract document text.
2. Split text into chunks.
3. Generate or mock embeddings.
4. Store chunks and embeddings.
5. Retrieve relevant chunks for a query.
6. Generate an answer from retrieved context.
7. Display answer with source snippets.
8. Store the query and result as an `AiRun`.

## Document Intake Review

The required workflow should:

1. Accept a document.
2. Extract key points.
3. Identify risks or missing information.
4. Generate a structured summary.
5. Create a pending review item.
6. Allow approve, reject, or request changes.
7. Store the reviewer note and decision.
8. Write audit log events.

## Demo Modes

Prefer one of these public demo modes:

- Mock AI responses using deterministic synthetic outputs.
- User-provided OpenAI/Claude API key for local evaluation.
- Local OpenAI-compatible LLM mode for local development tools such as LM Studio.

Do not expose or consume the project owner's paid API key in the public demo.
Do not make local LLM mode the public demo default.

## Local LLM Mode

Support local LLMs through the same provider abstraction when they expose an OpenAI-compatible API.

Use environment variables such as:

- `AI_MODE=local`
- `LOCAL_LLM_BASE_URL=http://localhost:1234/v1`
- `LOCAL_LLM_API_KEY=lm-studio`
- `LOCAL_LLM_MODEL=<local-model-name>`

Local mode should:

- Work without committing secrets.
- Use clear timeout and unavailable-provider errors.
- Store provider metadata as `local` or `lmstudio` where appropriate.
- Preserve source snippets and human review behavior.
- Remain optional for local development, not required for the deployed demo.

## Demo Proof Requirements

The demo must prove:

- RAG
- Tool/function calling or an agent workflow
- Auditability
- Human review
- Production-safe fallback behavior
