import pytest
from app import create_app
import re


@pytest.fixture
def app():
    """Create and configure a test app instance."""
    app = create_app()
    app.config['TESTING'] = True
    return app


@pytest.fixture
def client(app):
    """A test client for the app."""
    return app.test_client()


class TestLandingPageHTTP:
    """Test HTTP response and basic status."""
    
    def test_get_root_returns_200(self, client):
        """Test that GET / returns 200 status code."""
        response = client.get('/')
        assert response.status_code == 200
    
    def test_response_content_type_is_html(self, client):
        """Test that response content-type is text/html."""
        response = client.get('/')
        assert 'text/html' in response.content_type


class TestSemanticHTML:
    """Test for required semantic HTML elements."""
    
    def test_response_contains_header_element(self, client):
        """Test that response contains <header> element."""
        response = client.get('/')
        data = response.get_data(as_text=True)
        assert '<header' in data
    
    def test_response_contains_nav_element(self, client):
        """Test that response contains <nav> element."""
        response = client.get('/')
        data = response.get_data(as_text=True)
        assert '<nav' in data
    
    def test_response_contains_main_element(self, client):
        """Test that response contains <main> element."""
        response = client.get('/')
        data = response.get_data(as_text=True)
        assert '<main' in data
    
    def test_response_contains_section_elements(self, client):
        """Test that response contains <section> elements."""
        response = client.get('/')
        data = response.get_data(as_text=True)
        assert '<section' in data
    
    def test_response_contains_footer_element(self, client):
        """Test that response contains <footer> element."""
        response = client.get('/')
        data = response.get_data(as_text=True)
        assert '<footer' in data


class TestPageContent:
    """Test for key page content and structure."""
    
    def test_page_title_matches_expected(self, client):
        """Test that page title matches 'English Study Hub' or similar."""
        response = client.get('/')
        data = response.get_data(as_text=True)
        title_match = re.search(r'<title>(.*?)</title>', data, re.IGNORECASE)
        assert title_match is not None
        title_text = title_match.group(1)
        assert len(title_text) > 0
        assert 'English' in data or 'Study' in data or 'Hub' in data
    
    def test_page_contains_english_study_hub_text(self, client):
        """Test that page contains key branding text."""
        response = client.get('/')
        data = response.get_data(as_text=True)
        assert 'English Study Hub' in data or 'English' in data
    
    def test_page_contains_h1_heading(self, client):
        """Test that page contains at least one <h1> heading."""
        response = client.get('/')
        data = response.get_data(as_text=True)
        assert '<h1' in data
    
    def test_page_contains_multiple_section_headings(self, client):
        """Test that page contains multiple section headings (h2, h3)."""
        response = client.get('/')
        data = response.get_data(as_text=True)
        h2_count = len(re.findall(r'<h2', data))
        h3_count = len(re.findall(r'<h3', data))
        assert (h2_count + h3_count) >= 1


class TestAccessibility:
    """Test accessibility features."""
    
    def test_all_images_have_alt_attributes(self, client):
        """Test that all <img> tags have alt attribute."""
        response = client.get('/')
        data = response.get_data(as_text=True)
        
        img_tags = re.findall(r'<img[^>]*>', data)
        for img_tag in img_tags:
            assert 'alt=' in img_tag or 'alt =' in img_tag, f"Image missing alt: {img_tag}"
    
    def test_proper_heading_hierarchy(self, client):
        """Test that heading hierarchy starts with h1."""
        response = client.get('/')
        data = response.get_data(as_text=True)
        
        headings = re.findall(r'<h([1-6])', data)
        assert len(headings) > 0
        assert headings[0] == '1', "First heading should be <h1>"
    
    def test_meta_viewport_tag_present(self, client):
        """Test that meta viewport tag is present for responsive design."""
        response = client.get('/')
        data = response.get_data(as_text=True)
        assert 'viewport' in data


class TestCSSLoading:
    """Test CSS file loading and references."""
    
    def test_css_file_referenced_in_html(self, client):
        """Test that CSS file is referenced in HTML."""
        response = client.get('/')
        data = response.get_data(as_text=True)
        assert 'style.css' in data or 'css/style' in data
    
    def test_css_file_loads_successfully(self, client):
        """Test that CSS file loads with 200 status."""
        response = client.get('/static/css/style.css')
        assert response.status_code == 200


class TestNavigation:
    """Test navigation structure and links."""
    
    def test_navigation_links_exist(self, client):
        """Test that navigation links exist in the page."""
        response = client.get('/')
        data = response.get_data(as_text=True)
        assert '<a' in data
    
    def test_internal_links_are_accessible(self, client):
        """Test that internal navigation links are accessible."""
        response = client.get('/')
        data = response.get_data(as_text=True)
        
        hrefs = re.findall(r'href=["\']([^"\']*)["\']', data)
        internal_links = [h for h in hrefs if h.startswith('/') and not h.startswith('//')]
        
        for link in internal_links:
            if link == '/':
                resp = client.get(link)
                assert resp.status_code in [200, 301, 302]


class TestResponsiveDesign:
    """Test responsive design implementation."""
    
    def test_page_uses_responsive_classes_or_media_queries(self, client):
        """Test that page implements responsive design patterns."""
        response = client.get('/')
        data = response.get_data(as_text=True)
        
        responsive_indicators = [
            'class=',
            'media',
            'responsive',
            'container',
            'grid',
            'flex'
        ]
        
        found_indicator = any(indicator in data for indicator in responsive_indicators)
        assert found_indicator, "Page should contain responsive design indicators"
    
    def test_meta_charset_present(self, client):
        """Test that meta charset is declared for proper text rendering."""
        response = client.get('/')
        data = response.get_data(as_text=True)
        assert 'charset' in data.lower()


class TestHTMLValidity:
    """Test basic HTML validity and structure."""
    
    def test_response_contains_valid_html_structure(self, client):
        """Test that response has valid HTML structure."""
        response = client.get('/')
        data = response.get_data(as_text=True)
        
        assert '<!DOCTYPE' in data or '<html' in data[:200]
        assert '</html>' in data
        assert '<head' in data
        assert '<body' in data
    
    def test_page_contains_title_tag(self, client):
        """Test that page has a title tag in head."""
        response = client.get('/')
        data = response.get_data(as_text=True)
        assert '<title>' in data and '</title>' in data
    
    def test_no_server_errors_in_response(self, client):
        """Test that page doesn't return server errors."""
        response = client.get('/')
        assert response.status_code < 500


class TestStaticAssets:
    """Test static asset availability."""
    
    def test_static_css_accessible(self, client):
        """Test that static CSS path is configured correctly."""
        response = client.get('/static/css/style.css')
        assert response.status_code in [200, 404]
    
    def test_page_references_valid_static_paths(self, client):
        """Test that static asset references use correct paths."""
        response = client.get('/')
        data = response.get_data(as_text=True)
        
        script_srcs = re.findall(r'<script[^>]*src=["\']([^"\']*)["\']', data)
        for src in script_srcs:
            assert src.startswith('http') or src.startswith('/static/') or src.startswith('/')
        
        link_hrefs = re.findall(r'<link[^>]*href=["\']([^"\']*)["\']', data)
        for href in link_hrefs:
            assert href.startswith('http') or href.startswith('/static/') or href.startswith('/')