#!/usr/bin/env python3
"""
Top-level runner for the Flask application.

- Imports create_app from app package.
- Exposes `app` at module level for test discovery/import.
- Runs the development server when executed directly.
- Respects PORT and HOST environment variables; does not force FLASK_ENV.
"""

from __future__ import annotations

import logging
import os
import sys
from typing import Any

# Configure minimal logging for startup/shutdown diagnostics
logging.basicConfig(
    level=os.environ.get("LOG_LEVEL", "INFO"),
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
)
logger = logging.getLogger("run")

try:
    # Importing the factory function from the application package.
    # This import should be side-effect free (app/__init__.py should not run servers).
    from app import create_app  # type: ignore
except Exception as exc:  # pragma: no cover - import failure handling
    logger.exception("Failed to import create_app from app package: %s", exc)
    # Provide a clear exit so CI and local runs fail fast if app package is missing/misconfigured.
    sys.exit(
        "ERROR: Unable to import create_app from app package. Ensure `app/__init__.py` exists and exports create_app."
    )

# Create the Flask app instance once at module import so test suites and WSGI servers can import `app`.
# Creating the app here is intentional and minimal; it must not start any servers by itself.
try:
    app = create_app()  # type: ignore
except Exception as exc:  # pragma: no cover - factory runtime errors
    logger.exception("create_app() raised an exception during app creation: %s", exc)
    raise

def _parse_bool_env(var: str | None) -> bool:
    if var is None:
        return False
    return var.lower() in {"1", "true", "yes", "on"}


def main(argv: list[str] | None = None) -> int:
    """
    Entrypoint when run as a script.

    Reads:
      - PORT (int, default 5000)
      - HOST (string, default 127.0.0.1)
      - DEBUG / FLASK_DEBUG / APP_DEBUG (truthy values enable debug mode)

    Returns exit code (0 on clean shutdown).
    """
    argv = argv if argv is not None else sys.argv[1:]

    # Resolve host/port from environment to support dynamic assignment (e.g., cloud testers).
    host = os.environ.get("HOST", "127.0.0.1")
    try:
        port = int(os.environ.get("PORT", 5000))
    except ValueError:
        logger.warning("Invalid PORT value %r; falling back to 5000", os.environ.get("PORT"))
        port = 5000

    # Respect common flags for debugging but do not set FLASK_ENV here.
    debug = _parse_bool_env(os.environ.get("FLASK_DEBUG")) or _parse_bool_env(os.environ.get("DEBUG")) or _parse_bool_env(os.environ.get("APP_DEBUG"))

    logger.info("Starting Flask app on %s:%d (debug=%s)", host, port, debug)

    try:
        # Use app.run for local development. Production deployments should use a WSGI server.
        app.run(host=host, port=port, debug=debug)
    except KeyboardInterrupt:
        logger.info("Shutdown requested via KeyboardInterrupt")
        return 0
    except Exception as exc:  # pragma: no cover - runtime failure
        logger.exception("Unhandled exception while running the server: %s", exc)
        return 2
    return 0


if __name__ == "__main__":  # pragma: no cover - exercised by manual runs only
    raise SystemExit(main())