from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from app.api.errors import ApiErrorResponse, not_found_response, workflow_not_ready_response
from app.models.workflows import DocumentIntakeWorkflowRequest, DocumentIntakeWorkflowResult
from app.services.demo_documents import get_demo_document
from app.services.workflows import start_document_intake_workflow

router = APIRouter(prefix="/workflows", tags=["workflows"])


class DocumentIntakeWorkflowResponse(BaseModel):
    data: DocumentIntakeWorkflowResult
    error: None = None


@router.post(
    "/document-intake",
    response_model=DocumentIntakeWorkflowResponse,
    responses={404: {"model": ApiErrorResponse}, 409: {"model": ApiErrorResponse}},
)
def create_document_intake_workflow(
    request: DocumentIntakeWorkflowRequest,
) -> DocumentIntakeWorkflowResponse | JSONResponse:
    document = get_demo_document(request.document_id)
    if document is None:
        return not_found_response(f"Document '{request.document_id}' was not found.")

    try:
        result = start_document_intake_workflow(document, request)
    except ValueError as error:
        return workflow_not_ready_response(str(error))

    return DocumentIntakeWorkflowResponse(data=result)
