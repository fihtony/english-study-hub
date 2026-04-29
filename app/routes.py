from typing import Callable
from flask import render_template, jsonify, make_response, Request, Response


def register_routes(app) -> None:
    """
    Register HTTP routes on the given Flask app.

    This function is safe to call at import-time (no side-effects other than
    attaching routes). Keep view functions small and defensive.

    Routes:
      - GET /        -> renders templates/index.html
      - GET /healthz -> simple health check (JSON)
    """

    def _secure_headers(resp: Response) -> Response:
        """
        Attach a minimal set of security headers recommended by OWASP.
        Keep values conservative and not overly permissive for production.
        """
        # Prevent MIME-sniffing
        resp.headers.setdefault("X-Content-Type-Options", "nosniff")
        # Prevent clickjacking
        resp.headers.setdefault("X-Frame-Options", "DENY")
        # Referrer policy
        resp.headers.setdefault("Referrer-Policy", "no-referrer")
        # Basic CSP: allow only same-origin resources; allow inline styles so simple static CSS can work
        resp.headers.setdefault(
            "Content-Security-Policy",
            "default-src 'self'; "
            "style-src 'self' 'unsafe-inline'; "
            "img-src 'self' data:; "
            "script-src 'none';"
        )
        # HSTS only when served over TLS / in production; using a conservative short value
        if app.config.get("PREFERRED_URL_SCHEME", "http") == "https":
            resp.headers.setdefault("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
        return resp

    def index() -> Response:
        """
        Render the landing page template.
        Keep errors handled and return a 500-safe JSON if rendering fails (useful for CI).
        """
        try:
            rendered = render_template("index.html")
            resp = make_response(rendered, 200)
            resp.headers["Content-Type"] = "text/html; charset=utf-8"
            return _secure_headers(resp)
        except Exception as exc:  # Defensive: don't leak internals
            app.logger.exception("Failed to render index.html")
            body = {"error": "internal_server_error", "message": "Failed to render page"}
            resp = make_response(jsonify(body), 500)
            resp.headers["Content-Type"] = "application/json; charset=utf-8"
            return _secure_headers(resp)

    def healthz() -> Response:
        """
        Lightweight health check used by CI and load balancers.
        Returns JSON with an OK status and a 200 HTTP status code.
        """
        try:
            resp = make_response(jsonify(status="ok"), 200)
            resp.headers["Content-Type"] = "application/json; charset=utf-8"
            return _secure_headers(resp)
        except Exception:
            # In the exceedingly unlikely event jsonify errors, fall back to plain text
            resp = make_response("ok", 200)
            resp.headers["Content-Type"] = "text/plain; charset=utf-8"
            return _secure_headers(resp)

    # Register routes using explicit add_url_rule to avoid decorator side-effects at import time.
    app.add_url_rule("/", endpoint="index", view_func=index, methods=["GET"])
    app.add_url_rule("/healthz", endpoint="healthz", view_func=healthz, methods=["GET"])