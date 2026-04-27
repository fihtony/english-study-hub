import os
import logging
import secrets
from typing import Dict

from flask import Flask, request, make_response

app = None

def create_app(config: Dict | None = None) -> Flask:
    # Must use this exact form so templates resolve correctly
    app = Flask(__name__, template_folder=os.path.join(os.path.dirname(__file__), 'templates'))

    # Serve top-level static/ (static/css/styles.css) by pointing app.static_folder to repo-level static
    app.static_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'static'))

    # Basic logging configuration for app initialization phase
    logging.basicConfig(level=logging.INFO)
    app.logger.setLevel(logging.INFO)

    # Apply config dict or environment overrides
    if config:
        if not isinstance(config, dict):
            raise TypeError("config must be a dict or None")
        app.config.update(config)

    # SECRET_KEY: prefer explicit env var; fall back to a securely generated ephemeral key for local runs
    secret = os.getenv('SECRET_KEY')
    if secret:
        app.config['SECRET_KEY'] = secret
    else:
        # ephemeral key: safe for dev/testing only; do not rely on this in production
        app.config['SECRET_KEY'] = secrets.token_urlsafe(32)

    # Secure cookie settings (OWASP recommended defaults)
    app.config.setdefault('SESSION_COOKIE_HTTPONLY', True)
    app.config.setdefault('SESSION_COOKIE_SAMESITE', 'Lax')
    # Only enable secure cookie flag when explicitly requested (avoids breaking local HTTP dev)
    if os.getenv('SESSION_COOKIE_SECURE', '0') == '1':
        app.config.setdefault('SESSION_COOKIE_SECURE', True)
    else:
        app.config.setdefault('SESSION_COOKIE_SECURE', False)

    # Allow forcing HTTPS URL generation if desired
    if os.getenv('FORCE_HTTPS', '0') == '1':
        app.config['PREFERRED_URL_SCHEME'] = 'https'

    # Honor explicit TESTING env
    if os.getenv('TESTING') == '1':
        app.config['TESTING'] = True

    # Register security-related response headers
    @app.after_request
    def set_security_headers(response):
        # Prevent MIME sniffing
        response.headers.setdefault('X-Content-Type-Options', 'nosniff')
        # Clickjacking protection
        response.headers.setdefault('X-Frame-Options', 'SAMEORIGIN')
        # Basic Referrer Policy
        response.headers.setdefault('Referrer-Policy', 'no-referrer-when-downgrade')
        # Content Security Policy: allow resources only from self; allow inline styles for minimal scaffold
        response.headers.setdefault(
            'Content-Security-Policy',
            "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; object-src 'none'"
        )
        # Optionally set HSTS when running behind TLS and explicitly requested
        if request.is_secure or os.getenv('FORCE_HSTS', '0') == '1':
            response.headers.setdefault('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
        return response

    # Import and register blueprints
    try:
        from .routes import main_bp  # type: ignore
        app.register_blueprint(main_bp)
    except Exception as exc:
        # Fail gracefully: log and provide a minimal fallback route so app remains importable
        app.logger.exception("Failed to import/register app.routes.main_bp; registering fallback route: %s", exc)

        @app.route('/', methods=['GET'])
        def _fallback_index():
            # Minimal, safe HTML response. Keep content small and escape handled by Flask when rendering templates.
            html = (
                "<!doctype html>"
                "<html lang=\"en\">"
                "<head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">"
                "<title>English Study Hub</title>"
                "<link rel=\"stylesheet\" href=\"/static/css/styles.css\">"
                "</head>"
                "<body>"
                "<main>"
                "<h1>English Study Hub</h1>"
                "<p>Landing Page (Bare-bones)</p>"
                "</main>"
                "</body>"
                "</html>"
            )
            resp = make_response(html, 200)
            resp.headers['Content-Type'] = 'text/html; charset=utf-8'
            return resp

    return app

# optional convenience top-level app object for manual runs
try:
    # Only create a convenience app when module imported by run.py or interactive use
    if os.getenv('FLASK_CREATE_CONVENIENCE_APP', '0') == '1':
        app = create_app()
except Exception:
    # keep safe: do not raise on import
    app = None