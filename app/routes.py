from typing import Optional

from flask import Flask, render_template, make_response


def get_site_title() -> str:
    """
    Return the canonical site title used across templates and tests.

    Kept as a function to make business-logic testable and injectable.
    """
    return "English Study Hub"


def register_routes(app: Flask) -> None:
    """
    Register minimal routes on the provided Flask application.

    - idempotent: calling multiple times will not re-register existing endpoints.
    - provides a simple index route that renders 'index.html' with a title.
    """
    if not isinstance(app, Flask):
        raise TypeError("register_routes expects a Flask app instance")

    # Avoid double-registration when tests or factory call register_routes repeatedly.
    if "index" in app.view_functions:
        app.logger.debug("Route 'index' already registered; skipping.")
        return

    def index():
        """
        Landing page route. Template-level rendering errors are handled
        and translated to a generic 500 response to avoid leaking internals.
        """
        title = get_site_title()
        try:
            return render_template("index.html", title=title)
        except Exception as exc:  # broad catch to ensure app remains robust
            app.logger.exception("Failed to render index.html: %s", exc)
            return make_response("Internal Server Error", 500)

    # Register the route with a stable endpoint name used by tests.
    app.add_url_rule("/", endpoint="index", view_func=index, methods=["GET"])