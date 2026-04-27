from flask import Blueprint, render_template, current_app
from jinja2 import TemplateNotFound

bp = Blueprint('main', __name__)

@bp.route('/', methods=('GET',))
def index():
    """
    Render the landing page.
    Minimal, side-effect free handler that returns index.html.
    If the template is missing, log and return a safe fallback HTML with 500 status.
    """
    try:
        return render_template('index.html')
    except TemplateNotFound:
        # Template not found — log for diagnostics and return a safe, minimal fallback
        current_app.logger.exception("Template 'index.html' not found when handling '/' route")
        fallback_html = (
            "<!doctype html>"
            "<html lang='en'>"
            "<head>"
            "<meta charset='utf-8'>"
            "<meta name='viewport' content='width=device-width,initial-scale=1'>"
            "<title>English Study Hub</title>"
            "</head>"
            "<body>"
            "<main style='font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:48rem;margin:3rem auto;text-align:center;'>"
            "<h1>English Study Hub</h1>"
            "<p>Welcome — the site is temporarily unavailable. Please check back later.</p>"
            "</main>"
            "</body>"
            "</html>"
        )
        return fallback_html, 500

__all__ = ['bp']