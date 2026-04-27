import pytest
from app import create_app


@pytest.fixture
def app():
    """
    Create and configure a new app instance for each test.
    """
    app = create_app()
    app.testing = True
    return app


@pytest.fixture
def client(app):
    """
    Provide a Flask test client for the app fixture.
    """
    return app.test_client()


def test_landing_returns_200_and_contains_title(client):
    """
    Ensure the landing page responds with HTTP 200, returns HTML and contains
    the expected site title 'English Study Hub'.
    """
    res = client.get('/')
    assert res.status_code == 200, f"Expected 200 OK, got {res.status_code}"
    # Response body should contain the visible title text
    assert b'English Study Hub' in res.data, "Landing page does not contain 'English Study Hub'"
    # Content-Type should indicate HTML
    content_type = res.headers.get('Content-Type', '')
    assert 'text/html' in content_type, f"Expected 'text/html' in Content-Type header, got '{content_type}'"