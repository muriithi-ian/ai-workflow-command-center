import { getAiRuns } from "@/lib/ai-runs";
import { getAuditLogs } from "@/lib/audit-logs";
import { getDocumentSummaries } from "@/lib/documents";
import { getReviews } from "@/lib/reviews";

export type DashboardMetric = {
  label: string;
  value: string;
  detail: string;
};

export function getDashboardMetrics(): DashboardMetric[] {
  const documents = getDocumentSummaries();
  const aiRuns = getAiRuns();
  const reviews = getReviews();
  const auditLogs = getAuditLogs();

  const readyDocuments = documents.filter((document) => document.status === "ready").length;
  const processingDocuments = documents.filter(
    (document) => document.status === "processing"
  ).length;
  const pendingReviews = reviews.filter((review) => review.status === "pending");
  const highPriorityReviews = pendingReviews.filter((review) => review.priority === "high");

  return [
    {
      label: "Documents",
      value: String(documents.length),
      detail: `${readyDocuments} ready, ${processingDocuments} processing`
    },
    {
      label: "AI runs",
      value: String(aiRuns.length),
      detail: "Mock provider traces"
    },
    {
      label: "Pending reviews",
      value: String(pendingReviews.length),
      detail: `${highPriorityReviews.length} high priority`
    },
    {
      label: "Audit events",
      value: String(auditLogs.length),
      detail: "Structured workflow trail"
    }
  ];
}
