import importlib
import threading
import sys

import flask
import pytest


def _non_daemon_thread_names():
    return {t.name for t in threading.enumerate() if not t.daemon}


def test_import_and_reload_of_app_is_side_effect_free():
    """
    Ensure importing and reloading the app package does not start non-daemon background threads
    (which would indicate a server or background worker started at import time).
    """
    before = _non_daemon_thread_names()

    # Import the package and force a reload to simulate repeated imports (e.g., during hot-reload)
    import app  # noqa: F401 - ensure package import is exercised
    importlib.reload(app)

    after_reload = _non_daemon_thread_names()
    # No new non-daemon threads should appear as a result of import/reload
    assert after_reload == before, (
        "Importing or reloading the app package started non-daemon threads: "
        f"{after_reload - before}"
    )


def test_create_app_factory_returns_flask_app_and_respects_testing_config():
    """
    Verify create_app factory returns a Flask instance, applies provided config,
    and does not start background non-daemon threads when invoked.
    Also exercise the test_client to ensure the app routes are registered.
    """
    from app import create_app

    before = _non_daemon_thread_names()

    cfg = {"TESTING": True}
    application = create_app(cfg)

    assert isinstance(application, flask.Flask)
    assert application.config.get("TESTING") is True

    # Instantiating the app should not start non-daemon background threads
    after_create = _non_daemon_thread_names()
    assert after_create == before, (
        "create_app() started non-daemon threads: "
        f"{after_create - before}"
    )

    # Use the Flask test client to exercise the root route without running a server
    client = application.test_client()
    resp = client.get("/")
    assert resp.status_code == 200

    body = resp.get_data(as_text=True)
    assert "English Study Hub" in body, "Landing page title not found in response"
    assert "Get Started" in body, "CTA text 'Get Started' not found in response"