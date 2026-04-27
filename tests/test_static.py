import pytest
from app import create_app

@pytest.fixture(scope="module")
def client():
    app = create_app()
    app.testing = True
    with app.test_client() as client:
        yield client

def test_static_css_served(client):
    """
    Verify the compiled static CSS is served at /static/css/styles.css,
    has the correct mimetype, and contains expected CSS rules/variables.
    """
    resp = client.get("/static/css/styles.css")
    assert resp.status_code == 200, f"Expected 200 OK, got {resp.status_code}"
    # Flask response.mimetype should be 'text/css' for CSS files
    assert resp.mimetype == "text/css", f"Unexpected mimetype: {resp.mimetype}"
    data = resp.data or b""
    # Ensure it contains a body rule and either a CSS variable for primary color or a font-family declaration
    assert b"body" in data, "Expected 'body' selector in CSS"
    assert (b"--primary-color" in data) or (b"font-family" in data), "Expected CSS to include a primary color var or font-family"