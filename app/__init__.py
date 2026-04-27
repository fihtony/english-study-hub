import os
import logging
from typing import Optional

from flask import Flask, Blueprint, Response, request

_logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


def _create_flask_instance() -> Flask:
    """
    Create the Flask instance with deterministic template and static folder resolution.
    """
    base_dir = os.path.dirname(__file__)
    template_folder = os.path.join(base_dir, "templates")
    static_folder = os.path.join(base_dir, "..", "static")
    # Resolve to absolute paths to avoid surprises when cwd changes
    template_folder = os.path.abspath(template_folder)
    static_folder = os.path.abspath(static_folder)

    app = Flask(
        __name__,
        template_folder=template_folder,
        static_folder=static_folder,
    )

    # Security-related defaults (OWASP basic hardening)
    # Prefer explicit SECRET_KEY from environment; fall back to ephemeral key for dev/test.
    app.config.setdefault("SECRET_KEY", os.environ.get("SECRET_KEY") or os.urandom(24))
    app.config.setdefault("SESSION_COOKIE_HTTPONLY", True)
    # SESSION_COOKIE_SECURE should be True in production (set via env)
    app.config.setdefault("SESSION_COOKIE_SECURE", os.environ.get("SESSION_COOKIE_SECURE", "").lower() == "true")
    app.config.setdefault("REMEMBER_COOKIE_HTTPONLY", True)
    app.config.setdefault("PREFERRED_URL_SCHEME", "https" if app.config["SESSION_COOKIE_SECURE"] else "http")

    # Generic request/response hardening headers
    @app.after_request
    def _set_security_headers(response: Response) -> Response:
        # Prevent MIME type sniffing
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        # Clickjacking protection
        response.headers.setdefault("X-Frame-Options", "DENY")
        # Referrer policy
        response.headers.setdefault("Referrer-Policy", "no-referrer-when-downgrade")
        # Basic Content Security Policy: disallow inline scripts/styles and only allow same-origin resources.
        # Keep minimal to avoid breaking legitimate content; adjust for your assets.
        response.headers.setdefault(
            "Content-Security-Policy",
            "default-src 'self'; img-src 'self' data:; font-src 'self'; style-src 'self'; script-src 'self';"
        )
        # HSTS only when running over TLS in production
        if app.config["PREFERRED_URL_SCHEME"] == "https":
            response.headers.setdefault("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload")
        return response

    return app


def create_app(config: Optional[dict] = None) -> Flask:
    """
    Application factory.

    Args:
        config: Optional dict of configuration overrides to apply via app.config.update(config).

    Returns:
        Configured Flask application instance.
    """
    app = _create_flask_instance()

    # Apply provided config if it's a dict
    if isinstance(config, dict):
        app.config.update(config)
        _logger.debug("App config updated from provided dict.")
    elif config is not None:
        _logger.warning("create_app received a non-dict config; ignoring.")

    # Try to register routes blueprint from app.routes
    try:
        # Import lazily so create_app can be used in environments where routes may not be loadable immediately.
        import app.routes as routes_module  # type: ignore
    except Exception as exc:  # pragma: no cover - import error paths
        # If routes can't be imported, log and register a simple fallback route to avoid crashing imports.
        _logger.exception("Failed to import app.routes module; registering fallback route. Error: %s", exc)

        @app.route("/", methods=["GET"])
        def _fallback_index():
            # Minimal safe response if routes are unavailable
            return (
                "<!doctype html><html><head><meta charset='utf-8'><title>English Study Hub</title></head>"
                "<body><h1>English Study Hub</h1><p>Application routes are unavailable.</p></body></html>",
                503,
            )
        return app

    # Expect the routes module to expose a Blueprint named 'main' (common convention).
    bp = getattr(routes_module, "main", None)
    if isinstance(bp, Blueprint):
        app.register_blueprint(bp)
        _logger.info("Registered blueprint 'main' from app.routes")
    else:
        # Try alternate common names to be resilient
        bp_alt = getattr(routes_module, "bp", None) or getattr(routes_module, "blueprint", None)
        if isinstance(bp_alt, Blueprint):
            app.register_blueprint(bp_alt)
            _logger.info("Registered blueprint alternative from app.routes")
        else:
            # No blueprint found; raise so issues are caught early during development/testing.
            msg = "app.routes did not expose a Flask Blueprint named 'main' (or 'bp'/'blueprint')."
            _logger.error(msg)
            raise RuntimeError(msg)

    # Register an error handler for common exceptions to provide JSON for API consumers and safe pages for web.
    @app.errorhandler(500)
    def _handle_500(error):
        _logger.exception("Internal server error: %s", error)
        # Keep the payload minimal to avoid leaking server internals
        if request.accept_mimetypes.accept_json and not request.accept_mimetypes.accept_html:
            return {"error": "internal_server_error"}, 500
        return (
            "<!doctype html><html><head><meta charset='utf-8'><title>Server Error</title></head>"
            "<body><h1>Server Error</h1><p>Sorry — an unexpected error occurred.</p></body></html>",
            500,
        )

    return app


# Expose a default app for convenience (e.g., WSGI servers that import the module).
# Tests that wish to avoid side effects should import create_app explicitly.
try:
    app = create_app()
except Exception:  # pragma: no cover - if blueprint missing during early import, bubble up
    # If create_app fails at import time (missing routes blueprint), ensure the module still defines 'app' so other tooling can import it.
    # Create a minimal app instance without registering routes to allow inspection and testing of factory directly.
    _logger.exception("create_app() failed during module import; falling back to minimal Flask instance.")
    app = _create_flask_instance()