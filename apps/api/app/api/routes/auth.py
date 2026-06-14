from datetime import UTC, datetime
from typing import Literal

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/auth", tags=["auth"])

UserRole = Literal["admin", "reviewer"]


class DemoUser(BaseModel):
    id: str
    email: str
    display_name: str
    roles: list[UserRole]


class SessionData(BaseModel):
    authenticated: bool
    mode: Literal["demo"]
    user: DemoUser
    issued_at: datetime


class SessionResponse(BaseModel):
    data: SessionData
    error: None = None


@router.get("/session", response_model=SessionResponse)
def get_demo_session() -> SessionResponse:
    return SessionResponse(
        data=SessionData(
            authenticated=True,
            mode="demo",
            issued_at=datetime.now(UTC),
            user=DemoUser(
                id="user_demo_admin",
                email="demo.admin@example.com",
                display_name="Demo Admin",
                roles=["admin", "reviewer"],
            ),
        )
    )
