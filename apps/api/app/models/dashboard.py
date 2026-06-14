from datetime import datetime

from pydantic import BaseModel


class DashboardMetric(BaseModel):
    label: str
    value: int
    trend: str


class DashboardMetricsData(BaseModel):
    metrics: list[DashboardMetric]
    generated_at: datetime
