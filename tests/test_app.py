import importlib
import types

import pytest
from flask import url_for

# Import the factory function from the application package
from app import create_app
import app as app_pkg  # ensure importing the package itself is side-effect free

# Create an application instance using the factory with testing config
app = create_app({"TESTING": True})
app.testing = True  # reinforce testing mode
client = app.test_client()


def test_index_status_ok():
    """GET / should return HTTP 200."""
    resp = client.get("/")
    assert resp.status_code == 200, "Expected 200 OK from '/'"


def test_index_contains_css_link():
    """
    The rendered index.html must include a link to the static CSS file.
    Accept either the literal path or a url_for-generated path fragment.
    """
    resp = client.get("/")
    body = resp.data
    # Common expected path used by Flask's url_for for static files
    assert b"/static/css/styles.css" in body, "CSS link to /static/css/styles.css not found in index HTML"


def test_css_served():
    """
    Static CSS file should be served and contain the expected CSS token.
    Tests for a known CSS custom property used by the project.
    """
    resp = client.get("/static/css/styles.css")
    assert resp.status_code == 200, "Static CSS not served (status != 200)"
    # Check for a known CSS variable that must exist in styles.css
    assert b"--color-primary" in resp.data or b"--primary" in resp.data, "Expected CSS variable not found in served stylesheet"


def test_factory_side_effects():
    """
    Ensure importing the app package does not create a Flask app instance or start a server.
    The package should only expose the create_app factory and be side-effect free.
    """
    # The package must expose create_app callable
    assert hasattr(app_pkg, "create_app") and callable(getattr(app_pkg, "create_app"))

    # The package must not have created a top-level Flask instance named 'app' on import
    # (this would indicate side-effects at import time)
    assert not hasattr(app_pkg, "app"), "app package must not create a Flask instance at import-time"

    # Additionally, ensure the package is a proper module object (sanity check)
    assert isinstance(app_pkg, types.ModuleType) and importlib.import_module("app") is app_pkg