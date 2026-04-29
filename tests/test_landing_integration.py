from app import create_app

# Create app with testing config as required by the acceptance criteria
app = create_app({"TESTING": True})
app.testing = True
client = app.test_client()


def test_landing_integration_contains_expected_text_and_css_link():
    """
    Integration test for GET /:
    - returns 200
    - content-type includes text/html
    - contains key landing page text nodes
    - contains link to the stylesheet at /static/css/styles.css
    - contains an accessible main landmark (role="main" or <main> element)
    """
    res = client.get("/")

    # Basic response checks
    assert res.status_code == 200, f"Expected 200 OK, got {res.status_code}"
    assert "text/html" in res.content_type, f"Expected HTML content-type, got {res.content_type}"

    # Content assertions (bytes)
    assert b"English Study Hub" in res.data, "Page must include the site title 'English Study Hub'"
    assert b"Welcome to English Study Hub" in res.data, "Page must include the primary welcome headline"
    assert b"/static/css/styles.css" in res.data, "Page must reference the stylesheet at /static/css/styles.css"

    # Accessibility landmark - accept either explicit role or main element
    has_main_role = b'<main role="main"' in res.data or b'role="main"' in res.data
    has_main_tag = b"<main" in res.data
    assert has_main_role or has_main_tag, "Page should include a <main> element or a role=\"main\" landmark"