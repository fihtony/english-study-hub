import pytest
from app import app

@pytest.fixture
def client():
    """
    Provides a Flask test client with testing mode enabled.
    """
    app.testing = True
    with app.test_client() as client:
        yield client

def test_landing_status_and_content(client):
    """
    GET / should return 200 and include the visible site title.
    """
    resp = client.get('/')
    assert resp.status_code == 200, f"Expected 200 OK, got {resp.status_code}"
    html = resp.get_data(as_text=True)
    assert 'English Study Hub' in html, "Landing page must contain 'English Study Hub'"

def test_css_link_present(client):
    """
    Landing page should reference at least one CSS file via a <link rel='stylesheet'> tag.
    """
    resp = client.get('/')
    assert resp.status_code == 200
    html = resp.get_data(as_text=True).lower()
    assert '<link' in html, "No <link> tags found in landing page"
    assert 'stylesheet' in html, "No stylesheet link found in landing page"
    assert '.css' in html, "No CSS file reference found in landing page"