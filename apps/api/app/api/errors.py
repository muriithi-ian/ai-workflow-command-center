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
