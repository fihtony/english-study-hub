from datetime import datetime
import logging
from typing import Any

from flask import Blueprint, render_template, abort, current_app, jsonify, make_response, Response, request
from jinja2 import TemplateNotFound

# Blueprint named 'main' as required
main = Blueprint('main', __name__)

logger = logging.getLogger(__name__)


@main.after_app_request
def _apply_security_headers(response: Response) -> Response:
    """
    Apply conservative security headers to responses from this blueprint.
    Headers follow OWASP recommendations: CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, HSTS (when secure).
    """
    try:
        # Content Security Policy: restrict to self, allow data: for images, allow inline styles for simple design
        csp = (
            "default-src 'self'; "
            "img-src 'self' data:; "
            "script-src 'self'; "
            "style-src 'self' 'unsafe-inline'; "
            "object-src 'none'; "
            "frame-ancestors 'none'; "
            "base-uri 'self';"
        )
        response.headers.setdefault('Content-Security-Policy', csp)
        response.headers.setdefault('X-Content-Type-Options', 'nosniff')
        response.headers.setdefault('X-Frame-Options', 'DENY')
        response.headers.setdefault('Referrer-Policy', 'strict-origin-when-cross-origin')
        # Permissions-Policy (formerly Feature-Policy)
        response.headers.setdefault('Permissions-Policy', 'geolocation=(), microphone=()')
        # Only set HSTS if the request was over HTTPS to avoid breaking local dev
        if request.is_secure:
            response.headers.setdefault('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
    except Exception:  # pragma: no cover - defensive
        logger.exception("Failed to set security headers on response")
    return response


@main.route('/', methods=['GET'])
def index() -> Any:
    """
    Landing page handler.
    Renders app/templates/index.html. If the template is missing or rendering fails, returns 500.
    """
    try:
        html = render_template('index.html')
        resp = make_response(html, 200)
        # Keep minimal caching for the HTML to ensure updates are visible; static assets are served via /static
        resp.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
        return resp
    except TemplateNotFound:
        # Explicitly log missing template for operators; return generic error to avoid leaking info
        logger.error("Template 'index.html' not found for landing page")
        abort(500, description='Internal Server Error')
    except Exception:
        # Catch-all to avoid exposing internal stack traces to clients
        logger.exception("Unexpected error while rendering landing page")
        abort(500, description='Internal Server Error')


@main.route('/health', methods=['GET'])
def health() -> Any:
    """
    Simple health check endpoint used by orchestration or CI.
    Returns a small JSON payload with an ISO UTC timestamp.
    """
    return jsonify(status='ok', time=datetime.utcnow().isoformat() + 'Z'), 200


__all__ = ['main']