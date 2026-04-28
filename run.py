#!/usr/bin/env python3
"""
Entrypoint for the Flask application.

Exposes a top-level `app` variable for WSGI servers and provides a
convenient CLI entrypoint for local development.

Usage:
  export PORT=8000
  python run.py
"""
from __future__ import annotations

import logging
import os
import sys
from typing import Optional

from app import create_app  # app package must provide create_app factory

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s: %(message)s")

# Create the Flask app at import time so WSGI servers (gunicorn, uWSGI) can discover it.
# Any exception during creation should be visible immediately.
try:
    app = create_app()
    if app is None:
        raise RuntimeError("create_app() returned None")
except Exception as exc:  # pragma: no cover - import-time failure should be loud
    logger.exception("Failed to create Flask application instance")
    # Re-raise so importing modules (or WSGI servers) fail fast and surface the root cause.
    raise

def _get_port(default: int = 5000) -> int:
    """Read PORT from environment and return a validated integer port."""
    val = os.environ.get("PORT", "")
    if not val:
        return default
    try:
        port = int(val)
        if not (0 < port < 65536):
            raise ValueError("port out of range")
        return port
    except Exception as e:
        logger.warning("Invalid PORT value %r, falling back to %d (%s)", val, default, e)
        return default

def _get_debug() -> bool:
    """Determine debug mode from FLASK_DEBUG or environment heuristics."""
    v = os.environ.get("FLASK_DEBUG")
    if v is None:
        # Default to True for local development as requested; production should override env.
        return True
    return str(v).lower() in ("1", "true", "yes", "on")

if __name__ == "__main__":  # CLI entrypoint for local development
    port = _get_port(5000)
    debug = _get_debug()
    host = "0.0.0.0"

    logger.info("Starting Flask development server on %s:%d (debug=%s)", host, port, debug)
    try:
        # Use Flask's built-in server for local development only.
        app.run(host=host, port=port, debug=debug)
    except Exception as exc:  # pragma: no cover - runtime error while starting server
        logger.exception("Failed to run Flask development server: %s", exc)
        sys.exit(1)