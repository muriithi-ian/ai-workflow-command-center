from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.ai_providers import router as ai_providers_router
from app.api.routes.audit_logs import router as audit_logs_router
from app.api.routes.auth import router as auth_router
from app.api.routes.config import router as config_router
from app.api.routes.dashboard import router as dashboard_router
from app.api.routes.documents import router as documents_router
from app.api.routes.health import router as health_router
from app.api.routes.rag import router as rag_router
from app.api.routes.reviews import router as reviews_router
from app.api.routes.runs import router as runs_router
from app.api.routes.workflows import router as workflows_router
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
app.include_router(auth_router, prefix="/api")
app.include_router(config_router, prefix="/api")
app.include_router(ai_providers_router, prefix="/api")
app.include_router(dashboard_router, prefix="/api")
app.include_router(documents_router, prefix="/api")
app.include_router(rag_router, prefix="/api")
app.include_router(runs_router, prefix="/api")
app.include_router(workflows_router, prefix="/api")
app.include_router(reviews_router, prefix="/api")
app.include_router(audit_logs_router, prefix="/api")
