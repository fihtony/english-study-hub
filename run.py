#!/usr/bin/env python3
"""
Top-level runner for the Flask development server.

Usage:
    python run.py

Exposes `app` (Flask application instance) at module level so tests can import it:
    from run import app
    app.testing = True
    client = app.test_client()
"""

from __future__ import annotations

import logging
import os
import sys
from typing import Any

# Create a logger for this module
logger = logging.getLogger(__name__)


try:
    # Import application factory from package `app`.
    # This import is intentionally at module scope so `app` is available to test suites.
    from app import create_app  # type: ignore
except Exception as exc:  # pragma: no cover - defensive import handling
    # Import failure is fatal for running tests or the server; log and exit.
    msg = (
        "Failed to import application factory `create_app` from package `app`.\n"
        "Ensure there is an `app/__init__.py` defining `create_app()` and that "
        "dependencies are installed (pip install -r requirements.txt)."
    )
    # Configure minimal logging to stderr before exiting
    logging.basicConfig(level=logging.ERROR, format="%(levelname)s: %(message)s")
    logger = logging.getLogger(__name__)
    logger.exception(msg)
    raise


# Instantiate the Flask application (factory pattern)
try:
    app = create_app()
except Exception as exc:  # pragma: no cover - if factory fails raise to surface the error
    logging.basicConfig(level=logging.ERROR, format="%(levelname)s: %(message)s")
    logger.exception("create_app() raised an exception during application initialization.")
    raise

def _parse_bool_env(key: str, default: bool) -> bool:
    """Parse boolean-like environment variables."""
    val = os.environ.get(key)
    if val is None:
        return default
    val_lower = val.strip().lower()
    return val_lower in {"1", "true", "yes", "on"}


def main(argv: list[str] | None = None) -> int:
    """
    Run the Flask development server.

    Reads PORT from the environment (default 5000) to support dynamic port assignment.
    Reads FLASK_DEBUG or DEBUG to decide debug mode (defaults to True for developer convenience).
    """
    argv = argv if argv is not None else sys.argv[1:]

    # Determine port with safe parsing
    port_env = os.environ.get("PORT", "")
    try:
        port = int(port_env) if port_env else 5000
    except ValueError:
        logger.warning("Invalid PORT environment variable %r, falling back to 5000", port_env)
        port = 5000

    # Debug mode determined from environment, defaulting to True for local development
    debug = _parse_bool_env("FLASK_DEBUG", _parse_bool_env("DEBUG", True))

    # Configure logging: more verbose in debug mode
    logging.basicConfig(
        level=logging.DEBUG if debug else logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    )

    host = "127.0.0.1"

    logger.info("Starting Flask development server on http://%s:%d/ (debug=%s)", host, port, debug)
    try:
        # Keep invocation simple so developer can run `python run.py`
        app.run(host=host, port=port, debug=debug)
        return 0
    except KeyboardInterrupt:
        logger.info("Interrupted, shutting down.")
        return 0
    except Exception:
        logger.exception("Unhandled exception while running the Flask development server.")
        return 2


if __name__ == "__main__":  # pragma: no cover - executed when running the script directly
    raise SystemExit(main())