#!/usr/bin/env python3
"""
Entrypoint for local manual testing of the Flask app.

Usage:
    python run.py

This script imports create_app from the app package, instantiates the Flask application,
and starts the development server on 0.0.0.0:5000. Errors during app creation or startup
are logged and terminate the process with a non-zero exit code.
"""
from __future__ import annotations

import logging
import sys

try:
    from app import create_app
except Exception as e:
    logging.basicConfig(level=logging.ERROR)
    logging.exception("Unable to import create_app from app package")
    sys.exit(1)

# Configure basic logging for the runtime
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s - %(message)s",
)

logger = logging.getLogger(__name__)

try:
    app = create_app()
except Exception:
    logger.exception("Failed to create Flask application via create_app()")
    sys.exit(1)


if __name__ == "__main__":
    # Explicit and minimal runner for local manual testing.
    try:
        logger.info("Starting Flask development server on http://0.0.0.0:5000")
        # Debug True is intentional for local testing per ticket; do NOT use in production.
        app.run(host="0.0.0.0", port=5000, debug=True)
    except Exception:
        logger.exception("Unhandled exception while running the Flask development server")
        sys.exit(1)