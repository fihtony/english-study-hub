import os
import sys
import logging

# Configure simple logging for runtime errors and startup info.
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("run")

try:
    # Import the application factory. This must not create side-effects.
    from app import create_app  # type: ignore
except Exception as exc:
    logger.exception("Failed to import create_app from app package: %s", exc)
    # Fail fast if the application factory cannot be imported.
    sys.exit(1)


def _get_port() -> int:
    port_val = os.environ.get("PORT", "5000")
    try:
        return int(port_val)
    except ValueError:
        logger.warning("Invalid PORT value %r, falling back to 5000", port_val)
        return 5000


def _get_debug() -> bool:
    dbg = os.environ.get("FLASK_DEBUG", "")
    return dbg.lower() in ("1", "true", "yes", "y")


if __name__ == "__main__":
    port = _get_port()
    debug = _get_debug()

    try:
        app = create_app()
    except Exception as exc:
        logger.exception("Application factory raised an exception: %s", exc)
        sys.exit(1)

    # Run the development server. In production, use a WSGI server instead.
    try:
        logger.info("Starting Flask app on 0.0.0.0:%d (debug=%s)", port, debug)
        app.run(host="0.0.0.0", port=port, debug=debug)
    except KeyboardInterrupt:
        logger.info("Interrupted, shutting down.")
        sys.exit(0)
    except Exception as exc:
        logger.exception("Unhandled exception while running the server: %s", exc)
        sys.exit(1)