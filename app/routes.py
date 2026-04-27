from flask import render_template, make_response, current_app, request
from werkzeug.exceptions import HTTPException
import logging
from . import app

logger = logging.getLogger(__name__)
logger.addHandler(logging.NullHandler())


def _apply_security_headers(resp):
    """
    Apply a set of conservative security headers to HTML responses.
    These follow OWASP guidance (CSP, X-Frame-Options, etc.).
    """
    # Prevent MIME sniffing
    resp.headers.setdefault("X-Content-Type-Options", "nosniff")
    # Prevent clickjacking
    resp.headers.setdefault("X-Frame-Options", "DENY")
    # Modern browsers use CSP; keep X-XSS-Protection for legacy
    resp.headers.setdefault("X-XSS-Protection", "1; mode=block")
    # Minimal referrer policy
    resp.headers.setdefault("Referrer-Policy", "no-referrer-when-downgrade")
    # Content Security Policy: restrict everything to same-origin; allow styles from self
    resp.headers.setdefault(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
    )
    # Recommend HSTS when served over HTTPS in production
    if request.is_secure:
        resp.headers.setdefault("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")
    # Do not cache error pages
    resp.headers.setdefault("Cache-Control", "no-store")
    return resp


@app.route("/", methods=("GET",))
def landing():
    """
    Landing page route for the application.

    Renders app/templates/index.html. On unexpected errors returns a safe,
    minimal error page without leaking internal details.
    """
    try:
        html = render_template("index.html")
        resp = make_response(html, 200)
        # Prefer caching landing page in production; here keep conservative defaults
        resp.headers.setdefault("Content-Type", "text/html; charset=utf-8")
        resp.headers.setdefault("Cache-Control", "public, max-age=60")
        return _apply_security_headers(resp)
    except HTTPException as he:
        # Let Werkzeug HTTPExceptions bubble as they are proper responses
        logger.warning("HTTP exception serving landing page: %s", he)
        resp = make_response(str(he), he.code or 500)
        return _apply_security_headers(resp)
    except Exception:
        # Log full stack trace server-side; return generic message client-side
        logger.exception("Unexpected error while rendering landing page")
        safe_html = (
            "<!doctype html>"
            "<html lang='en'>"
            "<head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>"
            "<title>English Study Hub</title></head>"
            "<body><main style='font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,sans-serif;"
            "margin:4rem auto;max-width:40rem;padding:1rem;text-align:center;'>"
            "<h1>Service temporarily unavailable</h1>"
            "<p>Please try again later.</p>"
            "</main></body></html>"
        )
        resp = make_response(safe_html, 503)
        # Ensure we do not cache the error
        resp.headers["Cache-Control"] = "no-store, must-revalidate"
        return _apply_security_headers(resp)


# Lightweight health-check endpoint useful for monitoring and automated tests.
@app.route("/healthz", methods=("GET",))
def healthz():
    """
    Basic health endpoint for liveness checks. Returns 200 when the process
    is up. Keep the response body minimal and JSON-free to prevent content sniffing.
    """
    try:
        resp = make_response("ok", 200)
        resp.headers.setdefault("Content-Type", "text/plain; charset=utf-8")
        # Do not cache health checks
        resp.headers.setdefault("Cache-Control", "no-store, must-revalidate")
        return _apply_security_headers(resp)
    except Exception:
        logger.exception("Unexpected error in healthz")
        resp = make_response("unavailable", 503)
        resp.headers["Cache-Control"] = "no-store"
        return _apply_security_headers(resp)