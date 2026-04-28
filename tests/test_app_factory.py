import importlib
import sys

import pytest
from flask import Flask

# Ensure tests use the create_app factory from the app package and that
# importing the package does not produce side-effects (no top-level `app` variable).


def test_importing_package_does_not_create_top_level_app_variable():
    """
    Importing the `app` package must not create a top-level Flask instance named `app`.
    The package should expose a create_app factory callable without side-effects.
    """
    mod = importlib.import_module("app")
    # The factory must be present
    assert hasattr(mod, "create_app"), "app package must expose create_app(factory) at import time"
    # There must NOT be a top-level `app` Flask instance created as a side-effect of import
    assert not hasattr(mod, "app"), "Importing package 'app' must not create a top-level 'app' variable"


def test_create_app_returns_flask_and_index_serves_html():
    """
    create_app() should return a Flask instance. The index route should render HTML with
    the site title and a primary CTA element present.
    """
    mod = importlib.import_module("app")
    create_app = getattr(mod, "create_app")
    app = create_app()
    assert isinstance(app, Flask), "create_app() must return a flask.Flask instance"

    app.testing = True
    client = app.test_client()

    resp = client.get("/")
    assert resp.status_code == 200, "GET / should return 200 OK"
    assert "text/html" in resp.content_type.lower(), "Index must be served as HTML"

    body = resp.get_data(as_text=True)
    # Required elements per spec: site title and a CTA. Be permissive about exact CTA text.
    assert "English Study Hub" in body, "Index page must contain the site title 'English Study Hub'"
    # Check presence of a CTA-like element: an anchor or button
    assert ("<a" in body) or ("<button" in body), "Index page must include a CTA (anchor or button)"


def test_create_app_is_idempotent_and_produces_isolated_instances():
    """
    Calling create_app multiple times should not return the same instance (no shared mutable global state).
    Mutating one instance's config should not affect another instance.
    """
    mod = importlib.import_module("app")
    create_app = getattr(mod, "create_app")

    a1 = create_app()
    a2 = create_app()

    # They must be distinct objects
    assert a1 is not a2, "create_app() should produce distinct Flask instances on each call"

    # Mutate one app's config and ensure the other is unaffected
    a1.config["SOME_TEST_KEY"] = "value_from_a1"
    assert a2.config.get("SOME_TEST_KEY") != "value_from_a1", "App instances must not share mutable config/state"


def test_static_css_is_served_and_contains_expected_rules():
    """
    The static CSS file must be served and contain at least one expected CSS token (e.g., background or body rule).
    """
    mod = importlib.import_module("app")
    create_app = getattr(mod, "create_app")
    app = create_app()
    app.testing = True
    client = app.test_client()

    resp = client.get("/static/css/styles.css")
    assert resp.status_code == 200, "Static CSS should be served at /static/css/styles.css"
    content_type = resp.content_type or ""
    assert "css" in content_type.lower(), "Static CSS must be served with a CSS content-type"

    css = resp.get_data(as_text=True)
    assert any(tok in css for tok in ("background", "font-family", "body", ".hero")), (
        "styles.css should contain basic style tokens like 'background', 'font-family', 'body' or '.hero'"
    )


def test_nonexistent_path_returns_404():
    """
    Requests to unknown routes must return a 404 status code.
    """
    mod = importlib.import_module("app")
    create_app = getattr(mod, "create_app")
    app = create_app()
    app.testing = True
    client = app.test_client()

    resp = client.get("/this-path-should-not-exist-xyz")
    assert resp.status_code == 404, "Requests to unknown routes must return 404 Not Found"