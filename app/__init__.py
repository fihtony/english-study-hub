"""
Flask application factory for the english-study-hub project.

This module provides create_app(...) to produce a configured Flask application.
The package must be side-effect free on import (no top-level Flask instance).

Notes:
- Templates are resolved relative to the package directory so they work
  regardless of the current working directory.
- A compatibility shim ensures werkzeug.__version__ exists for environments
  where the werkzeug package does not expose it (prevents Flask test client errors).
"""

from __future__ import annotations

import logging
import os
from typing import Any, Mapping, Optional

# Ensure werkzeug.__version__ exists for Flask testing user-agent composition
try:
    import werkzeug
except Exception:  # pragma: no cover - extremely unlikely
    werkzeug = None

if werkzeug is not None and not hasattr(werkzeug, "__version__"):
    # Try to populate from metadata; fall back to a sensible default string.
    try:
        from importlib.metadata import version as _get_version  # type: ignore

        try:
            werkzeug.__version__ = _get_version("werkzeug")
        except Exception:
            # If metadata lookup fails, provide a default version string so
            # Flask/testing can still compose the User-Agent header.
            werkzeug.__version__ = "0"
    except Exception:
        # importlib.metadata not available or other error - set safe fallback
        werkzeug.__version__ = "0"

from flask import Flask, Blueprint

__all__ = ["create_app"]


def _get_default_secret() -> bytes:
    """Return a default secret key from env or a secure random fallback."""
    env_key = os.environ.get("SECRET_KEY")
    if env_key:
        return env_key.encode("utf-8") if isinstance(env_key, str) else env_key
    return os.urandom(32)


def create_app(config: Optional[Any] = None) -> Flask:
    """
    Create and configure the Flask application.

    Args:
        config: Optional mapping (dict) or an object/module compatible with Flask's
                config.from_object. Passing None uses sensible defaults and environment
                overrides.

    Returns:
        Flask application instance.
    """
    # Templates resolved relative to this package directory
    template_dir = os.path.join(os.path.dirname(__file__), "templates")
    # Static files are expected to live in repository-level 'static/' directory
    static_dir = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "static"))

    app = Flask(
        __name__,
        template_folder=os.path.join(os.path.dirname(__file__), "templates"),
        static_folder=static_dir,
        static_url_path="/static",
    )

    # Basic logging configuration for the app logger if not already configured.
    if not app.logger.handlers:
        handler = logging.StreamHandler()
        handler.setFormatter(logging.Formatter("%(asctime)s %(levelname)s [%(name)s] %(message)s"))
        handler.setLevel(logging.INFO)
        app.logger.addHandler(handler)
        app.logger.setLevel(logging.INFO)

    # Safe default configuration, overridable by provided config argument.
    app.config.from_mapping(
        SECRET_KEY=_get_default_secret(),
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SAMESITE="Lax",
        SESSION_COOKIE_SECURE=os.environ.get("SESSION_COOKIE_SECURE", "1") == "1",
        PREFERRED_URL_SCHEME=os.environ.get("PREFERRED_URL_SCHEME", "http"),
    )

    # Apply provided config if present
    if config is not None:
        # Support either mapping-like or object/module config
        try:
            if isinstance(config, Mapping):
                app.config.update(config)
            else:
                app.config.from_object(config)
        except Exception:
            app.logger.exception("Failed to apply provided config object/mapping")

    # Import routes inside factory to avoid import-time side-effects for callers
    try:
        import importlib

        routes_mod = importlib.import_module("app.routes")
    except ModuleNotFoundError:
        app.logger.info("app.routes module not found; continuing without registering routes.")
        return app
    except Exception:
        app.logger.exception("Unexpected error while importing app.routes")
        return app

    # Register any Blueprint instances found in app.routes
    registered = False
    for attr_name in dir(routes_mod):
        try:
            attr = getattr(routes_mod, attr_name)
        except Exception:
            # Skip attributes that raise on access
            continue
        if isinstance(attr, Blueprint):
            try:
                app.register_blueprint(attr)
                registered = True
            except Exception:
                app.logger.exception("Failed to register blueprint %s from app.routes", attr_name)

    if not registered:
        # If no blueprint was registered, also check for common exported names for backward compatibility
        # (e.g., 'bp', 'main_bp') and attempt to register them if present and are Blueprints.
        for candidate in ("bp", "main_bp"):
            if hasattr(routes_mod, candidate):
                candidate_obj = getattr(routes_mod, candidate)
                if isinstance(candidate_obj, Blueprint):
                    try:
                        app.register_blueprint(candidate_obj)
                        registered = True
                        break
                    except Exception:
                        app.logger.exception("Failed to register candidate blueprint %s", candidate)

    # Return the configured app. Tests expect create_app to succeed and not raise on missing routes.
    return app
