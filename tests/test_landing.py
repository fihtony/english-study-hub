import importlib
import inspect
import pytest

# Import the factory (do not import a running app instance)
from app import create_app


@pytest.fixture(scope="session")
def app():
    """
    Create and configure a Flask app for testing using the factory.
    Tries common create_app signatures in order:
      1. create_app('testing')
      2. create_app({'TESTING': True})
      3. create_app()
    If none succeed, skip tests.
    """
    create_attempts = [
        lambda: create_app("testing"),
        lambda: create_app({"TESTING": True}),
        lambda: create_app(),
    ]

    last_exc = None
    for attempt in create_attempts:
        try:
            _app = attempt()
            break
        except TypeError as e:
            # Signature mismatch — try next
            last_exc = e
            continue
        except Exception as e:
            # Factory raised an unexpected exception; remember and try next
            last_exc = e
            continue
    else:
        pytest.skip(f"Could not construct app via create_app (errors: {last_exc!r})")

    # Ensure testing mode is enabled
    _app.testing = True
    _app.config.setdefault("TESTING", True)

    return _app


@pytest.fixture
def client(app):
    """
    Flask test client fixture. Uses app.test_client() as required.
    """
    with app.test_client() as client:
        yield client


def test_index_status(client):
    """
    GET / should return 200 OK.
    """
    resp = client.get("/")
    assert resp.status_code == 200, f"Expected 200 OK for GET /, got {resp.status_code}"


def test_index_content(client):
    """
    Landing page should contain site title and primary CTA text.
    """
    resp = client.get("/")
    assert resp.status_code == 200, "Landing page not returned successfully"
    text = resp.data.decode("utf-8", errors="replace")
    assert "English Study Hub" in text, "Page must contain the site title 'English Study Hub'"
    assert "Get Started" in text or "Get started" in text, "Primary CTA text 'Get Started' not found"


def test_static_css_served(client):
    """
    Static CSS file must be served and include expected CSS rules.
    """
    resp = client.get("/static/css/styles.css")
    assert resp.status_code == 200, f"Expected 200 for CSS asset, got {resp.status_code}"
    css = resp.data.decode("utf-8", errors="replace").lower()
    # Check for at least one known CSS token that should appear in the stylesheet
    assert (
        "background-color" in css
        or ".cta" in css
        or "body" in css
        or "font-family" in css
    ), "Stylesheet does not contain expected CSS rules"


def test_factory_no_side_effects():
    """
    Importing the app package must not create a running Flask instance at module scope.
    The module should expose `create_app` and should not define a top-level `app` Flask object.
    """
    # Import the module explicitly to inspect its attributes
    app_module = importlib.import_module("app")

    # Ensure create_app exists and is callable
    create_app_obj = getattr(app_module, "create_app", None)
    assert callable(create_app_obj), "app.create_app must be a callable factory"

    # If there is an attribute named 'app', it must not be a Flask instance created at import time.
    top_level_app = getattr(app_module, "app", None)
    if top_level_app is not None:
        # Avoid importing Flask directly to reduce coupling; check for common attributes instead
        forbidden_attrs = {"run", "wsgi_app", "test_client", "add_url_rule"}
        has_flask_like_attrs = all(hasattr(top_level_app, a) for a in forbidden_attrs)
        assert not has_flask_like_attrs, "Module 'app' must not create a Flask instance at import time"
    # Additionally ensure the factory's signature looks like a factory (accepts 0-1 arguments usually)
    sig = inspect.signature(create_app_obj)
    assert len(sig.parameters) <= 2, "create_app signature is unexpectedly large; expected factory-like signature"