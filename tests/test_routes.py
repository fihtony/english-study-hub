import pytest
from app import create_app


def test_index_route_renders_homepage_and_contains_expected_text():
    """
    GET '/' should return 200, content-type text/html and include
    the site title and primary CTA text used by the landing page.
    """
    app = create_app()
    app.testing = True
    client = app.test_client()

    response = client.get("/")
    assert response.status_code == 200, "Expected 200 OK from index route"
    # content_type may include charset, e.g. 'text/html; charset=utf-8'
    assert response.content_type.startswith("text/html")
    body = response.data
    assert b"English Study Hub" in body, "Homepage should contain the site title"
    assert b"Get Started" in body, "Homepage should contain the primary CTA text"


def test_static_css_served_and_contains_expected_rule():
    """
    GET '/static/css/styles.css' should return 200 and include a known CSS rule.
    The rule checked here should match the project's styles.css (background color).
    """
    app = create_app()
    app.testing = True
    client = app.test_client()

    response = client.get("/static/css/styles.css")
    assert response.status_code == 200, "Expected 200 OK for static CSS file"
    # content_type may be 'text/css; charset=utf-8' depending on server
    assert response.content_type.startswith("text/css")
    css = response.data
    # Match the expected CSS rule present in app/static/css/styles.css
    assert b"background-color: #f4f7fb" in css, "styles.css must include the project's background-color rule"


def test_non_existent_path_returns_404():
    """
    Requesting a path that doesn't exist should return a 404 response.
    """
    app = create_app()
    app.testing = True
    client = app.test_client()

    response = client.get("/non-existent-path")
    assert response.status_code == 404, "Non-existent path should return 404"