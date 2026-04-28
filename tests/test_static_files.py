import pytest

def _get_app():
    """
    Obtain the Flask app instance.

    Tries importing a top-level `app` (commonly from run.py). If not found,
    falls back to creating one via app.create_app(). Ensures TESTING=True.
    """
    try:
        # Prefer top-level run.app if available
        from run import app as _app  # type: ignore
    except Exception:
        try:
            from app import create_app
        except Exception as e:
            raise ImportError(
                "Unable to import Flask app. Expected `run.app` or `app.create_app()` to be available."
            ) from e
        _app = create_app()
    _app.testing = True
    return _app

def test_styles_css_served_and_contains_brand_color():
    app = _get_app()
    with app.test_client() as client:
        res = client.get("/static/css/styles.css")
        assert res.status_code == 200, "Expected styles.css to be served with 200 OK"
        content_type = res.headers.get("Content-Type", "")
        assert "text/css" in content_type, f"Expected Content-Type to include 'text/css', got '{content_type}'"
        text = res.get_data(as_text=True)
        assert "#1A73E8" in text, "Expected brand hex '#1A73E8' to be present in styles.css"

def test_logo_svg_served_with_correct_content_type():
    app = _get_app()
    with app.test_client() as client:
        res = client.get("/static/assets/logo-placeholder.svg")
        assert res.status_code == 200, "Expected logo-placeholder.svg to be served with 200 OK"
        content_type = res.headers.get("Content-Type", "")
        # Some servers append charset; check membership
        assert "image/svg+xml" in content_type, f"Expected Content-Type to include 'image/svg+xml', got '{content_type}'"
        data = res.get_data(as_text=True)
        # Basic sanity of SVG content
        assert data.strip().startswith("<svg") or "<svg" in data, "Returned asset does not appear to be SVG content"

@pytest.mark.parametrize("path", [
    "/static/assets/non-existent-file-should-404.png",
    "/static/css/non-existent-styles-should-404.css"
])
def test_missing_static_asset_returns_404(path):
    app = _get_app()
    with app.test_client() as client:
        res = client.get(path)
        assert res.status_code == 404, f"Expected missing asset '{path}' to return 404, got {res.status_code}"