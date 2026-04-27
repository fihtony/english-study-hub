import pytest

def test_static_css_served():
    """
    Verify the application's static CSS is served from /static/css/styles.css.

    Requirements:
    - GET /static/css/styles.css returns 200
    - Content-Type contains 'text/css'
    - Response body either starts with a CSS rule or contains a known selector or accent color
    """
    # Import app object per project testing convention
    from run import app  # run.py must expose `app` (Flask instance)
    app.testing = True
    client = app.test_client()

    resp = client.get("/static/css/styles.css")
    assert resp.status_code == 200, f"Expected 200 OK, got {resp.status_code}"
    assert "text/css" in resp.content_type, f"Expected 'text/css' in Content-Type, got {resp.content_type}"

    content = resp.get_data(as_text=True)
    assert content is not None and content.strip() != "", "Static CSS is empty"

    # Accept if the CSS file either begins with a rule or contains a common selector or an expected accent color
    starts_with_rule = content.lstrip().startswith("body") or content.lstrip().startswith("/*") or content.lstrip().startswith("@charset")
    contains_expected = ("body" in content) or ("#1a73e8" in content) or ("background" in content) or ("color" in content)
    assert starts_with_rule or contains_expected, "CSS content does not contain expected rules or accent color '#1a73e8'"