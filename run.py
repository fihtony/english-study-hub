import os
import sys
import logging
from typing import Dict

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")


def main() -> None:
    """
    Development entrypoint: import the application factory at runtime (no side-effects at import)
    and run the built-in Flask server. Port is read from the environment to support dynamic
    assignment (e.g., test harnesses / cloud runners).
    """
    try:
        port = int(os.environ.get("PORT", 5000))
    except (TypeError, ValueError):
        logging.warning("Invalid PORT environment variable; falling back to 5000")
        port = 5000

    # Use a minimal explicit config override for local development.
    config_overrides: Dict[str, object] = {"DEBUG": True}

    try:
        # Import create_app lazily to avoid side-effects at module import time.
        from app import create_app  # type: ignore
    except Exception:
        logging.exception("Failed to import create_app from app package")
        sys.exit(1)

    try:
        app = create_app(config_overrides)
    except Exception:
        logging.exception("Application factory raised an exception during creation")
        sys.exit(1)

    debug = bool(app.config.get("DEBUG", False))
    logging.info("Starting Flask development server on 127.0.0.1:%d (debug=%s)", port, debug)

    try:
        # Bound to localhost for local development safety.
        app.run(host="127.0.0.1", port=port, debug=debug)
    except Exception:
        logging.exception("Unhandled exception while running the Flask server")
        sys.exit(1)


if __name__ == "__main__":
    main()