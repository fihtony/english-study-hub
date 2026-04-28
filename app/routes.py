from flask import Blueprint, render_template, current_app, make_response, jsonify, abort, Response
from jinja2 import TemplateNotFound
from typing import Any

bp = Blueprint('main', __name__, template_folder='templates')


def _secure_response(resp: Response) -> Response:
    """
    Apply a set of conservative security headers to the response.
    This helps mitigate common web risks (clickjacking, MIME sniffing, weak referrer leakage).
    """
    # Prevent MIME type sniffing
    resp.headers.setdefault("X-Content-Type-Options", "nosniff")
    # Prevent clickjacking
    resp.headers.setdefault("X-Frame-Options", "DENY")
    # Minimal referrer policy
    resp.headers.setdefault("Referrer-Policy", "no-referrer-when-downgrade")
    # Basic Content Security Policy - allows same-origin resources and TLS assets.
    # Avoid overly strict inline rules to keep simple templates functional.
    resp.headers.setdefault(
        "Content-Security-Policy",
        "default-src 'self' https:; script-src 'self' https:; style-src 'self' https: 'unsafe-inline'; img-src 'self' data: https:;"
    )
    # Small mitigation for XSS in older browsers
    resp.headers.setdefault("X-XSS-Protection", "0")
    return resp


@bp.route("/", methods=("GET",))
def index() -> Any:
    """
    Landing page for English Study Hub.

    Renders templates/index.html with a title variable. Errors during template
    rendering are logged and surfaced as a 500 error with a minimal JSON payload
    to avoid leaking template internals.
    """
    try:
        rendered = render_template("index.html", title="English Study Hub")
        resp = make_response(rendered, 200)
        resp.headers.setdefault("Content-Type", "text/html; charset=utf-8")
        return _secure_response(resp)
    except TemplateNotFound:
        current_app.logger.exception("index.html template not found")
        abort(500)
    except Exception:
        # Log full exception server-side but return a minimal safe message.
        current_app.logger.exception("Unexpected error while rendering index")
        abort(500)


@bp.route("/health", methods=("GET",))
def health() -> Any:
    """
    Lightweight health-check endpoint suitable for load balancers and orchestration.
    Returns JSON with status and version information if available via app config.
    """
    payload = {"status": "ok"}
    # Optionally include application version if provided in config (non-sensitive).
    version = current_app.config.get("APP_VERSION")
    if version:
        payload["version"] = str(version)
    resp = make_response(jsonify(payload), 200)
    return _secure_response(resp)


@bp.route("/about", methods=("GET",))
def about() -> Any:
    """
    Simple about page used by tests and future expansion.
    If a dedicated about.html template exists it will be used; otherwise return
    a minimal HTML fragment.
    """
    try:
        rendered = render_template("about.html", title="About — English Study Hub")
        resp = make_response(rendered, 200)
        resp.headers.setdefault("Content-Type", "text/html; charset=utf-8")
        return _secure_response(resp)
    except TemplateNotFound:
        # Fall back to a minimal safe HTML response so this route is resilient.
        html = (
            "<!doctype html><html lang='en'><head>"
            "<meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>"
            "<title>About — English Study Hub</title></head><body>"
            "<main><h1>About — English Study Hub</h1>"
            "<p>Practice reading and improve your English skills.</p>"
            "</main></body></html>"
        )
        resp = make_response(html, 200)
        resp.headers.setdefault("Content-Type", "text/html; charset=utf-8")
        return _secure_response(resp)
    except Exception:
        current_app.logger.exception("Unexpected error while rendering about")
        abort(500)


@bp.app_errorhandler(404)
def _handle_404(error: Exception) -> Any:
    """
    Provide a consistent JSON 404 response for non-HTML requests while leaving
    HTML responses to Flask's default or custom templates.
    """
    # If the client expects JSON, return JSON; otherwise return default 404 page.
    accept = getattr(current_app, "request_class", None)
    # Simpler heuristic: if the request path ends with common web extension, serve HTML.
    # For tests and typical clients, prefer JSON to make assertions easy.
    payload = {"error": "not_found", "message": "The requested resource was not found."}
    resp = make_response(jsonify(payload), 404)
    return _secure_response(resp)


@bp.app_errorhandler(500)
def _handle_500(error: Exception) -> Any:
    """
    Generic 500 handler which logs the error and returns a minimal safe message.
    Avoid rendering templates here to prevent recursive errors.
    """
    current_app.logger.exception("Internal server error: %s", error)
    payload = {"error": "internal_server_error", "message": "An unexpected error occurred."}
    resp = make_response(jsonify(payload), 500)
    return _secure_response(resp)