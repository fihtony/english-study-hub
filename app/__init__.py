import os
from typing import Optional
from flask import Flask

__all__ = ["create_app"]


def create_app(config: dict | None = None) -> Flask:
    """
    Application factory for the Flask app.

    - Uses a template_folder path relative to this package directory so templates
      resolve regardless of the current working directory.
    - If `config` is provided it will be applied via app.config.update(config).
    - Provides a sensible, non-secret default SECRET_KEY for development.
    - Registers the `main_bp` blueprint from app.routes.

    This module intentionally performs no side-effects at import time (no app.run,
    no network calls). Importing app.routes is deferred until the factory runs.
    """
    template_folder = os.path.join(os.path.dirname(__file__), "templates")
    app = Flask(__name__, template_folder=template_folder)

    # Set conservative defaults suitable for development; these can be overridden
    # by the `config` argument or environment-specific configuration.
    app.config.setdefault("SECRET_KEY", "dev-secret-key-change-me")
    app.config.setdefault("TESTING", False)
    # Security-focused defaults for session cookies
    app.config.setdefault("SESSION_COOKIE_HTTPONLY", True)
    app.config.setdefault("SESSION_COOKIE_SAMESITE", "Lax")

    # Apply user-provided config if present (must be a dict)
    if config is not None:
        if not isinstance(config, dict):
            raise TypeError("config must be a dict or None")
        # Validate keys are strings and values are serializable-ish (best-effort)
        # (avoid storing callables as config values here)
        for k in config.keys():
            if not isinstance(k, str):
                raise TypeError("config keys must be strings")
        app.config.update(config)

    # Ensure SECRET_KEY remains set after any updates
    app.config.setdefault("SECRET_KEY", "dev-secret-key-change-me")

    # Import and register blueprints inside the factory to avoid import-time side-effects
    try:
        from .routes import main_bp  # relative import; routes should define `main_bp`
    except Exception as exc:
        # Provide a clear error that helps debugging while preserving original traceback
        raise RuntimeError("Could not import `main_bp` from app.routes. Ensure app/routes.py exists "
                           "and defines a Blueprint named `main_bp`.") from exc

    app.register_blueprint(main_bp)

    return app