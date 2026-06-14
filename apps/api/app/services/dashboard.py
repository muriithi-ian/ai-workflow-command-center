from datetime import UTC, datetime

from app.models.dashboard import DashboardMetric, DashboardMetricsData
from app.services.ai_runs import get_demo_ai_runs
from app.services.audit_logs import get_demo_audit_logs
from app.services.demo_documents import get_demo_documents
from app.services.reviews import get_demo_reviews


def get_demo_dashboard_metrics() -> DashboardMetricsData:
    documents = get_demo_documents()
    ai_runs = get_demo_ai_runs()
    reviews = get_demo_reviews()
    audit_logs = get_demo_audit_logs()

    ready_documents = sum(1 for document in documents if document.status == "ready")
    processing_documents = sum(1 for document in documents if document.status == "processing")
    pending_reviews = sum(1 for review in reviews if review.status == "pending")
    high_priority_reviews = sum(
        1 for review in reviews if review.status == "pending" and review.priority == "high"
    )

    return DashboardMetricsData(
        generated_at=datetime.now(UTC),
        metrics=[
            DashboardMetric(
                label="Documents",
                value=len(documents),
                trend=f"{ready_documents} ready, {processing_documents} processing",
            ),
            DashboardMetric(
                label="AI runs",
                value=len(ai_runs),
                trend="mock provider traces available",
            ),
            DashboardMetric(
                label="Pending reviews",
                value=pending_reviews,
                trend=f"{high_priority_reviews} high priority",
            ),
            DashboardMetric(
                label="Audit events",
                value=len(audit_logs),
                trend="structured workflow trail",
            ),
        ],
    )
