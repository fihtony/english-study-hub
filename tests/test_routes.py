import pytest
from app import create_app

def _get_client(config: dict | None = None):
    """
    Helper to create a Flask test client from the factory.
    Ensures app.testing is True so exception propagation and testing behavior are correct.
    """
    cfg = config if config is not None else {}
    app = create_app(cfg)
    app.testing = True
    return app.test_client()

def test_index_route_returns_html_and_contains_heading_and_cta():
    """
    Acceptance:
    - GET / returns 200
    - Content-Type is HTML
    - Body contains "English Study Hub" and primary CTA "Get Started"
    """
    client = _get_client()
    resp = client.get('/')
    assert resp.status_code == 200, "GET / did not return 200 OK"
    # content_type may include charset, so check startswith
    assert resp.content_type.startswith("text/html"), f"Unexpected Content-Type: {resp.content_type}"
    assert b"English Study Hub" in resp.data, "Landing page missing main heading 'English Study Hub'"
    assert b"Get Started" in resp.data, "Landing page missing primary CTA 'Get Started'"

@pytest.mark.parametrize("debug_value", [True, False])
def test_index_route_ok_in_debug_and_production_modes(debug_value):
    """
    Ensure behavior is consistent when the factory is configured with DEBUG True/False.
    Uses create_app({'DEBUG': ...}) per project conventions.
    """
    client = _get_client({"DEBUG": debug_value})
    resp = client.get('/')
    assert resp.status_code == 200, f"GET / returned {resp.status_code} with DEBUG={debug_value}"