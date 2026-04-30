import pytest
from app import app


@pytest.fixture
def client():
    """Flask test client fixture for integration testing."""
    app.testing = True
    with app.test_client() as test_client:
        yield test_client


def test_index_returns_200(client):
    """Test that GET / returns HTTP 200 status code."""
    resp = client.get('/')
    assert resp.status_code == 200


def test_html_validity(client):
    """Test that response contains valid HTML structure."""
    resp = client.get('/')
    assert b'<!DOCTYPE html>' in resp.data or b'<!doctype html>' in resp.data, \
        "Response must contain valid HTML DOCTYPE"
    assert b'<html' in resp.data, "Response must contain html tag"
    assert b'<body' in resp.data, "Response must contain body tag"


def test_semantic_structure(client):
    """Test that page contains expected semantic HTML elements."""
    resp = client.get('/')
    assert b'<header' in resp.data, "Page must contain header element"
    assert b'<nav' in resp.data, "Page must contain nav element"
    assert b'<main' in resp.data, "Page must contain main element"
    assert b'<footer' in resp.data, "Page must contain footer element"


def test_tailwind_responsive_classes(client):
    """Test that page contains Tailwind responsive CSS classes."""
    resp = client.get('/')
    data = resp.data
    has_responsive = (
        b'sm:' in data or 
        b'md:' in data or 
        b'lg:' in data or 
        b'xl:' in data
    )
    assert has_responsive, "Page must contain Tailwind responsive classes"


def test_no_render_exceptions(client):
    """Test page renders without exceptions; validate CSS classes support different viewports."""
    resp = client.get('/')
    assert resp.status_code == 200
    assert len(resp.data) > 0
    
    data = resp.data.decode('utf-8', errors='ignore')
    
    responsive_patterns = [
        'sm:', 'md:', 'lg:', 'xl:',
        'w-full', 'max-w', 'px-',
        'flex', 'grid', 'container'
    ]
    
    has_responsive_support = any(pattern in data for pattern in responsive_patterns)
    assert has_responsive_support, \
        "Page must contain CSS classes supporting different viewport widths"


def test_response_content_type(client):
    """Test that response content type is HTML."""
    resp = client.get('/')
    assert resp.content_type is not None
    assert 'text/html' in resp.content_type


def test_response_contains_content(client):
    """Test that response contains substantial content."""
    resp = client.get('/')
    assert len(resp.data) > 100, "Page must contain meaningful content"


def test_landing_page_structure(client):
    """Test that landing page has expected structural elements."""
    resp = client.get('/')
    data = resp.data.decode('utf-8', errors='ignore')
    
    assert 'class=' in data, "Page must use CSS classes"
    assert 'html' in data.lower(), "Page must have proper HTML structure"
    assert len(data) > 0, "Page content must not be empty"


def test_multiple_requests_consistent(client):
    """Test that multiple requests to / return consistent responses."""
    resp1 = client.get('/')
    resp2 = client.get('/')
    
    assert resp1.status_code == 200
    assert resp2.status_code == 200
    assert resp1.data == resp2.data, "Landing page should return consistent content"