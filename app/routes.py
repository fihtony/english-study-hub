"""Main application routes (Blueprint).

This module defines a Flask Blueprint named 'main' and a single route for the
landing page. Importing this module has no side-effects other than creating
the Blueprint object; registering the blueprint must be done by the application
factory (app.create_app).
"""

from typing import Any

from flask import Blueprint, render_template, current_app, abort

# Expose the blueprint under the name expected by the application factory/tests
main = Blueprint("main", __name__)

__all__ = ["main"]


@main.route("/", methods=["GET"])
def index() -> Any:
    """
    Render the landing page.

    Returns:
        A rendered HTML template for the landing page.

    Error handling:
        Logs unhandled exceptions and returns HTTP 500 without exposing
        internal details to the client.
    """
    try:
        return render_template("index.html")
    except Exception as exc:  # pragma: no cover - defensive logging path
        # Use the application's logger to capture context; avoid leaking details.
        try:
            current_app.logger.exception("Error rendering index.html: %s", exc)
        except Exception:
            # If logging fails for some reason, silently pass to avoid masking the original error.
            pass
        abort(500)
