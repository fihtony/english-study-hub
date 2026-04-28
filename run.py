#!/usr/bin/env python3
"""
Entrypoint for manual development/testing.

Usage:
    python run.py

This module imports the Flask application factory `create_app` from the `app` package,
instantiates the application (side-effect-free if create_app is implemented correctly),
and runs the development server only when executed directly.

Port can be provided via the PORT environment variable (default: 5000).
Host is bound to 127.0.0.1 for local development.
"""
from __future__ import annotations

import logging
import os
import sys
from typing import Optional

try:
    # Import the application factory. app.__init__.py must be side-effect free.
    from app import create_app  # type: ignore
except Exception as exc:  # pragma: no cover - import-time safety
    logging.basicConfig(level=logging.ERROR)
    logging.error("Failed to import create_app from app package: %s", exc, exc_info=True)
    raise

# Instantiate the Flask application. This should be safe at import time if the factory has no side-effects.
try:
    app = create_app()  # type: ignore
except Exception as exc:  # pragma: no cover - defensive
    logging.basicConfig(level=logging.ERROR)
    logging.error("Failed to create Flask application via create_app(): %s", exc, exc_info=True)
    raise

def _get_port(default: int = 5000) -> int:
    """Return port read from PORT env var or default. Ensures valid integer and range."""
    port_str: Optional[str] = os.environ.get("PORT")
    if not port_str:
        return default
    try:
        port = int(port_str)
    except ValueError:
        logging.warning("Invalid PORT value %r, falling back to %d", port_str, default)
        return default
    if not (1 <= port <= 65535):
        logging.warning("PORT %d out of range, falling back to %d", port, default)
        return default
    return port

def main() -> None:
    """Run the Flask development server. Only used when this file is executed directly."""
    logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
    logger = logging.getLogger("run")
    host = "127.0.0.1"
    port = _get_port(5000)

    logger.info("Starting Flask development server at http://%s:%d/", host, port)
    try:
        # Use threaded=True for simple dev concurrency; do NOT use in production.
        app.run(host=host, port=port, threaded=True)
    except Exception as exc:  # pragma: no cover - runtime protection
        logger.exception("Unhandled exception while running the Flask development server: %s", exc)
        sys.exit(1)

if __name__ == "__main__":
    main()