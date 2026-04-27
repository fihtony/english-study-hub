import importlib
import sys
import socket
import pytest
from flask import Flask


def test_create_app_returns_flask_instance_and_has_name():
    """
    create_app() should return a Flask application instance and expose a name attribute.
    """
    # Import inside the test to avoid triggering package-level side-effects before assertions
    mod = importlib.import_module("app")
    assert hasattr(mod, "create_app"), "app.create_app must be importable"
    create_app = getattr(mod, "create_app")
    assert callable(create_app), "create_app must be callable"

    app = create_app()
    assert isinstance(app, Flask), "create_app() must return a Flask instance"
    assert hasattr(app, "name") and isinstance(app.name, str) and app.name, "Flask app should have a non-empty name"


def test_create_app_applies_config_dict():
    """
    create_app must accept a config dict and apply it to the Flask app config.
    """
    mod = importlib.import_module("app")
    create_app = getattr(mod, "create_app")
    cfg = {"TESTING": True, "CUSTOM_VALUE": "x"}
    app = create_app(cfg)
    assert app.config.get("TESTING") is True, "Factory must set TESTING when provided in config"
    assert app.config.get("CUSTOM_VALUE") == "x", "Factory must apply arbitrary config keys from the provided dict"


def test_importing_app_package_has_no_network_side_effects_and_does_not_create_app_instance(monkeypatch):
    """
    Importing the app package must be side-effect free:
    - Must not attempt network connections during import (patch socket.connect and HTTP requests).
    - Must not instantiate a top-level Flask application object on import (no 'app', 'application', or 'flask_app' Flask instances).
    """

    # Prevent real network calls by raising if connect is attempted
    connect_called = {"flag": False}

    def _raise_on_connect(self, address):
        connect_called["flag"] = True
        raise RuntimeError("Network connection attempted during import")

    # Patch socket.socket.connect
    monkeypatch.setattr(socket.socket, "connect", _raise_on_connect, raising=False)

    # Patch requests.Session.request if requests is available
    try:
        import requests

        def _raise_on_request(self, *args, **kwargs):
            raise RuntimeError("HTTP request attempted during import")

        monkeypatch.setattr(requests.sessions.Session, "request", _raise_on_request, raising=False)
    except Exception:
        # If requests isn't installed in the environment running tests, skip that patch.
        pass

    # Ensure a fresh import (remove if already imported)
    if "app" in sys.modules:
        del sys.modules["app"]

    # Import module; should not raise RuntimeError from our patched network functions
    try:
        mod = importlib.import_module("app")
    except RuntimeError as exc:
        pytest.fail(f"Importing app package attempted network activity: {exc}")
    except Exception as exc:
        pytest.fail(f"Importing app package raised an unexpected exception: {exc}")

    # Ensure create_app is present and callable
    assert hasattr(mod, "create_app") and callable(getattr(mod, "create_app")), "app.create_app must exist and be callable after import"

    # Ensure module does not expose a Flask instance at top-level under common names
    for candidate in ("app", "application", "flask_app"):
        instance = getattr(mod, candidate, None)
        assert not isinstance(instance, Flask), f"Top-level Flask instance found on import as '{candidate}'; factory must avoid creating app at import time"

    # Confirm our patched network connect was not called during import
    assert not connect_called["flag"], "socket.connect was called during import — import must not perform network operations"