from datetime import UTC, datetime

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


class DashboardMetric(BaseModel):
    label: str
    value: int
    trend: str


class DashboardMetricsData(BaseModel):
    metrics: list[DashboardMetric]
    generated_at: datetime


class DashboardMetricsResponse(BaseModel):
    data: DashboardMetricsData
    error: None = None


@router.get("/metrics", response_model=DashboardMetricsResponse)
def get_dashboard_metrics() -> DashboardMetricsResponse:
    return DashboardMetricsResponse(
        data=DashboardMetricsData(
            generated_at=datetime.now(UTC),
            metrics=[
                DashboardMetric(label="Documents", value=3, trend="2 ready for review"),
                DashboardMetric(label="AI runs", value=5, trend="mock mode active"),
                DashboardMetric(label="Pending reviews", value=2, trend="reviewer action needed"),
                DashboardMetric(label="Audit events", value=12, trend="last event just now"),
            ],
        )
    )
