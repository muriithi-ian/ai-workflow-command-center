from datetime import datetime

from pydantic import BaseModel, Field


class AuditLogEntry(BaseModel):
    id: str
    action: str
    actor: str
    target: str
    created_at: datetime
    metadata: dict[str, str] = Field(default_factory=dict)
