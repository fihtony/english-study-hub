import pytest
from app import create_app


def _make_client():
    """Create a Flask test client from the factory with testing enabled."""
    app = create_app({"TESTING": True})
    # Ensure testing flag is set per test guidance
    app.testing = True
    return app.test_client()


def test_index_status_and_content():
    """
    Integration test: GET / should return 200 and contain
    the site title and a clear CTA text.
    """
    client = _make_client()
    resp = client.get("/")
    assert resp.status_code == 200, f"Expected 200 OK, got {resp.status_code}"
    body = resp.get_data()
    assert b"English Study Hub" in body, "Index page missing 'English Study Hub' text"
    # Allow common CTA variations but prefer exact 'Get Started'
    tokens = (b"Get Started", b"Get started", "Get Started →".encode("utf-8"))
    assert any(token in body for token in tokens), "CTA text 'Get Started' not found in index response"


def test_static_css_served():
    """
    Integration test: static CSS should be served from /static/css/styles.css,
    return 200, have CSS content-type, and include at least one expected token
    (class or CSS variable) used in the landing page stylesheet.
    """
    client = _make_client()
    resp = client.get("/static/css/styles.css")
    assert resp.status_code == 200, f"Expected 200 OK for CSS, got {resp.status_code}"
    # MIME check (Flask sets mimetype)
    assert resp.mimetype == "text/css", f"Expected 'text/css' mimetype, got '{resp.mimetype}'"
    css = resp.get_data()
    expected_tokens = [b".hero", b"--primary", b".cta", b"@media", b"body"]  # any of these indicates a valid stylesheet
    assert any(tok in css for tok in expected_tokens), (
        "styles.css does not contain expected CSS tokens (.hero / --primary / .cta / @media / body). "
        f"First 200 bytes: {css[:200]!r}"
    )
