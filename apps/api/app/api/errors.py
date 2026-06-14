from fastapi.responses import JSONResponse
from pydantic import BaseModel


class ApiError(BaseModel):
    code: str
    message: str


class ApiErrorResponse(BaseModel):
    data: None = None
    error: ApiError


def not_found_response(message: str) -> JSONResponse:
    return JSONResponse(
        status_code=404,
        content={
            "data": None,
            "error": {
                "code": "NOT_FOUND",
                "message": message,
            },
        },
    )


def upload_rejected_response(message: str) -> JSONResponse:
    return JSONResponse(
        status_code=400,
        content={
            "data": None,
            "error": {
                "code": "UPLOAD_REJECTED",
                "message": message,
            },
        },
    )


def document_processing_failed_response(message: str) -> JSONResponse:
    return JSONResponse(
        status_code=409,
        content={
            "data": None,
            "error": {
                "code": "DOCUMENT_PROCESSING_FAILED",
                "message": message,
            },
        },
    )


def review_state_conflict_response(message: str) -> JSONResponse:
    return JSONResponse(
        status_code=409,
        content={
            "data": None,
            "error": {
                "code": "REVIEW_STATE_CONFLICT",
                "message": message,
            },
        },
    )
