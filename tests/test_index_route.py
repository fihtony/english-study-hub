import pytest
from app import create_app

@pytest.fixture
def app():
    """
    Create and configure a new app instance for each test.
    Using the factory ensures import-time side effects are avoided.
    """
    app = create_app()
    app.testing = True
    return app

@pytest.fixture
def client(app):
    """Provide a test client for the Flask app."""
    return app.test_client()

def test_get_index_status_and_content(client):
    """
    Verify GET / returns 200 and contains key landing page elements.
    Acceptance criteria mapped:
      - HTTP 200 response
      - Page contains 'English Study Hub'
      - Page contains an <h1> (or header) element
    """
    resp = client.get('/')
    assert resp.status_code == 200, f"Expected 200 OK, got {resp.status_code}"
    text = resp.get_data(as_text=True)
    assert 'English Study Hub' in text, "Expected page to contain the site title 'English Study Hub'"
    # Accept either an h1 or a semantic header element
    assert '<h1' in text or '<header' in text, "Expected an <h1> or <header> element in the landing page HTML"
    # Basic content-type sanity check
    assert resp.content_type.startswith('text/html'), f"Expected HTML content-type, got {resp.content_type}"

def test_index_includes_css_link(client):
    """
    Ensure the rendered HTML references the static CSS file.
    Acceptance criteria mapped:
      - HTML includes a link to /static/css/styles.css (either as href or as a substring)
    """
    resp = client.get('/')
    text = resp.get_data(as_text=True)
    has_exact_href_single = "href='/static/css/styles.css'" in text
    has_exact_href_double = 'href="/static/css/styles.css"' in text
    has_any_static_ref = 'static/css/styles.css' in text
    assert has_exact_href_single or has_exact_href_double or has_any_static_ref, (
        "Expected HTML to reference '/static/css/styles.css' but no reference was found."
    )