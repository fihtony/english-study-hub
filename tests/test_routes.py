from app import create_app
import pytest

# Create the Flask test app and client once for the test module
app = create_app()
app.testing = True
client = app.test_client()

def test_root_status_and_content():
    """
    Ensure the root route (/) returns HTTP 200 and contains the
    site title and primary CTA text expected by the landing page.
    """
    resp = client.get('/')
    assert resp.status_code == 200, f"Expected 200 OK, got {resp.status_code}"
    body = resp.get_data(as_text=True)
    assert 'English Study Hub' in body, "Landing page should include site title 'English Study Hub'"
    assert 'Get Started' in body, "Landing page should include primary CTA text 'Get Started'"