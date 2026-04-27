from flask import Flask
from app import create_app


def test_create_app_importable():
    """
    Ensure create_app is importable and is a callable factory function.
    This confirms importing the package does not execute the server.
    """
    assert callable(create_app), "create_app should be a callable factory function"


def test_create_app_returns_flask():
    """
    The factory should return a Flask application instance when called with no args.
    """
    app_instance = create_app()
    assert isinstance(app_instance, Flask), "create_app() must return a flask.Flask instance"


def test_create_app_config_override():
    """
    Passing a config dict to create_app should override the application's config.
    """
    config_override = {"TESTING": True}
    app_instance = create_app(config_override)
    assert app_instance.config.get("TESTING") is True, "create_app should accept a config dict and apply overrides"