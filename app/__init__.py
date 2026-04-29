import os
import logging
from typing import Mapping, Optional, Any, Union
from flask import Flask, render_template
from jinja2 import TemplateNotFound

def create_app(config_object: Optional[Union[Mapping[str, Any], str, object]] = None) -> Flask:
    """
    Application factory for the English Study Hub Flask app.

    - Creates the Flask app with explicit template and static folders so
      static files resolve to the project-root /static/ directory.
    - Applies optional configuration overrides via mapping or object.
    - Registers routes blueprint from app.routes.
    - Sets secure default cookie and HTTP headers to follow OWASP guidance.
    - Importing this module has no side-effects (nothing runs on import).
    """
    base_dir = os.path.dirname(__file__)
    templates_dir = os.path.join(base_dir, "templates")
    static_dir = os.path.join(base_dir, "..", "static")

    app = Flask(
        __name__,
        template_folder=templates_dir,
        static_folder=static_dir,
    )

    # Default secrets/config (encourage production override via environment/config object)
    app.config.setdefault("SECRET_KEY", os.environ.get("SECRET_KEY", os.urandom(32).hex()))
    # Session cookie security defaults
    app.config.setdefault("SESSION_COOKIE_HTTPONLY", True)
    # Enable SESSION_COOKIE_SECURE when explicitly running in production-like env
    app.config.setdefault(
        "SESSION_COOKIE_SECURE",
        os.environ.get("FLASK_ENV", "").lower() == "production" or os.environ.get("ENABLE_HTTPS", "0") == "1",
    )
    app.config.setdefault("SESSION_COOKIE_SAMESITE", "Lax")

    # Apply config overrides if provided
    if config_object:
        try:
            if isinstance(config_object, Mapping):
                app.config.from_mapping(config_object)
            else:
                # strings (module paths) or objects with attributes
                app.config.from_object(config_object)
        except Exception as exc:
            logging.getLogger(__name__).exception("Failed to apply configuration overrides")
            raise

    # Basic logging setup for production environment if not already configured
    if not app.debug and not app.testing:
        handler = logging.StreamHandler()
        handler.setLevel(logging.INFO)
        formatter = logging.Formatter(
            "[%(asctime)s] %(levelname)s in %(module)s: %(message)s"
        )
        handler.setFormatter(formatter)
        if not app.logger.handlers:
            app.logger.addHandler(handler)
        app.logger.setLevel(logging.INFO)

    # Register routes/blueprint. Import inside factory to avoid side-effects on import.
    try:
        from .routes import bp  # type: ignore
    except Exception as exc:
        app.logger.exception("Unable to import routes blueprint from app.routes")
        raise

    app.register_blueprint(bp)

    # Security headers (CSP, X-Frame-Options, etc.)
    @app.after_request
    def set_security_headers(response):
        # Prevent MIME sniffing
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        # Clickjacking protection
        response.headers.setdefault("X-Frame-Options", "DENY")
        # Basic XSS protection (legacy, harmless to include)
        response.headers.setdefault("X-XSS-Protection", "1; mode=block")
        # Referrer policy
        response.headers.setdefault("Referrer-Policy", "no-referrer-when-downgrade")
        # Content Security Policy: keep conservative, allow only same-origin resources
        csp = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self' data:;"
        response.headers.setdefault("Content-Security-Policy", csp)
        return response

    # Friendly error handlers that avoid leaking internals
    @app.errorhandler(404)
    def handle_404(err):
        try:
            return render_template("404.html"), 404
        except TemplateNotFound:
            return ("Not Found", 404)

    @app.errorhandler(500)
    def handle_500(err):
        # Log the exception for ops, but present a generic message to clients
        app.logger.exception("Unhandled exception: %s", err)
        try:
            return render_template("500.html"), 500
        except TemplateNotFound:
            return ("Internal Server Error", 500)

    return app

# Export for external imports: from app import create_app
__all__ = ("create_app",)