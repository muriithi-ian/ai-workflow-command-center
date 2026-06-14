import { demoDocuments } from "@/lib/documents";

type RagSource = {
  documentId: string;
  documentTitle: string;
  chunkId: string;
  embeddingId: string;
  heading: string;
  snippet: string;
  score: number;
  matchedTerms: string[];
  retrievalReason: string;
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

type RagIndexItem = {
  documentId: string;
  documentTitle: string;
  chunkId: string;
  embeddingId: string;
  heading: string;
  tokenCount: number;
  vectorPreview: number[];
};

type RagIndexStatus = {
  provider: "mock";
  model: string;
  dimensions: number;
  chunkCount: number;
  status: "ready" | "empty";
  items: RagIndexItem[];
};

const defaultQuestion = "What risks are mentioned in the vendor onboarding document?";
const mockEmbeddingModel = "mock-hash-embedding-v1";
const mockEmbeddingDimensions = 8;

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
    ].join(", ")}. The relevant source areas are ${sources
      .map((source) => source.heading.toLowerCase())
      .join("; ")}. Review the cited snippets before using this output.`,
    status: "completed",
    aiRunId,
    provider: "mock",
    model: "mock-rag-v1",
    sources
  };
}

export function getFrontendRagIndexStatus(): RagIndexStatus {
  const items = demoDocuments.flatMap((document) =>
    document.chunks.map((chunk) => ({
      documentId: document.id,
      documentTitle: document.title,
      chunkId: chunk.id,
      embeddingId: buildMockEmbeddingId(chunk.id),
      heading: chunk.heading,
      tokenCount: chunk.tokenCount,
      vectorPreview: buildMockEmbedding(`${chunk.heading} ${chunk.content}`).slice(0, 4)
    }))
  );

  return {
    provider: "mock",
    model: mockEmbeddingModel,
    dimensions: mockEmbeddingDimensions,
    chunkCount: items.length,
    status: items.length > 0 ? "ready" : "empty",
    items
  };
}

function retrieveSources(question: string): RagSource[] {
  const questionTerms = tokenize(question);
  const questionEmbedding = buildMockEmbedding(question);
  const scoredSources = demoDocuments.flatMap((document) =>
    document.chunks.flatMap((chunk) => {
      const chunkText = `${chunk.heading} ${chunk.content}`;
      const chunkTerms = tokenize(chunkText);
      const matchedTerms = [...questionTerms].filter((term) => chunkTerms.has(term)).sort();

      if (matchedTerms.length === 0) {
        return [];
      }

      const lexicalScore = matchedTerms.length / Math.max(questionTerms.size, 1);
      const vectorScore = cosineSimilarity(questionEmbedding, buildMockEmbedding(chunkText));

      return [
        {
          documentId: document.id,
          documentTitle: document.title,
          chunkId: chunk.id,
          embeddingId: buildMockEmbeddingId(chunk.id),
          heading: chunk.heading,
          snippet: chunk.content,
          score: Number((lexicalScore * 0.7 + vectorScore * 0.3).toFixed(3)),
          matchedTerms,
          retrievalReason: `Matched ${matchedTerms.length} query terms using ${mockEmbeddingModel}.`
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

function buildMockEmbeddingId(chunkId: string): string {
  return `emb_${chunkId}`;
}

function buildMockEmbedding(text: string): number[] {
  const vector = Array.from({ length: mockEmbeddingDimensions }, () => 0);

  for (const token of tokenize(text)) {
    const bucket =
      [...token].reduce((sum, character) => sum + character.charCodeAt(0), 0) %
      mockEmbeddingDimensions;
    vector[bucket] += 1;
  }

  const magnitude = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
  if (magnitude === 0) {
    return vector;
  }

  return vector.map((value) => Number((value / magnitude).toFixed(4)));
}

function cosineSimilarity(left: number[], right: number[]): number {
  if (left.length !== right.length || left.length === 0) {
    return 0;
  }

  return Number(left.reduce((sum, value, index) => sum + value * right[index], 0).toFixed(3));
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}
