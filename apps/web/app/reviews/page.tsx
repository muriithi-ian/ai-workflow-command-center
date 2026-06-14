import Link from "next/link";

import { formatDocumentDate } from "@/lib/documents";
import { getReviews } from "@/lib/reviews";

export default function ReviewsPage() {
  const reviews = getReviews();

  return (
    <main className="shell min-h-screen">
      <section className="page-header" aria-labelledby="reviews-title">
        <div>
          <p className="eyebrow">Human-in-the-loop</p>
          <h1 id="reviews-title">Review queue</h1>
          <p className="lede">
            Reviewers approve, reject, or request changes before AI output becomes trusted workflow
            evidence.
          </p>
        </div>
        <Link className="button-link" href="/dashboard">
          Back to dashboard
        </Link>
      </section>

      <section className="panel" aria-labelledby="review-list-title">
        <div className="panel-heading">
          <h2 id="review-list-title">Pending and completed reviews</h2>
          <span className="status-badge warning">Human review</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Review</th>
                <th scope="col">Status</th>
                <th scope="col">Priority</th>
                <th scope="col">AI run</th>
                <th scope="col">Created</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id}>
                  <td>
                    <Link className="table-link" href={`/reviews/${review.id}`}>
                      {review.title}
                    </Link>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${review.status === "pending" ? "warning" : ""}`}
                    >
                      {review.status}
                    </span>
                  </td>
                  <td>{review.priority}</td>
                  <td>{review.aiRunId}</td>
                  <td>{formatDocumentDate(review.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
