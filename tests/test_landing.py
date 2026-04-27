import pytest
from app import create_app

@pytest.fixture(scope="module")
def app():
    """
    Create and configure a Flask app instance for testing.
    """
    app = create_app({"TESTING": True})
    app.testing = True
    return app

@pytest.fixture(scope="module")
def client(app):
    """
    Provide a test client for the app.
    """
    return app.test_client()

def test_index_status(client):
    """
    GET / should return HTTP 200.
    """
    response = client.get("/")
    assert response.status_code == 200, f"Expected 200 OK, got {response.status_code}"

def test_index_content(client):
    """
    The landing page should include the correct <title> and an H1 heading.
    """
    response = client.get("/")
    text = response.get_data(as_text=True)
    assert "<title>English Study Hub</title>" in text, "Missing expected <title> in response"
    assert "<h1>English Study Hub</h1>" in text, "Missing expected <h1> in response"

def test_static_served(client):
    """
    Static CSS should be served at /static/css/style.css with a CSS content type.
    """
    response = client.get("/static/css/style.css")
    assert response.status_code == 200, f"Expected 200 for static file, got {response.status_code}"
    # content_type may include charset, so check substring
    assert "text/css" in (response.content_type or ""), f"Expected 'text/css' content type, got {response.content_type}"