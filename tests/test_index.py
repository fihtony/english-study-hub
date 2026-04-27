import pytest
from app import create_app

# Create the Flask app using the factory and configure testing mode
app = create_app()
app.testing = True
client = app.test_client()


def test_index_returns_200_and_contains_title():
    """GET / should return 200 and include the site title."""
    resp = client.get("/")
    assert resp.status_code == 200, f"Expected 200 OK, got {resp.status_code}"
    text = resp.get_data(as_text=True)
    assert "English Study Hub" in text, "Landing page does not contain expected title."


def test_index_references_css_link():
    """Index page should reference the expected static CSS path."""
    resp = client.get("/")
    assert resp.status_code == 200, f"Expected 200 OK, got {resp.status_code}"
    text = resp.get_data(as_text=True)
    assert "/static/css/styles.css" in text, "Index page does not reference /static/css/styles.css"


def test_static_css_served():
    """Static CSS file should be served with a CSS content type."""
    resp = client.get("/static/css/styles.css")
    assert resp.status_code == 200, f"Expected 200 when fetching CSS, got {resp.status_code}"
    content_type = resp.content_type or ""
    assert "text/css" in content_type, f"Expected 'text/css' in Content-Type, got '{content_type}'"