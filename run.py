#!/usr/bin/env python3
"""
run.py — Simple run script to launch the Flask app in local development mode.

Usage:
    python run.py

Environment:
    FLASK_RUN_HOST  - optional, defaults to 127.0.0.1
    FLASK_RUN_PORT  - optional, defaults to 5000
    FLASK_DEBUG     - optional, "1"/"true" enables debug mode

Important:
    This module avoids importing or calling the application factory at import time
    so tests and other tooling can import application code without side-effects.
"""
from __future__ import annotations

import logging
import os
import sys
from typing import Tuple


def configure_logging() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    )


def _get_host_port_debug_from_env() -> Tuple[str, int, bool]:
    host = os.getenv("FLASK_RUN_HOST", "127.0.0.1")
    port_env = os.getenv("FLASK_RUN_PORT", "5000")
    try:
        port = int(port_env)
        if not (0 < port < 65536):
            raise ValueError("port out of range")
    except Exception as exc:
        raise ValueError(f"Invalid FLASK_RUN_PORT '{port_env}': {exc}") from exc

    debug_env = os.getenv("FLASK_DEBUG", "0").lower()
    debug = debug_env in ("1", "true", "yes", "on")
    return host, port, debug


def main() -> None:
    configure_logging()
    logger = logging.getLogger("run")

    try:
        host, port, debug = _get_host_port_debug_from_env()
    except ValueError as exc:
        logger.error("Configuration error: %s", exc)
        sys.exit(1)

    # Import the application factory only when executing the script to avoid
    # side-effects at import-time (important for tests and tooling).
    try:
        from app import create_app  # local import to prevent import-time side-effects
    except Exception as exc:
        logger.exception("Failed to import create_app from the app package: %s", exc)
        sys.exit(1)

    try:
        app = create_app()
    except Exception as exc:
        logger.exception("Application factory raised an exception: %s", exc)
        sys.exit(1)

    logger.info("Starting Flask development server at http://%s:%d (debug=%s)", host, port, debug)

    try:
        # Use Flask's built-in server for local development only.
        # For production, use a WSGI server such as Gunicorn.
        app.run(host=host, port=port, debug=debug)
    except Exception as exc:
        logger.exception("Unhandled exception while running the app: %s", exc)
        sys.exit(1)


if __name__ == "__main__":
    main()