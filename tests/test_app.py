import pytest
from app import create_app


def test_create_app_returns_flask_instance():
    app = create_app('testing')
    assert app is not None
    assert app.__class__.__name__ == 'Flask'


@pytest.fixture
def client():
    app = create_app('testing')
    app.testing = True
    with app.test_client() as client:
        yield client


def test_index_gets_200(client):
    rv = client.get('/')
    assert rv.status_code == 200


def test_index_contains_title_and_h1(client):
    rv = client.get('/')
    html = rv.get_data(as_text=True)
    assert 'English Study Hub' in html
    assert '<h1' in html.lower()


def test_stylesheet_loaded(client):
    rv = client.get('/')
    html = rv.get_data(as_text=True)
    assert '/static/css/styles.css' in html