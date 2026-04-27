import os
import logging
from typing import Optional

from flask import Blueprint, render_template, current_app, abort, make_response, Flask
from jinja2 import TemplateNotFound

# Blueprint for main site routes.
# The blueprint does not set its own static_folder; the application-level
# static folder (app.static_folder) should serve /static/* assets.
bp = Blueprint(
    "main",
    __name__,
    template_folder=os.path.join(os.path.dirname(__file__), "templates"),
)

logger = logging.getLogger(__name__)


@bp.route("/", methods=["GET"])
def index():
    """
    Landing page handler.

    Renders the index.html template. Adds a small set of security headers to
    help mitigate common browser-based risks (clickjacking, MIME sniffing,
    and a minimal CSP). Errors during template rendering are logged and
    translated to a 500 response to avoid leaking internals.
    """
    try:
        html = render_template("index.html")
        response = make_response(html, 200)

        # Security headers (minimal, intentional, and conservative)
        # - Prevent MIME sniffing
        response.headers["X-Content-Type-Options"] = "nosniff"
        # - Prevent clickjacking
        response.headers["X-Frame-Options"] = "DENY"
        # - Baseline Content Security Policy (allow same-origin resources,
        #   allow inline styles for the simple landing CSS). If the project
        #   later adds scripts or external fonts, tighten/update this CSP.
        response.headers[
            "Content-Security-Policy"
        ] = "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"

        return response
    except TemplateNotFound:
        # Template missing - log with stack trace in server logs and return 500.
        current_app.logger.exception("Template 'index.html' not found for landing page.")
        abort(500)
    except Exception:
        # Catch-all: avoid leaking stack traces to clients while still logging.
        current_app.logger.exception("Unhandled exception while rendering landing page.")
        abort(500)


def register_blueprint(app: Optional[Flask] = None) -> None:
    """
    Helper to register this blueprint onto a Flask app.

    Usage (preferred in create_app):
        from app.routes import bp as main_bp
        app.register_blueprint(main_bp)

    Alternatively:
        from app.routes import register_blueprint
        register_blueprint(app)
    """
    if app is None:
        logger.error("register_blueprint called without an app instance.")
        return
    app.register_blueprint(bp)


# Explicit exports for clarity
__all__ = ["bp", "register_blueprint"]