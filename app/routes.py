from typing import Any

from flask import Blueprint, Flask, abort, current_app, render_template
from jinja2 import TemplateNotFound

bp = Blueprint("main", __name__)


@bp.route("/", methods=["GET"])
def index() -> Any:
    """
    Landing page handler.

    Renders the landing page template with minimal context used by tests and pages.
    Catches template-related and unexpected errors and returns a safe 500 response.
    """
    try:
        return render_template(
            "index.html",
            site_title="English Study Hub",
            headline="Welcome to English Study Hub",
        )
    except TemplateNotFound:
        # Template missing — log and fail safely so tests / monitoring can surface the issue.
        current_app.logger.exception("Template 'index.html' not found for main.index")
        abort(500, description="Internal Server Error")
    except Exception:
        # Unexpected error — log details and fail safely.
        current_app.logger.exception("Unexpected error while rendering landing page")
        abort(500, description="Internal Server Error")


def register_blueprints(app: Flask) -> None:
    """
    Register this module's blueprints on the given Flask app.

    This keeps blueprint registration explicit and testable from the application factory.
    """
    app.register_blueprint(bp)


__all__ = ["bp", "register_blueprints"]