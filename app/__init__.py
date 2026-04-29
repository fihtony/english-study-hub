import os
import logging
import secrets
from typing import Any, Optional, Union

from flask import Flask, Response


def create_app(config: Optional[Union[dict, str, object]] = None) -> Flask:
    """
    Application factory for the Flask app.

    - template_folder: app/templates (relative to this file)
    - static_folder: project-root/static (one level above app/)
    - Accepts an optional config (dict, path to pyfile, or object)
    """
    # Use explicit os.path.join calls so templates/static resolve regardless of CWD
    template_folder = os.path.join(os.path.dirname(__file__), "templates")
    static_folder = os.path.join(os.path.dirname(__file__), "..", "static")

    # Exact instantiation required by ticket rules
    app = Flask(
        __name__,
        template_folder=template_folder,
        static_folder=static_folder,
    )

    # Basic logging configuration for app
    if not app.logger.handlers:
        logging.basicConfig(level=logging.INFO)

    # Default (safe-for-dev) config; SECRET_KEY from env if present, otherwise generated.
    default_secret = os.environ.get("SECRET_KEY") or secrets.token_urlsafe(32)
    app.config.from_mapping(
        SECRET_KEY=default_secret,
        # Session / cookie security defaults
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SAMESITE="Lax",
        # Set SESSION_COOKIE_SECURE to True in production if FLASK_ENV indicates production.
        SESSION_COOKIE_SECURE=(os.environ.get("FLASK_ENV") or "").lower() == "production",
        REMEMBER_COOKIE_HTTPONLY=True,
        JSON_SORT_KEYS=False,
    )

    # Apply user-supplied config
    if config:
        try:
            if isinstance(config, str):
                # Treat as path to a config file (python file)
                app.config.from_pyfile(config, silent=False)
            elif isinstance(config, dict):
                app.config.update(config)
            else:
                # Treat as object with attributes
                app.config.from_object(config)
        except Exception as e:
            app.logger.exception("Failed to load provided config: %s", e)
            raise

    # Security-related response headers (basic OWASP guidance)
    @app.after_request
    def set_security_headers(response: Response) -> Response:
        # Prevent MIME-sniffing
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        # Clickjacking protection
        response.headers.setdefault("X-Frame-Options", "SAMEORIGIN")
        # Referrer policy
        response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
        # Minimal permissions policy
        response.headers.setdefault("Permissions-Policy", "geolocation=()")
        # Content Security Policy - restrict to self, allow inline styles for simplicity
        csp = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
        response.headers.setdefault("Content-Security-Policy", csp)
        return response

    # Import routes after app creation to avoid circular imports.
    try:
        # The routes module should import `current_app` or register blueprints.
        import app.routes  # type: ignore  # noqa: E402,F401
    except Exception as e:
        # Log with stacktrace and re-raise so failures are visible early
        app.logger.exception("Failed to import app.routes: %s", e)
        raise

    return app


# Create a default application instance at package import time so tests can import the
# package and directly use `app.test_client()`. Tests expect the package to expose a
# Flask application instance named `app`.
# Keep this at module level and avoid any attribute-proxying that could recurse.
try:
    app = create_app()
except Exception:
    # If app creation fails at import time, surface the exception (useful for CI/tests)
    logging.exception("Failed to create Flask application via create_app()")
    raise

__all__ = ["create_app", "app"]
