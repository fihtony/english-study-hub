import pytest

@pytest.fixture
def client():
    """
    Create a Flask test client from the factory create_app.
    The factory must be importable as `create_app` from the `app` package
    and must not perform side-effects on import.
    """
    from app import create_app

    app = create_app({'TESTING': True})
    app.testing = True
    with app.test_client() as test_client:
        yield test_client


def test_homepage_renders_and_contains_title_and_cta(client):
    """
    Integration test for the landing page.

    Verifies:
    - GET / returns 200
    - page contains the expected <title> and a primary Call To Action labeled "Get Started"
    """
    resp = client.get('/')
    assert resp.status_code == 200, f"Expected 200 OK for '/', got {resp.status_code}"

    text = resp.get_data(as_text=True)
    assert '<title>English Study Hub' in text, "Homepage title not found in response body"
    assert 'Get Started' in text, "CTA text 'Get Started' not found in homepage"


def test_static_css_served_and_is_css(client):
    """
    Ensure the CSS asset is served from /static/css/styles.css and looks like CSS.

    Verifies:
    - GET /static/css/styles.css returns 200
    - Content-Type contains 'text/css'
    - Response body contains at least one CSS token/selector (e.g., 'body {' or 'font-family')
    """
    css_resp = client.get('/static/css/styles.css')
    assert css_resp.status_code == 200, f"Expected 200 OK for CSS, got {css_resp.status_code}"

    content_type = css_resp.headers.get('Content-Type', '')
    assert 'text/css' in content_type, f"Expected 'text/css' in Content-Type, got '{content_type}'"

    css_text = css_resp.get_data(as_text=True)
    tokens = ['body {', 'font-family', ':root', '.container', 'background-color', 'color:']
    assert any(token in css_text for token in tokens), "CSS file does not contain expected CSS tokens/structure"