#!/usr/bin/env python3
"""
Entry point to run the Flask application for manual verification.

- Imports the application factory lazily to avoid side-effects at module import time.
- Reads PORT from environment (default 5000) to support dynamic port assignment.
- Runs the app on 127.0.0.1 for local verification.
"""

from __future__ import annotations

import logging
import os
import sys
from typing import Optional


def _get_port() -> int:
    raw = os.environ.get("PORT", "5000")
    try:
        port = int(raw)
        if not (0 < port < 65536):
            raise ValueError("port out of range")
        return port
    except Exception:
        logging.warning("Invalid PORT value %r, falling back to 5000", raw)
        return 5000


def main() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    )

    port = _get_port()
    logging.info("Starting application on 127.0.0.1:%d (debug=True)", port)

    try:
        # Importing the factory inside main avoids side-effects at module import time.
        from app import create_app  # type: ignore
    except Exception:
        logging.exception("Failed to import create_app from app package")
        sys.exit(1)

    try:
        app = create_app()
    except Exception:
        logging.exception("create_app() raised an exception during application creation")
        sys.exit(1)

    try:
        # Run only for local manual verification. Do not use this server in production.
        app.run(host="127.0.0.1", port=port, debug=True)
    except KeyboardInterrupt:
        logging.info("Shutdown requested via KeyboardInterrupt")
        raise
    except Exception:
        logging.exception("Unexpected error while running the Flask development server")
        sys.exit(1)


if __name__ == "__main__":
    main()