import os
import sys
import logging
import argparse
from typing import Optional

logger = logging.getLogger(__name__)


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run the Flask development server for English Study Hub.")
    parser.add_argument(
        "--port",
        type=int,
        default=None,
        help="Port to listen on (overrides PORT env var).",
    )
    parser.add_argument(
        "--debug",
        action="store_true",
        help="Enable debug mode (overrides FLASK_DEBUG env var).",
    )
    return parser.parse_args()


def _get_port(cli_port: Optional[int]) -> int:
    """
    Determine port to run on. Priority:
    1. CLI --port
    2. PORT environment variable
    3. Default 5000
    """
    if cli_port is not None:
        return cli_port

    env_port = os.environ.get("PORT")
    if env_port:
        try:
            return int(env_port)
        except ValueError:
            logger.warning("Invalid PORT environment value %r, falling back to 5000", env_port)

    return 5000


def _get_debug(cli_debug: bool) -> bool:
    """
    Determine debug mode. Priority:
    1. CLI --debug (if provided)
    2. FLASK_DEBUG environment variable (truthy values: '1','true','yes')
    3. Default True for development convenience
    """
    if cli_debug:
        return True

    env_debug = os.environ.get("FLASK_DEBUG")
    if env_debug is not None:
        return env_debug.lower() in ("1", "true", "yes", "on")

    # Default to True for local development as requested; callers can override via env or CLI.
    return True


def _configure_logging(debug: bool) -> None:
    level = logging.DEBUG if debug else logging.INFO
    logging.basicConfig(
        level=level,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
        stream=sys.stdout,
    )
    # Reduce overly verbose loggers from external libs when not debugging
    if not debug:
        logging.getLogger("werkzeug").setLevel(logging.INFO)


def main() -> None:
    args = _parse_args()
    port = _get_port(args.port)
    debug = _get_debug(args.debug)

    _configure_logging(debug)
    logger.info("Starting English Study Hub (dev server) on 0.0.0.0:%d (debug=%s)", port, debug)

    # Import the app factory only when starting the server to avoid side-effects on module import.
    try:
        from app import create_app
    except Exception as exc:  # pragma: no cover - defensive error handling
        logger.exception("Failed to import create_app from app package: %s", exc)
        sys.exit(2)

    try:
        app = create_app()
    except Exception as exc:  # pragma: no cover - create_app failing should fail fast
        logger.exception("create_app() raised an exception: %s", exc)
        sys.exit(3)

    # Sanity check: ensure the returned object looks like a Flask app (duck-typing).
    try:
        from flask import Flask  # local import to avoid importing Flask when module is imported
    except Exception:
        Flask = None  # type: ignore

    if Flask is not None and not isinstance(app, Flask):
        logger.warning("create_app() did not return a Flask app instance. Proceeding anyway.")

    try:
        # For development use; host 0.0.0.0 allows access from container/VM hosts.
        app.run(host="0.0.0.0", port=port, debug=debug, use_reloader=debug)
    except KeyboardInterrupt:
        logger.info("Received keyboard interrupt, shutting down.")
    except Exception as exc:  # pragma: no cover - runtime server errors
        logger.exception("Unhandled exception while running the server: %s", exc)
        sys.exit(4)


if __name__ == "__main__":
    main()