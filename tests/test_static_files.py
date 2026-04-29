import re
from app import create_app


def test_static_css_served_and_contains_tokens():
    app = create_app({'TESTING': True})
    client = app.test_client()

    res = client.get('/static/css/styles.css')
    assert res.status_code == 200, f"Expected 200 for /static/css/styles.css, got {res.status_code}"

    content_type = res.headers.get('Content-Type', '')
    assert 'text/css' in content_type or content_type.startswith('text/'), f"Unexpected Content-Type: {content_type}"

    css_text = res.get_data(as_text=True)
    # Primary color token and value (hex) expected from design tokens
    assert re.search(r'--color-primary\s*:\s*#2f80ed', css_text, re.IGNORECASE), (
        "Expected primary color token '--color-primary: #2F80ED' not found in styles.css"
    )
    # Typography token name presence
    assert re.search(r'--font-family-sans\s*:', css_text), "Expected typography token '--font-family-sans' not found in styles.css"