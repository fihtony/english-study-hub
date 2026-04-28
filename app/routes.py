from flask import Blueprint, render_template, abort, current_app
import logging

logger = logging.getLogger(__name__)

main_bp = Blueprint(
    "main",
    __name__,
    template_folder="templates",
    static_folder="../static",
)

@main_bp.route("/", methods=("GET",))
def index():
    """
    Landing page route.

    Renders the index.html template from app/templates/. Any unexpected error
    during rendering is logged and results in a generic 500 response to avoid
    leaking internal details.
    """
    try:
        return render_template("index.html")
    except Exception as exc:  # pragma: no cover - defensive fallback
        # Log the full exception with traceback but don't expose internals to clients.
        logger.exception("Failed to render index.html")
        # Use a generic HTTP 500 response rather than returning exception details.
        abort(500)

@main_bp.app_errorhandler(404)
def handle_404(error):
    """
    Generic 404 handler attached at blueprint level. Returns a minimal,
    safe response. If a custom template exists it will be used; otherwise
    return a simple message.
    """
    try:
        return render_template("404.html"), 404
    except Exception:
        # Template may not exist; fall back to a safe plaintext response.
        logger.debug("404 template missing; falling back to plaintext response")
        return "Not Found", 404

@main_bp.app_errorhandler(500)
def handle_500(error):
    """
    Generic 500 handler attached at blueprint level. Avoid exposing internal
    error details to clients.
    """
    # Log the error for server-side diagnostics (if not already logged).
    if not isinstance(error, Exception) or getattr(error, "code", None) != 500:
        logger.exception("Unhandled exception propagated to 500 handler")
    try:
        return render_template("500.html"), 500
    except Exception:
        logger.debug("500 template missing; falling back to plaintext response")
        return "Internal Server Error", 500

__all__ = ("main_bp",)