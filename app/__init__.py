import os
import secrets
import logging
from typing import Callable
from flask import Flask, make_response, request

def create_app() -> Flask:
    """
    Create and configure the Flask application.

    - Uses the required exact Flask constructor form so templates resolve regardless of cwd:
      app = Flask(__name__, template_folder=os.path.join(os.path.dirname(__file__), 'templates'))
    - Configures basic security-related settings and registers the application's blueprint.
    - Adds standard security headers to all responses.
    """
    # Required exact instantiation to ensure templates folder resolves correctly.
    app = Flask(__name__, template_folder=os.path.join(os.path.dirname(__file__), 'templates'))

    # Basic configuration
    app.config.setdefault('SECRET_KEY', os.environ.get('SECRET_KEY') or secrets.token_urlsafe(32))
    # Session/cookie security
    is_production = os.environ.get('FLASK_ENV', '').lower() == 'production' or os.environ.get('ENV', '').lower() == 'production'
    app.config['SESSION_COOKIE_HTTPONLY'] = True
    app.config['SESSION_COOKIE_SECURE'] = True if is_production else False
    app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
    app.config['JSON_SORT_KEYS'] = False

    # Logging configuration (keep it simple and respect any existing handlers)
    if not app.logger.handlers:
        logging.basicConfig(level=logging.INFO)
    app.logger.setLevel(logging.INFO)
    app.logger.info("Initializing Flask app (production=%s)", is_production)

    # Register blueprints from app.routes
    try:
        # routes.py is expected to define a Blueprint named `bp`
        from .routes import bp  # relative import
    except Exception as exc:
        # Fail fast with a clear error if the routes module/blueprint is missing or errors
        app.logger.exception("Failed to import blueprint from app.routes")
        raise ImportError("Unable to import 'bp' from app.routes. Ensure app/routes.py exists and defines `bp` Blueprint.") from exc

    app.register_blueprint(bp)
    app.logger.info("Registered blueprint: %s", getattr(bp, 'name', '<unknown>'))

    # Security headers to mitigate common web risks (CSP, clickjacking, MIME-sniffing, referrer)
    @app.after_request
    def set_security_headers(response):
        # Content Security Policy - conservative defaults (allow self for scripts/styles/images, data: for images)
        csp = (
            "default-src 'self'; "
            "script-src 'self'; "
            "style-src 'self'; "
            "img-src 'self' data:; "
            "object-src 'none'; "
            "base-uri 'self'; "
            "frame-ancestors 'none';"
        )
        response.headers.setdefault('Content-Security-Policy', csp)
        response.headers.setdefault('X-Content-Type-Options', 'nosniff')
        response.headers.setdefault('X-Frame-Options', 'DENY')
        response.headers.setdefault('Referrer-Policy', 'strict-origin-when-cross-origin')
        response.headers.setdefault('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
        # HSTS only in production (enforce HTTPS)
        if is_production:
            response.headers.setdefault('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
        return response

    # Basic error handlers with safe, minimal responses
    @app.errorhandler(404)
    def handle_404(err):
        app.logger.debug("404 occurred for path: %s", request.path)
        return make_response(
            "<!doctype html><title>404 Not Found</title>"
            "<h1>404 - Not Found</h1><p>The requested resource could not be found.</p>",
            404,
            {'Content-Type': 'text/html; charset=utf-8'}
        )

    @app.errorhandler(500)
    def handle_500(err):
        app.logger.exception("Internal server error at path: %s", request.path)
        return make_response(
            "<!doctype html><title>500 Internal Server Error</title>"
            "<h1>500 - Internal Server Error</h1><p>An unexpected error occurred. Please try again later.</p>",
            500,
            {'Content-Type': 'text/html; charset=utf-8'}
        )

    return app


# Module-level app object so tests and entrypoints can import `from app import app`
app = create_app()