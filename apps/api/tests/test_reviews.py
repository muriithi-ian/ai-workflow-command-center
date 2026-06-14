from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_review_decision_approves_pending_review() -> None:
    response = client.post(
        "/api/reviews/review_vendor_risk_summary/decision",
        json={
            "decision": "approved",
            "reviewer_note": "Summary is grounded and cites the relevant blocker section.",
            "reviewer_email": "demo.reviewer@example.com",
        },
    )

    assert response.status_code == 200
    body = response.json()
    assert body["error"] is None
    assert body["data"]["review"]["status"] == "approved"
    assert body["data"]["audit_event"] == "review.approved"
    assert body["data"]["reviewer_email"] == "demo.reviewer@example.com"


def test_review_decision_rejects_completed_review_state_change() -> None:
    response = client.post(
        "/api/reviews/review_policy_gap_completed/decision",
        json={
            "decision": "rejected",
            "reviewer_note": "Trying to change a completed review.",
            "reviewer_email": "demo.reviewer@example.com",
        },
    )

    assert response.status_code == 409
    assert response.json() == {
        "data": None,
        "error": {
            "code": "REVIEW_STATE_CONFLICT",
            "message": "Review decision cannot be changed after it leaves the pending state.",
        },
    }


def test_review_decision_missing_review_returns_safe_not_found() -> None:
    response = client.post(
        "/api/reviews/review_missing/decision",
        json={
            "decision": "approved",
            "reviewer_note": "Looks good.",
            "reviewer_email": "demo.reviewer@example.com",
        },
    )

    assert response.status_code == 404
    assert response.json()["error"]["code"] == "NOT_FOUND"
