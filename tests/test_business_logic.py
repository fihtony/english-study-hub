from app.routes import get_site_title


def test_get_site_title():
    assert get_site_title() == "English Study Hub"