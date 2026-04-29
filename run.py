#!/usr/bin/env python3
"""
Minimal CLI entrypoint to run the Flask app for local development.

- Imports create_app from the app package (no side-effects on import).
- Only constructs and runs the app when executed directly.
- Reads PORT from environment to support dynamic port assignment.
"""
from __future__ import annotations

import logging
import os
import sys
from typing import Optional

from app import create_app

logger = logging.getLogger("run")
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    stream=sys.stdout,
)


def _parse_port(value: Optional[str]) -> int:
    """
    Parse port value from environment, return a sane default (5000) on error.
    """
    default = 5000
    if not value:
        return default
    try:
        port = int(value)
        if 1 <= port <= 65535:
            return port
        logger.warning("PORT %r out of range, falling back to %d", value, default)
        return default
    except ValueError:
        logger.warning("Invalid PORT %r, falling back to %d", value, default)
        return default


def _parse_bool(value: Optional[str], default: bool = True) -> bool:
    if value is None:
        return default
    return str(value).strip().lower() in ("1", "true", "yes", "on")


if __name__ == "__main__":
    # Read host, port, and debug settings from environment for flexible local/dev runs.
    host = os.environ.get("HOST", "0.0.0.0")
    port = _parse_port(os.environ.get("PORT"))
    debug = _parse_bool(os.environ.get("FLASK_DEBUG", None), default=True)

    try:
        app = create_app()
    except Exception:
        logger.exception("Failed to create Flask app (create_app raised an exception).")
        sys.exit(2)

    # Sanity check: ensure the returned object is a Flask app-like object
    if not hasattr(app, "run"):
        logger.error("create_app() did not return a runnable Flask application.")
        sys.exit(3)

    logger.info(
        "Starting Flask app on %s:%d (debug=%s)", host, port, bool(debug)
    )

    try:
        # Use reloader and debugger per Flask debug flag; host/port from env.
        app.run(host=host, port=port, debug=bool(debug))
    except Exception:
        logger.exception("Unhandled exception while running the Flask app.")
        sys.exit(1)