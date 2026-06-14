from datetime import UTC, datetime
from pathlib import PurePath
from typing import Literal

from pydantic import BaseModel, Field

from app.models.documents import DocumentSummary

MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024
ALLOWED_MIME_TYPES = {
    "application/pdf",
    "text/plain",
    "text/markdown",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}
ALLOWED_EXTENSIONS = {".pdf", ".txt", ".md", ".docx"}


class UploadValidationResult(BaseModel):
    accepted: bool
    reason: str | None = None


class DocumentUploadMetadata(BaseModel):
    title: str = Field(min_length=3, max_length=120)
    file_name: str = Field(min_length=1, max_length=180)
    mime_type: str = Field(min_length=3, max_length=120)
    size_bytes: int = Field(gt=0)
    uploaded_by: str = Field(min_length=3, max_length=180)


class DocumentUploadAccepted(BaseModel):
    document: DocumentSummary
    accepted_mime_type: str
    max_size_bytes: int
    next_step: Literal["queued_for_processing"]


def validate_upload_metadata(metadata: DocumentUploadMetadata) -> UploadValidationResult:
    extension = PurePath(metadata.file_name).suffix.lower()

    if metadata.mime_type not in ALLOWED_MIME_TYPES:
        return UploadValidationResult(
            accepted=False,
            reason=(
                "Unsupported file type. Upload a PDF, text, Markdown, or DOCX document "
                "for the demo."
            ),
        )

    if metadata.size_bytes > MAX_UPLOAD_SIZE_BYTES:
        return UploadValidationResult(
            accepted=False,
            reason="File is too large for the demo. Maximum upload size is 5 MB.",
        )

    if extension not in ALLOWED_EXTENSIONS:
        return UploadValidationResult(
            accepted=False,
            reason=(
                "Unsupported file extension. Accepted extensions are .pdf, .txt, .md, "
                "and .docx."
            ),
        )

    return UploadValidationResult(accepted=True)


def register_upload(metadata: DocumentUploadMetadata) -> DocumentUploadAccepted:
    slug = metadata.file_name.lower().replace(" ", "_").replace(".", "_")
    document = DocumentSummary(
        id=f"doc_upload_{slug}",
        title=metadata.title,
        status="queued",
        chunk_count=0,
        uploaded_by=metadata.uploaded_by,
        created_at=datetime.now(UTC),
    )
    return DocumentUploadAccepted(
        document=document,
        accepted_mime_type=metadata.mime_type,
        max_size_bytes=MAX_UPLOAD_SIZE_BYTES,
        next_step="queued_for_processing",
    )
