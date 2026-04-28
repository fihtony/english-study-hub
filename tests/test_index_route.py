import pytest
from typing import Any
from flask import Flask

# Import the factory. Accept both call signatures: create_app(TESTING=True) or create_app(config_dict)
try:
    from app import create_app  # type: ignore
except Exception as e:
    raise ImportError("Could not import create_app from app package") from e


def _make_app() -> Flask:
    """
    Create the Flask app for testing.

    Try calling create_app(TESTING=True) as requested by the acceptance criteria.
    Fall back to passing a config dict if the factory expects a single config arg.
    """
    try:
        app = create_app(TESTING=True)  # primary form required by task
    except TypeError:
        # Some factories accept a config dict instead
        app = create_app({"TESTING": True})
    if not isinstance(app, Flask):
        raise RuntimeError("create_app did not return a Flask instance")
    # Ensure testing mode
    app.testing = True
    return app


def test_index_route_renders_landing_page():
    app = _make_app()
    client = app.test_client()

    resp = client.get("/")
    body = resp.get_data(as_text=True)

    # Status and content type
    assert resp.status_code == 200, f"Expected 200 OK, got {resp.status_code}"
    assert "text/html" in (resp.content_type or ""), "Response is not HTML"

    # Title check (required)
    assert "<title>English Study Hub</title>" in body, "Missing expected <title> text"

    # Main heading or identifiable element: either an <h1> with the text,
    # or presence of id="hero" or class="brand-title".
    has_h1_with_text = "<h1" in body and "English Study Hub" in body
    has_hero_id = 'id="hero"' in body or "id='hero'" in body
    has_brand_class = 'class="brand-title"' in body or "class='brand-title'" in body

    assert (
        has_h1_with_text or has_hero_id or has_brand_class
    ), "Landing page missing main heading (h1) or hero id/class for 'English Study Hub'"

    # Basic sanity: body should not be empty and should contain a reference to the main stylesheet
    assert body.strip() != "", "Response body is empty"
    assert "/static/css/styles.css" in body, "Expected reference to /static/css/styles.css not found"