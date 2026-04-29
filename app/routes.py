from flask import Blueprint, render_template, url_for, current_app, make_response, abort
from jinja2 import TemplateNotFound
import logging

bp = Blueprint("main", __name__)

__all__ = ["bp"]


@bp.route("/", methods=["GET"])
def index():
    """
    Landing page route.

    Renders 'index.html'. The template may call url_for('static', filename='css/styles.css')
    itself; for convenience the canonical CSS URL is passed in as `css_url`. The response
    is returned with a set of conservative security headers.
    """
    try:
        css_url = url_for("static", filename="css/styles.css")
        html = render_template("index.html", css_url=css_url)

        resp = make_response(html)
        # Security headers (conservative defaults)
        resp.headers.setdefault("X-Content-Type-Options", "nosniff")
        resp.headers.setdefault("X-Frame-Options", "DENY")
        resp.headers.setdefault("Referrer-Policy", "no-referrer-when-downgrade")
        # CSP: allow only same-origin resources; allow inline styles for simple static CSS usage
        resp.headers.setdefault("Content-Security-Policy", "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self';")
        return resp

    except TemplateNotFound:
        # Log with stack info for diagnostics, but do not expose internals to the client.
        current_app.logger.exception("Template 'index.html' not found for route '/'")
        abort(500, description="Internal Server Error")

    except Exception:
        current_app.logger.exception("Unexpected error while rendering the landing page")
        abort(500, description="Internal Server Error")