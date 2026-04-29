from bs4 import BeautifulSoup
import pytest
from app import create_app

@pytest.fixture(scope="module")
def client():
    """
    Provides a Flask test client for the application.
    """
    app = create_app()
    app.testing = True
    with app.test_client() as c:
        yield c

def _normalize_text(elem):
    """Return normalized text for comparison (strip and collapse whitespace)."""
    if not elem:
        return ""
    return " ".join(elem.get_text(separator=" ", strip=True).split())

def _find_cta(soup):
    """
    Find a primary CTA element. Preference order:
    1. id="cta-get-started"
    2. class contains "cta-primary"
    3. element with exact text "Get Started" (case-insensitive)
    4. role="button" or role="link" containing CTA text
    """
    # 1: id
    el = soup.find(id="cta-get-started")
    if el:
        return el
    # 2: class contains 'cta-primary'
    el = soup.find(class_=lambda v: v and "cta-primary" in v.split())
    if el:
        return el
    # 3: text match (case-insensitive)
    match = soup.find(lambda tag: tag.string and "get started" in tag.string.lower())
    if match:
        return match
    # 4: role attribute heuristic
    el = soup.find(attrs={"role": lambda v: v and v.lower() in ("button", "link")})
    return el

def test_ui_structure(client):
    """
    Integration-style test: requests the root page, parses HTML, and asserts
    the presence of main structural elements and basic accessibility attributes.
    """
    resp = client.get("/")
    assert resp.status_code == 200, f"Expected 200 OK from '/', got {resp.status_code}"
    html = resp.get_data(as_text=True)
    assert html and html.strip(), "Empty response body"

    soup = BeautifulSoup(html, "html.parser")

    # Header and main title
    header = soup.find("header")
    assert header is not None, "Missing <header> element"

    h1 = soup.find("h1")
    assert h1 is not None, "Missing <h1> element"
    h1_text = _normalize_text(h1)
    assert "english" in h1_text.lower(), f"<h1> text should mention 'English'; found: '{h1_text}'"

    # Primary CTA
    cta = _find_cta(soup)
    assert cta is not None, "Primary CTA ('Get Started') not found by id/class/text/role heuristics"
    cta_text = _normalize_text(cta)
    assert "get started" in cta_text.lower(), f"CTA text should include 'Get Started'; found: '{cta_text}'"

    # CTA semantics: ensure it is focusable/actionable (<a> with href or <button>)
    tag_name = cta.name.lower() if getattr(cta, "name", None) else ""
    if tag_name == "a":
        href = cta.get("href", "")
        assert href and not href.strip().startswith("javascript:"), "CTA <a> must have a valid href"
    elif tag_name == "button":
        # ok
        pass
    else:
        # If not a semantics-bearing tag, ensure it has a role that is acceptable
        role = cta.get("role")
        assert role and role.lower() in ("button", "link"), f"CTA must be a link/button or have role='button'/'link'; found role='{role}'"

    # Accessibility checks: aria-label or descriptive text
    if not cta.get("aria-label"):
        # ensure the CTA has readable text content if no aria-label
        assert cta_text.strip(), "CTA has no aria-label and no readable text"

    # Meta viewport for responsive design
    meta_view = soup.find("meta", attrs={"name": "viewport"})
    assert meta_view is not None, "Missing <meta name='viewport'> for responsive layout"

    # Basic landmark roles: main element or role="main"
    main_el = soup.find("main") or soup.find(attrs={"role": "main"})
    assert main_el is not None, "Missing <main> element or role='main' landmark"

def test_ui_additional_accessibility(client):
    """
    Additional accessibility and structure assertions:
    - Images must have alt text
    - Links must not be empty
    """
    resp = client.get("/")
    assert resp.status_code == 200
    soup = BeautifulSoup(resp.get_data(as_text=True), "html.parser")

    # Images: all <img> elements should have non-empty alt attributes
    imgs = soup.find_all("img")
    for img in imgs:
        alt = img.get("alt")
        assert alt is not None and alt.strip() != "", f"Image {str(img)[:60]} is missing meaningful alt text"

    # Ensure there is at least one meaningful navigation (nav with links)
    nav = soup.find("nav")
    if nav:
        links = [a for a in nav.find_all("a") if a.get("href")]
        assert links, "Found <nav> but it contains no links with hrefs"

def test_site_title_helper_and_metadata(client):
    """
    Ensures the page includes a <title> and that it matches a small heuristic used by business logic.
    Also checks charset meta present.
    """
    resp = client.get("/")
    assert resp.status_code == 200
    soup = BeautifulSoup(resp.get_data(as_text=True), "html.parser")

    title = soup.find("title")
    assert title is not None and title.string and title.string.strip(), "Page <title> is missing or empty"

    title_text = title.string.strip()
    # Heuristic: title should reference the site name
    assert "english" in title_text.lower() or "study" in title_text.lower(), f"Page title should mention the site; found '{title_text}'"

    # Charset meta should be present
    meta_charset = soup.find("meta", attrs={"charset": True})
    if not meta_charset:
        # HTML5 alternative: <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        meta_ct = soup.find("meta", attrs={"http-equiv": lambda v: v and v.lower() == "content-type"})
        assert meta_ct is not None, "Missing charset declaration (meta charset or meta http-equiv content-type)"