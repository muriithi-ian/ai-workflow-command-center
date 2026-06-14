import { runFrontendMockRag } from "@/lib/rag";

export type AiRunStatus = "completed" | "needs_review" | "failed" | "no_context";

export type AiRunDetail = {
  id: string;
  workflow: string;
  status: AiRunStatus;
  provider: "mock";
  model: string;
  createdAt: string;
  inputSummary: string;
  output: string;
  retrievedContext: {
    documentId: string;
    documentTitle: string;
    chunkId: string;
    embeddingId: string;
    heading: string;
    snippet: string;
    score: number;
    matchedTerms: string[];
    retrievalReason: string;
  }[];
  errors: string[];
};

const ragRun = runFrontendMockRag();
const noContextRun = runFrontendMockRag("What does the demo say about lunar agriculture?");

export const demoAiRuns: AiRunDetail[] = [
  {
    id: ragRun.aiRunId,
    workflow: "RAG Question Answering",
    status: ragRun.status,
    provider: ragRun.provider,
    model: ragRun.model,
    createdAt: "2026-01-15T12:30:00Z",
    inputSummary: ragRun.question,
    output: ragRun.answer,
    retrievedContext: ragRun.sources,
    errors: []
  },
  {
    id: "airun_vendor_risk_summary",
    workflow: "Document Intake Review",
    status: "needs_review",
    provider: "mock",
    model: "mock-rag-v1",
    createdAt: "2026-01-15T12:10:00Z",
    inputSummary: "Summarize vendor onboarding risks for human review.",
    output:
      "The vendor review has unresolved subprocesser, incident notification, and deletion timeline questions that should be reviewed before approval.",
    retrievedContext: [],
    errors: []
  },
  {
    id: noContextRun.aiRunId,
    workflow: "RAG Question Answering",
    status: noContextRun.status,
    provider: noContextRun.provider,
    model: noContextRun.model,
    createdAt: "2026-01-15T12:35:00Z",
    inputSummary: noContextRun.question,
    output: noContextRun.answer,
    retrievedContext: noContextRun.sources,
    errors: ["No matching seed chunks were retrieved for the question."]
  }
];

export function getAiRuns(): AiRunDetail[] {
  return demoAiRuns;
}

export function getAiRunById(runId: string): AiRunDetail | undefined {
  return demoAiRuns.find((run) => run.id === runId);
}
