import Link from "next/link";
import { notFound } from "next/navigation";

import { formatDocumentDate } from "@/lib/documents";
import { demoReviews, getReviewById } from "@/lib/reviews";

type ReviewDetailPageProps = {
  params: Promise<{
    reviewId: string;
  }>;
};

export function generateStaticParams() {
  return demoReviews.map((review) => ({
    reviewId: review.id
  }));
}

export default async function ReviewDetailPage({ params }: ReviewDetailPageProps) {
  const { reviewId } = await params;
  const review = getReviewById(reviewId);

  if (!review) {
    notFound();
  }

  const isPending = review.status === "pending";

  return (
    <main className="shell min-h-screen">
      <section className="page-header" aria-labelledby="review-title">
        <div>
          <p className="eyebrow">Review detail</p>
          <h1 id="review-title">{review.title}</h1>
          <p className="lede">{review.reviewerGuidance}</p>
        </div>
        <Link className="button-link" href="/reviews">
          Back to reviews
        </Link>
      </section>

      <section className="detail-grid" aria-label="Review metadata">
        <article className="metric-card">
          <span>Status</span>
          <strong>{review.status}</strong>
          <small>{formatDocumentDate(review.createdAt)}</small>
        </article>
        <article className="metric-card">
          <span>Priority</span>
          <strong>{review.priority}</strong>
          <small>review queue signal</small>
        </article>
        <article className="metric-card">
          <span>Source</span>
          <strong className="small-strong">{review.sourceDocumentId}</strong>
          <small>{review.aiRunId}</small>
        </article>
      </section>

      <section className="panel" aria-labelledby="decision-title">
        <div className="panel-heading">
          <h2 id="decision-title">Decision controls</h2>
          <span className={`status-badge ${isPending ? "warning" : ""}`}>
            {isPending ? "ready for reviewer" : "decision locked"}
          </span>
        </div>
        <p className="muted-copy">
          The backend exposes `POST /api/reviews/{review.id}/decision`. The public scaffold shows
          the decision options without mutating persisted data yet.
        </p>
        <div className="decision-actions" aria-label="Review decision options">
          <button type="button" disabled={!isPending}>
            Approve
          </button>
          <button type="button" disabled={!isPending}>
            Reject
          </button>
          <button type="button" disabled={!isPending}>
            Request changes
          </button>
        </div>
      </section>

      <section className="panel" aria-labelledby="evidence-title">
        <div className="panel-heading">
          <h2 id="evidence-title">Evidence links</h2>
          <span className="status-badge">Traceable</span>
        </div>
        <div className="stack-list">
          <Link className="table-link" href={`/documents/${review.sourceDocumentId}`}>
            Open source document
          </Link>
          <Link className="table-link" href={`/ai-runs/${review.aiRunId}`}>
            Open AI run detail
          </Link>
        </div>
      </section>
    </main>
  );
}
