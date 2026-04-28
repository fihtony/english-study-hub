import importlib
import sys
import socket as _socket
from types import ModuleType

import pytest
from flask import Flask


def _import_app_with_no_network() -> ModuleType:
    """
    Import the 'app' package while preventing any network operations during import.
    Replaces socket.socket and socket.create_connection with stubs that raise if used.
    Restores originals after import attempt.
    """
    # Remove any existing cached module so import happens fresh
    if "app" in sys.modules:
        del sys.modules["app"]

    orig_socket = _socket.socket
    orig_create_connection = getattr(_socket, "create_connection", None)

    class _BlockSocket:
        def __init__(self, *args, **kwargs):
            # Construction is allowed; actual network methods will raise
            pass

        def bind(self, *args, **kwargs):
            raise AssertionError("Network bind() called during import of 'app'")

        def connect(self, *args, **kwargs):
            raise AssertionError("Network connect() called during import of 'app'")

        def listen(self, *args, **kwargs):
            raise AssertionError("Network listen() called during import of 'app'")

        def accept(self, *args, **kwargs):
            raise AssertionError("Network accept() called during import of 'app'")

        def close(self, *args, **kwargs):
            # allow close without side-effect
            return None

        def setsockopt(self, *args, **kwargs):
            return None

    def _blocked_socket(*args, **kwargs):
        return _BlockSocket()

    def _blocked_create_connection(*args, **kwargs):
        raise AssertionError("socket.create_connection() called during import of 'app'")

    # Patch
    _socket.socket = _blocked_socket
    _socket.create_connection = _blocked_create_connection

    try:
        module = importlib.import_module("app")
    finally:
        # Restore originals regardless of import outcome
        _socket.socket = orig_socket
        if orig_create_connection is None:
            try:
                delattr(_socket, "create_connection")
            except Exception:
                pass
        else:
            _socket.create_connection = orig_create_connection

    return module


def test_create_app_returns_flask_and_applies_config():
    """
    create_app should return a Flask application instance and apply provided config dict.
    """
    app_module = _import_app_with_no_network()
    assert hasattr(app_module, "create_app"), "app package must expose create_app(config=None)"
    create_app = getattr(app_module, "create_app")

    cfg = {"TESTING": True, "CUSTOM_KEY": "x"}
    app = create_app(cfg)

    assert isinstance(app, Flask), "create_app must return a Flask instance"
    # Config assertions
    assert app.config.get("TESTING") is True, "Provided TESTING=True should be applied to app.config"
    assert app.config.get("CUSTOM_KEY") == "x", "Custom config keys must be set on app.config"


def test_importing_app_performs_no_network_io_or_server_start():
    """
    Importing the 'app' package must not perform network IO (bind/connect/listen) or start a server.
    This is enforced by importing the package with socket functions stubbed to raise on use.
    If import succeeds, no network operations were attempted during import.
    """
    # If import raises an AssertionError from our stubs, the test will fail.
    app_module = _import_app_with_no_network()
    # Sanity: ensure create_app is present and callable but not invoked here
    assert callable(getattr(app_module, "create_app", None)), "create_app must be callable on the app package"
    # Ensure importing didn't start a server by checking there's no 'run' side-effect executed on import.
    # Common bad practice is calling app.run() on import; verify module has no attribute like '_server_started' introduced by such side-effects.
    assert not getattr(app_module, "_server_started", False)


def test_factory_returns_separate_instances_and_is_idempotent():
    """
    Multiple calls to create_app() should return independent Flask instances (no global mutable state leakage)
    and be safe to call repeatedly.
    """
    app_module = _import_app_with_no_network()
    create_app = getattr(app_module, "create_app")
    a1 = create_app({"TESTING": True})
    a2 = create_app({"TESTING": False})

    assert a1 is not a2, "create_app must create a new Flask instance on each call"
    # Ensure configs are independent
    assert a1.config["TESTING"] is True
    assert a2.config["TESTING"] is False


def test_factory_rejects_non_mapping_config_with_clear_error():
    """
    Passing a non-mapping config should raise a TypeError with a helpful message.
    This enforces caller correctness.
    """
    app_module = _import_app_with_no_network()
    create_app = getattr(app_module, "create_app")

    with pytest.raises(TypeError):
        create_app("not-a-mapping")  # type: ignore