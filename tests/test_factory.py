import os
from app import create_app
from flask import Flask

def test_create_app_returns_flask_and_respects_config():
    # Provide a minimal config dict to ensure create_app is import-safe and respects overrides
    config = {'TESTING': True}
    app = create_app(config)
    assert isinstance(app, Flask)
    # Ensure config was applied and app is in testing mode
    assert app.config.get('TESTING') is True