import os
import sys
import logging
from typing import Any

# Set up a sensible logger for dev startup messages and error reporting.
logger = logging.getLogger("run")
logger.setLevel(logging.DEBUG)
if not logger.handlers:
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(
        logging.Formatter("%(asctime)s [%(levelname)s] %(name)s: %(message)s")
    )
    logger.addHandler(handler)


def _import_create_app() -> Any:
    """
    Import create_app from the app package.

    Returns:
        The create_app factory callable.

    Raises:
        SystemExit: with non-zero code if import fails or create_app is missing.
    """
    try:
        # Per spec: import create_app from app
        from app import create_app  # type: ignore
    except Exception as exc:  # broad catch to provide helpful error message
        logger.exception(
            "Failed to import 'create_app' from the 'app' package. Ensure 'app' exists and is importable."
        )
        raise SystemExit(1) from exc

    if not callable(create_app):
        logger.error(
            "'create_app' imported from 'app' is not callable. Ensure app.create_app is a factory function."
        )
        raise SystemExit(1)

    return create_app


def _run_dev_server():
    """
    Create the Flask app via the factory and run the development server.
    Uses sensible defaults required by the task but allows override via environment.
    """
    create_app = _import_create_app()

    try:
        app = create_app()
    except Exception as exc:
        logger.exception("Application factory 'create_app' raised an exception during initialization.")
        raise SystemExit(1) from exc

    # Basic runtime validation: ensure this is a Flask app
    try:
        from flask import Flask  # local import to avoid forcing flask on import-time failure
    except Exception:
        logger.exception("Flask is not installed or failed to import. Install Flask>=2.2 and try again.")
        raise SystemExit(1)

    if not isinstance(app, Flask):
        logger.error(
            "The object returned by create_app() is not a Flask instance. Got: %r", type(app)
        )
        raise SystemExit(1)

    # Defaults required by the task
    host = os.environ.get("DEV_HOST", "127.0.0.1")
    port_str = os.environ.get("DEV_PORT", "5000")
    debug_env = os.environ.get("DEV_DEBUG", "true")
    debug = debug_env.lower() in ("1", "true", "yes", "on")

    # Validate port
    try:
        port = int(port_str)
        if not (1 <= port <= 65535):
            raise ValueError("port out of range")
    except Exception as exc:
        logger.exception("Invalid port value %r. Set DEV_PORT to a valid integer 1-65535.", port_str)
        raise SystemExit(1) from exc

    # Configure Flask/werkzeug logger level to be consistent with main logger in debug mode
    if debug:
        logging.getLogger("werkzeug").setLevel(logging.DEBUG)
    else:
        logging.getLogger("werkzeug").setLevel(logging.INFO)

    url = f"http://{host}:{port}/"
    logger.info("Starting English Study Hub development server -> %s (debug=%s)", url, debug)
    try:
        app.run(host=host, port=port, debug=debug)
    except KeyboardInterrupt:
        logger.info("Development server interrupted by user, shutting down.")
    except Exception:
        logger.exception("Unhandled exception while running the development server.")
        raise SystemExit(1)


if __name__ == "__main__":
    _run_dev_server()