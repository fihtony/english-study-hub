from flask import Blueprint, render_template, current_app, abort, make_response
from jinja2 import TemplateNotFound

main_bp = Blueprint('main', __name__)


@main_bp.route('/', methods=['GET'])
def index():
    """
    Render the landing page.

    Returns a Response with security headers applied. If the template is missing
    or rendering fails, logs the error and returns a 500 response.
    """
    try:
        html = render_template('index.html')
        resp = make_response(html)
        # Basic security headers (OWASP recommendations)
        resp.headers['X-Content-Type-Options'] = 'nosniff'
        resp.headers['X-Frame-Options'] = 'SAMEORIGIN'
        resp.headers['Referrer-Policy'] = 'no-referrer-when-downgrade'
        # CSP: restrict sources to self; allow inline styles for simplicity (adjust as needed)
        resp.headers['Content-Security-Policy'] = (
            "default-src 'self'; "
            "style-src 'self' 'unsafe-inline'; "
            "script-src 'self'; "
            "img-src 'self' data:; "
            "font-src 'self';"
        )
        return resp
    except TemplateNotFound as exc:
        current_app.logger.error("index.html template not found: %s", exc)
        abort(500, description="Template missing")
    except Exception as exc:
        current_app.logger.exception("Unexpected error rendering index: %s", exc)
        abort(500, description="Internal server error")