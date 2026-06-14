from datetime import UTC, datetime
from uuid import NAMESPACE_URL, uuid5

from app.models.ai_runs import RagQueryData, RagQueryRequest, RagSource
from app.models.documents import DocumentDetail
from app.services.demo_documents import get_demo_documents
from app.services.embeddings import (
    MOCK_EMBEDDING_MODEL,
    build_mock_embedding,
    build_mock_embedding_id,
    cosine_similarity,
    tokenize,
)

MOCK_RAG_MODEL = "mock-rag-v1"


def run_mock_rag_query(request: RagQueryRequest) -> RagQueryData:
    documents = _filter_documents(get_demo_documents(), request.document_ids)
    sources = _retrieve_sources(request.question, documents)
    ai_run_id = _build_ai_run_id(request.question, [source.chunk_id for source in sources])

    if not sources:
        return RagQueryData(
            answer=(
                "I could not find enough grounded context in the demo documents to answer that "
                "question. Try asking about vendor risks, retention, deletion, or audit evidence."
            ),
            sources=[],
            ai_run_id=ai_run_id,
            status="no_context",
            provider="mock",
            model=MOCK_RAG_MODEL,
            created_at=datetime.now(UTC),
            input_summary=_summarize_question(request.question),
        )

    return RagQueryData(
        answer=_build_mock_answer(request.question, sources),
        sources=sources,
        ai_run_id=ai_run_id,
        status="completed",
        provider="mock",
        model=MOCK_RAG_MODEL,
        created_at=datetime.now(UTC),
        input_summary=_summarize_question(request.question),
    )


def _filter_documents(
    documents: list[DocumentDetail],
    document_ids: list[str],
) -> list[DocumentDetail]:
    if not document_ids:
        return documents

    allowed_ids = set(document_ids)
    return [document for document in documents if document.id in allowed_ids]


def _retrieve_sources(question: str, documents: list[DocumentDetail]) -> list[RagSource]:
    question_terms = tokenize(question)
    question_embedding = build_mock_embedding(question)
    scored_sources: list[RagSource] = []

    for document in documents:
        for chunk in document.chunks:
            chunk_text = f"{chunk.heading} {chunk.content}"
            chunk_terms = tokenize(chunk_text)
            matched_terms = sorted(question_terms.intersection(chunk_terms))
            if not matched_terms:
                continue

            lexical_score = len(matched_terms) / max(len(question_terms), 1)
            vector_score = cosine_similarity(question_embedding, build_mock_embedding(chunk_text))
            score = round((lexical_score * 0.7) + (vector_score * 0.3), 3)
            scored_sources.append(
                RagSource(
                    document_id=document.id,
                    document_title=document.title,
                    chunk_id=chunk.id,
                    embedding_id=build_mock_embedding_id(chunk.id),
                    heading=chunk.heading,
                    snippet=chunk.content,
                    score=score,
                    matched_terms=matched_terms,
                    retrieval_reason=(
                        f"Matched {len(matched_terms)} query terms using {MOCK_EMBEDDING_MODEL}."
                    ),
                )
            )

    return sorted(scored_sources, key=lambda source: source.score, reverse=True)[:3]


def _build_mock_answer(question: str, sources: list[RagSource]) -> str:
    source_titles = ", ".join(sorted({source.document_title for source in sources}))
    source_points = "; ".join(source.heading.lower() for source in sources)
    return (
        f"Mock RAG answer for: '{question}'. The grounded context comes from {source_titles}. "
        f"The relevant source areas are {source_points}. Review the cited snippets before using "
        "this output."
    )


def _build_ai_run_id(question: str, chunk_ids: list[str]) -> str:
    seed = f"{question.lower().strip()}:{','.join(chunk_ids)}"
    return f"airun_{uuid5(NAMESPACE_URL, seed).hex[:12]}"


def _summarize_question(question: str) -> str:
    normalized = " ".join(question.split())
    if len(normalized) <= 120:
        return normalized
    return f"{normalized[:117]}..."
