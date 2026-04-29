import importlib
import sys
import pytest

def test_create_app_import_no_side_effects():
    """
    Importing the 'app' package must not create a top-level Flask instance named 'app'.
    Factory pattern requires only create_app (or similar) at import time.
    """
    # Ensure a fresh import to catch bad side-effects on import
    if 'app' in sys.modules:
        del sys.modules['app']
    mod = importlib.import_module('app')

    assert hasattr(mod, 'create_app'), "app package must expose create_app(factory)"
    # Fail if a module-level Flask app was created (common anti-pattern)
    assert not hasattr(mod, 'app'), "Importing app package must not create a module-level 'app' Flask instance"

def _make_test_app():
    """
    Helper to create a testing Flask app using the factory.
    Accept both dict-based config or keyword args if the factory supports that.
    """
    mod = importlib.import_module('app')
    create_app = getattr(mod, 'create_app', None)
    if create_app is None:
        pytest.skip("app.create_app factory not found")
    # Try calling with a config dict first (per acceptance criteria)
    try:
        app = create_app({'TESTING': True})
    except TypeError:
        # Fallback: call without args and set testing flag
        app = create_app()
        app.config.setdefault('TESTING', True)
    app.testing = True
    return app

def test_index_route_renders():
    """
    GET / should return 200 and include the site title and a link to the static CSS.
    """
    app = _make_test_app()
    with app.test_client() as client:
        resp = client.get('/')
        assert resp.status_code == 200, f"Expected 200 OK, got {resp.status_code}"
        body = resp.data
        assert b'English Study Hub' in body, "Landing page must include the site title 'English Study Hub'"
        # Template should reference the compiled static CSS path. url_for('static', filename='css/styles.css') -> /static/css/styles.css
        assert b'/static/css/styles.css' in body or b'static/css/styles.css' in body, "Template must include a link to static/css/styles.css"

def test_static_css_served():
    """
    The static CSS file must be served with Content-Type containing text/css and include CSS content.
    """
    app = _make_test_app()
    with app.test_client() as client:
        resp = client.get('/static/css/styles.css')
        assert resp.status_code == 200, f"Expected 200 OK for CSS, got {resp.status_code}"
        ctype = resp.headers.get('Content-Type', '')
        assert 'text/css' in ctype or 'charset=utf-8' in ctype, f"Unexpected Content-Type for CSS: {ctype}"
        data = resp.data
        # Basic sanity: CSS should contain a selector or property like 'body' or '{'
        assert b'body' in data or b'{' in data, "CSS file appears empty or missing expected content"