"use client";

import { FormEvent, useState } from "react";

import { ReviewDecision, ReviewStatus } from "@/lib/reviews";

type ReviewDecisionPanelProps = {
  reviewId: string;
  initialStatus: ReviewStatus;
};

type DecisionState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | {
      status: "submitted";
      decision: ReviewDecision;
      reviewerEmail: string;
      reviewerNote: string;
      auditEvent: string;
    };

const decisionOptions: { value: ReviewDecision; label: string }[] = [
  { value: "approved", label: "Approve" },
  { value: "rejected", label: "Reject" },
  { value: "changes_requested", label: "Request changes" }
];

export function ReviewDecisionPanel({ reviewId, initialStatus }: ReviewDecisionPanelProps) {
  const [decisionState, setDecisionState] = useState<DecisionState>({ status: "idle" });
  const isLocked = initialStatus !== "pending" || decisionState.status === "submitted";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const decision = String(formData.get("decision") ?? "") as ReviewDecision;
    const reviewerEmail = String(formData.get("reviewerEmail") ?? "").trim();
    const reviewerNote = String(formData.get("reviewerNote") ?? "").trim();

    if (!decisionOptions.some((option) => option.value === decision)) {
      setDecisionState({ status: "error", message: "Choose a reviewer decision." });
      return;
    }

    if (!reviewerEmail || !reviewerEmail.includes("@")) {
      setDecisionState({ status: "error", message: "Use a valid reviewer email." });
      return;
    }

    if (reviewerNote.length < 3) {
      setDecisionState({
        status: "error",
        message: "Add a reviewer note with at least 3 characters."
      });
      return;
    }

    setDecisionState({
      status: "submitted",
      decision,
      reviewerEmail,
      reviewerNote,
      auditEvent: `review.${decision}`
    });
  }

  return (
    <section className="panel" aria-labelledby="decision-title">
      <div className="panel-heading">
        <h2 id="decision-title">Decision controls</h2>
        <span className={`status-badge ${isLocked ? "" : "warning"}`}>
          {isLocked ? "decision locked" : "ready for reviewer"}
        </span>
      </div>
      <p className="muted-copy">
        The backend exposes <code>POST /api/reviews/{reviewId}/decision</code>. This local panel
        validates the same decision shape and shows the audit event that would be written after
        persistence is enabled.
      </p>

      <form className="demo-form" onSubmit={handleSubmit}>
        <label htmlFor="decision">Reviewer decision</label>
        <select id="decision" name="decision" disabled={isLocked} defaultValue="">
          <option value="" disabled>
            Select a decision
          </option>
          {decisionOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <label htmlFor="reviewerEmail">Reviewer email</label>
        <input
          id="reviewerEmail"
          name="reviewerEmail"
          disabled={isLocked}
          placeholder="demo.reviewer@example.com"
          type="email"
        />

        <label htmlFor="reviewerNote">Reviewer note</label>
        <textarea
          id="reviewerNote"
          name="reviewerNote"
          disabled={isLocked}
          placeholder="Summary is grounded and cites the relevant source snippets."
          rows={4}
        />

        <button className="button-link" disabled={isLocked} type="submit">
          Submit local decision
        </button>
      </form>

      {initialStatus !== "pending" ? (
        <div className="empty-state">
          <strong>Completed review</strong>
          <p>Completed reviews reject repeat decisions to keep reviewer actions auditable.</p>
        </div>
      ) : null}

      {decisionState.status === "error" ? (
        <div className="empty-state">
          <strong>Decision needs attention</strong>
          <p>{decisionState.message}</p>
        </div>
      ) : null}

      {decisionState.status === "submitted" ? (
        <div className="chunk-card">
          <div className="panel-heading">
            <h3>Local decision submitted</h3>
            <span className="status-badge">{decisionState.decision}</span>
          </div>
          <p>{decisionState.reviewerNote}</p>
          <div className="metadata-list" aria-label="Decision audit metadata">
            <span>{decisionState.reviewerEmail}</span>
            <span>{decisionState.auditEvent}</span>
            <span>{reviewId}</span>
          </div>
        </div>
      ) : null}
    </section>
  );
}
