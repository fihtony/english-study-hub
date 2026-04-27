import os
import sys
import logging
from app import app

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s - %(message)s"
)
logger = logging.getLogger(__name__)


def main() -> None:
    """
    CLI entrypoint to run the Flask app locally.

    - Refuses to start if environment indicates production.
    - Reads HOST and PORT from environment with sensible defaults.
    - Ensures debug mode is explicitly disabled for manual runs.
    """
    # Production guard: refuse to run the dev server when environment indicates production
    env = os.environ.get("FLASK_ENV", os.environ.get("ENV", "")).strip().lower()
    if env == "production":
        logger.error(
            "Refusing to run development server in production environment (FLASK_ENV/ENV=production)."
        )
        sys.exit(1)

    host = os.environ.get("HOST", "0.0.0.0")
    try:
        port = int(os.environ.get("PORT", "5000"))
        if not (0 <= port <= 65535):
            raise ValueError("port out of range")
    except (TypeError, ValueError):
        logger.warning("Invalid PORT environment variable; falling back to 5000")
        port = 5000

    logger.info("Starting Flask development server at http://%s:%d/ (debug disabled)", host, port)
    try:
        # Explicitly disable debug and reloader for safety in manual launches
        app.run(host=host, port=port, debug=False, use_reloader=False)
    except Exception:
        logger.exception("Unhandled exception while running the Flask server")
        sys.exit(1)


if __name__ == "__main__":
    main()