from app import app
import re
import pytest

app.testing = True

@pytest.fixture
def client():
    return app.test_client()

def test_index_status_code(client):
    """GET / should return HTTP 200"""
    resp = client.get("/")
    assert resp.status_code == 200, f"Expected 200 OK, got {resp.status_code}"

def test_index_contains_title(client):
    """Page should contain the site title 'English Study Hub' (case-insensitive)"""
    resp = client.get("/")
    text = resp.get_data(as_text=True)
    assert "english study hub" in text.lower(), "Page does not contain 'English Study Hub'"

def test_index_has_cta(client):
    """
    Page should include a primary CTA labeled 'Get Started' with an href.
    This searches for an <a ...>Get Started</a> anchor and verifies its href attribute.
    """
    resp = client.get("/")
    text = resp.get_data(as_text=True)
    # Search for an anchor tag that contains the exact text "Get Started" (allow surrounding whitespace)
    match = re.search(r'<a[^>]*href=[\'"]([^\'"]+)[\'"][^>]*>\s*Get Started\s*</a>', text, re.IGNORECASE)
    assert match is not None, "CTA anchor with text 'Get Started' and an href was not found"
    href = match.group(1).strip()
    assert href, "CTA anchor href is empty"