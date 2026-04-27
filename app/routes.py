from typing import Any
from flask import Blueprint, render_template, current_app, make_response
from jinja2 import TemplateNotFound
from werkzeug.exceptions import InternalServerError

main_bp = Blueprint('main', __name__, template_folder='templates')


@main_bp.route('/', methods=['GET'])
def index() -> Any:
    """
    Landing page route (GET only).

    Renders app/templates/index.html. If the template is missing, return a
    safe 500 response and log the issue without exposing internals to users.
    """
    try:
        return render_template('index.html')
    except TemplateNotFound as exc:
        # Log at server side; do not leak template paths or stack traces to clients.
        current_app.logger.error("Template 'index.html' not found: %s", exc)
        body = (
            "<!doctype html>"
            "<html lang='en'>"
            "<head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'>"
            "<title>500 - Server Error</title></head>"
            "<body style='font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;margin:3rem;'>"
            "<h1>Server error</h1>"
            "<p>Required page is currently unavailable. Please try again later.</p>"
            "</body></html>"
        )
        return make_response(body, 500)
    except Exception:
        # Log full exception for diagnostics and re-raise a generic 500 to be handled by Flask.
        current_app.logger.exception("Unhandled exception while rendering index")
        raise InternalServerError()