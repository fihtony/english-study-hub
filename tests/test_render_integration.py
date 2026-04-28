import pytest
from flask import url_for
from typing import Optional

# Import application factory
from app import create_app


@pytest.mark.parametrize("config_mode, config_value", [
    ("kwarg", None),
    ("dict", {"TESTING": True, "SAMPLE_KEY": "sample-value"}),
])
def test_create_app_accepts_custom_config(config_mode: str, config_value: Optional[dict]):
    """
    Ensure create_app accepts configuration both via kwargs and via a config dict.
    The factory must produce a Flask app and apply TESTING=True when provided.
    """
    if config_mode == "kwarg":
        # Per spec, create_app(TESTING=True) should be supported
        app = create_app(TESTING=True)
        assert isinstance(app, object), "create_app did not return an application instance"
        # Make sure flask testing flag is applied on the WSGI app
        assert app.config.get("TESTING", False) is True, "App TESTING config was not set via kwargs"
    else:
        app = create_app(config_value)
        assert isinstance(app, object), "create_app did not return an application instance when passed a dict"
        assert app.config.get("TESTING", False) is True, "App TESTING config was not set from dict"
        assert app.config.get("SAMPLE_KEY") == "sample-value", "Custom config keys were not applied"


def test_index_route_references_static_assets():
    """
    Integration test: the rendered index page must reference the main CSS and an asset under /static/assets/.
    """
    app = create_app(TESTING=True)
    # Ensure test harness mode for deterministic behavior
    app.testing = True

    client = app.test_client()
    resp = client.get("/")
    assert resp.status_code == 200, f"GET / returned unexpected status: {resp.status_code}"
    content_type = resp.content_type or ""
    assert "text/html" in content_type, f"Expected text/html Content-Type, got: {content_type}"

    html = resp.get_data(as_text=True)
    # Check explicit stylesheet reference required by acceptance criteria
    assert "/static/css/styles.css" in html, "Rendered HTML does not reference /static/css/styles.css"
    # Accept either the exact placeholder logo or any asset under /static/assets/
    assert ("/static/assets/logo-placeholder.svg" in html) or ("/static/assets/" in html), (
        "Rendered HTML does not reference any asset under /static/assets/ (expected logo-placeholder.svg)"
    )


@pytest.mark.parametrize("missing_path", [
    "/static/css/missing.css",
    "/static/assets/nonexistent.svg"
])
def test_requesting_missing_static_files_returns_404(missing_path):
    """
    Confirm server returns 404 for non-existent static files.
    This guards against accidentally falling back to directory listings or other behaviors.
    """
    app = create_app(TESTING=True)
    app.testing = True
    client = app.test_client()
    resp = client.get(missing_path)
    assert resp.status_code == 404, f"Requesting missing static file {missing_path} returned {resp.status_code} instead of 404"