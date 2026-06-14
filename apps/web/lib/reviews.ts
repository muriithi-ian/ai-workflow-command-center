export type ReviewStatus = "pending" | "approved" | "rejected" | "changes_requested";
export type ReviewDecision = "approved" | "rejected" | "changes_requested";

export type DemoReview = {
  id: string;
  title: string;
  status: ReviewStatus;
  priority: "low" | "medium" | "high";
  sourceDocumentId: string;
  aiRunId: string;
  createdAt: string;
  reviewerGuidance: string;
};

export const demoReviews: DemoReview[] = [
  {
    id: "review_vendor_risk_summary",
    title: "Review AI vendor risk summary",
    status: "pending",
    priority: "high",
    sourceDocumentId: "doc_vendor_intake",
    aiRunId: "airun_vendor_risk_summary",
    createdAt: "2026-01-15T12:12:00Z",
    reviewerGuidance:
      "Approve only if the answer cites vendor risk source snippets and does not invent controls."
  },
  {
    id: "review_contract_exception",
    title: "Confirm contract exception classification",
    status: "pending",
    priority: "medium",
    sourceDocumentId: "doc_contract_notes",
    aiRunId: "airun_contract_exception",
    createdAt: "2026-01-15T12:25:00Z",
    reviewerGuidance:
      "Request changes if the extraction is incomplete or the classification lacks support."
  },
  {
    id: "review_policy_gap_completed",
    title: "Approved policy gap summary",
    status: "approved",
    priority: "low",
    sourceDocumentId: "doc_policy_update",
    aiRunId: "airun_policy_gap_check",
    createdAt: "2026-01-15T10:15:00Z",
    reviewerGuidance: "Completed review retained as audit evidence."
  }
];

export function getReviews(): DemoReview[] {
  return demoReviews;
}

export function getReviewById(reviewId: string): DemoReview | undefined {
  return demoReviews.find((review) => review.id === reviewId);
}
