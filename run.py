#!/usr/bin/env python3
"""
run.py - Development server entrypoint.

Usage:
    pip install -r requirements.txt
    python run.py

This module exposes `app` at import-time for tests (do NOT start the server on import).
The development server is only started when invoked as a script (if __name__ == '__main__').
"""

from __future__ import annotations

import logging
import os
import sys
from typing import Any

# Import the application factory. If this fails, provide a helpful error and exit.
try:
    from app import create_app  # type: ignore
except Exception as exc:  # pragma: no cover - defensive import-time handling
    msg = (
        "Failed to import create_app from the 'app' package. "
        "Ensure 'app/__init__.py' defines a create_app() factory and is import-safe.\n"
        f"Underlying error: {exc!r}"
    )
    # Print to stderr so failures are visible in CI and local runs
    print(msg, file=sys.stderr)
    raise

# Create the Flask application at module level so tests and other importers can use it.
# This must not start the server or perform actions with side-effects.
try:
    app = create_app()
except Exception as exc:  # pragma: no cover - defensive creation-time handling
    # If the factory raises, fail early with a clear message.
    logging.basicConfig(level=logging.ERROR)
    logging.exception("Application factory raised an exception during create_app()")
    raise

__all__ = ["app"]


def _configure_logging() -> None:
    """Configure basic logging for running the development server."""
    # Respect existing logging configuration if present, otherwise set reasonable defaults.
    logger = logging.getLogger()
    if not logger.handlers:
        level = logging.INFO
        logging.basicConfig(
            level=level,
            format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
        )
    # Make Flask's Werkzeug logger less verbose by default in dev
    logging.getLogger("werkzeug").setLevel(logging.INFO)


def run_dev_server(host: str = "127.0.0.1", port: int = 5000, debug: bool = True) -> None:
    """
    Start Flask development server.

    The server is intended for local development only. For production use a WSGI server.
    """
    _configure_logging()
    log = logging.getLogger(__name__)
    log.info("Starting development server at http://%s:%d (debug=%s)", host, port, debug)
    try:
        # debug=True enables the debugger and reloader. This call blocks until shutdown.
        app.run(host=host, port=port, debug=debug)
    except KeyboardInterrupt:
        log.info("Server interrupted by user (KeyboardInterrupt). Shutting down.")
    except Exception as exc:
        # Log unexpected exceptions to help with debugging start-up issues.
        log.exception("Unhandled exception while running development server: %s", exc)
        raise


if __name__ == "__main__":  # guard ensures importing this module won't start the server
    # Allow optional overrides from environment variables for convenience.
    host = os.environ.get("FLASK_RUN_HOST", "127.0.0.1")
    port_str = os.environ.get("FLASK_RUN_PORT", "5000")
    debug_env = os.environ.get("FLASK_DEBUG", "1")
    try:
        port = int(port_str)
    except ValueError:
        print(f"Invalid FLASK_RUN_PORT '{port_str}', falling back to 5000", file=sys.stderr)
        port = 5000
    debug = debug_env not in ("0", "False", "false")
    run_dev_server(host=host, port=port, debug=debug)