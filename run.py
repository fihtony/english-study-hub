import os
import sys
import logging
from typing import Optional

from app import create_app

# Create the Flask application instance so test suites can import `app`.
# Creating the app is lightweight (factory) and does not start the server.
try:
    app = create_app()
except Exception:
    logging.exception("Failed to create Flask application via create_app()")
    # Re-raise so import-time failures are visible during CI/test runs
    raise

def _get_port(default: int = 5000) -> int:
    """
    Read port from environment variable PORT and return as int.
    Falls back to default on missing/invalid values.
    """
    raw = os.environ.get("PORT", str(default))
    try:
        return int(raw)
    except (TypeError, ValueError):
        logging.warning("Invalid PORT value %r; falling back to %d", raw, default)
        return default

def _get_host(default: str = "0.0.0.0") -> str:
    """
    Allow an optional HOST override via environment, defaulting to 0.0.0.0.
    """
    return os.environ.get("HOST", default)

if __name__ == "__main__":
    # Configure simple logging for the development entrypoint
    logging.basicConfig(
        level=os.environ.get("LOG_LEVEL", "INFO"),
        format="%(asctime)s %(levelname)s %(name)s - %(message)s",
    )

    port = _get_port(5000)
    host = _get_host("0.0.0.0")

    # Respect FLASK_DEBUG for local development convenience; do not enable by default.
    flask_debug_env = os.environ.get("FLASK_DEBUG", "")
    debug = flask_debug_env.lower() in ("1", "true", "yes")

    try:
        app.run(host=host, port=port, debug=debug)
    except KeyboardInterrupt:
        logging.info("Shutdown requested by KeyboardInterrupt")
        sys.exit(0)
    except Exception:
        logging.exception("Unhandled exception while running the Flask development server")
        sys.exit(1)