import os
import logging
import importlib
from typing import Mapping, Optional

from flask import Flask, Blueprint, Request, Response

def _init_logging(app: Flask) -> None:
    """Configure basic logging for the app if not already configured."""
    # Avoid reconfiguring logging if another part of the system already did.
    if app.logger and app.logger.handlers:
        return

    handler = logging.StreamHandler()
    handler.setLevel(logging.INFO)
    formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )
    handler.setFormatter(formatter)

    root = logging.getLogger()
    root.setLevel(logging.INFO)
    root.addHandler(handler)

    app.logger = logging.getLogger(app.import_name)
    app.logger.setLevel(logging.INFO)


def _apply_default_security_headers(app: Flask) -> None:
    """
    Apply a small set of safe, recommended HTTP response headers to help
    mitigate common web vulnerabilities (CSP, X-Frame-Options, etc).
    This is intentionally conservative and can be overridden via config.
    """
    @app.after_request
    def set_security_headers(response: Response) -> Response:
        # Clickjacking protection
        response.headers.setdefault("X-Frame-Options", "SAMEORIGIN")
        # MIME sniffing protection
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        # Basic XSS protection (older browsers)
        response.headers.setdefault("X-XSS-Protection", "1; mode=block")
        # Referrer policy
        response.headers.setdefault("Referrer-Policy", "no-referrer-when-downgrade")

        # Content Security Policy - conservative by default.
        # Allow resources from self. Inline styles/scripts are disallowed by default;
        # set app.config['ALLOW_INLINE_ASSETS']=True to permit 'unsafe-inline' if needed.
        csp_directives = ["default-src 'self'"]
        if app.config.get("ALLOW_INLINE_ASSETS", False):
            # Explicitly allow inline styles/scripts only if configured (not recommended).
            csp_directives.append("style-src 'self' 'unsafe-inline'")
            csp_directives.append("script-src 'self' 'unsafe-inline'")
        else:
            csp_directives.append("style-src 'self'")
            csp_directives.append("script-src 'self'")

        response.headers.setdefault("Content-Security-Policy", "; ".join(csp_directives))

        return response


def _register_blueprints(app: Flask) -> None:
    """
    Import app.routes inside the factory and register any Flask Blueprint objects
    exposed on the module. This avoids top-level side-effects on import.
    """
    try:
        routes_mod = importlib.import_module("app.routes")
    except Exception as exc:
        app.logger.error("Failed to import app.routes: %s", exc)
        raise ImportError("Could not import 'app.routes' module; ensure it exists.") from exc

    # Collect attributes that are instances of Blueprint
    blueprints = []
    for attr_name in dir(routes_mod):
        try:
            attr = getattr(routes_mod, attr_name)
        except Exception:
            # Skip attributes that raise on access
            continue
        if isinstance(attr, Blueprint):
            blueprints.append((attr_name, attr))

    if not blueprints:
        # Backwards-compatible behavior: look for a common attribute name 'bp' or 'blueprint'
        fallback_names = ("bp", "blueprint", "main_bp", "main")
        for name in fallback_names:
            if hasattr(routes_mod, name):
                candidate = getattr(routes_mod, name)
                if isinstance(candidate, Blueprint):
                    blueprints.append((name, candidate))
                    break

    if not blueprints:
        app.logger.error("No Flask Blueprints found in app.routes module.")
        raise RuntimeError("app.routes must expose at least one Flask Blueprint object.")

    for name, bp in blueprints:
        try:
            app.register_blueprint(bp)
            app.logger.info("Registered blueprint %s from app.routes as %s", getattr(bp, "name", name), name)
        except Exception as exc:
            app.logger.exception("Failed to register blueprint %s: %s", name, exc)
            raise


def create_app(config: Optional[Mapping[str, object]] = None) -> Flask:
    """
    Application factory — returns a configured Flask application instance.

    - Uses template_folder resolved relative to this package:
      Flask(__name__, template_folder=os.path.join(os.path.dirname(__file__), 'templates'))
    - Accepts an optional config mapping (dictionary-like). If provided, config values
      are loaded using Flask.config.from_mapping().
    - Imports app.routes inside the factory and registers any Blueprint instances found.
    - Applies a small set of secure default headers and logging.
    - Does NOT run the server or create global app instances at import time.
    """
    templates_dir = os.path.join(os.path.dirname(__file__), "templates")
    app = Flask(__name__, template_folder=templates_dir, static_folder=os.path.join(os.path.dirname(__file__), "static"))

    # Basic recommended defaults (can be overridden by provided config)
    app.config.setdefault("SESSION_COOKIE_HTTPONLY", True)
    # If running behind TLS in production, set SESSION_COOKIE_SECURE=True via config/env
    app.config.setdefault("SESSION_COOKIE_SECURE", False)
    app.config.setdefault("TEMPLATES_AUTO_RELOAD", False)
    app.config.setdefault("ALLOW_INLINE_ASSETS", False)
    app.config.setdefault("ENABLE_DEFAULT_SECURITY_HEADERS", True)

    # Validate and apply optional config mapping
    if config is not None:
        if not isinstance(config, Mapping):
            raise TypeError("create_app expects an optional mapping for 'config'; got %r" % type(config))
        # Use from_mapping to apply values safely
        app.config.from_mapping(config)

    # Initialize logging
    _init_logging(app)

    # Register blueprints from app.routes (import inside factory to avoid side-effects)
    _register_blueprints(app)

    # Apply security headers if enabled
    if app.config.get("ENABLE_DEFAULT_SECURITY_HEADERS", True):
        _apply_default_security_headers(app)

    # Example: health check route is safe to add here (keeps factory self-contained)
    @app.route("/_health", methods=("GET",))
    def _health() -> tuple[str, int]:
        return ("ok", 200)

    app.logger.info("Application factory completed for %s (templates: %s)", app.import_name, templates_dir)
    return app