import re
import pytest
from app import app

@pytest.fixture
def client():
    """
    Provide a Flask test client with testing mode enabled.
    Tests must not start a real server; use the test client instead.
    """
    app.testing = True
    with app.test_client() as client:
        yield client

def test_landing_status_and_content(client):
    """
    GET / should return 200 and include the visible site title 'English Study Hub'.
    """
    resp = client.get('/')
    assert resp.status_code == 200, f"Expected 200 OK, got {resp.status_code}"
    html = resp.get_data(as_text=True)
    assert 'English Study Hub' in html, "Landing page must contain the exact phrase 'English Study Hub'"

def test_css_link_present(client):
    """
    Landing page should reference at least one CSS file via a <link rel='stylesheet'> tag
    and include a .css file reference in the HTML.
    """
    resp = client.get('/')
    assert resp.status_code == 200, f"Expected 200 OK, got {resp.status_code}"
    html = resp.get_data(as_text=True)

    # Look for a <link ... rel="stylesheet" ...> tag (case-insensitive)
    link_rel_pattern = re.compile(r'<link\b[^>]*\brel\s*=\s*["\']stylesheet["\'][^>]*>', re.IGNORECASE)
    assert link_rel_pattern.search(html), "No <link rel='stylesheet'> tag found in landing page HTML"

    # Ensure there's a reference to a .css resource
    assert '.css' in html.lower(), "Landing page HTML does not reference any .css files"