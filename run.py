import os
import sys
import logging
from typing import Optional

try:
    from app import create_app
except Exception as e:
    # Fail fast with a clear message if the application factory cannot be imported.
    logging.basicConfig(stream=sys.stderr, level=logging.ERROR)
    logging.error("Failed to import create_app from app package: %s", e, exc_info=True)
    raise

# Create the Flask application using the factory.
# This is safe at import time as long as create_app has no side-effects (per project conventions).
app = create_app()

__all__ = ("app",)


def _get_port(default: int = 5000) -> int:
    """Read PORT from environment and return a valid integer port."""
    port_value = os.environ.get("PORT", str(default)).strip()
    try:
        port = int(port_value)
        if not (1 <= port <= 65535):
            raise ValueError("port out of range")
        return port
    except Exception:
        logging.getLogger(__name__).warning(
            "Invalid PORT value %r; falling back to %d", port_value, default
        )
        return default


def _get_host() -> str:
    """Return host to bind to. Default to 127.0.0.1 for local development."""
    return os.environ.get("HOST", "127.0.0.1")


def main() -> None:
    """Run the Flask development server.

    Always sets debug=True for local development (per project run.py policy),
    and reads the port from the environment to support dynamic port assignment.
    """
    # Configure basic logging for the run-time.
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s - %(message)s",
    )
    logger = logging.getLogger("run")
    port = _get_port(5000)
    host = _get_host()

    logger.info("Starting Flask development server (debug=True) on %s:%d", host, port)
    try:
        # Debug=True is explicit per repository convention for local dev entrypoint.
        # Do not enable use_reloader=False here; let Flask handle reload in debug mode.
        app.run(host=host, port=port, debug=True)
    except Exception as exc:
        logger.error("Failed to start Flask server: %s", exc, exc_info=True)
        # Re-raise so CI / tooling can see the failure.
        raise


if __name__ == "__main__":
    main()