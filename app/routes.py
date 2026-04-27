from flask import Blueprint, render_template, current_app, abort
from jinja2 import TemplateNotFound

main = Blueprint('main', __name__)

@main.route('/', methods=['GET'])
def index():
    """
    Render the landing page for English Study Hub.

    Returns:
        A rendered HTML template 'index.html'.

    Errors:
        If the template is missing or rendering fails, log the exception and return HTTP 500.
    """
    try:
        return render_template('index.html')
    except TemplateNotFound:
        current_app.logger.exception("Template 'index.html' not found for route '/'")
        abort(500)
    except Exception:
        current_app.logger.exception("Unexpected error rendering 'index.html' for route '/'")
        abort(500)