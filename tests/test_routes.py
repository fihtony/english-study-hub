import pytest
from app import create_app


def test_index_route_returns_landing_page():
    """
    Integration test for GET / using Flask test_client.
    Asserts:
      - HTTP 200
      - content type is HTML
      - response contains the site title "English Study Hub"
      - response contains the configured CTA text (fallback: "Get Started")
    """
    app = create_app()
    app.testing = True

    with app.test_client() as client:
        resp = client.get("/")

    assert resp.status_code == 200, f"Expected 200 OK, got {resp.status_code}"
    # content_type may include charset, e.g. "text/html; charset=utf-8"
    assert resp.content_type.startswith("text/html"), f"Expected HTML content type, got {resp.content_type}"

    body = resp.get_data(as_text=True)
    assert "English Study Hub" in body, "Response body must include the page title 'English Study Hub'"

    # Allow CTA to be configurable via app.config['CTA_TEXT'], default to "Get Started"
    cta_text = app.config.get("CTA_TEXT", "Get Started")
    assert cta_text in body, f"Response body must include the CTA text '{cta_text}'"