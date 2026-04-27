from flask import Blueprint, render_template, current_app, make_response
from jinja2 import TemplateNotFound
from typing import Any
import logging

# Public blueprint exported for app factory registration
main_bp = Blueprint('main', __name__)

__all__ = ["main_bp"]

_logger = logging.getLogger(__name__)


@main_bp.route('/', methods=['GET'])
def index() -> Any:
    """
    Landing page for English Study Hub.

    Renders 'index.html' from the application's template folder. Returns
    a response with security headers applied. Handles missing template
    and other unexpected errors gracefully while logging details.
    """
    try:
        html = render_template('index.html')
        response = make_response(html, 200)

        # Security headers (basic OWASP recommendations)
        # Prevent MIME-type sniffing
        response.headers['X-Content-Type-Options'] = 'nosniff'
        # Basic clickjacking protection
        response.headers['X-Frame-Options'] = 'DENY'
        # Minimal CSP: allow only same-origin resources; allow inline styles for simplicity
        response.headers['Content-Security-Policy'] = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self';"
        # Referrer policy
        response.headers['Referrer-Policy'] = 'no-referrer-when-downgrade'
        # HSTS (note: effective only over HTTPS and usually set at server/proxy layer)
        response.headers['Strict-Transport-Security'] = 'max-age=63072000; includeSubDomains; preload'

        return response

    except TemplateNotFound:
        # Template missing is a server-side setup error; log for diagnostics.
        current_app.logger.exception("Template 'index.html' not found for landing page.")
        return make_response("Internal server error", 500)

    except Exception:
        # Catch-all: avoid leaking internals to the client, log full stack trace.
        current_app.logger.exception("Unexpected error while rendering landing page.")
        return make_response("Internal server error", 500)