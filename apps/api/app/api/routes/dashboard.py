from fastapi import APIRouter
from pydantic import BaseModel

from app.models.dashboard import DashboardMetricsData
from app.services.dashboard import get_demo_dashboard_metrics

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


class DashboardMetricsResponse(BaseModel):
    data: DashboardMetricsData
    error: None = None


@router.get("/metrics", response_model=DashboardMetricsResponse)
def get_dashboard_metrics() -> DashboardMetricsResponse:
    return DashboardMetricsResponse(data=get_demo_dashboard_metrics())
