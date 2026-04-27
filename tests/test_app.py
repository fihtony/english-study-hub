import pytest
from flask import Flask
from app import create_app


@pytest.fixture(scope="module")
def app():
    """Create and configure a new app instance for tests."""
    application = create_app()
    application.testing = True
    yield application


def test_create_app_importable():
    """Ensure create_app is importable and returns a Flask app."""
    app_instance = create_app()
    assert isinstance(app_instance, Flask), "create_app() did not return a Flask application instance"


def test_index_status(app):
    """GET / should return 200 OK."""
    client = app.test_client()
    resp = client.get("/")
    assert resp.status_code == 200, f"Expected status 200, got {resp.status_code}"


def test_index_content_and_css(app):
    """Index page should contain site title and CSS reference."""
    client = app.test_client()
    resp = client.get("/")
    data = resp.get_data(as_text=True)
    assert "English Study Hub" in data, f"Page missing title 'English Study Hub'. Response snippet: {data[:200]!r}"
    assert "/static/css/styles.css" in data, "Expected reference to '/static/css/styles.css' not found in page"