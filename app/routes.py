from typing import Any
from flask import Blueprint, render_template, jsonify, make_response, current_app

main = Blueprint("main", __name__)


@main.route("/", methods=["GET"])
def index() -> Any:
    """
    Render the landing page.

    Returns:
        A Flask response containing rendered index.html with security headers and HTTP 200.
    """
    try:
        rendered = render_template("index.html")
        response = make_response(rendered, 200)
        # Security headers (OWASP recommendations)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["Referrer-Policy"] = "no-referrer-when-downgrade"
        # Content Security Policy: restrict to same-origin resources
        response.headers[
            "Content-Security-Policy"
        ] = "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self';"
        return response
    except Exception:
        # Log full stack trace for server-side debugging, but return a generic error to clients
        current_app.logger.exception("Failed to render index.html")
        return jsonify({"error": "internal_server_error"}), 500


@main.route("/health", methods=["GET"])
def health() -> Any:
    """
    Lightweight healthcheck intended for local debugging and orchestration checks.
    Returns a small JSON object with HTTP 200 when app is healthy.
    """
    try:
        return jsonify({"ok": True}), 200
    except Exception:
        current_app.logger.exception("Healthcheck failed unexpectedly")
        return jsonify({"ok": False}), 500


def register_blueprints(app) -> None:
    """
    Helper to register this blueprint with a Flask application.

    Usage:
        from app.routes import register_blueprints
        register_blueprints(app)
    """
    app.register_blueprint(main)  # register at root (no prefix)


__all__ = ["main", "register_blueprints"]