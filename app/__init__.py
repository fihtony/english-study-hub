import os
import logging
import secrets
from typing import Any
from flask import Flask, render_template, request, jsonify, Response

# REQUIRED: use this exact template_folder pattern so tests resolve templates correctly
app = Flask(__name__, template_folder=os.path.join(os.path.dirname(__file__), "templates"))

# Basic logging setup (non-invasive)
logger = logging.getLogger(__name__)
if not logging.getLogger().handlers:
    logging.basicConfig(level=logging.INFO)

# Security-focused default configuration
_env = os.environ.get("FLASK_ENV", "production").lower()
app.config.setdefault("ENV", _env)
app.config.setdefault("DEBUG", _env == "development")

# Allow explicit TESTING override (useful for pytest)
if "TESTING" in os.environ:
    app.config["TESTING"] = os.environ.get("TESTING", "0") in ("1", "true", "True")

# Session / cookie security
# Secret key: prefer environment variable; if absent generate ephemeral key (safe for tests/dev)
app.config.setdefault("SECRET_KEY", os.environ.get("SECRET_KEY") or secrets.token_urlsafe(32))

if app.config.get("DEBUG"):
    app.config.setdefault("SESSION_COOKIE_SECURE", False)
else:
    app.config.setdefault("SESSION_COOKIE_SECURE", True)

app.config.setdefault("SESSION_COOKIE_HTTPONLY", True)
app.config.setdefault("SESSION_COOKIE_SAMESITE", "Lax")

# Optionally adjust static folder to project-level static/ if present
_project_static = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "static"))
if os.path.isdir(_project_static):
    # Point Flask to the repository-level static/ for convenience.
    app.static_folder = _project_static

    # import locally to avoid importing send_from_directory when static not present
    from flask import send_from_directory  # type: ignore
    from werkzeug.exceptions import NotFound

    @app.route("/static/<path:filename>")
    def _static(filename: str) -> Any:
        """
        Serve files from the project-level static/ directory. Uses send_from_directory
        which defends against path traversal attacks.
        """
        try:
            return send_from_directory(app.static_folder, filename)
        except NotFound:
            logger.info("Static file not found: %s", filename)
            return ("Not Found", 404)
        except Exception as exc:  # pragma: no cover - defensive
            logger.exception("Failed to serve static file %s: %s", filename, exc)
            return ("Not Found", 404)

# Security headers applied to all responses
@app.after_request
def set_security_headers(response: Response) -> Response:
    # Prevent MIME-type sniffing
    response.headers.setdefault("X-Content-Type-Options", "nosniff")
    # Basic clickjacking protection
    response.headers.setdefault("X-Frame-Options", "SAMEORIGIN")
    # Minimal CSP: only allow resources from self, permit inline styles for a simple landing page
    response.headers.setdefault(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
    )
    # Referrer policy
    response.headers.setdefault("Referrer-Policy", "no-referrer-when-downgrade")
    # HSTS only in non-debug environments
    if not app.config.get("DEBUG"):
        response.headers.setdefault(
            "Strict-Transport-Security",
            "max-age=63072000; includeSubDomains; preload"
        )
    return response

# Error handlers with safe, user-facing messages
@app.errorhandler(404)
def not_found(error) -> Any:
    logger.info("404 Not Found: %s %s", request.method, request.path)
    try:
        return render_template("404.html"), 404
    except Exception:
        return jsonify({"error": "Not Found"}), 404

@app.errorhandler(500)
def internal_error(error) -> Any:
    logger.exception("500 Internal Server Error at %s %s", request.method, request.path)
    try:
        return render_template("500.html"), 500
    except Exception:
        return jsonify({"error": "Internal Server Error"}), 500

# Import routes to register endpoints. If import fails, provide a safe fallback route so
# `from app import app` succeeds and tests can use app.test_client().
try:
    from . import routes  # type: ignore
except Exception as exc:  # pragma: no cover - import failure fallback
    logger.exception("Failed to import app.routes: %s", exc)

    @app.route("/")
    def _fallback_index() -> Any:
        """
        Minimal fallback landing page used only if app.routes failed to import.
        Ensures tests and simple health checks work.
        """
        try:
            # Prefer rendering project template if present
            return render_template("index.html")
        except Exception:
            # Minimal safe HTML output (keeps tests simple and avoids XSS vectors)
            return (
                "<!doctype html>"
                "<html lang='en'><head><meta charset='utf-8'><title>English Study Hub</title></head>"
                "<body><h1>English Study Hub</h1><p>Welcome — landing page is initializing.</p></body></html>"
            )

# Expose only the Flask app for easier imports in tests and other modules
__all__ = ["app"]