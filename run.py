import logging
import os
import sys
from typing import Tuple

# Configure basic logging for visibility when running locally
LOG_LEVEL = os.environ.get("LOG_LEVEL", "INFO").upper()
logging.basicConfig(
    level=LOG_LEVEL,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("run")

def _read_host_port() -> Tuple[str, int]:
    """
    Read host and port from environment variables with safe defaults.
    PORT is validated to be an integer in the ephemeral port range.
    """
    host = os.environ.get("HOST", "127.0.0.1")
    port_str = os.environ.get("PORT", "5000")
    try:
        port = int(port_str)
        if not (1 <= port <= 65535):
            raise ValueError("port out of range")
    except Exception:
        logger.warning("Invalid PORT value %r, falling back to 5000", port_str)
        port = 5000
    return host, port

def _create_app_instance():
    """
    Import create_app from the app package and instantiate the Flask application.
    Provides clear error messages if the app package is missing or create_app fails.
    """
    try:
        # Import here to provide a clear error message if package is missing
        from app import create_app  # type: ignore
    except Exception as exc:
        logger.exception(
            "Failed to import 'create_app' from package 'app'. Ensure 'app/__init__.py' "
            "defines create_app() and that the package is on PYTHONPATH."
        )
        raise SystemExit(1) from exc

    try:
        app = create_app()
    except Exception as exc:
        logger.exception("create_app() raised an exception during app creation.")
        raise SystemExit(1) from exc

    # Basic runtime sanity checks
    if app is None:
        logger.error("create_app() returned None instead of a Flask application.")
        raise SystemExit(1)

    # Confirm the object looks like a Flask app
    if not hasattr(app, "run"):
        logger.error("Returned object from create_app() does not appear to be a Flask app.")
        raise SystemExit(1)

    return app

def main() -> None:
    """
    Entrypoint for running the Flask development server locally.
    Uses sensible defaults and environment overrides for HOST/PORT/DEBUG.
    """
    host, port = _read_host_port()
    debug_env = os.environ.get("DEBUG", os.environ.get("FLASK_DEBUG", "True"))
    debug = str(debug_env).lower() not in ("0", "false", "no", "")

    app = _create_app_instance()

    # Show basic startup information
    logger.info("Starting Flask development server for app=%r", getattr(app, "name", None))
    logger.info("Host: %s  Port: %s  Debug: %s", host, port, debug)
    try:
        # debug True enables the reloader and interactive debugger (for local dev only)
        app.run(host=host, port=port, debug=debug)
    except Exception as exc:
        logger.exception("Failed to start Flask server.")
        raise SystemExit(1) from exc

if __name__ == "__main__":
    main()