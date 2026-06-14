from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from app.api.errors import ApiErrorResponse, not_found_response, upload_rejected_response
from app.models.documents import DocumentDetail, DocumentSummary
from app.services.demo_documents import get_demo_document, get_document_summaries
from app.services.document_uploads import (
    DocumentUploadAccepted,
    DocumentUploadMetadata,
    register_upload,
    validate_upload_metadata,
)

router = APIRouter(prefix="/documents", tags=["documents"])


class DocumentListData(BaseModel):
    items: list[DocumentSummary]
    page: int
    page_size: int
    total: int


class DocumentListResponse(BaseModel):
    data: DocumentListData
    error: None = None


class DocumentDetailResponse(BaseModel):
    data: DocumentDetail
    error: None = None


class DocumentUploadResponse(BaseModel):
    data: DocumentUploadAccepted
    error: None = None


@router.get("", response_model=DocumentListResponse)
def list_documents() -> DocumentListResponse:
    documents = get_document_summaries()
    return DocumentListResponse(
        data=DocumentListData(items=documents, page=1, page_size=25, total=len(documents))
    )


@router.post(
    "",
    response_model=DocumentUploadResponse,
    responses={400: {"model": ApiErrorResponse}},
)
def register_document_upload(
    metadata: DocumentUploadMetadata,
) -> DocumentUploadResponse | JSONResponse:
    validation = validate_upload_metadata(metadata)
    if not validation.accepted:
        return upload_rejected_response(validation.reason or "Upload metadata was rejected.")

    return DocumentUploadResponse(data=register_upload(metadata))


@router.get(
    "/{document_id}",
    response_model=DocumentDetailResponse,
    responses={404: {"model": ApiErrorResponse}},
)
def get_document(document_id: str) -> DocumentDetailResponse | JSONResponse:
    document = get_demo_document(document_id)
    if document is None:
        return not_found_response(f"Document '{document_id}' was not found.")

    return DocumentDetailResponse(data=document)
