import os
import sys
import logging
from typing import Optional

try:
    # Import the application factory from the app package
    from app import create_app  # type: ignore
except Exception as exc:  # pragma: no cover - startup import failure
    logging.basicConfig(level=logging.ERROR)
    logging.exception("Failed to import create_app from app package")
    raise SystemExit(1) from exc

# Instantiate the Flask application using the factory.
# Keep this at module level so test suites can import `app` without running the server.
try:
    app = create_app()
except Exception as exc:  # pragma: no cover - app factory failure
    logging.basicConfig(level=logging.ERROR)
    logging.exception("create_app() raised an exception during app initialization")
    raise SystemExit(1) from exc


def _get_port(env_var: str = "PORT", default: int = 5000) -> int:
    """Safely read port number from environment, falling back to default."""
    raw = os.environ.get(env_var, "")
    if not raw:
        return default
    try:
        port = int(raw)
        if not (0 < port < 65536):
            raise ValueError("port out of range")
        return port
    except Exception:
        logging.warning("Invalid PORT value %r, falling back to %d", raw, default)
        return default


if __name__ == "__main__":
    # Per project conventions, run only when executed directly.
    port = _get_port()
    host = "127.0.0.1"
    # Intentionally enable debug for local development as specified in the task.
    debug = True

    logging.basicConfig(
        level=logging.DEBUG if debug else logging.INFO,
        format="[%(asctime)s] %(levelname)s in %(module)s: %(message)s",
    )

    try:
        app.run(debug=debug, host=host, port=port)
    except Exception:
        logging.exception("Unhandled exception while running the Flask development server")
        sys.exit(1)