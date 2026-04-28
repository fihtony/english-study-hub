import re
import pytest
from app import create_app

# Instantiate the Flask app via factory and enable testing mode
app = create_app()
app.testing = True

@pytest.fixture
def client():
    """Provide a test client for the Flask application."""
    with app.test_client() as client:
        yield client

def test_get_root_returns_200(client):
    """GET / should return HTTP 200."""
    resp = client.get('/')
    assert resp.status_code == 200, f"Expected 200 OK, got {resp.status_code}"

def test_root_contains_site_title_and_hero(client):
    """
    The landing page should contain the site title 'English Study Hub'
    and a primary hero heading (<h1>).
    """
    resp = client.get('/')
    assert resp.status_code == 200, "Landing page did not return 200"

    html = resp.get_data(as_text=True)

    # Check for the exact site title required by the product
    assert 'English Study Hub' in html, "Site title 'English Study Hub' not found in response"

    # Find the first <h1> and ensure it contains meaningful hero text
    h1_match = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.IGNORECASE | re.DOTALL)
    assert h1_match, "No <h1> element (hero title) found in landing page"

    # Strip any nested tags and collapse whitespace for a deterministic check
    raw_hero = h1_match.group(1)
    hero_text = re.sub(r'<[^>]+>', '', raw_hero).strip()
    hero_text = re.sub(r'\s+', ' ', hero_text)

    assert len(hero_text) >= 5, f"Hero text appears too short or empty: '{hero_text}'"
    # Ensure hero text is not identical to the site title (they should be distinct)
    assert 'English Study Hub' not in hero_text or hero_text != 'English Study Hub'

def test_css_served(client):
    """
    Static CSS should be served from /static/css/style.css with content-type text/css
    and contain expected selectors or variables used by the template.
    """
    resp = client.get('/static/css/style.css')
    assert resp.status_code == 200, f"Expected 200 when fetching CSS, got {resp.status_code}"

    content_type = resp.headers.get('Content-Type', '')
    assert 'text/css' in content_type, f"CSS Content-Type should include 'text/css', got '{content_type}'"

    css_text = resp.get_data(as_text=True)

    # Look for at least one of the expected tokens to ensure the correct stylesheet is being served.
    expected_tokens = ('.hero', '.hero-title', ':root', '--brand-color', 'body {', 'font-family')
    assert any(tok in css_text for tok in expected_tokens), (
        "Served CSS doesn't contain expected selectors or variables. "
        "Expected one of: " + ", ".join(expected_tokens)
    )