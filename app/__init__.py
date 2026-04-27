import os
import logging
import secrets
from typing import Optional, Dict, Any

from flask import Flask, render_template, jsonify, request, Response

# Expose create_app for tests and runtime imports
__all__ = ["create_app"]

_logger = logging.getLogger(__name__)
_logger.addHandler(logging.NullHandler())


def _configure_app(app: Flask, config: Optional[Dict[str, Any]] = None) -> None:
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
        # Only accept dict-like mappings to avoid surprises
        if not isinstance(config, dict):
            raise TypeError("create_app config must be a dict if provided")
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
        _logger.debug("Could not import app.routes: %s", exc)
        return

    # Prefer the common 'bp' name first, then other common names
    registered = False
    for attr in ("bp", "main_bp", "main", "blueprint"):
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
        _logger.debug("No blueprints were registered from app.routes; ensure a blueprint named 'bp' or 'main_bp' exists.")


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


def _apply_security_headers(response: Response) -> Response:
    """
    Apply a minimal set of security headers to responses (OWASP-aligned).
    Keep policies conservative and compatible with typical apps.
    """
    # Prevent MIME type sniffing
    response.headers.setdefault("X-Content-Type-Options", "nosniff")
    # Clickjacking protection
    response.headers.setdefault("X-Frame-Options", "SAMEORIGIN")
    # Referrer policy
    response.headers.setdefault("Referrer-Policy", "no-referrer-when-downgrade")
    # Basic CSP: restrict everything by default, allow same-origin scripts/styles/images.
    # Note: Applications that need external resources should extend this per-route or via config.
    response.headers.setdefault(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
    )
    # HSTS only when served over HTTPS (Flask dev server is HTTP so do not set by default)
    return response


def create_app(config: Optional[Dict[str, Any]] = None) -> Flask:
    """
    Application factory for the Flask app.

    - Ensures templates resolve regardless of working directory by using the package directory.
    - Applies minimal secure defaults.
    - Registers blueprints from app.routes if available.
    - Registers basic error handlers and security headers.

    Returns:
        A configured Flask application instance.
    """
    # Ensure template_folder resolves relative to this file
    template_folder = os.path.join(os.path.dirname(__file__), "templates")

    # Create app using package relative templates directory (as required).
    app = Flask(__name__, template_folder=template_folder)

    # Configure app (env, secret, cookie settings, etc.)
    _configure_app(app, config=config)

    # Setup basic logging for app if not already configured by environment/hosting.
    if not app.logger.handlers:
        handler = logging.StreamHandler()
        formatter = logging.Formatter(
            "[%(asctime)s] %(levelname)s in %(module)s: %(message)s"
        )
        handler.setFormatter(formatter)
        app.logger.addHandler(handler)
        app.logger.setLevel(logging.DEBUG if app.config.get("DEBUG") else logging.INFO)

    # Register blueprints and error handlers
    _register_blueprints(app)
    _register_error_handlers(app)

    # Health check endpoint (useful for tests and simple runtime checks)
    @app.route("/healthz", methods=["GET"])
    def _healthz():
        return jsonify({"status": "ok"}), 200

    # Global after-request to add security headers
    @app.after_request
    def _after_request(response: Response) -> Response:
        return _apply_security_headers(response)

    return app