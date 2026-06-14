from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.health import router as health_router
from app.core.config import get_settings

settings = get_settings()

app = FastAPI(
    title="AI Workflow Command Center API",
    version="0.1.0",
    description="FastAPI backend for document workflows, RAG, review queues, and audit logs.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api")
