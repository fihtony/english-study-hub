import os
import logging
import secrets
from typing import Optional, Mapping, Any

from flask import Flask, render_template, jsonify, request

# Expose create_app for tests and runtime imports
__all__ = ["create_app"]

_logger = logging.getLogger(__name__)
_logger.addHandler(logging.NullHandler())


def _configure_app(app: Flask, config: Optional[Mapping[str, Any]] = None) -> None:
    """
    Apply minimal, secure defaults to the Flask app configuration.
    Uses environment variables where appropriate and falls back to safe defaults.
    """
    # Base config
    app.config.setdefault("ENV", os.environ.get("FLASK_ENV", "production"))
    app.config.setdefault("DEBUG", os.environ.get("FLASK_DEBUG", "0") in ("1", "true", "True"))
    # Secret key: prefer env var, otherwise generate ephemeral secret for local/testing use.
    secret = os.environ.get("SECRET_KEY")
    if not secret:
        # Generate a runtime-only secret; tests/dev will still work. Do not persist.
        secret = secrets.token_urlsafe(32)
        _logger.warning("Using ephemeral SECRET_KEY (not for production). Set SECRET_KEY env var to override.")
    app.config.setdefault("SECRET_KEY", secret)

    # Secure session cookie settings (OWASP recommendations)
    is_dev = app.config["ENV"] in ("development", "dev")
    app.config.setdefault("SESSION_COOKIE_HTTPONLY", True)
    app.config.setdefault("SESSION_COOKIE_SAMESITE", "Lax")
    # Only enable Secure cookies when not in development (requires TLS in production).
    app.config.setdefault("SESSION_COOKIE_SECURE", not is_dev)

    # Small sensible defaults
    app.config.setdefault("JSON_SORT_KEYS", False)
    app.config.setdefault("PROPAGATE_EXCEPTIONS", False)

    # Allow user-supplied dict to override defaults
    if config:
        app.config.update(config)


def _register_blueprints(app: Flask) -> None:
    """
    Dynamically import and register blueprints from app.routes.
    If the module or blueprint is absent, log a warning but do not raise,
    so the factory remains usable in testing contexts where routes may be stubbed.
    """
    try:
        # Import inside function to avoid circular imports at module import time.
        from app import routes  # type: ignore
    except Exception as exc:  # pragma: no cover - logging path
        _logger.warning("Could not import app.routes: %s", exc)
        return

    # Expect routes module to expose one or more blueprints; prefer `main_bp`.
    registered = False
    for attr in ("main_bp", "bp", "main", "blueprint"):
        bp = getattr(routes, attr, None)
        if bp:
            try:
                app.register_blueprint(bp)
                _logger.debug("Registered blueprint '%s' from app.routes", attr)
                registered = True
            except Exception as exc:  # pragma: no cover - defensive
                _logger.exception("Failed to register blueprint '%s': %s", attr, exc)

    # Also allow a collection named `blueprints` (list/tuple)
    bps = getattr(routes, "blueprints", None)
    if bps:
        for bp in bps:
            try:
                app.register_blueprint(bp)
                registered = True
            except Exception as exc:  # pragma: no cover - defensive
                _logger.exception("Failed to register blueprint from routes.blueprints: %s", exc)

    if not registered:
        _logger.warning("No blueprints were registered from app.routes; ensure a blueprint named 'main_bp' exists.")


def _register_error_handlers(app: Flask) -> None:
    """
    Register minimal error handlers that safely render responses.
    Prefer HTML when the client accepts it; otherwise return JSON.
    """

    @app.errorhandler(404)
    def _not_found(err):
        _logger.debug("404 for path: %s", request.path)
        # Try to render template if available; otherwise return JSON
        try:
            return render_template("404.html"), 404
        except Exception:
            return jsonify({"error": "Not Found"}), 404

    @app.errorhandler(500)
    def _internal_error(err):
        # Log with stack trace
        _logger.exception("Internal server error: %s", err)
        try:
            return render_template("500.html"), 500
        except Exception:
            return jsonify({"error": "Internal Server Error"}), 500


def create_app(config: Optional[Mapping[str, Any]] = None) -> Flask:
    """
    Application factory for the Flask app.

    - Ensures templates resolve regardless of working directory by using the package directory.
    - Applies minimal secure defaults.
    - Registers blueprints from app.routes if available.
    - Registers basic error handlers.

    Returns:
        A configured Flask application instance.
    """
    # Ensure template_folder resolves relative to this file
    package_dir = os.path.dirname(__file__)
    template_folder = os.path.join(package_dir, "templates")

    app = Flask(__name__, template_folder=template_folder)

    # Configure app (env, secret, cookie settings, etc.)
    _configure_app(app, config=config)

    # Setup logging for app if not already configured
    if not app.logger.handlers:
        # Basic fallback logging configuration suitable for small apps and tests
        handler = logging.StreamHandler()
        formatter = logging.Formatter(
            "[%(asctime)s] %(levelname)s in %(module)s: %(message)s"
        )
        handler.setFormatter(formatter)
        app.logger.addHandler(handler)
        app.logger.setLevel(logging.DEBUG if app.config["DEBUG"] else logging.INFO)

    # Register blueprints and error handlers
    _register_blueprints(app)
    _register_error_handlers(app)

    # Health check endpoint (useful for tests and simple runtime checks)
    @app.route("/healthz", methods=["GET"])
    def _healthz():
        return jsonify({"status": "ok"}), 200

    return app


# Provide a convenience app instance for quick interactive use while still supporting the factory pattern.
# Avoid creating this at import-time in test suites that prefer to control app creation; create default only if explicitly requested.
if os.environ.get("FLASK_CREATE_DEFAULT", "0") in ("1", "true", "True"):
    try:
        _logger.info("Creating default Flask application instance via create_app() (FLASK_CREATE_DEFAULT set).")
        app = create_app()
    except Exception:  # pragma: no cover - defensive
        _logger.exception("Failed to create default Flask application instance.")
        raise