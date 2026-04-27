import pytest
from app import create_app

@pytest.fixture
def app():
    # Create the Flask app with testing config enabled
    app = create_app({'TESTING': True})
    app.testing = True
    return app

@pytest.fixture
def client(app):
    return app.test_client()

def test_get_root_contains_heading_and_paragraph(client):
    resp = client.get('/')
    assert resp.status_code == 200, f"Expected 200 OK from '/', got {resp.status_code}"
    text = resp.get_data(as_text=True)
    assert 'English Study Hub' in text, "Landing page must contain heading 'English Study Hub'"
    assert 'Landing Page (Bare-bones)' in text, "Landing page must contain paragraph 'Landing Page (Bare-bones)'"
    # assert link to CSS is present (relative path)
    assert 'css/styles.css' in text or '/static/css/styles.css' in text, "HTML should reference the CSS asset"

def test_static_css_served(client):
    css_resp = client.get('/static/css/styles.css')
    assert css_resp.status_code == 200, f"Expected 200 OK for static CSS, got {css_resp.status_code}"
    css_text = css_resp.get_data(as_text=True)
    # basic sanity checks for CSS content
    assert 'body' in css_text.lower(), "CSS content should include a 'body' selector"
    assert 'text/css' in (css_resp.content_type or ''), "Content-Type for CSS should be text/css"