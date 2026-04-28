import pytest
from app import create_app

def test_static_css_served_and_contains_rules():
    """
    Verify that the static CSS file is served at /static/css/styles.css,
    returns HTTP 200, has a CSS content type, and contains at least one
    expected CSS token (to ensure the file is not empty/placeholder).
    """
    app = create_app()
    app.testing = True

    client = app.test_client()
    resp = client.get("/static/css/styles.css")

    # status code
    assert resp.status_code == 200, f"Expected 200 OK, got {resp.status_code}"

    # content type should include text/css (may include charset)
    content_type = resp.content_type or ""
    css_tokens = ("background", ".cta", "#2B6CB0", "font-family", "color", "padding", "margin")
    body = resp.get_data(as_text=True) or ""

    assert (
        "text/css" in content_type.lower() or any(tok in body for tok in css_tokens)
    ), (
        "Response is not CSS and does not contain expected CSS tokens. "
        f"Content-Type: {content_type!r}; sample body start: {body[:200]!r}"
    )