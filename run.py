#!/usr/bin/env python3
"""
Local development entrypoint.

Usage:
    python run.py

Reads PORT from the environment (defaults to 5000) to support dynamic assignment.
"""
from __future__ import annotations

import logging
import os
import sys
from typing import Optional

try:
    # Import the factory. This import should not cause side-effects.
    from app import create_app  # type: ignore
except Exception as exc:  # pragma: no cover - import-time failure
    logging.exception("Failed to import create_app from app package: %s", exc)
    raise

def _parse_bool_env(var: str, default: bool) -> bool:
    val = os.environ.get(var)
    if val is None:
        return default
    return val.strip().lower() in ("1", "true", "yes", "on")

def main(argv: Optional[list[str]] = None) -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    )

    port_env = os.environ.get("PORT", "5000")
    try:
        port = int(port_env)
    except ValueError:
        logging.error("Invalid PORT value %r; must be an integer.", port_env)
        sys.exit(2)

    # Default to debug True for local development; allow override via FLASK_DEBUG env var
    debug = _parse_bool_env("FLASK_DEBUG", True)

    try:
        app = create_app()
    except Exception:
        logging.exception("Failed to create Flask app via create_app().")
        sys.exit(1)

    host = "0.0.0.0"
    try:
        logging.info("Starting Flask development server on %s:%d (debug=%s)", host, port, debug)
        app.run(host=host, port=port, debug=debug)
    except KeyboardInterrupt:
        logging.info("Shutting down server due to KeyboardInterrupt.")
    except Exception:
        logging.exception("Unhandled exception while running the Flask server.")
        sys.exit(1)

if __name__ == "__main__":
    main()