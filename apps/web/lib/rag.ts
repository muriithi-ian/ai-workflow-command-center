import { demoDocuments } from "@/lib/documents";

type RagSource = {
  documentId: string;
  documentTitle: string;
  chunkId: string;
  heading: string;
  snippet: string;
  score: number;
};

type RagResult = {
  question: string;
  answer: string;
  status: "completed" | "no_context";
  aiRunId: string;
  provider: "mock";
  model: string;
  sources: RagSource[];
};

const defaultQuestion = "What risks are mentioned in the vendor onboarding document?";

const stopWords = new Set([
  "a",
  "about",
  "an",
  "and",
  "are",
  "demo",
  "does",
  "for",
  "in",
  "is",
  "of",
  "or",
  "say",
  "the",
  "to",
  "what",
  "which"
]);

export function getDefaultRagQuestion(): string {
  return defaultQuestion;
}

export function runFrontendMockRag(question = defaultQuestion): RagResult {
  const sources = retrieveSources(question);
  const aiRunId = `airun_${slugify(question).slice(0, 12)}`;

  if (sources.length === 0) {
    return {
      question,
      answer:
        "I could not find enough grounded context in the demo documents to answer that question. Try asking about vendor risks, retention, deletion, or audit evidence.",
      status: "no_context",
      aiRunId,
      provider: "mock",
      model: "mock-rag-v1",
      sources: []
    };
  }

  return {
    question,
    answer: `Mock RAG answer for: "${question}". The grounded context comes from ${[
      ...new Set(sources.map((source) => source.documentTitle))
    ].join(", ")}. Review the cited snippets before using this output.`,
    status: "completed",
    aiRunId,
    provider: "mock",
    model: "mock-rag-v1",
    sources
  };
}

function retrieveSources(question: string): RagSource[] {
  const questionTerms = tokenize(question);
  const scoredSources = demoDocuments.flatMap((document) =>
    document.chunks.flatMap((chunk) => {
      const chunkTerms = tokenize(`${chunk.heading} ${chunk.content}`);
      const overlap = [...questionTerms].filter((term) => chunkTerms.has(term));

      if (overlap.length === 0) {
        return [];
      }

      return [
        {
          documentId: document.id,
          documentTitle: document.title,
          chunkId: chunk.id,
          heading: chunk.heading,
          snippet: chunk.content,
          score: Number((overlap.length / Math.max(questionTerms.size, 1)).toFixed(3))
        }
      ];
    })
  );

  return scoredSources.sort((left, right) => right.score - left.score).slice(0, 3);
}

function tokenize(value: string): Set<string> {
  const cleaned = value
    .split("")
    .map((character) => (/[a-z0-9]/i.test(character) ? character.toLowerCase() : " "))
    .join("");
  return new Set(cleaned.split(/\s+/).filter((word) => word && !stopWords.has(word)));
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}
