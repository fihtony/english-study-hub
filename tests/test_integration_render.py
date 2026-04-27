import pytest
from app import create_app

@pytest.fixture
def app():
    """
    Create and configure a Flask app instance for testing.
    The factory should not perform side-effects on import.
    """
    application = create_app()
    application.testing = True
    return application

def test_integration_render_css_and_dom(app):
    """
    Integration test that:
    - GET / returns 200
    - Content-Type is text/html
    - HTML references /static/css/styles.css
    - Page contains a top-level H1 with 'English Study Hub'
    - Page contains a primary CTA (button or link) with 'Get Started'
    """
    client = app.test_client()
    resp = client.get('/')
    assert resp.status_code == 200, f"Expected 200 OK, got {resp.status_code}"
    # Content-Type may include charset; ensure it's HTML
    content_type = resp.content_type or ""
    assert content_type.startswith("text/html"), f"Expected Content-Type to start with 'text/html', got '{content_type}'"

    body = resp.get_data() or b""
    lower = body.lower()

    # Stylesheet reference
    assert b"/static/css/styles.css" in body, "Rendered HTML must reference '/static/css/styles.css'"

    # H1 presence and heading text
    assert b"<h1" in lower, "Rendered HTML must contain an <h1> element"
    assert b"english study hub" in lower, "Rendered HTML must include the heading text 'English Study Hub'"

    # CTA presence: look for 'get started' text and a link or button element near it
    has_cta_text = b"get started" in lower
    has_clickable = b"<a " in lower or b"<button" in lower
    assert has_cta_text and has_clickable, "Rendered HTML must include a primary CTA with text 'Get Started' inside an <a> or <button> element"