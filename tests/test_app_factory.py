import sys
import threading
import time

def test_create_app_importable_without_side_effects_and_returns_flask_app():
    """
    Verifies:
    - 'from app import create_app' is importable (no blocking side-effects).
    - Importing the app module does not start non-daemon background threads (i.e., no server started on import).
    - create_app is callable and returns a Flask instance when passed {'TESTING': True}.
    """
    # Snapshot non-daemon threads before import
    before_non_daemon = {t.ident for t in threading.enumerate() if not t.daemon}

    # Ensure a fresh import of the app package to catch import-time side-effects
    if "app" in sys.modules:
        del sys.modules["app"]

    # Time the import to ensure it doesn't hang (import should complete quickly)
    start = time.time()
    from app import create_app  # requirement: import create_app this way
    elapsed = time.time() - start
    assert elapsed < 5.0, f"Importing 'app' took too long ({elapsed:.2f}s); possible blocking side-effect"

    # create_app must be callable
    assert callable(create_app), "create_app should be callable"

    # Snapshot non-daemon threads after import and ensure none were added
    after_non_daemon = {t.ident for t in threading.enumerate() if not t.daemon}
    added = after_non_daemon - before_non_daemon
    assert not added, f"Importing 'app' started non-daemon threads (possible server): {added}"

    # Call factory to create an app configured for testing
    app = create_app({"TESTING": True})

    # Validate app is a Flask application and testing mode is enabled
    try:
        from flask import Flask
    except Exception as exc:
        raise AssertionError("Flask must be importable for this test to run") from exc

    assert isinstance(app, Flask), "create_app should return a Flask application instance"
    assert app.testing is True, "App instance should have testing=True when created with {'TESTING': True}"