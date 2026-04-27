import logging
import datetime
from typing import Any

from flask import Blueprint, make_response, render_template, jsonify, Response
from jinja2 import TemplateNotFound

logger = logging.getLogger(__name__)

bp = Blueprint("main", __name__)


def _secure_headers(resp: Response) -> Response:
    """
    Apply a minimal set of security headers to mitigate common web risks.
    These are conservative defaults that should be compatible with a simple
    server-side-rendered landing page. Templates that rely on inline scripts
    or external resources may need header adjustments.
    """
    # Prevent MIME-type sniffing
    resp.headers.setdefault("X-Content-Type-Options", "nosniff")
    # Prevent clickjacking
    resp.headers.setdefault("X-Frame-Options", "DENY")
    # Very restrictive content security policy: only allow same-origin resources.
    # If the site needs to load external scripts/styles, relax this deliberately.
    resp.headers.setdefault(
        "Content-Security-Policy",
        "default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self'; frame-ancestors 'none'; base-uri 'self';",
    )
    # Don't send referrer to other origins
    resp.headers.setdefault("Referrer-Policy", "no-referrer")
    # Basic XSS protection hint (legacy browsers)
    resp.headers.setdefault("X-XSS-Protection", "1; mode=block")
    return resp


@bp.route("/", methods=("GET",))
def landing() -> Response:
    """
    Landing page route. Renders the index.html template from the application's
    templates directory. Returns a Response with explicit HTML content-type
    and security headers applied.

    If the template is missing or rendering fails, a generic 500 HTML response
    is returned without exposing internal details (avoids leaking stack traces).
    """
    try:
        current_year = datetime.datetime.utcnow().year
        html: str = render_template("index.html", current_year=current_year)
        resp: Response = make_response(html, 200)
        resp.headers["Content-Type"] = "text/html; charset=utf-8"
        return _secure_headers(resp)
    except TemplateNotFound:
        logger.exception("Template 'index.html' not found for landing page.")
        safe_body = (
            "<!doctype html><html><head><meta charset='utf-8'><title>Service Unavailable</title></head>"
            "<body><h1>Service unavailable</h1><p>The site is temporarily unavailable. Please try again later.</p></body></html>"
        )
        resp = make_response(safe_body, 500)
        resp.headers["Content-Type"] = "text/html; charset=utf-8"
        return _secure_headers(resp)
    except Exception:
        # Catch-all: log for diagnostics but return a minimal safe message to clients.
        logger.exception("Unexpected error while rendering landing page.")
        safe_body = (
            "<!doctype html><html><head><meta charset='utf-8'><title>Service Error</title></head>"
            "<body><h1>Service error</h1><p>An unexpected error occurred.</p></body></html>"
        )
        resp = make_response(safe_body, 500)
        resp.headers["Content-Type"] = "text/html; charset=utf-8"
        return _secure_headers(resp)


@bp.route("/health", methods=("GET",))
def health() -> Response:
    """
    Simple health endpoint intended for readiness/liveness checks.
    Returns JSON with a non-sensitive status and applies security headers.
    """
    try:
        body: Any = {"status": "ok"}
        resp: Response = make_response(jsonify(body), 200)
        resp.headers["Content-Type"] = "application/json; charset=utf-8"
        return _secure_headers(resp)
    except Exception:
        logger.exception("Health check failed.")
        resp = make_response(jsonify({"status": "error"}), 500)
        resp.headers["Content-Type"] = "application/json; charset=utf-8"
        return _secure_headers(resp)