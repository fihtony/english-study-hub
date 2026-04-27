import logging
import os
import sys
import traceback
from typing import Optional

try:
    from app import create_app
except Exception as exc:  # Defensive: report import issues clearly
    sys.stderr.write("Failed to import create_app from app package:\n")
    traceback.print_exc()
    raise

# Create the Flask application instance for imports
try:
    app = create_app()
except Exception as exc:
    sys.stderr.write("create_app() raised an exception during application creation:\n")
    traceback.print_exc()
    raise

def _get_bool_env(name: str, default: bool = False) -> bool:
    val = os.getenv(name)
    if val is None:
        return default
    return val.lower() in ("1", "true", "yes", "on")

def main(host: Optional[str] = None, port: Optional[int] = None, debug: Optional[bool] = None) -> int:
    """
    Entrypoint to run the Flask development server. Returns exit code (0 on success).
    Host/port/debug can be controlled via environment variables:
      FLASK_RUN_HOST, FLASK_RUN_PORT, FLASK_DEBUG
    """
    # Resolve config from environment when not explicitly provided
    host = host or os.getenv("FLASK_RUN_HOST", "127.0.0.1")
    port = int(port or os.getenv("FLASK_RUN_PORT", "5000"))
    debug = debug if debug is not None else _get_bool_env("FLASK_DEBUG", False)

    # Configure logging
    logging.basicConfig(
        level=logging.DEBUG if debug else logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s %(message)s",
    )
    logger = logging.getLogger("run")
    logger.info("Starting English Study Hub Flask app")
    logger.debug("Host=%s Port=%d Debug=%s", host, port, debug)

    # Prevent accidentally running debug mode in production-like environment
    if debug:
        logger.warning("Running in debug mode. Do NOT use debug mode in production.")

    try:
        # Run Flask's built-in server for local development only
        app.run(host=host, port=port, debug=debug)
        return 0
    except KeyboardInterrupt:
        logger.info("Shutdown requested by user (KeyboardInterrupt). Exiting.")
        return 0
    except Exception:
        logger.exception("Unhandled exception while running the Flask app:")
        return 2

if __name__ == "__main__":
    # When executed directly, run the application and exit with appropriate code
    exit_code = main()
    # Use os._exit to avoid Flask dev server cleanup issues if any
    sys.exit(exit_code)