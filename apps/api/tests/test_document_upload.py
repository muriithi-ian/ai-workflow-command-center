from fastapi.testclient import TestClient

from app.main import app
from app.services.document_uploads import MAX_UPLOAD_SIZE_BYTES

client = TestClient(app)


def test_register_document_upload_accepts_safe_metadata() -> None:
    response = client.post(
        "/api/documents",
        json={
            "title": "Synthetic Vendor Policy",
            "file_name": "synthetic-vendor-policy.md",
            "mime_type": "text/markdown",
            "size_bytes": 2048,
            "uploaded_by": "demo.admin@example.com",
        },
    )

    assert response.status_code == 200
    body = response.json()
    assert body["error"] is None
    assert body["data"]["document"]["status"] == "queued"
    assert body["data"]["document"]["chunk_count"] == 0
    assert body["data"]["next_step"] == "queued_for_processing"


def test_register_document_upload_rejects_unsupported_mime_type() -> None:
    response = client.post(
        "/api/documents",
        json={
            "title": "Unsafe Script",
            "file_name": "unsafe-script.md",
            "mime_type": "application/javascript",
            "size_bytes": 1000,
            "uploaded_by": "demo.admin@example.com",
        },
    )

    assert response.status_code == 400
    assert response.json() == {
        "data": None,
        "error": {
            "code": "UPLOAD_REJECTED",
            "message": (
                "Unsupported file type. Upload a PDF, text, Markdown, or DOCX document "
                "for the demo."
            ),
        },
    }


def test_register_document_upload_rejects_unsupported_extension() -> None:
    response = client.post(
        "/api/documents",
        json={
            "title": "Unsafe Binary",
            "file_name": "unsafe-binary.exe",
            "mime_type": "text/plain",
            "size_bytes": 1000,
            "uploaded_by": "demo.admin@example.com",
        },
    )

    assert response.status_code == 400
    assert response.json()["error"]["code"] == "UPLOAD_REJECTED"


def test_register_document_upload_rejects_oversized_file_metadata() -> None:
    response = client.post(
        "/api/documents",
        json={
            "title": "Oversized Demo File",
            "file_name": "oversized-demo.pdf",
            "mime_type": "application/pdf",
            "size_bytes": MAX_UPLOAD_SIZE_BYTES + 1,
            "uploaded_by": "demo.admin@example.com",
        },
    )

    assert response.status_code == 400
    assert response.json() == {
        "data": None,
        "error": {
            "code": "UPLOAD_REJECTED",
            "message": "File is too large for the demo. Maximum upload size is 5 MB.",
        },
    }
