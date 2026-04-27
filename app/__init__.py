import os
import logging
from typing import Optional

from flask import Flask, jsonify, request

def _configure_logging():
    """Configure a sensible default logger for the application."""
    logger = logging.getLogger("english_study_hub")
    if not logger.handlers:
        handler = logging.StreamHandler()
        formatter = logging.Formatter(
            "[%(asctime)s] %(levelname)s in %(module)s: %(message)s"
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)
    logger.setLevel(logging.INFO)
    return logger

logger = _configure_logging()

def create_app(config_name: Optional[str] = None) -> Flask:
    """
    Application factory.

    Args:
        config_name: optional configuration name, e.g. 'testing'. Only used
                     to set minimal config values without side-effects.

    Returns:
        Configured Flask application instance.
    """
    # Ensure templates resolve regardless of current working directory
    template_folder = os.path.join(os.path.dirname(__file__), 'templates')
    # Static assets live at ../static relative to this package
    app = Flask(
        __name__,
        template_folder=template_folder,
        static_folder=os.path.join(os.path.dirname(__file__), '..', 'static')
    )

    # Minimal, safe default configuration (no network calls or side effects)
    app.config.from_mapping(
        TESTING=(config_name == 'testing'),
        # Security-related defaults; can be overridden by real config later
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SAMESITE="Lax",
    )

    # Basic security headers to help mitigate XSS/Clickjacking/etc.
    @app.after_request
    def _set_security_headers(response):
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("X-Frame-Options", "DENY")
        # Allow only same-origin framing for stricter environments:
        response.headers.setdefault("Referrer-Policy", "no-referrer-when-downgrade")
        # CSP: allow self for content, allow inline styles for the minimal CSS included.
        response.headers.setdefault(
            "Content-Security-Policy",
            "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
        )
        return response

    # Register routes/blueprints. Import inside factory to avoid import-time side-effects.
    try:
        from .routes import main_bp  # type: ignore
    except Exception as exc:
        # If routes cannot be imported, register a safe fallback so the app still starts.
        logger.exception("Failed to import app.routes; registering fallback route. Error: %s", exc)

        @app.route("/", methods=["GET"])
        def _fallback_index():
            # Minimal JSON response for health and developer visibility.
            return jsonify({
                "status": "ok",
                "message": "Landing page temporarily unavailable. Check server logs for import errors."
            }), 200
    else:
        app.register_blueprint(main_bp)

    # Generic error handlers with safe, non-revealing responses
    @app.errorhandler(404)
    def _not_found(err):
        return jsonify({"error": "Not Found"}), 404

    @app.errorhandler(500)
    def _internal_error(err):
        # Log stack trace server-side; return minimal info to clients
        logger.exception("Unhandled exception: %s", err)
        return jsonify({"error": "Internal Server Error"}), 500

    return app