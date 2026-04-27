from flask import render_template, make_response, request
from werkzeug.exceptions import HTTPException
import logging
from . import app

logger = logging.getLogger(__name__)
logger.addHandler(logging.NullHandler())


def _apply_security_headers(resp):
    """
    Apply conservative security headers following OWASP guidance.
    These headers are always set for responses produced by public routes.
    """
    try:
        # Prevent MIME type sniffing
        resp.headers["X-Content-Type-Options"] = "nosniff"
        # Prevent clickjacking
        resp.headers["X-Frame-Options"] = "DENY"
        # Legacy XSS filter (kept for older user-agents)
        resp.headers["X-XSS-Protection"] = "1; mode=block"
        # Minimal referrer policy to avoid leaking origin on cross-origin requests
        resp.headers["Referrer-Policy"] = "no-referrer-when-downgrade"
        # Content Security Policy - restrict to same-origin; allow inline styles for simple templates
        resp.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "script-src 'self'; "
            "style-src 'self' 'unsafe-inline'; "
            "img-src 'self' data:; "
            "font-src 'self' data:;"
        )
        # HSTS only when request is secure
        if request.is_secure:
            resp.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains; preload"
        # Do not cache responses served to clients (keeps tests deterministic)
        resp.headers["Cache-Control"] = "no-store"
    except Exception:
        # Never let header application raise to callers; log and return response unmodified
        logger.exception("Failed to apply security headers")
    return resp


@app.route("/", methods=("GET",))
def landing():
    """
    Landing page route.

    Returns the rendered index.html wrapped in a Response, with security headers applied.
    """
    try:
        resp = make_response(render_template("index.html"))
        # Ensure correct content type for HTML responses
        resp.headers.setdefault("Content-Type", "text/html; charset=utf-8")
        return _apply_security_headers(resp)
    except HTTPException as he:
        # Werkzeug HTTPExceptions are safe to expose their HTTP semantics
        logger.warning("HTTP exception while rendering landing: %s", he)
        resp = make_response(str(he), he.code or 500)
        resp.headers.setdefault("Content-Type", "text/plain; charset=utf-8")
        return _apply_security_headers(resp)
    except Exception:
        # Log full stack trace server-side; return a generic, safe HTML message client-side
        logger.exception("Unexpected error while rendering landing page")
        safe_html = (
            "<!doctype html>"
            "<html lang='en'>"
            "<head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>"
            "<title>Service Unavailable</title></head>"
            "<body><main style='font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,sans-serif;"
            "margin:4rem auto;max-width:40rem;padding:1rem;text-align:center;'>"
            "<h1>Service temporarily unavailable</h1>"
            "<p>Please try again later.</p>"
            "</main></body></html>"
        )
        resp = make_response(safe_html, 503)
        resp.headers["Content-Type"] = "text/html; charset=utf-8"
        resp.headers["Cache-Control"] = "no-store, must-revalidate"
        return _apply_security_headers(resp)


@app.route("/healthz", methods=("GET",))
def healthz():
    """
    Simple health check endpoint used by tests and monitoring.
    """
    try:
        resp = make_response("ok", 200)
        resp.headers.setdefault("Content-Type", "text/plain; charset=utf-8")
        resp.headers["Cache-Control"] = "no-store"
        return _apply_security_headers(resp)
    except Exception:
        logger.exception("Unexpected error in healthz")
        resp = make_response("unavailable", 503)
        resp.headers["Content-Type"] = "text/plain; charset=utf-8"
        resp.headers["Cache-Control"] = "no-store"
        return _apply_security_headers(resp)