from flask import Blueprint, render_template, current_app, make_response, abort, Request
import logging
from typing import Any, Dict

logger = logging.getLogger(__name__)

bp = Blueprint('main', __name__, template_folder='templates')


@bp.route('/', methods=('GET',))
def index() -> Any:
    """
    Render the landing page (index.html) with basic context variables.

    Returns:
        A Flask response containing the rendered template.
    """
    title = 'English Study Hub'
    description = (
        "English Study Hub is a lightweight learning portal offering curated lessons "
        "and exercises to help learners improve reading, writing, and comprehension. "
        "Start with short, focused modules designed for steady progress."
    )
    cta_label = 'Get Started'
    cta_href = '/learn'

    context: Dict[str, Any] = {
        'title': title,
        'description': description,
        'cta_label': cta_label,
        'cta_href': cta_href,
    }

    try:
        rendered = render_template('index.html', **context)
        response = make_response(rendered, 200)
        return response
    except Exception as exc:  # Broad catch to ensure graceful error handling for template errors
        # Log details server-side but do not leak internals to clients
        logger.exception("Failed to render landing page template: %s", exc)
        # Use a generic message and proper status code
        abort(500)


@bp.after_app_request
def set_security_headers(response):
    """
    Apply a set of conservative security headers to responses produced by the application.

    These headers follow common OWASP recommendations:
    - Prevent clickjacking with X-Frame-Options
    - Disable content sniffing with X-Content-Type-Options
    - Apply a restrictive Content-Security-Policy that allows only same-origin resources
    - Set Referrer-Policy and Permissions-Policy for privacy
    - (Optional) HSTS for production deployments served over HTTPS
    """
    try:
        # Prevent the page from being embedded in iframes on other sites
        response.headers.setdefault('X-Frame-Options', 'DENY')

        # Prevent MIME type sniffing which can cause security issues
        response.headers.setdefault('X-Content-Type-Options', 'nosniff')

        # Keep referrer information minimal when navigating away
        response.headers.setdefault('Referrer-Policy', 'strict-origin-when-cross-origin')

        # Basic Permissions-Policy (formerly Feature-Policy) — deny sensitive features by default
        response.headers.setdefault('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')

        # Content Security Policy: conservative policy allowing only same-origin scripts/styles/images,
        # permitting inline styles to support minimal templates that may include small inline rules.
        csp = (
            "default-src 'self'; "
            "script-src 'self'; "
            "style-src 'self' 'unsafe-inline'; "
            "img-src 'self' data:; "
            "object-src 'none'; "
            "base-uri 'self'; "
            "frame-ancestors 'none';"
        )
        response.headers.setdefault('Content-Security-Policy', csp)

        # HSTS: only apply if the app is served over HTTPS in production. This header is safe to set but
        # has effect only over secure connections. It's recommended for production deployments.
        response.headers.setdefault('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')

        # Encourage caching rules for static responses could be added here as needed
        return response
    except Exception:
        # If header setting fails for any reason, log and return the original response
        logger.exception("Failed to apply security headers to response")
        return response


__all__ = ['bp']