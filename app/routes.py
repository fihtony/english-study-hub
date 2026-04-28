from flask import Blueprint, render_template

bp = Blueprint("main", __name__)


@bp.route("/")
def index():
    # Render the landing page template. Template references the static files at
    # /static/css/styles.css and /static/assets/logo-placeholder.svg as required
    # by tests.
    return render_template("index.html")
